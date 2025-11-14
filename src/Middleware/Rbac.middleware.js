export const Rbac = (roles = []) => {
  return (req, res, next) => {
    try {
     
      if (!req.user) {
        return res.status(401).json({
          status: false,
          message: "Unauthorized",
        });
      }

     
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          status: false,
          message: "Access denied",
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  };
};


export default Rbac
