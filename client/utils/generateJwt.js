import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Using the email and privateKey (if provided) generate a JWT.
 * Expires in 1 week.
 *
 * @param email email of the authenticated user
 * @param privateKey (optional) private encryption key of the authenticated user
 *
 * @returns a string containing the JWT
 */
export function generateJwt(email, privateKey = null) {
  const payload = { email };
  if (privateKey) payload.pkey = privateKey;

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1w' });

  return token;
}

export function decodeJwt(token) {
  const { email, pkey: privateKey } = jwt.verify(token, JWT_SECRET);
  return { email, privateKey };
}
