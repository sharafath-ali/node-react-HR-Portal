import express from "express";

import {
  getAllEmployees,
  getSingleEmployee,
  deleteEmployee,
  addEmployees,
  Update,
  uploadImage,
  uploadDocument,
  getFilesInDirectory,
  //downloadFile
} from "../controller/contactcontroller";

const router = express.Router();

router.get("/", getAllEmployees);

router.get("/getbyid/:id", getSingleEmployee);

router.delete("/employ/:id", deleteEmployee);

router.post("/add", addEmployees);

router.put("/Update/:id",Update)

router.put("/image/:id",uploadImage)

router.put("/image/:id",uploadImage)

router.put("/document/:id", uploadDocument);

router.get("/files/:id", getFilesInDirectory);

//router.get("/document/download", downloadFile);
export default router;
