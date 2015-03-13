var classifiedWords = new Array();

function preprocessWords()
{
    for(i=1; i<=20; i++) 
    { 
        classifiedWords[i]=new Array();
    }
    var file = document.getElementById("file").files[0]; 
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function(f){
        var words = this.result;
        var result = document.getElementById("result");
        var splittedWords = words.split("\r\n");
        for(var position in splittedWords){
            var word = splittedWords[position];
            var lengthClass = (word.length>20) ? 20 : word.length;
            classifiedWords[lengthClass].push(word);
        }
        result.innerHTML = "loaded: " + classifiedWords[3][1] + " " + classifiedWords[7][5] + " etc..";
    }
}

function startRobot()
{
    
}