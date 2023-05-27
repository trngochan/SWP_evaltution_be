const db = require('../common/connect');

const evulutionBroand = function (evulutionBroand) {
    this.name = evulutionBroand.name;
    this.startTime = evulutionBroand.startTime;
    this.endTime = evulutionBroand.endTime;
    this.room = evulutionBroand.room;
  };

  evulutionBroand.getAll = function() {
    try {
      db.query("")
    } catch (error) {
      
    }
  }