import { v2 as cloudinary } from "cloudinary";
import producrModel from "../models/productmodel.js";
import dotenv from "dotenv";
dotenv.config(); // Load the .env file

// function for add product
// const addProduct = async (req, res) => {
//   try {
//     const {
//       name,
//       description,
//       price,
//       category,
//       subcategory,
//       sizes,
//       bestseller,
//     } = req.body;
//     console.log(name);
//     console.log(req.files);
//     const image1 = req.files.image1 && req.files.image1[0];
//     const image2 = req.files.image2 && req.files.image2[0];
//     const image3 = req.files.image3 && req.files.image3[0];
//     const image4 = req.files.image4 && req.files.image4[0];

//     const images = [image1, image2, image3, image4].filter(
//       (item) => item !== undefined
//     );

//     // const imagesURL = await Promise.all(
//     //   images.map(async (item) => {
//     //     let result = await cloudinary.uploader.upload(item.path, {
//     //       resource_type: "image",
//     //     });
//     //     return result.secure_url;
//     //   })
//     // );
//     const productData = {
//       name,
//       description,
//       category,
//       price: Number(price),
//       // image :imagesUrl,
//       subcategory,
//       bestseller: bestseller === "true" ? true : false,
//       sizes: JSON.parse(sizes),
//       date: Date.now(),
//     };

//     console.log(productData);
//     const product = new producrModel(productData);
//     res.json({});
//     product.save();
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME ,
  api_key: process.env.CLLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subcategory,
      sizes,
      bestseller,
    } = req.body;

    console.log(name);
    console.log(req.files); // Ensure req.files contains the image files

    // Get images from the request
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    // Upload images to Cloudinary and get their URLs
    const imagesURL = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url; // Return the Cloudinary URL
      })
    );

    // Construct product data object including imagesURL
    const productData = {
      name,
      description,
      category,
      price: Number(price),
      images: imagesURL, // Array of image URLs
      subcategory,
      bestseller: bestseller === "true" ? true : false,
      sizes: JSON.parse(sizes),
      date: Date.now(),
    };

    console.log(productData); // This will now include image URLs
    const product = new producrModel(productData);
    await product.save(); // Save the product data to MongoDB

    // Return success response
    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// function for add priduct
const listProducts = async (req, res) => {
  try{
    const products = await producrModel.find({});
    // console.log(products)
    res.json({success:true,products})
  }
  catch(error){
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// removing product
const removeProducts = async (req, res) => {
  try{
      await producrModel.findByIdAndDelete(req.body.id)
      res.json({success:true,message:"Product removed"})
  }
  catch(error){
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// single product info
const singleProducts = async (req, res) => {
  try{
    const {productId} = req.body
    const product = await producrModel.findById(productId)
    res.json({success:true,product})

  } catch(error){
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addProduct, listProducts, removeProducts, singleProducts };
