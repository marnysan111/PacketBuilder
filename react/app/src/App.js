import React,{ useState, useEffect } from 'react'
import axios from 'axios';
import './App.css';
import {Grid, Box, makeStyles} from '@material-ui/core';

import Template from './components/template';
import Header from './components/header';
import Content from './components/content';

function App() {
  /*
  var data = [
    {"srcIP": "192.168.56.20","dstIP": "192.168.56.253", "srcMac": "08:00:27:24:2c:c1", "dstMac": "0a:00:27:00:00:16", "times": 2, "device": "enp0s8"}
  ]
  */
  const classes = useStyle();

  function send() {
    axios.post('http://192.168.1.21:80/tcp',{"srcIP": "192.168.1.10","dstIP": "192.168.1.254", "srcMac": "08:00:27:24:2c:c1", "dstMac": "0a:00:27:00:00:16", "times": 2, "device": "enp0s8", "srcPort":80, "dstPort": 80})
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    console.log("SEND")
  };
  return (
    <React.Fragment>
      <Header />
      <Box className={classes.root}>
      <Template />
      <Grid container>
        <Content />
      </Grid>
      </Box>
    </React.Fragment>
  );
}
const useStyle = makeStyles(() => ({
  root: {
    display: "flex",
  }
}))
export default App;
