const mongoose = require("mongoose");
const StudentModel = require("../models/students.model");
const getDataFromExcel = require("../helper/extractDataFromExcel");
let passingMarks = 40;

const findAll = async (req, res, next) => {
  try {
    let page;
    let limit;
    let filter = {};
    let resultStatus = req.query.resultStatus;
    if (resultStatus === "passed") {
      filter = {
        mark1: { $gte: passingMarks },
        mark2: { $gte: passingMarks },
        mark3: { $gte: passingMarks },
      };
    }
    if (resultStatus === "failed") {
      filter = {
        $or: [
          { mark1: { $lt: passingMarks } },
          { mark2: { $lt: passingMarks } },
          { mark3: { $lt: passingMarks } },
        ],
      };
    }

    page = parseInt(req.query.page) || 1;
    limit = parseInt(req.query.limit) || 20;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const result = {};
    const length = await StudentModel.countDocuments().exec();
    result.total_count = length;
    result.total_pages = Math.ceil(length / limit);
    if (result.total_pages < page) {
      result.msg = "Page Number exceeds limit!";
      result.results = [];
      return res.json(result);
    }
    if (endIndex < length) {
      result.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      result.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    result.limit = limit;
    result.currentPage = page;
    result.results = await StudentModel.find(filter)
      .limit(limit)
      .skip(startIndex);
    res.paginatedResult = result;
    return res.json(result);
  } catch (error) {
    console.log(error);
  }
};

const uploadFile = async (req, res, next) => {
  try {
    if (!req.files?.excel) {
      return res.json({
        success: false,
        message: "Upload excel file*",
      });
    }
    const excel = req.files.excel;
    const excelData = await getDataFromExcel(excel.tempFilePath);
    StudentModel.insertMany(excelData)
      .then((data) => {
        return res.status(200).json({
          success: true,
          message: "Data Inserted Successfully",
        });
      })
      .catch((error) => {
        return res
          .status(400)
          .json({ success: false, message: "Error inserting data", error });
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

const findOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Enter correct id in params",
      });
    }
    StudentModel.findById(id)
      .then((data) => {
        if (data) {
          return res.status(200).json({
            success: true,
            message: "Data found Successfully",
            data,
          });
        }
        return res.status(200).json({
          success: true,
          message: "Data not found",
        });
      })
      .catch((error) => {
        return res
          .status(400)
          .json({ success: false, message: "Error fetching data", error });
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

module.exports = {
  findAll,
  uploadFile,
  findOne,
};
