const jwt = require("jsonwebtoken");

async function  createAccessToken(res, user) {
    const accessToken = await jwt.sign(
        {
            "UserInfo": {
                "nickName": user.nickName,
                "roles": user.roles
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "30s"}
    );

    const refreshToken = jwt.sign(
        { "nickName": user.nickName },
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: "60s"}
    )
    res.cookie('jwt',refreshToken,{
        httpOnly: true,
        // secure: true,
        // sameSite: 'None',
        maxAge: 24*60*60*1000
    });
    return accessToken
}

module.exports = {
    createAccessToken
}