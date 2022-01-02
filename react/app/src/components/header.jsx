import {Box} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import axios from 'axios';

export default function Header() {
    const classes = useStyle()
    return (
        <>
        <header className={classes.root}>
            <Box>
          <button onClick={send}>send</button>

            </Box>
        </header>
        </>
    )
}


const useStyle = makeStyles(() => ({
    root: {
        width: "auto",
        height: "60px",
        borderBottom: "1px solid rgba(0, 0, 0, 0.5)",
    }
}))

function send() {
    axios.post('http://192.168.1.21:80/tcp',{"srcIP": "192.168.1.10","dstIP": "192.168.1.254", "srcMac": "08:00:27:24:2c:c1", "dstMac": "0a:00:27:00:00:16", "times": 2, "device": "enp0s8", "srcPort":80, "dstPort": 80})
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    console.log("SEND")
  };