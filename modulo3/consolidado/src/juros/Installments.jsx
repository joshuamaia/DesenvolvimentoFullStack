import React, { useEffect, useState } from "react";

export default function Installments(props) {
  const [valoresArray, setValoresArray] = useState([]);
  const { periodo, montante, juros } = props;

  useEffect(() => {
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

    setValoresArray([...valores]);
  }, [juros, montante, periodo]);

  return (
    <>
      <div>
        <table>
          <thead>
            <tr>
              <th style={{ color: "#EEE8AA" }}>Mês</th>
              <th style={{ color: "#ADD8E6" }}>Valor</th>
              <th style={{ color: "#F0E68C" }}>
                {juros >= 0 ? "Valorização" : "Desvalorização"}
              </th>
              <th style={{ color: "#E6E6FA" }}>
                {juros >= 0
                  ? "Percentual de Valorização"
                  : "Percentual de Desvalorização"}
              </th>
            </tr>
          </thead>
          <tbody>
            {valoresArray.map((valor) => {
              return (
                <tr key={valor.count}>
                  <td style={{ color: "#EEE8AA" }}>{valor.count}</td>
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
