/**
 * @author Thuan Naheem Pakeer
 * UoW Number: w1953854
 * IIT Student Number: 20210627
 */

const qnIDArray = ["qn1", "qn2", "qn3", "qn4", "qn5", "qn6", "qn7", "qn8", "qn9", "qn10"];

const correctAnsID = ["q1Ans1", "q2Ans2", "q3Ans3", "q4Ans4", "q5Ans2", "q6Ans4", "q7Ans1", "q8Ans3", "q9Ans2", "q10Ans1"];

const nextqnBtnIDArray = ["nextQnBtn1", "nextQnBtn2", "nextQnBtn3", "nextQnBtn4", "nextQnBtn5", "nextQnBtn6", "nextQnBtn7", "nextQnBtn8", "nextQnBtn9", "nextQnBtn10"];

const score = document.getElementById("score");

let scoreCount = 0;
let userAnsID = "";
let timer;
let timerCountDown;
let timeTaken;
let countDown = 59;
let showTimeID = document.getElementById("timer");

function startQuiz() {
    timerCountDown = setInterval(function () {
        timerFunction()
    }, 1000);
    document.getElementById("instructions").style.display = "none";
    document.getElementById("questions").classList.add("show");
    timer = setTimeout( function() {
        alert("Time's up!")
        getFinalRemarks()
    }, 60000);
}

function timerFunction() {
    if (countDown !== 0) {
        if (countDown === 1) {
            showTimeID.innerHTML = countDown + " second left";
        } else {
            showTimeID.innerHTML = countDown + " seconds left";
        }
        countDown = countDown - 1;
    }
    timeTaken = 60 - countDown;
}

function getValue(selectedAnsID) {
    userAnsID = selectedAnsID;
}

function confirmAns(confirmBtnID, questionNumber) {
    if (userAnsID === correctAnsID[questionNumber]) {
        scoreCount++;
    } else if (userAnsID === "") {
        alert("No option has been selected");
    } else {
        document.getElementById(userAnsID).style.backgroundColor = "red";
    }
    document.getElementById(correctAnsID[questionNumber]).style.backgroundColor = "darkgreen";
    document.getElementById(nextqnBtnIDArray[questionNumber]).disabled = false;
    document.getElementById(confirmBtnID).disabled = true;
    userAnsID = ""
}

function nextQuestion(questionNumber) {
    if (qnIDArray[questionNumber] === "qn10") {
        getFinalRemarks()
    } else {
        document.getElementById(qnIDArray[questionNumber]).style.display = "none";
        document.getElementById(qnIDArray[questionNumber + 1]).classList.add("show");
    }
}

function getFinalRemarks() {
    document.getElementById("questions").style.display = "none";
    document.getElementById("timer").style.display = "none";
    const result = document.getElementById("result");
    if (timeTaken === 60) {
        document.getElementById("timeTaken").innerText = "Time's up!"
    } else {
        document.getElementById("timeTaken").innerHTML = "You took " + timeTaken + " seconds";
        clearTimeout(timer);
        clearInterval(timerCountDown)
    }
    score.innerHTML = "You got " + scoreCount + "/10 questions right";
    if (scoreCount >= 5 && scoreCount < 10) {
        document.getElementById("smileyEmoji").style.display = "grid";
        result.classList.add("setTextColorToGreen");
        result.innerText = "Well done!";
    } else if (scoreCount < 5) {
        document.getElementById("sadEmoji").style.display = "grid";
        result.classList.add("setTextColorToRed");
        result.innerText = "Better luck next time!";
    } else {
        document.getElementById("starEmoji").style.display = "grid";
        result.classList.add("setTextColorToGold");
        result.innerText = "Extraordinary Stuff!";
    }
    document.getElementById("userResults").classList.add("show");
}