import jwt from 'jsonwebtoken'
const secretKey = 'your_secret_key'; // Replace with a strong, securely stored key

function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ error: 'No token provided' });

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) return res.status(401).json({ error: 'Unauthorized' });
        req.user = decoded; // Attach user data (e.g., `id`, `role`) to the request
        next();
    });
}

export default verifyToken
