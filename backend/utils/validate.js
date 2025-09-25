import { object, string } from "yup";
export const registerscheema = object({
  email: string().email().required(),
  username: string().min(3).required(),
  password: string().min(6),
});
export const loginscheema = object({
  username: string().required(),
  password: string().min(6),
});
export const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const errortxt = error.errors.join(",");
    const err = new Error(errortxt);
    next(err);
  }
};
