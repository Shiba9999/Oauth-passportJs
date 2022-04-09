const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/login", (req, res) => {
  res.render("login");
});
router.get("/logout", (req, res) => {
    //passport method
    req.logout();
    
    res.redirect("/auth/login");
    res.send("logged out");
  });

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
  (req, res) => {
    res.send("login google");
  }
);
router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  res.json({
    message: "logged in",
    user: req.user,
  });
});

module.exports = router;
