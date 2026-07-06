import type { Request, Response } from "express";
export declare const subscribe: (req: Request, res: Response) => Promise<void>;
export declare const unsubscribe: (req: Request, res: Response) => Promise<void>;
export declare const getChannelSubscribers: (req: Request, res: Response) => Promise<void>;
export declare const getUserSubscriptions: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=subscription.controller.d.ts.map