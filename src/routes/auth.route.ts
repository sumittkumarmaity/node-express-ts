import { Router } from 'express';
import AuthController from '@controllers/auth.controller';
import UsersValidation from '@/validation/users.validation';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import validate  from '@middlewares/validation.middleware';

class AuthRoute implements Routes {

  public path = '/auth';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {

    this.router.post(`${this.path}/signup`, validate(UsersValidation.signup), this.authController.signUp);
    // this.router.post(`${this.path}/login`, validationMiddleware(signup, 'body'), this.authController.logIn);
    this.router.post(`${this.path}/logout`, authMiddleware, this.authController.logOut);
  }
}

export default AuthRoute;
