const express = require('express');
const app = express();

app.get('/', (req, res)=> {
    res.status(200).json({ msg: "Hello World!" });
})

app.listen(8080, (err) => {
    if (err) {
        console.log(err);
    }else {
        console.log('Server is Running! 🚀');
    }
})