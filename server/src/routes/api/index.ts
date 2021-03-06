import { Router } from "express";

import Auth     from "./auth";
import Emotes   from "./emotes";
import Users    from "./users";
import Channels from "./channels";

const router = Router();

router.use("/auth",  Auth);
router.use("/emotes", Emotes);
router.use("/users", Users);

// Extension specific endpoints
router.use("/channels", Channels);

router.use((_, res) => {
    res.status(404);
    res.json({ message: "I don't think you're supposed to be here!" });
});

export default router;
