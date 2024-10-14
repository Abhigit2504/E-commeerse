import { v2 as cloudinary } from "cloudinary";



const connectClodinary = async () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    app_key: "886626894832984",
    app_secret: "SZM5mlIEkPpt5-6GojqpdFxQmhI",
  });
};
export default connectClodinary;
