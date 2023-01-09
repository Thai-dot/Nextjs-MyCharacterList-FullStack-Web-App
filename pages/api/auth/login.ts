import connect from '../../../database/connection';
import user from '../../../database/Schema/userSchema';
import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from 'cookies-next';
const jwt = require('jsonwebtoken');

const createAccessToken = (user: any) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
};
const createRefreshToken = (user: any) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};

export default async function login_user(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connect();

  const { method } = req;

  if (method === 'POST') {
    const { email, password } = req.body;
    const checked = await user.findOne({
      email,
    });

    if (!checked) {
      res.status(401).json({ message: 'Error: incorrect email' });
      return;
    }

    const isMatch = await bcrypt.compare(password, checked.password);

    if (!isMatch) return res.status(401).json({ msg: 'Incorrect password.' });

    const accesstoken = createAccessToken({ id: checked._id });
    const refreshtoken = createRefreshToken({ id: checked._id });

    setCookie('refreshtoken', refreshtoken, {
      req,
      res,
      maxAge: 7 * 24*60*60,
    });

    res.status(201).json({ message: accesstoken });
  }

}
