const submit_button = document.querySelector("#autotest__submit")

const body = document.querySelector("body");
const BASE_URL = body.dataset.baseUrl;

submit_button.addEventListener("click", async (e) => {
    e.preventDefault();

    const url = window.location.href.split("/");
    const file = await fetch(`${BASE_URL}content/autotests/${url[url.length - 3]}/${url[url.length - 2]}.json`);
    const data = await file.json();

    EvaluateAutotest(data);
})

function EvaluateAutotest(data) {
    let right_answers = 0;
    let questions = document.querySelectorAll('.question');

    questions.forEach((question, i) => {
        let answers = question.querySelectorAll('.answer');

        const question_data = data.questions[i];
        answers.forEach((answer, j) => {
            const answer_data = question_data.answers[j];
            let input = answer.querySelector("input");

            if (input.dataset.answer == question_data.right_answer && input.checked) {
                answer.classList.add("answer--correct");
            } else if (input.dataset.answer == question_data.right_answer && !input.checked) {
                answer.classList.add("answer--right");
            }

            if (input.dataset.answer != question_data.right_answer && input.checked) {
                answer.classList.add("answer--incorrect");
            }
        })
    })
}
