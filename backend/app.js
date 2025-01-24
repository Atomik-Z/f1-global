const express = require('express');

const app = express();
app.use(express.json());
const path = require('path');
const fs = require('fs');

const getRandomElements = (array, count) => {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

app.use((req, res, next) => {
  console.log('Requête reçue !');
  next();
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.get('/api/questions', (req, res) => {
  res.sendFile(path.join(__dirname, 'questions.json'));
});

app.get('/api/questions/:idQuestion', (req, res) => {
  const idQuestion = req.params.idQuestion;

    // Lire le fichier JSON
    fs.readFile(path.join(__dirname, 'questions.json'), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading data');
        }

        // Parser le contenu du fichier JSON
        const jsonData = JSON.parse(data);
        const questions = jsonData.questions;

        // Filtrer les réponses par idQuestion
        const filteredReponses = questions.filter(reponse => reponse.idQuestion === idQuestion);

        // Vérifier si des réponses ont été trouvées
        if (filteredReponses.length > 0) {
            res.json(filteredReponses);
        } else {
            res.status(404).send('No response found with the given idQuestion');
        }
    });
});

app.get('/api/random/questions', (req, res) => {
  // Lire le fichier JSON
  fs.readFile(path.join(__dirname, 'questions.json'), 'utf8', (err, data) => {
      if (err) {
          console.error(err);
          return res.status(500).send('Error reading data');
      }

      // Parser le contenu du fichier JSON
      const jsonData = JSON.parse(data);
      const questions = jsonData.questions;

      // Vérifier si le nombre d'éléments est suffisant
      if (questions.length < 3) {
          return res.status(400).send('Not enough data to provide 3 random responses');
      }

      // Obtenir trois éléments aléatoires
      const randomQuestions = getRandomElements(questions, 3);
      res.json(randomQuestions);
  });
});

app.get('/api/reponses', (req, res) => {
  res.sendFile(path.join(__dirname, 'reponses.json'));
});

app.get('/api/reponses/:idQuestion', (req, res) => {
  const idQuestion = req.params.idQuestion;

    // Lire le fichier JSON
    fs.readFile(path.join(__dirname, 'reponses.json'), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading data');
        }

        // Parser le contenu du fichier JSON
        const jsonData = JSON.parse(data);
        const reponses = jsonData.reponses;

        // Filtrer les réponses par idQuestion
        const filteredReponses = reponses.filter(reponse => reponse.idQuestion === idQuestion);

        // Vérifier si des réponses ont été trouvées
        if (filteredReponses.length > 0) {
            res.json(filteredReponses);
        } else {
            res.status(404).send('No response found with the given idQuestion');
        }
    });
});

app.use((req, res, next) => {
  res.json({ message: 'Votre requête a bien été reçue !' });
  next();
});

app.use((req, res, next) => {
  console.log('Réponse envoyée avec succès !');
});

module.exports = app;