import { object, string } from "yup";

export const postUrlSchema = object({
  body: object({
    longUrl: string().required("Long Url is required."),
  }),
});

export const getUrlSchema = object({
    body: object({
      shortId: string().required("shortId is required."),
    }),
  });