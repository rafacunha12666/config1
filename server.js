const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();

// 🔹 Novos endpoints:

// Rota para retornar todos os prompts (já existente)
app.get('/prompts', (req, res) => {
  fs.readFile('./prompts.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Erro ao ler prompts.');
    }
    res.send(JSON.parse(data));
  });
});

// Rota para retornar apenas IA1
app.get('/prompts/IA1', (req, res) => {
  fs.readFile('./prompts.json', 'utf8', (err, data) => {
    if (err) return res.status(500).send('Erro ao ler IA1.');
    const json = JSON.parse(data);
    res.send(json.IA1 || 'IA1 não encontrado.');
  });
});

// Rota para retornar apenas IA2
app.get('/prompts/IA2', (req, res) => {
  fs.readFile('./prompts.json', 'utf8', (err, data) => {
    if (err) return res.status(500).send('Erro ao ler IA2.');
    const json = JSON.parse(data);
    res.send(json.IA2 || 'IA2 não encontrado.');
  });
});

// Rota para retornar apenas IA3
app.get('/prompts/IA3', (req, res) => {
  fs.readFile('./prompts.json', 'utf8', (err, data) => {
    if (err) return res.status(500).send('Erro ao ler IA3.');
    const json = JSON.parse(data);
    res.send(json.IA3 || 'IA3 não encontrado.');
  });
});

// 🔹 Resto da configuração existente
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const promptsPath = path.join(__dirname, 'prompts.json');

app.get('/prompts', (req, res) => {
    fs.readFile(promptsPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Erro ao ler prompts.');
        }
        res.json(JSON.parse(data));
    });
});

app.post('/prompts', (req, res) => {
    const prompts = req.body;
    fs.writeFile(promptsPath, JSON.stringify(prompts, null, 2), (err) => {
        if (err) {
            return res.status(500).send('Erro ao salvar prompts.');
        }
        res.send('Prompts salvos com sucesso!');
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
