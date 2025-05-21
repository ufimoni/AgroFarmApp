  // creating an external error-handling function
module.exports = asyncErrorHandler = (func)=>{
    return(req,res,next)=>{
        // this function will return a promise
        func(req,res,next).catch(err => next(err));
    }
}