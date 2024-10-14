import jwt from "jsonwebtoken";

const adminAuth = async (req,res,next)=>{
    try{
        const {token} =req.headers
        if(!token){
            return res.json({success:false,message:"Not authorised Login again"})
        }
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);
        // if(token_decode !== process.env.ADMIN_EMAIL +process.env.ADMIN_PASSWORD){
        //     return res.json({success:false,message:"Not authorised Login again"})

        // }
        next()
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:error.message})
}
}

export default adminAuth;


// import jwt from "jsonwebtoken";

// const adminAuth = async (req, res, next) => {
//     try {
//         const authHeader = req.headers.authorization; // Get the Authorization header
//         const token = authHeader && authHeader.split(' ')[1]; // Extract the token

//         if (!token) {
//             return res.status(403).json({ success: false, message: "Not authorised Login again" });
//         }

//         const token_decode = jwt.verify(token, process.env.JWT_SECRET); // Verify the token

//         // If you want to check for specific roles or permissions, you might have something like this:
//         if (token_decode.email !== process.env.ADMIN_EMAIL) {
//             return res.status(403).json({ success: false, message: "Not authorised Login again" });
//         }

//         req.user = token_decode; // Store the decoded token data for use in routes
//         next(); // Proceed to the next middleware or route handler
//     } catch (error) {
//         console.log(error);
//         res.status(403).json({ success: false, message: "Not authorised Login again" });
//     }
// };

// export default adminAuth;
