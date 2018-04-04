'use strict';

var setup = document.querySelector('.setup');

setup.classList.remove('hidden');

var firstNames = ['Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'];

var lastNames = ['да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'];

var coatColors = ['rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'];

var eyesColors = ['black',
  'red',
  'blue',
  'yellow',
  'green'];

var wizards = [{
  name: firstNames[Math.floor(Math.random() * firstNames.length)]
  + ' ' + firstNames[Math.floor(Math.random() * lastNames.length)],
  coatColor: coatColors[Math.floor(Math.random() * coatColors.length)],
  eyesColor: eyesColors[Math.floor(Math.random() * eyesColors.length)]
}, {
  name: firstNames[Math.floor(Math.random() * firstNames.length)]
  + ' ' + firstNames[Math.floor(Math.random() * lastNames.length)],
  coatColor: coatColors[Math.floor(Math.random() * coatColors.length)],
  eyesColor: eyesColors[Math.floor(Math.random() * eyesColors.length)]
}, {
  name: firstNames[Math.floor(Math.random() * firstNames.length)]
  + ' ' + firstNames[Math.floor(Math.random() * lastNames.length)],
  coatColor: coatColors[Math.floor(Math.random() * coatColors.length)],
  eyesColor: eyesColors[Math.floor(Math.random() * eyesColors.length)]
}, {
  name: firstNames[Math.floor(Math.random() * firstNames.length)]
  + ' ' + firstNames[Math.floor(Math.random() * lastNames.length)],
  coatColor: coatColors[Math.floor(Math.random() * coatColors.length)],
  eyesColor: eyesColors[Math.floor(Math.random() * eyesColors.length)]
}];

// Вставка персонажей
var templateElement = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var setupFragment = document.createDocumentFragment();

for (var i = 0; i < wizards.length; i++) {
  var wizardElement = templateElement.cloneNode(true);
  var wizardNode = wizardElement.querySelector('.wizard');
  wizardElement.children[1].textContent = wizards[i].name; // Запись имени мага в setup-similar-label
  wizardNode.children[0].style.fill = wizards[i].coatColor; // заливка цветом плаща
  wizardNode.children[2].style.fill = wizards[i].eyesColor; // заливка цветом глаз
  setupFragment.appendChild(wizardElement);
}

var setupSimilar = document.querySelector('.setup-similar');
setupSimilar.classList.remove('hidden');

var wizardList = document.querySelector('.setup-similar-list');
wizardList.appendChild(setupFragment);

