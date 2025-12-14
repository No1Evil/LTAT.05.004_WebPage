const express = require('express');
const pool = require('../data/database');
const cors = require('cors');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const port = process.env.PORT || 3000;

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
// We need to include "credentials: true" to allow cookies to be represented  
// Also "credentials: 'include'" need to be added in Fetch API in the Vue.js App

app.use(express.json());
app.use(cookieParser());

const secret = "gdgdhdbcb770785rgdzqws";
const maxAge = 60 * 60;

const generateJWT = (id) => {
    return jwt.sign({ id }, secret, { expiresIn: maxAge })
        //jwt.sign(payload, secret, [options, callback]), and it returns the JWT as string
}


// is used to check whether a user is authinticated
const authenticateUser = async(req, res, next) => { // <-- ADD 'next' here
    console.log('authentication request has been arrived');
    const token = req.cookies.jwt;
    
    // Check if the token exists
    if (!token) {
        console.log('Token not found. Unauthorized.');
        return res.status(401).json({ message: "Authentication required." }); 
    }   
    
    // Token exists, now we try to verify it
    try {
        // Use a Promise-based verification or convert the callback to a Promise
        const decoded = await new Promise((resolve, reject) => {
            jwt.verify(token, secret, (err, decodedToken) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(decodedToken);
                }
            });
        });
        
        // If verification succeeds:
        console.log('Author is authenticated.');
        
        req.user = decoded; 
        
        next(); 

    } catch (err) {
        console.error('Token verification failed:', err.message);
        // Terminate the request and send a 403 response
        return res.status(403).json({ message: "Invalid or expired token." }); 
    }
};

app.get('/auth/authenticate', authenticateUser, (req, res) => {
    res.json({ 
        authenticated: true,
        userId: req.user.id
    });
});

// signup a user
app.post('/auth/signup', async(req, res) => {
    try {
        console.log("a signup request has arrived");
        //console.log(req.body);
        const { email, password } = req.body;

        const salt = await bcrypt.genSalt(); //  generates the salt, i.e., a random string
        const bcryptPassword = await bcrypt.hash(password, salt) // hash the password and the salt 
        const authUser = await pool.query( // insert the user and the hashed password into the database
            "INSERT INTO users(email, password) values ($1, $2) RETURNING*", [email, bcryptPassword]
        );
        console.log(authUser.rows[0].id);
        const token = await generateJWT(authUser.rows[0].id); // generates a JWT by taking the user id as an input (payload)
        //console.log(token);
        //res.cookie("isAuthorized", true, { maxAge: 1000 * 60, httpOnly: true });
        //res.cookie('jwt', token, { maxAge: 6000000, httpOnly: true });
        res
            .status(201)
            .cookie('jwt', token, { maxAge: 6000000, httpOnly: true })
            .json({ user_id: authUser.rows[0].id });
    } catch (err) {
     console.error(err.message);
    if (err.code === "23505") {
        return res.status(400).json({error: "Email already registered" });
  }
  
    res.status(400).json({ error: err.message });
    }
});

app.post('/auth/login', async(req, res) => {
    try {
        console.log("a login request has arrived");
        const { email, password } = req.body;
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (user.rows.length === 0) return res.status(401).json({ error: "User is not registered" });

        /* 
        To authenticate users, you will need to compare the password they provide with the one in the database. 
        bcrypt.compare() accepts the plain text password and the hash that you stored, along with a callback function. 
        That callback supplies an object containing any errors that occurred, and the overall result from the comparison. 
        If the password matches the hash, the result is true.

        bcrypt.compare method takes the first argument as a plain text and the second argument as a hash password. 
        If both are equal then it returns true else returns false.
        */

        //Checking if the password is correct
        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        console.log("validPassword:" + validPassword);
        if (!validPassword) return res.status(401).json({ error: "Incorrect password" });

        const token = await generateJWT(user.rows[0].id);
        res
            .status(201)
            .cookie('jwt', token, { maxAge: 6000000, httpOnly: true })
            .json({ user_id: user.rows[0].id });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

//logout a user = deletes the jwt
app.get('/auth/logout', (req, res) => {
    console.log('delete jwt request arrived');
    res.status(202).clearCookie('jwt').json({ "Msg": "cookie cleared" })
});

/*

Posts related

*/

app.post('/api/posts', authenticateUser, async(req, res) => {
    try {
        console.log("a post request has arrived");
        const post = req.body;
        const newpost = await pool.query(
            "INSERT INTO posttable(title, body, urllink) values ($1, $2, $3)    RETURNING*", [post.title, post.body, post.urllink]
        );
        res.json(newpost);
    } catch (err) {
        console.error(err.message);
    }
});

app.get('/api/posts', async(req, res) => {
    try {
        console.log("get posts request has arrived");
        const posts = await pool.query(
            "SELECT * FROM posttable"
        );
        res.json(posts.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get('/api/posts/:id', async(req, res) => {
    try {
        console.log("get a post with route parameter  request has arrived");
        const { id } = req.params;
        const posts = await pool.query(
            "SELECT * FROM posttable WHERE id = $1", [id]
        );
        res.json(posts.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.put('/api/posts/:id', authenticateUser, async(req, res) => {
    try {
        const { id } = req.params;
        const post = req.body;
        console.log("update request has arrived");
        const updatepost = await pool.query(
            "UPDATE posttable SET (title, body, urllink) = ($2, $3, $4) WHERE id = $1 RETURNING*", [id, post.title, post.body, post.urllink]
        );
        res.json(updatepost);
    } catch (err) {
        console.error(err.message);
    }
});

app.delete('/api/posts/:id', authenticateUser, async(req, res) => {
    try {
        const { id } = req.params;
        console.log("delete a post request has arrived");
        const deletepost = await pool.query(
            "DELETE FROM posttable WHERE id = $1 RETURNING*", [id]
        );
        res.json(deletepost);
    } catch (err) {
        console.error(err.message);
    }
});

app.delete('/api/posts', authenticateUser, async (req, res) => {
    try {
        console.log("delete ALL posts request has arrived");
        
        const deleteResult = await pool.query(
            "DELETE FROM posttable"
        );
        
        res.status(200).json({
            message: `Successfully deleted all posts. Total deleted: ${deleteResult.rowCount}`,
            deletedCount: deleteResult.rowCount
        });
        
    } catch (err) {
        console.error("Error deleting all posts:", err.message);
        res.status(500).json({ message: "Internal server error during deletion." });
    }
});

app.listen(port, () => {
    console.log("Server is listening to port " + port)
});