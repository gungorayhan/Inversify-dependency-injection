import { Container } from "inversify";
import { INTERFACE_TYPE } from "../../utils";
import { DtoMiddleware } from "../../middleware/dto";


const dtoMiddlewareContainer = new Container();

dtoMiddlewareContainer.bind(INTERFACE_TYPE.DtoMiddleware).to(DtoMiddleware);

export {dtoMiddlewareContainer}