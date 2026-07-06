import type { Request, Response } from "express";
export declare const getUsers: (req: Request, res: Response) => Promise<void>;
export declare const getVideos: (req: Request, res: Response) => Promise<void>;
export declare const getComments: (req: Request, res: Response) => Promise<void>;
export declare const banUser: (req: Request, res: Response) => Promise<void>;
export declare const unbanUser: (req: Request, res: Response) => Promise<void>;
export declare const blockVideo: (req: Request, res: Response) => Promise<void>;
export declare const unblockVideo: (req: Request, res: Response) => Promise<void>;
export declare const hideComment: (req: Request, res: Response) => Promise<void>;
export declare const unhideComment: (req: Request, res: Response) => Promise<void>;
export declare const deleteVideo: (req: Request, res: Response) => Promise<void>;
export declare const deleteComment: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=admin.controller.d.ts.map