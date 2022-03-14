const fetch = require('node-fetch');
const fs = require('fs')

notAcceptLetter = ['é','è','â','ï','î','ê','û','ô'];
knowPos = [];
knowNotPos = [];
NotPosOnHere = [];
notOnTheWord = [];
words = [];
wordlen = 0;


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function prunt() {
    for (let i = 0; i < words.length; i++) {
        console.log(words[i])
    }
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

}

function getRandomWord() {
    const u = getRandomInt(wordlen);
    return words[u];
}



module.exports = {
    init,
    init_words,
    WordsListFilter,
    addLetterKnowPos,
    getRandomWord
}