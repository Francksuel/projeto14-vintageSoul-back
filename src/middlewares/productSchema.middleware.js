import joi from "joi";

const productSchema = joi.object({
	type: joi.string().valid("vinis", "instrumentos", "acessórios"),
	title: joi.string().required().min(1),
	image: joi.string().required(),
	price: joi.number().integer().positive().required(),
	genre: joi.array().items(joi.string()).min(1).required(),
	inventory: joi.number().integer().positive().required(),
	especifications: joi
		.object({
			description: joi.string().min(1).required(),
			company: joi.string().min(1).required(),
			year: joi.number().less(2022).greater(1900).required(),
		})
		.required(),
});

const productValidationSchema = (req, res, next) => {
	const product = req.body;
	const validation = productSchema.validate(product, { abortEarly: false });

	if (validation.error) {
		const errors = validation.error.details
			.map((error) => error.message)
			.join(" & ");
		return res.status(422).send(errors);
	}

	res.locals.product = product;
	next();
};

export { productValidationSchema };
