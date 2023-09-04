const express = require ('express');
const passport = require('passport')
const router = express.Router();

const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const jwt = require('jsonwebtoken')


passport.use(
    new JWTstrategy(
        {
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
        },
        async (token, done) => {
            try {
                console.log('we here')
              return done(null, token.user);
            } catch (error) {
              return done({message: 'didnt work bro'})
            }
        }
    )
)

// router.all('*', function (req, res, next) {
//     jwt.verify(req.headers.authorization, process.env.JWT_SECRET, (err, decode) => {
//         if (err) {
//             console.log('failed')
//             res.json({auth: false, message: "failed auth, token doesnt match"})
//         } else {
//             console.log('token authenticated')
//             next();
//         }
//     })
// })

// router.all('*', function (req, res, next) {
//     passport.authenticate("jwt", { session: true }, function (err, user, info) {
//         console.log("router.all err: ", err?.message)
//         console.log("router.all user: ", user)
//         console.log("router.all info: ", info?.message)

//         if (info) {
//             console.log(
//                 "I happened because the token was either invalid or not present"
//             )

//             return res.send({status: 'failed', message: 'token not present'})
//         }

//         if (err) {
//             console.log(
//                 "I happend because you logged in with the user 'tokenerror'"
//             )

//             return res.send(err.message)
//         }

//         if (!user) {
//             return res.send({status: 'failed', message: "user not present"})
//         }

//         if (user) {
//             console.log(user)
//             req.isAuthenticated = true;
//             req.user = user;
//             return next()
//         }
//     })
// })

router.post("/testing", (req, res, next) => {
    console.log('it worked')
})

module.exports = router