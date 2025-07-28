// validationMiddleware.js

function validateFields(requiredFields) {
  return (req, res, next) => {
    const errors = [];
    requiredFields.forEach(field => {
      if (
        req.body[field] === undefined ||
        req.body[field] === null ||
        (typeof req.body[field] === 'string' && req.body[field].trim() === '')
      ) {
        errors.push(`${field} is required`);
      }
    });
    if (errors.length > 0) {
      return res.status(400).json({ error: errors.join(', ') });
    }
    next();
  };
}

module.exports = { validateFields };
