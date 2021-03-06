import { EmoteDoc, EmoteStatus } from "../../../database/models/emote";
import { TwitchUserDoc }         from "../../../database/models/twitch-user";

import { ApiResource } from "./index";

import { userResource } from "./user";

import { clean } from "../../helpers";

export const emoteResource: ApiResource<EmoteDoc> = (req) => (emote) => {
    const owner = emote.owner as TwitchUserDoc;
    return clean({
        id         : emote._id,
        keyword    : emote.keyword,
        type       : emote.type,
        user_count : emote.userCount,
        owner      : emote.populated("owner") ? userResource(req)(emote.owner as TwitchUserDoc) : null,
        status     : req.user && (owner._id.equals(req.user.id) || req.user.isAdmin),
        created_at : emote.createdAt,
    });
};

export const emoteDetailsResource: ApiResource<EmoteDoc> = (req) => (emote) => {
    const owner = emote.owner as TwitchUserDoc;
    const data: Record<string, any> = {
        is_private : emote.isPrivate,
        added      : emote.added,
    };
    if (req.user && (owner._id.equals(req.user.id) || req.user.isAdmin)) {
        data.status          = emote.status;
        data.rejectionReason = emote.status === EmoteStatus.REJECTED ? emote.rejectionReason : undefined;
    }

    return {
        ...emoteResource(req)(emote),
        ...clean(data),
    };
};