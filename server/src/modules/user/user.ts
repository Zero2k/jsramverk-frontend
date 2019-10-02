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

    res.status(401).send();
    return;
  }

  const user = await User.findOne({
    where: { id: token.user.id }
  });

  if (!user) {
    req.user = null;

    res.status(401).send();
    return;
  }

  req.user = user;

  next();
};
