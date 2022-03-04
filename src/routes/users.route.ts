import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import UsersController from '@controllers/users.controller';
import UsersValidation from '@/validation/users.validation';
import authMiddleware from '@middlewares/auth.middleware';
import validate from '@middlewares/validation.middleware';

class UsersRoute implements Routes {

  public path = '/users';
  public router = Router();

  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use(this.path, authMiddleware) // USE AUTH MIDDLEWARE GLOBALY :: FOR ALL ROUTE //
    //this.router.get(`${this.path}/:id`, this.usersController.getUserById);
    this.router.get(`${this.path}/get-user-dtls`, [validate(UsersValidation.getUserData)], this.usersController.getUserById);
    this.router.post(`${this.path}/add-new-user`, validate(UsersValidation.signup), this.usersController.createUser);
    this.router.put(`${this.path}/update-user-dtls`, validate(UsersValidation.updateUserDtls), this.usersController.updateUser);
    // this.router.post(`${this.path}/user-list`, validate(UsersValidation.updateUserDtls), this.usersController.getUserById);

  }

}

export default UsersRoute;
