/// creating a sendResponse file so we can use it in all our code. 
const sendResponse = (res, success, message, data = null, status = 200) => {
  return res.status(status).json({ success, message, data });
};
module.exports = sendResponse;