import React from "react";
import { makeStyles } from '@material-ui/core';
import {Box, Grid} from '@material-ui/core';
import 'react-tabs/style/react-tabs.css';
import InputIP from "./inputIP";
import InputDevice from "./inputDevice";
import InputMAC from "./inputMAC";
import InputPort from "./inputPort";
import InputTimes from "./inputTimes";
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';


export default function SYN(props) {
    const classes = useStyle();
    const setStatus = props.setStatus;
    const status = props.status;

    const handleSubmit = e => {
        e.preventDefault();
        const device = document.getElementById("device")
        const srcIP = e.target.elements["srcIP"];
        const dstIP = e.target.elements["dstIP"];
        const srcMAC = e.target.elements["srcMAC"];
        const dstMAC = e.target.elements["dstMAC"];
        const srcPort = e.target.elements["srcPort"];
        const dstPort = e.target.elements["dstPort"];
        const timeout = e.target.elements["timeout"];
        const times = e.target.elements["times"];
        if (!srcIP.value || !dstIP.value || !srcMAC.value || !dstMAC.value || !srcPort.value || !dstPort.value || !timeout.value || !times.value){
            alert("空入力の要素があります")
            return false
        }
        if (times.value <= 0) {
            alert("送信回数は0以上の整数にしてください")
            return false
        }
        axios.post('http://'+ process.env.REACT_APP_HOSTIP+'/tcp', {
            "device": device.value, 
            "srcIP": srcIP.value,
            "dstIP": dstIP.value,
            "srcMac": srcMAC.value, 
            "dstMac": dstMAC.value, 
            "srcPort": parseInt(srcPort.value), 
            "dstPort": parseInt(dstPort.value),
            "timeout": parseInt(timeout.value),
            "times": parseInt(times.value),
        }).then(function (response) {
            console.log(response)
            setStatus([...status, {
                message: response.data.message,
                srcIP: response.data.srcIP,
                err: response.data.err,
                result: response.data.result,
            }])
        })
          .catch(function (error) {
            console.log(error.response.data)
            setStatus([...status, {
                message: error.response.data.message,
                srcIP: error.response.data.srcIP,
                err: error.response.data.err.Msg, 
                code: error.response.data.err.Code, 
                result: error.response.data.result}])
          });
    }

    return (
        <React.Fragment>
            <Box m={3} className={classes.text}>
                <h2>SYNフラッド攻撃</h2>
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
                    <Grid item xs={12}>
                        <InputTimes 
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