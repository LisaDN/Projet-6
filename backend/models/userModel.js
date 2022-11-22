const mongoose = require("mongoose");
//améliore les messages d'erreur lors de l'enregistrement de données uniques .
const uniqueValidator = require("mongoose-unique-validator");

//création schéma données utilisateurs pour base de données MongoDB
const userSchema = mongoose.Schema({
  // unique:true : pour empêcher qu'un utilisateur s'inscrive plusieurs fois avec le même email
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
//mise en place du plugin mongoose unique validator sur userSchema
userSchema.plugin(uniqueValidator);

//export Schema sous forme de model
module.exports = mongoose.model("user", userSchema);
