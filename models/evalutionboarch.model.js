const db = require('../common/connect');

const EvulutionBroand = function (evulutionBroand) {
    this.name = evulutionBroand.name;
    this.startTime = evulutionBroand.startTime;
    this.endTime = evulutionBroand.endTime;
    this.room = evulutionBroand.room;
  };

  EvulutionBroand.getAll = function(cb) {
    try {
      db.query("select * from eveluationboard", function(err,data) {
        if (err) cb(err);
        else cb(data);
      })
    } catch (error) {
      
    }
  }

  EvulutionBroand.returnById = function (id) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM eveluationboard WHERE id = ${id}`,
        function (err, data) {
          if (err) {
            reject(err);
          } else {
            resolve(data[0]);
          }
        }
      );
    });
  };

  EvulutionBroand.getByTeacherId = async function(id ,cb) {
    try {
      const data = await new Promise((resolve, reject) => {
        db.query(`select EvaluationBoardId from lectureinboard  where Lecture_id = ${id}`, function(err,data) {
          if (err) reject(err);
          else resolve(data);
        })
      })

      const dataEvulitionBoard = [];
      for (let i = 0; i < data.length; i++) {
        const evalution = await EvulutionBroand.returnById(data[i].EvaluationBoardId);
        dataEvulitionBoard.push(evalution);
      }

      cb(dataEvulitionBoard)
    } catch (error) {
        cb(error);
    }
  }

  module.exports = EvulutionBroand;