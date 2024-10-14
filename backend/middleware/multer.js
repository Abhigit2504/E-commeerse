import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        // Define the folder where you want to save uploaded files
        callback(null, 'uploads/'); // Ensure the 'uploads' folder exists
    },
    filename:function(req,file,callback){
        callback(null,file.originalname)
    }
})
const upload = multer({storage})

export default upload;
