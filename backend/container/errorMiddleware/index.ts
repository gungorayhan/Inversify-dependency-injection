import { Container } from "inversify";
import { ErrorMiddleware } from "../../middleware/error";
import { INTERFACE_TYPE } from "../../utils";

const errorContainer = new Container()

errorContainer.bind(INTERFACE_TYPE.ErrorMiddleware).to(ErrorMiddleware);

export {errorContainer}