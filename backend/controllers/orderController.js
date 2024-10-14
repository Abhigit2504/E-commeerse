import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"

// placing orders using COD
const placeOrder = async(req,res)=>{
try{
    const {userId,items,amount,address} =req.body

    const orderData ={
        userId,
        items,
        amount,
        address,
        paymentMethod:"COD",
        payment:false,
        date :Date.now()
    }

    const newOrder = new orderModel(orderData)
    await newOrder.save()


    await userModel.findByIdAndUpdate(userId,{cartData:{}})
    
    res.json({success:true,message:"Order Placed"})

}
catch(error){
    console.log(error)
    res.json({success:false,message:error.message})
}
}



// placing order by sripe
const placeOrderStripe = async(req,res)=>{
    try{

}
catch(error){
    
}
}
// placing order by rozer
const placeOrderRazorpay = async(req,res)=>{
    try{

    }
    catch(error){
        
    }
}

// ALL order data for admin panel
const allOrders = async(req,res)=>{
    try{
        const orders = await orderModel.find({})
        res.json({success:true,orders})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
// ALL order data for admin panel
const userOrders = async(req,res)=>{
    try{

        const {userId} =req.body
        const orders  = await orderModel.find({userId})
        res.json({success:true,orders})

    }
    catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
// Update order status from Frontend
const updateOrders = async(req,res)=>{
    try{

    }
    catch(error){
        
    }
}
 
// Update order status from Admin panel
const updateStatus = async(req,res)=>{
    try{
        const {orderId,status} =req.body
        await orderModel.findByIdAndUpdate(orderId,{status})
        res.json({success:true,message:"Status Updated"})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
        
    }
}

export {placeOrder,placeOrderRazorpay,placeOrderStripe,allOrders,updateStatus,updateOrders,userOrders}