import connect from '../../../database/connection';
import { NextApiRequest, NextApiResponse } from 'next';
const jwt = require('jsonwebtoken');

const createAccessToken = (user: any) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
};

export default async function login_user(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connect();

  const { method } = req;

  if (method === 'GET') {
    const rf_token = req.cookies.refreshtoken;
    if (!rf_token)
      return res.status(400).json({ msg: 'Please Login or Register' });
    jwt.verify(
      rf_token,
      process.env.REFRESH_TOKEN_SECRET,
      (err: any, user: any) => {
        if (err)
          return res.status(400).json({ msg: 'Please Login or Register' });
        const accesstoken = createAccessToken({ id: user.id });

        res.status(200).json({ accesstoken });
      }
    );
  }
}
