const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
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