import express from 'express'
import mongoos from 'mongoose'
import dbCards from './dbCards.js';
import cards from './dbCards.js'
import Cors from 'cors'

//App Config
const app = express();
const port = process.env.PORT || 8001
const connection_url = 'mongodb+srv://Admin:bRVDDVU7SKE6zFxn@cluster0.xd4ia.mongodb.net/tinderdb?retryWrites=true&w=majority'
//Middlewares
app.use(express.json())
app.use(Cors())
//DB Config
mongoos.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})

//API Endpoints
app.get('/', (req,res) => {
    res.status(200).send('Running')
})

app.post('/tinder/cards', (req, res) => {
    const dbCards = req.body;

    cards.create(dbCards, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})

app.get('/tinder/cards', (req, res) => {
    const dbCards = req.body;

    cards.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

//Listener 
app.listen(port, () => console.log(`Listening on localhost: ${port}`))