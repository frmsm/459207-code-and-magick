'use strict';

var setup = document.querySelector('.setup');
var setupUserPic = setup.querySelector('input');

var onMouseDown = function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    setup.style.top = (setup.offsetTop - shift.y) + 'px';
    setup.style.left = (setup.offsetLeft - shift.x) + 'px';
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};

setupUserPic.addEventListener('click', function (e) {
  e.preventDefault();
});
setupUserPic.addEventListener('mousedown', onMouseDown);

var shopElement = document.querySelector('.setup-artifacts-shop');
var draggedItem = null;

shopElement.addEventListener('click', function (e) {
  if (e.target.tagName.toLowerCase() === 'img') {
    draggedItem = e.target;
  }
});

var artifactsElement = document.querySelector('.setup-artifacts');

artifactsElement.addEventListener('click', function (e) {
  if (!draggedItem && e.target.tagName.toLowerCase() === 'img') {
    draggedItem = e.target;
    return;
  } else if (!draggedItem && e.target.tagName.toLowerCase() !== 'img') {
    return;
  }
  if (draggedItem && e.target.tagName.toLowerCase() === 'img') {
    e.target.parentNode.style.backgroundColor = 'red';
    var changeColor = function () {
      e.target.parentNode.style.backgroundColor = '';
    };
    setTimeout(changeColor, 50);
    return;
  }
  var img = document.createElement('img');
  img.src = draggedItem.src;
  img.alt = draggedItem.alt;
  img.width = draggedItem.width;
  img.height = draggedItem.height;
  e.target.appendChild(img);
  draggedItem = null;
  e.preventDefault();
});

artifactsElement.addEventListener('dblclick', function (e) {
  if (e.target.tagName.toLowerCase() === 'img') {
    e.target.parentNode.style.backgroundColor = '';
    e.target.parentNode.removeChild(e.target);
    draggedItem = null;
  }
});
