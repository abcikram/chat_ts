import { Router } from "express";
import { z } from "zod";
import {
  toUserProfileResponse,
  UserProfile,
  UserProfileResponse,
} from "../modules/users/user.types";
import ca from "zod/v4/locales/ca.js";
import { getAuth } from "@clerk/express";
import { UnauthorizedError } from "../lib/errors";

export const userRouter = Router();

const UserProfileUpdateSchema = z.object({
  displayName: z.string().trim().max(50).optional(),
  handle: z.string().trim().max(30).optional(),
  bio: z.string().trim().max(500).optional(),
  avatarUrl: z.url("Avatar must be valid url").optional(),
});

function toResponse(profile: UserProfile): UserProfileResponse {
  return toUserProfileResponse(profile);
}



// get -> /api/me

userRouter.get("/", async (req, res, next) => {
    try {
         const auth = getAuth(req);

        if (!auth.userId) {
            throw new UnauthorizedError('Unauthorized');
        }

        const Profile = await getUserFromClerk(auth.userId);
        const response = toResponse(Profile)
        
        res.json({ data: response });

    } catch (error) {
        return next(error);
    }
});