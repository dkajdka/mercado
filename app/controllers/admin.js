module.exports.renderCadastroUsuario = function (app, req, res) {
    if (req.session.id_tipo_usuario = !2) {
        res.redirect('/')
        return
    }
    const conexao = app.config.conexao
    const modelAdmin = new app.app.models.modelAdmin(conexao)

    modelAdmin.getTipoUsuario(function (error, result) {
        res.render('admin/cadastroUsuario', { erros: {}, usuario: {}, tipos: result })
    })
}

module.exports.CadastrarUsuario = function (app, req, res) {
    const dados = req.body

    req.assert('nome', 'Voce deve preencher o campo nome').notEmpty()
    req.assert('email', 'Voce deve preencher o campo email').notEmpty()
    req.assert('senha', 'Voce deve preencher o campo senha').notEmpty()
    req.assert('senha', 'O campo senha deve ter no minimo 6 caracteres').len(6)

    let erros = []
    erros = req.validationErrors() ? req.validationErrors() : [];

    if (dados.senha != dados.confirmarSenha) {
        erros.push({ msg: 'as senhas não conferem' })
    }

    if (dados.id_tipo_usuario == 0) {
        erros.push({ msg: 'selecione uma funcao valida' })
    }

    if (erros.length == 0) {
        erros = false
    }



    const conexao = app.config.conexao
    const modelAdmin = new app.app.models.modelAdmin(conexao)
    if (erros) {
        modelAdmin.getTipoUsuario(function (error, result) {

            res.render('admin/cadastroUsuario', { erros: erros, usuario: {}, tipos: result })
            return;
        })
    }
    else {
        modelAdmin.cadastroUsuarios(dados, function (error, result) {

            res.redirect('/admin/menu')
        })
    }
}

module.exports.renderMenu = function (app, req, res) {
    if (req.session.id_tipo_usuario = !2) {
        res.redirect('/')
        return
    }

    res.render('admin/menu')
}

module.exports.renderUsuarios = function (app, req, res) {
    if (req.session.id_tipo_usuario = !2) {
        res.redirect('/')
        return
    }
    const conexao = app.config.conexao
    const modelAdmin = new app.app.models.modelAdmin(conexao)

    modelAdmin.selectUsuarios(function (error, result) {
        res.render('admin/listaUsuarios', { erros: {}, usuario: result })
    })
}

module.exports.editarUsuario = function (app, req, res) {
    if (req.session.id_tipo_usuario = !2) {
        res.redirect('/')
        return
    }
    const dados = req.body
    const conexao = app.config.conexao
    const modelAdmin = new app.app.models.modelAdmin(conexao)

    modelAdmin.getTipoUsuario(function (error, tipos_result) {
        modelAdmin.selectUsuario(dados.id, function (error, usuario_result) {
            
            res.render('admin/editarUsuarios', { erros: {}, usuario: usuario_result, tipos: tipos_result })
        })
    })
}

module.exports.salvarUsuario = function (app, req, res) {
    const dados = req.body
    const conexao = app.config.conexao
    const modelAdmin = new app.app.models.modelAdmin(conexao)

    modelAdmin.salvarUsuario(dados, function (error, result) {

        modelAdmin.selectUsuarios(function (error, result_select) {

            res.render('admin/listaUsuarios', { erros: {}, usuario: result_select })
        })
    })
}

module.exports.editarSenhaUsuario = function (app, req, res) {
    if (req.session.id_tipo_usuario = !2) {
        res.redirect('/')
        return
    }
    const dados = req.body
    const conexao = app.config.conexao
    const modelAdmin = new app.app.models.modelAdmin(conexao)
    modelAdmin.selectUsuario(dados.id, function (error, usuario_result) {
       
        res.render('admin/editarSenhaUsuario', { erros: {}, usuario: usuario_result })
    })
}

module.exports.salvarSenhaUsuario = function (app, req, res) {
    const dados = req.body
    req.assert('senha', 'Voce deve preencher o campo senha').notEmpty()
    req.assert('confirmarSenha', 'Voce deve preencher o campo confirmar senha').notEmpty()
    req.assert('senha', 'O campo senha deve ter no minimo 6 caracteres').len(6)

    let erros = req.validationErrors() ? req.validationErrors() : [];

    if (dados.senha != dados.confirmarSenha) {

        erros.push({ msg: 'as senhas não conferem' })
    }

    if (erros.length == 0) {
        erros = false
    }

    const conexao = app.config.conexao
    const modelAdmin = new app.app.models.modelAdmin(conexao)
    if (erros) {
        modelAdmin.selectUsuario(dados.id, function (error, usuario_result) {
            res.render('admin/editarSenhaUsuario', { erros: erros, usuario: usuario_result })
            return
        })
    }
    else {
        modelAdmin.salvarSenhaUsuario(dados, function (error, result) {
            modelAdmin.selectUsuarios(function (error, result_select) {
                res.render('admin/listaUsuarios', { erros: {}, usuario: result_select })
            })
        })
    }
}

module.exports.excluirUsuario = function (app, req, res) {
    const dados = req.body
    const conexao = app.config.conexao
    const modelAdmin = new app.app.models.modelAdmin(conexao)

    modelAdmin.excluirUsuario(dados, function (error, result) {
        modelAdmin.selectUsuarios(function (error, result_select) {
            res.render('admin/listaUsuarios', { erros: {}, usuario: result_select })
        })
    })
}

module.exports.renderCadastroProduto = function (app, req, res) {
    if (req.session.id_tipo_usuario = !2) {
        res.redirect('/')
        return
    }
    res.render('admin/cadastroProduto', { erros: {} })
}

module.exports.cadastrarProduto = function (app, req, res) {
    const dados = req.body
    const conexao = app.config.conexao
    const modelAdmin = new app.app.models.modelAdmin(conexao)

    modelAdmin.cadastrarProduto(dados, function (error, result) {
        res.redirect('/admin/listaProdutos')
    })
}

module.exports.renderListaProdutos = function (app, req, res) {
    if (req.session.id_tipo_usuario = !2) {
        res.redirect('/')
        return
    }
    const conexao = app.config.conexao
    const modelAdmin = new app.app.models.modelAdmin(conexao)

    modelAdmin.selectProdutos(function (error, result) {
        res.render('admin/listaProdutos', { erros: {}, produtos: result })
    })
}

module.exports.editarProduto = function (app, req, res) {
    if (req.session.id_tipo_usuario = !2) {
        res.redirect('/')
        return
    }
    const dados = req.body
    const conexao = app.config.conexao
    const modelAdmin = new app.app.models.modelAdmin(conexao)
    modelAdmin.selectProduto(dados, function (error, result) {
        res.render('admin/editarProduto', { erros: {}, produtos: result })
    })
}

module.exports.salvarProduto = function (app, req, res) {
    const dados = req.body
    const conexao = app.config.conexao
    const modelAdmin = new app.app.models.modelAdmin(conexao)

    modelAdmin.salvarProduto(dados, function (error, result) {

        modelAdmin.selectProdutos(function (error, result_select) {

            res.render('admin/listaProdutos', { erros: {}, produtos: result_select })
        })
    })
}

module.exports.excluirProduto = function (app, req, res) {
    const dados = req.body
    const conexao = app.config.conexao
    const modelAdmin = new app.app.models.modelAdmin(conexao)

    modelAdmin.excluirProduto(dados, function (error, result) {
        modelAdmin.selectProdutos(function (error, result_select) {
            res.render('admin/listaProdutos', { erros: {}, produtos: result_select })
        })
    })
}

module.exports.listaPedidosAbertos = async function (app, req, res) {
    if (req.session.id_usuario == undefined) {
        res.redirect('/')
        return
    }
    const conexao = app.config.conexao
    const modelAdmin = new app.app.models.modelAdmin(conexao)

    const result = await modelAdmin.listaPedidosAbertos()
    res.render('admin/listaPedidosAbertos', { erros: {}, pedidos: result })
}

module.exports.concluirCompra = async function (app, req, res) {
    if (req.session.id_usuario == undefined) {
        res.redirect('/')
        return
    }

    const conexao = app.config.conexao
    const modelAdmin = new app.app.models.modelAdmin(conexao)
    const idPedido = req.body.id

    await modelAdmin.concluirCompra(idPedido)
    const result = await modelAdmin.listaPedidosAbertos()
    res.render('admin/listaPedidosAbertos', { erros: {}, pedidos: result })

}

module.exports.cancelarCompra = async function (app, req, res) {
    if (req.session.id_usuario == undefined) {
        res.redirect('/')
        return
    }

    const conexao = app.config.conexao
    const modelAdmin = new app.app.models.modelAdmin(conexao)
    const idPedido = req.body.id

    await modelAdmin.cancelarCompra(idPedido)
    const result = await modelAdmin.listaPedidosAbertos()
    res.render('admin/listaPedidosAbertos', { erros: {}, pedidos: result })

}

module.exports.historicoPedidos = async function (app, req, res) {
    if (req.session.id_usuario == undefined) {
        res.redirect('/')
        return
    }
    const conexao = app.config.conexao
    const modelAdmin = new app.app.models.modelAdmin(conexao)
    const result = await modelAdmin.historico()
    console.log(result)
    res.render('admin/historicoPedidos', { erros: {}, historico: result })
}

module.exports.descricaoHistorico = async function (app, req, res) {
    if (req.session.id_usuario == undefined) {
        res.redirect('/')
        return
    }
    const conexao = app.config.conexao
    const modelAdmin = new app.app.models.modelAdmin(conexao)
    const idPedido = req.body.id
    const result = await modelAdmin.descricaoHistorico(idPedido)
    res.render('admin/descricaoHistorico', { erros: {}, descricaoHistorico: result })
}

module.exports.Logout = function (app, req, res){
    req.session.destroy(function (error) {
        res.redirect('/');
    }
    );

}

