import {body} from 'express-validator' ;


const userRegisterValidator = () => {
    return [
        body('name')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Email is not valid'),
        body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({min:3 , max:30})
        .withMessage('Name must be between 3 to 30 characters long'),
        body('username')
        .notEmpty()
        .withMessage('Username is required')
        .isLength({min:3 , max:30})
        .withMessage('Username must be between 3 to 30 characters long'),
        body('fullName')
        .optional()
        .notEmpty()
        .withMessage('Full Name cannot be empty')
        .isLength({min:3 , max:30})
        .withMessage('Full Name must be between 3 to 30 characters long'),

    ]



}


const userloginValidator = () =>{
    return [
        body('email')
        .optional()
        .notEmpty()
        .withMessage('Email is required') ,
        body('password')
        .notEmpty()
        .withMessage('Password is required')    


    ]
}

export { userRegisterValidator  , userloginValidator};

