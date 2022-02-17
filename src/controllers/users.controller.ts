import { NextFunction, Request, Response } from 'express';
import { User } from '@interfaces/users.interface';
import userService from '@services/users.service';
import { StatusCodes } from 'http-status-codes';

class UsersController {

  public userService = new userService();

  // GET USER BY ID //
  public getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.body.userId;
      const findOneUserData: User = await this.userService.findUserById(userId);

      res.status(StatusCodes.OK).json({
        serverResponse: {
          statusCode: StatusCodes.OK,
          message: "Success"
        },
        result: {
          userData: findOneUserData
        }
      });

    } catch (error) {
      next(error);
    }
  };

  // CREATE USER //
  public createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData = req.body;
      const createUserData: User = await this.userService.createUser(userData);

      res.status(StatusCodes.OK).json({
        serverResponse: {
          statusCode: StatusCodes.OK,
          message: "New user successfully created"
        },
        result: {
          userData: createUserData
        }
      });
    } catch (error) {
      next(error);
    }
  };

  // UPDATE USER //
  public updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.body.userId;
      const userData = req.body;
      const updateUserData: User = await this.userService.updateUser(userId, userData);

      res.status(StatusCodes.OK).json({
        serverResponse: {
          statusCode: StatusCodes.OK,
          message: "User successfully updated"
        },
        result: {
          userData: updateUserData
        }
      });

    } catch (error) {
      next(error);
    }
  };

}

export default UsersController;
