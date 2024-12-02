import jwt from 'jsonwebtoken'
const JWT_SECRET='my-Secret-Key'

function verifyToken(req, res, next) {
    let token = req.headers['authorization']?.slice(1,-1)||req.headers['cookie']?.split("authToken=")[1].slice(1,-1)||req.body['Authorization']?.slice(1,-1);

    jwt.verify(token,JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid or expired token' });
        }

        req.user = user; // Attach the decoded user object to the request
        next();
    });

}

export default verifyToken
