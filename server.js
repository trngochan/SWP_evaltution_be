const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const auth = require("./common/_AUTH");

app.use(cookieParser());

// app.set('trust proxy', 1)
app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
    store: new session.MemoryStore(),
    cookie: {
      secure: false,
      httpOnly: true,
    },
  })
);

app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// cau hinh body parser
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require("./routers/home.router")(app);

require("./routers/student.router")(app);
require("./routers/teach.router")(app);
require("./routers/evalutionboarch.router")(app);
require("./routers/project.router")(app);
require("./routers/scoreColumn.router")(app);
require("./routers/score.router")(app);
require("./routers/course.router")(app);
require("./routers/semester.router")(app);
require("./routers/subject.router")(app);
require("./routers/template.router")(app);

require("./routers/lectureinboard.router")(app);
require("./routers/projectinboard.router")(app);
require("./routers/studentincourse.router")(app);
require("./routers/studentinproject.router")(app);

app.get("/getuser", auth.checkLogin, function (req, res) {
  console.log("check login");
  res.json(req.params.data);
});

app.listen(9000, () => {
  console.log("Server is running on port 9000");
});
