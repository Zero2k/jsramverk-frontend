import { Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import * as Yup from 'yup';
import { omit } from 'lodash';
import { JwtService } from '../../utils/jwt';
import { User } from '../../entity/User';

const UserContoller = {
  async signUp(req: Request, res: Response) {
    const { username, email, password, date } = req.body;

    const bodySchema = Yup.object().shape({
      username: Yup.string().required('Required'),
      email: Yup.string()
        .email('Invalid email')
        .required('Required'),
      password: Yup.string()
        .required('No password provided.')
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
      date: Yup.date().required('Required')
    });

    try {
      await bodySchema.validate({ username, email, password, date });

      const userExists = await User.findOne({
        where: { email },
        select: ['id']
      });

      if (userExists) {
        throw { field: 'email', msg: 'User already exists' };
      }

      const hashPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        username,
        email,
        password: hashPassword,
        birthday: date
      }).save();

      const jwtToken = JwtService.createToken(user);

      res.json({ status: 200, token: jwtToken });
    } catch (error) {
      res.json({ status: 400, error });
    }
  },

  async signIn(req: Request, res: Response) {
    const { email, password } = req.body;

    const bodySchema = Yup.object().shape({
      email: Yup.string()
        .email('Invalid email')
        .required('Required'),
      password: Yup.string()
        .required('No password provided.')
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
    });

    try {
      await bodySchema.validate({ email, password });

      const user = await User.findOne({
        where: { email }
      });

      if (!user) {
        throw { field: 'email', msg: 'No user with that email' };
      }

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        throw { field: 'password', msg: 'Wrong password' };
      }

      const jwtToken = JwtService.createToken(user);

      res.json({ status: 200, token: jwtToken });
    } catch (error) {
      res.json({ status: 400, error });
    }
  },

  /* async recovery(req: Request, res: Response) {},

  async reset(req: Request, res: Response) {},

  async profiles(req: Request, res: Response) {},

  async profile(req: Request, res: Response) {}, */

  async me(req: Request, res: Response) {
    try {
      if (req.user) {
        const user = await User.findOne({
          where: { id: req.user.id }
        });

        if (!user) {
          throw { msg: 'User do not exist' };
        }

        res.json(
          omit(user, 'password', 'resetPasswordToken', 'resetPasswordExpires')
        );
      } else {
        res.json({ status: 400, msg: 'No user' });
      }
    } catch (error) {
      res.json({ status: 400, error });
    }
  }

  /* async update(req: Request, res: Response) {},

  async delete(req: Request, res: Response) {} */
};

export default UserContoller;
