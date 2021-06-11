/// @ts-check
/// <reference path=".gitpod/p5.global-mode.d.ts" />
"use strict";

/* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library

   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */




/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */

const UITLEG = 0;
const SPELEN = 1;
const GAMEOVER = 2;
var spelStatus = UITLEG;

var spelerX = 1100; // x-positie van speler
var spelerY = 500; // y-positie van speler

var kogelX = 0;    // x-positie van kogel
var kogelY = 0;    // y-positie van kogel

var vijandkogelX = 0;   // x-positie van vijandkogel
var vijandkogelY = 0;   // y-positie van vijandkogel

var vijandX = 50;   // x-positie van vijand
var vijandY = 60;   // y-positie van vijand

var score = 0; // aantal behaalde punten

var speed = 5;

var kogels = [] 
var lastkogelDT = Date.now()

var vijandkogels = []
var lastkogelDT2 = Date.now()

/* ********************************************* */
/*      functies die je gebruikt in je game      */
/* ********************************************* */


/**
 * Tekent het speelveld
 */
var tekenVeld = function () {
  fill(200, 200, 200);
  rect(20, 20, width - 2 * 20, height - 2 * 20);
};


/**
 * Tekent de vijand
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenVijand = function(x, y) {
    fill ('black');
    ellipse (x, y, 50, 50);

};


/**
 * Tekent de kogel of de bal
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenKogel = function(x, y) {
    fill ('black');
    ellipse (x, y, 10, 10);

};


/**
 * Tekent de speler
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenSpeler = function(x, y) {
  fill("pink");
  ellipse(x, y, 50, 50);
} ;


/**
 * Tekent de vijandkogel
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenvijandKogel = function(x, y) {
    fill('red');
    ellipse (x, y, 10, 10);
}


/**
 * Updatet globale variabelen met positie van vijand of tegenspeler
 */

var beweegVijand = function() {
    if (vijandX < 100) {
        speed = 6;
    }
    if (vijandX > 1200) {
        speed = -6;
    };
    /**
      if (vijandX > 100 && vijandX < 1200) {
        speed = random(-6, 10);
    } */

    vijandX = vijandX + speed;
    vijandY = 60; 
};


/**
 * Updatet globale variabelen met positie van kogel of bal
 */


var beweegKogels = function(kogels = []) {
    if (keyIsDown(32)) {
      //tekenKogel(kogelX = spelerX, kogelY = spelerY)
      if(kogels.length == 0 || (Date.now() - lastkogelDT) > 250 ) {
        var kogel = [spelerX, spelerY]
        kogels.push(kogel)
        lastkogelDT = Date.now();
      }
    };

    kogels.forEach(
        element => {
            element[1] = element[1] -8    
    });

    kogels.forEach(
        element => {
            tekenKogel(element[0], element[1])
    });
    
} ;


var vijandKogel = function(vijandkogels = []) {
    if (vijandX > 100) {
        if (vijandkogels.length == 0 || (Date.now() - lastkogelDT2 > 400)) {
            var vijandkogel = [vijandX, vijandY]
            vijandkogels.push(vijandkogel)
            lastkogelDT2 = Date.now();
        }
    };

    vijandkogels.forEach(
        element => {
            element[1] = element[1] + 8
    });
    
    vijandkogels.forEach(
        element => {
            tekenvijandKogel(element[0], element[1])
    });
};


/**
 * Kijkt wat de toetsen/muis etc zijn.
 * Updatet globale variabele spelerX en spelerY
 */
var beweegSpeler = function() {
    if (keyIsDown(37) && spelerX > 20) {
        spelerX = spelerX - 6;
    }
    if (keyIsDown(39) && spelerX < 1208) {
        spelerX = spelerX + 6;
    }
    if (keyIsDown(38) && spelerY > 20) {
        spelerY = spelerY - 6;
    }
    if (keyIsDown(40) && spelerY < 648) {
        spelerY = spelerY + 6;
    }
};


/**
 * Zoekt uit of de vijand is geraakt
 * @returns {boolean} true als vijand is geraakt
 */
var checkVijandGeraakt = function() {
    if (vijandX - kogelX < 50 && vijandX - kogelX > -50 && vijandY - kogelY < 50 && vijandY - kogelY > -50) {return true;}

  else {return false;}
};


/**
 * Zoekt uit of de speler is geraakt
 * bijvoorbeeld door botsing met vijand
 * @returns {boolean} true als speler is geraakt
 */
var checkSpelerGeraakt = function() {
    
    return false;
}


/**
 * Zoekt uit of het spel is afgelopen
 * @returns {boolean} true als het spel is afgelopen
 */
var checkGameOver = function() {
    
  return false;
};


/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1280, 720);

  // Kleur de achtergrond blauw, zodat je het kunt zien
  background('blue');
}



/**
 * draw
 * de code in deze functie wordt meerdere keren per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  switch (spelStatus) {

    case UITLEG:
    background('white');
    textSize(30);
    text('Gebruik de pijltjes toetsen om te bewegen', 420, 300, 500, 400)
    text('Gerbuik de spatie toets om te schieten', 400, 400, 700, 300)
    text('Klik enter om te starten', 500, 500, 500, 500)

    if (keyIsDown(13)) {
        spelStatus = SPELEN
    };

    break;

    case SPELEN:
      background(20, 10, 20);
      tekenVeld();
      beweegVijand();

      beweegKogels(kogels);
      vijandKogel(vijandkogels);
      beweegSpeler();
      
      if (checkVijandGeraakt()) { 
        // punten erbij
        // nieuwe vijand maken
      }
      
      if (checkSpelerGeraakt()) {
        spelStatus = GAMEOVER;
      }

      
      tekenVijand(vijandX, vijandY);
      tekenKogel(kogelX, kogelY);
      tekenSpeler(spelerX, spelerY);
      tekenvijandKogel(vijandkogelX, vijandkogelY);

      if (checkGameOver()) {
        spelStatus = GAMEOVER;
      }
      break;

      case GAMEOVER:
        background('white')
        text('GAMEOVER', 200, 200, 200, 200);
      break;

      if (keyIsDown(13)) {
          spelStatus = UITLEG
      };
  }
}

