const jwt = require('jsonwebtoken');
import User from "../models/user";

/* auth method finds the user using the jwt token */
export default async function auth(token){
  try{
    const decoded = await  jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({_id: decoded._id});
    return user;
  }catch(error){
    res.status(401).send({Error: 'Please authenticate' });
  }
}