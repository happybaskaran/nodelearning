const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname+'/views/partials')
app.set('view engine','hbs');
app.use(express.static(__dirname+'/public'));

app.use((req,res,next)=>{
  var now = new Date().toString();
  let log = `${now} : ${req.method} ${req.url}`
  console.log(log);
  fs.appendFile('server.log',log+'\n',(err)=>{
    if(err){
      console.log('Uanble to append to server.log.');
    }
  });
  next();
});

// app.use((req,res,next)=>{
//   res.render('maintanence.hbs',{
//     header:'to Maintance Page',
//     hometitle:'Welcome to My first Node Page',
//   })
// });

hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear()
})

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
})

app.get('/',(req,res)=>{
  res.render('home.hbs',{
    header:'to Home Page',
    hometitle:'Welcome to My first Node Page',
    homebody:'Learning myself'
  });
});

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    header:'to About Page',
    pageTitle:'About Page'
  });
});

app.get('/contactus',(req,res)=>{
  res.send('Contact us Page');
})

app.get('/bad',(req,res)=>{
  res.send({
    error:"unable to get the required page",
    handler:"Try to refresh the page"
  });
});

app.listen(port,()=>{
  console.log(`Server is up on port ${port}`);
});
