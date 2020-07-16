import React, { useState }  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ReactPolling from 'react-polling';
import FittedImage from 'react-fitted-image';
import CrossfadeImage from 'react-crossfade-image';

const useStyles = makeStyles(theme => ({
  imageDisplay: 
  {
    maxWidth: "100%",
    maxHeight: "100%",
    height: "100%",
    width: "100%",
    objectFit: "cover"
  },
  imageContainer: {
    display: "flex",
    flexBasis: "50%",
    justifyContent: "center",
    flexDirection: "column"
  },
  grid2x2: {
    minHeight: "100%",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    zIndex: 0
  },
  priceDisplay: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    textAlign: "center"
  },
  productFont: {
    fontSize: "200px",
    color: "#fff",
    textShadow: "#000 0px 0px 3px, #000 0px 0px 3px, #000 0px 0px 3px, #000 0px 0px 3px, #000 0px 0px 3px, #000 0px 0px 3px, #000 0px 0px 3px",
    WebkitFontSmoothing: "antialiased"
  },
  priceFont: {
    fontSize: "40px",
    color: "#fff",
    textShadow: "#000 0px 0px 2px, #000 0px 0px 2px, #000 0px 0px 2px",
    WebkitFontSmoothing: "antialiased"
  }
}));


export default function CryptoImage(props) {
  const classes = useStyles();
  const [ image1, setImage1 ] = useState("");
  const [ image2, setImage2 ] = useState("");
  const [ image3, setImage3 ] = useState("");
  const [ image4, setImage4 ] = useState("");
  const [ price, setPrice ] = useState(0);
  const imageDisplay1 = { maxWidth: "100%", maxHeight: "100%", height: "100%", width: "100%", objectFit: "cover", transform: "rotate(180deg)" }
  const imageDisplay2 = { maxWidth: "100%", maxHeight: "100%", height: "100%", width: "100%", objectFit: "cover", transform: "rotate(270deg)" }
  const imageDisplay3 = { maxWidth: "100%", maxHeight: "100%", height: "100%", width: "100%", objectFit: "cover", transform: "rotate(90deg)" }
  const imageDisplay4 = { maxWidth: "100%", maxHeight: "100%", height: "100%", width: "100%", objectFit: "cover" }

  return (
    <ReactPolling
      url={props.url}
      interval= {500} // in milliseconds(ms)
      retryCount={3}
      onSuccess={(res) => { 
        setImage1(res.png1);
        setImage2(res.png2);
        setImage3(res.png3);
        setImage4(res.png4);
        setPrice(res.midpoint);
        return true;
      }}
      onFailure={() => console.log('handle failure')}
      method={'GET'}
      render={({ startPolling, stopPolling, isPolling }) =>
      {
        if(isPolling)
        {
          //const Image = ({data}) => <img src={`data:image/png;base64,${data}` } alt=""/>
          //return (<div className={classes.imageDisplay}> <Image data={medianImage}/> </div>);
          //return (<div className={classes.imageDisplay}> <FittedImage src={`data:image/png;base64,${medianImage}`}/> </div>);
          return (
            <div>
            <div className={classes.grid2x2}>
              <div className={classes.imageContainer}> <CrossfadeImage style={imageDisplay1} src={`data:image/png;base64,${image1}`} timingFunction={"linear"} duration={500}/></div>
              <div className={classes.imageContainer}> <CrossfadeImage style={imageDisplay2} src={`data:image/png;base64,${image2}`} timingFunction={"linear"} duration={500}/></div>
              <div className={classes.imageContainer}> <CrossfadeImage style={imageDisplay3} src={`data:image/png;base64,${image3}`} timingFunction={"linear"} duration={500}/></div>
              <div className={classes.imageContainer}> <CrossfadeImage style={imageDisplay4} src={`data:image/png;base64,${image4}`} timingFunction={"linear"} duration={500}/></div>
            </div>
            <div className={classes.priceDisplay}><div className={classes.productFont}>{props.product}</div><div className={classes.priceFont}>{price}</div></div>
            </div>
          );
        }
        else
        {
          return (<div className={classes.imageContainer}>{`Status: API unavailable`}</div>);
        }
      }}
    />
  );
}
