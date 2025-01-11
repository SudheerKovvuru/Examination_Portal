import Joi from "joi";

const loginValidation = (req, res, next) => {
    const schema=Joi.object({
        username:Joi.string().min(3).required(),
        password:Joi.string().min(6).required()
    })
    const {error}=schema.validate(req.body);
    if(error){
        return res.status(400).json({message:"bad request",error});
    }
    next();
};

const signupValidation = (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().min(3).required(),
        password: Joi.string().min(6).required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "bad request",error});
    }
    next();
};

export { loginValidation, signupValidation };
