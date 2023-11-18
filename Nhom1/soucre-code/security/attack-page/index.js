const express = require('express');
const app = express();
const port = 1912

app.get('/', (req, res) => {
    res.sendFile('./attack.html', { root: __dirname })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})