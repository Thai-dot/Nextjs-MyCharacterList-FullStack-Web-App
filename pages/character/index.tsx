import sty from './character.module.scss';
import Navbar from '../../components/Navbar';
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';
import { useEffect } from 'react';
import Router from 'next/router';
import axios from 'axios';
import * as React from 'react';
import useAsyncEffect from 'use-async-effect';
import CharacterComponent from '../../components/character';
import { Grid } from '@mui/material';

const Character = () => {
  // const [image, setImage] = React.useState<any>('');
  // const [imageTag, setImageTag] = React.useState<any>('');
  const [characterResult, setCharacterResult] = React.useState<any>([]);

  useAsyncEffect(async () => {
    await axios.get('http://localhost:3000/api/character').then((res) => {
      const result = res.data;
      // const { image, imageTag } = result.characters[0];

      // console.log(image.data);
      // console.log(arrayBufferToBase64(image.data));
      // setImage(arrayBufferToBase64(image.data));
      // setImageTag(imageTag);
      
      setCharacterResult(result.characters);
    });
  }, []);

  return (
    <div id={sty.test2} className={`${sty.test}`}>
      <Navbar />
      <Grid container spacing={2}>
        {characterResult.map((charac : any, index:number) => {
          return <CharacterComponent key={index} singleCharacterData={charac} />;
        })}
      </Grid>
    </div>
  );
};

export default Character;
