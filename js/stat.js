'use strict';

window.renderStatistics = function (ctx, names, times) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(110, 20, 420, 270);

  ctx.fillStyle = '#fff';
  ctx.fillRect(100, 10, 420, 270);

  ctx.fillStyle = '#000';
  ctx.font = '16px PT mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', 120, 30);
  ctx.fillText('Список результатов:', 120, 50);

  // Создаём объект достижений игроков
  var score = []; // достижения игроков
  var i; // индексная переменная
  for (i = 0; i < names.length; i++) {
    score[i] = {
      name: names[i],
      time: times[i]
    };
  }

  var maxScore = score[0].time; // максимальное достижение

  // Поиск максимального значения
  for (i = 1; i < score.length; i++) {
    if (score[i].time > maxScore) {
      maxScore = score[i].time;
    }
  }

  // Отрисовка гистограммы
  i = 0;
  for (var columnHeight = 0, columnPosition = 140; i < score.length; i++, columnPosition += 80) {
    ctx.fillStyle = score[i].name === 'Вы' ? 'rgba(255, 0, 0, 1)' : 'rgba(0,0,' + Math.round(Math.random() * 255) + ',1)';
    columnHeight = Math.round(score[i].time * 150 / maxScore);
    ctx.fillRect(columnPosition, 95 + (150 - columnHeight), 40, columnHeight);
    ctx.fillStyle = '#000';
    ctx.font = '16px PT mono';
    ctx.textBaseline = 'hanging';
    ctx.fillText(score[i].name, columnPosition, 250);
    ctx.fillText(Math.round(score[i].time), columnPosition, 75 + (150 - columnHeight));
  }
};

