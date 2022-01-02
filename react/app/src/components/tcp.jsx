import React, {useState} from "react";
import {Box, TextField, List, ListItemText } from '@material-ui/core';
import 'react-tabs/style/react-tabs.css';
import InputTCP from "./inputTCP";

export default function TCP(props) {
    
    return (
        <React.Fragment>
            <Box m={3} >
                <h2>TCPによる攻撃</h2>
                <form>
                <InputTCP 
                   SrcIP = {props.srcIP}
                   DstIP = {props.dstIP}
                />
                </form>
            </Box>
        </React.Fragment>
    )
}