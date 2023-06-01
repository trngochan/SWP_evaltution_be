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
      // const query ="SELECT * FROM lectureinboard, eveluationboard WHERE lectureinboard.Lecture_id = 1 AND lectureinboard.EvaluationBoardId = eveluationboard.Id;"
      const data = await new Promise((resolve, reject) => {
        db.query(`SELECT lectureinboard.Id as lectureinboardID,eveluationboard.Id, Name, SemesterId, SubjectId, TemplateId, StartTime,EndTime,Room FROM lectureinboard, eveluationboard WHERE lectureinboard.Lecture_id = ${id} AND lectureinboard.EvaluationBoardId = eveluationboard.Id`,
         function(err,data) {
          if (err) reject(err);
          else resolve(data);
        })
      })
      cb(data)

    //   const dataEvulitionBoard = [];
    //   for (let i = 0; i < data.length; i++) {
    //     const evalution = await EvulutionBroand.returnById(data[i].EvaluationBoardId);
    //     dataEvulitionBoard.push(evalution);
    //   }

    //   cb(dataEvulitionBoard)
    } catch (error) {
        cb(error);
    }
  }

  module.exports = EvulutionBroand;