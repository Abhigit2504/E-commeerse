import express from "express";
import {
  addProduct,
  listProducts,
  removeProducts,
  singleProducts,
} from "../controllers/producController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const productRoute = express.Router();

// This route is for testing file uploads
productRoute.post("/upload", (req, res, next) => {
  upload.single("file")(req, res, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "File upload error." });
    }
    next();
  });
}, (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded." });
  }
  res.json({ message: "File uploaded successfully!" });
});

// Change the route here to /add-product
productRoute.post(
  "/add-product",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);

productRoute.post("/remove", adminAuth, removeProducts);
productRoute.post("/single", singleProducts);
productRoute.get("/list", listProducts);

export default productRoute;
