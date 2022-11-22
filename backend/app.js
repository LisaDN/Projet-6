//mise en place dotenv
const dotenv = require("dotenv").config("../.env");

//mise en place helmet
const helmet = require("helmet");

//mise en place xss-clean
const xss = require("xss-clean");

//mise en place mongo sanitize
const mongoSanitize = require("express-mongo-sanitize");

// mise en place rate limit
const rateLimit = require("express-mongo-sanitize");
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, //Limiter chaque IP à 100 requêtes par fenêtre (ici, par 15 minutes)
  standardHeaders: true, // Informations sur la limite de taux de retour dans les en-têtes « RateLimit-*»
  legacyHeaders: false, // Désactiver les en-têtes X-RateLimit-*
});

//Mise en place appli Express
const express = require("express");
const app = express();

const path = require("path");

//importation mongoose
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

//middleware (serie de fonction) reçoit objets :request et response pour lire analyser et methode, next: pour passer à l'exécution du middleware suivant
//ajout middleware pour permettre requêtes cross-origin et empêcher erreur cors, rajout headers a responses pour le contrôle d'accès
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
//initialisation routes de l'API
app.use("/api/auth", userRoute);
app.use("/api/sauces", sauceRoute);
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(limiter);

//exportation appli express
module.exports = app;
