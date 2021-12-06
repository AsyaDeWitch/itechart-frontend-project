import Joi from "joi";

export const joiLoggingSchema = Joi.object({
  userName: Joi.string().alphanum().min(3).max(30).required(),

  password: Joi.string().pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!*()@%&])[\\s\\S]{6,}$")).required(),

  repeatPassword: Joi.ref("password"),
});

export const joiAddressSchema = Joi.object({
  country: Joi.string().alphanum().min(2).required(),

  city: Joi.string().alphanum().min(2).required(),

  street: Joi.string().min(2).required(),

  houseNumber: Joi.number().required(),

  houseBuilding: Joi.string().min(1).required(),

  entranceNumber: Joi.number().required(),

  floorNumber: Joi.number().required(),

  flatNumber: Joi.number().required(),
});

export const joiPasswordSchema = Joi.object({
  password: Joi.string().pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!*()@%&])[\\s\\S]{6,}$")).required(),

  repeatPassword: Joi.ref("password"),
});

export const joiProfileSchema = Joi.object({
  userName: Joi.string().alphanum().min(3).max(30).required(),

  description: Joi.string().min(1).required(),

  email: Joi.string().pattern(new RegExp("^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$")).required(),

  phoneNumber: Joi.string().pattern(new RegExp("^\\+?(\\d[\\d\\-. ]+)?(\\([\\d\\-. ]+\\))?[\\d\\-. ]+\\d$")).required(),

  balance: Joi.number().min(0).required(),
});

export const joiProductShema = Joi.object({
  name: Joi.string().min(3).max(100).required(),

  dateCreated: Joi.string().required(),

  totalRating: Joi.number().min(0).required(),

  logo: Joi.string(),

  price: Joi.number().min(0).required(),

  description: Joi.string().min(1).required(),
});
