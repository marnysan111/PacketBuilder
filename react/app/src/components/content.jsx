import React from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {Box} from '@material-ui/core';
import 'react-tabs/style/react-tabs.css';
import TCP from './tcp'

export default function Content(props) {

    return (
        <React.Fragment>
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
                        srcAdd = {props.srcAdd}
                    />
                </TabPanel>
            </Tabs>
            </Box>
        </React.Fragment>
    )
}