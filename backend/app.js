//Mise en place appli Express
const express = require("express");
const app = express();

const mongoose = require("mongoose");
//importation routeur
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
