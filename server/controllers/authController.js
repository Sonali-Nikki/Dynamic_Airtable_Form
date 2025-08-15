// server/controllers/authController.js
const jwt = require('jsonwebtoken');
const axios = require('axios');
const qs = require('querystring');
const User = require('../models/User.js');

const {
  AIRTABLE_CLIENT_ID,
  AIRTABLE_CLIENT_SECRET,
  AIRTABLE_REDIRECT_URI,
  CLIENT_URL,
  JWT_SECRET
} = process.env;

const AIRTABLE_AUTH_URL = 'https://airtable.com/oauth2/v1/authorize';
const AIRTABLE_TOKEN_URL = 'https://airtable.com/oauth2/v1/token';
const AIRTABLE_WHOAMI_URL = 'https://api.airtable.com/v0/meta/whoami';
const AIRTABLE_SCOPES = [
  'data.records:read',
  'data.records:write',
  'schema.bases:read'
].join(' ');

// Generate JWT for our app
const signJwt = (user) => {
  return jwt.sign(
    {
      sub: user._id,
      email: user.email,
      name: user.name
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// Step 1: Redirect to Airtable OAuth
exports.loginWithAirtable = (req, res) => {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: AIRTABLE_CLIENT_ID,
    redirect_uri: AIRTABLE_REDIRECT_URI,
    scope: AIRTABLE_SCOPES
  });
  res.redirect(`${AIRTABLE_AUTH_URL}?${params.toString()}`);
};

// Step 2: OAuth callback
exports.airtableCallback = async (req, res) => {
  const { code, error } = req.query;
  if (error) return res.redirect(`${CLIENT_URL}/auth?error=${error}`);
  if (!code) return res.redirect(`${CLIENT_URL}/auth?error=missing_code`);

  try {
    // Exchange code for token
    const tokenData = await axios.post(
      AIRTABLE_TOKEN_URL,
      qs.stringify({
        grant_type: 'authorization_code',
        client_id: AIRTABLE_CLIENT_ID,
        client_secret: AIRTABLE_CLIENT_SECRET,
        redirect_uri: AIRTABLE_REDIRECT_URI,
        code
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    const { access_token, refresh_token, expires_in, scope } = tokenData.data;

    // Fetch Airtable profile
    const profile = await axios.get(AIRTABLE_WHOAMI_URL, {
      headers: { Authorization: `Bearer ${access_token}` }
    });

    // Save/update user
    const user = await User.findOneAndUpdate(
      { airtableUserId: profile.data.user.id },
      {
        email: profile.data.user.email,
        name: profile.data.user.name,
        avatar: profile.data.user.avatar,
        accessToken: access_token,
        refreshToken: refresh_token,
        tokenExpiresAt: new Date(Date.now() + expires_in * 1000),
        scope
      },
      { new: true, upsert: true }
    );

    // Sign JWT for our app
    const jwtToken = signJwt(user);
    res.redirect(`${CLIENT_URL}/auth/success#token=${jwtToken}`);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.redirect(`${CLIENT_URL}/auth?error=oauth_failed`);
  }
};

// Get current user profile
exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user.sub).select('-accessToken -refreshToken');
  res.json({ user });
};
