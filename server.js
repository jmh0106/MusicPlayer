const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8080

const config = require("./config/dev")

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

const { User } = require("./src/models/User")

const mongoose = require('mongoose')
mongoose.connect(config.mongoURL, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.listen(port, function(){
    console.log(`listening on ${port}`)
});

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html')
});

app.post('/register', async (req, res) => {
    const user = new User(req.body)

    await user.save().then(() => {
        res.status(200).json({
            success: true   
        })
    }).catch((err) => {
        res.json({ success: false, err })
    })
})

app.get('/playlist', function(req, res){
    res.send('플레이리스트 화면입니다.')
});

app.get('/bestmusic', function(req, res){
   res.send('인기곡 화면입니다.') 
});