const express = require('express');

const router = express.Router();

router.get('/',(req,res,next)=>{
    res.send('<h1>Hello from the express.js</form>')
    
});

module.exports = router;