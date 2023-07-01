const validator = (req,res,next) => {
    if(!req.body.email || !req.body.password){
        return res.status(400).json({
            success: false,
            data: {},
            message: 'something went wrong',
            err: 'Email or password missing in the request'
        })
    }

    next();
}

const isAdminvalidator = (req,res,next) => {
    if(!req.body.id){
        return res.status(400).json({
            success: false,
            data: {},
            message: 'something went wrong',
            err: 'userId is missing in the request'
        })
    }

    next();
}

module.exports={
    validator,
    isAdminvalidator
}