import express from "express";

import {
  getAllEmployees,
  getSingleEmployee,
  deleteEmployee,
  addEmployees,
} from "../controller/contactcontroller";

const router = express.Router();

router.get("/", getAllEmployees);

router.get("/getbyid/:id", getSingleEmployee);

router.delete("/employ/:id", deleteEmployee);

router.post("/add", addEmployees);

export default router;
