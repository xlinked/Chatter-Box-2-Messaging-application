const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override')
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const User = require('./models/User'); //the connection to users database
const bodyParser = require('body-parser');
const socket = require('socket.io');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://tyler:1234@nodetut.ugzlp.mongodb.net/node-auth?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
const port = process.env.PORT || 3000;

// routes
app.get('*', checkUser);
app.get('/', requireAuth, function(req, res) {
  User.find({}).exec(function(err, users) {   
      if (err) throw err;
      res.render('profiles', { "users": users });
  })
});

//Render index page
app.get('/index', (req, res) => {
  res.render('index')
})

//Get username and roomname from form and pass it to room
app.post('/room', (req, res) => {
  roomname = req.body.roomname;
  username = req.body.username;
  res.redirect(`/room?username=${username}&roomname=${roomname}`)
})
//Rooms
app.get('/room', (req, res)=>{
  res.render('room')
})

app.get('/create', requireAuth, (req, res) => res.render('create'));
app.use(authRoutes);

//Start Server
const server = app.listen(port, () => {
  console.log(`Server Running on ${port}`)
})

const io = socket(server);
require('./utils/socket')(io);
