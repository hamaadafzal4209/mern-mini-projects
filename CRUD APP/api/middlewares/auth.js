import jwt from 'jsonwebtoken';

export const verifyUser = (req, res, next) => {
    try {
      const token = req.cookies.token;
      if (!token) {
        return res.status(500).json({ success: false, message: "UnAuthorized" });
      }
  
      const decoded = jwt.verify(token, "jwtsecretkey")
      next();
      
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: error.message });
    }
  };