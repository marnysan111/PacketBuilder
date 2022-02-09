import React, {useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core';
import {Box} from '@material-ui/core';
import 'react-tabs/style/react-tabs.css';

export default function InputMethods() {
    const [methods, setMethods] = useState([
        "GET", "HEAD", "POST", "PUT", "DELETE", "CONNECT", "OPTIONS", "TRACE", "PATCH"
    ])


    const classes = useStyle();
    return (
        <React.Fragment>
          <Box m={1}>
            <label className={classes.label}>メソッド名</label>
            <select id="device">
              {methods.map((data) =>
                <option value={data}>{data}</option>
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