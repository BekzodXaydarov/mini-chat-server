const multer = require('multer');
const path = require('path');
// Set storage engine for Multer
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(
      null,
      file.originalname
    );
  },
});

// Initialize upload
const upload = multer({ storage: storage });
module.exports = upload;
