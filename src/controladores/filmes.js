let filmes = require('../bancoDeDados.json')

function listarFilmes (req, res){
    return res.status(200).json(filmes);
}

function filmeID (req, res){
    const { id } = req.params

    const filme = filmes.find(function (filme) {
        return filme.id === id;
    });

    if (!filme){
        return res.status(404).json( {mensagem: 'Filme com esse ID não existe'} );
    }

    return res.status(200).json(filme);
}

function excluirFilme (req, res){
    const { id } = req.params;

    const filme = filmes.find(function (filme) {
        return filme.id === id;
    });

    if (!filme){
        return res.status(404).json( {mensagem: 'Filme com esse ID não existe'} );
    }

    filmes = filmes.filter(function (filme) {
        return filme.id !== id;
    });

    for (let i of filmes){
        i.id = (filmes.indexOf(i) + 1).toString()
    }

    return res.status(200).json({ mensagem: 'Filme excluída com sucesso' });
}

function adicionarFilme(req, res){
    const { nome, foto, descricao, elenco } = req.body;

    if(!nome){
        return res.status(400).json('Nome não informado')
    }

    if(!foto){
        return res.status(400).json('Foto não informado')
    }

    if(!descricao){
        return res.status(400).json('Descrição não informado')
    }

    if(!elenco){
        return res.status(400).json('Elenco não informado')
    }

    const filme = {
            id: (filmes.length+1).toString(),
            nome: nome,
            foto: foto,
            descricao: descricao,
            elenco: elenco 
    }

    filmes.push(filme);

    return res.status(201).json(filme);
}

function modificarFilme(req, res){
    const { id } = req.params;
    const { nome, foto, descricao, elenco } = req.body;

    const filme = filmes.find(function (filme) {
        return filme.id === id;
    });

    if (!filme){
        return res.status(404).json({ mensagem: "Filme não Localizada." });
    }

    if (nome) {
        filme.nome = nome;
    }

    if (foto) {
        filme.foto = foto;
    }

    if (descricao) {
        filme.descricao = descricao;
    }

    if (elenco) {
        filme.elenco = elenco;
    }

    return res.status(201).json(filme);
}

module.exports = {
    listarFilmes,
    filmeID, 
    excluirFilme,
    adicionarFilme,
    modificarFilme
}