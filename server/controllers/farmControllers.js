const Farm = require('./../models/farmModel');
const asyncErrorHandler = require('./../middlewares/asyncErrorHandler');
const sendResponse = require('./../Utils/sendResponse');

exports.createFarm = asyncErrorHandler( async(req, res ) =>{
//// define the url first
try{
 const { name, location, coordinates, size, soilType } = req.body;
 const farm = new Farm({
    name,
    location,
    coordinates,
    size,
    soilType,
    owner: req.user._id,
    
 })
const newFarm = await farm.save()

 return sendResponse(res, 
     true,
     'Farm created successfully.',
      newFarm, 
      201
    )
}catch(error){
return sendResponse(res, false, 'Error in creating Farm.', error.message);
}
})

exports.getAllFarm = asyncErrorHandler( async ( req, res ) =>{
try{
    
    const allfarms = await Farm.find().populate('owner', '-password')
    return sendResponse( res, false, "Fetched all farms Successfull", allfarms);
}catch(error){
    return sendResponse(res, false, 'Failed to fetch farms.', error.message);
}
})
exports.getFarmById = asyncErrorHandler( async ( req, res ) =>{
try{

}catch(error){
    return sendResponse(res, false, 'Failed to get specified farm.', error.message);
}
})

exports.updateFarm = asyncErrorHandler( async ( req, res ) =>{
try{

}catch(error){
    return sendResponse(res, false, 'Failed to update farms.', error.message);
}
})

exports.deleteFarm = asyncErrorHandler( async ( req, res ) =>{
try{

}catch(error){
    return sendResponse(res, false, 'Failed to delete farms.', error.message);
}
})