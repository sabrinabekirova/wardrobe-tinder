import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import db from '../db.js';

export function configurePassport() {
  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3000/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const query_result = await db.query('SELECT * FROM users WHERE google_id = ?', [profile.id]);
        const users = query_result[0];
        
        if (users.length > 0) {
          return done(null, users[0]);
        } else {
          const first_name = profile.displayName.split(' ')[0];
          const insert_result = await db.query(
            'INSERT INTO users (google_id, email, name) VALUES (?, ?, ?)',
            [profile.id, profile.emails[0].value, first_name]
          );
          const result = insert_result[0];
          
          const newUser = {
            id: result.insertId,
            google_id: profile.id,
            email: profile.emails[0].value,
            name: profile.displayName
          };
          
          return done(null, newUser);
        }
      } catch (error) {
        return done(error, null);
      }
    }
  ));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const query_result = await db.query('SELECT * FROM users WHERE id = ?', [id]);
      const users = query_result[0];
      if (users && users.length > 0) {
        done(null, users[0]);
      } else {
        done(null, false);
      }
    } catch (error) {
      done(error, null);
    }
  });
}

export default passport;
