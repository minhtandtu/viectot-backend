const router = require("express").Router();
const getData = require("../controllers/allProject");
const multer = require("multer");
const path = require("path");
const authController = require("../controllers/authControllers");
const adminAuth = require("../middlewares/adminAuth");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/"); // Thư mục lưu trữ ảnh
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Đổi tên ảnh thành thời gian hiện tại + phần mở rộng
  },
});

const upload = multer({ storage });

router.get("/project", getData.allProject);
router.get("/project/:_id", getData.projectDetail);
router.get("/audiobook", getData.audiobook);
router.post(
  "/createpost",
  adminAuth,
  upload.single("featureImage"),
  getData.createPost
);
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/refresh-token", authController.refreshTokens);
router.get("/logout", authController.logout);
module.exports = router;
