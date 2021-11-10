import Joi from "joi";

const joiSchema = Joi.object({
  userName: Joi.string().alphanum().min(3).max(30).required(),

  password: Joi.string().pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{6,}$")),

  repeatPassword: Joi.ref("password"),
});

export default joiSchema;
