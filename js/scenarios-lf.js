/* ============================================================
   Baseball IQ — scenarios-lf.js
   Left field scenarios, grouped by base situation.

   Outfield priority, used across all three outfield files:
     - An outfielder beats any infielder on a ball they can both reach.
     - The centre fielder beats both corner outfielders.
   So the left fielder calls off the shortstop and third baseman, and
   gets out of the way for the centre fielder.

   On a throw home, the LEFT fielder's cut man is the THIRD BASEMAN.
   (Centre and right go through the first baseman.)
   ============================================================ */

SCENARIOS.push(

  /* ---------------- bases empty ---------------- */

  {
    id: 'lf-empty-call-off-the-infielder',
    position: 'LF',
    title: 'Shallow fly ball in front of you',
    situation: { outs: 0, runners: [] },
    description: 'Nobody out, nobody on. A soft fly ball drops in front of you, and the shortstop is backpedalling out after it.',
    steps: [
      { type: 'ball', kind: 'fly', from: 'home', to: 'shallowLeftField', duration: 1500,
        caption: 'Soft fly into shallow left — the shortstop drifts back on it…',
        fielders: [{ who: 'SS', to: [290, 275] }, { who: 'LF', to: [215, 220] }] },
      { type: 'question',
        prompt: 'You are running in and the shortstop is backing up. Who should take it?',
        options: ['You — call for it loudly and early', 'The shortstop, since he got there first', 'Whoever ends up closest'],
        answer: 0,
        hint: 'Who is moving forward and who is moving backward?',
        explanation: 'You are running forward with the ball in front of you the whole way. He is backpedalling, which is the hardest way to catch anything. Any ball you can both reach is yours — but you have to call it loudly, and early enough that he can get out of the way.' },
      { type: 'move', duration: 500, caption: 'You call him off and he peels away…',
        fielders: [{ who: 'LF', to: 'shallowLeftField' }, { who: 'SS', to: [335, 330] }] },
      { type: 'result', title: 'Caught!', text: 'Easy catch coming forward, and nobody collided.',
        coach: 'Coming in beats backing up. Call the infielder off — but call it early and call it loud.',
        flash: ['LF'] }
    ]
  },

  {
    id: 'lf-empty-defer-to-cf',
    position: 'LF',
    title: 'Fly ball into the left-center gap',
    situation: { outs: 1, runners: [] },
    description: 'One out, nobody on. A fly ball carries into the gap between you and the center fielder, and you are both running hard at it.',
    steps: [
      { type: 'ball', kind: 'fly', from: 'home', to: 'leftCenterGap', duration: 1800,
        caption: 'Fly ball into the left-center gap — you are both going for it…',
        fielders: [{ who: 'LF', to: [215, 175] }, { who: 'CF', to: [290, 165] }] },
      { type: 'question',
        prompt: 'You can both get there, and the center fielder calls for it. What do you do?',
        options: ['Peel off and let him have it', 'Keep going, you called it first', 'Both go for it and hope'],
        answer: 0,
        hint: 'One outfielder has priority over the other two. Which one?',
        explanation: 'The center fielder has priority over both corner outfielders. He can see the ball better from the middle and usually has more room to run. If he calls it, you get out of the way — and then you back him up in case he drops it.' },
      { type: 'move', duration: 500, caption: 'You peel off and slide in behind him…',
        fielders: [{ who: 'CF', to: 'leftCenterGap' }, { who: 'LF', to: [190, 200] }] },
      { type: 'result', title: 'Center fielder makes the catch', text: 'You gave him room and backed him up behind the play.',
        coach: 'Centre fielder calls it, you give way. Then get behind him — if it pops out, you are the one who saves the base.',
        flash: ['CF'] }
    ]
  },

  {
    id: 'lf-empty-charge-the-single',
    position: 'LF',
    title: 'Base hit in front of you',
    situation: { outs: 1, runners: [] },
    description: 'One out, nobody on. A ground ball gets through the infield and rolls out to you in left field.',
    steps: [
      { type: 'ball', kind: 'ground', from: 'home', to: 'shallowLeftField', duration: 1400,
        caption: 'Ground ball through the infield, rolling out to left…',
        runners: [{ id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.6 }] },
      { type: 'question',
        prompt: 'The ball is rolling toward you and the batter is rounding first. What do you do?',
        options: ['Charge in hard and get to it quickly', 'Wait for it to roll all the way to you', 'Let it stop, then walk in and pick it up'],
        answer: 0,
        hint: 'What is the runner deciding while he watches you?',
        explanation: 'The runner is watching how fast you get to the ball. Charge it and he stops at first. Stroll after it and he takes second for free. You do not even have to throw — just getting there quickly is what keeps him at first.' },
      { type: 'move', duration: 700, caption: 'You charge in hard and scoop it up…',
        fielders: [{ who: 'LF', to: 'shallowLeftField' }],
        runners: [{ id: 'batter', from: 'home', to: 'first', fromT: 0.6, toT: 1 }] },
      { type: 'result', title: 'Runner holds at first', text: 'You got there fast, so he never even thought about second.',
        coach: 'Charging a base hit stops the runner just as well as a throw. Lazy feet give away a base every time.',
        flash: ['LF'] }
    ]
  },

  /* ---------------- runner on first ---------------- */

  {
    id: 'lf-r1-throw-to-third',
    position: 'LF',
    title: 'Base hit with a runner on first',
    situation: { outs: 1, runners: ['first'] },
    description: 'One out, runner on first. A base hit comes out to you in left, and that runner is trying to go all the way to third.',
    steps: [
      { type: 'ball', kind: 'ground', from: 'home', to: 'shallowLeftField', duration: 1300,
        caption: 'Base hit to left — the runner is rounding second, heading for third…',
        fielders: [{ who: 'LF', to: 'shallowLeftField' }, { who: '3B', to: 'third' }],
        runners: [
          { id: 'r1', from: 'first', to: 'third', fromT: 0, toT: 0.55 },
          { id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.7 }
        ] },
      { type: 'question',
        prompt: 'You have the ball quickly and he is still running. Where do you throw?',
        options: ['Third base — you are the closest outfielder to it', 'Second base', 'All the way home'],
        answer: 0,
        hint: 'Where is the runner going, and which outfielder has the shortest throw to that base?',
        explanation: 'Left field is the closest outfield spot to third base, so this throw is yours to make and it is a short one. Nobody is trying to score, so third is where the play is. Throw it low so it can be caught for a tag.' },
      { type: 'throw', from: 'shallowLeftField', to: 'third', duration: 650, ballArrivesAt: 0.7,
        caption: 'Strong low throw down to third…',
        runners: [
          { id: 'r1', from: 'first', to: 'third', fromT: 0.55, toT: 1 },
          { id: 'batter', from: 'home', to: 'first', fromT: 0.7, toT: 1 }
        ] },
      { type: 'result', title: 'Out at third!', text: 'The throw beat him and the third baseman put the tag down.',
        coach: 'A runner going first to third on a ball to left is your play. It is the shortest throw you have — make him pay for it.',
        flash: ['LF', '3B'] }
    ]
  },

  /* ---------------- runner on second ---------------- */

  {
    id: 'lf-r2-hit-the-cut-man',
    position: 'LF',
    title: 'Base hit with a runner on second',
    situation: { outs: 1, runners: ['second'] },
    description: 'One out, runner on second. A base hit comes to you in left field and that runner takes off for home.',
    steps: [
      { type: 'ball', kind: 'ground', from: 'home', to: 'shallowLeftField', duration: 1300,
        caption: 'Base hit to left — the runner is going for home…',
        fielders: [{ who: 'LF', to: 'shallowLeftField' }, { who: '3B', to: 'cutoff3B' }, { who: 'SS', to: 'third' }],
        runners: [
          { id: 'r2', from: 'second', to: 'home', fromT: 0, toT: 0.55 },
          { id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.7 }
        ] },
      { type: 'question',
        prompt: 'The third baseman has run out and is lined up between you and home, waving his arms. What do you do?',
        options: ['Throw it hard and low, straight at him', 'Throw it over him, all the way to the plate on the fly', 'Run it in yourself'],
        answer: 0,
        hint: 'He is standing in that spot for a reason. What can he do that your long throw cannot?',
        explanation: 'That is your cut man, and on a ball to left it is always the third baseman. Throw hard and low right at his chest. If your throw is good he lets it go through; if it is off line he can grab it and stop the batter taking an extra base. Throwing over his head gives up that safety net.' },
      { type: 'throw', from: 'shallowLeftField', to: 'cutoff3B', duration: 600,
        caption: 'Hard low throw right at the cut man…',
        runners: [
          { id: 'r2', from: 'second', to: 'home', fromT: 0.55, toT: 0.9 },
          { id: 'batter', from: 'home', to: 'first', fromT: 0.7, toT: 1 }
        ] },
      { type: 'throw', from: 'cutoff3B', to: 'home', duration: 400, ballArrivesAt: 0.6,
        caption: 'It is on line, so he lets it through to the catcher…',
        fielders: [{ who: 'C', to: 'home' }],
        runners: [{ id: 'r2', from: 'second', to: 'home', fromT: 0.9, toT: 1 }] },
      { type: 'result', title: 'Out at the plate!', text: 'Low and on line, so it went straight through the cut man to the catcher.',
        coach: 'On a ball to left, your cut man is the third baseman. Hit him in the chest and let him decide.',
        flash: ['LF', '3B', 'C'] }
    ]
  },

  {
    id: 'lf-r2-ball-to-the-fence',
    position: 'LF',
    title: 'Ball to the fence, runner on second',
    situation: { outs: 1, runners: ['second'] },
    description: 'One out, runner on second. The batter drives one over your head, all the way to the fence.',
    steps: [
      { type: 'ball', kind: 'fly', from: 'home', to: 'leftCenterGap', duration: 1900,
        caption: 'Over your head and rolling to the fence…',
        fielders: [{ who: 'LF', to: 'leftCenterGap' }, { who: 'SS', to: 'relayLeft' }],
        runners: [
          { id: 'r2', from: 'second', to: 'home', fromT: 0, toT: 0.6 },
          { id: 'batter', from: 'home', to: 'second', fromT: 0, toT: 0.6 }
        ] },
      { type: 'question',
        prompt: 'You have run it down at the fence. The shortstop is out on the grass waving at you. What do you do?',
        options: ['Turn and throw to him — he is your relay man', 'Throw as far as you can toward the infield', 'Throw all the way home on the fly'],
        answer: 0,
        hint: 'You are a very long way from any base. Can you throw that far accurately?',
        explanation: 'From the fence, nobody can throw all the way in accurately. The shortstop comes out to be your relay man, so hit him and let him make the second throw. One long wild throw lets everybody keep running.' },
      { type: 'throw', from: 'leftCenterGap', to: 'relayLeft', duration: 700,
        caption: 'Quick turn and throw to the relay man…',
        runners: [
          { id: 'r2', from: 'second', to: 'home', fromT: 0.6, toT: 1 },
          { id: 'batter', from: 'home', to: 'second', fromT: 0.6, toT: 1 }
        ] },
      { type: 'result', title: 'Run scores, batter holds at second', text: 'You could not stop the run, but hitting the relay man kept the batter at second.',
        coach: 'At the fence, find your relay man. Two good throws always beat one long one.',
        flash: ['LF', 'SS'] }
    ]
  },

  /* ---------------- runner on third ---------------- */

  {
    id: 'lf-r3-tag-up-throw',
    position: 'LF',
    title: 'Fly ball with a runner on third',
    situation: { outs: 1, runners: ['third'] },
    description: 'One out, runner on third. A fly ball comes to you, deep enough that he can tag up and try to score.',
    steps: [
      { type: 'ball', kind: 'fly', from: 'home', to: 'shallowLeftField', duration: 1600,
        caption: 'Fly ball to left — the runner goes back to tag…',
        fielders: [{ who: 'LF', to: 'shallowLeftField' }, { who: '3B', to: 'cutoff3B' }] },
      { type: 'question',
        prompt: 'You are camped under it and he is going to tag and run. How should you catch it?',
        options: ['Move behind the ball so you are already coming forward as you catch it', 'Catch it standing still, then set your feet to throw', 'Catch it and run toward the infield'],
        answer: 0,
        hint: 'You need to throw immediately after catching. Where should your body already be going?',
        explanation: 'Get behind the ball and start moving forward as it comes down, so the catch and the throw are one motion. If you catch it flat-footed you have to reset your feet first, and that pause is exactly the time he needs to score.' },
      { type: 'throw', from: 'shallowLeftField', to: 'cutoff3B', duration: 550,
        caption: 'Caught coming forward — straight into the throw…',
        runners: [{ id: 'r3', from: 'third', to: 'home', fromT: 0, toT: 0.75 }] },
      { type: 'throw', from: 'cutoff3B', to: 'home', duration: 400, ballArrivesAt: 0.6,
        caption: 'Through the cut man to the catcher…',
        fielders: [{ who: 'C', to: 'home' }],
        runners: [{ id: 'r3', from: 'third', to: 'home', fromT: 0.75, toT: 1 }] },
      { type: 'result', title: 'Out at the plate — double play!', text: 'Two outs: the catch, then the tag at home.',
        coach: 'On a tag-up, catch the ball moving forward. The throw starts before the catch finishes.',
        flash: ['LF', 'C'] }
    ]
  },

  /* ---------------- runners on first and second ---------------- */

  {
    id: 'lf-r1r2-back-up-third',
    position: 'LF',
    title: 'Ground ball to third base',
    situation: { outs: 1, runners: ['first', 'second'] },
    description: 'One out, runners on first and second. A ground ball is hit to the third baseman, and the runner from second is heading to third.',
    steps: [
      { type: 'ball', kind: 'ground', from: 'home', to: '3B', duration: 1000,
        caption: 'Ground ball to third — the play is going to be right there…',
        runners: [
          { id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.4 },
          { id: 'r1', from: 'first', to: 'second', fromT: 0, toT: 0.45 },
          { id: 'r2', from: 'second', to: 'third', fromT: 0, toT: 0.5 }
        ] },
      { type: 'question',
        prompt: 'The ball is nowhere near you and the play is at third. What do you do?',
        options: ['Sprint in behind third base to back up the play', 'Stay where you are, it is an infield play', 'Move toward center field'],
        answer: 0,
        hint: 'Third base is between you and the infield. What is behind it if the ball gets away?',
        explanation: 'You are the outfielder standing directly behind third base, so any ball that gets past that play comes straight to you. Sprint in every time there is a play at third — if it gets through and you are not there, the runner keeps going home.' },
      { type: 'move', duration: 700, caption: 'You sprint in behind the bag…',
        fielders: [{ who: 'LF', to: 'backupThird' }, { who: '3B', to: 'third' }],
        runners: [
          { id: 'r2', from: 'second', to: 'third', fromT: 0.5, toT: 1 },
          { id: 'r1', from: 'first', to: 'second', fromT: 0.45, toT: 1 },
          { id: 'batter', from: 'home', to: 'first', fromT: 0.4, toT: 1 }
        ] },
      { type: 'result', title: 'Force out at third', text: 'The third baseman stepped on the bag. You were behind him the whole way in case it got loose.',
        coach: 'Any play at third, you run in behind it. Backing up is a job you do on plays where you never touch the ball.',
        flash: ['3B', 'LF'] }
    ]
  },

  /* ---------------- bases loaded ---------------- */

  {
    id: 'lf-loaded-catch-and-throw-home',
    position: 'LF',
    title: 'Fly ball with the bases loaded',
    situation: { outs: 1, runners: ['first', 'second', 'third'] },
    description: 'One out, bases loaded. A fly ball comes out to you, deep enough for the runner on third to tag.',
    steps: [
      { type: 'ball', kind: 'fly', from: 'home', to: 'shallowLeftField', duration: 1600,
        caption: 'Fly ball to left with the bases full — everybody goes back to tag…',
        fielders: [{ who: 'LF', to: 'shallowLeftField' }, { who: '3B', to: 'cutoff3B' }] },
      { type: 'question',
        prompt: 'You catch it for the second out. Where does the throw go?',
        options: ['Home, through the cut man — that is the run', 'Third base', 'Second base'],
        answer: 0,
        hint: 'The catch already got you an out. What is the runner on third about to do?',
        explanation: 'The catch is out number two, so the only thing left that matters is the runner scoring from third. Come up throwing to your cut man on a line toward home. The runners behind him are not worth a throw.' },
      { type: 'throw', from: 'shallowLeftField', to: 'cutoff3B', duration: 550,
        caption: 'Catch and throw in one motion to the cut man…',
        runners: [{ id: 'r3', from: 'third', to: 'home', fromT: 0, toT: 0.75 }] },
      { type: 'throw', from: 'cutoff3B', to: 'home', duration: 400, ballArrivesAt: 0.6,
        caption: 'Straight through to the catcher…',
        fielders: [{ who: 'C', to: 'home' }],
        runners: [{ id: 'r3', from: 'third', to: 'home', fromT: 0.75, toT: 1 }] },
      { type: 'result', title: 'Out at the plate — inning over!', text: 'The catch was the second out and the tag at home was the third.',
        coach: 'After the catch, the only runner who matters is the one trying to score. Throw home through the cut man.',
        flash: ['LF', 'C'] }
    ]
  }

);
