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

async function getNewLetter(c) {
    
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
       const word = lib.getRandomWord();
       await setWord(word);
       console.log(`The choosen word is : "${word}"`);
       await ENTER();
       getNewLetter(1);

    } finally {
       //await driver.quit();
    }
})();