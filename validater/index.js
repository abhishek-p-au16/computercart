// const {check}= require('express-validator')

// exports.userSignupValidater = (req, res,next) => {
//     req.ch('username','username  required').notEmpty();
//     req.check('email','email must be 7 to 35 charactors')
//     .matches(/.+\@.+\..+/)
//     .withMessage('email must contain @')
//     .islength({
//         min:4,max:32
//     })
//     req.check('password','password is required')
//     .notEmpty()
//     .islength({min:8})
//     .withMessage('password must be at least 8 characters')
//     .matches(/\d/)
//     .withMessage('password must contain a digit')

//     const errors = req.validationErrors()
//     if(errors){
//         const firstError = errors.map(error => error.msg)[0]

//         return res.status(400).json.string({error : firstError})
//     }
//     next()
                                                        
// }