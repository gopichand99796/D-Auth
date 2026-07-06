import mongoose from "mongoose";
declare const Video: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
    description: string;
    title: string;
    videoUrl: string;
    thumbnailUrl: string;
    owner: mongoose.Types.ObjectId;
    views: number;
    likes: number;
    category: string;
    duration: number;
    isBlocked: boolean;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    description: string;
    title: string;
    videoUrl: string;
    thumbnailUrl: string;
    owner: mongoose.Types.ObjectId;
    views: number;
    likes: number;
    category: string;
    duration: number;
    isBlocked: boolean;
} & mongoose.DefaultTimestampProps, {
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
    owner: mongoose.Types.ObjectId;
    views: number;
    likes: number;
    category: string;
    duration: number;
    isBlocked: boolean;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    description: string;
    title: string;
    videoUrl: string;
    thumbnailUrl: string;
    owner: mongoose.Types.ObjectId;
    views: number;
    likes: number;
    category: string;
    duration: number;
    isBlocked: boolean;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    description: string;
    title: string;
    videoUrl: string;
    thumbnailUrl: string;
    owner: mongoose.Types.ObjectId;
    views: number;
    likes: number;
    category: string;
    duration: number;
    isBlocked: boolean;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
    description: string;
    title: string;
    videoUrl: string;
    thumbnailUrl: string;
    owner: mongoose.Types.ObjectId;
    views: number;
    likes: number;
    category: string;
    duration: number;
    isBlocked: boolean;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    description: string;
    title: string;
    videoUrl: string;
    thumbnailUrl: string;
    owner: mongoose.Types.ObjectId;
    views: number;
    likes: number;
    category: string;
    duration: number;
    isBlocked: boolean;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    description: string;
    title: string;
    videoUrl: string;
    thumbnailUrl: string;
    owner: mongoose.Types.ObjectId;
    views: number;
    likes: number;
    category: string;
    duration: number;
    isBlocked: boolean;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default Video;
//# sourceMappingURL=Video.d.ts.map