const fetch = require('node-fetch');
const fs = require('fs')

knowPos = [];
knowNotPos = [];
NotPosOnHere = [];
notOnTheWord = [];
words = [];
wordlen = 0;

function letterReset() {
    knowNotPos = [];
    notOnTheWord = [];
}

function setNotletter(letter) {
    notOnTheWord.push(letter);
}

function setknowNotPos(letter) {
    knowNotPos.push(letter);
}

function setNotPosletter(letter,n) {
    NotPosOnHere[n] = letter;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }


function prunt() {
    console.log('knowPos:',knowPos);
    console.log('knowNotPos:',knowNotPos);
    console.log('NotPosOnHere:',NotPosOnHere);
    console.log('notOnTheWord:',notOnTheWord);
}

function init(l) {
    for (let i = 0; i < l; i++) {
        knowPos.push('*');
        NotPosOnHere.push('*');
    }
    wordlen = l;
}

function addLetterKnowPos(i,letter) {
    knowPos[i] = letter;
}

async function init_words() {
    const word = await fetch(`https://sutom.nocle.fr/js/mots/listeMotsProposables.${wordlen}.${knowPos[0]}.js`);
    let req_content = await word.text();
    req_content = req_content.split('\n');
    for (let i = 0; i < 16; i++) {
        req_content.shift();
    }
    for (let u = 0; u < 6; u++) {
        req_content.pop();
    }
    for (let j = 0; j < req_content.length; j++) {
        req_content[j] = req_content[j].replace('            "','');
        req_content[j] = req_content[j].replace('",','');
    }
    words = req_content;
    console.log(`words numbers: ${words.length}`);
}

function WordsListFilter() {
    newList = []
    let good = true;
    for (let u = 0; u < words.length; u++) {
        good = true;
        //console.log(words[u],'▼');
        for (let i = 0; i < wordlen; i++) {
            if (knowPos[i] != '*') {
               if (words[u][i] != knowPos[i]) {
                   good = false;
                   //console.log('>>>','not pos');
               }
            }
            if (NotPosOnHere[i] != '*'){
                if (words[u][i] == NotPosOnHere[i]) {
                    good = false;
                    //console.log('>>>','notposhere');
                }
            }
            for (let z =0; z < knowNotPos.length; z++) {
                if (words[u][i] == notOnTheWord[z]) {
                    good = false;
                    //console.log('>>>','wrong letter');
                }
            }
        }
        if (good) {
            newList.push(words[u]);
        } 
    }
    words = newList;
    //console.table(words);
    console.log(`words numbers: ${words.length}`);
}

function getRandomWord() {
    const u = getRandomInt(words.length);
    return words[u];
}



module.exports = {
    init,
    prunt,
    init_words,
    WordsListFilter,
    letterReset,
    addLetterKnowPos,
    getRandomWord,
    setNotletter,
    setNotPosletter,
    setknowNotPos
}