exports.paginaInicial = (req, res) => {
    res.send('Obrigado por entrar em contato');
};

exports.trataPost = (req, res) => {
    res.send('Olá ' + req.body.nome + ' ' + req.body.sobrenome);
};