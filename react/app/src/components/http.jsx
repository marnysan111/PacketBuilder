import React from "react";
import {Box, Grid} from '@material-ui/core';


export default function HTTP() {
    return (
        <React.Fragment>
            <Box m={3}>
                <h2>HTTP通信</h2>
                <form>
                    <Grid container>
                        <Grid item xs={12}>
                            送信先
                        </Grid>
                        <Grid item xs={12}>
                            メソッド
                        </Grid>
                        <Grid item xs={12}>
                            回数
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </React.Fragment>
    )
}