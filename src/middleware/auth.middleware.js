import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_secret = process.env.JWT_TOKEN;

const auth = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  try {
    if (!token) {
      res
        .status(401)
        .send({ error: "Authenticate using a valid token initial" });
    }
    const data = jwt.verify(token, JWT_secret);
    console.log("Data after jwt verification : ", data);
    req.user = data.user;
    next();
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(401).send({ error: "Authenticate using a valid token" });
  }
};
