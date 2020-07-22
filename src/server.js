const express = require("express")
const server = express()

// pegar o banco de dados

const db = require("./database/db")

//configurar pasta publica
server.use(express.static("public")) // "use" é para configurar o servidor
    //configurar caminhos da aplicação

//habilitar o uso do req.body pois vem desabilitado por padrao
server.use(express.urlencoded({ extended: true }))

//utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

// pagina inicial
// req é uma requisição
// res é uma Resposta

server.get("/", (req, res) => {
    return res.render("index.html")
})


server.post("/save-point", (req, res) => {
    // inserir dados no banco de dados
    const query = `
            INSERT INTO places (
                image, name, address, address2, state, city, items
            ) VALUES (?,?,?,?,?,?,?);
            `
    const values = [
            req.body.image,
            req.body.name,
            req.body.address,
            req.body.address2,
            req.body.state,
            req.body.city,
            req.body.items
        ]
        // inserir dados na tabela

    function afterInsertData(err) {
        if (err) { // se tiver erro, matar a função
            console.log(err)
            return res.send("Erro no ")
        }
        console.log("Cadastrado com sucesso")
        console.log(this)
        return res.remder("create-point.html", { saved: true })

    }

    db.run(query, values, afterInsertData)
        // terceiro parametro, funçao estilo "callback,
        //faz com que a aplicação continue rodando enquanto executa a função
})



server.get("/create-point", (req, res) => {
    // query strings da nossa url
    console.log(req.query)
    return res.render("create-point.html")
})




server.get("/search", (req, res) => {
    const search = req.query.search
    if (search == "") {
        return res.render("search-results.html", { total: 0 })
    }
    // pegas os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        // LIKE PARA PODER USAR QUALQUER VALOR EX: RIO ACHARIA RIO DO SUL, RIO DE JANEIRO, precisa das aspas e %%
        if (err) { // se tiver erro, matar a função
            return console.log(err)
            console.log(rows)
        }
        // mostrar a pagina html com os dados do banco de dados
        const total = rows.length
        console.log(rows)
        return res.render("search-results.html", { places: rows, total })

    })

})


// ligar o servidor/ porta 3000
server.listen(3000)