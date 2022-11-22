//multer package pour la gestion des fichiers entrants
const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

// diskStorage() : configuration du chemin et nom du fichier entrants
const storage = multer.diskStorage({
  //destination: indique a multer d'enregistrer les fichiers dans le dossier images
  destination: (req, file, callback) => {
    callback(null, "images"); //null pour indiquer qu'il n'y a pas d'erreur
  },
  //filename: explique a multer quel nom de fichier utiliser
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_"); //pour éviter erreur côté serveur .split et .join remplace espace par _
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension); // appel callback, création nom du ficher unique
  },
});

//exportation multer, .single("image") : gestion uniquement des téléchargements d'images
module.exports = multer({ storage: storage }).single("image");
