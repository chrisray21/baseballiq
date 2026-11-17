/* ============================================================
   Baseball IQ — Google Apps Script
   Receives a finished quiz from the website and appends one row
   to the Sheet this script is attached to.

   This file is NOT part of the website. It is here so the code
   lives with the project. See docs/reporting-setup.md for how to
   install it.
   ============================================================ */

var SHEET_NAME = 'Results';

var HEADERS = [
  'When',
  'First name',
  'Last initial',
  'Position',
  'Right',
  'Wrong',
  'Total',
  'Score %',
  'Plays missed'
];

function doPost(e) {
  try {
    var data = parseBody(e);
    var sheet = getSheet();

    var right = Number(data.right) || 0;
    var wrong = Number(data.wrong) || 0;
    var total = right + wrong;

    sheet.appendRow([
      new Date(),
      data.firstName   || '',
      data.lastInitial || '',
      data.position    || '',
      right,
      wrong,
      total,
      total ? Math.round((right / total) * 100) : 0,
      data.missed      || ''
    ]);

    return ContentService.createTextOutput('ok');
  } catch (err) {
    // Swallow errors so a bad row never makes the site look broken.
    // Check View > Executions in the Apps Script editor to debug.
    return ContentService.createTextOutput('error: ' + err);
  }
}

/* The site posts JSON as text/plain (the only content type that
   avoids a CORS preflight Apps Script cannot answer). Fall back to
   form parameters just in case. */
function parseBody(e) {
  if (e && e.postData && e.postData.contents) {
    try { return JSON.parse(e.postData.contents); } catch (ignore) {}
  }
  return (e && e.parameter) ? e.parameter : {};
}

function getSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

/* Run this once from the editor to confirm the Sheet side works
   before you touch the website. It writes a single fake row. */
function testWrite() {
  doPost({
    postData: {
      contents: JSON.stringify({
        firstName: 'Test',
        lastInitial: 'T',
        position: 'Second Base',
        right: 12,
        wrong: 4,
        missed: 'Bunt with a runner on first; Pop-up with runners on first and second'
      })
    }
  });
}
