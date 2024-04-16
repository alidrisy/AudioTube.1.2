import express from "express";
import DownloadController from "../controllers/DownloadController";
import SearchController from "../controllers/SearchController";

const router = express.Router();

router.get("/video", DownloadController.getVideo);
router.get("/audio", DownloadController.getAudio);
router.get("/search/:catagoryId", SearchController.getCatagoryVideos);
router.get("/search", SearchController.getAllVideos);

export default router;
