import { Router } from 'express';
import UsersController from '@controllers/users.controller';
// import { CreateUserDto } from '@/validators/users.validation';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class UsersRoute implements Routes {
  public path = '/users';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // this.router.post(`${this.path}/`, validationMiddleware(CreateUserDto, 'body'), this.usersController.createUser);
    this.router.get(`${this.path}/:id`, this.usersController.getUserById);
    //this.router.put(`${this.path}/:id`, validationMiddleware(CreateUserDto, 'body', true), this.usersController.updateUser);
  }
}

export default UsersRoute;
