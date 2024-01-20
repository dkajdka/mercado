function Usuario(conexao) {
    this._conexao = conexao
    this._crypto = require('crypto')
}

Usuario.prototype.cadastroUsuarios = function (dados, callback) {
    const senha = this._crypto.createHash('md5').update(dados.senha).digest('hex')
    this._conexao.query(`INSERT into usuario set nome = '${dados.nome}' , senha = '${senha}' , email = '${dados.email}' , id_tipo_usuario = 1`, callback)
}

Usuario.prototype.getUsuarioByEmail = function (email, callback) {
    this._conexao.query(`SELECT * from usuario WHERE email = '${email}'`, callback)
}

Usuario.prototype.getUsuario = function (dados, callback) {
    const senha = this._crypto.createHash('md5').update(dados.senha).digest('hex')
    this._conexao.query(`SELECT * from usuario WHERE email = '${dados.email}' and senha = '${senha}'`, callback)
}

Usuario.prototype.getUsuarioById = function (id, callback) {
    this._conexao.query(`SELECT * from usuario WHERE id = ${id}`, callback)
}

Usuario.prototype.editarUsuario = function (dados, idUsuario, callback) {
    this._conexao.query(`UPDATE usuario set nome = '${dados.nome}', email = '${dados.email}' WHERE id_usuario = ${idUsuario}`, callback)
}

Usuario.prototype.selectProdutos = function (callback) {
    this._conexao.query(`SELECT * from produto`, callback)
}

Usuario.prototype.selectUsuario = function (idUsuario, callback) {
    this._conexao.query(`SELECT * from usuario WHERE id_usuario = ${idUsuario}`, callback)
}
Usuario.prototype.salvarEditarSenha = function (dados, idUsuario) {
    return new Promise((resolve, rejects) => {
        const senha = this._crypto.createHash('md5').update(dados.senha).digest('hex')
        this._conexao.query(`UPDATE usuario set senha = '${senha}' WHERE id_usuario = ${idUsuario}`, function (error, result) {
            resolve(result)
          
        })
    })
}

module.exports = function () {
    return Usuario;
}