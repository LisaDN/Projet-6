const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const jwt = require("jsonwebtoken");

exports.signup = (req, res, next) => {
  console.log(req.body);
  //ici code gestion inscription
  //pour encoder mot de passe : 'bcrypt.hash'
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
            message: "Utilisateur créé",
          })
        )
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

//vérification si l'utilisateur existe dans notre base de donnée

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        res.status(401).json({ message: "Login ou mot de passe incorrecte" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            res
              .status(401)
              .json({ message: "Login ou mot de passe incorrecte" });
          }

          //jwt.sign : chiffrer un nouveau token, ce token contient userID, la chaîne secrète pour crypter le token, la durée de validité du token
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, `${process.env.TOKEN}`, {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
