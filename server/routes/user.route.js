import express from "express";
import { createUser, deleteUser, getAllUsers, getSingleUser, updateUser } from "../controllers/user.controller.js";


const router = express.Router();

router.post("/create", createUser)
router.get("/", getAllUsers)
router.delete("/delete/:id", deleteUser)
router.get("/single/:id", getSingleUser)
router.put("/update/:id", updateUser)


export default router