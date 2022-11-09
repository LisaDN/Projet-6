const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

//création schéma données utilisateurs pour base de données MongoDB
const userSchema = mongoose.Schema({
  //, unique:true : pour empêcher q'un utilisateur s'inscrive plusieurs fois avec le même email
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
userSchema.plugin(uniqueValidator);

//export Schema sous forme de model
module.exports = mongoose.model("user", userSchema);
