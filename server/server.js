const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
var bodyparser = require('body-parser');
const mongoose = require('mongoose');
const BookData = require('./models/bookdata');
const AuthorData = require('./models/authordata');
const User = require('./models/user');


    

const db ="mongodb+srv://jamsheela:jamsheela@books.ctiie.mongodb.net/jamsheelaretryWrites=true&w=majority";
mongoose.connect(db,err=>{
    if(err){
        console.error('Error!' + err)
    }else{
        console.log('Connected to mongodb'); 
    }
});

var bookController = require('./controllers/bookcontroller.js')
var authorController = require('./controllers/authorController.js')
 
var app = new express();
app.use(bodyparser.json());
app.use(cors());
app.use(express.static('./public'));
app.use(express.json());



// hosting

const path = require('path');
app.use(express.static('./dist/client'));

app.use('/api/book',bookController);
app.use('/api/author',authorController);
   
// hosting end

app.get('/api/books',function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods: GET,POST,PATCH,PUT,DELETE,OPTIONS')
    BookData.find()
          .then(function(books){
              console.log(books);
              res.send(books);
          });
});

app.get('/api/authors',function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods: GET,POST,PATCH,PUT,DELETE,OPTIONS')
    AuthorData.find()
          .then(function(authors){
              console.log(authors);
              res.send(authors);
          });
});

app.post('/api/insert',function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods: GET,POST,PATCH,PUT,DELETE,OPTIONS')
    console.log(req.body);

var book ={
    bookId : req.body.book.bookId,
    bookName : req.body.book.bookName,
    bookCode : req.body.book.bookCode,
    authorName : req.body.book.authorName,
    description : req.body.book.description,
    price : req.body.book.price,
    starRating : req.body.book.starRating,
    imageUrl : req.body.book.imageUrl

}
var book = new BookData(book);
book.save();
});

app.post('/api/insertauth',function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods: GET,POST,PATCH,PUT,DELETE,OPTIONS')
    console.log(req.body);

var author ={
    authorName : req.body.author.authorName,
    majorworks : req.body.author.majorworks,
    description : req.body.author.description,
    imageUrl : req.body.author.imageUrl

}
var author = new AuthorData(author);
author.save();
});





app.post('/api/edit',function(req,res){
    res.header("Access-Control-Allow-Origin","*");
    res.header('Access-Control-Allow-Methods: GET,POST,PATCH,PUT,DELETE,OPTIONS');
    console.log(req.body);

    var book ={
        _id : req.body.book._id,
        bookId : req.body.book.bookId,
        bookName : req.body.book.bookName,
        bookCode : req.body.book.bookCode,
        authorName : req.body.book.authorName,
        description : req.body.book.description,
        price : req.body.book.price,
        starRating : req.body.book.starRating,
        imageUrl : req.body.book.imageUrl
    
    }
console.log("Data got in server in edit " +book._id);
BookData.updateOne(
    {_id:req.body.book._id},{$set:book},
     function(err,res){
     if(err){
         console.log(err)
        }
    }
     )
     
});

app.post('/api/editauth',function(req,res){
    res.header("Access-Control-Allow-Origin","*");
    res.header('Access-Control-Allow-Methods: GET,POST,PATCH,PUT,DELETE,OPTIONS');
    console.log(req.body);

    var author ={
        authorName : req.body.author.authorName,
        majorworks : req.body.author.description,
        description : req.body.author.majorworks,
        imageUrl : req.body.author.imageUrl
    
    }
console.log("Data editted successfuly in  " +author._id);
AuthorData.updateOne(
    {_id:req.body.author._id},{$set:author},
     function(err,res){
     if(err){
         console.log(err)
        }
    }
     )
     
});




app.post('/api/delete',function(req,res){
    res.header("Access-Control-Allow-Origin","*");
    res.header('Access-Control-Allow-Methods: GET,POST,PATCH,PUT,DELETE,OPTIONS');
    console.log(req.body);

    var book ={
        bookId : req.body.book.bookId,
        bookName : req.body.book.bookName,
        bookCode : req.body.book.bookCode,
        authorName : req.body.book.authorName,
        description : req.body.book.description,
        price : req.body.book.price,
        starRating : req.body.book.starRating,
        imageUrl : req.body.book.imageUrl
    
    }
console.log("backend server item is " +book._id);
BookData.deleteOne(
    {_id:req.body.book._id})
    .then(function(books){
        res.send(books);
    });
    console.log('deleted ')

});

app.post('/api/deleteauth',function(req,res){
    res.header("Access-Control-Allow-Origin","*");
    res.header('Access-Control-Allow-Methods: GET,POST,PATCH,PUT,DELETE,OPTIONS');
    console.log(req.body);

    var author ={
        authorName : req.body.author.authorName,
        majorworks : req.body.author.description,
        description : req.body.author.majorworks,
        imageUrl : req.body.author.imageUrl
    
    }
console.log("backend server item is " +author._id);
AuthorData.deleteOne(
    {_id:req.body.author._id})
    .then(function(authors){
        res.send(authors);
    });
    console.log('deleted')

});





app.post('/api/register',function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE,OPTIONS")
     let userData= req.body;
     let user = new User(userData);
     user.save((err,registeredUser)=>{
         if(err){console.log(err)}
         else{
            // let payload = {subject:user._id}
            // let token = jwt.sign(payload,'secretKey') 
            let token ="user"
            res.status(200).send({token})}

     })

     

})

app.post('/api/login',(req,res)=>{
    let userData =req.body;
    User.findOne({email: userData.email},(err,user)=>{
        if(err)
            {
                console.log(err);
            }
        else{
            if(!user)
                {
                    res.status(401).send('inavlid email')
                }
            else {
               if(user.password != userData.password)
                {
                    res.status(401).send('invalid password')
                }
            else{
               
                    // let payload = {subject:user._id}
                    // let token = jwt.sign(payload,'secretKey') 
                    let token = "user"
                    res.status(200).send({token})
                   
                }
               
            }
        }
    })


})

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/client/index.html'));
   });

    app.listen(3000,function(){
        console.log('server ready at port 3000');
    });
