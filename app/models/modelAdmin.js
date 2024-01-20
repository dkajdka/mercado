const { rejects } = require('assert')
const { resolve } = require('path')

function Admin(conexao) {
    this._conexao = conexao
    this._crypto = require('crypto')
}

Admin.prototype.getTipoUsuario = function (callback) {
    this._conexao.query(`SELECT * from tipo_usuario`, callback)
}

Admin.prototype.cadastroUsuarios = function (dados, callback) {
    dados.senha = this._crypto.createHash('md5').update(dados.senha).digest('hex')
    this._conexao.query(`insert into usuario set nome = '${dados.nome}' , senha = '${dados.senha}' , email = '${dados.email}' , id_tipo_usuario = ${dados.id_tipo_usuario}`, callback)
}

Admin.prototype.selectUsuario = function (id_usuario,callback) {
    this._conexao.query(`SELECT * from usuario where id_usuario = ${id_usuario}`, callback)
}

Admin.prototype.selectUsuarios = function (callback) {
    this._conexao.query(`SELECT * from usuario`, callback)
}

Admin.prototype.excluirUsuario = function (dados,callback) {
    this._conexao.query(`delete from usuario where id_usuario = ${dados.id} `, callback)
}

Admin.prototype.salvarUsuario = function (dados,callback) {
    this._conexao.query(`update usuario set nome = '${dados.nome}', email = '${dados.email}', id_tipo_usuario=${dados.id_tipo_usuario} where id_usuario=${dados.id}`, callback)
}

Admin.prototype.salvarSenhaUsuario = function (dados,callback) {
    dados.senha = this._crypto.createHash('md5').update(dados.senha).digest('hex')
    this._conexao.query(`update usuario set senha = '${dados.senha}' where id_usuario=${dados.id}`, callback)
}

Admin.prototype.cadastrarProduto = function (dados,callback) {
    this._conexao.query(`insert into produto values(null,'${dados.descricao}','${dados.preco}') `, callback)
}

Admin.prototype.selectProdutos = function (callback) {
    this._conexao.query(`SELECT * from produto`, callback)
}

Admin.prototype.selectProduto = function (dados,callback) {
    this._conexao.query(`select * from produto where id_produto = ${dados.id}`, callback)
}

Admin.prototype.salvarProduto = function (dados,callback) {
    this._conexao.query(`update produto set descricao = '${dados.descricao}', preco = '${dados.preco}' where id_produto=${dados.id}`, callback)
}

Admin.prototype.excluirProduto = function (dados,callback) {
    this._conexao.query(`delete from produto where id_produto = ${dados.id} `, callback)
}
Admin.prototype.selectPedidoAberto = function(idUsuario){
    return new Promise((resolve,rejects)=>{
        this._conexao.query(`SELECT * from pedido where id_status=1 and id_usuario=${idUsuario}`,function(error,result){
     
            resolve(result)
        })
    })
}

Admin.prototype.cancelarPedido = function(idUsuario){
    return new Promise((resolve,rejects)=>{
        this._conexao.query(`UPDATE pedido set id_usuario = ${idUsuario}, id_status = 4, null `,function(error,result){
            resolve(result)
        })
    })
}

Admin.prototype.criarPedido = function(idUsuario){
    return new Promise((resolve,rejects)=>{
        this._conexao.query(`INSERT into pedido values(null,${idUsuario},1,null)`,function(error,result){
            resolve(result)
        })
    })
}

Admin.prototype.addCarrinho = function(pedido,idProduto){
    return new Promise((resolve,rejects)=>{
        this._conexao.query(`INSERT into carrinho values(null,${pedido},${idProduto},1)`,function(error,result){
            resolve(result)
        })
    })
}

Admin.prototype.selectCarrinho = function(pedido,idProduto){
    return new Promise((resolve,rejects)=>{
        this._conexao.query(`SELECT * from carrinho where id_pedido = ${pedido}`,function(error,result){
          
            resolve(result)
        })
    })
}

Admin.prototype.selectProdutosCarrinho = function(pedido){
    return new Promise((resolve,rejects)=>{
        this._conexao.query(`SELECT * from carrinho where id_pedido = ${pedido}`,function(error,result){
      
            resolve(result)
        })
    })
}

Admin.prototype.ProdutosSelect = function(produto,idProduto){
    return new Promise((resolve,rejects)=>{
        this._conexao.query(`SELECT * from produto where id_produto = ${produto}`,function(error,result){
            resolve(result)
        })
    })
}

Admin.prototype.constaCarrinho = function(pedido,idProduto){
    return new Promise((resolve,rejects)=>{
        this._conexao.query(`SELECT * from carrinho where id_pedido = ${pedido} and id_produto = ${idProduto}`,function(error,result){
            resolve(result)
        })
    })
}

Admin.prototype.updateQuantidade = function(pedido,idProduto){
    return new Promise((resolve,rejects)=>{
        this._conexao.query(`UPDATE carrinho set quantidade = quantidade + 1 where id_pedido = ${pedido} and id_produto = ${idProduto}`,function(error,result){
          
            resolve(result)
        })
    })
}

Admin.prototype.salvarEditCarrinho = function(idPedido,idProduto,quantidade){
    return new Promise((resolve,rejects)=>{
        this._conexao.query(`UPDATE carrinho set quantidade = ${quantidade} where id_pedido = ${idPedido} and id_produto = ${idProduto}`,function(error,result){
         
            resolve(result)
        })
    })
}

Admin.prototype.excluirCarrinho = function(idPedido,idProduto){
    return new Promise((resolve,rejects)=>{
        this._conexao.query(`delete from carrinho where id_pedido = ${idPedido} and id_produto = ${idProduto}`,function(error,result){
          
            resolve(result)
        })
    })
}

Admin.prototype.finalizarPedido = function(idPedido,formaPagamento){
    return new Promise((resolve,rejects)=>{
        this._conexao.query(`update pedido set id_status = 2, id_forma_pagamento = ${formaPagamento} where id_pedido = ${idPedido} `,function(error,result){
            resolve(result)
        })
    })
}

Admin.prototype.selectFormaPagamento = function(idUsuario,formaPagamento){
    return new Promise((resolve,rejects)=>{
        this._conexao.query(`select * from forma_pagamento`,function(error,result){
           
            resolve(result)
        })
    })
}

Admin.prototype.listaPedidosAbertos = function (callback) {
    return new Promise((resolve,rejects)=>{
        this._conexao.query(`
        SELECT u.nome, p.id_pedido, fp.descricao
        FROM usuario u
        JOIN pedido p ON u.id_usuario = p.id_usuario
        JOIN forma_pagamento fp ON p.id_forma_pagamento = fp.id_forma_pagamento
        WHERE p.id_status = 2;`,function(error,result){
            resolve(result)
        })
    })
}

Admin.prototype.concluirCompra = function (idPedido,callback) {
    return new Promise((resolve,rejects)=>{
        this._conexao.query(`update pedido set id_status = 3 where id_pedido = ${idPedido}`,function(error,result){
            resolve(result)
        })
    })
}

Admin.prototype.updateStatus = function (idPedido,idFormaPagamento,callback) {
    return new Promise((resolve,rejects)=>{
        this._conexao.query(`update pedido set id_status = 2, id_forma_pagamento = ${idFormaPagamento} where id_pedido = ${idPedido}`,function(error,result){
            resolve(result)
        })
    })
}

Admin.prototype.cancelarCompra = function (idPedido,callback) {
    return new Promise((resolve,rejects)=>{
        this._conexao.query(`update pedido set id_status = 4 where id_pedido = ${idPedido}`,function(error,result){
          
            resolve(result)
        })
    })
}

Admin.prototype.historico = function (idPedido,callback) {
    return new Promise((resolve,rejects)=>{
        this._conexao.query(`SELECT u.nome,u.id_usuario, p.id_pedido, fp.descricao
        FROM usuario u
        JOIN pedido p ON u.id_usuario = p.id_usuario
        LEFT JOIN forma_pagamento fp ON p.id_forma_pagamento = fp.id_forma_pagamento;`,function(error,result){
            resolve(result)
        })
    })
}


Admin.prototype.descricaoHistorico = function (idPedido,callback) {
    return new Promise((resolve,rejects)=>{
        this._conexao.query(`SELECT
        u.nome AS nome_usuario,
        p.id_pedido,
        fp.descricao AS forma_pagamento,
        pr.descricao AS nome_produto,
        c.quantidade
    FROM
        usuario u
    JOIN
        pedido p ON u.id_usuario = p.id_usuario
    LEFT JOIN
        forma_pagamento fp ON p.id_forma_pagamento = fp.id_forma_pagamento
    LEFT JOIN
        carrinho c ON p.id_pedido = c.id_pedido
    LEFT JOIN
        produto pr ON c.id_produto = pr.id_produto
        WHERE p.id_pedido = ${idPedido};`,function(error,result){
            resolve(result)
        })
    })
}

module.exports = function () {
    return Admin;
}