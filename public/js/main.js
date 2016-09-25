function importScript (sSrc, successFn, errorFn) {
  var script = document.createElement("script");
  script.type = 'text/javascript';
  script.onerror = errorFn;
  script.src = sSrc;
  script.onload = function () {
    successFn();
  };
  document.head.appendChild(script);
}

function toString(input) {
  if (typeof input === 'object') {
    return _.keys(input).join(', ');
  }
  return '' + input;
}

document.addEventListener("DOMContentLoaded", function () {
  var textBox = document.querySelector('#notification');
  document.querySelector('#urlForm').onsubmit = function (event) {
    event.preventDefault();
    var origKeys = Object.keys(window);
    importScript(document.querySelector('#urlInput').value, function () {
      var newKeys = Object.keys(window);
      var diff = _.difference(newKeys, origKeys);
      var text = '';
      diff.forEach(function (d) {
        text += d + ': ' + toString(window[d]) + '<br>';
        delete window[d];
      });
      textBox.innerHTML = text;
    }, function (errEvent) {
      errEvent.preventDefault();
      textBox.textContent = "Failed to load " + errEvent.target.src;
    });
  };
});
