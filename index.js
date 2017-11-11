const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
require('./models')
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
// app.use(express.static(path.join(__dirname,'public')));
// app.use(express.static(path.join(__dirname,'views')));

require('./routes/todos')(app);
require('./routes/auth')(app);

// app.get('/',(req,res)=>{
//     res.sendFile('index.html')
// })

app.listen(PORT,()=>{
    console.log('server is listening')
})