import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import AuthController from '@controllers/auth.controller';
import UsersValidation from '@/validation/users.validation';
import authMiddleware from '@middlewares/auth.middleware';
import validate from '@middlewares/validation.middleware';

class AuthRoute implements Routes {

  public path = '/auth';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/user-signup`, validate(UsersValidation.signup), this.authController.signUp);
    this.router.post(`${this.path}/user-login`, validate(UsersValidation.login), this.authController.logIn);
    this.router.post(`${this.path}/logout`, authMiddleware, this.authController.logOut);
  }

}

export default AuthRoute;
