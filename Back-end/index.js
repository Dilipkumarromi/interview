const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const router=require('./router/router')
const cors=require('cors')
const path = require('path');
app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT,PATCH,OPTIONS");
     // Pass to next layer of middleware
     next();
 })
app.use(cors({
    origin:['*']
  }));
  app.use(express.static('attechSeprateSheet')); 
  app.use('/public/profile/', express.static('public/profile/'));
  app.use(express.static(path.join(__dirname, '/public/profile/')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(router)




const port = 3000
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Server listening on port ${port}!`))