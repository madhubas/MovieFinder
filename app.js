const express = require('express');
const { pathToFileURL } = require('url');
const morgan = require('morgan');
const request = require('request');
const path = require('path');
const app=express();

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');


app.use(morgan('tiny'));
app.use(express.static('public'));

app.get('/search',(req,res)=>{
    res.render('search');
});

app.get('/movies',(req,res)=>{
    let query = req.query.search;
    request("https://api.themoviedb.org/3/search/movie?api_key=ebac79e6e3e8cb2bfd47910ed32ad71e&query="+query,(err,response,body)=>{
        if(err){
            console.log("movie not found");
        }
        let data = JSON.parse(body);
        res.render('movies',{data:data,squery:query});
        //let query = req.body.search;

    })
    
});

app.listen(3000,()=>{
    console.log(`server is running on http://localhost:3000/search`);
});