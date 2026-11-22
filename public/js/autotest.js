const submit_button = document.querySelector("#autotest__submit")

const body = document.querySelector("body");
const BASE_URL = body.dataset.baseUrl;

const result_window = document.querySelector("#result");
const result_background = document.querySelector("#result-bg");
const result_progressbar = document.querySelector("#result__bar");
const result_progressbar_success_rate = document.querySelector("#result__success-rate");
const result_correct_answers = document.querySelector("#result__correct-answers");
const result_incorrect_answers = document.querySelector("#result__incorrect-answers");
const result_points = document.querySelector("#result__points");

submit_button.addEventListener("click", async (e) => {
    e.preventDefault();

    const url = window.location.href.split("/");
    const file = await fetch(`${BASE_URL}content/autotests/${url[url.length - 3]}/${url[url.length - 2]}.json`);
    const data = await file.json();

    EvaluateAutotest(data);
})

function EvaluateAutotest(data) {
    let right_answers = 0;
    let max_points = 0;
    let points = 0;

    let questions = document.querySelectorAll('.question');

    questions.forEach((question, i) => {
        const question_data = data.questions[i];
        let answers = question.querySelectorAll('.answer');

        max_points += question_data.points;
        answers.forEach((answer, j) => {
            // const answer_data = question_data.answers[j];
            let input = answer.querySelector("input");

            if (input.dataset.answer == question_data.right_answer && input.checked) {
                answer.classList.add("answer--correct");
                right_answers += 1;
                points += question_data.points;
            } else if (input.dataset.answer == question_data.right_answer && !input.checked) {
                answer.classList.add("answer--right");
            }

            if (input.dataset.answer != question_data.right_answer && input.checked) {
                answer.classList.add("answer--incorrect");
            }
        })
    })

    const success_rate = points / max_points;

    result_progressbar_success_rate.innerHTML = (success_rate * 100).toFixed(2) + "%";
    result_progressbar.style.width = (success_rate * 100) + "%";

    result_background.classList.remove("u-hidden");
    result_window.classList.remove("u-hidden");

    result_correct_answers.innerHTML = right_answers;
    result_incorrect_answers.innerHTML = questions.length - right_answers;

    result_points.innerHTML = points + " / " + max_points;
}
