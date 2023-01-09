import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import arrayBufferToBase64 from '../utils/convertBufferArrayToBase64';
import { Grid } from '@mui/material';

interface IMyProps {
  singleCharacterData: any;
}

const CharacterComponent: React.FC<IMyProps> = ({ singleCharacterData }) => {
  return (
    <Grid item xs={12} sm={3}>
      <Card sx={{ my: 3, mx: 3 }}>
        <CardMedia
          sx={{ height: 140 }}
          image={
            singleCharacterData.imageTag +
            ',' +
            arrayBufferToBase64(singleCharacterData.image.data)
          }
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {singleCharacterData.characterName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {singleCharacterData.movie}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {singleCharacterData.age}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {singleCharacterData.gender}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default CharacterComponent;
