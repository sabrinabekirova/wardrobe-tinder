import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import db from '../db.js';

export function configurePassport() {
  // console.log('🔍 Configuring OAuth with credentials:'); remove these
  // console.log('Client ID:', process.env.GOOGLE_CLIENT_ID);
  // console.log('Client Secret:', process.env.GOOGLE_CLIENT_SECRET ? '***' + process.env.GOOGLE_CLIENT_SECRET.slice(-4) : 'NOT SET');
  // console.log('Callback URL:', process.env.GOOGLE_CALLBACK_URL);

  // if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  //   console.error('❌ ERROR: GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET must be set in .env file');
  //   throw new Error('Missing required OAuth environment variables');
  // } delete these

  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3000/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user exists
        const [users] = await db.query('SELECT * FROM users WHERE google_id = ?', [profile.id]);
        
        if (users.length > 0) {
          // User exists, return user
          return done(null, users[0]);
        } else {
          // Create new user
          const first_name = profile.displayName.split(' ')[0];
          const [result] = await db.query(
            'INSERT INTO users (google_id, email, name) VALUES (?, ?, ?)',
            [profile.id, profile.emails[0].value, first_name]
          );
          
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

  // Serialize user for session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Deserialize user from session
  passport.deserializeUser(async (id, done) => {
    try {
      const [users] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
      done(null, users[0]);
    } catch (error) {
      done(error, null);
    }
  });
}

export default passport;
