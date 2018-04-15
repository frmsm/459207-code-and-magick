'use strict';

var setup = document.querySelector('.setup');

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
  }
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


var similarSetup = document.querySelector('.setup-similar');
similarSetup.classList.remove('hidden');

var wizardList = document.querySelector('.setup-similar-list');
wizardList.appendChild(wizardFragment);

// Открытие и закрытие окна настройки персонажа
var setupOpenBlock = document.querySelector('.setup-open');
var setupCloseBlock = document.querySelector('.setup-close');
var setupOpenIcon = document.querySelector('.setup-open-icon');
var setupUserNameField = document.querySelector('.setup-user-name');
var saveButton = document.querySelector('.setup-submit');
var wizardSetup = document.querySelector('.setup-wizard');
var fireballSetup = document.querySelector('.setup-fireball-wrap');
var form = document.querySelector('.setup-wizard-form');

var WIZARD_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var FIREBALL = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

setupOpenIcon.tabIndex = 0;
setupCloseBlock.tabIndex = 0;
saveButton.tabIndex = 0;

var KEY_ENTER = 13;
var KEY_ESC = 27;

var onSetupClick = function () {
  addEvents();
};

var onSetupEnterKeyDown = function (e) {
  if (e.keyCode === KEY_ENTER) {
    addEvents();
  }
};

var onSetupCloseClick = function () {
  removeEvents();
};

var onSetupCloseEscKeyDown = function (e) {
  if (e.keyCode === KEY_ESC) {
    if (e.target === setupUserNameField) {
      e.stopPropagation();
      return;
    }
    removeEvents();
  }
};

var onSetupCloseEnterKeyDown = function (e) {
  if (e.keyCode === KEY_ENTER) {
    removeEvents();
  }
};

var checkEnterOnUserNameField = function (e) {
  if (e.keyCode === KEY_ENTER) {
    e.preventDefault();
    setupUserNameField.blur();
    setupUserNameField.removeEventListener('keydown', checkEnterOnUserNameField);
  }
};

var onSaveDataKeyDown = function (e) {
  if (e.keyCode === KEY_ENTER) {
    removeEvents();
  }
};

// Функция изменения цвета
var changeColor = function (target, wizardElement) {
  if (target.className.baseVal !== wizardElement) {
    return;
  }
  if (!target.style.fill) {
    target.style.fill = WIZARD_COLORS[1];
  } else if (WIZARD_COLORS.indexOf(target.style.fill) + 1 === WIZARD_COLORS.length) {
    target.style.fill = 'black';
  } else {
    target.style.fill = WIZARD_COLORS[WIZARD_COLORS.indexOf(target.style.fill) + 1];
  }
};

var onEyesClick = function (e) {
  changeColor(e.target, 'wizard-eyes');
};

var onCoatClick = function (e) {
  changeColor(e.target, 'wizard-coat');
};

var onFireBallClick = function (e) {
  if (e.currentTarget.className !== 'setup-fireball-wrap') {
    return;
  }
  if (e.currentTarget.children[1].value === '#ee4830') {
    e.currentTarget.children[1].value = FIREBALL[1];
    e.currentTarget.style.backgroundColor = FIREBALL[1];
  } else if (FIREBALL.indexOf(e.currentTarget.children[1].value) + 1 === FIREBALL.length) {
    e.currentTarget.children[1].value = '#ee4830';
    e.currentTarget.style.backgroundColor = '#ee4830';
  } else {
    e.currentTarget.children[1].value = FIREBALL[FIREBALL.indexOf(e.currentTarget.children[1].value) + 1];
    e.currentTarget.style.backgroundColor = FIREBALL[FIREBALL.indexOf(e.currentTarget.children[1].value) + 1];
  }
};

var sendForm = function (e) {
  e.preventDefault();

  var data = [];
  data.push('Wizard name: ' + form.querySelector('.setup-user-name').value);
  data.push('Wizard eyes: ' + form.querySelector('.wizard-eyes').style.fill);
  data.push('Wizard coat: ' + form.querySelector('.wizard-coat').style.fill);
  data.push('Wizard fireball: ' + form.querySelector('.setup-fireball-wrap').style.backgroundColor);

  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://js.dump.academy/code-and-magick', true);

  xhr.setRequestHeader('Content-type', 'multipart/form-data');

  xhr.onreadystatechange = function () {
    if (this.readyState !== 4) {
      return;
    }
  };

  xhr.send(data);
  removeEvents();
};

var removeEvents = function () {
  setup.classList.add('hidden');
  setupCloseBlock.removeEventListener('click', onSetupCloseClick);
  setupCloseBlock.removeEventListener('keydown', onSetupCloseEnterKeyDown);
  document.removeEventListener('keydown', onSetupCloseEscKeyDown);
  setupOpenBlock.addEventListener('click', onSetupClick);
  setupOpenIcon.addEventListener('keydown', onSetupEnterKeyDown);
  saveButton.removeEventListener('keydown', onSaveDataKeyDown);
  wizardSetup.removeEventListener('click', onEyesClick);
  wizardSetup.removeEventListener('click', onCoatClick);
  fireballSetup.removeEventListener('click', onFireBallClick);
  form.removeEventListener('submit', sendForm);
};

var addEvents = function () {
  setup.classList.remove('hidden');
  setupCloseBlock.addEventListener('click', onSetupCloseClick);
  setupCloseBlock.addEventListener('keydown', onSetupCloseEnterKeyDown);
  document.addEventListener('keydown', onSetupCloseEscKeyDown);
  setupCloseBlock.removeEventListener('click', onSetupClick);
  setupOpenIcon.removeEventListener('keydown', onSetupEnterKeyDown);
  setupUserNameField.addEventListener('keydown', checkEnterOnUserNameField);
  saveButton.addEventListener('keydown', onSaveDataKeyDown);
  wizardSetup.addEventListener('click', onEyesClick);
  wizardSetup.addEventListener('click', onCoatClick);
  fireballSetup.addEventListener('click', onFireBallClick);
  form.addEventListener('submit', sendForm);
};

setupOpenBlock.addEventListener('click', onSetupClick);
setupOpenIcon.addEventListener('keydown', onSetupEnterKeyDown);


