const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
        return res.status(401).json({ success: false, error: "Unauthorized: No Access Token" });
    }

    try {
        // Decode the token to check expiration
        const decoded = jwt.decode(accessToken);
        
        if (!decoded || !decoded.exp) {
            return res.status(400).json({ success: false, error: "Invalid Access Token" });
        }

        const isExpired = Date.now() >= decoded.exp;
        if (isExpired) {
            return refresh(req, res, next); // Refresh the token if expired
        }

        // Verify the token if not expired
        jwt.verify(accessToken,
            process.env.ACCESS_TOKEN_SECRET, 
            (err, verified) => {
            if (err) {
                return res.status(403).json({ success: false, error: "Forbidden: Invalid Token" });
            }

            req.body.user = verified; // Attach user info to request
            next();
        });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

const refresh = (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;
  
    if (!refreshToken) {
        return res.status(401).json({ success: false, message: "Unauthorized: No Refresh Token" });
    }

    jwt.verify(refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
        if (err) {
            return res.status(403).json({ success: false, message: "Forbidden: Invalid Refresh Token" });
        }

        // Generate a new access token
        const accessToken = jwt.sign(
            { email: decoded.email, id: decoded.id }, // Include user info as needed
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1d" } // Access token valid for 1 minute
        );

        // Set the new access token in cookies
        res.cookie("accessToken", accessToken, {
            maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
            httpOnly: true,
            //secure: process.env.NODE_ENV === "production", // Secure in production
            //sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // Cross-site cookie settings
        });

        req.body.user = decoded; // Attach user info to request
        next(); // Continue the request after refreshing the token
    });
};

module.exports = auth;
