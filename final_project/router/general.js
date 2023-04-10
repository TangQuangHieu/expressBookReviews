const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  if(username && password){
      if(!isValid(username)){
          users.push({"username":username,"password":password});
          return res.status(200).json({message: "User successfully registed.Now you can login"});
      }else{
          res.status(404).json({message: "User already exists!app"});
      }
  }
  else res.status(404).json({message: "Unable to register user."})
});

// Get the book list available in the shop
// public_users.get('/', (req, res)=>{
//   //Write your code here
//   //console.log(books);
// res.send(JSON.stringify(books,null,4));
// });
let promise_get_all = new Promise((resolve,reject)=>{
    resolve(public_users.get('/'))
}
    )
    promise_get_all.then((req, res)=>{
        //   //Write your code here
        //   //console.log(books);
        return res.status(200).json(books);
    })

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  const book = books[isbn];
  //console.log(book);
  if(book)
    return res.status(200).json(book);
  else return res.status(404).json({message: "Invalid isbn"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  let matchedBooks=[];
  for (const [key, value] of Object.entries(books)) {
    if(value.author === author)
        matchedBooks.push(books[key]);
  }
  if(matchedBooks.length>0){
      return res.status(200).json(matchedBooks);
  }else 
    return res.status(404).json({message: "Not found"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  let matchedBooks=[];
  for(const[key,value] of Object.entries(books)){
      if(value.title === title){
            matchedBooks.push(books[key]);
      }
  }
  if(matchedBooks.length >0){
      return res.status(200).json(matchedBooks);
  }else 
    return res.status(404).json({message: "Not found"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  let book = books[isbn];
  if(book){
      return res.status(200).json(book.reviews);
  }else 
    return res.status(404).json({message: "Not found"});
});

module.exports.general = public_users;
