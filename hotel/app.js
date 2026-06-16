const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: true }));

let reservas = [
  {
    id: 1,
    hospede: "João Silva",
    quarto: 101,
    dias: 3
  }
];

let proximoId = 2;

app.get("/", (req, res) => {

  let html = `
  <!DOCTYPE html>
  <html>
  <head>
      <title>Hotel Paradise</title>
  </head>
  <body>

      <h1>Hotel Paradise</h1>

      <h2>Nova Reserva</h2>

      <form action="/adicionar" method="POST">

          <input
            type="text"
            name="hospede"
            placeholder="Nome do hóspede"
            required>

          <br><br>

          <input
            type="number"
            name="quarto"
            placeholder="Número do quarto"
            required>

          <br><br>

          <input
            type="number"
            name="dias"
            placeholder="Quantidade de dias"
            required>

          <br><br>

          <button type="submit">
            Reservar
          </button>

      </form>

      <hr>

      <h2>Reservas</h2>

      <table border="1">

          <tr>
              <th>ID</th>
              <th>Hóspede</th>
              <th>Quarto</th>
              <th>Dias</th>
              <th>Ações</th>
          </tr>
  `;

  reservas.forEach(reserva => {

    html += `
      <tr>

        <td>${reserva.id}</td>
        <td>${reserva.hospede}</td>
        <td>${reserva.quarto}</td>
        <td>${reserva.dias}</td>

        <td>
          <a href="/deletar/${reserva.id}">
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

  reservas.push({
    id: proximoId++,
    hospede: req.body.hospede,
    quarto: req.body.quarto,
    dias: req.body.dias
  });

  res.redirect("/");

});

app.get("/deletar/:id", (req, res) => {

  const id = Number(req.params.id);

  reservas = reservas.filter(
    reserva => reserva.id !== id
  );

  res.redirect("/");

});

app.listen(3000, "0.0.0.0", () => {
  console.log("Sistema do Hotel iniciado");
});