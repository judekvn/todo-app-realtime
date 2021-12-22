import jwt from 'jsonwebtoken'

export const auth = (req, res, next) => {
    try {
        const token = req.header('Authorization');

        if (!token) {
            return res.status(400).json({ message: 'No authentication token.' });
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);

        if (!verified) {
            return res.status(400).json({ message: 'Authentication failed.' });
        }

        req.user = verified.id;
        next();
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }

}