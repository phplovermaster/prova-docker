const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: true }));

let alunos = [
  {
    id: 1,
    nome: "Ana Souza",
    turma: "9º Ano",
    turno: "Manhã"
  }
];

let proximoId = 2;

app.get("/", (req, res) => {

  let html = `
  <!DOCTYPE html>
  <html>
  <head>
      <title>Escola Futuro Digital</title>
  </head>
  <body>

      <h1>Controle de Matrículas</h1>

      <h2>Novo Aluno</h2>

      <form action="/adicionar" method="POST">

          <input
            type="text"
            name="nome"
            placeholder="Nome do aluno"
            required>

          <br><br>

          <input
            type="text"
            name="turma"
            placeholder="Turma"
            required>

          <br><br>

          <select name="turno">
              <option>Manhã</option>
              <option>Tarde</option>
              <option>Noite</option>
          </select>

          <br><br>

          <button type="submit">
            Matricular
          </button>

      </form>

      <hr>

      <h2>Alunos Matriculados</h2>

      <table border="1">

          <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Turma</th>
              <th>Turno</th>
              <th>Ações</th>
          </tr>
  `;

  alunos.forEach(aluno => {

    html += `
      <tr>

        <td>${aluno.id}</td>
        <td>${aluno.nome}</td>
        <td>${aluno.turma}</td>
        <td>${aluno.turno}</td>

        <td>
          <a href="/deletar/${aluno.id}">
            Excluir
          </a>
        </td>

      </tr>
    `;

  });

  html += `
      </table>

  </body>
  </html>
  `;

  res.send(html);

});

app.post("/adicionar", (req, res) => {

  alunos.push({
    id: proximoId++,
    nome: req.body.nome,
    turma: req.body.turma,
    turno: req.body.turno
  });

  res.redirect("/");

});

app.get("/deletar/:id", (req, res) => {

  const id = Number(req.params.id);

  alunos = alunos.filter(
    aluno => aluno.id !== id
  );

  res.redirect("/");

});

app.listen(3000, "0.0.0.0", () => {
  console.log("Sistema Escolar iniciado");
});