import { Router } from "express";
import { authContainer } from "../../container/authController";
import { AuthController } from "../../controllers";
import { INTERFACE_TYPE } from "../../utils";

const router = Router();

// router.post("/login", AuthContainer.login.bind(AuthContainer))
// router.post("/register", AuthContainer.register.bind(AuthContainer))
// router.post("/logout", AuthContainer.logout.bind(AuthContainer))

const controllers=authContainer.get<AuthController>(INTERFACE_TYPE.AuthController)

router.post("/login",controllers.login.bind(controllers))
router.post("/register",controllers.register.bind(controllers))
router.post("/logout", controllers.logout.bind(controllers))

export {router as AuthRouter}