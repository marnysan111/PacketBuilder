import React, {useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core';
import {Box, Grid, TextField, List, ListItemText } from '@material-ui/core';
import 'react-tabs/style/react-tabs.css';
import axios from 'axios';
import MaskedInput from "react-text-mask";

export default function InputMAC(props) {
    const classes = useStyle();
      
      return (
          <React.Fragment>
              <Box m={1}>
                <label className={classes.label}>MACアドレス</label>
                <div className={classes.block}>
                    <label className={classes.input}>送信元</label><MaskedInput mask={new Array(6).fill([/[0-9a-f]/, /[0-9a-f]/, ":"]).flat().slice(0, -1)}  className={classes.input}/>
                </div>
                <div className={classes.block}>
                    <label className={classes.input}>送信先</label><MaskedInput mask={new Array(6).fill([/[0-9a-f]/, /[0-9a-f]/, ":"]).flat().slice(0, -1)}  />
                </div>
              </Box>
          </React.Fragment>
      )
  }
const useStyle = makeStyles(() => ({
  label: {
      marginRight: "40px",
      fontWeight: "bold",

  },
  input: {
    marginRight: "20px",
  },
  block: {
    display: "inline-block",
    whiteSpace: "nowrap",
  }
}))