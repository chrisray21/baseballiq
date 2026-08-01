/* ============================================================
   Baseball IQ — scenarios-2b.js
   Second-base scenarios, grouped by base situation. Starter set:
   one (or two) scenarios per situation, per the build plan —
   more will be added later following this same pattern.
   ============================================================ */

SCENARIOS.push(

  /* ---------------- bases empty ---------------- */

  {
    id: '2b-empty-routine-grounder',
    position: '2B',
    title: 'Routine grounder, bases empty',
    situation: { outs: 1, runners: [] },
    description: 'One out, nobody on. A ground ball is hit right at you.',
    steps: [
      { type: 'ball', kind: 'ground', from: 'home', to: '2B', duration: 1100,
        caption: 'Ground ball right at the second baseman…',
        runners: [{ id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.55 }] },
      { type: 'pause', ms: 300 },
      { type: 'question',
        prompt: 'You’ve got the grounder cleanly fielded. Where does the throw go?',
        options: ['Throw to first base', 'Throw to third base', 'Hold the ball and check the runner'],
        answer: 0,
        hint: 'There’s only one runner involved here — the batter.',
        explanation: 'With nobody on base, the only play is the sure one: get the batter-runner out at first.' },
      { type: 'throw', from: '2B', to: 'first', duration: 650, ballArrivesAt: 0.7,
        caption: 'Strong throw across the diamond…',
        fielders: [{ who: '1B', to: 'first' }],
        runners: [{ id: 'batter', from: 'home', to: 'first', fromT: 0.55, toT: 1 }] },
      { type: 'result', title: 'Out at first', text: 'Clean throw beats the runner by a step.',
        coach: 'On a routine grounder with the bases empty, there is no decision to make: field it and get the automatic out at first.',
        flash: ['2B', '1B'] }
    ]
  },

  {
    id: '2b-empty-shallow-pop',
    position: '2B',
    title: 'Shallow fly ball, bases empty',
    situation: { outs: 0, runners: [] },
    description: 'Leadoff of the inning. A flare drops into shallow right field — past the infield, short of the outfielder — right between you and the right fielder.',
    steps: [
      { type: 'ball', kind: 'fly', from: 'home', to: 'shallowRightField', duration: 1500,
        caption: 'High, shallow fly carrying out past the infield dirt…' },
      { type: 'move', duration: 900,
        caption: 'You drift back on it while the right fielder comes charging in…',
        fielders: [{ who: 'RF', to: [585, 220] }, { who: '2B', to: [510, 275] }] },
      { type: 'question',
        prompt: 'You’re drifting back and the right fielder is charging in — and he calls for it. What do you do?',
        options: ['Peel off and let him take it — he called it', 'Call him off and catch it yourself since you got a step on him', 'Ignore the call and go up for it anyway'],
        answer: 0,
        hint: 'Think about who has the better view and the better momentum on this ball.',
        explanation: 'The outfielder has priority any time you can both reach a ball. He’s charging in with a full view of the flight; you’re drifting back with your view partly blocked. Call for anything you’re sure of, but the instant he calls it, your job is to get out of his way.' },
      { type: 'move', duration: 350, caption: 'You peel off and give him the room…',
        fielders: [{ who: '2B', to: [460, 320] }, { who: 'RF', to: 'shallowRightField' }] },
      { type: 'result', title: 'Right fielder makes the catch', text: 'Clean catch in shallow right for the first out — no collision, no miscommunication.',
        coach: 'Outfielders get priority on balls you can both reach: they’re moving forward with the better read, you’re moving backward with the tougher one. Call for it when you’re sure — but always defer the moment you hear "I got it" from behind you.',
        flash: ['RF'] }
    ]
  },

  {
    id: '2b-empty-in-the-hole',
    position: '2B',
    title: 'Ground ball to your right, bases empty',
    situation: { outs: 1, runners: [] },
    description: 'One out, nobody on. A hard grounder is hit up the middle — farther to your right than a routine backhand, and away from first base.',
    steps: [
      { type: 'ball', kind: 'ground', from: 'home', to: 'backhand2B', duration: 1000,
        caption: 'Hit hard to your right, up the middle — you have to range for it…',
        fielders: [{ who: '2B', to: 'backhand2B' }],
        runners: [{ id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.6 }] },
      { type: 'pause', ms: 250 },
      { type: 'question',
        prompt: 'You backhand it moving away from first base. What now?',
        options: ['Plant, square your feet as best you can, and make a strong throw to first', 'Rush a throw off your back foot without setting up', 'Hold the ball — the throw is too far to make'],
        answer: 0,
        hint: 'The extra half-second it takes to get your feet under you is almost always worth it.',
        explanation: 'A ball to your right costs you time you don’t get back, and your momentum is carrying away from first — so don’t also throw away your accuracy. Get your feet under you before you let it go; a slightly late, accurate throw beats a slightly early, wild one.' },
      { type: 'throw', from: 'backhand2B', to: 'first', duration: 750, ballArrivesAt: 0.7,
        caption: 'Set, and a long throw back across the diamond…',
        fielders: [{ who: '1B', to: 'first' }],
        runners: [{ id: 'batter', from: 'home', to: 'first', fromT: 0.6, toT: 1 }] },
      { type: 'result', title: 'Out at first — barely', text: 'The extra beat to set your feet was exactly enough.', coach: 'Balls to your right are an athleticism test, but the throw is still a fundamentals test. Range gets you to the ball; a set base gets the out.', flash: ['1B'] }
    ]
  },

  {
    id: '2b-empty-deep-fly-relay',
    position: '2B',
    title: 'Deep fly to the gap, bases empty',
    situation: { outs: 1, runners: [] },
    description: 'One out, bases empty. The batter crushes one toward the right-center gap.',
    steps: [
      { type: 'ball', kind: 'fly', from: 'home', to: 'rightCenterGap', duration: 1900,
        caption: 'Deep drive toward the gap in right-center…',
        runners: [{ id: 'batter', from: 'home', to: 'second', fromT: 0, toT: 1 }] },
      { type: 'move', duration: 800, caption: 'You have no play on the ball itself — but you still have a job…',
        fielders: [{ who: '2B', to: 'relayRight' }] },
      { type: 'question',
        prompt: 'The ball is nowhere near you. What is your job on this play?',
        options: ['Get out to a relay spot in case the outfielder’s throw needs a cutoff', 'Stand at second base and watch', 'Jog toward the outfield to help look for the ball'],
        answer: 0,
        hint: 'Nobody’s throw goes 300 feet accurately — long throws almost always need a relay.',
        explanation: 'Even when the ball is hit nowhere near you, a deep gap shot means the outfielder’s throw back in is long — you get out to a relay spot so that throw has somewhere accurate to go, no matter which base it ends up going to.' },
      { type: 'throw', from: 'rightCenterGap', to: 'relayRight', duration: 900, caption: 'The right fielder fires it back in to you…' },
      { type: 'result', title: 'Runner holds at second', text: 'Your relay position kept the throw crisp and held the batter-runner to a double.', coach: 'Being in the right spot on a ball you never touch is still doing your job. Positioning without the ball is half of what this position is.', flash: ['2B'] }
    ]
  },

  {
    id: '2b-empty-comebacker-backup',
    position: '2B',
    title: 'Comebacker to the pitcher, bases empty',
    situation: { outs: 1, runners: [] },
    description: 'One out, nobody on. A sharp comebacker is hit right back at the pitcher.',
    steps: [
      { type: 'ball', kind: 'line', from: 'home', to: 'mound', duration: 700,
        caption: 'Hit hard, right back at the pitcher…',
        fielders: [{ who: '2B', to: 'backupMound' }],
        runners: [{ id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.5 }] },
      { type: 'question',
        prompt: 'The ball is hit sharply at the pitcher and nobody is on base. What’s your job?',
        options: ['Break in behind the pitcher in case the ball gets by him', 'Sprint over to cover first base', 'Stay at second base since the ball never came to you'],
        answer: 0,
        hint: 'With nobody on, ask yourself who is already standing at first base — and what happens if this ball deflects off the pitcher.',
        explanation: 'First base is already covered: with nobody on, the first baseman never had to charge anywhere, so he just retreats to the bag for the throw. A ball hit this hard can deflect off the pitcher or handcuff him, and it carries on up the middle — so you break in behind him to keep the play alive.' },
      { type: 'throw', from: 'mound', to: 'first', duration: 550, ballArrivesAt: 0.7,
        caption: 'The pitcher fields it clean and throws to the first baseman at the bag…',
        fielders: [{ who: '1B', to: 'first' }],
        runners: [{ id: 'batter', from: 'home', to: 'first', fromT: 0.5, toT: 1 }] },
      { type: 'result', title: 'Out at first', text: 'The pitcher handled it himself and the first baseman took the throw at the bag — but you were in position the whole way in case he didn’t.',
        coach: 'Don’t confuse this with the play where the pitcher covers first: that happens when the ball pulls the FIRST BASEMAN off the bag, not on a comebacker. Here the bag is already covered, so your job is insurance — get behind the pitcher, because a ball that gets through him is still an out if someone is there.',
        flash: ['P', '1B'] }
    ]
  },

  /* ---------------- runner on first ---------------- */

  {
    id: '2b-r1-turn-two',
    position: '2B',
    title: 'Ground ball with a runner on first',
    situation: { outs: 0, runners: ['first'] },
    description: 'Nobody out, a runner on first. Ground ball hit to your right.',
    steps: [
      { type: 'ball', kind: 'ground', from: 'home', to: '2B', duration: 1150,
        caption: 'Two-hopper right at you…',
        fielders: [{ who: 'SS', to: 'second' }],
        runners: [
          { id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.4 },
          { id: 'r1', from: 'first', to: 'second', fromT: 0, toT: 0.4 }
        ] },
      { type: 'pause', ms: 250 },
      { type: 'question',
        prompt: 'Where does this ball go first?',
        options: ['Flip it to the shortstop covering second for the force', 'Throw straight to first', 'Tag the runner coming from first'],
        answer: 0,
        hint: 'There are two bases you could get an out at here — which one keeps the double play alive?',
        explanation: 'Start the double play at the base with the force — throw to the shortstop covering second, then let them relay to first.' },
      { type: 'throw', from: '2B', to: 'second', duration: 550,
        caption: 'Quick flip to the shortstop…',
        runners: [
          { id: 'r1', from: 'first', to: 'second', fromT: 0.4, toT: 1 },
          { id: 'batter', from: 'home', to: 'first', fromT: 0.4, toT: 0.75 }
        ] },
      { type: 'pause', ms: 200 },
      { type: 'throw', from: 'SS', to: 'first', duration: 600, ballArrivesAt: 0.7,
        caption: '…and across to first to complete it.',
        fielders: [{ who: '1B', to: 'first' }],
        runners: [{ id: 'batter', from: 'home', to: 'first', fromT: 0.75, toT: 1 }] },
      { type: 'result', title: 'Double play!', text: '4-6-3 turns two and the inning is that much shorter.',
        coach: 'Any time there’s a runner on first and a ground ball to you, your first look is the force at second. Get that one, then finish the double play at first.',
        flash: ['SS', '1B'] }
    ]
  },

  {
    id: '2b-r1-bunt-cover-first',
    position: '2B',
    title: 'Sacrifice bunt, runner on first',
    situation: { outs: 0, runners: ['first'] },
    description: 'Nobody out, runner on first. The batter squares to bunt.',
    steps: [
      { type: 'move', duration: 700,
        caption: 'The corners charge as the batter squares around…',
        fielders: [{ who: '1B', to: 'buntFirst' }, { who: '3B', to: 'buntThird' }] },
      { type: 'question',
        prompt: 'The first baseman is charging hard for the bunt. What’s your job?',
        options: ['Sprint over to cover first base', 'Charge the bunt yourself', 'Stay put at second base'],
        answer: 0,
        hint: 'If the first baseman leaves the bag, who’s left to cover it?',
        explanation: 'Whenever the first baseman crashes on a bunt, first base is uncovered — that’s your job. Break for the bag the moment you see him commit.' },
      { type: 'move', duration: 650, caption: 'You break hard for first base…',
        fielders: [{ who: '2B', to: 'first' }] },
      { type: 'ball', kind: 'ground', from: 'home', to: 'buntFirst', duration: 900,
        caption: 'Bunt rolls out in front of the plate…',
        runners: [
          { id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.7 },
          { id: 'r1', from: 'first', to: 'second', fromT: 0, toT: 1 }
        ] },
      { type: 'throw', from: '1B', to: '2B', duration: 500,
        caption: 'Underhand flip to the bag…',
        runners: [{ id: 'batter', from: 'home', to: 'first', fromT: 0.7, toT: 1 }] },
      { type: 'result', title: 'Out at first', text: 'You beat the batter to the bag for the easy out; the lead runner moves up to second.',
        coach: 'Covering first on a bunt is automatic once the first baseman charges — there is no other job for you on that play.',
        flash: ['1B', '2B'] }
    ]
  },

  {
    id: '2b-r1-up-middle-cover',
    position: '2B',
    title: 'Ground ball up the middle, runner on first',
    situation: { outs: 0, runners: ['first'] },
    description: 'Nobody out, runner on first. Ground ball hit up the middle, out of your reach.',
    steps: [
      { type: 'ball', kind: 'ground', from: 'home', to: 'SS', duration: 1200,
        caption: 'Ground ball up the middle — the shortstop ranges over to cut it off…',
        fielders: [{ who: 'SS', to: 'upMiddle' }],
        runners: [
          { id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.4 },
          { id: 'r1', from: 'first', to: 'second', fromT: 0, toT: 0.4 }
        ] },
      { type: 'pause', ms: 200 },
      { type: 'question',
        prompt: 'The shortstop fields it moving toward second base. What’s your job?',
        options: ['Sprint to cover second base for his flip', 'Cover first base instead', 'Stay home at second and wait for the throw'],
        answer: 0,
        hint: 'Whoever doesn’t field the ball covers the bag for the flip.',
        explanation: 'When the shortstop ranges toward second to field a ball up the middle, he can flip it there without stopping his momentum — but only if you’re there to take it. Sprint to the bag.' },
      { type: 'move', duration: 500, caption: 'You break for the bag…', fielders: [{ who: '2B', to: 'second' }] },
      { type: 'throw', from: 'SS', to: 'second', duration: 500, caption: 'Flip to second…',
        runners: [
          { id: 'r1', from: 'first', to: 'second', fromT: 0.4, toT: 1 },
          { id: 'batter', from: 'home', to: 'first', fromT: 0.4, toT: 0.7 }
        ] },
      { type: 'pause', ms: 150 },
      { type: 'throw', from: '2B', to: 'first', duration: 600, ballArrivesAt: 0.7, caption: '…and on to first to complete it.',
        fielders: [{ who: '1B', to: 'first' }],
        runners: [{ id: 'batter', from: 'home', to: 'first', fromT: 0.7, toT: 1 }] },
      { type: 'result', title: 'Double play, 6-4-3!', text: 'Shortstop starts it, you finish it at second, the first baseman completes it.',
        coach: 'This is the mirror image of the 4-6-3 double play — same force-then-relay logic, just started by the shortstop instead of you.',
        flash: ['SS', '2B', '1B'] }
    ]
  },

  {
    id: '2b-r1-steal-cover-rhb',
    position: '2B',
    title: 'Stolen base attempt, right-handed batter',
    situation: { outs: 1, runners: ['first'] },
    description: 'One out, runner on first. A right-handed batter is at the plate and the runner takes off for second.',
    steps: [
      { type: 'move', duration: 900, caption: 'Runner breaks for second — the catcher comes up throwing…',
        fielders: [{ who: '2B', to: 'second' }],
        runners: [{ id: 'r1', from: 'first', to: 'second', fromT: 0, toT: 0.75 }] },
      { type: 'question',
        prompt: 'With a right-handed batter up, whose job is it to cover second on the steal?',
        options: ['Yours — the shortstop stays home to guard the side a righty is more likely to pull the ball toward', 'The shortstop’s — you stay back', 'Nobody’s — wait and see where the throw goes'],
        answer: 0,
        hint: 'Think about which side of the infield a right-handed hitter is more likely to hit the ball toward.',
        explanation: 'Against a right-handed batter, the shortstop has to stay closer to guard the left side, so second-base coverage on a steal falls to you.' },
      { type: 'throw', from: 'C', to: 'second', duration: 550, ballArrivesAt: 0.7, caption: 'Strong throw down from the catcher…',
        runners: [{ id: 'r1', from: 'first', to: 'second', fromT: 0.75, toT: 1 }] },
      { type: 'result', title: 'Caught stealing!', text: 'You take the throw and slap down the tag just before he gets in.',
        coach: 'Knowing who covers on a steal isn’t guesswork — it’s set by the batter’s handedness before the pitch is even thrown.',
        flash: ['2B'] }
    ]
  },

  {
    id: '2b-r1-steal-hold-lhb',
    position: '2B',
    title: 'Stolen base attempt, left-handed batter',
    situation: { outs: 1, runners: ['first'] },
    description: 'One out, runner on first. A left-handed batter is at the plate and the runner takes off for second.',
    steps: [
      { type: 'move', duration: 900, caption: 'Runner breaks for second — but it’s the shortstop moving to cover…',
        fielders: [{ who: 'SS', to: 'second' }],
        runners: [{ id: 'r1', from: 'first', to: 'second', fromT: 0, toT: 0.75 }] },
      { type: 'question',
        prompt: 'The batter’s left-handed and the shortstop is covering second. What’s your read?',
        options: ['Hold your ground and shade toward the right-side hole he could pull the ball into', 'Break for second anyway to back up the shortstop', 'Sprint over to cover first base'],
        answer: 0,
        hint: 'If the shortstop already has the bag, running there too just leaves a hole open somewhere else.',
        explanation: 'Against a left-handed batter the shortstop covers second, not you. That frees you to stay where you are and guard the right side. If you run to a base someone else already has covered, you just leave a hole where the ball might go.' },
      { type: 'throw', from: 'C', to: 'second', duration: 550, ballArrivesAt: 0.7, caption: 'Throw goes down to the shortstop covering…',
        runners: [{ id: 'r1', from: 'first', to: 'second', fromT: 0.75, toT: 1 }] },
      { type: 'result', title: 'Caught stealing — your positioning held', text: 'The shortstop applies the tag; you stayed exactly where you needed to be.',
        coach: 'Not moving can be just as much "doing your job" as moving. Vacating your spot when someone else already has the bag covered just creates a new hole.',
        flash: ['SS'] }
    ]
  },

  {
    id: '2b-r1-line-drive-dp',
    position: '2B',
    title: 'Line drive with the runner going, runner on first',
    situation: { outs: 0, runners: ['first'] },
    description: 'Nobody out, runner on first — and he’s running on the pitch. A hard line drive comes right at you.',
    steps: [
      { type: 'ball', kind: 'line', from: 'home', to: '2B', duration: 500,
        caption: 'Hard line drive — and the runner was already going!',
        runners: [{ id: 'r1', from: 'first', to: 'second', fromT: 0, toT: 0.55 }] },
      { type: 'question',
        prompt: 'You snag the liner out of the air. The runner is already halfway to second. What’s the play?',
        options: ['Fire it to first before he can scramble back', 'Take the sure out you already have — no need to rush', 'Throw to second even though nobody forced him there'],
        answer: 0,
        hint: 'A line drive caught in the air isn’t a force play — he has to get back to his base.',
        explanation: 'Once you catch a line drive, any runner off his base has to retag it. He broke hard toward second, so first base is wide open for an easy second out if you’re quick.' },
      { type: 'throw', from: '2B', to: 'first', duration: 550, ballArrivesAt: 0.7, caption: 'Quick throw across before he can retreat…',
        fielders: [{ who: '1B', to: 'first' }],
        runners: [{ id: 'r1', from: 'first', to: 'second', fromT: 0.55, toT: 0.25 }] },
      { type: 'result', title: 'Unassisted double play!', text: 'You caught it and beat him back to the bag — he is doubled off first.',
        coach: 'Line drives hit right at an infielder with a runner going are some of the easiest double plays in baseball — if you’re heads-up enough to know the runner has to retag.',
        flash: ['2B', '1B'] }
    ]
  },

  {
    id: '2b-r1-two-outs-simple',
    position: '2B',
    title: 'Ground ball with two outs, runner on first',
    situation: { outs: 2, runners: ['first'] },
    description: 'Two outs, runner on first. Ground ball hit to you.',
    steps: [
      { type: 'ball', kind: 'ground', from: 'home', to: '2B', duration: 1100,
        caption: 'Two-hopper right at you…',
        runners: [
          { id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.55 },
          { id: 'r1', from: 'first', to: 'second', fromT: 0, toT: 1 }
        ] },
      { type: 'pause', ms: 250 },
      { type: 'question',
        prompt: 'Two outs already. Where does the ball go?',
        options: ['Straight to first — any out ends the inning', 'To second first, to try to start a double play', 'Look the runner back before throwing anywhere'],
        answer: 0,
        hint: 'With two outs, is there any extra value in getting the lead runner instead of the sure out?',
        explanation: 'With two outs, a double play has no extra value — any single out ends the inning immediately. Take the closest, surest out, which is almost always first base.' },
      { type: 'throw', from: '2B', to: 'first', duration: 650, ballArrivesAt: 0.7, caption: 'Simple throw to first…',
        fielders: [{ who: '1B', to: 'first' }],
        runners: [{ id: 'batter', from: 'home', to: 'first', fromT: 0.55, toT: 1 }] },
      { type: 'result', title: 'Inning over', text: 'The sure out at first ends it — no need to complicate a two-out play.',
        coach: 'Two outs simplifies everything: don’t manufacture a harder play when the easy one ends the inning just as well.',
        flash: ['2B', '1B'] }
    ]
  },

  /* ---------------- runner on second ---------------- */

  {
    id: '2b-r2-daylight-pickoff',
    position: '2B',
    title: 'Daylight pickoff at second',
    situation: { outs: 1, runners: ['second'] },
    description: 'One out, runner on second. He’s getting comfortable and stretching his lead toward third.',
    steps: [
      { type: 'move', duration: 900,
        caption: 'The runner extends his lead toward third, and you drift in behind him toward the bag…',
        fielders: [{ who: '2B', to: 'second' }],
        runners: [{ id: 'r2', from: 'second', to: 'third', fromT: 0, toT: 0.22 }] },
      { type: 'question',
        prompt: 'You’re sneaking in behind him with the pitcher holding the ball. What makes this pickoff work?',
        options: ['Time your break so you get between him and the bag — the pitcher throws the instant he sees daylight between you and the runner', 'Get to the bag early and stand on it so the pitcher knows you’re ready', 'Wait until the pitcher has already thrown, then break for the bag'],
        answer: 0,
        hint: 'The play is named for what the pitcher is looking for when he glances back at second.',
        explanation: 'That gap is the “daylight.” The pitcher looks back and throws only once he sees space between you and the runner — meaning you’re closer to the bag than the runner is. Standing on the bag early tips the play and he just steps back; breaking after the throw means you never get there.' },
      { type: 'throw', from: 'P', to: 'second', duration: 500, ballArrivesAt: 0.7,
        caption: 'The pitcher sees daylight, spins, and throws…',
        runners: [{ id: 'r2', from: 'second', to: 'third', fromT: 0.22, toT: 0.16 }] },
      { type: 'result', title: 'Picked off!', text: 'He was still a step and a half off the bag when the tag came down — no chance to dive back in time.',
        coach: 'The daylight play is a timing play between you and the pitcher, and it lives or dies on your break. Too early and the runner sees you and shortens up; too late and there’s no daylight for the pitcher to throw into.',
        flash: ['2B', 'P'] }
    ]
  },

  {
    id: '2b-r2-grounder-no-force',
    position: '2B',
    title: 'Ground ball with a runner on second',
    situation: { outs: 1, runners: ['second'] },
    description: 'One out, runner on second. A grounder is hit to you.',
    steps: [
      { type: 'ball', kind: 'ground', from: 'home', to: '2B', duration: 1100,
        caption: 'Grounder to the right side…',
        runners: [
          { id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.55 },
          { id: 'r2', from: 'second', to: 'third', fromT: 0, toT: 1 }
        ] },
      { type: 'pause', ms: 250 },
      { type: 'question',
        prompt: 'There’s no force on the runner at second. What do you do with the ball?',
        options: ['Throw to first for the sure out', 'Try to chase down the runner off second', 'Throw to third even though nobody covers it'],
        answer: 0,
        hint: 'A runner on second isn’t forced to run — think about which out is actually available.',
        explanation: 'With a runner on second and nobody forced to move, the safe, sure play is to first base. Chasing a runner who isn’t forced usually just gets everybody safe.' },
      { type: 'throw', from: '2B', to: 'first', duration: 650, ballArrivesAt: 0.7,
        caption: 'Throw across the diamond…',
        fielders: [{ who: '1B', to: 'first' }],
        runners: [{ id: 'batter', from: 'home', to: 'first', fromT: 0.55, toT: 1 }] },
      { type: 'result', title: 'Out at first', text: 'Batter is out; the runner on second held up and stays at second.',
        coach: 'When nobody’s forced, take the guaranteed out. Don’t get greedy chasing a runner who has a base to retreat to.',
        flash: ['2B', '1B'] }
    ]
  },

  {
    id: '2b-r2-cover-first-on-cut',
    position: '2B',
    title: 'Base hit to center, runner on second',
    situation: { outs: 1, runners: ['second'] },
    description: 'One out, runner on second. The ball gets through the infield into center field, and that runner is going to try to score.',
    steps: [
      { type: 'ball', kind: 'ground', from: 'home', to: 'shallowCenterField', duration: 1400,
        caption: 'Base hit up the middle into center field…',
        runners: [
          { id: 'r2', from: 'second', to: 'home', fromT: 0, toT: 0.45 },
          { id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.5 }
        ] },
      { type: 'move', duration: 600,
        caption: 'The first baseman runs out to line up for the throw home…',
        fielders: [{ who: '1B', to: 'cutoff1B' }],
        runners: [
          { id: 'r2', from: 'second', to: 'home', fromT: 0.45, toT: 0.62 },
          { id: 'batter', from: 'home', to: 'first', fromT: 0.5, toT: 0.7 }
        ] },
      { type: 'question',
        prompt: 'The first baseman just left the bag to take the cut. Where do you go?',
        options: ['Cover first base', 'Run out to take the throw yourself', 'Stay at second base'],
        answer: 0,
        hint: 'Somebody just left a base empty, and the batter is running straight to it.',
        explanation: 'On a ball to center or right, the first baseman takes the cut. That leaves first base empty with the batter running to it — so it is yours. It is the same rule as a bunt: any time the first baseman leaves the bag, you cover it.' },
      { type: 'move', duration: 550, caption: 'You break over to cover first…',
        fielders: [{ who: '2B', to: 'first' }],
        runners: [
          { id: 'r2', from: 'second', to: 'home', fromT: 0.62, toT: 0.78 },
          { id: 'batter', from: 'home', to: 'first', fromT: 0.7, toT: 1 }
        ] },
      { type: 'throw', from: 'shallowCenterField', to: 'cutoff1B', duration: 650,
        caption: 'The center fielder throws to the cut man…',
        runners: [{ id: 'r2', from: 'second', to: 'home', fromT: 0.78, toT: 0.9 }] },
      { type: 'throw', from: 'cutoff1B', to: 'home', duration: 550, ballArrivesAt: 0.7,
        caption: '…and he turns and fires home.',
        fielders: [{ who: 'C', to: 'home' }],
        runners: [{ id: 'r2', from: 'second', to: 'home', fromT: 0.9, toT: 1 }] },
      { type: 'result', title: 'Out at the plate!', text: 'The cut man got it home in time. You had first base covered the whole way, so the batter could not sneak down there.',
        coach: 'First baseman leaves the bag, you cover first. Bunt or cutoff, it is the same job every time.',
        flash: ['1B', 'C', '2B'] }
    ]
  },

  {
    id: '2b-r2-bunt-cover-first',
    position: '2B',
    title: 'Bunt with a runner on second',
    situation: { outs: 0, runners: ['second'] },
    description: 'Nobody out, runner on second. The batter squares around to bunt.',
    steps: [
      { type: 'move', duration: 700,
        caption: 'The batter squares to bunt and the first baseman charges…',
        fielders: [{ who: '1B', to: 'buntFirst' }, { who: '3B', to: 'buntThird' }] },
      { type: 'question',
        prompt: 'The first baseman is charging in for the bunt. Where do you go?',
        options: ['Cover first base', 'Cover second base', 'Charge in for the bunt too'],
        answer: 0,
        hint: 'The first baseman just left his base. Somebody has to be standing on it.',
        explanation: 'Same job as any other bunt: the moment the first baseman charges, first base is empty and it is yours. It does not matter which base the runners are on — if he charges, you cover.' },
      { type: 'move', duration: 600, caption: 'You break for first…', fielders: [{ who: '2B', to: 'first' }] },
      { type: 'ball', kind: 'ground', from: 'home', to: 'buntFirst', duration: 850,
        caption: 'Bunt rolls out in front of the plate…',
        runners: [
          { id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.7 },
          { id: 'r2', from: 'second', to: 'third', fromT: 0, toT: 1 }
        ] },
      { type: 'throw', from: 'buntFirst', to: 'first', duration: 500, ballArrivesAt: 0.7,
        caption: 'Throw over to you at the bag…',
        runners: [{ id: 'batter', from: 'home', to: 'first', fromT: 0.7, toT: 1 }] },
      { type: 'result', title: 'Out at first', text: 'You were there for the throw. The runner moves up to third.',
        coach: 'First baseman charges, you cover first. Learn it once and it works in every bunt situation you will ever see.',
        flash: ['1B', '2B'] }
    ]
  },

  /* ---------------- runner on third ---------------- */

  {
    id: '2b-r3-check-runner',
    position: '2B',
    title: 'Ground ball with a runner on third',
    situation: { outs: 1, runners: ['third'] },
    description: 'One out, runner on third. A slow roller comes your way.',
    steps: [
      { type: 'ball', kind: 'ground', from: 'home', to: '2B', duration: 1300,
        caption: 'Slow roller out toward second…',
        runners: [
          { id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.3 },
          { id: 'r3', from: 'third', to: 'home', fromT: 0, toT: 0.15 }
        ] },
      { type: 'pause', ms: 200 },
      { type: 'question',
        prompt: 'The runner on third is inching down the line. What’s your first move?',
        options: ['Look the runner back before throwing to first', 'Throw home immediately', 'Ignore the runner and throw to first without looking'],
        answer: 0,
        hint: 'A runner on third can score on a careless throw if you don’t make him respect you first.',
        explanation: 'A quick, hard look toward third keeps the runner honest before you complete the sure out at first. Throwing blind can let him break for home.' },
      { type: 'move', duration: 350, caption: 'You glance toward third, freezing the runner…',
        runners: [{ id: 'r3', from: 'third', to: 'home', fromT: 0.15, toT: 0 }] },
      { type: 'throw', from: '2B', to: 'first', duration: 650, ballArrivesAt: 0.7,
        caption: 'Then fire across to first…',
        fielders: [{ who: '1B', to: 'first' }],
        runners: [{ id: 'batter', from: 'home', to: 'first', fromT: 0.3, toT: 1 }] },
      { type: 'result', title: 'Out at first, runner holds', text: 'The batter is out and the runner on third stayed put.',
        coach: 'You won’t throw the runner out at third very often, but making him respect you before you throw is what keeps him from scoring for free.',
        flash: ['2B', '1B'] }
    ]
  },

  {
    id: '2b-r3-bunt-cover-first',
    position: '2B',
    title: 'Bunt with a runner on third',
    situation: { outs: 1, runners: ['third'] },
    description: 'One out, runner on third. The batter drops a bunt down and the runner breaks for home.',
    steps: [
      { type: 'move', duration: 650,
        caption: 'The batter squares, the corners charge, and the runner on third takes off…',
        fielders: [{ who: '1B', to: 'buntFirst' }, { who: '3B', to: 'buntThird' }],
        runners: [{ id: 'r3', from: 'third', to: 'home', fromT: 0, toT: 0.35 }] },
      { type: 'question',
        prompt: 'Everything is happening at home plate. What is your job?',
        options: ['Cover first base', 'Run in toward home plate to help', 'Stay where you are and watch the play'],
        answer: 0,
        hint: 'The play at home is the catcher and the corners. Who is left for first base?',
        explanation: 'It feels like you should run toward the action, but the play at home belongs to the catcher and the corner infielders. The first baseman charged, so first base is empty — and if they cannot get the runner at home, the throw is coming to you.' },
      { type: 'move', duration: 550, caption: 'You break for first…', fielders: [{ who: '2B', to: 'first' }] },
      { type: 'ball', kind: 'ground', from: 'home', to: 'buntHome', duration: 700,
        caption: 'The bunt rolls out in front of the plate…',
        runners: [
          { id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.5 },
          { id: 'r3', from: 'third', to: 'home', fromT: 0.35, toT: 0.95 }
        ] },
      { type: 'throw', from: 'buntHome', to: 'first', duration: 600, ballArrivesAt: 0.7,
        caption: 'No play at home — the throw comes to first instead…',
        runners: [
          { id: 'batter', from: 'home', to: 'first', fromT: 0.5, toT: 1 },
          { id: 'r3', from: 'third', to: 'home', fromT: 0.95, toT: 1 }
        ] },
      { type: 'result', title: 'Out at first, run scores', text: 'The runner beat the play home, but you were on the bag to get the batter.',
        coach: 'Do not chase the exciting play. Cover your base — a lot of the time the throw ends up coming to you anyway.',
        flash: ['2B'] }
    ]
  },

  {
    id: '2b-r3-cover-second-on-cut',
    position: '2B',
    title: 'Base hit to left, runner on third',
    situation: { outs: 1, runners: ['third'] },
    description: 'One out, runner on third. A base hit drops into left field and that runner takes off for home.',
    steps: [
      { type: 'ball', kind: 'ground', from: 'home', to: 'shallowLeftField', duration: 1400,
        caption: 'Base hit into left field…',
        runners: [
          { id: 'r3', from: 'third', to: 'home', fromT: 0, toT: 0.75 },
          { id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.5 }
        ] },
      { type: 'move', duration: 600,
        caption: 'The third baseman runs out to line up for the throw home…',
        fielders: [{ who: '3B', to: 'cutoff3B' }, { who: 'SS', to: 'third' }],
        runners: [
          { id: 'r3', from: 'third', to: 'home', fromT: 0.75, toT: 1 },
          { id: 'batter', from: 'home', to: 'first', fromT: 0.5, toT: 0.75 }
        ] },
      { type: 'question',
        prompt: 'On a ball to left, the third baseman takes the cut. Where do you go?',
        options: ['Cover second base', 'Cover first base', 'Run out to take the throw yourself'],
        answer: 0,
        hint: 'Check who actually left their base this time. Is first base empty?',
        explanation: 'The third baseman took the cut, not the first baseman — so first base is still covered and you do not need it. Your job is second base, because the batter will try to keep running once the throw goes home.' },
      { type: 'move', duration: 500, caption: 'You cover second…',
        fielders: [{ who: '2B', to: 'second' }],
        runners: [{ id: 'batter', from: 'home', to: 'first', fromT: 0.75, toT: 1 }] },
      { type: 'throw', from: 'shallowLeftField', to: 'cutoff3B', duration: 600,
        caption: 'The left fielder throws to the cut man…' },
      { type: 'throw', from: 'cutoff3B', to: 'home', duration: 500,
        caption: '…and he turns and throws home.',
        fielders: [{ who: 'C', to: 'home' }] },
      { type: 'result', title: 'Run scores, but the batter holds at first', text: 'The runner beat the throw home. You had second covered, so the batter had to stop at first instead of taking an extra base.',
        coach: 'Ball to left, the third baseman cuts and you take second. Ball to centre or right, the first baseman cuts and you take first. Watch who leaves their base — that tells you which one is yours.',
        flash: ['3B', '2B'] }
    ]
  },

  /* ---------------- runners on first and second ---------------- */

  {
    id: '2b-r1r2-double-play',
    position: '2B',
    title: 'Ground ball with runners on first and second',
    situation: { outs: 0, runners: ['first', 'second'] },
    description: 'Nobody out, runners on first and second. Ground ball hit right at you.',
    steps: [
      { type: 'ball', kind: 'ground', from: 'home', to: '2B', duration: 1150,
        caption: 'Two-hopper to the second baseman…',
        fielders: [{ who: 'SS', to: 'second' }],
        runners: [
          { id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.35 },
          { id: 'r1', from: 'first', to: 'second', fromT: 0, toT: 0.4 },
          { id: 'r2', from: 'second', to: 'third', fromT: 0, toT: 0.4 }
        ] },
      { type: 'pause', ms: 200 },
      { type: 'question',
        prompt: 'Two runners are forced. Where do you go first?',
        options: ['Throw to second base to start the double play', 'Throw straight to third for the runner going there', 'Hold the ball since everyone is forced anyway'],
        answer: 0,
        hint: 'You can only make one throw at a time — start with the out that keeps the double play alive.',
        explanation: 'Third base isn’t covered on this play, so the runner heading there isn’t yours to worry about. Take the sure double play: second, then first.' },
      { type: 'throw', from: '2B', to: 'second', duration: 550,
        caption: 'Flip to the shortstop covering the bag…',
        runners: [
          { id: 'r1', from: 'first', to: 'second', fromT: 0.4, toT: 1 },
          { id: 'r2', from: 'second', to: 'third', fromT: 0.4, toT: 1 },
          { id: 'batter', from: 'home', to: 'first', fromT: 0.35, toT: 0.7 }
        ] },
      { type: 'pause', ms: 180 },
      { type: 'throw', from: 'SS', to: 'first', duration: 600, ballArrivesAt: 0.7,
        caption: '…and on to first to complete it.',
        fielders: [{ who: '1B', to: 'first' }],
        runners: [{ id: 'batter', from: 'home', to: 'first', fromT: 0.7, toT: 1 }] },
      { type: 'result', title: 'Double play!', text: 'Force at second, relay to first — two away, and the runner from second moves up to third.',
        coach: 'With runners on first and second, the double play is almost always second-to-first. The runner advancing from second to third is a fair trade for two outs.',
        flash: ['SS', '1B'] }
    ]
  },

  {
    id: '2b-r1r2-slow-roller-one-out',
    position: '2B',
    title: 'Slow roller, runners on first and second',
    situation: { outs: 1, runners: ['first', 'second'] },
    description: 'One out, runners on first and second. The batter hits a slow roller that dies in front of you.',
    steps: [
      { type: 'ball', kind: 'ground', from: 'home', to: 'slowRoller2B', duration: 1500,
        caption: 'Slow roller — it takes you a long time to get to it…',
        fielders: [{ who: '2B', to: 'slowRoller2B' }],
        runners: [
          { id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.75 },
          { id: 'r1', from: 'first', to: 'second', fromT: 0, toT: 1 },
          { id: 'r2', from: 'second', to: 'third', fromT: 0, toT: 1 }
        ] },
      { type: 'question',
        prompt: 'The ball took so long to reach you that you only have time for one throw. Where does it go?',
        options: ['Throw to first for the out you can definitely get', 'Throw to second and hope you beat the runner', 'Throw to third to try to get the front runner'],
        answer: 0,
        hint: 'You lost a lot of time waiting on this ball. Which runner has the farthest left to go?',
        explanation: 'On a slow roller you get to the ball late, so the runners are already close to their bases. The batter started at home and has the longest way to run, which makes first base the one out you can still get. Trying for a runner who is nearly there usually means getting nobody.' },
      { type: 'throw', from: 'slowRoller2B', to: 'first', duration: 600, ballArrivesAt: 0.7,
        caption: 'Quick throw over to first…',
        fielders: [{ who: '1B', to: 'first' }],
        runners: [{ id: 'batter', from: 'home', to: 'first', fromT: 0.75, toT: 1 }] },
      { type: 'result', title: 'Out at first', text: 'Two outs. The runners moved up, but you got the out that was actually there.',
        coach: 'When a ball takes a long time to get to you, take the easy out. One sure out beats a risky throw that gets nobody.',
        flash: ['2B', '1B'] }
    ]
  },

  {
    id: '2b-r1r2-infield-fly',
    position: '2B',
    title: 'Pop-up with runners on first and second',
    situation: { outs: 0, runners: ['first', 'second'] },
    description: 'Nobody out, runners on first and second. The batter pops it straight up over the infield. The umpire yells "Infield fly, batter is out!"',
    steps: [
      { type: 'ball', kind: 'fly', from: 'home', to: 'upMiddle', duration: 1600,
        caption: 'High pop-up over the infield — the umpire calls infield fly…',
        fielders: [{ who: '2B', to: 'upMiddle' }] },
      { type: 'question',
        prompt: 'The umpire called infield fly. What does that mean for you?',
        options: ['The batter is already out — just catch it and don’t chase the runners', 'You must catch it or the batter is safe', 'You should let it drop so you can get two outs'],
        answer: 0,
        hint: 'The umpire said "batter is out" before anyone caught anything.',
        explanation: 'Infield fly means the batter is out the moment the umpire calls it, caught or not. The rule exists so the defense cannot drop it on purpose and get an easy double play. Catch the ball, and leave the runners alone — they do not have to run.' },
      { type: 'result', title: 'Batter is out', text: 'You squeeze the pop-up. One out, and the runners stay where they were.',
        coach: 'Infield fly means the batter is out no matter what. Catch it, hold the ball, and do not go chasing runners who do not have to move.',
        flash: ['2B'] }
    ]
  },

  /* ---------------- runners on first and third ---------------- */

  {
    id: '2b-r1r3-take-the-out',
    position: '2B',
    title: 'Ground ball with runners on first and third',
    situation: { outs: 0, runners: ['first', 'third'] },
    description: 'Nobody out, runners on first and third. Ground ball to you.',
    steps: [
      { type: 'ball', kind: 'ground', from: 'home', to: '2B', duration: 1150,
        caption: 'Ground ball to the right side…',
        fielders: [{ who: 'SS', to: 'second' }],
        runners: [
          { id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.35 },
          { id: 'r1', from: 'first', to: 'second', fromT: 0, toT: 0.4 },
          { id: 'r3', from: 'third', to: 'home', fromT: 0, toT: 0.35 }
        ] },
      { type: 'pause', ms: 200 },
      { type: 'question',
        prompt: 'The runner on third is going to score no matter what you do here. What’s the right play?',
        options: ['Take the sure double play at second and first', 'Throw home even though you have no realistic shot', 'Hold the ball to keep the runner on third from scoring'],
        answer: 0,
        hint: 'You have no play at home from where you’re standing — so what’s the best use of the out(s) you can actually get?',
        explanation: 'From the second baseman’s position there is no play at home. Give up the run and take the guaranteed double play — two outs is a great trade for one run, especially early in a game.' },
      { type: 'throw', from: '2B', to: 'second', duration: 550,
        caption: 'Force at second first…',
        runners: [
          { id: 'r1', from: 'first', to: 'second', fromT: 0.4, toT: 1 },
          { id: 'batter', from: 'home', to: 'first', fromT: 0.35, toT: 0.7 },
          { id: 'r3', from: 'third', to: 'home', fromT: 0.35, toT: 1 }
        ] },
      { type: 'pause', ms: 180 },
      { type: 'throw', from: 'SS', to: 'first', duration: 600, ballArrivesAt: 0.7,
        caption: '…then across to complete the double play.',
        fielders: [{ who: '1B', to: 'first' }],
        runners: [{ id: 'batter', from: 'home', to: 'first', fromT: 0.7, toT: 1 }] },
      { type: 'result', title: 'Run scores, but you get two', text: 'The runner from third scores, but the double play erases the inning’s momentum.',
        coach: 'You had no chance to get the runner at home from where you were standing. Getting two outs is worth far more than chasing a play you were never going to make.',
        flash: ['SS', '1B'] }
    ]
  },

  {
    id: '2b-r1r3-two-outs',
    position: '2B',
    title: 'Ground ball with two outs, runners on first and third',
    situation: { outs: 2, runners: ['first', 'third'] },
    description: 'Two outs, runners on first and third. A ground ball comes right to you.',
    steps: [
      { type: 'ball', kind: 'ground', from: 'home', to: '2B', duration: 1100,
        caption: 'Ground ball right at you…',
        runners: [
          { id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.55 },
          { id: 'r1', from: 'first', to: 'second', fromT: 0, toT: 1 },
          { id: 'r3', from: 'third', to: 'home', fromT: 0, toT: 1 }
        ] },
      { type: 'pause', ms: 200 },
      { type: 'question',
        prompt: 'There are already two outs. Where do you throw it?',
        options: ['To first base — one out ends the inning', 'Home, to stop the run from scoring', 'To second base to get the runner coming from first'],
        answer: 0,
        hint: 'How many outs do you need to get off the field?',
        explanation: 'With two outs you only need one more, and it ends the inning before the run counts. First base is the closest, easiest out — take it. If you get the out at first, the run does not score at all.' },
      { type: 'throw', from: '2B', to: 'first', duration: 650, ballArrivesAt: 0.7,
        caption: 'Throw to first…',
        fielders: [{ who: '1B', to: 'first' }],
        runners: [{ id: 'batter', from: 'home', to: 'first', fromT: 0.55, toT: 1 }] },
      { type: 'result', title: 'Inning over!', text: 'Third out at first base. The runner crossing the plate does not count, because the out came first.',
        coach: 'Two outs makes it simple: get the easiest out anywhere and you are off the field. No run counts if the third out beats the runner home.',
        flash: ['2B', '1B'] }
    ]
  },

  /* ---------------- runners on second and third ---------------- */

  {
    id: '2b-r2r3-no-force',
    position: '2B',
    title: 'Ground ball with runners on second and third',
    situation: { outs: 1, runners: ['second', 'third'] },
    description: 'One out, runners on second and third. Grounder hit your way.',
    steps: [
      { type: 'ball', kind: 'ground', from: 'home', to: '2B', duration: 1150,
        caption: 'Grounder right at you…',
        runners: [
          { id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.55 },
          { id: 'r2', from: 'second', to: 'third', fromT: 0, toT: 1 },
          { id: 'r3', from: 'third', to: 'home', fromT: 0, toT: 1 }
        ] },
      { type: 'pause', ms: 200 },
      { type: 'question',
        prompt: 'Neither runner is forced to advance. What do you do?',
        options: ['Throw to first for the sure out', 'Throw to third trying to catch the runner off base', 'Throw home even though nobody is breaking hard'],
        answer: 0,
        hint: 'Nobody here has to run — a rushed throw anywhere else risks letting everybody end up safe.',
        explanation: 'With runners on second and third and nobody forced, take the out that is actually there: first base. Anything fancier just risks a throwing error that lets a run score for free.' },
      { type: 'throw', from: '2B', to: 'first', duration: 650, ballArrivesAt: 0.7,
        caption: 'Simple throw to first…',
        fielders: [{ who: '1B', to: 'first' }],
        runners: [{ id: 'batter', from: 'home', to: 'first', fromT: 0.55, toT: 1 }] },
      { type: 'result', title: 'Out at first', text: 'Second out of the inning; the runners on second and third stay put.',
        coach: 'This is the play where discipline matters most — the safe out at first keeps the defense in total control of the inning.',
        flash: ['2B', '1B'] }
    ]
  },

  /* ---------------- bases loaded ---------------- */

  {
    id: '2b-bases-loaded-dp',
    position: '2B',
    title: 'Ground ball with the bases loaded',
    situation: { outs: 0, runners: ['first', 'second', 'third'] },
    description: 'Nobody out, bases loaded. Ground ball hit to you.',
    steps: [
      { type: 'ball', kind: 'ground', from: 'home', to: '2B', duration: 1150,
        caption: 'Two-hopper with the bases jammed…',
        fielders: [{ who: 'SS', to: 'second' }],
        runners: [
          { id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.35 },
          { id: 'r1', from: 'first', to: 'second', fromT: 0, toT: 0.4 },
          { id: 'r2', from: 'second', to: 'third', fromT: 0, toT: 0.35 },
          { id: 'r3', from: 'third', to: 'home', fromT: 0, toT: 0.35 }
        ] },
      { type: 'pause', ms: 200 },
      { type: 'question',
        prompt: 'Every runner is forced. Where do you start the play?',
        options: ['Force at second, then relay to first for the double play', 'Throw home for the force there instead', 'Try to throw out the runner going to third'],
        answer: 0,
        hint: 'Every base has a force here — but which one is closest and gives you the surest double play?',
        explanation: 'With the bases loaded, every runner is forced, so any base works — but second-to-first is the fastest, surest double play from where you’re standing.' },
      { type: 'throw', from: '2B', to: 'second', duration: 550,
        caption: 'Force at second…',
        runners: [
          { id: 'r1', from: 'first', to: 'second', fromT: 0.4, toT: 1 },
          { id: 'r2', from: 'second', to: 'third', fromT: 0.35, toT: 1 },
          { id: 'r3', from: 'third', to: 'home', fromT: 0.35, toT: 1 },
          { id: 'batter', from: 'home', to: 'first', fromT: 0.35, toT: 0.7 }
        ] },
      { type: 'pause', ms: 180 },
      { type: 'throw', from: 'SS', to: 'first', duration: 600, ballArrivesAt: 0.7,
        caption: '…and across to complete it.',
        fielders: [{ who: '1B', to: 'first' }],
        runners: [{ id: 'batter', from: 'home', to: 'first', fromT: 0.7, toT: 1 }] },
      { type: 'result', title: 'Double play, one run in', text: 'The force at second and relay to first turns two; the runner from third scores.',
        coach: 'Bases loaded, nobody out, is exactly when a double play is gold — even giving up a run, you’ve turned one bad situation into just one out away from escaping the inning.',
        flash: ['SS', '1B'] }
    ]
  },

  {
    id: '2b-loaded-two-outs',
    position: '2B',
    title: 'Ground ball with two outs, bases loaded',
    situation: { outs: 2, runners: ['first', 'second', 'third'] },
    description: 'Two outs, bases loaded. A ground ball is hit to you.',
    steps: [
      { type: 'ball', kind: 'ground', from: 'home', to: '2B', duration: 1100,
        caption: 'Ground ball to you with the bases full…',
        fielders: [{ who: 'SS', to: 'second' }],
        runners: [
          { id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 1 },
          { id: 'r1', from: 'first', to: 'second', fromT: 0, toT: 0.5 },
          { id: 'r2', from: 'second', to: 'third', fromT: 0, toT: 1 },
          { id: 'r3', from: 'third', to: 'home', fromT: 0, toT: 0.5 }
        ] },
      { type: 'pause', ms: 200 },
      { type: 'question',
        prompt: 'Two outs, everyone is forced, and you are standing a few steps from second base. What is the fastest out?',
        options: ['Step on second base yourself', 'Throw all the way home for the force there', 'Throw to first base'],
        answer: 0,
        hint: 'You do not always have to throw the ball. Look where your feet already are.',
        explanation: 'Everyone is forced, so any base works — and second base is right next to you. Stepping on it yourself is faster than any throw, and with two outs that one out ends the inning before the run can count.' },
      { type: 'move', duration: 450, caption: 'You take two steps and touch the bag yourself…',
        fielders: [{ who: '2B', to: 'second' }],
        runners: [
          { id: 'r1', from: 'first', to: 'second', fromT: 0.5, toT: 1 },
          { id: 'r3', from: 'third', to: 'home', fromT: 0.5, toT: 1 }
        ] },
      { type: 'result', title: 'Inning over!', text: 'You stepped on second for the force. No throw needed, and no run counts.',
        coach: 'If a base is right next to you and the runner is forced, step on it. The fastest throw is the one you never have to make.',
        flash: ['2B'] }
    ]
  },

  {
    id: '2b-loaded-bunt-force-home',
    position: '2B',
    title: 'Bunt with the bases loaded',
    situation: { outs: 0, runners: ['first', 'second', 'third'] },
    description: 'Nobody out, bases loaded. The batter bunts the ball right toward you on the right side.',
    steps: [
      { type: 'ball', kind: 'ground', from: 'home', to: 'slowRoller2B', duration: 1100,
        caption: 'Bunt pushed out toward the right side, right at you…',
        fielders: [{ who: '2B', to: 'slowRoller2B' }, { who: 'C', to: 'home' }],
        runners: [
          { id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 1 },
          { id: 'r1', from: 'first', to: 'second', fromT: 0, toT: 1 },
          { id: 'r2', from: 'second', to: 'third', fromT: 0, toT: 1 },
          { id: 'r3', from: 'third', to: 'home', fromT: 0, toT: 0.45 }
        ] },
      { type: 'question',
        prompt: 'You field the bunt quickly and the runner from third is racing home. Where do you throw?',
        options: ['Home to the catcher — with the bases loaded that is a force out', 'First base, because a play at home needs a tag', 'Second base for the force there'],
        answer: 0,
        hint: 'With the bases loaded, the runner on third has to run. What does that make home plate?',
        explanation: 'Bases loaded means every runner is forced, including the one on third — so home plate is a force out just like any other base. The catcher only has to touch the plate, no tag needed. You got to this ball fast, so the out at home is there.' },
      { type: 'throw', from: 'slowRoller2B', to: 'home', duration: 550, ballArrivesAt: 0.7,
        caption: 'Throw home to the catcher standing on the plate…',
        runners: [{ id: 'r3', from: 'third', to: 'home', fromT: 0.45, toT: 1 }] },
      { type: 'result', title: 'Force out at home!', text: 'The catcher steps on the plate before the runner gets there. No run scores.',
        coach: 'Bases loaded turns home plate into just another force base. If you get to the ball fast, throwing home stops the run instead of trading it for an out.',
        flash: ['C', '2B'] }
    ]
  }

);
