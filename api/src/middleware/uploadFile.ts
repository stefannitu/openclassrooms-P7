import multer from 'multer'

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
}

//set storage  for multer
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './upl')
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1]
        cb(null, `${file.fieldname}-${Date.now()}.${ext}`)
    },
})

export const upload = multer({
    storage: multerStorage,
    fileFilter: (req, file, cb) => {
        //if mime type different from MIME_TYPES reject
        if (!Object.keys(MIME_TYPES).includes(file.mimetype)) {
            return cb(null, false)
        }
        cb(null, true)
    },
})
