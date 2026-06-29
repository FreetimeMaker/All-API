const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const userModel = require('../models/userModel'); // Unser In-Memory User Model

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
},
(accessToken, refreshToken, profile, done) => {
    // Hier wird der User gefunden oder erstellt
    const user = userModel.findOrCreate({
        id: profile.id,
        displayName: profile.displayName,
        emails: profile.emails
    });
    done(null, user);
}));

// User in der Session speichern
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// User aus der Session laden
passport.deserializeUser((id, done) => {
    const user = userModel.findById(id);
    done(null, user);
});
