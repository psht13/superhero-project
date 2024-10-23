import { HttpError } from 'http-errors';

export const errorHandlerMiddleware = (err, req, res, _next) => {
  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({
      status: err.statusCode,
      message: 'Http error',
      data: err.message,
    });
  }

  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    data: err.message,
  });
};
