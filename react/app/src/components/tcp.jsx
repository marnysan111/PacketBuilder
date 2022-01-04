import React, {useState} from "react";
import { makeStyles } from '@material-ui/core';
import {Box, Grid, TextField, List, ListItemText } from '@material-ui/core';
import 'react-tabs/style/react-tabs.css';
import InputIP from "./inputIP";
import InputDevice from "./inputDevice";
import InputMAC from "./inputMAC";
import InputPort from "./inputPort";

import 'bootstrap/dist/css/bootstrap.min.css';


export default function TCP(props) {
    const classes = useStyle();
    return (
        <React.Fragment>
            <Box m={3} className={classes.text}>
                <h2>TCPによる攻撃</h2>
                <form className="">
                <Grid container>
                    <Grid item xs={12}>
                        <InputDevice 
                            Device = {props.device}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <InputIP 
                            SrcIP = {props.srcIP}
                            DstIP = {props.dstIP}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <InputMAC />
                    </Grid>
                    <Grid item xs={12}>
                        <InputPort />
                    </Grid>
                </Grid>
                </form>
            </Box>
        </React.Fragment>
    )
}

const useStyle = makeStyles(() => ({
    text: {
    },
  }))