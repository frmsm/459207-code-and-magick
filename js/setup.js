'use strict';

var setup = document.querySelector('.setup');

setup.classList.remove('hidden');

var FIRST_NAMES = ['Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'];

var LAST_NAMES = ['да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'];

var COAT_COLORS = ['rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'];

var EYES_COLORS = ['black',
  'red',
  'blue',
  'yellow',
  'green'];

var getRandom = function (wizardAttribute) {
  return wizardAttribute[Math.floor(Math.random() * wizardAttribute.length)];
};

// Формирование объектов
var wizards = [];
var wizardsCount = 4;

var addWizardsSetup = function (objArray, count) {
  for (var i = 0; i < count; i++) {
    objArray[i] = {
      name: getRandom(FIRST_NAMES) + ' ' + getRandom(LAST_NAMES),
      coatColor: getRandom(COAT_COLORS),
      eyesColor: getRandom(EYES_COLORS),
    };
  };
};

addWizardsSetup(wizards, wizardsCount);

// Вставка персонажей
var templateElement = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');


// Оформление стиля мага
var getWizardStyle = function (template, objArr) {
  var setupFragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    var wizardElement = template.cloneNode(true);
    var wizardNode = wizardElement.querySelector('.wizard');
    wizardElement.children[1].textContent = objArr[i].name; // Запись имени мага в setup-similar-label
    wizardNode.children[0].style.fill = objArr[i].coatColor; // заливка цветом плаща
    wizardNode.children[2].style.fill = objArr[i].eyesColor; // заливка цветом глаз
    setupFragment.appendChild(wizardElement);
  }
  return setupFragment;
};

var wizardFragment = getWizardStyle(templateElement, wizards);


var setupSimilar = document.querySelector('.setup-similar');
setupSimilar.classList.remove('hidden');

var wizardList = document.querySelector('.setup-similar-list');
wizardList.appendChild(wizardFragment);

