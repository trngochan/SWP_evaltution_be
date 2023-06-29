const db = require("../common/connect");

const Template = function (template) {
  this.id = template.id;
  this.name = template.name;
  this.subjectId = template.subjectId;
  this.status = template.status;
  this.applyDate = template.applyDate;
};

Template.getAll = function (cb) {
  try {
    db.query(
      "Select * from Template where Status = 1",
      function (err, results) {
        cb(results);
      }
    );
  } catch (error) {}
};

Template.checkDoubleId = function (id) {
  return new Promise((resolve, reject) => {
    const query = "select * from Template where id = ? and Status = 1";
    db.query(query, [id], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

Template.add = async function (data, cb) {
  try {
    const duplicateId = await Template.checkDoubleId(data.id);
    if (duplicateId.length > 0) {
      return cb({
        status: 401,
        massage: "Duplicate ID Template",
      });
    } else {
      db.query(
        "INSERT INTO `template`(`Id`, `Name`, `SubjectId`, `Status`, `ApplyDate`) VALUES (?, ?, ?, ?, ?)",
        [data.id, data.name, data.subjectId, 1, data.applydate],
        function (err, results) {
          if (err) {
            console.log(err);
            return cb({
              status: 401,
              data: "Failed to insert template",
            });
          }
          return cb({
            status: 200,
            data: results,
          });
        }
      );
    }
  } catch (error) {
    console.log(error);
    return cb({
      status: 500,
      massage: "Error at tempalte add",
    });
  }
};

module.exports = Template;
