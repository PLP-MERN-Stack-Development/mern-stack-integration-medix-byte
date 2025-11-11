export const errorHandler = (err, req, res, next) => {
  console.error(err);
  const status = err.statusCode || 500;
  const payload = { message: err.message || 'Server Error' };
  if (process.env.NODE_ENV === 'development') payload.stack = err.stack;
  res.status(status).json(payload);
};
