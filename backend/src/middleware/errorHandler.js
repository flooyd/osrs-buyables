/**
 * Global error handler middleware
 */
export function errorHandler(err, req, res, next) {
  console.error('[Error]', err);

  // Default error status and message
  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // Send error response
  res.status(status).json({
    error: {
      message,
      status,
      timestamp: new Date().toISOString()
    }
  });
}

/**
 * 404 handler for unknown routes
 */
export function notFoundHandler(req, res) {
  res.status(404).json({
    error: {
      message: 'Route not found',
      status: 404,
      path: req.path
    }
  });
}
