const express = require('express');
const app = express();
const path = require('path')
const port = process.env.PORT || 3000;

//static file
app.use(express.static('public'));
app.use('/css',express.static(__dirname+ 'public/css'));
app.use('/js',express.static(__dirname+ 'public/js'));
app.use('/img',express.static(__dirname+ 'public/img'));
app.use('/audios',express.static(__dirname+ 'public/audios'));
//for three js files
app.use('/build', express.static(path.join(__dirname, 'node_modules/three/build')))
app.use('/jsm', express.static(path.join(__dirname, 'node_modules/three/examples/jsm')))

//set views 

app.set('views','./views');
app.set('view engine','ejs');

//render
app.get('', (req,res)=> {
    res.render('index');
})
app.get('/real-time-guitartuner', (req,res)=>{
    res.render('guitartuner');
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})