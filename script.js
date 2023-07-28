//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;
let audioPlayer;


//Questions and Options array

const quizArray = [
    {
        id: "0",
        question: "Koi Mile To Mujhko Batana Ishq Kare Jo Meri Tarah..",
        options: ["Tu kam se kam yeh toh bata  Kya chaahe tera dil", "Main na ponhchoon kyu wahan pe Jaana chaahoonn main jahan", "Jaao Kahan Se Laoge Aisa Tujhpe Mare Jo Meri Tarah", "Aisa mera hashar hai bann gaya  Jo pehle mehkhana tha woh ghar hai bann gaya"],
        correct: "Jaao Kahan Se Laoge Aisa Tujhpe Mare Jo Meri Tarah",
        songURL: "audio/song0.mp3",
    },
    {
        id: "1",
        question: "Jis pal na chaha tujhko, Uss pal sazayein maangi..",
        options: ["Jaise gadhi ke gihra se, Waqt kahin pe gira ho,", "Paya Hai Maine Phir Tujhe", "Apna hi Rab le lenge", "Ye zindagi jee lenge Main aur Tum        "],
        correct: "Paya Hai Maine Phir Tujhe",
        songURL: "audio/song1.mp3",
    },
    {
        id: "2",
        question: "Dil kho gaya, ho gaya kisi ka,",
        options: ["Ab raasta mil gaya kushi ka", "Ho jaaye judaa...", " Ud udke teri zulfein, ", "payal mein chhan chhan,"],
        correct: "Ab raasta mil gaya kushi ka",
        songURL: "audio/song2.mp3",
    },
    {
        id: "3",
        question: "Tumhe kaise main bataun, kya main paa gaya hoon, Tum jo mere saath ho,",
        options: ["Mujhe tum mil gye", "Sab mil gya", "Kuch hosh na rha", "Mujhko duniya mil gayi hai, zindagi badal gayi hai"],
        correct: "Mujhko duniya mil gayi hai, zindagi badal gayi hai",
        songURL: "audio/song3.mp3",
    },
    {
        id: "4",
        question: "Duawan mangda, Main tere layin duawan mangda",
        options: ["Haar jawaan tu je raazi, Tere baajon mera mol na", "Main jithe jithe jawaan heeriye, Sang tera parchhawan mangda", "chera hoon tere ghr ka", "Mera ho jaaye woh na der kari"],
        correct: "Main jithe jithe jawaan heeriye, Sang tera parchhawan mangda",
        songURL: "audio/song4.mp3",
    },
    {
        id: "5",
        question: "Club mein ghusenge haath pakad ke",
        options: ["Koi pyaar na krta", "Stag Entry wale dekhenge sarh ke", "Punjabi mein maarenge burrah bad ke", "Sundar ladkiyan charon ore"],
        correct: "Stag Entry wale dekhenge sarh ke",
        songURL: "audio/song5.mp3",
    }, {
        id: "6",
        question: "Kabse mein dar dar phir raha , Musafir dil ko panaah de",
        options: ["Sukhi padi dil ki iss zameen ko bhigaa de..", "Tu aawargi ko meri aaj thehra de…", "Ho sake toh thoda pyaar jata de…", "Aye humnava mujhe apna bna le"],
        correct: "Tu aawargi ko meri aaj thehra de…",
        songURL: "audio/song6.mp3",
    },
    {
        id: "7",
        question: "Dhadkanen meri sun, Tujhko main kar loon haasil",
        options: ["Lagi hai yahi dhun", "Dil ibadat kar raha hai", "Kuch haseen pal main chun", "None"],
        correct: "Lagi hai yahi dhun",
        songURL: "audio/song7.mp3",
    },
    {
        id: "8",
        question: "Chal woh chaubare dhoonde, Jin mein chahat ki boonde",
        options: ["oh maahi..", "Kya tere baajon mera", "Sach karde sapno ko sabhi,Aankhon ko meeche meeche", "Dil vich tere yaara mainu rehn de"],
        correct: "Sach karde sapno ko sabhi,Aankhon ko meeche meeche",
        songURL: "audio/song8.mp3",
    },
    {
        id: "9",
        question: "Jaag ke ratiyaan roz bitaawan, Isse aage ab main kya kahoon",
        options: ["Isse aage ab main kya kahoon", "Tu meri hai meri hi rahegi", "mai sirf aur sirf tera", "O yaara tujhe bolti ankhiyan sadke jawaan, Maang le pakiyan aaj duawaan"],
        correct: "O yaara tujhe bolti ankhiyan sadke jawaan, Maang le pakiyan aaj duawaan",
        songURL: "audio/song9.mp3",
    },
];


//Restart Quiz
restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
    "click",
    (displayNext = () => {

        if (audioPlayer) {
            audioPlayer.pause();
            audioPlayer = null;
        }

        //increment questionCount
        questionCount += 1;
        //if last question
        if (questionCount == quizArray.length) {
            //hide question container and display score
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            //user score
            userScore.innerHTML =
                "Your score is " + scoreCount + " out of " + questionCount;
        } else {
            //display questionCount
            countOfQuestion.innerHTML =
                questionCount + 1 + " of " + quizArray.length + " Question";
            //display quiz
            quizDisplay(questionCount);
            count = 11;
            clearInterval(countdown);
            timerDisplay();
        }
    })
);

//Timer
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    //Hide other cards
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    //display current question card
    quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
    //randomly sort questions
    quizArray.sort(() => Math.random() - 0.5);
    //generate quiz
    for (let i of quizArray) {
        //randomly sort options
        i.options.sort(() => Math.random() - 0.5);
        //quiz card creation
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        //question number
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
        //question
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        //options
        div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
        quizContainer.appendChild(div);
    }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
        document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");
    audioPlayer = new Audio(quizArray[questionCount].songURL);
    audioPlayer.play();

    //if user clicked answer == correct option stored in object
    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
        //For marking the correct option
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }


    //clear interval(stop timer)
    clearInterval(countdown);
    //disable all options
    options.forEach((element) => {
        element.disabled = true;
    });
}

//initial setup
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});

//hide quiz and display start screen
window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};