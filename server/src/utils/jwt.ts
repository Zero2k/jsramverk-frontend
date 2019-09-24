import * as jwt from 'jsonwebtoken';

const createToken = user => {
  if (!user && !user.id) {
    return null;
  }

  const payload = {
    id: user.id
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
};

const checkJWT = async (req: any, __: any, next: any) => {
  const token = req.headers.authorization;
  if (token) {
    try {
      const { user }: any = jwt.verify(token, <string>process.env.SECRET);

      req.user = user;
    } catch (err) {
      req.user = null;
    }
  }
  next();
};

export const JwtService = {
  createToken,
  checkJWT
};
