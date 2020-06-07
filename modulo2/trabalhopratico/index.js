const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());

app.get("/criaestados", (req, res) => {
  fs.readFile("Estados.json", (err, data) => {
    if (err) {
      return res.json({ message: "Erro ao ler os estados" });
    }
    const estados = JSON.parse(data);

    fs.readFile("Cidades.json", (err, data) => {
      // console.log(estados);
      const cidades = JSON.parse(data);
      // console.log(cidades);

      estados.forEach((estado) => {
        const estadoArquivo = [];
        cidades.forEach((cidade) => {
          if (estado.ID === cidade.Estado) {
            estadoArquivo.push(cidade);
          }
        });
        fs.writeFile(
          `${estado.Sigla}.json`,
          JSON.stringify(estadoArquivo),
          (err) => {
            if (err) {
              return res.json({
                message: `Erro ao gravar os estado ${estado.Sigla}`,
              });
            }
          }
        );
      });
    });
  });

  return res.json({ message: "Estados Criados" });
});

app.get("/maiscidades", (req, res) => {
  fs.readFile("Estados.json", (err, data) => {
    if (err) {
      return res.json({ message: "Erro ao ler os estados" });
    }
    const estados = JSON.parse(data);

    fs.readFile("Cidades.json", (err, data) => {
      // console.log(estados);
      const cidades = JSON.parse(data);
      // console.log(cidades);

      let agrupaEstadosCidade = [];
      estados.forEach((estado) => {
        const estadoArquivo = [];
        cidades.forEach((cidade) => {
          if (estado.ID === cidade.Estado) {
            estadoArquivo.push(cidade);
          }
        });
        agrupaEstadosCidade.push({
          uf: estado.Sigla,
          contador: estadoArquivo.length,
        });
      });
      agrupaEstadosCidade = agrupaEstadosCidade.sort((a, b) => {
        return b.contador - a.contador;
      });

      const retorno = [];

      for (var i = 0; i < 5; i++) {
        retorno.push(
          `${agrupaEstadosCidade[i].uf} - ${agrupaEstadosCidade[i].contador}`
        );
      }

      return res.json(retorno);
    });
  });
});

app.get("/menoscidades", (req, res) => {
  fs.readFile("Estados.json", (err, data) => {
    if (err) {
      return res.json({ message: "Erro ao ler os estados" });
    }
    const estados = JSON.parse(data);

    fs.readFile("Cidades.json", (err, data) => {
      // console.log(estados);
      const cidades = JSON.parse(data);
      // console.log(cidades);

      let agrupaEstadosCidade = [];
      estados.forEach((estado) => {
        const estadoArquivo = [];
        cidades.forEach((cidade) => {
          if (estado.ID === cidade.Estado) {
            estadoArquivo.push(cidade);
          }
        });
        agrupaEstadosCidade.push({
          uf: estado.Sigla,
          contador: estadoArquivo.length,
        });
      });
      agrupaEstadosCidade = agrupaEstadosCidade.sort((a, b) => {
        return a.contador - b.contador;
      });

      let retorno = [];

      for (var i = 0; i < 5; i++) {
        retorno.push(
          `${agrupaEstadosCidade[i].uf} - ${agrupaEstadosCidade[i].contador}`
        );
      }

      retorno = retorno.sort((a, b) => {
        return -1;
      });

      return res.json(retorno);
    });
  });
});

app.get("/maiorescidades", (req, res) => {
  fs.readFile("Estados.json", (err, data) => {
    if (err) {
      return res.json({ message: "Erro ao ler os estados" });
    }
    const estados = JSON.parse(data);

    fs.readFile("Cidades.json", (err, data) => {
      // console.log(estados);
      const cidades = JSON.parse(data);
      // console.log(cidades);

      let agrupaEstadosCidade = [];
      estados.forEach((estado) => {
        const estadoArquivo = [];
        cidades.forEach((cidade) => {
          if (estado.ID === cidade.Estado) {
            estadoArquivo.push(cidade);
          }
        });
        let cidadeDeMaiorNome = "";
        let ehPrimeira = true;

        //console.log(estadoArquivo);

        estadoArquivo.forEach((cidade) => {
          if (ehPrimeira) {
            cidadeDeMaiorNome = cidade.Nome;
            ehPrimeira = false;
          } else {
            if (cidade.Nome.length === cidadeDeMaiorNome.length) {
              console.log(cidade);
              console.log(cidadeDeMaiorNome);
              cidadeDeMaiorNome =
                cidade.Nome.localeCompare(cidadeDeMaiorNome) < 0
                  ? cidade.Nome
                  : cidadeDeMaiorNome;
              console.log(cidadeDeMaiorNome);
            }
            if (cidade.Nome.length > cidadeDeMaiorNome.length) {
              cidadeDeMaiorNome = cidade.Nome;
            }
          }
        });
        agrupaEstadosCidade.push(`${cidadeDeMaiorNome}-${estado.Sigla}`);
      });

      return res.json(agrupaEstadosCidade);
    });
  });
});

app.get("/menorescidades", (req, res) => {
  fs.readFile("Estados.json", (err, data) => {
    if (err) {
      return res.json({ message: "Erro ao ler os estados" });
    }
    const estados = JSON.parse(data);

    fs.readFile("Cidades.json", (err, data) => {
      // console.log(estados);
      const cidades = JSON.parse(data);
      // console.log(cidades);

      let agrupaEstadosCidade = [];
      estados.forEach((estado) => {
        const estadoArquivo = [];
        cidades.forEach((cidade) => {
          if (estado.ID === cidade.Estado) {
            estadoArquivo.push(cidade);
          }
        });
        let cidadeDeMaiorNome = "";
        let ehPrimeira = true;

        //console.log(estadoArquivo);

        estadoArquivo.forEach((cidade) => {
          if (ehPrimeira) {
            cidadeDeMaiorNome = cidade.Nome;
            ehPrimeira = false;
          } else {
            if (cidade.Nome.length === cidadeDeMaiorNome.length) {
              // console.log(cidade);
              // console.log(cidadeDeMaiorNome);
              cidadeDeMaiorNome =
                cidade.Nome.localeCompare(cidadeDeMaiorNome) < 0
                  ? cidade.Nome
                  : cidadeDeMaiorNome;
              // console.log(cidadeDeMaiorNome);
            }
            if (cidade.Nome.length < cidadeDeMaiorNome.length) {
              cidadeDeMaiorNome = cidade.Nome;
            }
          }
        });
        agrupaEstadosCidade.push(`${cidadeDeMaiorNome}-${estado.Sigla}`);
      });

      return res.json(agrupaEstadosCidade);
    });
  });
});

app.get("/maiorcidade", (req, res) => {
  fs.readFile("Estados.json", (err, data) => {
    if (err) {
      return res.json({ message: "Erro ao ler os estados" });
    }
    const estados = JSON.parse(data);

    fs.readFile("Cidades.json", (err, data) => {
      // console.log(estados);
      const cidades = JSON.parse(data);
      // console.log(cidades);

      let agrupaEstadosCidade = [];
      estados.forEach((estado) => {
        const estadoArquivo = [];
        cidades.forEach((cidade) => {
          if (estado.ID === cidade.Estado) {
            estadoArquivo.push(cidade);
          }
        });
        let cidadeDeMaiorNome = "";
        let ehPrimeira = true;

        //console.log(estadoArquivo);

        estadoArquivo.forEach((cidade) => {
          if (ehPrimeira) {
            cidadeDeMaiorNome = cidade.Nome;
            ehPrimeira = false;
          } else {
            if (cidade.Nome.length === cidadeDeMaiorNome.length) {
              // console.log(cidade);
              // console.log(cidadeDeMaiorNome);
              cidadeDeMaiorNome =
                cidade.Nome.localeCompare(cidadeDeMaiorNome) < 0
                  ? cidade.Nome
                  : cidadeDeMaiorNome;
              // console.log(cidadeDeMaiorNome);
            }
            if (cidade.Nome.length > cidadeDeMaiorNome.length) {
              cidadeDeMaiorNome = cidade.Nome;
            }
          }
        });
        agrupaEstadosCidade.push(`${cidadeDeMaiorNome}-${estado.Sigla}`);
      });

      agrupaEstadosCidade = agrupaEstadosCidade.sort((a, b) => {
        if (a.length === b.length) {
          // console.log(a);
          // console.log(b);
          return a.localeCompare(b);
        }
        return b.length - a.length;
      });

      return res.json(agrupaEstadosCidade[0]);
    });
  });
});

app.get("/menorcidade", (req, res) => {
  fs.readFile("Estados.json", (err, data) => {
    if (err) {
      return res.json({ message: "Erro ao ler os estados" });
    }
    const estados = JSON.parse(data);

    fs.readFile("Cidades.json", (err, data) => {
      // console.log(estados);
      const cidades = JSON.parse(data);
      // console.log(cidades);

      let agrupaEstadosCidade = [];
      estados.forEach((estado) => {
        const estadoArquivo = [];
        cidades.forEach((cidade) => {
          if (estado.ID === cidade.Estado) {
            estadoArquivo.push(cidade);
          }
        });
        let cidadeDeMaiorNome = "";
        let ehPrimeira = true;

        //console.log(estadoArquivo);

        estadoArquivo.forEach((cidade) => {
          if (ehPrimeira) {
            cidadeDeMaiorNome = cidade.Nome;
            ehPrimeira = false;
          } else {
            if (cidade.Nome.length === cidadeDeMaiorNome.length) {
              // console.log(cidade);
              // console.log(cidadeDeMaiorNome);
              cidadeDeMaiorNome =
                cidade.Nome.localeCompare(cidadeDeMaiorNome) < 0
                  ? cidade.Nome
                  : cidadeDeMaiorNome;
              // console.log(cidadeDeMaiorNome);
            }
            if (cidade.Nome.length < cidadeDeMaiorNome.length) {
              cidadeDeMaiorNome = cidade.Nome;
            }
          }
        });
        agrupaEstadosCidade.push(`${cidadeDeMaiorNome}-${estado.Sigla}`);
      });

      agrupaEstadosCidade = agrupaEstadosCidade.sort((a, b) => {
        if (a.length === b.length) {
          // console.log(a);
          // console.log(b);
          return a.localeCompare(b);
        }
        return a.length - b.length;
      });

      return res.json(agrupaEstadosCidade[0]);
    });
  });
});

app.get("/:uf", (req, res) => {
  const { uf } = req.params;

  console.log(`${uf}`);

  fs.readFile(`${uf}.json`, (err, data) => {
    if (err) {
      res.json({ message: "Erro ao ler a UF" });
    }
    const cidades = JSON.parse(data);

    res.json({ countCidade: cidades.length });
  });
});

app.listen(3333, () => {
  console.log("Rodando na porta 3333");
});
