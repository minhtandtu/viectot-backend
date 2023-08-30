const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const audiobookSchema = new Schema({
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
  category: {
    type: String,
    required: [true, "Hãy chọn 1 thể loại bài viết"],
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
  rating: {
    type: Number,
    default: 0,
  },
  numberOfReview: {
    type: Number,
    default: 0,
  },
});

const audiobookModel = mongoose.model("audiobook", audiobookSchema);

module.exports = audiobookModel;
