import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import { pink } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(-1),
    
    },
  },
  
  shape: {
    backgroundColor:'green',
    color:'green',
    width: 40,
    height: 40,
  },
  badge:{
      backgroundColor:'#1a8504',
  fontSize:'15px',
  borderRadius:'50%',
  width:'20%',
  height:'15%',
  boxShadow:'1px 2px 2px #666',
  fontWeight:600,
  letterSpacing:1,
  textAlign:'center'
  
  },
  shapeCircle: {
    borderRadius: '50%',
  },
}));

export default function BadgeOverlap(props) {
  const classes = useStyles();
  const circle = <div className={clsx(classes.shape, classes.shapeCircle)}

  />;

  return (
    <div className={classes.root}>
    <Badge classes={{badge:classes.badge}} color="secondary" overlap="circle" badgeContent={`${props.discount}% off`} variant="standard">
        {props.children}
      </Badge>
    </div>
  );
}