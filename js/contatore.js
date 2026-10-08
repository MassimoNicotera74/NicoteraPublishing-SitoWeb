(function () {
  var el = document.getElementById('visite'), box = document.getElementById('visite-box');
  if (!el || !box || !window.fetch) return;
  var tries = 0;
  var t = setInterval(function () {
    if (++tries > 40) { clearInterval(t); return; }
    if (!(window.goatcounter && window.goatcounter.get_data)) return;
    clearInterval(t);
    var p = window.goatcounter.get_data()['p'] || '/';
    fetch('https://nicoterapublishing.goatcounter.com/counter/' + encodeURIComponent(p) + '.json')
      .then(function (r) { return r.json(); })
      .then(function (d) {
        var n = d && (d.count !== undefined ? d.count : d.count_unique);
        if (n === undefined || n === null || n === '') return;
        el.textContent = n;
        box.hidden = false;
      })
      .catch(function () {});
  }, 250);
})();
