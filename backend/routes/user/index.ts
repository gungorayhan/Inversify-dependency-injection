import { Router } from "express"
import { userContainer } from "../../container/userController";
import { authMiddlewareContainer } from "../../container/authMiddleware";
import { UserController } from "../../controllers";
import { INTERFACE_TYPE } from "../../utils";
import { AuthMiddleware } from "../../middleware/auth";
// import {  UserContainer } from "../../container";

const router = Router();

// router.get("/",AuthMiddlewareContainer.authenticate.bind(AuthMiddlewareContainer),UserContainer.getUserAll.bind(UserContainer))
// router.get("/:id",UserContainer.getUserById.bind(UserContainer))
// router.post("/",UserContainer.createUser.bind(UserContainer))

const controllers = userContainer.get<UserController>(INTERFACE_TYPE.UserController)
const authMiddleware = authMiddlewareContainer.get<AuthMiddleware>(INTERFACE_TYPE.AuthMiddleware)

router.get("/",authMiddleware.authenticate.bind(authMiddleware),controllers.getUserAll.bind(controllers))
router.get("/:id",controllers.getUserById.bind(controllers))
router.post("/",controllers.createUser.bind(controllers))

export {router as UserRouter}