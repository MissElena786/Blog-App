// import path from "path";

// import multer from "multer";

// const upload = multer({
//   dest: "uploads/",
//   limits: { fileSize: 50 * 1024 * 1024 }, // 50 mb in size max limit
//   storage: multer.diskStorage({
//     destination: "uploads/",
//     filename: (_req, file, cb) => {
//       cb(null, file.originalname);
//     },
//   }),
//   fileFilter: (_req, file, cb) => {
//     let ext = path.extname(file.originalname);
//     if (
//       ext !== ".jpg" &&
//       ext !== ".jpeg" &&
//       ext !== ".webp" &&
//       ext !== ".png" &&
//       ext !== ".svg" &&
//       ext !== ".mp4"
//     ) {
//       cb(new Error(`Unsupported file type! ${ext}`), false);
//       return;
//     }

//     cb(null, true);
//   },
// });

// export default upload;

import path from "path";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Specify the destination directory for file uploads
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use the original filename
  },
});

const fileFilter = (req, file, cb) => {
  const allowedExtensions = [".jpg", ".jpeg", ".webp", ".png", ".svg", ".mp4"];
  const ext = path.extname(file.originalname).toLowerCase();

  if (!allowedExtensions.includes(ext)) {
    cb(new Error(`Unsupported file type! ${ext}`), false);
    return;
  }

  cb(null, true);
  console.log(cb)
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB file size limit
  fileFilter: fileFilter,
});

export default upload;
