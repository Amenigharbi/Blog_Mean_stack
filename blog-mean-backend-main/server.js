const express = require('express');
const acteurapi = require('./routes/acteur');
const filmApi = require('./routes/film');
const cors = require('cors')
require('./config/connect');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/acteur' , acteurapi);
app.use('/film' , filmApi);

app.use('/getimage' , express.static('./uploads'));


app.listen(4000, ()=>{
    console.log('server work');
})