const express = require('express')
const fs = require('fs')
app = express()

const users = [{
    name: 'Akash',
    kidneys: [{
        isHealthy: true,
    }]
}]
app.use(express.json())

function checkKidney(req, res, next){
    if (!req.body.kidney.isHealthy){
        res.status(404).json({
            msg: 'Kidney not healthy'
        })
    } else {
        next();
    }
}

app.get('/', (req, res) => {
    let numHealthy = 0

    for (let i = 0; i < users[0].kidneys.length; i += 1){
        if (users[0].kidneys[i].isHealthy){
            numHealthy += 1
        }
    }

    const numUnHealthy = users[0].kidneys.length - numHealthy
    const totalKidneys = users[0].kidneys.length
    res.json({
        user: users[0],
        totalKidneys,
        numHealthy,
        numUnHealthy
    })
})

// inserts unhealthy kidney
app.post('/', (req, res) => {
    users[0].kidneys.push({
        isHealthy: false
    })

    res.json({'msg': 'Added!'})
})

app.put('/', (req, res) => {
    for (let i = 0; i < users[0].kidneys.length; i ++){
        if (!users[0].kidneys[i].isHealthy){
            users[0].kidneys[i].isHealthy = true
        }
    }
    res.json({'msg': 'All kidneys are healthy now!'})
})

// inserts healthy kidney
app.post('/new_kidney', checkKidney, (req, res) => {
    users[0].kidneys.push({
        isHealthy: true
    })
    res.json({
        msg: 'New healthy kidney inserted!'
    })
})

app.listen(3000, () => {
    console.log('Listening on 3000')
})