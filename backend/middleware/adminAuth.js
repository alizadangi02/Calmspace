const adminAuth = (req, res, next) => {
  if (!req.user || (req.user.userType !== 'admin' && !req.user.isAdmin)) {
    return res.status(403).json({ message: 'Access denied. Admin only.' });
  }
  next();
};

module.exports = adminAuth; 