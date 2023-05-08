    const express = require('express'); 
    const bodyParser = require('body-parser');
    const urlencodedParser = bodyParser.urlencoded({ extended: false })

    const sqlite3 = require('sqlite3').verbose();
    const DBPATH = 'entrega_autoestudo.db';

    const hostname = '127.0.0.1';
    const port = 3000;
    const app = express();

    /* Colocar toda a parte estática no frontend */
    app.use(express.static('./'));

    /* Definição dos endpoints */
    app.get('/', function(req, res){
        res.sendFile(__dirname+'/index.html')
    });

    
    app.get('/inserirdado_page', function(req, res){
        res.sendFile(__dirname+'/inserir.html')

    });

    app.get('/exibirdado', function(req, res){
        res.sendFile(__dirname+'/exibe.html')

    });

    
    /******** CRUD ************/
    app.use(express.json());

    // Retorna todos registros (é o R do CRUD - Read)
    app.get('/mostra', (req, res) => {
        res.statusCode = 200;
        res.setHeader('Access-Control-Allow-Origin', '*');
        var db = new sqlite3.Database(DBPATH); // Abre o banco
        var sql = 'SELECT * FROM formacao';
            db.all(sql, [],  (err, rows ) => {
                if (err) {
                    throw err;
                }
                res.json(rows);
            });
            db.close(); // Fecha o banco
    });

    // Insere um registro (é o C do CRUD - Create)
    app.post('/inserirdado', urlencodedParser, (req, res) => {
        res.statusCode = 200;
        res.setHeader('Access-Control-Allow-Origin', '*'); 
        var db = new sqlite3.Database(DBPATH); // Abre o banco
        sql = "INSERT INTO formacao (instituicao, dataIni, dataFim) VALUES ('" + req.body.instituicao + "', '" + req.body.dataIni + "', '" + req.body.dataFim + "')";
        console.log(sql);
        db.run(sql, [],  err => {
            if (err) {
                throw err;
            }	
        });
        res.write('<p>USUARIO INSERIDO COM SUCESSO!</p><a href="/">VOLTAR</a>');
        db.close(); // Fecha o banco
        res.end();
    });

    // Monta o formulário para o update (é o U do CRUD - Update)
    
    app.get('/mostradado', (req, res) => {
        id = req.query.id;// para acessar é preciso descrever o id na barra de navegação para que seja possível acessar
        res.statusCode = 200;
        res.setHeader('Access-Control-Allow-Origin', '*'); 
        sql = `SELECT * FROM formacao WHERE id=${id}`
        console.log(sql)
        var db = new sqlite3.Database(DBPATH); // Abre o banco
        db.all(sql, [],  (err, rows ) => {
            if (err) {
                throw err;
            }
            res.json(rows);
        });
        db.close(); // Fecha o banco
    });

    // Atualiza um registro (é o U do CRUD - Update)
    app.put('/atualizadado', urlencodedParser, (req, res) => {
        instituicao = req.body.instituicao;
        dataIni = req.body.dataIni;
        dataFim = req.body.dataFim;
        id = parseInt(req.body.id);
        res.statusCode = 200;
        res.setHeader('Access-Control-Allow-Origin', '*'); 
        sql = `UPDATE formacao SET instituicao="${instituicao}", dataIni="${dataIni}", dataFim="${dataFim}" WHERE id=${id}`
        console.log(sql);
        var db = new sqlite3.Database(DBPATH); // Abre o banco
        db.run(sql, [],  err => {
            if (err) {
                throw err;
            }
            res.end();
        });
        res.write('<p>USUARIO ATUALIZADO COM SUCESSO!</p><a href="/">VOLTAR</a>');
        db.close(); // Fecha o banco
    });

    // Exclui um registro (é o D do CRUD - Delete)
    app.get('/removedado', urlencodedParser, (req, res) => {
        res.statusCode = 200;
        res.setHeader('Access-Control-Allow-Origin', '*'); 
        const id = req.query.id;
        sql = "DELETE FROM formacao WHERE id= ?";
        var db = new sqlite3.Database(DBPATH); // Abre o banco
        db.run(sql, [id],  function(err) {
            if (err) {
                throw err;
            }
            res.write('<p>USUARIO REMOVIDO COM SUCESSO!</p><a href="/">VOLTAR</a>');
            res.end();
        });
        db.close(); // Fecha o banco
    });



    app.listen(port, hostname, () => {
    console.log(`Servidor rodando em http://${hostname}:${port}/`);
    });