import { NextFunction, Request, Response } from "express";
import { AnySchema } from "yup";
 
export const validate =
    (schema: AnySchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
          try {
               schema.validate({
                  body: req.body,
                  params: req.params,
                  query : req.query
             })
          } catch (error : any) {
              next(error);
        }
  };
  }
  
