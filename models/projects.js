const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const projectSchema = new Schema({
  name: {
    type: String,
    required: [true, "Nhập tên của dự án"],
    trim: true,
    maxLength: [200, "Giới hạn 200 ký tự"],
  },
  desc: {
    type: String,
    required: [true, "Nhập mô tả dự án"],
  },
  content: {
    type: String,
    required: [true, "Nhập nội dung dự án"],
  },
  totalMoney: {
    type: Number,
    maxLength: [10, "Số tiền vượt quá 9,999,999,999 (9 tỷ 9)"],
    default: 0.0,
  },
  currentMoney: {
    type: Number,
    maxLength: [10, "Số tiền vượt quá 9,999,999,999 (9 tỷ 9)"],
    default: 0.0,
  },
  category: {
    type: String,
    required: [true, "Hãy chọn 1 thể loại bài viết"],
    enum: {
      values: ["Hoạt động gây quỹ", "Hoạt động thiện nguyện"],
      message: "Hãy chọn 1 thể loại đúng",
    },
  },
  featureImage: {
    type: String,
    required: [true, "Hãy upload 1 bức ảnh"],
  },
  gallery: [
    {
      type: String,
    },
  ],
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
      name: { type: String },
      comment: { type: String },
    },
  ],
  author: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const projectModel = mongoose.model("project", projectSchema);

module.exports = projectModel;
