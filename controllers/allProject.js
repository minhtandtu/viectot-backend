const projectModel = require("../models/projects");
const audiobookModel = require("../models/audiobooks");
const express = require("express");

const getData = {
  allProject: async (req, res) => {
    const data = await projectModel.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "all project",
      count: data.length,
      data,
    });
  },
  projectDetail: async (req, res) => {
    const data = await projectModel.findById(req.params._id);
    res.status(200).json({
      success: true,
      data,
    });
  },
  audiobook: async (req, res) => {
    const data = await audiobookModel.find();
    res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  },
  createPost: async (req, res) => {
    try {
      const data = req.body;
      const imageUrl = req?.file?.path.replace("public", "");
      const featureImage = "http:\\\\localhost:8000" + imageUrl;
      const newdata = { ...data, featureImage };
      const response = await projectModel.create(newdata);

      res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: "error in creating post",
      });
    }
  },
};
module.exports = getData;
