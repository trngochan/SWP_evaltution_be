const db = require("../common/connect");

const scoreColumn = function (column) {
  this.id = column.id;
  this.name = column.name;
  this.percent = column.percent;
};

scoreColumn.checkDoubleId = function (id) {
  return Promise(function (resolve, reject) {
    db.query(
      "SELECT * from scorecolumn WHERE id = ? and Status = 1",
      [id],
      function (err, res) {
        if (err) reject(err);
        else {
          resolve(res);
        }
      }
    );
  });
};

scoreColumn.add = function (data, cb) {
  try {
    for (var i = 0; i < data.dataColumn.length; i++) {
      db.query(
        "INSERT INTO `scorecolumn`( `Name`, `Percent`, `TemplateId`) VALUES ( ?, ? , ?)",
        [data.dataColumn[i].name, data.dataColumn[i].percent, data.templateId],
        function (err, data) {
          if (err) {
            console.log(err);
            return cb({
              status: 401,
              message: "Failed to inser scoreColumn",
            });
          }
        }
      );
    }
    return cb({
      status: 200,
      message: "Insert successfully",
    });
  } catch (error) {
    console.log(error);
    return cb({
      status: 500,
      message: "Error at add scoreColimn",
    });
  }
};

scoreColumn.getByTemplateId = function (id, cb) {
  try {
    db.query(
      "SELECT id,name,percent FROM scorecolumn WHERE templateid =? and Status = 1",
      [id],
      function (err, data) {
        if (err) {
          cb(err);
        } else {
          cb(data);
        }
      }
    );
  } catch (error) {
    cb(error);
  }
};

scoreColumn.getBySubjectId = function (id, cb) {
  try {
    db.query(
      "select * from template,scorecolumn WHERE template.SubjectId = ? AND scorecolumn.TemplateId = template.id and template.Status = 1 AND scorecolumn.Status = 1;",
      [id],
      function (err, data) {
        if (err) {
          cb(err);
        } else {
          cb(data);
        }
      }
    );
  } catch (error) {
    cb(error);
  }
};

module.exports = scoreColumn;
