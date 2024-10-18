const accessControl = (...allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user.role; // Asumsikan user.role sudah ada di req.user

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
};

module.exports = accessControl;
