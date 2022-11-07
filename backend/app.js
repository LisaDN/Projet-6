//Mise en place appli Express
const express = require("express");

const app = express();

const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute");

mongoose
  .connect(
    "mongodb+srv://LisaDve:LuOeHgvND0mJ9KAB@cluster0.7tumcig.mongodb.net/test",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("connexion à MongoDB réussie"))
  .catch(() => console.log("connexion à MongoDB échouée"));

//middleware (serie de fonction) reçoit objets :request et response pour lire analyser et methode next pour passer à l'exécution du middleware suivant
//1er element middleware enregistre requête reçue et passe à l'exécution
// app.use((req, res, next) => {
//     console.log('requête reçue!')
//     next()
// })

//2eme element middleware ajoute code etat 201 à la réponse et passe à l'exécution
// app.use((req, res, next) => {
//     res.status(201)
//     next()
// })

// //3eme element middleware envoie la réponse JSON et passe à l'exécution
// app.use((req, res, next) => {
//     res.json({ message: 'Votre requête a bien été reçue' })
//     next()
// })

// //4eme element middleware enregistre réponse succès dans console
// app.use((req, res, next) => {
//     console.log('Réponse envoyée avec succès')
// })
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.setHeader("Cross-Origin-Resource-Policy", "same-site");
  next();
});

app.use(express.json());

//initialisation route utilisateur
app.use("/api/auth", userRoute);
module.exports = app;
