var express=require('express');
var router=express.Router();

const taskCon=require('../controllers/taskControllers');

router.post('/',taskCon.addtask);
router.get('/:date/:userid',taskCon.gettask);
router.put('/',taskCon.updateDeliveryStatus);
router.put('/deliver',taskCon.updateStatus);

module.exports=router;