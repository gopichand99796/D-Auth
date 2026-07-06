import type { Request, Response } from "express";
export declare const create: (req: Request, res: Response) => Promise<void>;
export declare const getAll: (_req: Request, res: Response) => Promise<void>;
export declare const getOne: (req: Request, res: Response) => Promise<void>;
export declare const trending: (_req: Request, res: Response) => Promise<void>;
export declare const like: (req: Request, res: Response) => Promise<void>;
export declare const unlike: (req: Request, res: Response) => Promise<void>;
export declare const getLikes: (req: Request, res: Response) => Promise<void>;
export declare const stream: (req: Request, res: Response) => Promise<void>;
export declare const update: (req: Request, res: Response) => Promise<void>;
export declare const remove: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=video.controller.d.ts.map