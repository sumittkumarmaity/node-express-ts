import { NextFunction, Request, Response } from 'express';
import { RequestWithUser } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import AuthService from '@services/auth.service';
import { StatusCodes } from 'http-status-codes';

class AuthController {

  public authService = new AuthService();

  // SIGNUP / REGISTER //
  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData = req.body;
      const signUpUserData: User = await this.authService.signup(userData);
      
      res.status(StatusCodes.OK).json({
        serverResponse: {
          statusCode: StatusCodes.OK,
          message: "You have successfully signup"
        },
        result: {
          userData: signUpUserData
        }
      });
      
    } catch (error) {
      next(error);
    }
  };

  // LOGIN //
  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData = req.body;
      const { cookie, tokenData, findUser } = await this.authService.login(userData);
      res.setHeader('Set-Cookie', [cookie]);

      res.status(StatusCodes.OK).json({
        serverResponse: {
          statusCode: StatusCodes.OK,
          message: "You have successfully signup"
        },
        result: {
          userData: findUser,
          token: tokenData
        }
      });
    } catch (error) {
      next(error);
    }
  };

  // LOGOUT //
  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.user;
      const logOutUserData: User = await this.authService.logout(userData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);

      res.status(StatusCodes.OK).json({
        serverResponse: {
          statusCode: StatusCodes.OK,
          message: "You have successfully logout"
        },
        result: {}
      });

    } catch (error) {
      next(error);
    }
  };

}

export default AuthController;
