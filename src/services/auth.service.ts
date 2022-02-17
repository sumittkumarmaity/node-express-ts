import { hash, compare } from 'bcrypt';
import config from 'config';
import { sign } from 'jsonwebtoken';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import userModel from '@models/users.model';
import { isEmpty } from '@utils/util';

class AuthService {

  public users = userModel;

  // SIGNUP //
  public async signup(userData): Promise<User> {

    if (isEmpty(userData)) throw new HttpException(400, "Invalid Data");

    const findUser: User = await this.users.findOne({ email: userData.email });
    if (findUser) throw new HttpException(409, `Your email ${userData.email} is already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await this.users.create({ ...userData, password: hashedPassword });

    return createUserData;
  }

  // LOGIN //
  public async login(userData:any): Promise<{ cookie: string; tokenData: any; findUser: User }> {
    if (isEmpty(userData)) throw new HttpException(400, "Invalid Data");

    const findUser: User = await this.users.findOne({ email: userData.email });
    if (!findUser) throw new HttpException(409, `You're email ${userData.email} not found`);

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, "You're password not matching");

    const tokenData = this.createToken(findUser);
    const cookie = this.createCookie(tokenData);

    return { cookie, tokenData, findUser };
  }

  // LOGOUT //
  public async logout(userData: User): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "Invalid Data");

    const findUser: User = await this.users.findOne({ email: userData.email, password: userData.password });
    if (!findUser) throw new HttpException(409, `You're email ${userData.email} not found`);

    return findUser;
  }

  // TOKEN CREATION //
  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { _id: user._id };
    const secretKey: string = config.get('secretKey');
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  // COOKIE CREATE & SET //
  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
  
}

export default AuthService;
