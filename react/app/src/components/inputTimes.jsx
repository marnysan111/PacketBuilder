import React from "react";
import { makeStyles } from '@material-ui/core';
import {Box} from '@material-ui/core';
import 'react-tabs/style/react-tabs.css';

export default function InputPort() {
    const classes = useStyle();
      return (
          <React.Fragment>
              <Box m={1}>
                <label className={classes.label}>タイムアウト秒</label>
                <div className={classes.block}>
                   <input className={classes.input} type="number" id="timeout" />
                </div>
                <label className={classes.label}>送信回数</label>
                <div className={classes.block}>
                    <input className={classes.input} type="number" id="times" />
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