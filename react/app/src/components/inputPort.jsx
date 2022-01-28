import React from "react";
import { makeStyles } from '@material-ui/core';
import {Box} from '@material-ui/core';
import 'react-tabs/style/react-tabs.css';
import MaskedInput from "react-text-mask";

export default function InputPort(props) {
    const classes = useStyle();
      return (
          <React.Fragment>
              <Box m={1}>
                <label className={classes.label}>Port番号</label>
                <div className={classes.block}>
                    <label className={classes.input}>送信元</label><MaskedInput id="srcPort" className={classes.input}/>
                </div>
                <div className={classes.block}>
                    <label className={classes.input}>送信先</label><MaskedInput id="dstPort" />
                </div>
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