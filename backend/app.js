//mise en place dotenv
const dotenv = require("dotenv").config("../.env");

//mise en place helmet
const helmet = require("helmet");

//Mise en place appli Express
const express = require("express");
const app = express();

const path = require("path");

const mongoose = require("mongoose");
//importation routeur
const userRoute = require("./routes/userRoute");
const sauceRoute = require("./routes/sauceRoute");

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER_NAME}.mongodb.net/${process.env.MONGODB_DATABASE_NAME}`,
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

app.use("/images", express.static(path.join(__dirname, "images")));
//initialisation routes
app.use("/api/auth", userRoute);
app.use("/api/sauces", sauceRoute);
app.use(helmet());

module.exports = app;
