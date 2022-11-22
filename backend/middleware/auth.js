const jwt = require("jsonwebtoken");

//middleware vérification que l'utilisateur est bien connecté
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // récupération du token dans le header authorization .split récupère tout après l'espace dans le header
    const decodedToken = jwt.verify(token, `${process.env.TOKEN}`); //verify() méthode pour décoder et vérifier la validité du token
    const userId = decodedToken.userId; //récupération du userId et ajout à request pour exploiter les différentes routes
    req.auth = {
      userId: userId,
    };
    next(); //tout fonctionne utilisateur authentifié
  } catch (error) {
    res.status(401).json({ error });
  }
};
