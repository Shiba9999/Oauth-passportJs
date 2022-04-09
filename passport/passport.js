const passport = require("passport");
const User = require("../model/user");
const GoogleStrategy = require("passport-google-oauth20").Strategy;


passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

//ask token
passport.use(
  new GoogleStrategy(
    {
      clientID:
        "647550763586-3m6cicf6hmav8m8qovachcrsq1m5gr3h.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:4000/auth/google/callback",
    },
    //callbabck for givern token
    function (accessToken, refreshToken, profile, next) {
      User.findOne({
        email: profile._json.email,
      }).then((user) => {
        if (user) {
          console.log("user already exits in DB", user);
          //this next is of passport
          next(null, user);
        } else {
          User.create({
            name: profile.displayName,
            email: profile._json.email,
            googleId: profile.id,
          })
            .then((user) => {
              console.log("user created", user);
              next(null, user);
            })
            .catch((err) => console.log(err));
        }
      });
    }
  )
);

// {"web":{"client_id":"647550763586-3m6cicf6hmav8m8qovachcrsq1m5gr3h.apps.googleusercontent.com","project_id":"mybackendoauth","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"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","redirect_uris":["http://localhost:4000/auth/auth/google/callback"],"javascript_origins":["http://localhost:4000"]}}
