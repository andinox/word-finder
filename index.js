const { Builder, By, Key, until } = require('selenium-webdriver');
const lib = require('./lib.js')
let driver = new Builder().forBrowser('chrome').build();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function ENTER() {
    await driver.findElement(By.css(`div[data-lettre=_entree]`)).click();
}

async function len() {
    let stop = false;
    let i = 1;
    while(!stop) {
        try {
            let grille = await driver.findElement(By.css(`table > tr :nth-child(${i})`));
            i++;
        } catch(err) {
            stop = !stop;
        }
    }
    return i-1;
}

async function setWord(word) {
    for (let i = 1; i < word.length; i++) {
        await driver.findElement(By.css(`div[data-lettre=${word[i]}]`)).click();
    }
}

async function getNewLetter(n) {
    lib.letterReset();
    const buttons = await driver.findElements(By.className(`lettre-mal-place`));
    for (let i = 0; i < buttons.length; i++) {
        let name = await buttons[i].getText();
        lib.setknowNotPos(name);
    }
    const buttons3 = await driver.findElements(By.className(`lettre-non-trouve`));
    for (let u = 0; u < buttons3.length; u++) {
        let name = await buttons3[u].getText();
        lib.setNotletter(name);
    }
    for (let l = 0; l < len(); l++) {
        
    }
    lib.prunt();
}


(async function main() {
    try {
       await driver.get('https://sutom.nocle.fr');
       await driver.findElement(By.id('panel-fenetre-bouton-fermeture')).click();
       const lenght = await len();
       lib.init(lenght);
       const firstLetter = await driver.findElement(By.css('#grille > table > tr > td')).getText();
       lib.addLetterKnowPos(0,firstLetter);
       await lib.init_words();
       let word = lib.getRandomWord();
       await setWord(word);
       console.log(`The choosen word is : "${word}"`);
       await ENTER();
       await sleep(2000); //wait 10s
       await getNewLetter(1);
       //====
       lib.WordsListFilter();
       word = lib.getRandomWord();
       console.log(`The choosen word is : "${word}"`);
       await setWord(word);
       await ENTER();
       await sleep(2000);
       await getNewLetter(2);
       //===
       lib.WordsListFilter();
       word = lib.getRandomWord();
       console.log(`The choosen word is : "${word}"`);
       await setWord(word);
       await ENTER();
       await sleep(2000);
       await getNewLetter(3);
       //====
       lib.WordsListFilter();
       word = lib.getRandomWord();
       console.log(`The choosen word is : "${word}"`);
       await setWord(word);
       await ENTER();
       await sleep(2000);
       await getNewLetter(4);
       //====
       lib.WordsListFilter();
       word = lib.getRandomWord();
       console.log(`The choosen word is : "${word}"`);
       await setWord(word);
       await ENTER();
       await sleep(2000);
       await getNewLetter(5);
       //===
       lib.WordsListFilter();
       word = lib.getRandomWord();
       console.log(`The choosen word is : "${word}"`);
       await setWord(word);
       await ENTER();
       await sleep(2000);
       await getNewLetter(6);
    } finally {
       //await driver.quit();
    }
})();