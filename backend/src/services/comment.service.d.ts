export declare function createComment(data: any): Promise<import("mongoose").PopulateDocumentResult<import("mongoose").Document<unknown, {}, {
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
}, {}, {
    user: import("mongoose").Types.ObjectId;
    video: import("mongoose").Types.ObjectId;
    content: string;
    isHidden: boolean;
} & import("mongoose").DefaultTimestampProps, {
    user: import("mongoose").Types.ObjectId;
    video: import("mongoose").Types.ObjectId;
    content: string;
    isHidden: boolean;
} & import("mongoose").DefaultTimestampProps>>;
export declare function getCommentsByVideo(videoId: string): Promise<(import("mongoose").Document<unknown, {}, {
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
export declare function updateComment(id: string, userId: string, content: string): Promise<import("mongoose").PopulateDocumentResult<import("mongoose").Document<unknown, {}, {
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
}, {}, {
    user: import("mongoose").Types.ObjectId;
    video: import("mongoose").Types.ObjectId;
    content: string;
    isHidden: boolean;
} & import("mongoose").DefaultTimestampProps, {
    user: import("mongoose").Types.ObjectId;
    video: import("mongoose").Types.ObjectId;
    content: string;
    isHidden: boolean;
} & import("mongoose").DefaultTimestampProps>>;
export declare function deleteComment(id: string, userId: string): Promise<import("mongoose").Document<unknown, {}, {
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
//# sourceMappingURL=comment.service.d.ts.map