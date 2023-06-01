const db = require("../common/connect");

const scoreColumn = function (column) {
  this.id = column.id;
  this.name = column.name;
  this.percent = column.percent;
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

module.exports = scoreColumn;
