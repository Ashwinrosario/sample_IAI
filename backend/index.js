const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors({
    origin:"*"
}))
app.use(express.urlencoded({extended:false}))
const port = process.env.port || 6080;
require('./conn.js')

const route = require('./route.js')
app.use(route)


app.listen(port,()=>{
    console.log(`server running at port ${port} `);
})
app.set("view engine", "ejs");