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
    axios.post('http://192.168.1.21:80/tcp',{"srcIP": "192.168.1.21","dstIP": "192.168.1.254", "srcMac": "08:00:27:9d:91:3a", "dstMac": "0a:00:27:00:00:0b", "times": 2, "device": "enp0s8", "srcPort":1200, "dstPort": 1200})
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    console.log("SEND")
  };