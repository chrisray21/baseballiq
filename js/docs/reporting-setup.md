# Score reporting — setup

How finished quizzes get from a player's device into a Google Sheet you
own. Free, no account for players, no limits that matter.

**How it works:** when a player finishes a position, the site POSTs one
small JSON payload to a Google Apps Script you deploy. The script
appends a row to your Sheet. That's the whole mechanism.

---

## Part 1 — Make the Sheet and script (about five minutes, once)

**1.** Go to <https://sheets.new> to create a blank spreadsheet. Name it
something like `Baseball IQ Results`.

**2.** In the menu: **Extensions → Apps Script**. A code editor opens in
a new tab.

**3.** Delete whatever is in the editor (usually an empty
`function myFunction() {}`).

**4.** Open `tools/google-apps-script.gs` from this project, copy all of
it, and paste it into the editor.

**5.** Click the **save** icon (or Ctrl+S).

**6.** Test the Sheet side before involving the website. In the toolbar,
pick **testWrite** from the function dropdown and click **Run**.

- Google will ask for permission the first time. Click
  **Review permissions** → pick your account → you'll see
  **"Google hasn't verified this app"** → click **Advanced** →
  **Go to (your project name)** → **Allow**.
- That warning is expected. It appears for any personal script that
  hasn't been through Google's review process; you are granting
  permission to your own code.

**7.** Switch back to the Sheet. You should see a header row and one
`Test T.` row. If so, the Sheet side works.

---

## Part 2 — Deploy it as a web app

**1.** Back in the Apps Script editor, click **Deploy → New deployment**.

**2.** Click the gear next to **Select type** and choose **Web app**.

**3.** Set:

| Field | Value |
|---|---|
| Description | `Baseball IQ reporting` |
| Execute as | **Me** |
| Who has access | **Anyone** |

**"Anyone" is required.** Players aren't signed into Google, so the
script has to accept anonymous requests. It only ever appends rows — it
cannot read your Sheet or anything else in your account.

**4.** Click **Deploy**, approve if asked, and copy the **Web app URL**.
It looks like:

```
https://script.google.com/macros/s/AKfycbx..................../exec
```

Keep that URL. It's the only thing the website needs.

---

## Part 3 — Point the site at it

**1.** Open `js/reporting.js` in the project folder.

**2.** Near the top, paste your URL between the quotes:

```js
const REPORT_URL = 'https://script.google.com/macros/s/AKfyc..../exec';
```

**3.** Save, then upload `js/reporting.js` to GitHub using the direct
uploader so it lands in the right folder:
<https://github.com/chrisray21/baseballiq/upload/main/js>

Until a URL is pasted in, the site behaves exactly as before and sends
nothing. Nothing breaks if you leave it blank.

---

## What a row looks like

| When | First name | Last initial | Position | Right | Wrong | Total | Score % | Plays missed |
|---|---|---|---|---|---|---|---|---|
| 2026-11-02 14:03 | Jake | M | Second Base | 24 | 4 | 28 | 86 | Bunt with a runner on first; Pop-up with runners on first and second |

One row per finished position. A player who drills four positions
produces four rows.

The **Plays missed** column is the useful one for coaching: sort or
filter by it and you'll see which scenarios the whole team gets wrong,
which is a practice plan rather than a scoreboard.

---

## Things worth knowing

**Nothing is verified.** There's no login, so a player can type any
name. This tells you who did the work on the honour system; it is not
proof.

**Only completed positions report.** Abandoning halfway, or switching
position mid-quiz, sends nothing. That's deliberate — a half-finished
run isn't a score.

**"Retry the ones you missed" sends a second row.** It's a separate
attempt, so you'll see both the original and the retry. That's usually
what you want: it shows a player went back and worked at it.

**Failures are silent by design.** If a player is offline or the script
is down, the row is simply missing. The player still sees their results
screen as normal. A logging problem should never stand between a kid and
their score.

**If you change the script**, you must click **Deploy → Manage
deployments → (pencil icon) → Version: New version → Deploy** for the
change to take effect. Editing the code alone does not update the live
web app — this catches almost everyone out once.

**To check what's arriving**, open the Apps Script editor and look at
**Executions** in the left sidebar. Every request shows up there, with
errors if any.
