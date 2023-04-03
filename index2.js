/**
 * @author Thuan Naheem Pakeer
 * UoW Number: w1953854
 * IIT Student Number: 20210627
 */

// Contains information of each question
const questionsInfo = [
    {
        qnIDArray: "qn1",
        correctAnsID: "q1Ans1",
        questBackgroundImg: "url(../1953854/Images/concertImage.jpg)",
    },
    {
        qnIDArray: "qn2",
        correctAnsID: "q2Ans2",
        questBackgroundImg: "url(../1953854/Images/footballImage.jpg)",
    },
    {
        qnIDArray: "qn3",
        correctAnsID: "q3Ans2",
        questBackgroundImg: "url(../1953854/Images/cinemaImage.jpg)",
    },
    {
        qnIDArray: "qn4",
        correctAnsID: "q4Ans3",
        questBackgroundImg: "url(../1953854/Images/cricketImage.jpg)",
    },
    {
        qnIDArray: "qn5",
        correctAnsID: "q5Ans4",
        questBackgroundImg: "url(../1953854/Images/concertImage2.jpg)",
    },
    {
        qnIDArray: "qn6",
        correctAnsID: "q6Ans1",
        questBackgroundImg: "url(../1953854/Images/cinemaImage2.jpg)",
    },
    {
        qnIDArray: "qn7",
        correctAnsID: "q7Ans3",
        questBackgroundImg: "url(../1953854/Images/expoImage.jpg)",
    },
    {
        qnIDArray: "qn8",
        correctAnsID: "q8Ans4",
        questBackgroundImg: "url(../1953854/Images/artImage.jpg)",
    },
    {
        qnIDArray: "qn9",
        correctAnsID: "q9Ans2",
        questBackgroundImg: "url(../1953854/Images/cinemaImage3.jpg)",
    },
    {
        qnIDArray: "qn10",
        correctAnsID: "q10Ans1",
        questBackgroundImg: "url(../1953854/Images/concertImage3.jpg)",
    },
]

// Initializing variables
let scoreCount = 0;
let userAnsID = "";
let timer;
let randNum;
let timerCountDown;
let timeTaken;
let countDown = 119;
let questNum = 1;
let lastArryIdx = 0;

// Initializing Constants
const score = document.getElementById("score");
const showTimeID = document.getElementById("timer");
const timeTakenID = document.getElementById("timeTaken");
const questNumID = document.getElementById("questionNumber");

// This function starts the quiz 
function startQuiz() {
    // Updates the timer which is displayed
    timerCountDown = setInterval(function () {
        timerFunction()
    }, 1000);
    document.getElementById("instructions").style.display = "none";
    document.getElementById("questions").classList.add("show");
    // Selects the first question
    questNumID.innerText = questNum;
    randNum = getRandNum();
    showQuestion(randNum);
    // Starts the timer
    timer = setTimeout( function() {
        alert("Time's up!")
        getFinalRemarks()
    }, 120000);
}

// This function displays the coutdown 
function timerFunction() {
    if (countDown !== 0) {
        if (countDown === 1) {
            showTimeID.innerHTML = countDown + " sec left";
        } else if (countDown > 60 && countDown !== 61) {
            showTimeID.innerHTML = "1 min and " + (countDown - 60) + " secs left";
        } else if (countDown === 61) {
            showTimeID.innerHTML = "1 min and " + (countDown - 60) + " sec left";
        } else {
            showTimeID.innerHTML = countDown + " secs left";
        }
        countDown = countDown - 1;
    }
    timeTaken = 120 - countDown;
}

// This function saves the user's answer
function getUserInput(selectedAnsID) {
    userAnsID = selectedAnsID;
}

// This function generates a random number
function getRandNum() {
    let randNumber = Math.floor(Math.random() * (questionsInfo.length - 1));
    return randNumber;
}

// This function gets the last index of an array
function getLastIndexofArray(array) {
    arrayLastIndex = array.length - 1
    return arrayLastIndex;
}

// This function displays the questions
function showQuestion(randomNumber) {
    lastArryIdx = getLastIndexofArray(questionsInfo);
    questNumID.innerText = questNum;
    let tempVar = questionsInfo[randomNumber];
    questionsInfo[randomNumber] = questionsInfo[lastArryIdx];
    questionsInfo[lastArryIdx] = tempVar;
    document.getElementById(questionsInfo[lastArryIdx].qnIDArray).classList.add("show");
    document.getElementById("questions").style.backgroundImage = questionsInfo[lastArryIdx].questBackgroundImg;
    questNum++;
}

// This function validates user answer, hides the current question and gets the next question
function handleAnswer(qnID) {
    lastArryIdx = getLastIndexofArray(questionsInfo);
    if (userAnsID === questionsInfo[lastArryIdx].correctAnsID) {
        scoreCount++;
    } else if (userAnsID === "") {
        alert("No option has been selected");
    } else {
        document.getElementById(userAnsID).style.backgroundColor = "red";
    }
    document.getElementById(questionsInfo[lastArryIdx].correctAnsID).style.backgroundColor = "darkgreen";
    if (questNum === 11) {
        getFinalRemarks()
    } else {
        document.getElementById(qnID).disabled = true;
        setTimeout(function() {
            document.getElementById(questionsInfo[lastArryIdx].qnIDArray).style.display = "none";
            questionsInfo.pop();
            userAnsID = ""
            randNum = getRandNum();
            showQuestion(randNum);
        }, 2000);
    }
}

// This function displays the user's statistics
function getFinalRemarks() {
    document.getElementById("questions").style.display = "none";
    document.getElementById("timer").style.display = "none";
    const result = document.getElementById("result");
    if (timeTaken === 120) {
        timeTakenID.innerText = "Time's up!";
    } else if (timeTaken > 60) {
        timeTakenID.innerHTML = "You took 1 minute and " + (timeTaken - 60) + " seconds";
    } else if (countDown === 61) {
        timeTakenID.innerHTML = "You took 1 minute and 1 second";
    } else {
        timeTakenID.innerHTML = "You took " + timeTaken + " seconds";
    }
    clearTimeout(timer);
    clearInterval(timerCountDown);
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
