(function () {
  var btn = document.getElementById('copy-btn');
  var status = document.getElementById('copy-status');
  if (!btn || !status) return;
  var timer;
  var MSG_OK = 'Copied! Paste it and compare with the address in Jupiter.';
  var MSG_FAIL = 'Copy failed. Select the address and copy it manually.';
  function show(msg, ok) {
    status.textContent = msg;
    status.className = 'status' + (ok ? '' : ' err');
    clearTimeout(timer);
    timer = setTimeout(function () { status.textContent = ''; }, 4000);
  }
  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    document.body.removeChild(ta);
    return ok;
  }
  btn.addEventListener('click', function () {
    var text = btn.getAttribute('data-copy');
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(
        function () { show(MSG_OK, true); },
        function () { var ok = fallbackCopy(text); show(ok ? MSG_OK : MSG_FAIL, ok); }
      );
    } else if (fallbackCopy(text)) {
      show(MSG_OK, true);
    } else {
      show(MSG_FAIL, false);
    }
  });
})();
