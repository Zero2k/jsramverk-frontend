import * as bcrypt from 'bcryptjs';
import * as Yup from 'yup';
import { JwtService } from '../../utils/jwt';
import { User } from '../../entity/User';

const UserContoller = {
  async signUp(req, res) {
    const { username, email, password } = req.body;

    const bodySchema = Yup.object().shape({
      username: Yup.string().required('Required'),
      email: Yup.string()
        .email('Invalid email')
        .required('Required'),
      password: Yup.string()
        .required('No password provided.')
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
    });

    try {
      await bodySchema.validate({ username, email, password });

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
        password: hashPassword
      }).save();

      const jwtToken = JwtService.createToken(user);

      res.json({ status: 200, token: jwtToken });
    } catch (error) {
      res.json({ status: 400, error });
    }
  },

  async signIn(req, res) {
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

  async recovery(req, res) {},

  async reset(req, res) {},

  async profiles(req, res) {},

  async profile(req, res) {},

  async update(req, res) {},

  async delete(req, res) {}
};

export default UserContoller;
