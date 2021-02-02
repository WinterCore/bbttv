import { Router } from "express";

import TwitchUser from "../../database/models/twitch-user";

import NotFoundError from "../errors/notfound";
import emoteResource from "./resources/emote";

import { co } from "../helpers";

const router = Router();

router.get("/:username/emotes", co(async (req, res) => {
    const user = await TwitchUser.findOne({ username: req.params.username });
    if (!user) throw new NotFoundError();

    const publicEmotes = await user.publicEmotes();
    const privateEmotes = await user.privateEmotes();

    res.json({
        data: [...publicEmotes.map(emoteResource), ...privateEmotes.map(emoteResource)]
    });
}));

export default router;
