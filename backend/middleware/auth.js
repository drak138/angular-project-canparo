import jwt from 'jsonwebtoken'
const JWT_SECRET='my-Secret-Key'

function verifyToken(req, res, next) {
    let token = req.headers['authorization'].slice(1,-1);
    const decoded=jwt.decode(token)
    console.log(decoded)

    jwt.verify(token,JWT_SECRET, (err, user) => {
        if (err) {
            console.error('Token verification failed:', err.message);
            return res.status(403).json({ error: 'Invalid or expired token' });
        }

        req.user = user; // Attach the decoded user object to the request
        console.log('Decoded User:', user); // Debug decoded token payload
        next();
    });

}

export default verifyToken
