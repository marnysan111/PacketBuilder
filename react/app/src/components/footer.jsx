import React, {useState} from "react";
import {Box, TextField, List, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import 'react-tabs/style/react-tabs.css';

export default function Footer(props) {
    const classes = useStyle()
    return (
        <React.Fragment>
            <div className={classes.footer}>
                footer
            </div>
        </React.Fragment>
    )
}


const useStyle = makeStyles(() => ({
    footer: {
        borderTop: "1px solid rgba(0, 0, 0, 0.5)",
        bottom: 0,
        position: "absolute",
        height: "25vh",
        width: "100%",
    }
}))