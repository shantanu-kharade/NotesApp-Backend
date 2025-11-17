import express from 'express'
import 'dotenv/config'
import { connectDB } from './db/dbconfig.js'
import Notes from './routes/router.js'
import cors from 'cors'

const app = express()
const port = process.env.port || 3000

connectDB()

app.use(cors());
app.use(express.json())
app.use('/Notes', Notes)

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

