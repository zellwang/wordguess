var sessionId = "";
var serviceURL = "https://strikingly-hangman.herokuapp.com/game/on";
var letters = "etaoinshrdlcumwfgypbvkjxqz";
var userId = "zellwang@126.com";

function sendPostRequest(action)
{
    $.ajax({
        type: 'POST',
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
            json = {
                "sessionId": sessionId,
                "guess": $("#letter").val().toUpperCase(),
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
        $("#word").html(data.data.word);
        $("#totalWordCount").html(data.data.totalWordCount);
        $("#wrongGuessCountOfCurrentWord").html(data.data.wrongGuessCountOfCurrentWord);
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
        $("#word").html(data.data.word);
        $("#totalWordCount").html(data.data.totalWordCount);
        $("#wrongGuessCountOfCurrentWord").html(data.data.wrongGuessCountOfCurrentWord);
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