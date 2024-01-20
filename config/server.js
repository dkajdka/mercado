module.exports = function () {
    const express = require('express')
    const consign = require('consign')
    const bodyparser = require('body-parser')
    const expressValidator = require('express-validator')
    const expressSession = require('express-session')
    const mime = require('mime')
    const app = express();

    app.set('view engine', 'ejs')
    app.set('views','./app/views')

    app.use(bodyparser.urlencoded({extended: true}))
    app.use(expressValidator())
    
    // Serve static files with correct MIME type
    app.use('/public', express.static('app/public', {
        setHeaders: (res, path) => {
            if (path.startsWith('/public/css')) {
                res.setHeader('Content-Type', mime.getType(path));
            }
        }
    }));

    app.use(expressSession({
        secret: 'qualquercoisa',
        resave: false,
        saveUninitialized: false
    }))

    consign()
    .include('app/rotas')
    .then('config/conexao.js')
    .then('app/models')
    .then('app/controllers')
    .into(app);

    return app;
}
