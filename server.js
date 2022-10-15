require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        app.emit('pronto');
    }).catch(e => console.log(e));

//Biblioteca para trabalhar com sessão
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

const routes = require('./routes');
const path = require('path');
const helmet = require('helmet');
const csrf = require('csurf');
const {middlewareGlobal, checkCsrfError, csrfMiddleware} = require('./src/middlewares/middleware');

app.use(helmet());
app.use(express.urlencoded({extended: true}));

//Setando a pasta de arquivos estáticos CSS, IMG
app.use(express.static(path.resolve(__dirname, 'public')));

//Configurando as sessões
const sessionOptions = session({
    secret: 'sP-p;VpKx5n-h`iw+a+GChd=R%L2BlpN4U/$P~IqP{:KyfT%)LlU5C;/U`~BMoxY',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    resaveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
});
app.use(sessionOptions);
app.use(flash());

//Setando a engine e mostrando o caminho da pasta
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(csrf());
//Setando o middleware global
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(routes);

app.on('pronto', () => {
    app.listen(3000, () => {
        console.log('Pronto, tudo está no seu devido lugar!')
        console.log('Acessar http://localhost:3000');
        console.log('Servidor executando na porta 3000');
    });
} );