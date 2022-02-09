import React,{ useState} from 'react'
import './App.css';
import {Grid, Box, makeStyles} from '@material-ui/core';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import SYN from './components/syn';
import Footer from './components/footer';
import TCP from './components/tcp';
import HTTP from './components/http';
import Readme from './components/readme';

function App() {

  const [device, setDevice] = useState();
  const [srcIP, setSrcIP] = useState();
  const [dstIP, setDstIP] = useState();
  const [srcMac, setSrcMac] = useState();
  const [dstMac, setDstMac] = useState();
  const [srcPort, setSrcPort] = useState();
  const [dstPort, setDstPort] = useState();
  const [times, setTimes] = useState(); 
  const [status, setStatus] = useState([]);
  const classes = useStyle();
  return (
    <React.Fragment>
      <Box>
      <Grid container>
        <Grid item xs={12}>
        <Box m={3} >
            <Tabs>
                <TabList>
                <Tab>README</Tab>
                <Tab>HTTP</Tab>
                <Tab>TCP</Tab>
                <Tab>SYN</Tab>
                </TabList>
                <TabPanel>
                    <Readme />
                </TabPanel>
                <TabPanel>
                  <HTTP
                    setStatus = {setStatus}
                    status = {status}
                  />
                </TabPanel>
                <TabPanel>
                  <TCP />
                </TabPanel>
                <TabPanel>
                    <SYN
                      device = {setDevice}
                      srcIP = {setSrcIP}
                      dstIP = {setDstIP}
                      srcMac = {setSrcMac}
                      dstMac = {setDstMac}
                      srcPort = {setSrcPort}
                      dstPort = {setDstPort}
                      times = {setTimes}
                      setStatus = {setStatus}
                      status = {status}
                    />
                </TabPanel>
            </Tabs>
        </Box>
        </Grid>
      </Grid>
      </Box>
      <Footer
        status = {status}
      />

<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

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
