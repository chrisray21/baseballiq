# Scenario playbook

How we decide what scenarios a position needs, and the full working
list for second base. Use this same method for every other position —
it's the reusable part.

## Who this is for

**Little League, roughly ages 8–12.** This governs every scenario we
write, and it is the first filter to apply — before the four axes
below, not after.

What that means in practice:

- **Teach the job, not the playbook.** A player this age needs to know
  where to go and where the ball goes. Named set plays that depend on
  coordinated timing between several players — first-and-third
  defenses, wheel plays, pickoff timing plays — are beyond them and
  beyond most of their coaches.
- **One decision per scenario.** If answering correctly requires
  holding two variables at once (score *and* out count *and* runner
  speed), it's too much. Split it or cut it.
- **Plain words.** "Throw it to first" beats "take the guaranteed
  out." Use real baseball terms — force, tag up, cover, cut off —
  because they need those, but say what they mean the first time.
- **The lesson should survive being repeated by a 10-year-old.** If
  the coaching note can't be boiled down to one sentence a kid could
  tell a teammate, it's pitched too high.
- **Situational modifiers are mostly out.** Score-and-inning
  reasoning, defensive positioning by batter tendency, and
  trading runs for outs are largely above this level. Batter
  handedness stays only where it decides something concrete and
  binary, like who covers second on a steal.

Some of the earliest second-base scenarios were written before this
was settled and sit a little above it. They're flagged in the 2B list.

## The four axes

Every scenario worth building sits at the intersection of these. When
stuck for what to add next for any position, walk the axes and look
for an empty cell.

**1. Base/out state.** The 8 runner configurations (empty, 1st, 2nd,
3rd, 1st+2nd, 1st+3rd, 2nd+3rd, loaded) are the top-level grouping —
matches the existing file structure. Out count (0, 1, 2) is a second
variable *within* a group, but only worth a separate scenario when it
actually changes the correct read:
- 2 outs collapses "trade a run for extra outs" logic — any out ends
  the inning, so the closest/simplest out is always correct.
- Sac-fly and productive-out logic only exist with fewer than 2 outs.
- Double-play value only matters with 0 or 1 out.
Don't build a 2-out twin of every scenario — only where the out count
flips the answer.

**2. Batted-ball type.** Routine ground ball, ground ball requiring
range (in the hole, up the middle, backhand), slow roller / swinging
bunt, line drive, infield pop-up, shallow fly ball, sacrifice bunt,
suicide/safety squeeze. Different mechanics, different decision
pressure (a liner leaves no time to think; a slow roller costs you an
out on the front end).

**3. Position-specific responsibility beyond "field the ball."** This
is where positions actually differ from each other. Covering a base a
teammate vacated, cutoff/relay duty, backing up a throw or a base,
communication priority on a ball two fielders could take, a named set
play (first-and-third defense, wheel play, rundown).

**4. Situational modifiers.** Batter handedness (changes who covers a
base on a steal), infield-fly-rule states, holding a runner close,
score/inning context that changes whether a run is worth trading for
outs.

A scenario is "new" if it's a combination not already covered — not
just a reskin of one that teaches the identical lesson.

## Coaching-accuracy rules to get right

Corrections we've already had to make once. Check scenarios against
these before writing them for any position — the geometry validator
can't catch a play that animates perfectly but teaches the wrong job.

**Who covers first base.** The default is that the first baseman
covers it, and he only leaves the bag if the ball forces him to.
So work out who is *pulled off* the bag before assigning coverage:
- Comebacker to the pitcher, nobody on → the first baseman never
  moved; he takes the throw himself. Nobody needs to cover, and the
  2B's actual job is to break in behind the pitcher in case a sharp
  ball deflects off him or handcuffs him.
- Ball hit to the first baseman's right, pulling him off the bag →
  **the pitcher** covers first. This is the play people mistakenly
  generalize to every ball hit near the mound.
- Bunt where the first baseman charges → **the 2B** covers first.

**Cutoffs on a play at the plate — single cut only.** Deliberately
simplified for this age group:

- Ball to **centre or right** → **1B** takes the cut.
- Ball to **left** → **3B** takes the cut.
- **No double cuts anywhere on the site.** Two stacked relay men is a
  real alignment and it is out of scope here; do not reintroduce it
  for the outfield positions, where the temptation will be strongest.

The middle infielders never take the cut on a throw home. Their job is
base coverage, and it follows from who left a base:

- 1B took the cut (centre/right) → first base is empty and the batter
  is running to it → **2B covers first**.
- 3B took the cut (left) → first base is still occupied, so **2B
  covers second** and **SS covers third**.

This dovetails with the "who covers first" rule below: *any* time the
first baseman leaves the bag — bunt or cutoff — the second baseman
covers first. One sentence a 10-year-old can actually carry onto the
field, which is the whole bar.

A lone relay man on an extra-base hit with **no** play at the plate is
a different thing and is still fine (see `2b-empty-deep-fly-relay`,
where the 2B goes out on a gap shot and the throw comes back to second).

**Fly-ball priority.** Outfielders have priority over infielders on
any ball both can reach — they're moving forward with the better
read while the infielder drifts back. Infielders call for what
they're sure of, then defer the moment the outfielder calls it.
Center field has priority over both corner outfielders.

**"Lead runner" means the runner on the highest occupied base.** With
runners on first and second, the lead runner is the one on *second*,
heading to third — so a force at second retires the *trail* runner.
The phrase only lines up with the force at second when first base is
the only one occupied, which is exactly why it gets carried into
scenarios where it's wrong. Prefer naming the base outright ("throw
to second to start the double play"); it's plainer for young players
and it can't be wrong. `validate-scenarios.js` enforces this.

**The daylight play is a pickoff at SECOND, not first.** The middle
infielder drifts in behind a runner on second; the *pitcher* — not the
catcher — looks back, and throws the moment he sees daylight between
the fielder and the runner. There is no version of it with a runner on
first, and a catcher throwing to second does not pick off a runner
standing on first.

**Left/right is always the fielder's own.** Facing home plate, a
second baseman's right is toward second base and his left is toward
first base; the shortstop is the mirror image. `validate-scenarios.js`
enforces this against the prose, but get it right at write time.

## Applying it to the other 8 positions later

Same four axes, position by position. What changes is axis 3 (the
job) and which base/out states actually put that position's job in
play. Concretely:
- **SS**: near-mirror of 2B (DP pivot both directions, covering 2nd on
  steals depending on batter side, ranging into the hole), plus relay
  duty on balls to left field and the shortstop's role in run-downs
  between 2nd and 3rd.
- **1B / 3B**: bunt fielding (not just covering), charging slow
  rollers, holding a runner on with a pickoff, 3B's specific bunt/
  squeeze reads, 1B's job on a ball hit to his right (who covers first
  when he can't get back).
- **C**: covers everything home-plate related — passed balls, plays at
  the plate, calling pitches (skip), pickoffs, backing up first on
  throws from the infield, blocking in the dirt.
- **P**: covering first on balls hit to the right side, fielding
  comebackers, backing up bases, holding runners, pickoff moves,
  bunt-fielding as part of the bunt-defense set play.
- **LF/CF/RF**: routes to fly balls, hit cutoffs and which base they
  throw behind, backing up the infield on throws, communication with
  adjacent outfielders and the middle infield on shallow flies, who's
  the trail runner on a ball in the gap.

Build each position's list the same way we build 2B's below: start
from the 8 base-state groups, then ask "what does *this* position
specifically have to decide or do" in each group.

---

## Second base — full scenario checklist

`✅ built` = exists in `js/scenarios-2b.js` today. `☐ planned` = next
batch. Each planned entry names the batted-ball type + the specific
decision or job it teaches, so it maps straight to axes 2–4 above.

### Bases empty (5) — all built
1. ✅ Routine grounder hit at 2B → throw to first.
2. ✅ Shallow pop fly — outfielder has priority once he calls it.
3. ✅ Ground ball to 2B's right (up the middle) — backhand with
   momentum carrying away from first, longer throw.
4. ✅ Deep fly to the right-center gap — 2B releases out to become the
   relay man even though he has no play; positioning, not fielding.
5. ✅ Comebacker to the pitcher — 2B breaks in BEHIND the pitcher as
   insurance, because first base is already covered (see the base-
   coverage rule below).

Cut deliberately: a slow-roller scenario and a line-drive-at-you
scenario. Both taught pure fielding mechanics (barehand it, get your
glove up) rather than a decision or a responsibility, which is not
what this site is for. Keep that bar for every position: **if the
answer is a technique rather than a job or a read, it doesn't earn a
scenario.**

### Runner on first (7) — all built
1. ✅ Ground ball at 2B → feed to SS for the front end of the DP.
2. ✅ Sac bunt → 2B covers first.
3. ✅ Ground ball up the middle, SS fields it → 2B covers second and
   receives the feed (the *other* direction of the same double play).
4. ✅ Steal of second, right-handed batter → 2B covers the bag, catch
   and tag.
5. ✅ Steal of second, left-handed batter → SS has the bag instead;
   2B's job is to hold the "hole" on the right side, not vacate.
6. ✅ Line drive at 2B with the runner going on contact → catch it,
   then double the runner off first (line-drive DP).
7. ✅ Ground ball at 2B, 2 outs → no DP value left, simple sure out at
   first (contrast with #1).

(A daylight-pickoff scenario originally lived here with a runner on
first. That play only exists at second base, so it moved to the
runner-on-second group.)

### Runner on second (4) — all built
1. ✅ Ground ball at 2B, no force → throw to first, runner holds.
2. ⚠️ Pickoff at second, 2B sneaking in behind the runner. **Above
   level** — kept for now, but the timing this depends on is a travel-
   ball/high-school play. First candidate to simplify or swap.
3. ✅ Base hit to centre, runner scoring → 1B takes the cut, so first
   base is empty with the batter running to it → 2B covers first.
4. ✅ Sac bunt with a runner on second → still cover first. (Dropped
   the original framing about the force at third; that reasoning is
   above level and the *job* is the same either way.)

### Runner on third (3) — all built
1. ✅ Slow roller, check the runner before throwing to first.
2. ✅ Bunt with a runner on third → cover first, even though the whole
   play is happening in front of the plate. (Written as a plain bunt
   rather than a squeeze — the job is identical and squeezes are rare
   at this level.)
3. ✅ Base hit to left, runner scoring → 3B takes the cut this time,
   so first base is still covered → 2B takes second. The deliberate
   contrast with the centre/right version above.

### Runners on first and second (3) — all built
1. ✅ Ground ball at 2B → 4-6-3 double play.
2. ✅ Slow roller, only one out available → take the sure out at first
   instead of forcing a play you don't have.
3. ✅ Infield pop-up, infield fly rule → it's an automatic out, so
   don't panic and don't chase runners. Worth teaching: LL plays this
   rule and kids consistently misunderstand it.

Cut: a second "SS fields it, 2B covers second" scenario. The
runner-on-first version already teaches that exact job, and repeating
it in a new base state teaches nothing new.

### Runners on first and third (2) — all built
1. ✅ Ground ball at 2B → take the double play.
2. ✅ Same ground ball, 2 outs → any out ends the inning, so take the
   closest one.

Cut: the first-and-third set play. It needs the catcher, pitcher, and
both middle infielders reading each other, and it is squarely above
Little League.

### Runners on second and third (1) — all built
1. ✅ Ground ball at 2B, no force anywhere → sure out at first.

Cut: a third play-at-the-plate scenario. Once the centre/right version
(cover first) and the left version (cover second) are both built, a
third one is a reskin — the job is already fully taught.

Cut: the weak-roller-charge scenario. The answer was a fielding
technique, not a job or a read — same bar that cut the slow roller and
the line drive from the bases-empty group.

### Bases loaded (3) — all built
1. ✅ Ground ball at 2B → force at second, DP, run scores from third.
2. ✅ Same ball, 2 outs → doesn't matter which base, take the closest
   force; the inning's over either way.
3. ✅ Bunt right at you with the bases loaded → because every runner is
   forced, home plate is a force out too. Great force-logic lesson and
   perfectly learnable at this age.

Cut: a second infield-fly scenario. The first-and-second version
already teaches the rule; the bases-loaded repeat adds nothing.

**Total: 28 — second base is complete.** Deliberately not padded to a
round number; every entry teaches something the others don't. Later
depth, if wanted: a rundown between first and second (2B is nearly
always involved) and a relay on a ball to the fence.

Second base is now the reference implementation. When a question comes
up while building another position — how deep to go, how simple the
language should be, what earns a scenario — look at how 2B handled it.

---

## Shortstop — scenario checklist

Built: 16, all in `js/scenarios-ss.js`. Core set; deepen later if wanted.

The SS is the 2B mirrored, with two things to keep straight:

- Facing home, his **right is toward third** and his **left is toward
  second** — the opposite of the second baseman. The validator checks
  prose against geometry, but get it right at write time.
- He is **three times farther from first base than from second** (244px
  vs 82px on our field). That is why "take the closest force" so often
  resolves to second base for him, and it is a real, checkable fact
  rather than a coaching cliché.

### Bases empty (4)
1. ✅ Routine grounder → the long throw to first.
2. ✅ Ball in the hole to his right → plant the feet before throwing.
3. ✅ Pop-up in shallow left → left fielder has priority once he calls it.
4. ✅ Gap shot to left-center → SS goes out as the lone relay man (no
   play at the plate, so this does not touch the cutoff rule).

### Runner on first (4)
1. ✅ Grounder to SS → throw to second, 6-4-3 double play.
2. ✅ Grounder to 2B → SS covers second and takes the feed (4-6-3).
   The other direction of the same play.
3. ✅ Steal with a **left-handed** batter → SS covers. (Mirrors the 2B
   file, where a righty makes it the second baseman's bag. The two
   files must never disagree on this.)
4. ✅ Bunt → SS covers **second**, because the only runner is heading
   there.

### Runner on second (2)
1. ✅ Grounder with the runner breaking for third → look him back, then
   take the sure out at first.
2. ✅ Base hit to center → 1B takes the cut, 2B slides to first, so SS
   takes **second**.

### Runner on third (1)
1. ✅ Base hit to left → 3B takes the cut, leaving third empty, so SS
   takes **third**. Deliberate contrast with the scenario above.

### Runners on first and second (2)
1. ✅ Bunt → SS covers **third** this time, because the front runner is
   going there. Paired with the runner-on-first bunt so the rule reads
   as "follow the front runner," not "always take second."
2. ✅ Infield fly → batter is already out; catch it and leave the
   runners alone.

### Runners on first and third (1)
1. ✅ Two outs → throw to second for the force. Closest out, ends the
   inning, run doesn't count.

### Runners on second and third (1)
1. ✅ Nobody forced → look them back, throw to first.

### Bases loaded (1)
1. ✅ Grounder near the bag → step on second yourself, then throw to
   first. The fastest throw is the one you never make.

**Total: 16.** Thinnest groups are runner-on-third, first-and-third,
second-and-third and bases loaded, at one each — the natural place to
add depth later.

---

## Pitcher — scenario checklist

Built: 13, in `js/scenarios-p.js`. Core set.

The pitcher is the one position whose main job starts *after* he stops
pitching. Nearly every scenario is one of four things: cover a base
somebody else had to leave, field a ball hit back at him and pick the
right base, back up a throw, or keep a runner honest.

**The distinction this file exists to teach** is the one people get
wrong, and it is built as a deliberate pair:

- Ball hit to the right side that **pulls the first baseman off the
  bag** → the pitcher covers first.
- **Comebacker** → the first baseman never moved, so he is standing on
  the bag already. Just throw it to him.

Kids (and plenty of coaches) generalise the first into "any ball near
the mound means run to first," which is why the two sit back to back
in the bases-empty group.

### Bases empty (3)
1. ✅ Ground ball to the right side → P covers first.
2. ✅ Comebacker → throw to the 1B at the bag; do NOT run over.
3. ✅ Pop-up near the mound → get out of the way, it belongs to an
   infielder.

### Runner on first (3)
1. ✅ Comebacker → throw to second for the force, start the double play.
2. ✅ Bunt, front runner already has a head start → take the sure out
   at first. Pairs against the two bunt scenarios below where he
   *does* have a play on the front runner.
3. ✅ Runner taking a huge lead → step off and throw over. The point is
   not the pickoff, it's making him shorten up.

### Runner on second (2)
1. ✅ Base hit, runner scoring → P has no ball to field; his job is to
   get behind home plate and back up the throw. The throw gets past
   the catcher, which is exactly why the job exists.
2. ✅ Comebacker with the runner breaking for third → look him back,
   then take first.

### Runner on third (2)
1. ✅ Ball gets past the catcher → catcher leaves the plate, so **the
   pitcher covers home**. Enormously common at this age and rarely
   taught.
2. ✅ Bunt fielded fast → throw home. A tag play, not a force, since
   only third is occupied.

### Runners on first and second (1)
1. ✅ Bunt → throw to third for the force. This is the same play as
   `ss-r1r2-bunt-cover-third`, written from the pitcher's side: P
   fields at the plate, SS covers third. The two files must keep
   matching — a player learning both positions should see one play
   from two angles, not two contradictory plays.

### Runners on first and third (1)
1. ✅ Comebacker, 2 outs → closest out at first ends it before the run.

### Bases loaded (1)
1. ✅ Comebacker → home is a force with the bases loaded, so throw home
   and stop the run.

**Total: 13.** Thin groups are first-and-second, first-and-third and
bases loaded at one each. Natural depth to add later: backing up third
on a ball to left, and covering first on a ball to the right side with
a runner already on base (the force changes where the throw goes).

---

## Remaining positions — checklists

All nine positions are now built. Counts and the defining job of each.

### First base — 12 (`scenarios-1b.js`)
Defined by two things: he owns first base and only leaves it when the
ball makes him, and he is the cut man on every throw home from **centre
or right**. Key pairs: step on the bag yourself vs. throw to the pitcher
covering (depends whether the ball pulled you off); force at home with
the bases loaded vs. the sure out at first.

### Third base — 12 (`scenarios-3b.js`)
Charges everything soft, guards the line, and is the cut man on throws
home from **left**. Its best teaching pair is three versions of the same
ground ball: with a runner on first, third base is worthless (nobody is
forced there) — with runners on first and second it is the fastest out
on the field — with runners on first and third it is worthless again.
Same ball, three answers, decided entirely by who is forced.

### Catcher — 11 (`scenarios-c.js`)
Everything turns on **force vs. tag at home**, which is built as a
deliberate pair: a runner coming from second needs a tag, a bases-loaded
runner is a force and only needs the plate touched. Also carries the
most-skipped job on the field — backing up first base on infield
grounders.

### Left / Centre / Right field — 9 each
Shared spine across all three, so a player switching corners sees the
same rules:
- **Priority**: outfielder beats any infielder coming back; centre
  fielder beats both corners. LF and RF each have a "call off the
  infielder" scenario AND a "defer to centre" scenario so the ranking
  is unambiguous.
- **Hit the cut man**: LF throws through 3B, CF and RF through 1B.
- **Throw ahead of the runner**, and when two runners are moving, throw
  at the one about to score.
- **Backing up** is a real job: RF behind first, CF behind second, LF
  behind third.

**Site total: 119 scenarios across nine positions.**

## Verification that runs on the whole site

`node tools/validate-scenarios.js` covers every scenario file
automatically — it globs `js/scenarios-*.js`, so a new position is
picked up with no wiring. It enforces: fair territory (with `pitch` and
`foul` exemptions), prose direction vs. actual geometry, runners
finishing on bases, throws beating runners on outs, single-cut alignment
with the right corner infielder, "lead runner" used correctly, runner
path continuity, question shape, and duplicate ids.

Two standing warnings are expected and correct: the third-base and
right-field down-the-line scenarios put the ball ~20px inside the foul
line, because that is where those balls actually go.
