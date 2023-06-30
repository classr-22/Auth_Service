const express = require('express');
const {validators} = require('../../middlewares/index')

const UserController = require('../../controllers/user-controller');

const router = express.Router();

router.post('/signup',validators.validator,UserController.create);
router.post('/signin',validators.validator,UserController.signIn);
router.get('/isAuthenticated',UserController.isAuthenticated);

module.exports=router;