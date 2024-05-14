import CreateOrderUserCase from "../Application/UseCase/CreateOrderUseCase";
import ListAllOrdersUseCase from "../Application/UseCase/ListAllOrdersUseCase";
import ChangeTrackingUseCase from "../Application/UseCase/ChangeTrackingUseCase";

import OderMySQLRepository from "./Repositories/OrderMySQLRepository"

import CreateOrderController from './Controller/CreateOrderController'
import ListAllOrdersController from './Controller/ListAllOrderController'
import ChangeTrackingController from './Controller/ChangeTrackingController'

export const MySqlUserRepository = new OderMySQLRepository();
export const currentRepository =  MySqlUserRepository

export const registerCase = new CreateOrderUserCase(currentRepository);
export const listAllCase = new ListAllOrdersUseCase(currentRepository);
export const changeTrackingCase = new ChangeTrackingUseCase(currentRepository);

export const registerController = new CreateOrderController(registerCase);
export const listAllController = new ListAllOrdersController(listAllCase);
export const changeTrackingController = new ChangeTrackingController(changeTrackingCase);
