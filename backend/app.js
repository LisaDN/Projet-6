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
    "mongodb+srv://LisaDve:LuOeHgvND0mJ9KAB@cluster0.7tumcig.mongodb.net/test",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("connexion à MongoDB réussie"))
  .catch(() => console.log("connexion à MongoDB échouée"));

app.use("/api/sauces", (req, res, next) => {
  const stuff = [
    {
      _id: "oeihfzeoi",
      name: "Mon premier objet",
      description: "Les infos de mon premier objet",
      imageUrl:
        "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
      userId: "qsomihvqios",
    },
    {
      _id: "oeihfzeomoihi",
      title: "Mon deuxième objet",
      description: "Les infos de mon deuxième objet",
      imageUrl:
        "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
      price: 2900,
      userId: "qsomihvqios",
    },
  ];
  res.status(200).json(stuff);
});

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

//initialisation routes
app.use("/api/auth", userRoute);
app.use("/api/sauces", sauceRoute);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
