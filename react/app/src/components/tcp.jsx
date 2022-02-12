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
        const srcIP = e.target.elements["srcIP"].value;
        const times = e.target.elements["times"].value;
        const port =  e.target.elements["port"].value;
        if (!srcIP || !times || !port){
            alert("空入力の要素があります")
            return false
        }
        if (times <= 0){
            alert("送信回数は0以上の整数にしてください")
            return false
        }
        axios.post('http://'+ process.env.REACT_APP_HOSTIP+'/tcp',{
            "srcIP": srcIP,
            "times": parseInt(times),
            "port": port,
        }).then(function (response) {
            //console.log(response)
            setStatus([...status, {
                message: response.data.message,
                srcIP: response.data.srcIP,
                err: response.data.err,
                result: response.data.result,
                times: response.data.times,
            }])
        }).catch(function (error) {
            //console.log(error.response.data)
            setStatus([...status, {
                message: error.response.data.message,
                srcIP: error.response.data.srcIP,
                err: error.response.data.err.Msg, 
                result: error.response.data.result,
                times: error.response.data.times,
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