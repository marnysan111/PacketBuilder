import { makeStyles } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import {Box} from '@material-ui/core';


export default function Template(props) {
    const classes = templateStyle();
    return (
        <>
        <Box className={classes.template_back}>
            <Box className={classes.title}>
            Template
            </Box>
            <Box className={classes.addButton} m={1}>
                <AddBoxIcon color="primary" onClick={addClick}/>
            ADD
            </Box>
        </Box>
        </>
    )
}


const templateStyle = makeStyles(() => ({
    template_back: {
        background: "",
        height: "100vh",
        width: "250px",
        float: "left",
        textAlign: "center",
        borderRight: "1px solid rgba(0, 0, 0, 0.5)",
    },
    title: {
        fontWeight: "bold",
        fontSize: "36px",
    },
    addButton: {
        display: "flex",
        alignItems: 'center',
        fontSize: "20px",
        fontWeight: "bold",
    }
}))


function addClick(e) {
    e.preventDefault();
    alert("Clicked");
    console.log("Clicked addClick");
}