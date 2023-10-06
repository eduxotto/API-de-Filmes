const express = require('express');
const filmes = require('./controladores/filmes')

const rotas = express();

rotas.get('/filmes', filmes.listarFilmes);
rotas.get('/filmes/:id', filmes.filmeID);
rotas.delete('/filmes/:id', filmes.excluirFilme);
rotas.post('/filmes', filmes.adicionarFilme);
rotas.put('/filmes/:id', filmes.modificarFilme)

module.exports = rotas