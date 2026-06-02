import donorFindController from "../controllers/donorFindController.js";
import express from "express";

const router = express.Router();

router.get("/find-donors", donorFindController);

export default router;

