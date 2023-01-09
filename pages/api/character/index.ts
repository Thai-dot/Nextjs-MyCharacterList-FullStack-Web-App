import connect from '../../../database/connection';
import character from '../../../database/Schema/characterSchema';
import { NextApiRequest, NextApiResponse } from 'next';
const jwt = require('jsonwebtoken');

export default async function get_Character(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connect();

  const { method } = req;

  if (method === 'POST') {
    const body = req.body;

    const accessToken = body.accessToken;

    const userId = await jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET,
      (error: any, userID: any) => {
        if (error) res.status(401).json({ message: 'Please login' });

        return userID.id;
      }
    );
    const newCharacter = new character({
      characterName: body.characterName,
      movie: body.movie,
      age: body.age,
      gender: body.gender,
      image: body.image.data,
      imageTag: body.imageTag,
      user: userId,
    });

    await newCharacter.save().catch((er: any) => console.log(er));

    res.status(201).json({ message: 'Inserted new character sucessfully' });
  }

  if (method === 'GET') {
    // const authHeader = req.headers['authorization'];
    // console.log(authHeader);
    // const token = authHeader && authHeader.split(' ')[1];
    // if (!token)
    //   return res
    //     .status(401)
    //     .json({ success: false, message: 'Access token not found' });

    try {
      // const decoded = jwt.verify(
      //   token,
      //   process.env.ACCESS_TOKEN_SECRET,
      //   (error: any, user: any) => {
      //     if (error) {
      //       return res.redirect(307, '/login');
      //     }

      //     return user;
      //   }
      // );

      const characters = await character.find();

      return res.status(200).json({ characters });
    } catch (error) {
      console.log(error);
      return res.status(403).json({ success: false, message: 'Invalid token' });
    }
  }
}
