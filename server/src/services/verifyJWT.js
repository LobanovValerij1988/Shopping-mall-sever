const jwt = require('jsonwebtoken');

const verifyJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if(!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({
          error: 'not Authorized',
      });
  }
  const token = authHeader.split(' ')[1];
  jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        async (err, decodedToken) => {
            if(err) {
                return res.status(401).json({
                    error: "expired",
                });
            }
            req.nickName = decodedToken.UserInfo.nickName;
            req.roles = decodedToken.UserInfo.roles;
            next();
        }
    );
}

module.exports = verifyJWT;