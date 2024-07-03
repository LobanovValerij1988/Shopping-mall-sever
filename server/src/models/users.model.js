const users = require("./users.mongo");

async function getUser() {
   return  users.findOne().exec();
}

async  function getUserBy (queryParam) {
   return users.findOne(queryParam).lean().exec();
}

async  function getUserById (id) {
   return users.findById(id).exec();
}

async function getAllUsers (){
   return users.find().select('-password').lean();
}

async function addNewUser (newUser){
   return users.create(newUser);
}

async function updateUser(updatedUser) {
    const savedUser =await updatedUser.save();
    return  getUserById(savedUser._id);
}

function deleteUser(userID) {
   return  users.findByIdAndDelete(userID);
}

module.exports = {
   getUser,
   getAllUsers,
   addNewUser,
   getUserBy,
   getUserById,
   updateUser,
   deleteUser
};
