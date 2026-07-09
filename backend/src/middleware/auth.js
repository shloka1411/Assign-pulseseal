const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET || "dev-jwt-secret";

const protectAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

  if (!token) {
    return res.status(401).json({ success: false, message: "Not authorized" });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    const user = decoded.user;

    if (!user || (!user.is_superuser && !user.is_organizer)) {
      return res.status(403).json({ success: false, message: "Admin access required" });
    }

    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

module.exports = { protectAdmin };
