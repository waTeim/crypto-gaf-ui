import React from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import MedianImage from './components/MedianImage';

const useStyles = makeStyles(theme => ({
  fullScreen: {
    position: "fixed",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    overflow: "auto",
  } 
}));


function App() {
  const classes = useStyles();

  return (
    <div class={classes.fullScreen}>
    <MedianImage url="http://localhost:6350/api/gaf/image?product=BTC-USD" product="BTC"/>
    </div>
  );
}

export default App;
