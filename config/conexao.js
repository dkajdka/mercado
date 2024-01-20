const conexao = function(){
    const mysql = require('mysql')

        return mysql.createConnection({
            host : 'localhost',
            user : 'root',
            password : '',
            database : 'sistema_pedidos'
        })

    }

module.exports = conexao