const UserService = require('../services/user-service');

const userService = new UserService();

const create = async(req,res) => {
    try {
        const response = await userService.create({
            email: req.body.email,
            password: req.body.password
        });
        return res.status(201).json({
            success: true,
            message: 'successfully created a new user',
            data: response,
            err: {}
        })
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode).json({
            success: false,
            message: error.message,
            data: {},
            err: error.explanation
        })
    }
}

const signIn = async(req,res) => {
    try {
        const response = await userService.signIn(req.body.email,req.body.password);
        res.status(200).json({
            success: true,
            data: response,
            message: "successfully logged in",
            err: {}
        })
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode).json({
            success: false,
            message: error.message,
            data: {},
            err: error.explanation
        })
    }
}


const isAuthenticated = async(req,res) => {
    try {
        const token = req.headers['x-access-token'];
        const user = await userService.isAuthenticated(token);
        res.status(200).json({
            success: true,
            data: user,
            message: "user is Authenticated",
            err: {}
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'somthing went wrong',
            data: {},
            err: error
        })
    }
}

const isAdmin = async(req,res) => {
    try {
        const result = await userService.isAdmin(req.body.id)
        return res.status(200).json({
            success: true,
            data: result,
            message: 'successfully fetched whether user is authorized as admin or not',
            err: {}
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'somthing went wrong',
            data: {},
            err: error
        });
    }
}


module.exports = {
    create,
    signIn,
    isAuthenticated,
    isAdmin
}