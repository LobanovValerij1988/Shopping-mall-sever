const bcrypt = require('bcrypt');
require("dotenv").config();
const jwt = require('jsonwebtoken');
const { getUserBy} = require("../../models/users.model");

// @desc Login
// @route POST /auth
// @access Public
async function login(req, res) {
  const { nickName, password } = req.body;
  if(!nickName || !password){
      return res.status(400).send({
          message: 'All fields are required'
      })
  }
  const foundUser = await getUserBy({nickName});

  if(!foundUser || !foundUser.activeStatus){
      return res.status(401).send({message: 'Unauthorized'});
  }
  const  isPaswordsMatch = await bcrypt.compare(password, foundUser.password);
  if(!isPaswordsMatch){
      return res.status(401).send({message: 'Unauthorized'})
  }
  const accessToken = await jwt.sign(
      {
          "UserInfo": {
              "nickName": foundUser.nickName,
              "roles": foundUser.roles
          }
      },
      process.env.ACCESS_TOKEN_SECRET,
      {expiresIn: "30s"}
  );

  const refreshToken = jwt.sign(
      { "nickName": foundUser.nickName },
      process.env.REFRESH_TOKEN_SECRET,
      {expiresIn: "60s"}
  )
  res.cookie('jwt',refreshToken,{
      httpOnly: true,
      // secure: true,
      // sameSite: 'None',
      maxAge: 24*60*60*1000
  });
  res.json({accessToken})
}

// @desc Refresh
// @route Get /auth/refresh
// @access Public
async function refresh(req, res) {
  const cookies = req.cookies;
  if(!cookies?.jwt){
      return res.status(401).json({message: 'Unauthorized'});
  }

  const refreshToken = cookies.jwt;

  jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decodedToken) => {
          if(err) {
              return res.status(403).send({message: 'Forbidden'});
          }
          const foundUser = await getUserBy({nickName: decodedToken.nickName});

          if(!foundUser){
              return res.status(401).json({message: 'Unauthorized'});
          }

          const accessToken = await jwt.sign(
              {
                  "UserInfo": {
                      "nickName": foundUser.nickName,
                      "roles": foundUser.roles
                  }
              },
              process.env.ACCESS_TOKEN_SECRET,
              {expiresIn: "30s"}
          );

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