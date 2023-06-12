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
    db.query("Select * from Template", function (err, results) {
      cb(results);
    });
  } catch (error) {}
};

Template.checkDoubleId = function (id) {
  return Promise((resolve, reject) => {
    const query = "select * from Template where id = ?";
    db.query(query, [id], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

Template.add = function (data, cb) {
  try {
    const duplicateId = Template.checkDoubleId(data.id);
    if (duplicateId.length > 0) {
      return cb({
        status: 401,
        massage: "Duplicate code",
      });
    } else {
      db.query(
        "INSERT INTO `template`(`Id`, `Name`, `SubjectId`, `Status`, `ApplyDate`) VALUES (?, ?, ?, ?, ?)",
        [data.id, data.name, data.subjectId, 1, data.applyDate],
        function (err, results) {
          if (err)
            return cb({
              status: 401,
              data: "Failed to insert template",
            });
          return cb({
            status: 200,
            data: results,
          });
        }
      );
    }
  } catch (error) {
    return cb({
      status: 401,
      massage: "Error at tempalte add",
    });
  }
};

module.exports = Template;