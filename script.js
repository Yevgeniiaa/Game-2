console.clear();

const questions = [];
let answers = [];

//підключили зовнішні дані
fetch("https://opentdb.com/api.php?amount=50&difficulty=easy&type=multiple")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response error");
    }
    return response.json();
  })
  .then((data) => {
    for (let i = 0; i < 50; i++) {
      questions.push(data["results"][i].question.trim());
      answers.push(
        data["results"][i].correct_answer
          .split("")
          .map((item) => item.toUpperCase())
          .join("")
      );
    }
  });

const question = document.querySelector(".question");
const answer = document.querySelector(".answer");

let random = Math.trunc(Math.random() * 50);
setTimeout(function () {
  console.log(answers[random]);
  question.innerHTML = questions[random];
  for (let i = 0; i < answers[random].length; i++) {
    let element = document.createElement("p");
    answer.appendChild(element);
    let ps = document.querySelectorAll("p");

    let letters = document.querySelectorAll(".letter");

    for (let i = 0; i < letters.length; i++) {
      letters[i].addEventListener("click", function () {
        for (let g = 0; g < answers[random].length; g++) {
          if (answers[random][g] === this.textContent) {
            ps[g].textContent = this.textContent;
          }
        }
        if (Array.from(ps).every((item) => item.textContent !== "")) {
          alert("Правильно! Ви відгадали!");
          window.location.reload();
        }
      });
    }
  }
}, 5000);

//&quot; - лапки