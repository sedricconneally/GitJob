"use strict";

require('dotenv').config();

var express = require('express');

var cors = require('cors');

var mysql = require('mysql2');

var jwt = require('jsonwebtoken');

var bcrypt = require('bcrypt');

var buffer = require('buffer');

var multer = require('multer');

var app = express();

var _require = require('./models/pool.js'),
    pool = _require.pool;

app.use(cors({
  origin: "*"
}));
app.use(express.json());
app.post("/search", function (req, res) {
  console.log(req.body);
  pool.getConnection(function _callee(err, connection) {
    var query, add, param, title, field, location, skill;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!err) {
              _context.next = 2;
              break;
            }

            throw err;

          case 2:
            query = "SELECT * FROM `job posts`";
            add = ' WHERE';
            param = [];
            title = req.body.title;
            field = req.body.field;
            location = req.body.location;
            skill = req.body.skill;

            if (title != "") {
              query += add + " `job name` LIKE concat('%', ?, '%')";
              param.push(title);
              add = ' AND';
            }

            if (field != "") {
              query += add + " `job field` LIKE concat('%', ?, '%')";
              param.push(field);
              add = ' AND';
            }

            if (location != "") {
              query += add + " `job location` LIKE concat('%', ?, '%')";
              param.push(location);
              add = ' AND';
            }

            if (skill != "") {
              query += add + " `job skills` LIKE concat('%', ?, '%')";
              param.push(skill);
              add = ' AND';
            }

            validateStatus = true;

            if (title.length > 40) {
              validateStatus = false;
            } else if (field.length > 40) {
              validateStatus = false;
            }

            if (validateStatus) {
              connection.query(query, param, function (err, result) {
                if (err) throw err;
                result.map(function (e) {
                  if (e['job photo'] != null) e['job photo'] = "data:image;base64," + Buffer.from(e['job photo']).toString('base64');
                  return e;
                });
                res.json({
                  result: result
                });
              });
            }

            connection.release();

          case 17:
          case "end":
            return _context.stop();
        }
      }
    });
  });
});
app.post("/register", function _callee2(req, res) {
  var email, type, name, password, repassword, resultStatus, query;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          email = req.body["email"];
          type = req.body["type"];
          name = req.body["name"];
          password = req.body["password"];
          repassword = req.body["repassword"];
          console.log(req.body);
          resultStatus = true; // Validate username and password

          if (type.length == 0 || type.length > 7) {
            resultStatus = false;
          } else if (name.length == 0 || name.length > 30) {
            resultStatus = false;
          } else if (password.length == 0 || password.length > 30) {
            resultStatus = false;
          } else if (password.normalize() !== repassword.normalize()) {
            resultStatus = false;
          }

          if (resultStatus) {
            query = "INSERT INTO accounts (email, type, name, password) VALUES ( ? , ? , ? , ?)";
            bcrypt.hash(password, 10, function (err, hash) {
              if (err) throw err;
              pool.query(query, [email, type, name, hash], function (err, result) {
                if (err) throw err;
              });
            });
            res.status(201).send();
          } else {
            res.status(400).send();
          }

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  });
}); // function to get jwt if it exists from client

var getTokenFrom = function getTokenFrom(request) {
  var authorization = request.get('authorization');

  if (authorization && authorization.toLowerCase().startsWith('')) {
    return authorization.substring(7);
  }

  return null;
};

app.post("/login", function _callee3(req, res) {
  var _req$body, email, password, findUser, user, passwordResult, infoForToken, token;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _req$body = req.body, email = _req$body.email, password = _req$body.password; // check to see if user name and password matches with one in db

          findUser = function findUser(pool, email) {
            return new Promise(function (resolve, reject) {
              var query = "SELECT * FROM `accounts` WHERE email = ?";
              pool.query(query, [email], function (err, result) {
                if (err) reject(err);
                resolve(result[0]);
              });
            });
          };

          _context3.next = 4;
          return regeneratorRuntime.awrap(findUser(pool, email));

        case 4:
          user = _context3.sent;

          if (!(user == undefined)) {
            _context3.next = 10;
            break;
          }

          console.log("Here");
          res.status(400);
          res.send("Cannot find user.");
          return _context3.abrupt("return");

        case 10:
          console.log("Here4 " + JSON.stringify(user));
          _context3.t0 = console;
          _context3.next = 14;
          return regeneratorRuntime.awrap(bcrypt.compare(password, user.password));

        case 14:
          _context3.t1 = _context3.sent;

          _context3.t0.log.call(_context3.t0, _context3.t1);

          console.log("password " + password);
          console.log("user password " + user.type);
          _context3.next = 20;
          return regeneratorRuntime.awrap(user);

        case 20:
          _context3.t2 = _context3.sent;
          _context3.t3 = undefined;

          if (!(_context3.t2 === _context3.t3)) {
            _context3.next = 26;
            break;
          }

          _context3.t4 = false;
          _context3.next = 29;
          break;

        case 26:
          _context3.next = 28;
          return regeneratorRuntime.awrap(bcrypt.compare(password, user.password));

        case 28:
          _context3.t4 = _context3.sent;

        case 29:
          passwordResult = _context3.t4;

          if (user && passwordResult) {
            _context3.next = 33;
            break;
          }

          console.log("bad request");
          return _context3.abrupt("return", res.status(400).send("Invalid username or password"));

        case 33:
          infoForToken = {
            email: email,
            type: user.type
          }; // creates jwt token

          token = jwt.sign(infoForToken, process.env.SECRET, {
            expiresIn: 60 * 60
          });
          res.send({
            token: token,
            name: user.name,
            type: user.type
          });

        case 36:
        case "end":
          return _context3.stop();
      }
    }
  });
}); // post job form

app.post("/jobPost", function (req, res) {
  console.log(req.body);
  var jobDesc = req.body.formData.jobdescription;
  var jobTitle = req.body.formData.jobtitle;
  var jobField = req.body.formData.jobs;
  var jobSalary = req.body.formData.pay;
  var jobSkills = req.body.formData.skill;
  var jobLocation = req.body.formData.location;
  var jobTimeStamp = req.body.formData.jobTimeStamp;
  console.log(jobDesc, " ", jobTimeStamp, " ", jobTitle, " ", jobField, " ", jobSalary, " ", jobSkills); // mysql query

  var query = "INSERT INTO `job posts` (`job desc.`, `date posted`, `job name`, `job field`, `job salary`, `job skills`, `job location`) VALUES ( ? , ? , ? , ? , ? , ?, ?)";
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query(query, [jobDesc, jobTimeStamp, jobTitle, jobField, jobSalary, jobSkills, jobLocation], function (err, result) {
      if (err) throw err;
    });
    connection.release();
  });
});
app.post("/postResume", multer().none(), function (req, res) {
  console.log("In post resume");
  console.log("req.body: ", req.body);
});
app.listen(process.env.PORT);