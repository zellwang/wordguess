var sessionId = "";
var letters = "etaoinshrdlcumwfgypbvkjxqz";
var isRobot = false;
var letterFromRobot = "";
var guessingLetter = "";

var word;
var totalWordCount;
var wrongGuessCountOfCurrentWord;
var guessedLetters = new Array();

function sendPostRequest(action)
{
    $.ajax({
        type: 'POST',
        async: false,
        timeout: 10000,
        url: serviceURL,
        dataType: "json",
        data: getJSONData(action),
        contentType: "application/json",
        success: function(res) {
            console.log(res);
            processData(action, res);
        },
        error: function(res) {
            console.log(res);
        }
    });
}

function getJSONData(action)
{
    var json;
    switch (action)
    {
        case "startGame":
            json = {
                "playerId": "zellwang@126.com",
                "action": "startGame"
            };
            break;
        case "nextWord":
            json = {
                "sessionId": sessionId,
                "action": "nextWord"
            };
            break;
        case "guessWord":
            guessingLetter = isRobot ? letterFromRobot : $("#letter").val();
            console.log("guessing " + guessingLetter);
            json = {
                "sessionId": sessionId,
                "guess": guessingLetter.toUpperCase(),
                "action": "guessWord"
            };
            break;
        case "getResult":
            json = {
                "sessionId": sessionId,
                "action": "getResult"
            };
            break;
        case "submitResult":
            json = {
                "sessionId": sessionId,
                "action": "submitResult"
            };
            break;
        default:
            console.log("wrong action");
            return;
    }
    return JSON.stringify(json);
}

function processData(action, res)
{
    switch (action)
    {
        case "startGame":
            processStartGameData(res);
            break;
        case "nextWord":
            processGetWordData(res);
            break;
        case "guessWord":
            processGuessData(res);
            break;
        case "getResult":
            processGetResultData(res);
            break;
        case "submitResult":
            processSubmissionCompleteData(res);
            break;
        default:
            console.log("wrong action");
    }
}

function startGame()
{
    var result = false;
    sendPostRequest("startGame");
    return result;
}

function processStartGameData(data)
{
    if (data.message == "THE GAME IS ON")
    {
        sessionId = data.sessionId;
        $("#sessionId").html(sessionId);
        return true;
    }
    return false;
}

function giveMeAWord()
{
    sendPostRequest("nextWord");
}

function processGetWordData(data)
{
    if (data.sessionId == sessionId)
    {
        word = data.data.word;
        totalWordCount = data.data.totalWordCount;
        console.log("totalWordCount: " + totalWordCount);
        wrongGuessCountOfCurrentWord = data.data.wrongGuessCountOfCurrentWord;
        $("#word").html(word);
        $("#totalWordCount").html(totalWordCount);
        $("#wrongGuessCountOfCurrentWord").html(wrongGuessCountOfCurrentWord);
        getResult();
        return true;
    }
    return false;
}

function makeAGuess()
{
    sendPostRequest("guessWord");
}

function processGuessData(data)
{
    if (data.sessionId == sessionId)
    {
        word = data.data.word;
        console.log(word);
        totalWordCount = data.data.totalWordCount;
        wrongGuessCountOfCurrentWord = data.data.wrongGuessCountOfCurrentWord;
        guessedLetters.push(guessingLetter);
        $("#word").html(word);
        $("#totalWordCount").html(totalWordCount);
        $("#wrongGuessCountOfCurrentWord").html(wrongGuessCountOfCurrentWord);
        $("#letter").val("");
        return true;
    }
    return false;
}

function getResult()
{
    sendPostRequest("getResult");
}

function processGetResultData(data)
{
    if (data.sessionId == sessionId)
    {
        console.log("score: " + data.data.score);
        $("#correctWordCount").html(data.data.correctWordCount);
        $("#totalWrongGuessCount").html(data.data.totalWrongGuessCount);
        $("#score").html(data.data.score);
        return true;
    }
    return false;
}

function submitScore()
{
    sendPostRequest("submitResult");
}

function processSubmissionCompleteData(data)
{
    if (data.sessionId == sessionId)
    {
        $("#submitted").html("submitted "+data.data.datetime);
        $("#score").html(data.data.score);
        return true;
    }
    return false;
}