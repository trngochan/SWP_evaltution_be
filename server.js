const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const cookieParser = require('cookie-parser');
const auth = require('./common/_AUTH');

const he = "helo"

app.use(cookieParser());

// app.set('trust proxy', 1)
app.use(session({
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

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// cau hinh body parser
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


require("./routers/home.router")(app);

require("./routers/student.router")(app);


app.get("/getuser",auth.checkLogin, function (req, res) {
  console.log("check login")
  res.json(req.params.data);
});




app.listen(9000, () => {
  console.log("Server is running on port 9000");
});
