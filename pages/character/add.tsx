import Navbar from '../../components/Navbar';
import { getCookie } from 'cookies-next';
import { verify } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';
import { useEffect } from 'react';
import Router from 'next/router';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import { TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { FormControlLabel } from '@mui/material';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import * as React from 'react';
import { ReadFiles } from '../../utils/readImage';

const Character = () => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const [gender, setGender] = React.useState<string>('');
  const [image, setImage] = React.useState<any>("");

  const handleSelectChange = (event: any) => {
    setGender(event.target.value);
  };

  const onChangeFile = async (e: any) => {
    const reader = new ReadFiles();
    const result = await reader.addImage.call(reader, e).then((res) => res);
    setImage(result.files[0]);
  };

  async function postData(url = '', data = {}) {
    console.log('fetching...');
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const receiveData = await response.json();
    return receiveData;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const split = image.split(",")
    const imageTag = split[0];
    const base64String = split[1];
    console.log(base64String)

    const bodyData = {
      characterName: data.get('characterName'),
      movie: data.get('movie'),
      age: Number(data.get('age')),
      gender: data.get('gender'),
      image:  Buffer.from(base64String, 'base64'),
      imageTag: imageTag,
      accessToken: accessToken,
    };

    
    const result = await postData(
      'http://localhost:3000/api/character',
      bodyData
    );

    console.log(result);
  };
  return (
    <div>
      <Navbar />
      <Container component="main" maxWidth="md">
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="characterName"
                required
                fullWidth
                id="characterName"
                label="Character Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="movie"
                label="Movie"
                name="movie"
                autoComplete="family-name"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField required fullWidth id="age" label="Age" name="age" />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={gender}
                  label="Gender"
                  name="gender"
                  onChange={(e) => handleSelectChange(e)}
                >
                  <MenuItem value={'Male'}>Male</MenuItem>
                  <MenuItem value={'Female'}>Female</MenuItem>
                  <MenuItem value={'Others'}>Others</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl>
                <FormControlLabel
                  control={
                    <Button
                      sx={{ mr: 3, ml: 2 }}
                      variant="contained"
                      component="label"
                    >
                      Upload
                      <input
                        name="avatar"
                        onChange={(e) => onChangeFile(e)}
                        hidden
                        accept="image/*"
                        multiple
                        type="file"
                      />
                    </Button>
                  }
                  label="Upload an image"
                  labelPlacement="start"
                />
              </FormControl>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Add
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default Character;
