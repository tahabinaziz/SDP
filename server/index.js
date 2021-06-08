const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser')
const admin = require('./modules/admin/route');
const course = require('./modules/course/route');
const teacher = require('./modules/teacher/route');

const https = require('https');
const fs = require('fs');
/*Middleware */
// const auth = require('./middleware/auth');
const app = express();
app.use(express.json());
app.use(cors());

app.use(bodyParser.json());
//app.use(auth);

//PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{console.log(`Server has started on port: ${PORT}`)});
app.use(express.urlencoded({ extended: true })); 


/*Connection String*/
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
mongoose.connect("mongodb+srv://sdp:sdp@123@sdp.wkhmx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
.then( () => console.log("connected to DB."))
.catch( err => console.log(err));

app.use('/api/admin', admin);
app.use('/api/course', course);
app.use('/api/teacher', teacher);


