
import { Router} from 'express';


export { UserRouter } from "./user";
export {AuthRouter} from "./auth"

import { UserRouter } from "./user";
import { AuthRouter } from "./auth";

const router = Router();

router.use('/user', UserRouter);
router.use('/auth', AuthRouter);

export {router as Router};
