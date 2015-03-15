Guess Word Robot
=====================================

Introduction
------------

The robot is designed to play "a game" automatically. It's a word guessing game for two or more players. One player thinks of a word, phrase or sentence and the other tries to guess it by suggesting letters or numbers.

For detailed rules, just search "One player thinks of a word" on wikipedia and you will get it:)

This robot will guess 80 words, and each word allows 10 failure attempts.

### Algorithm

The strategy, to be simple, is to guess the letter which appears most frequently among the remaining possible words.

We will need to get a good dictionary first; the one I am using is from http://www-personal.umich.edu/~jlawler/wordlist.html. 

Then we will classify all the words by word length; like "boy" will be put into the basket of "3-letter words", and "burst" into "5-letter words", etc.

Every time we get a word, we know it's length and it's pattern (like "\*AB\*\*"). We will then go to the corresponding basket and pick out all the words following this pattern.

We will count the letter frequency among all these letters, and next guess will be "the most frequent letter that haven't been guessed yet".

### User Guide

To run the auto guessing, you can follow instructions below:

* Firstly, you need to tell the system about your connection information. Create a file called connection.js and write your id and server address in it, like this:
```javascript
var serviceURL = "https://www.domain-name.com/game/on";
var userId = "yourId";
```
* Open robot.html
* Choose word list (currently using words.txt) and click on "Process words".
* When you see an information started with "loaded:", it means the dictionary is loaded and robot is ready to go.
* You can click on "Robot go!" to start the guessing.
* When you see the message "done!", guessing is finished. You can check the score, and submit it once you are happy with it.

Another manual guessing tool is also available, it's designed for testing each REST call, but it's fun to play with it as well. Keep in mind that you cannot go through the dictionary as easily as the robot does:) To use it, you can follow instructions below:

* Open index.html
* There are 5 buttons on the page; from their name you can easily tell what they are for. Attention that "give me a word" includes a "getResult" call as well, for convenience propose.
* play around and have fun!

### Version info

0.0.1 

* basic algorithm
* scored 716

0.0.2 

* take 5 most often used suffixes into consideration
* scored 1014

0.0.3 

* handle errors better: if we fail to get a word or guess a letter, do it again
* score is not improved though...

0.0.4 

* improve UI a bit

### Known Issues and To Be Improved

* Add more log info when robot is running, this will help the user to understand the process.
* Currently the program looks stuck when it's running; It takes about 15 minutes to finish the process. It's hard to reduce the time, as most of the time it's waiting for response from server. One thing we can do is using promise to avoid synchronized call, and thus we can display some info on the page when processing the algorithm, to prevent user from getting bored.
* algorithm optimization: what I think of now is introducing 3 word lists: very often used words, often used words and all words. When we go into the case that 2 letters has the same frequency in the total word list, the letter that makes the word appear in the 1st or 2nd word list will have a higher priority.
* find a better dictionary. SCOWL (http://wordlist.aspell.net/) looks like a good one; it can be used in next version.

### References

#### letter frequency

http://en.wikipedia.org/wiki/Letter_frequency

#### word list

http://www-personal.umich.edu/~jlawler/wordlist.html
http://www.oxfordlearnersdictionaries.com/wordlist/english/oxford3000/
http://wordlist.aspell.net/


