import React, {useState} from "react";
import 'react-tabs/style/react-tabs.css';
import {Grid, Box} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import MaskedInput from "react-text-mask";
import { useTheme } from '@material-ui/core/styles';

export default function InputTCP(props) {
  const classes = useStyle();
    const srcIPadd = {
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
          props.SrcIP(value);
          return value;
        }
      };

      const dstIPadd = {
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
          props.DstIP(value);
          return value;
        }
      };
    
    
    return (
        <React.Fragment>
            <Box>
              <label>送信先IPアドレス</label>
<<<<<<< HEAD
              <MaskedInput {...srcIPadd} className="form-control" className={classes.input} />
              <label>送信先IPアドレス</label>
              <MaskedInput {...srcIPadd} className="form-control"/>
            </Box>

            <Box>
              <label>送信元IPアドレス</label>
              <MaskedInput {...dstIPadd} className="form-control"/>
=======
              <MaskedInput {...srcIPadd} className="form-control"/>
              <label>送信元IPアドレス</label>
              <MaskedInput {...dstIPadd}/>
>>>>>>> 2a45f058a4d52e7d82cbfaf22884772295ce4a6a
            </Box>

        </React.Fragment>
    )
}


const useStyle = makeStyles(() => ({
  input: {
      marginRight: "70px"
  }
}))