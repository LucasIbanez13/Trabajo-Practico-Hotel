import jwt from "jsonwebtoken";

const validateToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No hay token en la petición' });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            id: payload.id,
            email: payload.email,
            rol: payload.rol,
        };
    } catch (error) {
        return res.status(401).json({ message: 'Token no válido' });
    }

    next();
};

export default validateToken;