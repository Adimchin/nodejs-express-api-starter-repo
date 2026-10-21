import jwt from "jsonwebtoken";
import "dotenv/config"

export const generateAuthToken = (userId, res) => {
  const payload = {
    userId,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET , {
    expiresIn: "1d"
  });

  res.cookie('jwt', token, {
    httpOnly: true,
  })
};

