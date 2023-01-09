import { NextApiRequest, NextApiResponse } from 'next';
import { deleteCookie } from 'cookies-next';
const jwt = require('jsonwebtoken');

export default async function login_user(
  req: NextApiRequest,
  res: NextApiResponse
) {
  deleteCookie('refreshtoken', {
    req,
    res,
  });
  return res.status(200).json({ msg: 'Logged out' });
}
