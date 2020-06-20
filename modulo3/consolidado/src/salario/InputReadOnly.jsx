import React, { Component } from "react";
import { Chart } from "react-google-charts";
import css from "./salario.module.css";
import ProgressBarSalary from "./ProgressBarSalary";

export default class InputReadOnly extends Component {
  calculaDesconto(salarioBruto) {
    if (salarioBruto <= 1045) {
      return salarioBruto * 0.075;
    }

    if (salarioBruto > 1045 && salarioBruto <= 2089.6) {
      const desconto1 = 1045 * 0.075;
      const desconto2 = (salarioBruto - 1045) * 0.09;
      return desconto1 + desconto2;
    }

    if (salarioBruto > 2089.6 && salarioBruto <= 3134.4) {
      const desconto1 = 1045 * 0.075;
      const desconto2 = (2089.6 - 1045) * 0.09;
      const desconto3 = (salarioBruto - 2089.6) * 0.12;
      return desconto1 + desconto2 + desconto3;
    }

    if (salarioBruto > 3134.4 && salarioBruto <= 6101.06) {
      const desconto1 = 1045 * 0.075;
      const desconto2 = (2089.6 - 1045) * 0.09;
      const desconto3 = (3134.4 - 2089.6) * 0.12;
      const desconto4 = (salarioBruto - 3134.4) * 0.14;
      return desconto1 + desconto2 + desconto3 + desconto4;
    }

    return 713.1;
  }

  calculaIRRF(baseIRRF) {
    if (baseIRRF <= 1903.98) {
      return 0;
    }

    if (baseIRRF > 1903.98 && baseIRRF <= 2826.65) {
      const desconto = baseIRRF * 0.075;
      return desconto - 142.8;
    }

    if (baseIRRF > 2826.65 && baseIRRF <= 3751.05) {
      const desconto = baseIRRF * 0.15;
      return desconto - 354.8;
    }

    if (baseIRRF > 3751.05 && baseIRRF <= 4664.68) {
      const desconto = baseIRRF * 0.225;
      return desconto - 636.13;
    }

    return baseIRRF * 0.275 - 869.36;
  }

  render() {
    const { fullSalary } = this.props;
    let descontoInss = this.calculaDesconto(fullSalary);
    const baseIRPF = fullSalary - descontoInss;
    let descontoIrrf = this.calculaIRRF(baseIRPF);
    const descontos = descontoInss + descontoIrrf;
    const salarioLiquido = fullSalary - descontos;

    const options = {
      title: "Gráfico Salário",
      titleTextStyle: { color: "#fff" },
      backgroundColor: "#191970",
      pieSliceTextStyle: {
        color: "black",
      },
      legend: { textStyle: { color: "#fff" } },
      colors: ["#00ff00", "#ff8c00", "#ffb6c1"],
    };
    const data = [
      ["Discriminação", "Quantidade"],
      ["Salário Líquido", salarioLiquido],
      ["Desconto INSS", descontoInss],
      ["Desconto IRRF", descontoIrrf],
    ];

    return (
      <>
        <div className="row">
          <div className="col s3">
            <label>Base INSS:</label>
            <input
              value={new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
                maximumFractionDigits: 2,
              }).format(fullSalary)}
              id="baseinss"
              type="text"
              className={css.valores}
            />
          </div>
          <div className="col s3">
            <label>Desconto INSS:</label>
            <input
              value={
                new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                  maximumFractionDigits: 2,
                }).format(descontoInss) +
                " (" +
                new Intl.NumberFormat("pt-BR", {
                  maximumFractionDigits: 2,
                }).format((descontoInss / fullSalary) * 100) +
                " %)"
              }
              id="descontoinss"
              type="text"
              className={css.descontoInss}
            />
          </div>
          <div className="col s3">
            <label>Base IRRF:</label>
            <input
              value={new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
                maximumFractionDigits: 2,
              }).format(baseIRPF)}
              id="baseirrf"
              type="text"
              className={css.valores}
            />
          </div>
          <div className="col s3">
            <label>Desconto IRRF:</label>
            <input
              value={
                new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                  maximumFractionDigits: 2,
                }).format(descontoIrrf) +
                " (" +
                new Intl.NumberFormat("pt-BR", {
                  maximumFractionDigits: 2,
                }).format((descontoIrrf / fullSalary) * 100) +
                " %)"
              }
              id="descontoirrf"
              type="text"
              className={css.descontoIrrf}
            />
          </div>
        </div>
        <div className="row">
          <div className="col s6">
            <label>Salário Líquido:</label>
            <input
              value={
                new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                  maximumFractionDigits: 2,
                }).format(salarioLiquido) +
                " (" +
                new Intl.NumberFormat("pt-BR", {
                  maximumFractionDigits: 2,
                }).format((salarioLiquido / fullSalary) * 100) +
                " %)"
              }
              id="descontoinss"
              type="text"
              className={css.salarioLiquido}
            />
          </div>
          <div className="col s6">
            <Chart
              width={"100%"}
              height={"auto"}
              chartType="PieChart"
              data={data}
              options={options}
            />
          </div>
        </div>

        <ProgressBarSalary
          descontoInss={new Intl.NumberFormat("en-IN", {
            maximumFractionDigits: 2,
          }).format((descontoInss / fullSalary) * 100)}
          descontoIrrf={new Intl.NumberFormat("en-IN", {
            maximumFractionDigits: 2,
          }).format((descontoIrrf / fullSalary) * 100)}
          percentualLiquido={new Intl.NumberFormat("en-IN", {
            maximumFractionDigits: 2,
          }).format((salarioLiquido / fullSalary) * 100)}
        />
      </>
    );
  }
}
