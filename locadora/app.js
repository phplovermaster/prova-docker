const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: true }));

let locacoes = [
  {
    id: 1,
    cliente: "Carlos Silva",
    veiculo: "Onix",
    dias: 5
  }
];

let proximoId = 2;

app.get("/", (req, res) => {

  let html = `
  <!DOCTYPE html>
  <html>
  <head>
      <title>FastCar</title>
  </head>
  <body>

      <h1>Locadora FastCar</h1>

      <h2>Nova Locação</h2>

      <form action="/adicionar" method="POST">

          <input
            type="text"
            name="cliente"
            placeholder="Cliente"
            required>

          <br><br>

          <input
            type="text"
            name="veiculo"
            placeholder="Veículo"
            required>

          <br><br>

          <input
            type="number"
            name="dias"
            placeholder="Dias de locação"
            required>

          <br><br>

          <button type="submit">
            Registrar Locação
          </button>

      </form>

      <hr>

      <h2>Locações Ativas</h2>

      <table border="1">

          <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Veículo</th>
              <th>Dias</th>
              <th>Ações</th>
          </tr>
  `;

  locacoes.forEach(locacao => {

    html += `
      <tr>

        <td>${locacao.id}</td>
        <td>${locacao.cliente}</td>
        <td>${locacao.veiculo}</td>
        <td>${locacao.dias}</td>

        <td>
          <a href="/deletar/${locacao.id}">
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

  locacoes.push({
    id: proximoId++,
    cliente: req.body.cliente,
    veiculo: req.body.veiculo,
    dias: req.body.dias
  });

  res.redirect("/");

});

app.get("/deletar/:id", (req, res) => {

  const id = Number(req.params.id);

  locacoes = locacoes.filter(
    locacao => locacao.id !== id
  );

  res.redirect("/");

});

app.listen(3000, "0.0.0.0", () => {
  console.log("Sistema da Locadora iniciado");
});