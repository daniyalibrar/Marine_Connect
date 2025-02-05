const multer = require("multer");
const upload = multer({
  dest: "uploads/", // temporary folder
});

module.exports = upload;
