import express from 'express'
import 'dotenv/config'
import { connectDB } from './db/dbconfig.js'
import Notes from './routes/router.js'
import cors from 'cors'

const app = express()
const port = process.env.port 

connectDB()

app.use(cors());
const allowedOrigins = [
    'http://localhost:5173',
    'https://notes-app-ruddy-five.vercel.app/'
]
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.use(express.json())

app.use('/Notes', Notes)

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

