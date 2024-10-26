import { HttpError } from "../helpers/HttpError.js";

export const validateBody = (schema) => {
    const foo = function (req, res, next) {
        const { error } = schema.validate(req.body);
        if (error) {
            next(HttpError(400, error.message = "The fields can't be empty"));
        }
        next();
    };
    return foo;
};
