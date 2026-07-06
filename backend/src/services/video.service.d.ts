export declare function createVideo(data: any): Promise<import("mongoose").PopulateDocumentResult<import("mongoose").Document<unknown, {}, {
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
}, {}, {
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
} & import("mongoose").DefaultTimestampProps>>;
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
export declare function getTrendingVideos(): Promise<(import("mongoose").Document<unknown, {}, {
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
export declare function getVideoById(id: string): Promise<(import("mongoose").Document<unknown, {}, {
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
}) | null>;
export declare function getVideoLikes(id: string): Promise<{
    likes: number;
}>;
export declare function likeVideo(id: string, userId: string): Promise<{
    likes: number;
}>;
export declare function unlikeVideo(id: string, userId: string): Promise<{
    likes: number;
}>;
export declare function incrementVideoViews(id: string): Promise<(import("mongoose").Document<unknown, {}, {
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
}) | null>;
export declare function updateVideo(id: string, userId: string, data: any): Promise<import("mongoose").PopulateDocumentResult<import("mongoose").Document<unknown, {}, {
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
}, {}, {
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
} & import("mongoose").DefaultTimestampProps>>;
export declare function deleteVideo(id: string, userId: string): Promise<import("mongoose").Document<unknown, {}, {
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
//# sourceMappingURL=video.service.d.ts.map