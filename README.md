# Baseball IQ

A drill site that teaches players their responsibilities at each position. Pick a position, watch
the play develop on a 2D field, get stopped mid-action and answer what that fielder is supposed to
do. Right answer → green + fireworks. Wrong → try again; wrong twice → the correct answer is
revealed with an explanation.

## Running it

No build step, no server needed. Double-click `index.html`, or:

```powershell
start .\index.html
```

## Files

| File | What it holds |
|---|---|
| `index.html` | Page shell + the static SVG field |
| `css/styles.css` | All styling |
| `js/field-data.js` | Field spots (`SPOTS`), the nine positions, and the empty `SCENARIOS` registry |
| `js/scenarios-2b.js` | **All** second-base scenarios (48), grouped by base situation |
| `js/field.js` | Draws fielders/runners, animates the ball, routes and coverage |
| `js/fireworks.js` | Particle burst on a correct answer |
| `js/app.js` | Screen flow + the scenario timeline engine |

## Adding scenarios

**One file per position.** Each `js/scenarios-<position>.js` file calls `SCENARIOS.push(...)` to add
its scenarios to the shared registry declared in `field-data.js`. Within a file, group scenarios into
sections by base situation — bases empty, runner on first, runners on first and second, and so on.

To add a position:

1. Create `js/scenarios-ss.js` (or `-1b`, `-3b`, `-c`, `-p`, `-lf`, `-cf`, `-rf`)
2. Start it with `SCENARIOS.push(` … `);`
3. Add a `<script>` tag for it in `index.html`, after `js/field-data.js`

Positions with zero scenarios show as "Coming soon" on the picker automatically, so you can add them
one at a time and the site keeps working the whole way.

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
scratch and asks the question over.
