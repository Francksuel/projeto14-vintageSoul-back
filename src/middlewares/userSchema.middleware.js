import joi from "joi";
import { stripHtml } from "string-strip-html";

const userSchema = joi.object({
	name: joi.string().min(3).required(),
	email: joi.string().email().required(),
	password: joi.string().min(4).required(),
	confirmPassword: joi.ref("password"),
	street: joi.string().min(5).required(),
	numberHouse: joi.number().integer().min(1),
	city: joi.string().min(1).required(),
	state: joi.string().length(2).required(),
});

const userValidationSchema = (req, res, next) => {
	const registry = req.body;
	const firstValidation = userSchema.validate(registry, { abortEarly: false });
	if (!firstValidation.error) {
		registry.name = stripHtml(registry.name).result.trim();
		registry.email = stripHtml(registry.email).result.trim();
		registry.street = stripHtml(registry.street).result.trim();
		registry.city = stripHtml(registry.city).result.trim();
		registry.state = stripHtml(registry.state).result.trim();
	}
	const userValidation = userSchema.validate(registry, { abortEarly: false });
	if (userValidation.error) {
		const errors = userValidation.error.details.map((error) => error.message);
		return res.status(422).send(errors);
	}
	res.locals.registry = registry;
	next();
};
export { userValidationSchema };
