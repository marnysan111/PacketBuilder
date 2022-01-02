import React,{ useState, useEffect } from 'react'
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
      {/*{srcIP}:{dstIP}*/}
      <Box>

      <Grid container>
        <Grid item xs={3}>
          <Template />
        </Grid>
        <Grid item xs={9}>
        <Box m={3} >
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
        </Grid>
      </Grid>
      </Box>
      <Footer />



    </React.Fragment>
  );
}
const useStyle = makeStyles(() => ({
  root: {
    height: "100%",    
  },
  item: {
    borderRight: "1px solid rgba(0, 0, 0, 0.5)",
  }
}))


export default App;
