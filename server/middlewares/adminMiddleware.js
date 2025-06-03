module.exports = function (req, res, next){
    if(req.user.role !== 'admin'){
    return res.status.json({
      message: 'Acess denied',
      success: false
    })
    }
    next();
}