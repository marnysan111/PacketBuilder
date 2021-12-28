import {Box} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

export default function Header() {
    const classes = useStyle()
    return (
        <>
        <header className={classes.root}>
            <Box>
            </Box>
        </header>
        </>
    )
}


const useStyle = makeStyles(() => ({
    root: {
        width: "100%",
        height: "60px",
        borderBottom: "1px solid rgba(0, 0, 0, 0.5)",
    }
}))