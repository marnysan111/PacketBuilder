import React from "react";
import {Box, Grid} from '@material-ui/core';
import InputIPadd from "./inputIPadd";
import InputMethods from "./inputMethods";
import InputTime from "./inputTime";
import axios from 'axios';
import InputPort from "./inputPort";

export default function TCP(props) {
    const setStatus = props.setStatus;
    const status = props.status;
    const handleSubmit = e => {
        e.preventDefault();
        const dstIP = e.target.elements["dstIP"].value;
        const times = e.target.elements["times"].value;
        const port =  e.target.elements["port"].value;
        if (!dstIP || !times || !port){
            alert("空入力の要素があります")
            return false
        }
        if (times <= 0){
            alert("送信回数は0以上の整数にしてください")
            return false
        }
        axios.post('http://'+ process.env.REACT_APP_HOSTIP+'/tcp',{
            "dstIP": dstIP,
            "times": parseInt(times),
            "port": port,
            "type": "TCP",
        }).then(function (response) {
            //console.log(response)
            setStatus([...status, {
                message: response.data.message,
                dstIP: response.data.dstIP,
                err: response.data.err,
                result: response.data.result,
                times: response.data.times,
                type: response.data.type,   
            }])
        }).catch(function (error) {
            //console.log(error.response.data)
            setStatus([...status, {
                message: error.response.data.message,
                dstIP: error.response.data.dstIP,
                err: error.response.data.err.Msg, 
                result: error.response.data.result,
                times: error.response.data.times,
                type: error.response.data.type,   
            }])
          });
    }


    return (
        <React.Fragment>
            <Box m={3}>
                <h2>TCP通信</h2>
                <form onSubmit={handleSubmit}>
                    <Grid container>
                        <Grid item xs={12}>
                            <InputIPadd />
                        </Grid>
                        <Grid item xs={12}>
                            <InputPort />
                        </Grid>
                        <Grid item xs={12}>
                            <InputTime />
                        </Grid>
                        <button type="submit">送信</button>
                    </Grid>

                </form>
            </Box>
        </React.Fragment>
    )
}