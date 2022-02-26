import React, {useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core';
import {Box} from '@material-ui/core';
import 'react-tabs/style/react-tabs.css';

export default function InputSleep() {
    const classes = useStyle();
    return (
        <React.Fragment>
          <Box m={1}>
            <label className={classes.label}>遅延秒数</label>
            <div className={classes.block}>
                   <input className={classes.input} type="number" id="sleep" />
            </div>
            <label>※遅延を入れない場合は1と入力してください</label><br />（0から入力値までの値の乱数秒の遅延を行います）
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
  },
  block: {
    display: "inline-block",
    whiteSpace: "nowrap",
  }
}))