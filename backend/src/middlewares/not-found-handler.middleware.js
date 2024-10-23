import createHttpError from 'http-errors';

export const notFoundHandlerMiddleware = (req, res, _next) => {
  throw createHttpError.NotFound('Route not found');
};
