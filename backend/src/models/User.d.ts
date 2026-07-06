import mongoose from "mongoose";
declare const User: mongoose.Model<{
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
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
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
} & mongoose.DefaultTimestampProps, {
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
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
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
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
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
} & mongoose.DefaultTimestampProps, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "timestamps"> & {
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
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
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
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
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
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default User;
//# sourceMappingURL=User.d.ts.map