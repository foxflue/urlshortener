import { object, string } from "yup";

export const userSchema = object({
  body: object({
    email: string()
      .trim()
      .required("Email is required.")
      .email("Must be a valid Email."),
    domain: string().required("Domain is required."),
  }),
});

export const loginSchema = object({
    body: object({
      email: string()
        .trim()
        .required("Email is required.")
        .email("Must be a valid Email."),
      apikey: string().required("Api Key is required."),
    }),
  });