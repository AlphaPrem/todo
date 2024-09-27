import jwt, { Secret } from 'jsonwebtoken'

export const generateJwtToken = (payload: object): string => {
  const token = jwt.sign(payload, process.env.JWT_SECRET as Secret, {
    algorithm: 'HS512', // Use HS512 for sha512 algorithm
    expiresIn: '30s', // Expire token after 30 seconds
  })

  return token
}
