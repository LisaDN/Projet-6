const express = require('express')

const app = express()

const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://LisaDve:LuOeHgvND0mJ9KAB@cluster0.7tumcig.mongodb.net/test',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('connexion à MongoDB réussie'))
    .catch(() => console.log('connexion à MongoDB échouée'))


app.use((req, res, next) => {
    console.log('requête reçue!')
    next()
})

app.use((req, res, next) => {
    res.status(201)
    next()
})

app.use((req, res, next) => {
    res.json({ message: 'Votre requête a bien été reçue' })
    next()
})

app.use((req, res, next) => {
    console.log('Réponse envoyée avec succès')
})

module.exports = app