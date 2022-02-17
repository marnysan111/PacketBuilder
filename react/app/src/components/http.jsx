import React from "react";
import {Box, Grid} from '@material-ui/core';
import InputIPadd from "./inputIPadd";
import InputMethods from "./inputMethods";
import InputTime from "./inputTime";
import axios from 'axios';
import InputPort from "./inputPort";

export default function HTTP(props) {
    const setStatus = props.setStatus;
    const status = props.status;
    const handleSubmit = e => {
        e.preventDefault();
        const dstIP = e.target.elements["dstIP"].value;
        const methods = e.target.elements["methods"].value;
        const times = e.target.elements["times"].value;
        const port =  e.target.elements["port"].value;
        if (!dstIP || !methods || !times || !port){
            alert("空入力の要素があります")
            return false
        }
        if (times <= 0){
            alert("送信回数は0以上の整数にしてください")
            return false
        }
        axios.post('http://'+ process.env.REACT_APP_HOSTIP+'/http',{
            "dstIP": dstIP,
            "methods": methods,
            "times": parseInt(times),
            "port": port,
        }).then(function (response) {
            //console.log(response)
            setStatus([...status, {
                message: response.data.message,
                dstIP: response.data.dstIP,
                err: response.data.err,
                result: response.data.result,
                times: response.data.times,
            }])
        }).catch(function (error) {
            //console.log(error.response.data)
            setStatus([...status, {
                message: error.response.data.message,
                dstIP: error.response.data.dstIP,
                err: error.response.data.err.Msg, 
                code: error.response.data.err.Code, 
                result: error.response.data.result,
                times: error.response.data.times,}])
          });
    }


    return (
        <React.Fragment>
            <Box m={3}>
                <h2>HTTP通信</h2>
                <form onSubmit={handleSubmit}>
                    <Grid container>
                        <Grid item xs={12}>
                            <InputIPadd />
                        </Grid>
                        <Grid item xs={12}>
                            <InputPort />
                        </Grid>
                        <Grid item xs={12}>
                            <InputMethods />
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