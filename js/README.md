# Baseball IQ

A drill site that teaches young players their responsibilities at each position. Pick a position,
watch the play develop on a 2D field, get stopped mid-action and answer what that fielder is supposed
to do. Right answer → green + fireworks. Wrong → try again; wrong twice → the correct answer is
revealed with an explanation.

Written for **Little League, roughly ages 8–12**. That audience decides what earns a scenario and how
it is worded — see `docs/scenario-playbook.md` before writing any new ones.

**119 scenarios across all nine positions.**

## Running it

No build step, no server needed. Double-click `index.html`, or:

```powershell
start .\index.html
```

## Checking your work

```powershell
node tools\validate-scenarios.js
```

Run it after touching any scenario file. It picks up `js/scenarios-*.js` automatically, so a new
position needs no wiring. It catches the mistakes that are invisible when reading the code but
obvious on screen — a ball landing in foul territory, text saying "to your right" when the ball goes
left, a runner frozen mid-baseline, a throw that ties the runner on a play called an out, the wrong
fielder taking the cut. Two foul-line warnings are expected and correct.

## Files

| File | What it holds |
|---|---|
| `index.html` | Page shell, the static SVG field, and the `<script>` tags that load each scenario file |
| `css/styles.css` | All styling |
| `js/field-data.js` | Field spots (`SPOTS`), the nine positions, and the empty `SCENARIOS` registry |
| `js/scenarios-<pos>.js` | One file per position: `p`, `c`, `1b`, `2b`, `3b`, `ss`, `lf`, `cf`, `rf` |
| `js/field.js` | Draws fielders/runners, animates the ball, routes and coverage |
| `js/fireworks.js` | Particle burst on a correct answer |
| `js/app.js` | Screen flow, the scenario timeline engine, and quiz scoring |
| `tools/validate-scenarios.js` | Site-wide correctness checks (see above) |
| `docs/scenario-playbook.md` | How we decide what scenarios a position needs, and the coaching rules that must stay consistent between positions |

## Adding scenarios

**One file per position.** Each `js/scenarios-<position>.js` file calls `SCENARIOS.push(...)` to add
its scenarios to the shared registry declared in `field-data.js`. Within a file, group scenarios into
sections by base situation — bases empty, runner on first, runners on first and second, and so on.

All nine files already exist, so adding a scenario means appending to the right one and re-running the
validator. If you ever add a tenth file, give it a `<script>` tag in `index.html` after
`js/field-data.js`; everything else picks it up on its own.

Positions with zero scenarios show as "Coming soon" on the picker automatically, so a half-finished
position never breaks the site.

```js
{
  id: '2b-runner-first-grounder',
  position: '2B',                        // must match a POSITIONS code
  title: 'Ground ball, runner on first',
  situation: { outs: 1, runners: ['first'] },   // outs + runners are what the panel shows
  description: 'Sets the scene for the player.',
  steps: [
    { type: 'ball', kind: 'ground', from: 'home', to: '2B', duration: 1250,
      caption: 'Ground ball to the second baseman…',
      runners: [{ id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.42 }] },
    { type: 'pause', ms: 350 },
    { type: 'question',
      prompt: 'Where does the throw go?',
      options: ['Throw to second for the double play', 'Throw to first', 'Hold the ball'],
      answer: 0,
      hint: 'Shown after the first wrong guess.',
      explanation: 'Shown once the answer is known.' },
    { type: 'throw', from: '2B', to: 'second', duration: 700, caption: 'Feed the shortstop…' },
    { type: 'result', title: 'Two!', text: 'What happened.', coach: 'Teaching point.', flash: ['SS','1B'] }
  ]
}
```

**Step types**

| Type | Does |
|---|---|
| `ball` | Batted ball. `kind: 'ground'` (hops), `'fly'` (high arc), `'line'` (flat arc) |
| | `kind: 'pitch'` — never batted (a passed ball or wild pitch). `kind: 'foul'` — a foul pop-up. Both are exempt from the validator's fair-territory check, because both legitimately end up outside the lines. |
| `throw` | Thrown ball — arcs, and draws a solid gold route line |
| | `ballArrivesAt: 0.7` makes the ball finish its flight in 70% of the step while runners keep going for the full duration. **Required on any throw that records an out**, otherwise ball and runner land together — a tie, and a tie goes to the runner. |
| `move` | Moves fielders to new spots with no ball in flight |
| `pause` | Dead time in ms, to let a beat land |
| `question` | Freezes the play and asks |
| `result` | Closes the play out; `flash: ['1B']` blinks those fielders |

**Locations** (`from` / `to`) accept a `SPOTS` key (`home`, `first`, `relayRight`, `buntThird`, …),
a position code (`2B`, `SS`, `CF`, …), or literal SVG coordinates `[x, y]` in the 800×700 viewBox.

**Runner moves** are fractions of that runner's own path travelled during the step, so a runner can
advance partway before the pause and finish afterward: `fromT: 0.42, toT: 0.86`. Keep the end of one
step equal to the start of the next or the runner will visibly jump.

**A runner's *final* `toT` must land him on a base** — `1` for reaching the base he's running to, `0`
for retreating to the one he came from. A runner left at `0.4` is frozen in the middle of the
baseline, which reads as a bug. The only exception is a runner retired between bases, and the result
text has to say so ("picked off", "doubled off") or the validator rejects it.

Set `to` to the base the runner is actually trying to reach, not the next one along. A runner scoring
from second is `to: 'home'` (path second → third → home), not `to: 'third'` — with the latter, values
past `1` extrapolate *past* third into foul ground instead of turning toward the plate.

**Fielder movement** — coverage is most of what an infielder actually does, so fielders can move too.
Add `fielders: [{ who: '2B', to: 'first' }]` to a `ball` or `throw` step to have them break while the
ball is in flight, or use a standalone `move` step (which also accepts `runners`, so runners keep
going). Fielders return to their home positions on replay.

A scenario may contain more than one `question` step — the engine pauses at each one.

## Answering the questions

Click an option, or use the keyboard: `A`/`B`/`C` or `1`/`2`/`3`.

**Options are shuffled on screen.** Scenario files should keep listing the correct answer first
(`answer: 0`) — it makes them far easier to write and to proofread — because `app.js` reshuffles the
display order every time a scenario loads. `answer` always refers to the option's position in the
array as authored, never to the letter the player sees.

The order is fixed for the life of one scenario attempt, so an option ruled out by a wrong guess
keeps its letter instead of jumping around mid-question. **Try this play again** reshuffles, so the
answer can't be memorised by position.

## Scoring

It is a quiz, so the score has to mean something.

**Only a first-try answer counts as correct.** Getting there on the second guess counts as a miss,
and so does having the answer revealed after two wrong guesses. The feedback says so rather than
letting a second-guess win feel like a clean one.

**A scenario is scored exactly once, on the first attempt, and that result is final for the run.**
Replaying a play you already missed lets you find the right answer — it does not repair the score,
and the feedback tells you as much. This matters more than it sounds: before it was enforced, one
scenario could be banked as both 1 right *and* 1 wrong.

All scoring goes through `recordScenarioResult()` in `app.js`, which refuses to fire twice for the
same scenario id. **Never increment `state.score` anywhere else** — that guard is the only thing
keeping right + wrong equal to the number of scenarios actually attempted.

The topbar shows `N right · N wrong` and a `3 of 16` progress chip. Switching position resets both.

## The results screen

Finishing the last scenario in a position shows a results screen rather than dumping you back at the
picker: the score, a progress bar, right/missed tallies, and every missed play listed by name with its
situation. A clean run gets a "Perfect" message instead of an empty list.

Three ways out: **Retry the ones you missed** (a fresh run over only those scenarios, with a fresh
scoreboard — a deliberate second attempt, not a repair of the first), **Start this position over**, or
**Pick another position**.

Switching position mid-quiz with the topbar button skips the results screen entirely — you abandoned
the run rather than finishing it.

## Replaying the animation

The play develops in a couple of seconds, which is easy to miss while reading the situation panel.
A **Replay animation** button appears above the field whenever playback is parked — that is, while a
question is on screen and again once the play is over. Keyboard shortcut: `R`.

It re-runs the play from the top up to wherever you are, skipping questions you already answered. It
does not reset anything: your score, your attempts, the shuffled option order, and any options already
ruled out by a wrong guess all survive the replay. Replay as many times as you like before answering —
it costs nothing.

The button is hidden while the play is actually moving, and during a replay it stays put but goes
disabled with a spinner, so the layout doesn't jump. The question card is tucked away for the few
seconds the replay runs and comes back exactly as you left it. The button also never appears where
there is genuinely nothing to rewatch — a question asked before the first pitch, for instance — which
`hasSomethingToReplay()` in `app.js` decides by looking for any earlier `ball`, `throw` or `move` step.

That is separate from **Try this play again** in the side panel, which restarts the scenario from
scratch and asks the question over. That one is for finding the right answer on a play you missed —
it cannot change your score, which is already settled (see **Scoring** above).
