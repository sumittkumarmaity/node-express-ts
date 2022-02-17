import { NextFunction, Request, Response } from 'express';
import { User } from '@interfaces/users.interface';
import userService from '@services/users.service';

class UsersController {

  public userService = new userService();

  public getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const findOneUserData: User = await this.userService.findUserById(userId);

      res.status(200).json({
        data: findOneUserData,
        message: 'findOne'
      });
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData = req.body;
      const createUserData: User = await this.userService.createUser(userData);

      res.status(201).json({
        data: createUserData,
        message: 'created'
      });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const userData = req.body;
      const updateUserData: User = await this.userService.updateUser(userId, userData);

      res.status(200).json({
        data: updateUserData,
        message: 'updated'
      });
    } catch (error) {
      next(error);
    }
  };

}

export default UsersController;
