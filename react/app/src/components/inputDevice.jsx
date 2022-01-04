import React, {useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core';
import {Box, Grid, TextField, List, ListItemText } from '@material-ui/core';
import 'react-tabs/style/react-tabs.css';
import axios from 'axios';

export default function InputDevice(props) {
    const [device, setDevice] = useState({})
    useEffect(() => {
        axios.get('http://192.168.1.21:80/device')
        .then(res => {
          setDevice(res.data.devices)
        })
      }, []);

    const classes = useStyle();
    return (
        <React.Fragment>
          
        </React.Fragment>
    )
}

const useStyle = makeStyles(() => ({

  }))