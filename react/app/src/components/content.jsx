import React from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {Box} from '@material-ui/core';
import 'react-tabs/style/react-tabs.css';
export default function Content(props) {
    return (
        <React.Fragment>
            <Box m={3} >
            <Tabs>
                <TabList>
                <Tab>TCP</Tab>
                <Tab>Title 2</Tab>
                </TabList>

                <TabPanel>
                <h2>Any content 1</h2>
                </TabPanel>
                <TabPanel>
                <h2>Any content 2</h2>
                </TabPanel>
            </Tabs>
            </Box>
        </React.Fragment>
    )
}