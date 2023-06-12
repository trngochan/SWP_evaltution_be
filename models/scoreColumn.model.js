const db = require("../common/connect");

const scoreColumn = function (column) {
  this.id = column.id;
  this.name = column.name;
  this.percent = column.percent;
};

scoreColumn.checkDoubleId = function (id) {
  return Promise(function (resolve, reject) {
    db.query("SELECT * from scorecolumn WHERE id = ?", [id], function (err, res) {
      if(err) reject(err);
      else {
        resolve(res);
      }
    })
  })
}

scoreColumn.add = function (data, cb) {
  try {
    const doubleId = scoreColumn.checkDoubleId(data.id);
    if (doubleId.length > 0) {
      return cb({
        status: 401,
        message: 'Double ID'
      });
    } else {
      db.query(
        "INSERT INTO `scorecolumn`(`Id`, `Name`, `Percent`, `TemplateId`) VALUES (?, ?, ? , ?)",
        [data.id, data.name, data.percent, data.template],
        function (err, data) {
          if (err) {
            return cb({
              status: 401,
              message: "Failed to inser scoreColumn"
            });
          } else {
            return cb({
              status: 200,
              message: "Insert successfully"
            });
          }
        }
      );
    }
  } catch (error) {
    cb({
      status: 500,
      message: "Error at add scoreColimn"
    });
  }
};

scoreColumn.getByTemplateId = function (id, cb) {
  try {
    db.query(
      "SELECT id,name,percent FROM scorecolumn WHERE templateid =?",
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
      "select * from template,scorecolumn WHERE template.SubjectId = ? AND scorecolumn.TemplateId = template.id;",
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
