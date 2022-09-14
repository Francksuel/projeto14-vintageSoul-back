import joi from "joi";

const signInSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(4). required()
});

const signInValidationSchema = (req, res, next) => {
    const signIn = req.body;
    const validation = signInSchema.validate(signIn, { abortEarly: false });

    if(validation.error) {
        const errors = validation.error.details.map((error) => error.message).join(" & ");
        return res.status(422).send(errors);
    };

    res.locals.signIn = signIn;
    next()
};

export {signInValidationSchema}