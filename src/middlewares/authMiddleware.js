import {db} from '../db/index.js'
import jwt from 'jsonwebtoken'
import { users } from '../db/schema.js';
import { eq } from 'drizzle-orm';

export const authMiddleware = async (req, res, next) => {
const jwtToken = req.cookies.jwt;

if(!jwtToken || jwtToken === ''){
  return res.status(401).json({
    error: {
      message: 'user is unauthorized or not logged in'
    }
  });
};

// verify jwt token
const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);


//verify user still exists
const usersList = await db.select().from(users).where(eq(users.id, decoded.userId));

if(usersList.length <= 0){
  return res.json({error: {
    message: 'user does not exist'
  }})
};

next();

}

