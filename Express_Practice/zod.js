const express = require('express')
const zod = require('zod')

app = express()
app.use(express.json())

const schema = zod.array(zod.number())

// {
//      email: string => email
//      password: atleast 8 charaacters
//      country: "IN", "US"
// }

const registerSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8),
    country: zod.literal("IN").or(zod.literal("US")),
    kidneys: zod.array(zod.number())
})

app.get('/', function (req, res){
    res.send('This is zod tutorial!')
})

app.post('/health-checkup', function (req, res){

    const kidneys = req.body.kidneys;
    // const kidneysLength = kidneys.length;
    const response = schema.safeParse(kidneys);

    if (!response.success){
        res.json({
            msg: 'Invalid input'
        })
    } else {
    res.send({
        response
    })
}
    
})

app.listen(3000, (req, res) => {
    console.log('Listening on port 3000')
})