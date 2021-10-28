/**
 * Skæri, blað, steinn.
 * Spilað gegnum console.
 */

/** Hámarks fjöldi best-of leikja, ætti að vera jákvæð heiltala stærri en 0 */
const MAX_BEST_OF = 10;

/** Global breyta sem heldur utan um heildar sigra */
let wins = 0;

/** Global breyta sem heldur utan um heildar töp */
let losses = 0;

let matches = 0;

/**
 * Athugar hvort gefin tala sé gild sem best-of gildi.
 * @param {number} bestOf Tala sem skal athuga
 * @return {boolean} true eða false
 */
function isValidBestOf(bestOf) {
    bestOf = parseInt(bestOf, 10)
    if(bestOf%2 == 1 && bestOf < 10) {
        return true;
    }

    return false;

}
//console.assert(isValidBestOf(1) === true, '1 er valid best of');
//console.assert(isValidBestOf(2) === false, '2 er ekki er valid best of');
//console.assert(isValidBestOf(9) === true, '9 er valid best of');

function playAsText(play) {
    if(parseInt(play) == 1){
        return 'Skæri';
    }
    else if(parseInt(play) == 2){
        return 'Blað';
    }
    else if(parseInt(play) == 3){
        return 'Steinn';
    }
    else return 'Óþekkt';
}
//console.assert(playAsText('1') === 'Skæri', '1 táknar skæri');
//console.assert(playAsText('2') === 'Blað', '2 táknar blað');
//console.assert(playAsText('3') === 'Steinn', '3 táknar steinn');
//console.assert(playAsText('foo') === 'Óþekkt', 'Annað er óþekkt');

/**
 * Athugar hvort spilari eða tölva vinnur.
 * @param {number} player Það sem spilari spilaði
 * @param {number} computer Það sem tölva spilaði
 * @returns -1 ef tölva vann, 0 ef jafntefli, 1 ef spilari vann
 */
function checkGame(player, computer) {
    if(player == computer){
        return 0;
    }
    if(player == 1 && computer == 2 || player == 2 && computer == 3 || player == 3 && computer == 1){
        return 1;
    }
    if(player == 1 && computer == 3 || player == 2 && computer == 1 || player == 3 && computer == 2){
        return -1;
    }    
}
//console.assert(checkGame('1', '2') === 1, 'Skæri vinnur blað');
//console.assert(checkGame('2', '3') === 1, 'Blað vinnur stein');
//console.assert(checkGame('3', '1') === 1, 'Steinn vinnur skæri');
//console.assert(checkGame('1', '1') === 0, 'Skæri og skæri eru jafntefli');
//console.assert(checkGame('1', '3') === -1, 'Skæri tapar fyrir stein');

/**
 * Spilar einn leik.
 * @return {boolean} -1 ef tölva vann, 0 ef jafntefli, 1 ef spilari vann.
 */
function round() {
  // TODO útfæra
  // 1. Spyrja um hvað spilað, ef cancel, hætta
  let choice = prompt('Veldu skæri(1), blað(2) eða stein(3)...');
  if(choice == null){
      alert('Þú hefur hætt við.');
  }
  // 2. Ef ógilt, tölva vinnur
  choice = parseInt(choice, 10);
  if(choice != 1 && choice != 2 && choice != 3){
      alert('Ólöglegt gildi, tölvan vinnur!');
      return -1;
  }
  // 3. Velja gildi fyrir tölvu með `Math.floor(Math.random() * 3) + 1` sem skilar heiltölu á [1, 3]
  let computer = Math.floor(Math.random() * 3) + 1;
  // 4. Nota `checkGame()` til að finna hver vann
  let result = checkGame(choice, computer);
  if(result == 1){
      alert(`${playAsText(choice)} sigrar ${playAsText(computer)}. Þú sigrar.`);
      return 1;
  }
  if(result == 0){
      alert(`${playAsText(choice)} og ${playAsText(computer)} eru jöfn.`);
      return 0;
  }
  if(result == -1){
      alert(`${playAsText(computer)} sigrar ${playAsText(choice)}. Þú tapar.`);
      return -1;
  }    
  // 5. Birta hver vann
  // 6. Skila hver vann
}
// Hér getum við ekki skrifað test þar sem fallið mun biðja notanda um inntak!

/**
 * Spilar leik og bætir útkomu (sigur eða tap) við í viðeigandi global breytu.
 */
function play() {
  // 1. Spyrja um fjölda leikja
  let rounds = prompt('Best of ___? Must be an odd number. Must be less than 10');

  // 2. Staðfesta að fjöldi leikja sé gilt gildi
  if(isValidBestOf(rounds) === false){
      return console.error('ólöglegur fjöldi.')
  }
  else rounds = parseInt(rounds, 10);
  let wincondition = ((rounds + 1 )/2);
  let p = 0;
  let c = 0;
  while(Math.max(p,c) < wincondition){
      let result = round();
      if(result == 1){
          p++;
      }
      if(result == -1){
          c++;
      }
      alert(`Staðan er spilari: ${p}, tölva: ${c}. `);
      }
      alert(`leik lokið. leikurinn fór spilari: ${p}, tölva: ${c}. `);
      matches++;
      if(p>c){
          wins++;
      } else{
          losses++;
      }


  // 3. Keyra fjölda leikja og spila umferð þar til sigurvegari er krýndur
  // 4. Birta hvort spilari eða tölva vann
}
// Hér getum við ekki skrifað test þar sem fallið mun biðja notanda um inntak!

/**
 * Birtir stöðu spilara.
 */
function games() {
  alert(`Þú hefur spilað ${matches} leiki. ${wins} sigrar og ${losses} töp. ${Math.round((wins/matches)*100)}% sigurhlutfall.`)
}
// Hér getum við ekki skrifað test þar sem fallið les úr global state
