import React from "react";
import { makeStyles, Box } from '@material-ui/core';
import 'react-tabs/style/react-tabs.css';
import MaterialTable from 'material-table';
export default function Footer(props) {
    const classes = useStyle()
    const status = props.status;
    return (
        <React.Fragment>
            <div className={classes.footer}>

                <Box m={2}>
                <MaterialTable 
                    columns={[
                        {title: 'メッセージ', field: 'message'},
                        {title: '送信先IPアドレス', field: 'dstIP'},
                        {title: '送信回数', field: 'times'},
                        {title: '結果', field: 'result'},
                        {title: 'エラーメッセージ', field: 'err'},
                    ]}
                    data={status}
                    
                    options={{
                        showTitle: false,
                        search: false,
                        toolbar: false,
                    }}
                />
                </Box>
            </div>
        </React.Fragment>
    )
}


const useStyle = makeStyles(() => ({
    footer: {
        borderTop: "1px solid rgba(0, 0, 0, 0.5)",
        bottom: 0,
        position: "absolute",
        height: "45vh",
        width: "100%",
    }
}))
