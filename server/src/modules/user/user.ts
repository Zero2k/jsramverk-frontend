import { Request, Response, NextFunction } from 'express';
import { JwtService } from '../../utils/jwt';
import { User } from '../../entity/User';

export const userAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = await JwtService.getTokenFromHeaders(req);

  if (!token) {
    req.user = null;

    return res.sendStatus(401);
  }

  const user = await User.findOne({
    where: { id: token.user.id }
  });

  if (!user) {
    req.user = null;

    return res.sendStatus(401);
  }

  req.user = user;

  return next();
};
