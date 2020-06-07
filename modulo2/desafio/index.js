const express = require("express");
const fs = require("fs").promises;

const app = express();

app.use(express.json());

app.post("/grade", async (req, res) => {
  const { student, subject, type, value, timestamp } = req.body;

  try {
    const data = await fs.readFile("grades.json");
    const gradesJson = JSON.parse(data);

    const grade = {
      id: gradesJson.nextId,
      student,
      subject,
      type,
      value,
      timestamp,
    };

    gradesJson.grades.push(grade);
    gradesJson.nextId += 1;

    // console.log(grades);

    await fs.writeFile("grades.json", JSON.stringify(gradesJson));

    res.json(grade);
  } catch (error) {
    res.json({ erro: error });
  }
});

app.post("/notatotal", async (req, res) => {
  const { student, subject } = req.body;

  try {
    const data = await fs.readFile("grades.json");
    const gradesJson = JSON.parse(data);

    let nota = 0;

    gradesJson.grades.forEach((grade) => {
      if (grade.student === student && grade.subject === subject) {
        nota += grade.value;
      }
    });

    res.json(nota);
  } catch (error) {
    console.log(error);
    res.json({ erro: error });
  }
});

app.post("/mediagrade", async (req, res) => {
  const { subject, type } = req.body;

  try {
    const data = await fs.readFile("grades.json");
    const gradesJson = JSON.parse(data);

    let nota = 0;
    let count = 0;

    gradesJson.grades.forEach((grade) => {
      if (grade.type === type && grade.subject === subject) {
        nota += grade.value;
        count += 1;
      }
    });

    res.json(nota / count);
  } catch (error) {
    console.log(error);
    res.json({ erro: error });
  }
});

app.post("/melhoresgrades", async (req, res) => {
  const { subject, type } = req.body;

  try {
    const data = await fs.readFile("grades.json");
    const gradesJson = JSON.parse(data);

    const gradesMap = gradesJson.grades
      .filter((grade) => grade.type === type && grade.subject === subject)
      .sort((a, b) => {
        return b.value - a.value;
      });

    const retorno = [];

    if (gradesMap.length > 0) {
      for (var i = 0; i < 3; i++) {
        retorno.push(gradesMap[i]);
      }
    }

    res.json(retorno);
  } catch (error) {
    console.log(error);
    res.json({ erro: error });
  }
});

app.put("/grade", async (req, res) => {
  const { id, student, subject, type, value } = req.body;

  try {
    const data = await fs.readFile("grades.json");
    const gradesJson = JSON.parse(data);

    const gradeIndex = gradesJson.grades.findIndex((g) => g.id === id);

    if (gradeIndex === -1) {
      throw new Error("Grade não existe");
    }

    gradesJson.grades[gradeIndex].student = student;
    gradesJson.grades[gradeIndex].subject = subject;
    gradesJson.grades[gradeIndex].type = type;
    gradesJson.grades[gradeIndex].value = value;

    await fs.writeFile("grades.json", JSON.stringify(gradesJson));

    res.json(gradesJson.grades[gradeIndex]);
  } catch (error) {
    console.log(error);
    res.json({ erro: error });
  }
});

app.delete("/grade", async (req, res) => {
  const { id } = req.body;

  try {
    const data = await fs.readFile("grades.json");
    const gradesJson = JSON.parse(data);

    const gradeIndex = gradesJson.grades.findIndex((g) => g.id === id);

    gradesJson.grades.splice(gradeIndex, 1);

    await fs.writeFile("grades.json", JSON.stringify(gradesJson));

    res.json(gradesJson.grades);
  } catch (error) {
    console.log(error);
    res.json({ erro: error });
  }
});

app.get("/grade/:id", async (req, res) => {
  const { id } = req.params;

  console.log(id);

  try {
    const data = await fs.readFile("grades.json");
    const gradesJson = JSON.parse(data);

    const grade = gradesJson.grades.find((g) => g.id === parseInt(id));

    res.json(grade);
  } catch (error) {
    console.log(error);
    res.json({ erro: error });
  }
});

app.listen(3333, () => {
  console.log("Rodando na porta 3333");
});
