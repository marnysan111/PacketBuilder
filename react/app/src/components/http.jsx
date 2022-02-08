import React from "react";
import {Box, Grid} from '@material-ui/core';

export default function HTTP() {
    const handleSubmit = e => {
        e.preventDefault();
        alert("a")
    }

    return (
        <React.Fragment>
            <Box m={3}>
                <h2>HTTP通信</h2>
                <form onSubmit={handleSubmit}>
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
                        <button type="submit">送信</button>
                    </Grid>

                </form>
            </Box>
        </React.Fragment>
    )
}