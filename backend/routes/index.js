import express from "express";
import DownloadController from "../controllers/DownloadController";

const router = express.Router();

router.get("/video", DownloadController.getVideo);
router.get("/audio", DownloadController.getAudio);

export default router;
