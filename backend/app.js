var mysql = require('mysql');
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const app = express();
const port = 3001;

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "cs-mansion"
});
const corsOptions = {
  origin: "http://127.0.0.1:3000",
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(
  session({
    secret: "your-secret-key-here",
    resave: false,
    saveUninitialized: true,
  })
);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} status ${res.statusCode} `);
  next();
});

app.post("/api/login", async (req, res) => {
  
  const receivedData = JSON.parse(atob(req.body.body));

  try {
    con.connect(function(err) {
      if (err) throw err;
      con.query("SELECT * FROM admin",  (err, result) => {
        if (err) throw err;
        // var response = result
        res.send(result)
        console.log(receivedData);
        // if (response) {
        //   req.session.user = { Username: response.Username };
        //   res.send({ response: btoa(JSON.stringify(response)), status: "success" });
        // } else {
        //   res.send({
        //     ///////////////////////////
        //     response: "fail to query",
        //     //////////////////////////
        //     status: "Error",
        //   });
        // }
      });
    });
    
  } catch (e) {
    res.send({
      ///////////////////////////////
      response: "Internal Server Error",
      ///////////////////////////////
      status: "Error",
    });
  }
});

//----------------------------------get---------------------------------

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});