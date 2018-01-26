// 25/01/2018 à 15:40:26

"use strict";

window.addEventListener('load', function(){

  // Mes variables
  
  var data = {
    startButton: window.document.getElementById('play'),
    startScreen: window.document.getElementById('chargement'),
    beforeButton: window.document.getElementById('commencer'),
    beforeScreen: window.document.getElementById('chargement_suite'),
    hauteur: window.innerHeight,
    largeur: window.innerWidth,
    boite: window.document.getElementById('container'),
    background: window.document.getElementById('map'),
    cadre: {
      x: 0 + 'px',
      y: 0 + 'px',
      w: 140 + 'px',
      h: 195 + 'px'
    },
    balle: {
      x: 0 + 'px',
      y: 0 + 'px',
      w: 25 + 'px',
      h: 25 + 'px'
    },
    salve: {
      x: 0 + 'px',
      y: 0 + 'px',
      w: 0 + 'px',
      h: 5 + 'px'
    },
    x: 0,
    y: 0,
    vitesse: 40,
    avancementX: -40,
    avancementY: 0,
    timeoutId: 0,
    compteur: 0,
    home: new Audio('./medias/home.mp3'),
    tir: new Audio('./medias/gunshoot.mp3'),
    explosion: new Audio('./medias/boom.mp3'),
    minigun: new Audio('./medias/minigun.mp3'),
    leBossApparait: false,
    gameOver: false,
    win: false
  }
  
  // Le jeu commence ici:
  
  var startGame = function(){
  
  // Fonction mouvement de Rambo
  
  function avancer(a) {
    data.x = data.x + a;
    data.boite.style.left = data.x + 'px';
  };
  
  function monter(a) {
    data.y = data.y + a;
    data.boite.style.top = data.y + 'px';
  };
  
  // Animation de data.rambo
  
  $(document).keydown(function(e) { // quand on appuie
    if(e.keyCode >= 36 && e.keyCode <= 41 && data.gameOver == false) {
      $('#contenu').addClass('court');
    } else if(e.keyCode == 65 && data.gameOver == false) {
      $('#contenu').addClass('tir');
      data.tir.play();
      data.tir.volume = 0.85;
    }
  });
  
  $(document).keyup(function(e) { // quand on appuie pas
    if(e.keyCode >= 36 && e.keyCode <= 41) {
      $('#contenu').removeClass('court');
    } else if(e.keyCode == 65) {
      $('#contenu').removeClass('tir');
      data.tir.pause();
      data.tir.currentTime = 0;
    }
  });
  
  // Touches clavier pour les infidèles
  
  window.onkeydown = function(event){

    var code = event.keyCode;
    
    switch(code){
      case 65:
        data.tir.play();
        var nouvelleBalle = new UsineABastos();
        nouvelleBalle.init();
        nouvelleBalle.animation();
      
      break;
      case 37: // gauche
        avancer(-data.vitesse);
        stop();
        
      break;
      case 38: // haut
        monter(-data.vitesse);
        stop();
        
      break;
      case 39: // droite 
        avancer(data.vitesse);
        stop();
        
      break;
      case 40: // bas
        monter(data.vitesse);
        stop();
        
      break;
    };
  };
  
  // Rambo peut se prendre pour Dieu mais je reste le maître du jeu
  
  function stop(){ // Rambo ne peut pas aller trop à gauche
    if (parseFloat(data.boite.style.left) < 0) {
      data.x = 0;
      data.vitesse = 0;
      data.boite.style.left = "0px"
    }
    else if (parseFloat(data.boite.style.top) < 0) { // Rambo ne peut pas aller trop en haut
      data.y = 0;
      data.vitesse = 0;
      data.boite.style.top = "0px"
    }
    else if ((parseFloat(data.boite.style.top) + (225)) > parseFloat(885)) { // Rambo ne peut pas aller trop en bas
      data.y = (885 - 225);
    }
    else if (parseFloat(data.boite.style.left) > (parseFloat(data.largeur) / 2) - 140) { // Rambo s'arrête à 50%
      data.x = (parseFloat(data.largeur) / 2) - 150;
      defilement();
    }
    else if (data.gameOver == false) { // Rambo n'a pas encore perdu
      data.vitesse = 40;
    }
    else if (data.gameOver == true) { // Rambo a perdu
      data.vitesse = 0;
    }
  }
  
  // Défilement du décor
  
  function defilement(){
    if (data.gameOver == false && data.leBossApparait == false){
      data.avancementX -= 40;
      data.background.style.backgroundPosition = data.avancementX + 'px ' + data.avancementY;
      mission(data.avancementX);
    }
  }
    
  /* Fonctions Constructeur */
  
  // Fonction Constructeur de Nains
  
  function SecteDeNains(a, b) {
    this.init = function() {
      
      // En tant que Dieu, je crée le cadre du nain
      var newDiv = document.createElement('div');
      var containerNain = document.body.appendChild(newDiv);
      containerNain.setAttribute('class', 'mob');
      containerNain.setAttribute('id', 'nain');
      containerNain.style.left = a;
      containerNain.style.top = b;
      containerNain.style.width = '140px';
      containerNain.style.height = '195px';
      // Je le positionne dans son cadre
      var newImg = document.createElement('img');
      var spriteNain = containerNain.appendChild(newImg);
      newImg.className = 'nain';
      newImg.src = './medias/nain-sprite.png';
      
      // J'anime mon nain
      this.animation = function(){
        // Je l'anime jusqu'au sacrifice
        $('.mob').animate({left: '0px'}, 4000, function(){
          $('.mob').stop();
          $('.nain').addClass('mort');
          data.explosion.play();
          // L'explosion divine
          setTimeout(function(){
            document.body.removeChild(containerNain);
          }, 1000);
          clearInterval(intId);
        });
        // Le business est en plein boom: Rambo meurt
        var intId = setInterval(function() {
          // Rambo ne peut éviter aucun nain
          if (data.x > parseFloat(containerNain.style.left)) {
            console.log('LE BUSINESS EST EN PLEIN BOOM');
            // Le nain explose puis disparaît
            $('.mob').stop();
            $('.nain').addClass('mort');
            setTimeout(function(){
              $('.mob').remove();
            }, 2000);
            clearInterval(intId);
            // Rambo meurt et reste sur place
            $('#contenu').addClass('fail')
            .removeClass('data.rambo');
            data.vitesse = 0;
            data.explosion.play();
            clearInterval(intId);
            data.gameOver = true;
          }
        }, 100)
      }
    }
  }

  // Fonction constructeur de Bastos
  
  function UsineABastos() {
    this.init = function() {
      
      // Je détermine mes cibles
      var nain = document.getElementById('nain');
      var boss = document.getElementById('container_boss');
      
      // Je détermine ma balle
      var nouvelleBalle = document.createElement("div");      
      var projectile = document.body.appendChild(nouvelleBalle);
      projectile.setAttribute('class', 'bastos');
      projectile.setAttribute('id', 'balle');
      projectile.style.top = parseFloat(data.boite.style.top) + 60 + "px";
      projectile.style.left = parseFloat(data.boite.style.left) + 120 + "px";
      projectile.style.width = data.balle.w;
      projectile.style.height = data.balle.h;
      
      // J'anime ma balle
      this.animation = function() {
        
        // Si elle atteint le mur, elle est détruite
        $('.bastos').animate({left: parseFloat(data.largeur - 25)}, 500, function(){
          this.remove()
        })
  
        // Si la balle touche un nain, il meurt
        if (nain) {
          var intId2 = setInterval(function() {
            if (parseFloat(projectile.style.left) > parseFloat(nain.style.left) + parseFloat(nain.style.width) && 
                parseFloat(projectile.style.left) + parseFloat(projectile.style.width) > parseFloat(nain.style.left) &&
                parseFloat(projectile.style.top) < parseFloat(nain.style.top) + parseFloat(nain.style.height) &&
                parseFloat(projectile.style.height) + parseFloat(projectile.style.top) > parseFloat(nain.style.top)){
                console.log('UN NAIN DE MOINS');
                // Le compteur est positionné
                data.compteur = data.compteur + 1;
                $('#compteur').html(data.compteur);
                // Le nain explose puis disparaît
                $('.mob').stop();
                $('.nain').addClass('mort');
                data.explosion.play();
                data.explosion.volume = 0.85;
                setTimeout(function(){
                // Une fois mort, je le replace à l'extérieur de l'écran
                  nain.style.left = data.largeur * 2 + "px";
                  $('.mob').remove();
                }, 1000);
                clearInterval(intId2);
              }
            }, 100);
          }
        // Si une balle atteint le boss, il meurt
        if (data.leBossApparait == true) {
          var intId3 = setInterval(function(){
            if (parseFloat(projectile.style.left) > parseFloat(boss.style.left) + parseFloat(boss.style.width)
            && parseFloat(projectile.style.left) + parseFloat(projectile.style.width) > parseFloat(boss.style.left)
            && parseFloat(projectile.style.top) < parseFloat(boss.style.top) + parseFloat(boss.style.height) 
            && parseFloat(projectile.style.height) + parseFloat(projectile.style.top) > parseFloat(boss.style.top)) {
              // Le boss meurt
              console.log('GAME OVER POUR LE BOSS');
              $('#container_boss').stop();
              $('#guillaume').removeClass('marche deferlante').addClass('win');
              data.win = true;
              clearInterval(intId3)
            }
          }, 0);
          // if (data.win == true) {
          //   clearInterval(intId3)
          // }
        }
      }
    }
  }
    
  // Fonction constructeur du Boss Final
    
  function BossFinal(){
    this.init = function(a, b){
      
      // Dernier niveau
      data.leBossApparait = true;
      
      // Je crée le container du boss
      var nouveauBoss = document.createElement("div");      
      var guillaume = document.body.appendChild(nouveauBoss);
      guillaume.setAttribute('id', 'container_boss');
      guillaume.style.top = a;
      guillaume.style.left = b;
      guillaume.style.width = data.cadre.w;
      guillaume.style.height = data.cadre.h;
      
      // Je place le boss à l'intérieur
      var newImg = document.createElement('img');
      var spriteBoss = guillaume.appendChild(newImg);
      newImg.id = 'guillaume';
      newImg.src = './medias/guillaume2-sprite.png';
      
      // Prototype UsineABastos pour le Boss
      UsineABastos.prototype.leBossTir = function(){
        this.init = function(){
          
          // Je place ma balle dans le cadre du Boss  
          var nouvelleBalle = document.createElement("div");    
          var projectile = document.body.appendChild(nouvelleBalle);
          projectile.setAttribute('class', 'bastos');
          projectile.setAttribute('id', 'balleBoss');      
          projectile.style.top = parseFloat(guillaume.style.top) + 80 + "px";
          projectile.style.left = parseFloat(guillaume.style.left) + 0 + "px";
          projectile.style.width = data.balle.w;
          projectile.style.height = data.balle.h;
          projectile.style.transform = 'scaleX(-1)';
          
          // J'anime la balle du boss
          this.animation = function() {
            // Si elle atteint le mur, elle disparaît
            $('.bastos').animate({left: parseFloat(-data.largeur - 25)}, 1000, function(){
              this.remove();
            })
          }
          // Si une balle atteint Rambo, il meurt = GAME OVER
          var intId4 = setInterval(function(){
            if (parseFloat(projectile.style.left) < parseFloat(data.x) + parseFloat(data.cadre.w)
            && parseFloat(projectile.style.left) + parseFloat(projectile.style.width) > parseFloat(data.x)
            && parseFloat(projectile.style.top) < parseFloat(data.y) + parseFloat(data.cadre.h) 
            && parseFloat(projectile.style.height) + parseFloat(projectile.style.top) > parseFloat(data.y)) {
              // Le boss meurt
              console.log('RAMBO EST TUER PAR LE BOSS');
              $('#contenu').addClass('fail')
              .removeClass('data.rambo');
              data.vitesse = 0;
              data.gameOver = true;
              clearInterval(intId4)
            }
          }, 0);
        }
      }
      
      // J'anime mon boss
      this.animation = function(){
        // Mon boss envoie des salves de fou
        function salve(){
          var salve = new UsineABastos.prototype.leBossTir();
          salve.init();
          salve.animation();
          data.minigun.play();
          data.minigun.volume = 0.85;
        }
        // Première position
        if (data.win == false) {
          data.timeoutId = setTimeout(function(){
            console.log('Départ');
            $('#guillaume').addClass('marche').removeClass('deferlante')
            $('#container_boss').animate({left: parseFloat(data.largeur - 420), top: '300px'}, 2000,
            function(){
              if (data.win == false) {
                $('#guillaume').removeClass('marche').addClass('deferlante');
                var intId1 = setInterval(salve, 200);
                setTimeout(function(){
                  clearInterval(intId1)          
                  data.minigun.pause();
                  data.minigun.currentTime = 0;
                }, 2000);
              }
            })
          })
        } else {
          clearTimeout(data.timeoutId)
        }
        // Deuxième position
        if (data.win == false) {
          data.timeoutId = setTimeout(function(){
            console.log('position 2');
            $('#guillaume').addClass('marche').removeClass('deferlante')
            $('#container_boss').animate({left: parseFloat(data.largeur - 140), top: '600px'}, 2000,
            function(){
              if (data.win == false) {
                $('#guillaume').removeClass('marche').addClass('deferlante');
                var intId1 = setInterval(salve, 200);
                setTimeout(function(){
                  clearInterval(intId1)          
                  data.minigun.pause();
                  data.minigun.currentTime = 0;
                }, 2000);
              }
            })
          }, 4000)
        } else {
          clearTimeout(data.timeoutId)
        }
        // Troisième position puis retour à la première
        if (data.win == false) {
          data.timeoutId = setTimeout(function(){
            console.log('Position 3');
            $('#guillaume').addClass('marche').removeClass('deferlante')
            $('#container_boss').animate({left: parseFloat(data.largeur - 140), top: '100px'}, 2000, 
            function(){
              if (data.win == false) {
                $('#guillaume').removeClass('marche').addClass('deferlante');
                var intId1 = setInterval(salve, 200);
                setTimeout(function(){
                  clearInterval(intId1)          
                  data.minigun.pause();
                  data.minigun.currentTime = 0;
                }, 2000);
              }
            })
          }, 8000)
        } else {
          clearTimeout(data.timeoutId)
        }
      }
    }
  }
    
  // La mission commence ici
  function mission(e){
    if (e % 1200 === 0) {
      console.log('un nain pop');
      var nouveauNain = new SecteDeNains(parseFloat(data.largeur) + 'px', Math.floor(Math.random() * 500) + 'px');
      nouveauNain.init();
      nouveauNain.animation();
    }
  }
    
    // var guillaumeLeBossFinal = new BossFinal();
    // guillaumeLeBossFinal.init('100px', parseFloat(data.largeur) - 140 + 'px');
    // guillaumeLeBossFinal.animation();
    // var intIdAnim = setInterval(guillaumeLeBossFinal.animation, 12000)
    // 
  }
  
  startGame();
  
  // data.home.play();
  // data.minigun.volume = 0.85;
  // data.startButton.addEventListener('click', function(){
  //   document.body.removeChild(data.startScreen);
  // })
  // 
  // data.beforeButton.addEventListener('click', function(){
  //   document.body.removeChild(data.beforeScreen);
  //   data.home.pause();
  //   startGame();
  // })
    
});

// Fin
  
  // Au chargement du jeu, screen de départ:
  
  
  
  // Le jeu commence!

  // setTimeout(function(){
  //   var nouveauNainDeux = new SecteDeNains(parseFloat(data.largeur - 140) + 'px', '150px');
  //   nouveauNainDeux.init();
  //   nouveauNainDeux.animation();
  // }, 6000)
  // 
  // setTimeout(function(){
  //   var nouveauNainQuatre = new SecteDeNains(parseFloat(data.largeur - 140) + 'px', '300px');
  //   nouveauNainQuatre.init();
  //   nouveauNainQuatre.animation();
  // }, 12000)
  // 
  
  // function check(){
  //   if (nain) {
  //     console.log('existe');
  //   } else {
  //     console.log("n'existe pas");
  //   }
  // }
  // check();

// fin

/* Liste des Tâches

  - les addEventListener (3 niveaux puis le boss final)
  - l'écran de chargement (DOM onload?), l'écran d'accueil avec le CV, l'écran gameover, l'écran de fin
  
// Liste des bugs

*/
