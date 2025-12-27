export type User = {
    id: number;
    clerkUserId: string;
    displayName: string | null;
    handle: string | null;
    avatarUrl: string | null;
    bio: string | null;
    createdAt: Date;
    updatedAt: Date;
}



export type UserProfile = {
    user: User;
    clerkEmail: string | null;
    clerkFullName: string | null;
}

export type UserProfileResponse = {
    id: number;
    displayName: string | null;
    email: string | null;
    clerkUserId: string;
    handle: string | null;
    avatarUrl: string | null;
    bio: string | null;
}


export function toUserProfileResponse(profile: UserProfile): UserProfileResponse {
    const { user, clerkEmail, clerkFullName } = profile;
    return {
        id: user.id,
        displayName: user.displayName ?? clerkFullName ?? null,
        email: clerkEmail ?? null,
        clerkUserId: user.clerkUserId,
        handle: user.handle ?? null,
        avatarUrl: user.avatarUrl ?? null,
        bio: user.bio ?? null,
    };
}