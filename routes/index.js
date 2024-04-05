var express = require('express');
var router = express.Router();

var user = require('../controller/usercontroller');

/* GET home page. */
router.post('/', user.insert);
router.get('/', user.get_data);

// router.post('/update_data/:id', user.update_data);
router.put('/update_data/:id', user.update_data);

// router.get('/delete_data/:id', user.delete_data);
router.delete('/delete_data/:id', user.delete_data);
router.get('/get_single/:id', user.get_single);
router.post('/get', user.get_bymail);


module.exports = router;
