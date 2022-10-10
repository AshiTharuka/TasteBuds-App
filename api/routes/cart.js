import express from "express";
import {
  
  createCart,
  deleteCart,
  getCart,
  getCarts,
  
  updateCart,
} from "../controllers/cart.js";
import Cart from "../models/cart.js";
import {verifyAdmin} from "../utils/verifyToken.js"
const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createCart);

//UPDATE
router.put("/:id", verifyAdmin, updateCart);
//DELETE
router.delete("/:id", verifyAdmin, deleteCart);
//GET

router.get("/find/:id", getCart);
//GET ALL

router.get("/", getCarts);


export default router;