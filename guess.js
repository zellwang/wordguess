var classifiedWords = new Array(20);
var totalWordCount = 0;
var letterCount = new Array(26);

String.prototype.replaceAllStars = stringReplaceAllStars;

function stringReplaceAllStars(ARepText){
    raRegExp = new RegExp(/\*/g);
    return this.replace(raRegExp,ARepText);
}

function preprocessWords()
{
    $("#done").html(document.URL);
    initClassifiedWords();
    clearLetterCount();
    var file = document.getElementById("file").files[0]; 
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function(f){
        var words = this.result;
        var result = document.getElementById("result");
        var splittedWords = words.split("\r\n");
        for(var index in splittedWords){
            var word = splittedWords[index];
            var lengthClass = (word.length>20) ? 20 : word.length;
            classifiedWords[lengthClass].push(word);
        }
        result.innerHTML = "loaded: " + classifiedWords[3][1] + " " + classifiedWords[7][5] + " etc..";
    }
}

function initClassifiedWords()
{
    for(var i=1; i<=20; i++) 
    { 
        classifiedWords[i]=new Array();
    }
}

function dealWithOneWord()
{
    giveMeAWord();
    while (word.indexOf("*") >= 0 && wrongGuessCountOfCurrentWord < 10)
    {
        var wordLength = word.length;
        letterFromRobot = getNextGuessLetter(wordLength);
        makeAGuess();
    }
}

function printDoneMessage()
{
    $("#done").html("done! " + document.URL);
}

function startRobot()
{
    isRobot = true;
    startGame();
    while(totalWordCount < 80)
    {
        dealWithOneWord();
        clearGuessedLetters();
        clearLetterCount();
        totalWordCount ++;
        getResult();
    }
    printDoneMessage();
}

function isWordMatch(wordFromDictionary, wordFromServer)
{
    var pattern = wordFromServer.replaceAllStars("[a-z]");
    var regExp = new RegExp(pattern, 'g');
    return regExp.test(wordFromDictionary);
}

function updateLetterCount(word)
{
    for (var i=0; i<word.length; i++)
    {
        var position = word.charCodeAt(i) - 96;
        letterCount[position] += 1;
    }
}

function getMostFrequentUnappearedLetter()
{
    var biggestOccurence = 0;
    var biggestOccurenceIndex = 0;
    for (var i=1; i<=26; i++)
    {
        if ((letterCount[i] > biggestOccurence) && !(guessedLetters.indexOf(String.fromCharCode(i+96)) !== -1))
        {
            biggestOccurence = letterCount[i];
            biggestOccurenceIndex = i;
        }
    }
    return String.fromCharCode(biggestOccurenceIndex+96);
}

function clearLetterCount()
{
    for(var i=1; i<=26; i++) 
    { 
        letterCount[i]=0;
    }
}

function clearGuessedLetters()
{
    // is this the best solution?
    guessedLetters = [];
}

function getNextGuessLetter(wordLength)
{
    var subdictionary = classifiedWords[wordLength];
    for (var index in subdictionary)
    {
        var wordFromDictionary = subdictionary[index];
        if (isWordMatch(wordFromDictionary, word))
        {
            updateLetterCount(wordFromDictionary);
        }
    }
    var nextLetter = getMostFrequentUnappearedLetter();
    
    return nextLetter;
}