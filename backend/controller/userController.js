const bcrypt = require("bcrypt");
const User = require("../models/userModel");

exports.signup = (req, res, next) => {
  console.log(req.body);
  //ici code gestion inscription
  //pour encoder mot de passe 'bcrypt.hash'
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const newUser = new User({
        email: req.body.email,
        password: hash,
      });
      //sauvegarde en base de donnée
      newUser
        .save()
        .then(() =>
          res.status(200).json({
            message: "utilisateur créé",
          })
        )
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};
