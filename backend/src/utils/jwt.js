import jwt from "jsonwebtoken";
const SECRET = process.env.DTUBE_CONSTELLATION_Conspiracy_SECRET;
export function generateToken(id, role) {
    return jwt.sign({ id, role }, SECRET, {
        expiresIn: "7d",
    });
}
//# sourceMappingURL=jwt.js.map