import Joi from "joi";

const joiSchema = Joi.object({
  userName: Joi.string().alphanum().min(3).max(30).required(),

  password: Joi.string().pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!*()@%&])[\\s\\S]{6,}$")),

  repeatPassword: Joi.ref("password"),

  country: Joi.string().alphanum().min(2).required(),

  city: Joi.string().alphanum().min(2).required(),

  street: Joi.string().min(2).required(),

  houseNumber: Joi.number().required(),

  houseBuilding: Joi.string().min(1).required(),

  entranceNumber: Joi.number().required(),

  floorNumber: Joi.number().required(),

  flatNumber: Joi.number().required(),
});

export default joiSchema;
