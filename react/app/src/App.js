import React,{ useState, useEffect } from 'react'
import axios from 'axios';
import './App.css';
import {Grid, Box, makeStyles} from '@material-ui/core';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import Template from './components/template';
import Header from './components/header';
import TCP from './components/tcp';
import Footer from './components/footer';

function App() {
  const [device, setDevice] = useState();
  const [srcIP, setSrcIP] = useState();
  const [dstIP, setDstIP] = useState();
  const [srcMac, setSrcMac] = useState();
  const [dstMac, setDstMac] = useState();
  const [srcPort, setSrcPort] = useState();
  const [dstPort, setDstPort] = useState();
  const [times, setTimes] = useState(); 
  const classes = useStyle();

  
  return (
    <React.Fragment>
      <Header />
      <Box className={classes.root}>
      <Template />
      <Grid container>
        <Box m={3} >
          <button onClick={send}>send</button>
          {srcIP}:{dstIP}
            <Tabs>
                <TabList>
                <Tab>README</Tab>
                <Tab>TCP</Tab>
                </TabList>
                <TabPanel>
                    README
                </TabPanel>
                <TabPanel>
                    <TCP
                      device = {setDevice}
                      srcIP = {setSrcIP}
                      dstIP = {setDstIP}
                      srcMac = {setSrcMac}
                      dstMac = {setDstMac}
                      srcPort = {setSrcPort}
                      dstPort = {setDstPort}
                      times = {setTimes}
                    />
                </TabPanel>
            </Tabs>
        </Box>
        <Footer />
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
export default App;
