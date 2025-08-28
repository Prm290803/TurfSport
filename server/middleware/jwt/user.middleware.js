import jwt from "jsonwebtoken";

const verifyUserToken = (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = header.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: Token missing" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({ message: "Unauthorized: Token expired" });
        } else if (err.name === "JsonWebTokenError") {
          return res.status(403).json({ message: "Forbidden: Invalid token" });
        } else {
          return res.status(403).json({ message: "Forbidden: Token error" });
        }
      }

      // Attach decoded user info to request
      req.user = decoded;
      next();
    });
  } catch (err) {
    console.error("verifyUserToken error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default verifyUserToken;
