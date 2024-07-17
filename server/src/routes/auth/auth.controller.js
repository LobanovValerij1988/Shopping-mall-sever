const bcrypt = require('bcrypt');
require("dotenv").config();
const jwt = require('jsonwebtoken');
const { getUserBy} = require("../../models/users.model");
const {userAuth, createAccessToken} = require("../../helpers/jwtHelpers");

// @desc Login
// @route POST /auth
// @access Public
async function login(req, res) {
  const { nickName, password } = req.body;
  if(!nickName || !password){
      return res.status(400).send({
          error: 'All fields are required'
      })
  }
  const foundUser = await getUserBy({nickName});

  if(!foundUser || !foundUser.activeStatus){
      return res.status(401).send({error: 'Unauthorized'});
  }
  const  isPaswordsMatch = await bcrypt.compare(password, foundUser.password);
  if(!isPaswordsMatch){
      return res.status(401).send({error: 'Unauthorized'})
  }
  const accessToken = await userAuth(res, foundUser);
  res.status(200).json({accessToken})
}

// @desc Refresh
// @route Get /auth/refresh
// @access Public
async function refresh(req, res) {
  const cookies = req.cookies;
  if(!cookies?.jwt){
      return res.status(401).json({error: 'Unauthorized'});
  }

  const refreshToken = cookies.jwt;


  jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decodedToken) => {
          if(err) {
              return res.status(401).send({error: 'Forbidden'});
          }
          const foundUser = await getUserBy({nickName: decodedToken.nickName});

          if(!foundUser){
              return res.status(401).json({error: 'Unauthorized'});
          }

          const accessToken = await createAccessToken(foundUser)

          res.json({accessToken});
      }
  );

}

// @desc Logout
// @route Post  /auth/logout
// @access Public
async function logout(req, res) {
    const cookies = req.cookies;
    if(!cookies?.jwt){
        return res.sendStatus(204);
    }

    res.clearCookie('jwt',
            {
                httpOnly: true,
                secure: true,
                sameSite: 'None'
            }
        );

    res.json({message: "Cookie cleared"});
}

module.exports = {
    login,
    refresh,
    logout
}