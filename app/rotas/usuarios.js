module.exports = function (app) {
    app.get('/logout', function (req, res) {
        app.app.controllers.admin.Logout(app, req, res)
    })
    app.get('/', function (req, res) {
        app.app.controllers.usuarios.login(app, req, res)
    })
    app.post('/usuarios/login', function (req, res) {
        app.app.controllers.usuarios.validar(app, req, res)
    })
    app.get('/usuarios/cadastro', function (req, res) {
        app.app.controllers.usuarios.renderCadastro(app, req, res)
    })
    app.post('/usuarios/cadastrar', function (req, res) {
        app.app.controllers.usuarios.cadastrar(app, req, res)
    })
    app.get('/editarUsuario', function (req, res) {
        app.app.controllers.usuarios.editarUsuario(app, req, res)
    })
    app.post('/usuarios/salvarEditarUsuario', function (req, res) {
        app.app.controllers.usuarios.salvar(app, req, res)
    })
    app.get('/usuario/listaProdutos', function (req, res) {
        app.app.controllers.usuarios.renderLista(app, req, res)
    })
    app.get('/logout', function (req, res) {
        app.app.controllers.usuarios.logout(app, req, res)
    })
    app.post('/addCarrinho', function (req, res) {
        app.app.controllers.usuarios.addCarrinho(app, req, res)
    })
    app.get('/carrinho', function (req, res) {
        app.app.controllers.usuarios.RenderCarrinho(app, req, res)
    })
    app.post('/editarCarrinho', function (req, res) {
        app.app.controllers.usuarios.editarCarrinho(app, req, res)
    })
    app.post('/salvarEditCarrinho', function (req, res) {
        app.app.controllers.usuarios.salvarEditCarrinho(app, req, res)
    })
    app.post('/excluirCarrinho', function (req, res) {
        app.app.controllers.usuarios.excluirCarrinho(app, req, res)
    })
    app.post('/finalizarPedido', function (req, res) {
        app.app.controllers.usuarios.renderFinalizarPedido(app, req, res)
    })
    app.post('/validarPedido', function (req, res) {
        app.app.controllers.usuarios.validarPedido(app, req, res)
    })
    app.get('/editarSenha', function (req, res) {
        app.app.controllers.usuarios.renderEditarSenha(app, req, res)
    })
    app.post('/salvarEditarSenha', function (req, res) {
        app.app.controllers.usuarios.salvarEditarSenha(app, req, res)
    })
}
