import { hash } from 'bcrypt';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import userModel from '@models/users.model';
import { isEmpty } from '@utils/util';

class UserService {
  public users = userModel;

  // GET ALL USER LIST //
  public async findAllUser(): Promise<User[]> {
    const users: User[] = await this.users.find();
    return users;
  }

  // FIND USER BY ID //
  public async findUserById(userId: string): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, "Invalid Data");

    const findUser: User = await this.users.findOne({ _id: userId });
    if (!findUser) throw new HttpException(409, "Invalid Data");

    return findUser;
  }

  // CREATE NEW USER //
  public async createUser(userData: any): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "Invalid Data");

    const findUser: User = await this.users.findOne({ email: userData.email });
    if (findUser) throw new HttpException(409, `Your email ${userData.email} is already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await this.users.create({ ...userData, password: hashedPassword });

    return createUserData;
  }

  // UPDATE USER //
  public async updateUser(userId: string, userData: any): Promise<User> {

    if (isEmpty(userData)) throw new HttpException(400, "Invalid Data");

    if (userData.email) {
      const findUser: User = await this.users.findOne({ email: userData.email });
      if (findUser && findUser._id != userId) throw new HttpException(409, `Your email ${userData.email} is already exists`);
    }

    if (userData.password) {
      const hashedPassword = await hash(userData.password, 10);
      userData = { ...userData, password: hashedPassword };
    }
    console.log(userId);
    console.log(userData);
    const updateUserById: User = await this.users.findByIdAndUpdate(userId, { $set: userData });
    console.log('updateUserById', updateUserById);
    if (!updateUserById) throw new HttpException(409, "Invalid Data");

    return updateUserById;
  }


}

export default UserService;
