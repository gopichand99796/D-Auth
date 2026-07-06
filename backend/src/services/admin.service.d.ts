export declare function getAllUsers(): Promise<(import("mongoose").Document<unknown, {}, {
    username: string;
    email: string;
    password: string;
    channelName: string;
    avatar: string;
    subscribers: number;
    role: "user" | "admin";
    isBanned: boolean;
    resetPasswordToken?: string | null;
    resetPasswordTokenExpiry?: NativeDate | null;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    username: string;
    email: string;
    password: string;
    channelName: string;
    avatar: string;
    subscribers: number;
    role: "user" | "admin";
    isBanned: boolean;
    resetPasswordToken?: string | null;
    resetPasswordTokenExpiry?: NativeDate | null;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
})[]>;
export declare function getAllVideos(): Promise<(import("mongoose").Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    description: string;
    title: string;
    videoUrl: string;
    thumbnailUrl: string;
    owner: import("mongoose").Types.ObjectId;
    views: number;
    likes: number;
    category: string;
    duration: number;
    isBlocked: boolean;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
    description: string;
    title: string;
    videoUrl: string;
    thumbnailUrl: string;
    owner: import("mongoose").Types.ObjectId;
    views: number;
    likes: number;
    category: string;
    duration: number;
    isBlocked: boolean;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
})[]>;
export declare function getAllComments(): Promise<(import("mongoose").Document<unknown, {}, {
    user: import("mongoose").Types.ObjectId;
    video: import("mongoose").Types.ObjectId;
    content: string;
    isHidden: boolean;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    user: import("mongoose").Types.ObjectId;
    video: import("mongoose").Types.ObjectId;
    content: string;
    isHidden: boolean;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
})[]>;
export declare function banUser(id: string): Promise<import("mongoose").Document<unknown, {}, {
    username: string;
    email: string;
    password: string;
    channelName: string;
    avatar: string;
    subscribers: number;
    role: "user" | "admin";
    isBanned: boolean;
    resetPasswordToken?: string | null;
    resetPasswordTokenExpiry?: NativeDate | null;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    username: string;
    email: string;
    password: string;
    channelName: string;
    avatar: string;
    subscribers: number;
    role: "user" | "admin";
    isBanned: boolean;
    resetPasswordToken?: string | null;
    resetPasswordTokenExpiry?: NativeDate | null;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}>;
export declare function unbanUser(id: string): Promise<import("mongoose").Document<unknown, {}, {
    username: string;
    email: string;
    password: string;
    channelName: string;
    avatar: string;
    subscribers: number;
    role: "user" | "admin";
    isBanned: boolean;
    resetPasswordToken?: string | null;
    resetPasswordTokenExpiry?: NativeDate | null;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    username: string;
    email: string;
    password: string;
    channelName: string;
    avatar: string;
    subscribers: number;
    role: "user" | "admin";
    isBanned: boolean;
    resetPasswordToken?: string | null;
    resetPasswordTokenExpiry?: NativeDate | null;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}>;
export declare function blockVideo(id: string): Promise<import("mongoose").Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    description: string;
    title: string;
    videoUrl: string;
    thumbnailUrl: string;
    owner: import("mongoose").Types.ObjectId;
    views: number;
    likes: number;
    category: string;
    duration: number;
    isBlocked: boolean;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
    description: string;
    title: string;
    videoUrl: string;
    thumbnailUrl: string;
    owner: import("mongoose").Types.ObjectId;
    views: number;
    likes: number;
    category: string;
    duration: number;
    isBlocked: boolean;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}>;
export declare function unblockVideo(id: string): Promise<import("mongoose").Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    description: string;
    title: string;
    videoUrl: string;
    thumbnailUrl: string;
    owner: import("mongoose").Types.ObjectId;
    views: number;
    likes: number;
    category: string;
    duration: number;
    isBlocked: boolean;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
    description: string;
    title: string;
    videoUrl: string;
    thumbnailUrl: string;
    owner: import("mongoose").Types.ObjectId;
    views: number;
    likes: number;
    category: string;
    duration: number;
    isBlocked: boolean;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}>;
export declare function hideComment(id: string): Promise<import("mongoose").Document<unknown, {}, {
    user: import("mongoose").Types.ObjectId;
    video: import("mongoose").Types.ObjectId;
    content: string;
    isHidden: boolean;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    user: import("mongoose").Types.ObjectId;
    video: import("mongoose").Types.ObjectId;
    content: string;
    isHidden: boolean;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}>;
export declare function unhideComment(id: string): Promise<import("mongoose").Document<unknown, {}, {
    user: import("mongoose").Types.ObjectId;
    video: import("mongoose").Types.ObjectId;
    content: string;
    isHidden: boolean;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    user: import("mongoose").Types.ObjectId;
    video: import("mongoose").Types.ObjectId;
    content: string;
    isHidden: boolean;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}>;
export declare function deleteVideoAsAdmin(id: string): Promise<import("mongoose").Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    description: string;
    title: string;
    videoUrl: string;
    thumbnailUrl: string;
    owner: import("mongoose").Types.ObjectId;
    views: number;
    likes: number;
    category: string;
    duration: number;
    isBlocked: boolean;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
    description: string;
    title: string;
    videoUrl: string;
    thumbnailUrl: string;
    owner: import("mongoose").Types.ObjectId;
    views: number;
    likes: number;
    category: string;
    duration: number;
    isBlocked: boolean;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}>;
export declare function deleteCommentAsAdmin(id: string): Promise<import("mongoose").Document<unknown, {}, {
    user: import("mongoose").Types.ObjectId;
    video: import("mongoose").Types.ObjectId;
    content: string;
    isHidden: boolean;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    user: import("mongoose").Types.ObjectId;
    video: import("mongoose").Types.ObjectId;
    content: string;
    isHidden: boolean;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}>;
//# sourceMappingURL=admin.service.d.ts.map