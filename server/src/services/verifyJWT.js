const jwt = require('jsonwebtoken');

const verifyJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if(!authHeader?.startsWith('Bearer ')) {
      return res.status(401).send('Not authorized');
  }
  const token = authHeader.split(' ')[1];
  jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        async (err, decodedToken) => {
            if(err) {
                console.log(err);
                return res.status(403).send({message: 'Forbidden'});
            }
            req.nickName = decodedToken.UserInfo.nickName;
            req.roles = decodedToken.UserInfo.roles;
            next();
        }
    );
}

module.exports = verifyJWT;