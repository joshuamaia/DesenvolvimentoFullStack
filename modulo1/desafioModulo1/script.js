let lista = [];

window.addEventListener(
  "load",
  () => {
    carregaAPI();
  },
  false
);

async function carregaAPI() {
  const api = await fetch(
    "https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo"
  );
  const json = await api.json();

  this.lista = json.results;

  this.lista = this.lista.map((row) => {
    return {
      sexo: row.gender,
      nome: row.name.first,
      sobrenome: row.name.last,
      idade: row.dob.age,
      foto: row.picture.thumbnail,
    };
  });

  // console.log(this.lista);
}

function pesquisar() {
  const inputValue = document.querySelector("#nome");
  const nome = inputValue.value;
  if (nome && nome.length > 0) {
    const listaUsuarios = document.querySelector("#listaUsuarios");
    const filterList = this.lista
      .filter((row) => {
        return (
          row.nome.toLowerCase().indexOf(nome.toLowerCase()) > -1 ||
          row.sobrenome.toLowerCase().indexOf(nome.toLowerCase()) > -1
        );
      })
      .sort((a, b) => {
        return a.nome.localeCompare(b.nome);
      });
    listaUsuarios.innerHTML = "";
    console.log(filterList);
    filterList.forEach((element) => {
      var div = document.createElement("div");
      var img = document.createElement("img");
      var span = document.createElement("span");
      div.style =
        "display: flex; justify-content: flex-start; align-items: center; border: 1px solid #4b0082; border-radius: 4px; margin: 5px;";
      img.src = `${element.foto}`;
      img.style = "border-radius: 50%;width: 50px; height: 50px; margin: 5px;";
      span.textContent = `${element.nome} ${element.sobrenome}, ${element.idade} anos`;
      div.appendChild(img);
      div.appendChild(span);
      listaUsuarios.appendChild(div);
    });
    const masculino = document.querySelector("#masculino");
    const feminino = document.querySelector("#feminino");
    const soma = document.querySelector("#soma");
    const media = document.querySelector("#media");
    const usuariosEncontrados = document.querySelector("#usuariosEncontrados");

    let contaMasculino = 0;
    let contaFeminino = 0;
    let somaMasculino = 0;
    let somaFeminino = 0;

    filterList.forEach((row) => {
      console.log(row);
      if (row.sexo === "male") {
        contaMasculino += 1;
        somaMasculino += row.idade;
      } else {
        contaFeminino += 1;
        somaFeminino += row.idade;
      }
    });
    usuariosEncontrados.textContent = `${
      contaFeminino + contaMasculino
    } usuários encontrados`;
    masculino.textContent = contaMasculino;
    feminino.textContent = contaFeminino;
    soma.textContent = somaFeminino + somaMasculino;
    media.textContent =
      contaFeminino + contaMasculino === 0
        ? "0"
        : (
            (somaFeminino + somaMasculino) /
            (contaFeminino + contaMasculino)
          ).toLocaleString("pt-BR", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          });
  }
}

function change(event) {
  event.preventDefault();
  if (event.key === "Enter") {
    event.preventDefault();
    console.log("Pressionei Enter");
    pesquisar();
  }
}
