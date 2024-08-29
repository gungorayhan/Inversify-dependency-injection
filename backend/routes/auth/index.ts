import { Router } from "express";
import { authContainer } from "../../container/authController";
import { AuthController } from "../../controllers";
import { INTERFACE_TYPE } from "../../utils";
import { dtoMiddlewareContainer } from "../../container/dtoMiddleware";
import { DtoMiddleware } from "../../middleware/dto";
import { LoginDto } from "../../dto/user";
const router = Router();

// router.post("/login", AuthContainer.login.bind(AuthContainer))
// router.post("/register", AuthContainer.register.bind(AuthContainer))
// router.post("/logout", AuthContainer.logout.bind(AuthContainer))

const controllers = authContainer.get<AuthController>(INTERFACE_TYPE.AuthController)
const dtoMiddleware = dtoMiddlewareContainer.get<DtoMiddleware>(INTERFACE_TYPE.DtoMiddleware)

router.post("/login",dtoMiddleware.validate(LoginDto).bind(dtoMiddleware),controllers.login.bind(controllers))
router.post("/register",controllers.register.bind(controllers))
router.post("/logout", controllers.logout.bind(controllers))

export {router as AuthRouter}