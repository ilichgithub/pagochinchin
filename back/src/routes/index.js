const { Router } = require('express');
const router = Router();


router.get('/test',(req,res) => {
    res.json({titulo:'Hello World.'});
});


router.post('/login',(req,res) => {
    console.log(req.body);
    const { user, pass } = req.body;
    if (user == 'admin1' && pass == 'admin1') {
        res.json({'result':true});
    }else{
        res.json({'result':false});
    }
});

module.exports = router;