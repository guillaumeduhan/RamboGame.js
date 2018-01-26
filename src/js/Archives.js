// Créer une fonction qui anime le nain
// this.animate = function() {
//   setInterval(function(){
//     a = parseFloat(a) - 10 + 'px';
//     containerNain.style.left = a;
//     if (parseFloat(containerNain.style.left) < 0) {
//       a = 0;
//       $('.nain').addClass('mort');
//       // setTimeout(function(){
//       //    document.body.removeChild(containerNain);
//       //  }, 1000);
//     }
//   }, 20)
// }

if (rect1.x < rect2.x + rect2.w &&
    rect1.x + rect1.w > rect2.x &&
    rect1.y < rect2.y + rect2.h &&
    rect1.h + rect1.y > rect2.y)

if (parseFloat(projectile.style.left) > parseFloat(nain.style.left) + parseFloat(nain.style.width) && 
parseFloat(projectile.style.left) + parseFloat(projectile.style.width) > parseFloat(nain.style.left) &&
parseFloat(projectile.style.top) < parseFloat(nain.style.top) + parseFloat(nain.style.height) &&
parseFloat(projectile.style.height) + parseFloat(projectile.style.top) > parseFloat(nain.style.top))

rect1 : Projectile
rect2 : Nain 

var objet = {
  
}

var projectile = {x: projectile.style.left, y:projectile.style.top, w: projectile.style.width, h: projectile.style.height}
var kamikaze = {x: nain.style.left, y:nain.style.top, w: nain.style.width, h: nain.style.height}

projectile: {x: 'projectile.style.left', y: 'projectile.style.top', w: 'projectile.style.width', h: 'projectile.style.height'}
kamikaze: {x: 'nain.style.left', y: 'nain.style.top', w: 'nain.style.width', h: 'nain.style.height'}

var data = {
  hauteur: window.innerHeight,
  largeur: window.innerWidth,
  boite: window.document.getElementById('container'),
  rambo: window.document.getElementById('contenu'),
  nain: window.document.getElementById('mob'),
  background: window.document.getElementById('map'),
  projectile: {
    x: 'projectile.style.left',
    y: 'projectile.style.top',
    w: 'projectile.style.width',
    h: 'projectile.style.height'}
  kamikaze: {
    x: 'nain.style.left',
    y: 'nain.style.top',
    w: 'nain.style.width',
    h: 'nain.style.height'},
  x: 0,
  y: 0,
  vitesse: 40,
  tir: new Audio('./medias/gunshoot.mp3'),
  explosion: new Audio('./medias/boom.mp3'),
  avancementX: -40,
  avancementY: 0,
  gameOver: false,
}

$('#container_boss').animate({left: parseFloat(data.largeur - 500), top: '300px'}, 2500, function(){
  // Le boss s'arrête
  $('#container_boss').stop();
  $('#guillaume').removeClass('marche');
  // Le boss tir
  setTimeout(function(){
    $('#guillaume').addClass('deferlante');
    console.log('le boss tir');
  }, 100)
  // Le boss repart
  setTimeout(function(){
    $('#guillaume').removeClass('deferlante');
    $('#guillaume').addClass('marche');
    console.log('le boss arrete et repart');
    $('#container_boss').animate({left: parseFloat(data.largeur - 150), top: '500px'}, 2500, function(){
    console.log('Position 2');
    });
  }, 2000)
  // Le boss tir à nouveau
  setTimeout(function(){
    $('#guillaume').addClass('deferlante');
    console.log('le boss tir à nouveau');
  }, 4500)
  // Le boss repart à sa position initiale
  setTimeout(function(){
    $('#guillaume').removeClass('deferlante');
    $('#guillaume').addClass('marche');
    console.log('le boss arrete et repart à sa position initiale');
    $('#container_boss').animate({left: parseFloat(data.largeur - 140), top: '100px'}, 2500, function(){
    console.log('Position 3');
    });
  }, 7000)
  setTimeout(function(){
    $('#guillaume').addClass('deferlante');
    console.log('le boss tir à nouveau');
  }, 9500)
});
      
  // Si une balle atteint Rambo, il meurt
  
  (parseFloat(projectile.style.left) < parseFloat(data.x) + parseFloat(data.cadre.w)
  && parseFloat(projectile.style.left) + parseFloat(projectile.style.width) < parseFloat(data.x)
  && parseFloat(projectile.style.top) > parseFloat(data.y) + parseFloat(data.cadre.h) 
  && parseFloat(projectile.style.height) + parseFloat(projectile.style.top) < parseFloat(data.y))
      
      
      
      
      
      