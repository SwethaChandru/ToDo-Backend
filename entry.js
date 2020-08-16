var mongoose=require('mongoose');
var express=require('express');
const bodyparser=require('body-parser');
const cors=require('cors');
 
var app=express();
app.use(cors({}));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true })); 

mongoose.connect('mongodb://localhost:27017/ToDoList', { useNewUrlParser: true }, (err) => {
    if (err) {
      console.log(err);
      console.log('Error while Connecting!')
    } else {
      console.log('Connected to Mongo DB')
    }
  });

const uroute=require('./routes/userRoute');
app.use('/user',uroute);

const troute=require('./routes/taskRoute');
app.use('/task',troute);


const PORT=3000;

app.listen(PORT,()=>{
    console.log('server has been started at port:' +PORT);
})