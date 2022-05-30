"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const validate = (schema) => {
    return (req, res, next) => {
        try {
            schema.validate({
                body: req.body,
                params: req.params,
                query: req.query
            });
        }
        catch (error) {
            next(error);
        }
    };
};
exports.validate = validate;
