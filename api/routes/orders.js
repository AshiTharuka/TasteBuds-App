import express from "express";
import {
    createOrder,
  updateOrder,
  deleteOrder,
  getOrder,
  getOrders,
} from "../controllers/orders.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE
router.post("/add", verifyUser, createOrder);

//UPDATE
router.put("/:id", verifyUser, updateOrder);
//DELETE
router.delete("/:id", verifyUser, deleteOrder);
//GET

router.get("/find/:id", getOrder);
//GET ALL

router.get("/", getOrders);


export default router;
