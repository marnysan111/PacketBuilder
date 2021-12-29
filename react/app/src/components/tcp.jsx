import React from "react";
import {Box, TextField, List, ListItemText } from '@material-ui/core';
import 'react-tabs/style/react-tabs.css';
export default function TCP(props) {
    return (
        <React.Fragment>
            <Box m={3} >
                <h2>TCPによる攻撃</h2>
                <List>
                <ListItemText>
                <TextField label="送信先IPアドレス" variant="outlined" />
                </ListItemText>
                <ListItemText>
                <TextField label="送信元IPアドレス" variant="outlined" />
                </ListItemText>
                </List>
            </Box>
        </React.Fragment>
    )
}