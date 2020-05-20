const multer = require('multer')

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if(!file.originalname.match(/\.(png|jpg|jpeg)$/)){
      return cb(new Error('File must be a png or jpg file format'))
    }
    cb(undefined, true)
  },
})

module.exports = upload
