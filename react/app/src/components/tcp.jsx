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

    const handleSubmit = e => {
        e.preventDefault();
        const srcIP = e.target.elements["srcIP"];
        const dstIP = e.target.elements["dstIP"];
        const srcMAC = e.target.elements["srcMAC"];
        const dstMAC = e.target.elements["dstMAC"];
        const srcPort = e.target.elements["srcPort"];
        const dstPort = e.target.elements["dstPort"];
        console.log(srcIP.value, dstIP.value,srcMAC.value, dstMAC.value,srcPort.value, dstPort.value);
    }

    return (
        <React.Fragment>
            <Box m={3} className={classes.text}>
                <h2>TCPによる攻撃</h2>
                <form onSubmit={handleSubmit}>
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
                        <InputMAC
                            SrcMAC = {props.srcMAC}
                            DstMAC = {props.dstMAC}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <InputPort 
                            SrcPort = {props.srcPort}
                            DstPort = {props.dstProt}
                        />
                    </Grid>
                </Grid>
                <button type="submit">送信</button>
                </form>
            </Box>
        </React.Fragment>
    )
}

const useStyle = makeStyles(() => ({
    text: {
    },
  }))