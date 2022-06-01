require('dotenv').config()
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const buffer = require('buffer');
const multer = require('multer');

const app = express();

const { pool } = require('./models/pool.js');

app.use(cors({ origin: "*" }));
app.use(express.json());

// function to get jwt if it exists from client
const getTokenFrom = request => {
    const authorization = request.get('authorization');

    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7);
    }
    return null;
}

app.post("/search", (req, res) => {
    console.log(req.body);

    pool.getConnection(async (err, connection) => {
        if (err) throw err;

        let query = "SELECT * FROM `job posts`";
        let add = ' WHERE';
        let param = [];

        const title = req.body.title;
        const field = req.body.field;
        const location = req.body.location;
        const skill = req.body.skill;

        // use to create a query based on user input
        if (title != "" && title != undefined) {
            query += add + " `job name` LIKE concat('%', ?, '%')";
            param.push(title);
            add = ' AND';
        }

        if (field != "" && field != undefined) {
            query += add + " `job field` LIKE concat('%', ?, '%')";
            param.push(field);
            add = ' AND';
        }

        if (location != "" && location != undefined) {
            query += add + " `job location` LIKE concat('%', ?, '%')";
            param.push(location);
            add = ' AND';
        }

        if (skill != "" && skill != undefined) {
            query += add + " `job skills` LIKE concat('%', ?, '%')";
            param.push(skill);
            add = ' AND';
        }

        // validate the input title and field input are less than 40 characters
        validateStatus = true;
        if (title.length > 40) {
            validateStatus = false;
        } else if (field.length > 40) {
            validateStatus = false;
        }

        console.log(validateStatus, query)

        // if all validate conditions are met run the query
        if (validateStatus) {
            connection.query(query, param, (err, result) => {
                if (err) throw err;
                result.map(e => {
                    
                    // turn a blob in the db to a image 
                    if (e['job photo'] != null)
                        e['job photo'] = "data:image;base64," + Buffer.from(e['job photo']).toString('base64');
                    return e;
                });
                res.json({ result });
            });
        }
        connection.release();
    });
});

app.post("/register", async (req, res) => {

    // input from the user 
    var email = req.body["email"];
    var type = req.body["type"];
    var name = req.body["name"];
    var password = req.body["password"];
    var repassword = req.body["repassword"];

    console.log(req.body);

    var resultStatus = true;

    // Check that type of user is greater than 0 and less than 7 characters
    // Check username and password are greater than 0 and less than 30 characters
    // Check to see if the normalize passwords are equal
    if (type.length == 0 || type.length > 7) {
        resultStatus = false;
    } else if (name.length == 0 || name.length > 30) {
        resultStatus = false;
    } else if (password.length == 0 || password.length > 30) {
        resultStatus = false;
    } else if (password.normalize() !== repassword.normalize()) {
        resultStatus = false;
    }

    // if validate conditions are met run a query in the db
    if (resultStatus) {
        var query = "INSERT INTO accounts (email, type, name, password) VALUES ( ? , ? , ? , ?)";

        // encrypt password of the user to store in the db
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) throw err;

            pool.query(query, [
                email,
                type,
                name,
                hash
            ], (err, result) => {
                if (err) throw err;
            });

        });

        res.status(201).send();
    } else {
        res.status(400).send();
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    // function to check to see if user name and password matches with one in db
    const findUser = (pool, email) => {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM `accounts` WHERE email = ?";
            pool.query(query, [email], (err, result) => {
                if (err) reject(err);
                resolve(result[0]);
            });
        })
    }

    var user = await findUser(pool, email);

    // if user is not in the db
    if (user == undefined) {
        console.log("Here")
        res.status(400);
        res.send("Cannot find user.");
        return
    }

    console.log("Here4 " + JSON.stringify(user));

    console.log(await bcrypt.compare(password, user.password));

    console.log("password " + password);
    console.log("user password " + user.type);

    // compare password with the one in the db to see if they match
    const passwordResult = await user === undefined
        ? false
        : await bcrypt.compare(password, user.password);

    // if username or password doesn't match send error to client
    if (!(user && passwordResult)) {
        console.log("bad request");
        return res.status(400).send("Invalid username or password");
    }

    console.log(user);

    // info that will be save int he jwt to send to user
    const infoForToken = {
        aid: user.aid,
        type: user.type,
        email: email,
        name: user.name
    };

    // creates jwt token
    const token = jwt.sign(
        infoForToken,
        process.env.SECRET,
    );

    res.send({ token, name: user.name, type: user.type , email: user.email});
});

// post job form
app.post("/jobPost", (req, res) => {
    const token = getTokenFrom(req);

    // if no jwt
    if (token === null) {
        return res.status(401).json({ error: 'unauthorized' });
    }

    // decode jwt
    const decodedToken = jwt.verify(token, process.env.SECRET);

    // verify jwt is correct type
    if (decodedToken.type !== "Company") {
        console.log("Here")
        return res.status(401).json({ error: 'token missing or invalid' })
    }

    const accountId = +decodedToken.aid; // return as number if it is a string
    const company = decodedToken.name; //company

    const jobDesc = req.body.formData.jobdescription;
    const jobTitle = req.body.formData.jobtitle;
    const jobField = req.body.formData.jobs;
    const jobSalary = req.body.formData.pay;
    const jobSkills = req.body.formData.skill;
    const jobLocation = req.body.formData.location;

    // Time stamp for the post submited
    const jobTimeStamp = new Date().toISOString().
        replace(/T/, ' ').      // replace T with a space
        replace(/\..+/, '');     // delete the dot and everything after

    console.log(jobDesc, " ", +accountId, " ", jobTimeStamp, " ", jobTitle, " ", jobField, " ", jobSalary, " ", jobSkills, " ", company);//company
    console.log("Type of accountId: ", typeof(accountId)) 
    
    // mysql query
    let query = "INSERT INTO `job posts` (`job desc.`, `aid` , `date posted`, `job name`, `job field`, ";
        query += "`job salary`, `job skills`, `job location`, `company`) VALUES ( ? , ?, ? , ? , ? , ? , ?, ?, ?)";

    pool.getConnection((err, connection) => {
        if (err) throw err;

        connection.query(query, [
            jobDesc,
            accountId,
            jobTimeStamp,
            jobTitle,
            jobField,
            jobSalary,
            jobSkills,
            jobLocation,
            company
        ], (err, result) => {
            if (err) throw err;
        });

        connection.release();
    });
});

app.post("/postResume", multer().none(), (req, res) => {
    console.log("In post resume");
    console.log("req.body: ", req.body);
});

app.delete("/deletePost", (req, res) => {
    const token = getTokenFrom(req);

    // if no jwt
    if (token === null) {
        return res.status(401).json({ error: 'unauthorized' });
    }

    // verify jwt
    const decodedToken = jwt.verify(token, process.env.SECRET);
    console.log(JSON.stringify(decodedToken))
    if (decodedToken.type !== "Admin" && decodedToken.type !== "Company") {
        return res.status(401).json({ error: 'token missing or invalid' })
    }

    // query to delete a job post with a certain id number
    pool.getConnection((err, connection) => {
        if (err) throw err;
        const query = "DELETE FROM `job posts` WHERE id = ?";
        connection.query(query, [
            req.body["postId"]
        ], (err, result) => {
            if (err) throw err;
        });

        connection.release();
    });

    res.send("success");
});

app.get("/getCompanyPost", (req, res) => {
    const token = getTokenFrom(req);

    // if no jwt
    if (token === null) {
        return res.status(401).json({ error: 'unauthorized' });
    }

    // verify jwt
    const decodedToken = jwt.verify(token, process.env.SECRET);
    console.log(JSON.stringify(decodedToken));

    // check the jwt that the account is user
    if (decodedToken.type !== "Company") {
        console.log("Here")
        return res.status(401).json({ error: 'token missing or invalid' })
    }

    // query to get all the post that a company posted
    pool.getConnection((err, connection) => {
        const query = "SELECT * FROM `job posts` WHERE aid = ?";
        const aid = decodedToken.aid;
        connection.query(query, aid, (err, result) => {
            if (err) throw err;
            result.map(e => {
                if (e['job photo'] != null)
                    e['job photo'] = "data:image;base64," + Buffer.from(e['job photo']).toString('base64');
                return e;
            });
            res.json({ result });
        });
        connection.release();
    });

    res.status(200);
});


app.post("/bookmarkPost", (req, res) => {
    const token = getTokenFrom(req);

    // if no jwt
    if (token === null) {
        return res.status(401).json({ error: 'unauthorized' });
    }

    // verify jwt
    const decodedToken = jwt.verify(token, process.env.SECRET);
    console.log(JSON.stringify(decodedToken));

    // Check the type of account
    if (decodedToken.type !== "Student") {
        return res.status(401).json({ error: 'token missing or invalid' })
    }

    const aid = decodedToken.aid;
    const jid = req.body.postId;

    let query = "INSERT IGNORE INTO `bookmark` (`aid`, `jid`) VALUES ( ? , ?)";

    // query to insert bookmark post for students
    pool.getConnection((err, connection) => {
        if (err) throw err;

        connection.query(query, [
            aid,
            jid
        ], (err, result) => {
            if (err) throw err;
        });

        connection.release();
    });

    res.status(200);
});

app.get("/getBookmark", (req, res) => {
    const token = getTokenFrom(req);

    // if no jwt
    if (token === null) {
        return res.status(401).json({ error: 'unauthorized' });
    }
    console.log("Here1")

    // verify jwt
    const decodedToken = jwt.verify(token, process.env.SECRET);
    console.log(JSON.stringify(decodedToken));

    if (decodedToken.type !== "Student") {
        return res.status(401).json({ error: 'token missing or invalid' })
    }

    const aid = decodedToken.aid;
    const jid = req.body.postId;

    const query = "SELECT `job posts`.* FROM `bookmark` JOIN `job posts` ON `bookmark`.jid = `job posts`.id AND `bookmark`.aid = ?;";

    // query to get the bookmark post students save
    pool.getConnection((err, connection) => {
        if (err) throw err;

        connection.query(query, [
            aid
        ], (err, result) => {
            if (err) throw err;
            console.log(result);
            result.map(e => {
                console.log();
                if (e['job photo'] != null)
                    e['job photo'] = "data:image;base64," + Buffer.from(e['job photo']).toString('base64');
                return e;
            });
            res.json({ result });
        });

        connection.release();
    });

    res.status(200);
});

app.delete("/deleteBookmark", (req, res) => {
    const token = getTokenFrom(req);

    // if no jwt
    if (token === null) {
        return res.status(401).json({ error: 'unauthorized' });
    }

    // verify jwt
    const decodedToken = jwt.verify(token, process.env.SECRET);
    console.log(JSON.stringify(decodedToken))
    if (decodedToken.type !== "Student") {
        return res.status(401).json({ error: 'token missing or invalid' })
    }

    const aid = decodedToken.aid;
    const jid = req.body["postId"];

    // query to delete a bookmark based on the aid and jid in bookmark table
    pool.getConnection((err, connection) => {
        if (err) throw err;
        const query = "DELETE FROM `bookmark` WHERE aid = ? AND jid = ?;";
        connection.query(query, [
            aid,
            jid
        ], (err, result) => {
            if (err) throw err;
        });

        connection.release();
    });

    res.send("success");
});

app.listen(process.env.PORT);