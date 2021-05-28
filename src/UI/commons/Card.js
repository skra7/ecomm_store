import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    backgroundColor:'white',
    margin:'auto'
  },
  cards:{
      opacity:0.2,
      objectFit:'contain'
  }
});

export default function ImgMediaCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>

      <CardActionArea>
       <CardMedia 
          className={classes.cards}
          component="img"
          alt="Contemplative Reptile"
          opacity='0'
          height="240"
          image="/icon.jpg"
          title="Contemplative Reptile"
        />
    
        <CardContent>
          {/* <Typography gutterBottom variant="h5" component="h2">
            Lizard
          </Typography> */}
          <Typography variant="body2" color="textSecondary" component="p">
           <h3> NO PRODUCT IN THIS CATEGORY</h3>
          </Typography>
        </CardContent>
      </CardActionArea>
      {/* <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions> */}
    </Card>
  );
}
