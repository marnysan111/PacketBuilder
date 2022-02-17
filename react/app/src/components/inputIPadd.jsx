import React from "react";
import 'react-tabs/style/react-tabs.css';
import {Box} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import MaskedInput from "react-text-mask";
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function InputIPadd() {
  const classes = useStyle();
    const IPAdd = {
        guide: true,
        mask: value => {
          let result = [];
          const chunks = value.split(".");
      
          for (let i = 0; i < 4; ++i) {
            const chunk = (chunks[i] || "").replace(/_/gi, "");
      
            if (chunk === "") {
              result.push(/\d/, /\d/, /\d/, ".");
              continue;
            } else if (+chunk === 0) {
              result.push(/\d/, ".");
              continue;
            } else if (
              chunks.length < 4 ||
              (chunk.length < 3 && chunks[i].indexOf("_") !== -1)
            ) {
              if (
                (chunk.length < 2 && +`${chunk}00` > 255) ||
                (chunk.length < 3 && +`${chunk}0` > 255)
              ) {
                result.push(/\d/, /\d/, ".");
                continue;
              } else {
                result.push(/\d/, /\d/, /\d/, ".");
                continue;
              }
            } else {
              result.push(...new Array(chunk.length).fill(/\d/), ".");
              continue;
            }
          }
      
          result = result.slice(0, -1);
          return result;
        },
        pipe: value => {
          if (value === "." || value.endsWith("..")) return false;
      
          const parts = value.split(".");
      
          if (
            parts.length > 4 ||
            parts.some(part => part === "00" || part < 0 || part > 255)
          ) {
            return false;
          }
          return value;
        }
      };

    
    
    return (
        <React.Fragment>
            <Box m={1}>
              <label className={classes.label}>IPアドレス</label>
              <div className={classes.block}>
              <label className={classes.input}>送信先</label><MaskedInput {...IPAdd} id="dstIP" className={classes.input}/>
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

