import connect from '../../database/connection';
import user from '../../database/Schema/userSchema';
import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
const jwt = require('jsonwebtoken');

const createAccessToken = (user:any) =>{
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1m'})
}
const createRefreshToken = (user:any) =>{
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}

export default async function get_User(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connect();

  const { method } = req;

  if (method === 'POST') {
    const body = req.body;
    const checked = await user
      .findOne({
        email: body.email,
      })
      .exec();

    if (!checked) {
      console.log(body.password);
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(body.password, salt)
      const newUser = new user({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        gender: body.gender,
        role:1,
        password: hashedPassword,
      });
      await newUser.save()


      res.status(201).json({message: "Sign up sucessfully"});
    } else {
      res.status(409).json({ message: 'Email already exists' });
    }
  }

  if(method === "GET"){
    const data = await user.find();
    res.status(200).json(data);
  }
}
