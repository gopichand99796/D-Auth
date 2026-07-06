export declare function registerUser(username: string, email: string, password: string): Promise<import("mongoose").Document<unknown, {}, {
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
export declare function loginUser(email: string, password: string): Promise<{
    user: import("mongoose").Document<unknown, {}, {
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
    };
    token: string;
}>;
export declare function forgotPassword(email: string): Promise<{
    message: string;
    resetToken: string;
}>;
export declare function resetPassword(resetToken: string, newPassword: string): Promise<{
    message: string;
}>;
//# sourceMappingURL=auth.service.d.ts.map