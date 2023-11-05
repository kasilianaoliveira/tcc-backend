import { Router } from 'express';
import { CreateUserController } from './controllers/user/createUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';
import { isAuthenticated } from './middlewares/isAuthenticated';
import { ItemsListController } from './controllers/item/ItemsListController';
import { CreatePointController } from './controllers/point/createPointController';
import { ListPointController } from './controllers/point/listPointController';
import { ListNeighborhoodController } from './controllers/neighborhoods/listNeighborhoodController';
import { ListPointUserController } from './controllers/point/listPointUserController';
import { DeletePointController } from './controllers/point/deletePointController';
import { DeleteUserController } from './controllers/user/deleteUserController';
import { UpdateUserController } from './controllers/user/updateUserController';
import { FilterPointsController } from './controllers/point/filterPointsController';

const router = Router();

//USERS -> ok
router.post('/users', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/me', isAuthenticated, new DetailUserController().handle);
router.delete('/user/:id', new DeleteUserController().handle);
router.put('/user/:id', new UpdateUserController().handle);

//ITEMS -> ok
router.get('/items', new ItemsListController().handle);

//POINT
router.post('/point', new CreatePointController().handle);
router.get('/point',  new ListPointController().handle);
router.get('/point/:id', new ListPointUserController().handle);
router.delete('/point/:id', new DeletePointController().handle);
router.get('/point/filter', new FilterPointsController().handle)

//Neighborhood
router.get('/neighborhood', new ListNeighborhoodController().handle);

export { router }