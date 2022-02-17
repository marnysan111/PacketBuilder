import React from "react";
import {Box, Grid} from '@material-ui/core';


export default function Readme() {
    return (
        <React.Fragment>
            <Box m={3}>
                <h2>README</h2>
                これはパケットを生成し送信を行うツールです。<br />
                本ツールを用いて犯罪行為や憲法違反になるような行為が発生した場合、本ツール作成者は一切の責任を負いかねます。
            </Box>
        </React.Fragment>
    )
}