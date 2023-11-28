import fs from "fs";
import multer, { FileFilterCallback } from "multer";
import { Request, Response, NextFunction } from "express";
import { ActionNotAllowedError } from "../../common/errors";

export class ImageUpload {
    private storage = multer.diskStorage({
        destination: (req, file, cb) => {
            const uploadPath = "./uploads";
            if (!fs.existsSync(uploadPath)) {
                fs.mkdirSync(uploadPath);
            }
            cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + "-" + file.originalname);
        }
    });

    private fileFilter = (
        req: Request,
        file: Express.Multer.File,
        cb: FileFilterCallback
    ) => {
        // Check file types
        const allowedTypes = /jpeg|jpg|png/;
        const mimeType = allowedTypes.test(file.mimetype);
        const extName = allowedTypes.test(file.originalname.toLowerCase());

        if (mimeType && extName) {
            cb(null, true);
        } else {
            cb(
                new ActionNotAllowedError(
                    "Only images (jpeg, jpg, png) are allowed!"
                )
            );
        }
    };

    private upload = multer({
        storage: this.storage,
        fileFilter: this.fileFilter,
        limits: { fileSize: 10 * 1024 * 1024 }
    }).single("image");

    public imageUploadMiddleware = (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        this.upload(req, res, (err: any) => {
            if (err instanceof multer.MulterError) {
                if (err.code === "LIMIT_FILE_SIZE") {
                    throw new ActionNotAllowedError("Files cannot be larger than 10MB");
                } else {
                    return res.status(400).json({ message: err.message });
                }
            } else if (err) {
                throw new ActionNotAllowedError(
                    "Error uploading file: " + err
                );
            }

            if (!req.file) {
                throw new ActionNotAllowedError(
                    "No file to upload"
                );
            }

            const imagePath = req.file.path;
            req.imagePath = imagePath;
            next();
        });
    };
}
