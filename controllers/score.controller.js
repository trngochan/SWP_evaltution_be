const Score = require("../models/score.model");

exports.insertScore = function (req, res) {
    const dataScores = req.body;
    const data =[req.cookies.course_id, dataScores.stdinprjId ,req.cookies.lectureinboard_id];
    delete dataScores.stdinprjId;
    Score.insertScore(dataScores, data, (result)=>{
        res.send(result);
    })
}