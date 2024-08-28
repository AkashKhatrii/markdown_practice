const express = require('express')
app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.json({
        msg: "Hello there!"
    })
})

app.listen(3000, (req, res) => {
    console.log('Listening on 3000');
})