import React, {useState} from "react";
import { makeStyles } from '@material-ui/core';
import {Box, Grid, TextField, List, ListItemText } from '@material-ui/core';
import 'react-tabs/style/react-tabs.css';
import InputTCP from "./inputTCP";
import InputDevice from "./inputDevice";
import 'bootstrap/dist/css/bootstrap.min.css';


export default function TCP(props) {
    const classes = useStyle();
    return (
        <React.Fragment>
            <Box m={3} className={classes.text}>
                <h2>TCPによる攻撃</h2>
                <form className="">
                <Grid>
                    <Grid item xs={12} lg={6}>
                        <InputDevice />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <InputTCP 
                        SrcIP = {props.srcIP}
                        DstIP = {props.dstIP}
                        />
                    </Grid>
                </Grid>
                </form>
            </Box>
        </React.Fragment>
    )
}

const useStyle = makeStyles(() => ({
    text: {
        fontWeight: "bold",
    },
  }))