const express = require ('express');
const passport = require('passport')
const router = express.Router();

router.all('*', function (req, res, next) {
    passport.authenticate("jwt", { session: false }, function (err, user, info) {
        console.log("router.all err: ", err?.message)
        console.log("router.all user: ", user)
        console.log("router.all info: ", info?.message)

        if (info) {
            console.log(
                "I happened because the token was either invalid or not present"
            )

            return res.send({status: 'failed', message: 'token not present'})
        }

        if (err) {
            console.log(
                "I happend because you logged in with the user 'tokenerror'"
            )

            return res.send(err.message)
        }

        if (!user) {
            return res.send({status: 'failed', message: "user not present"})
        }

        if (user) {
            console.log(user)
            req.isAuthenticated = true;
            req.user = user;
            return next()
        }
    })
})

router.get("/profile", (req, res, next) => {
    console.log(req.user)
})

module.exports = router