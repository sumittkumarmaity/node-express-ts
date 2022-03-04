import { hash } from 'bcrypt';
import { HttpException } from '@exceptions/HttpException';
import BaseService from '@services/base.service';
import { User } from '@interfaces/users.interface';
import userModel from '@models/users.model';
import { isEmpty } from '@utils/util';
class UserService extends BaseService<User> {
  public _collection = userModel;

  constructor() {
    super(userModel);
  }

  // GET ALL USER LIST //
  public async findAllUser(): Promise<User[]> {
    const users: User[] = await this._collection.find();
    return users;
  }

  // FIND USER BY ID //
  public async findUserById(userId: string): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, "Invalid Data");
    // console.log('Access from own');
    // const findUser: User = await this._collection.findOne({ _id: userId }); // Access from own //
    const findUser: User = await this.findOne(userId); // Access from parent //

    if (!findUser) throw new HttpException(409, "Invalid Data");

    return findUser;
  }

  // CREATE NEW USER //
  public async createUser(userData: any): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "Invalid Data");

    const findUser: User = await this._collection.findOne({ email: userData.email });
    if (findUser) throw new HttpException(409, `Your email ${userData.email} is already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await this._collection.create({ ...userData, password: hashedPassword });

    return createUserData;
  }

  // UPDATE USER //
  public async updateUser(userId: string, userData: any): Promise<User> {

    if (isEmpty(userData)) throw new HttpException(400, "Invalid Data");

    if (userData.email) {
      const findUser: User = await this._collection.findOne({ email: userData.email });
      if (findUser && findUser._id != userId) throw new HttpException(409, `Your email ${userData.email} is already exists`);
    }

    if (userData.password) {
      const hashedPassword = await hash(userData.password, 10);
      userData = { ...userData, password: hashedPassword };
    }
    console.log(userId);
    console.log(userData);
    const updateUserById: User = await this._collection.findByIdAndUpdate(userId, { $set: userData });
    console.log('updateUserById', updateUserById);
    if (!updateUserById) throw new HttpException(409, "Invalid Data");

    return updateUserById;
  }


}

export default UserService;
