const db = require("../common/connect");

const Course = function (course) {
  this.id = course.id;
  this.subjectId = course.subjectId;
  this.semesterId = course.semesterId;
  this.LectureId = course.LectureId;
};

Course.deleteByID = function (id, cb) {
  try {
    db.query(
      "UPDATE `course` SET `Status`=0  WHERE Id = ? and Status = 1",
      [id],
      function (err, data) {
        if (err)
          return cb({
            status: 401,
            message: "Delete failed",
          });
        return cb({
          status: 200,
          message: "Delete successful",
        });
      }
    );
  } catch (error) {
    return cb({
      status: 501,
      message: "Error deleting course",
    });
  }
};

Course.getBySemSub = function (sem, sub, cb) {
  try {
    db.query(
      `select * from course where SubjectId = ? and SemesterId = ? and Status = 1`,
      [sub, sem],
      function (err, data) {
        if (err)
          return cb({
            status: 401,
            message: "failed",
          });
        return cb({
          status: 200,
          data: data,
        });
      }
    );
  } catch (error) {
    return cb({
      status: 501,
      message: "Error inserting",
    });
  }
};

Course.getBySubject = function (id, cb) {
  try {
    db.query(
      "select * from course where SubjectId = ? and Status = 1",
      [id],
      function (err, result) {
        if (err) {
          return cb(err);
        }
        return cb(result);
      }
    );
  } catch (error) {}
};

Course.getByID = function (id, cb) {
  try {
    db.query(
      "select * from course where id = ? and Status = 1",
      [id],
      function (err, result) {
        if (err) {
          return cb(err);
        }
        return cb(result);
      }
    );
  } catch (error) {
    cb(error);
  }
};

Course.getAll = function (cb) {
  try {
    db.query("SELECT * FROM course Where Status =1", function (err, data) {
      if (err) return cb(err);
      return cb(data);
    });
  } catch (error) {
    cb(error);
  }
};

Course.getByStuentID = function (id, cb) {
  try {
    db.query(
      `SELECT * from studentincourse, course where studentincourse.CourseId = course.Id AND studentincourse.StudentId = ? AND studentincourse.Status = 1 and course.Status = 1;`,
      [id],
      function (err, data) {
        if (err) return cb(err);
        return cb(data);
      }
    );
  } catch (error) {
    cb(error);
  }
};

Course.getByTeacherID = function (id, cb) {
  try {
    db.query(
      `SELECT * from lecture,course where lecture.Id = ${id} AND lecture.Id = course.LectureId AND course.Status = 1 AND lecture.Status = 1; `,
      function (err, data) {
        if (err) return cb(err);
        return cb(data);
      }
    );
  } catch (error) {
    cb(error);
  }
};

Course.add = function (data, cb) {
  try {
    const { subjectId, semesterId, name, LectureId, id } = data;

    db.query(
      `insert into course (SubjectId, SemesterId, LectureId, Name) values (${subjectId},${semesterId},${LectureId},"${name}")`,
      function (err, data) {
        if (err)
          return cb({
            status: 401,
            message: "Insert failed",
          });
        return cb({
          status: 200,
          message: "Insert succeeded",
        });
      }
    );
  } catch (error) {
    return cb({
      status: 401,
      message: "Error inserting",
    });
  }
};
module.exports = Course;
