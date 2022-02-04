import React, {useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core';
import {Box} from '@material-ui/core';
import 'react-tabs/style/react-tabs.css';
import axios from 'axios';

export default function InputDevice() {
    const [device, setDevice] = useState([])
    useEffect(() => {
        axios.get('http://'+ process.env.REACT_APP_HOSTIP+'/device')
        .then(res => {
          setDevice(res.data.devices)
        })
        .catch(function (error) {
          console.log(error)
        })
    }, []);

    const classes = useStyle();
    return (
        <React.Fragment>
          <Box m={1}>
            <label className={classes.label}>デバイス名</label>
            <select id="device">
              {device.map((data) =>
                <option value={data.Name}>{data.Name}</option>
              )}
            </select>
          </Box>
          
        </React.Fragment>
    )
}

const useStyle = makeStyles(() => ({
  label: {
      marginRight: "60px",
      fontWeight: "bold",
  },
  input: {
    marginRight: "20px",
  }
}))