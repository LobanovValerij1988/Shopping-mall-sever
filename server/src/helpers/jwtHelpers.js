const jwt = require("jsonwebtoken");

async function  userAuth(res, user) {
    const accessToken = await createAccessToken(user)

    const refreshToken = jwt.sign(
        { "nickName": user.nickName },
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: "5d"}
    )
    res.cookie('jwt',refreshToken,{
        httpOnly: true,
        // secure: true,
        // sameSite: 'None',
        maxAge: 24*60*60*1000
    });
    return accessToken
}

function createAccessToken(user) {
    return  jwt.sign(
        {
            "UserInfo": {
                "nickName": user.nickName,
                "roles": user.roles
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "1d"}
    );
}




module.exports = {
    userAuth,
    createAccessToken
}