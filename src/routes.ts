import { Router } from 'express';
import multer from'multer';

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
import { listPlacesController } from './controllers/places/listPlacesController';
import { UpdatePointController } from './controllers/point/updatePointController';
import { UpdateItemController } from './controllers/item/updateItemsController';

import uploadConfig from './config/multer';

const router = Router();
const upload = multer(uploadConfig)

//USERS -> ok
router.post('/users', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/me', isAuthenticated, new DetailUserController().handle);
router.delete('/user/:id', new DeleteUserController().handle);
router.put('/user/:id', new UpdateUserController().handle);

//ITEMS -> ok
router.get('/items', new ItemsListController().handle);
router.put('/items/:id', new UpdateItemController().handle);
//POINT
router.post('/point', isAuthenticated, upload.single('image'), new CreatePointController().handle);
router.get('/points',  new ListPointController().handle);
router.get('/point/:id', new ListPointUserController().handle);
router.delete('/point/:id', new DeletePointController().handle);
router.get('/pointFilter', new FilterPointsController().handle)
router.put('/point/:id', upload.single('image'), new UpdatePointController().handle)
//Neighborhood
router.get('/neighborhood', new ListNeighborhoodController().handle);


//reciclagem
router.get('/api/places', new listPlacesController().handle)


export { router }