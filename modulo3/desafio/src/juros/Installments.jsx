import React, { Component } from "react";

export default class Installments extends Component {
  carregaValores(periodo, montante, juros) {
    let valores = [];
    let valorAcomulado = montante;
    let valorJurosAcumulado =
      valorAcomulado * (1 + juros / 100.0) - valorAcomulado;
    let jurosAcumulado = (valorJurosAcumulado / montante) * 100.0;
    let count = 1;

    for (var i = 1; i <= periodo; i++) {
      const valorComJuros = montante * Math.pow(1 + juros / 100.0, i);
      valorJurosAcumulado = valorComJuros - montante;
      jurosAcumulado = valorJurosAcumulado / montante;
      const valor = {
        count: count,
        valorComJuros,
        valorJurosAcumulado: valorJurosAcumulado,
        jurosAcumulado: jurosAcumulado * 100,
      };

      valores.push(valor);
      count = count + 1;
    }

    return valores;
  }

  render() {
    const { periodo, montante, juros } = this.props;
    const valoresArray = this.carregaValores(periodo, montante, juros);
    console.log(valoresArray);
    return (
      <>
        <div>
          <table>
            <thead>
              <tr>
                <th>Valor Acumulado</th>
                <th>Valor do Juros acumulado</th>
                <th>Percentual de Juros Acumulado</th>
              </tr>
            </thead>
            <tbody>
              {valoresArray.map((valor) => {
                return (
                  <tr key={valor.count}>
                    <td
                      style={{
                        color: juros > 0 ? "#00ff00" : "#FFA07A",
                      }}
                    >
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                        maximumFractionDigits: 2,
                      }).format(valor.valorComJuros)}
                    </td>
                    <td
                      style={{
                        color: juros > 0 ? "#00ff00" : "#FFA07A",
                      }}
                    >
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                        maximumFractionDigits: 2,
                      }).format(valor.valorJurosAcumulado)}
                    </td>
                    <td
                      style={{
                        color: juros > 0 ? "#00BFFF" : "#ffb6c1",
                      }}
                    >
                      {new Intl.NumberFormat("pt-BR", {
                        maximumFractionDigits: 2,
                      }).format(valor.jurosAcumulado)}{" "}
                      %
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}
