const semester = require("../models/semester.model");

exports.getAll = function (req, res) {
  semester.getAll((result) => {
    res.send(result);
  });
};

exports.add = async function (req, res) {
  const data = req.body;

  const checkDate = await semester.checkValidDate(
    new Date(data.startTime).toISOString().split("T")[0],
    new Date(data.endTime).toISOString().split("T")[0]
  );
  if (checkDate) {
    semester.add(data, (result) => {
      return res.send(result);
    });
  } else {
    return res.send({
      status: 400,
      message: "Invalid date",
    });
  }
};

exports.deleteByID = function (req, res) {
  const id = req.params.id;
  semester.deleteByID(id, (result) => {
    res.send(result);
  });
};

exports.getById = function (req, res) {
  const id = req.params.id;
  semester.getById(id, (result) => {
    res.send(result);
  });
};
