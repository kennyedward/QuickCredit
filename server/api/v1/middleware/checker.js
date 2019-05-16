class Checker {
  static checkAdminStatus(req, res, next) {
    return (req.authData.isAdmin) ? next()
      : res.status(403).json({
        status: 403,
        error: 'You\'re forbidden to perform this action.',
      });
  }
}

export default Checker;
