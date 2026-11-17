/* ============================================================
   Baseball IQ — reporting.js
   Remembers who is playing, and sends a result row to a Google
   Sheet each time a player finishes a position.

   ------------------------------------------------------------
   SETUP — paste your Google Apps Script URL below.
   Until you do, the site works exactly as before and simply
   does not report anything. Nothing breaks if this is left blank.
   ------------------------------------------------------------ */

const Reporting = (() => {

  /* vvv  PASTE YOUR WEB APP URL BETWEEN THE QUOTES  vvv
     It looks like:
     https://script.google.com/macros/s/AKfycb..................../exec   */

  const REPORT_URL = 'https://script.google.com/macros/s/AKfycbzLkk3ANcDgpiP5im8qOSYxxR6XD6zATl2tBwK2w84JqR7t8vMhiw0kILrGwqD5tUC7aQ/exec';

  /* ^^^  nothing below here needs editing  ^^^ */


  const STORAGE_KEY = 'baseballiq.player';

  /* localStorage throws in some private-browsing modes, and a kid on a
     locked-down school tablet should still be able to drill. Every call
     is wrapped so storage problems can never break the site. */
  function loadPlayer() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const p = JSON.parse(raw);
      return p && p.firstName ? p : null;
    } catch (e) {
      return null;
    }
  }

  function savePlayer(player) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(player));
    } catch (e) {
      /* not fatal — they just get asked again next visit */
    }
  }

  function clearPlayer() {
    try { window.localStorage.removeItem(STORAGE_KEY); } catch (e) {}
  }

  function displayName(player) {
    if (!player) return '';
    return player.lastInitial
      ? player.firstName + ' ' + player.lastInitial + '.'
      : player.firstName;
  }

  function isConfigured() {
    return typeof REPORT_URL === 'string' && REPORT_URL.indexOf('http') === 0;
  }

  /* Fire-and-forget. We deliberately do NOT await this or surface
     failures to the player: a logging problem must never stand between
     a kid and their results screen. Worst case the row is missing and
     the coach sees one fewer entry. */
  function sendResult(result) {
    if (!isConfigured()) return;

    const payload = {
      firstName:   result.firstName || '',
      lastInitial: result.lastInitial || '',
      position:    result.position || '',
      right:       result.right || 0,
      wrong:       result.wrong || 0,
      missed:      (result.missed || []).join('; ')
    };

    try {
      fetch(REPORT_URL, {
        method: 'POST',
        mode: 'no-cors',               // Apps Script will not send CORS headers
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
      }).catch(() => { /* offline, blocked, whatever — ignore */ });
    } catch (e) {
      /* ignore */
    }
  }

  return { loadPlayer, savePlayer, clearPlayer, displayName, isConfigured, sendResult };
})();
