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

  const config = window.__APP_CONFIG__ || {};
  const apiBaseUrl = config.apiBaseUrl || process.env.REACT_APP_API_BASE_URL || '';
  const productId = config.productId || 'BTC-USD';
  const productLabel = config.productLabel || 'BTC';

  const normalizedBase = apiBaseUrl ? apiBaseUrl.replace(/\/+$/, '') : '';
  const apiPath = `/api/gaf/image?product=${encodeURIComponent(productId)}`;
  const apiUrl = normalizedBase ? `${normalizedBase}${apiPath}` : apiPath;

  return (
    <div className={classes.fullScreen}>
      <MedianImage url={apiUrl} product={productLabel}/>
    </div>
  );
}

export default App;
