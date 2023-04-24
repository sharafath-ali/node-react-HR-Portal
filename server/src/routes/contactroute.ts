import express from "express";

import {
  getAllEmployees,
  getSingleEmployee,
  deleteEmployee,
  addEmployees,
  Update,
  uploadImage
} from "../controller/contactcontroller";

const router = express.Router();

router.get("/", getAllEmployees);

router.get("/getbyid/:id", getSingleEmployee);

router.delete("/employ/:id", deleteEmployee);

router.post("/add", addEmployees);

router.put("/Update/:id",Update)
router.put("/imageupload/:emplyeeId",uploadImage)

export default router;
