// importar a dependencia do sqlite3

const sqlite3 = require("sqlite3").verbose() // verbose mostra as mensagens no terminal

// criar o objeto que ira fazer operações no banco de dados

const db = new sqlite3.Database("./src/database/database.db")

// utilizar o objeto de bacno de dados para nossas opereções
// linha 11 > rodar uma sequencia de codigo

module.exports = db
    /* db.serialize(() => {
        //criar uma tabela
        // usar crase para poder usar quebra de linha
        db.run(`
            CREATE TABLE IF NOT EXISTS places(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                image TEXT,
                name TEXT,
                address TEXT,
                address2 TEXT,
                state TEXT,
                city TEXT,
                items TEXT
            );
        `)

        
        

        // consultar dados da tabela
         db.all(`SELECT name FROM places`, function(err, rows) {
                 if (err) { // se tiver erro, matar a função
                     return console.log(err)
                 }
                 console.log("Aqui estão seu registros")
                 console.log(rows)
             })
             // deletar um dado na tabela
             
         db.run(`DELETE FROM places where id = ?`, [1], function(err) {
             if (err) { // se tiver erro, matar a função
                 return console.log(err)
             }
             console.log("Registro deletado com sucesso")
         })
         

    })

    */