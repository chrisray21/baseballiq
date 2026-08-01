/* ============================================================
   Baseball IQ — scenarios-1b.js
   First base scenarios, grouped by base situation.

   Two jobs define this position:
     - He is the default owner of first base, and only leaves it when
       the ball makes him. Whenever he DOES leave, somebody else has to
       take the bag — the pitcher on a ball to the right side, the
       second baseman on a bunt or a cutoff.
     - He is the cut man on every throw home from centre or right.
   ============================================================ */

SCENARIOS.push(

  /* ---------------- bases empty ---------------- */

  {
    id: '1b-empty-step-on-bag',
    position: '1B',
    title: 'Ground ball right at you',
    situation: { outs: 1, runners: [] },
    description: 'One out, nobody on. A ground ball is hit right at you, only a couple of steps from the bag.',
    steps: [
      { type: 'ball', kind: 'ground', from: 'home', to: '1B', duration: 1100,
        caption: 'Ground ball right at the first baseman…',
        runners: [{ id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.55 }] },
      { type: 'pause', ms: 250 },
      { type: 'question',
        prompt: 'You have the ball and the bag is right beside you. What do you do?',
        options: ['Step on first base yourself', 'Throw to the pitcher covering first', 'Throw it to second base'],
        answer: 0,
        hint: 'You do not always need to throw the ball. Look where your feet are.',
        explanation: 'You are already right there, so just touch the bag. The pitcher only has to cover when the ball pulls you far away from first — on a ball hit right at you, throwing to him only adds a chance to drop it.' },
      { type: 'move', duration: 450, caption: 'Two steps over and you touch the bag…',
        fielders: [{ who: '1B', to: 'first' }],
        runners: [{ id: 'batter', from: 'home', to: 'first', fromT: 0.55, toT: 1 }] },
      { type: 'result', title: 'Out at first', text: 'No throw needed at all.',
        coach: 'If you can reach the bag yourself, take it yourself. The safest throw is the one nobody has to make.',
        flash: ['1B'] }
    ]
  },

  {
    id: '1b-empty-ball-to-your-right',
    position: '1B',
    title: 'Ground ball to your right',
    situation: { outs: 1, runners: [] },
    description: 'One out, nobody on. A ground ball is hit to your right, into the hole between you and the second baseman. You have to range a long way to get it.',
    steps: [
      { type: 'ball', kind: 'ground', from: 'home', to: 'rightSideHole', duration: 1200,
        caption: 'Hit to your right — you range over to cut it off…',
        fielders: [{ who: '1B', to: 'rightSideHole' }, { who: 'P', to: 'first' }],
        runners: [{ id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.6 }] },
      { type: 'question',
        prompt: 'You field it, but you are a long way off the bag now. What do you do?',
        options: ['Throw to the pitcher, who is covering first', 'Run all the way back to the bag yourself', 'Throw to second base'],
        answer: 0,
        hint: 'Look at first base. Somebody should already be running over there.',
        explanation: 'When a ball pulls you off the bag, the pitcher runs over to cover first. That is his job on this exact play, so he should already be on his way. Field it, look up, and give him a soft throw he can catch on the run.' },
      { type: 'throw', from: 'rightSideHole', to: 'first', duration: 550, ballArrivesAt: 0.7,
        caption: 'Easy toss over to the pitcher at the bag…',
        runners: [{ id: 'batter', from: 'home', to: 'first', fromT: 0.6, toT: 1 }] },
      { type: 'result', title: 'Out at first', text: 'The pitcher got there in time and took your throw.',
        coach: 'Ball pulls you off the bag, the pitcher covers. Lead him gently — he is running and catching at the same time.',
        flash: ['1B', 'P'] }
    ]
  },

  {
    id: '1b-empty-foul-popup',
    position: '1B',
    title: 'Pop-up in foul ground',
    situation: { outs: 0, runners: [] },
    description: 'Nobody out, nobody on. The batter pops one up over foul territory, past the first base line.',
    steps: [
      { type: 'ball', kind: 'foul', from: 'home', to: 'foulNearFirst', duration: 1600,
        caption: 'High pop-up drifting into foul ground…',
        fielders: [{ who: '1B', to: 'foulNearFirst' }] },
      { type: 'question',
        prompt: 'It is drifting into foul territory. What do you do?',
        options: ['Go get it — a caught foul pop is still an out', 'Let it drop, it is foul anyway', 'Wait for the catcher to take it'],
        answer: 0,
        hint: 'Does it matter where a fly ball is caught?',
        explanation: 'A fly ball caught in foul territory is an out exactly like one caught in fair territory. Letting it drop just gives the batter another swing. Go get it.' },
      { type: 'result', title: 'Caught in foul ground — out!', text: 'A free out that a lot of players let drop.',
        coach: 'Foul or fair does not matter once it is in the air. If you can catch it, catch it.',
        flash: ['1B'] }
    ]
  },

  /* ---------------- runner on first ---------------- */

  {
    id: '1b-r1-throw-to-second',
    position: '1B',
    title: 'Ground ball with a runner on first',
    situation: { outs: 0, runners: ['first'] },
    description: 'Nobody out, runner on first. A ground ball comes to you a few steps off the bag.',
    steps: [
      { type: 'ball', kind: 'ground', from: 'home', to: '1B', duration: 1100,
        caption: 'Ground ball to the first baseman…',
        fielders: [{ who: 'SS', to: 'second' }, { who: 'P', to: 'first' }],
        runners: [
          { id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.35 },
          { id: 'r1', from: 'first', to: 'second', fromT: 0, toT: 0.4 }
        ] },
      { type: 'pause', ms: 200 },
      { type: 'question',
        prompt: 'The shortstop is covering second and the pitcher is coming to cover first. Where does the ball go first?',
        options: ['Throw to second base to start the double play', 'Step on first and stop there', 'Throw home'],
        answer: 0,
        hint: 'You could get one out by yourself — but how many are available?',
        explanation: 'Stepping on first is the easy out, but it kills the double play. The runner from first is forced, so throw to second first and let them relay back to the pitcher covering first.' },
      { type: 'throw', from: '1B', to: 'second', duration: 500, ballArrivesAt: 0.7,
        caption: 'Throw to the shortstop covering second…',
        runners: [
          { id: 'r1', from: 'first', to: 'second', fromT: 0.4, toT: 1 },
          { id: 'batter', from: 'home', to: 'first', fromT: 0.35, toT: 0.7 }
        ] },
      { type: 'pause', ms: 180 },
      { type: 'throw', from: 'second', to: 'first', duration: 550, ballArrivesAt: 0.7,
        caption: '…and back to the pitcher covering first.',
        runners: [{ id: 'batter', from: 'home', to: 'first', fromT: 0.7, toT: 1 }] },
      { type: 'result', title: 'Double play!', text: 'Two outs, and you started it.',
        coach: 'One out is easy at first base. Look at second first — the extra out is worth the extra throw.',
        flash: ['1B', 'SS', 'P'] }
    ]
  },

  {
    id: '1b-r1-charge-the-bunt',
    position: '1B',
    title: 'Bunt with a runner on first',
    situation: { outs: 0, runners: ['first'] },
    description: 'Nobody out, runner on first. The batter squares around to bunt.',
    steps: [
      { type: 'question',
        prompt: 'The batter has squared to bunt and the ball has not been pitched yet. What do you do?',
        options: ['Charge in toward the plate as the pitch is thrown', 'Stay on the bag in case there is a throw', 'Back up toward right field'],
        answer: 0,
        hint: 'A bunt is going to land softly in front of the plate. Who is closest to it?',
        explanation: 'Once you see the batter square, charge. A bunt dies quickly, and the only way to have a play is to already be moving. The second baseman knows to cover first behind you, so the bag is taken care of.' },
      { type: 'move', duration: 650, caption: 'You charge in as the pitch goes…',
        fielders: [{ who: '1B', to: 'buntFirst' }, { who: '2B', to: 'first' }] },
      { type: 'ball', kind: 'ground', from: 'home', to: 'buntFirst', duration: 800,
        caption: 'Bunt rolls right to you…',
        runners: [
          { id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.6 },
          { id: 'r1', from: 'first', to: 'second', fromT: 0, toT: 0.7 }
        ] },
      { type: 'throw', from: 'buntFirst', to: 'first', duration: 500, ballArrivesAt: 0.7,
        caption: 'Turn and throw to the second baseman on the bag…',
        runners: [
          { id: 'batter', from: 'home', to: 'first', fromT: 0.6, toT: 1 },
          { id: 'r1', from: 'first', to: 'second', fromT: 0.7, toT: 1 }
        ] },
      { type: 'result', title: 'Out at first', text: 'You charged, fielded it, and threw to the second baseman covering.',
        coach: 'See the bunt sign, charge. Never worry about who has first base — the second baseman is already going.',
        flash: ['1B', '2B'] }
    ]
  },

  {
    id: '1b-r1-hold-the-runner',
    position: '1B',
    title: 'Holding a runner on first',
    situation: { outs: 1, runners: ['first'] },
    description: 'One out, runner on first. He is edging further and further off the base.',
    steps: [
      { type: 'move', duration: 900,
        caption: 'The runner keeps stretching his lead…',
        fielders: [{ who: '1B', to: 'first' }],
        runners: [{ id: 'r1', from: 'first', to: 'second', fromT: 0, toT: 0.2 }] },
      { type: 'question',
        prompt: 'You are standing on the bag holding him close. The pitcher throws over. What is your job?',
        options: ['Catch it and put the tag straight down on him', 'Catch it and hold on to it', 'Catch it and throw to second'],
        answer: 0,
        hint: 'He is off the base right now. What is the only way to get him out?',
        explanation: 'A pickoff is a tag play — he is not forced anywhere, so catching the ball does nothing on its own. Catch it and sweep the tag straight down toward the bag in one motion, because he is diving back as you catch it.' },
      { type: 'throw', from: 'mound', to: 'first', duration: 400, ballArrivesAt: 0.6,
        caption: 'Snap throw over to you…',
        runners: [{ id: 'r1', from: 'first', to: 'second', fromT: 0.2, toT: 0 }] },
      { type: 'result', title: 'Safe — but he shortens up', text: 'He dived back in time, but his lead is much smaller now.',
        coach: 'You will not pick many runners off. Holding them close is the real job, and it makes them easier to throw out later.',
        flash: ['1B'] }
    ]
  },

  /* ---------------- runner on second ---------------- */

  {
    id: '1b-r2-take-the-cut',
    position: '1B',
    title: 'Base hit to right, runner on second',
    situation: { outs: 1, runners: ['second'] },
    description: 'One out, runner on second. A base hit drops into right field and that runner takes off for home.',
    steps: [
      { type: 'ball', kind: 'ground', from: 'home', to: 'shallowRightField', duration: 1400,
        caption: 'Base hit into right field — the runner is going for home…',
        runners: [
          { id: 'r2', from: 'second', to: 'home', fromT: 0, toT: 0.5 },
          { id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.55 }
        ] },
      { type: 'question',
        prompt: 'The throw is coming home from right field. What is your job?',
        options: ['Run out and line up between the outfielder and home plate', 'Stay on first base for the batter', 'Run toward the ball in right field'],
        answer: 0,
        hint: 'That is a very long throw. Who stands in the middle of it?',
        explanation: 'On any ball to centre or right with a play at the plate, you are the cut man. Get out in a straight line between the outfielder and home so you can catch a throw that is off target. The second baseman covers first behind you.' },
      { type: 'move', duration: 650, caption: 'You run out and line up with the throw…',
        fielders: [{ who: '1B', to: 'cutoff1B' }, { who: '2B', to: 'first' }],
        runners: [
          { id: 'r2', from: 'second', to: 'home', fromT: 0.5, toT: 0.8 },
          { id: 'batter', from: 'home', to: 'first', fromT: 0.55, toT: 1 }
        ] },
      { type: 'throw', from: 'shallowRightField', to: 'cutoff1B', duration: 600,
        caption: 'The right fielder throws it right at you…',
        runners: [{ id: 'r2', from: 'second', to: 'home', fromT: 0.8, toT: 0.92 }] },
      { type: 'throw', from: 'cutoff1B', to: 'home', duration: 450, ballArrivesAt: 0.65,
        caption: 'You turn and fire home…',
        fielders: [{ who: 'C', to: 'home' }],
        runners: [{ id: 'r2', from: 'second', to: 'home', fromT: 0.92, toT: 1 }] },
      { type: 'result', title: 'Out at the plate!', text: 'Lining up in the middle got the ball home far quicker than one long throw.',
        coach: 'Ball to centre or right with somebody trying to score: you are the cut man. Line yourself up and give the outfielder a target.',
        flash: ['1B', 'C'] }
    ]
  },

  {
    id: '1b-r2-look-him-back',
    position: '1B',
    title: 'Ground ball with a runner on second',
    situation: { outs: 1, runners: ['second'] },
    description: 'One out, runner on second. A ground ball comes to you and the runner breaks for third.',
    steps: [
      { type: 'ball', kind: 'ground', from: 'home', to: '1B', duration: 1100,
        caption: 'Ground ball to first — the runner takes off for third…',
        runners: [
          { id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.5 },
          { id: 'r2', from: 'second', to: 'third', fromT: 0, toT: 0.35 }
        ] },
      { type: 'pause', ms: 200 },
      { type: 'question',
        prompt: 'The runner is partway to third. What do you do?',
        options: ['Look him back, then step on first', 'Throw to third to try to get him', 'Step on first without looking'],
        answer: 0,
        hint: 'Nobody is forcing him to run. What makes a runner stop?',
        explanation: 'He is not forced, so third base would be a tag play across the diamond — a throw you will usually lose. A hard look freezes him, and then you have the easy out standing right beside you.' },
      { type: 'move', duration: 400, caption: 'You look him back and he stops…',
        runners: [{ id: 'r2', from: 'second', to: 'third', fromT: 0.35, toT: 0 }] },
      { type: 'move', duration: 450, caption: 'Then you step on the bag…',
        fielders: [{ who: '1B', to: 'first' }],
        runners: [{ id: 'batter', from: 'home', to: 'first', fromT: 0.5, toT: 1 }] },
      { type: 'result', title: 'Out at first, runner back at second', text: 'Two outs and the runner never got anywhere.',
        coach: 'Look first, then take your out. A runner who is not forced will stop the moment he sees you looking.',
        flash: ['1B'] }
    ]
  },

  /* ---------------- runner on third ---------------- */

  {
    id: '1b-r3-bunt-throw-home',
    position: '1B',
    title: 'Bunt with a runner on third',
    situation: { outs: 1, runners: ['third'] },
    description: 'One out, runner on third. The batter bunts and the runner breaks for home.',
    steps: [
      { type: 'ball', kind: 'ground', from: 'home', to: 'buntFirst', duration: 750,
        caption: 'Bunt toward the first base side — you charge and get to it fast…',
        fielders: [{ who: '1B', to: 'buntFirst' }, { who: '2B', to: 'first' }, { who: 'C', to: 'home' }],
        runners: [
          { id: 'r3', from: 'third', to: 'home', fromT: 0, toT: 0.45 },
          { id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.35 }
        ] },
      { type: 'question',
        prompt: 'You got to it quickly and the runner is a few steps from home. Where do you throw?',
        options: ['Home to the catcher to stop the run', 'First base for the sure out', 'Third base behind the runner'],
        answer: 0,
        hint: 'You beat him to the ball. Which throw saves a run instead of just getting an out?',
        explanation: 'Getting there fast gives you a choice, and a run is worth more than an out. Throw home — the catcher has to tag him, since with only a runner on third nobody is forced.' },
      { type: 'throw', from: 'buntFirst', to: 'home', duration: 450, ballArrivesAt: 0.6,
        caption: 'Quick throw home…',
        runners: [
          { id: 'r3', from: 'third', to: 'home', fromT: 0.45, toT: 1 },
          { id: 'batter', from: 'home', to: 'first', fromT: 0.35, toT: 1 }
        ] },
      { type: 'result', title: 'Out at the plate!', text: 'The catcher tagged him. No run scores.',
        coach: 'Charge hard and you get a choice. Get there late and first base is your only option.',
        flash: ['1B', 'C'] }
    ]
  },

  /* ---------------- runners on first and second ---------------- */

  {
    id: '1b-r1r2-bunt-take-first',
    position: '1B',
    title: 'Bunt with runners on first and second',
    situation: { outs: 0, runners: ['first', 'second'] },
    description: 'Nobody out, runners on first and second. The batter squares to bunt and you charge in.',
    steps: [
      { type: 'ball', kind: 'ground', from: 'home', to: 'buntFirst', duration: 800,
        caption: 'Bunt pushed toward you — you charge and field it…',
        fielders: [{ who: '1B', to: 'buntFirst' }, { who: '2B', to: 'first' }, { who: 'SS', to: 'third' }],
        runners: [
          { id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.5 },
          { id: 'r1', from: 'first', to: 'second', fromT: 0, toT: 0.6 },
          { id: 'r2', from: 'second', to: 'third', fromT: 0, toT: 0.65 }
        ] },
      { type: 'question',
        prompt: 'The shortstop is covering third for the front runner. Can you make that throw?',
        options: ['No — take the sure out at first, third is too far across your body', 'Yes, throw to third for the front runner', 'Throw to second base'],
        answer: 0,
        hint: 'You are charging toward home on the first base side. How far away is third, and which way is your body going?',
        explanation: 'From the first base side you are running away from third, so that throw is long and across your body — the kind that ends up in left field. The pitcher or catcher can make it, but you should not. Take the out at first.' },
      { type: 'throw', from: 'buntFirst', to: 'first', duration: 500, ballArrivesAt: 0.7,
        caption: 'Short throw to the second baseman on the bag…',
        runners: [
          { id: 'batter', from: 'home', to: 'first', fromT: 0.5, toT: 1 },
          { id: 'r1', from: 'first', to: 'second', fromT: 0.6, toT: 1 },
          { id: 'r2', from: 'second', to: 'third', fromT: 0.65, toT: 1 }
        ] },
      { type: 'result', title: 'Out at first', text: 'One out. The runners moved up, but you made the throw you could actually make.',
        coach: 'Know which throws are yours. From the first base side, the front runner belongs to somebody else.',
        flash: ['1B', '2B'] }
    ]
  },

  /* ---------------- runners on first and third ---------------- */

  {
    id: '1b-r1r3-two-outs',
    position: '1B',
    title: 'Ground ball with two outs',
    situation: { outs: 2, runners: ['first', 'third'] },
    description: 'Two outs, runners on first and third. A ground ball comes to you and the runner from third races for home.',
    steps: [
      { type: 'ball', kind: 'ground', from: 'home', to: '1B', duration: 1000,
        caption: 'Ground ball to first — the runner on third is going…',
        runners: [
          { id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.5 },
          { id: 'r1', from: 'first', to: 'second', fromT: 0, toT: 0.5 },
          { id: 'r3', from: 'third', to: 'home', fromT: 0, toT: 0.5 }
        ] },
      { type: 'pause', ms: 200 },
      { type: 'question',
        prompt: 'Two outs already. What is the fastest way to end this inning?',
        options: ['Step on first base yourself', 'Throw home to cut off the run', 'Throw to second base'],
        answer: 0,
        hint: 'You need one out. Which one needs no throw at all?',
        explanation: 'The bag is right beside you and the batter is forced, so touching it is the fastest out on the field. Do it before the runner reaches home and the run does not count.' },
      { type: 'move', duration: 400, caption: 'You step on the bag…',
        fielders: [{ who: '1B', to: 'first' }],
        runners: [
          { id: 'batter', from: 'home', to: 'first', fromT: 0.5, toT: 1 },
          { id: 'r1', from: 'first', to: 'second', fromT: 0.5, toT: 1 },
          { id: 'r3', from: 'third', to: 'home', fromT: 0.5, toT: 1 }
        ] },
      { type: 'result', title: 'Inning over!', text: 'You beat the runner home by touching the bag, so no run counts.',
        coach: 'Two outs and the ball is in your glove near the bag — just step on it. No throw can be faster than that.',
        flash: ['1B'] }
    ]
  },

  /* ---------------- bases loaded ---------------- */

  {
    id: '1b-loaded-throw-home',
    position: '1B',
    title: 'Ground ball with the bases loaded',
    situation: { outs: 0, runners: ['first', 'second', 'third'] },
    description: 'Nobody out, bases loaded. A ground ball comes to you and the runner on third breaks for home.',
    steps: [
      { type: 'ball', kind: 'ground', from: 'home', to: '1B', duration: 1000,
        caption: 'Ground ball to first with the bases full…',
        fielders: [{ who: 'C', to: 'home' }],
        runners: [
          { id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.4 },
          { id: 'r1', from: 'first', to: 'second', fromT: 0, toT: 0.4 },
          { id: 'r2', from: 'second', to: 'third', fromT: 0, toT: 0.4 },
          { id: 'r3', from: 'third', to: 'home', fromT: 0, toT: 0.45 }
        ] },
      { type: 'pause', ms: 200 },
      { type: 'question',
        prompt: 'Nobody is out and the bases are loaded. Where does the ball go?',
        options: ['Home to the catcher — with the bases loaded that is a force', 'Step on first base', 'Throw to second base'],
        answer: 0,
        hint: 'Every runner has to run. So what kind of play is home plate right now?',
        explanation: 'Because every base is full, the runner on third is forced — the catcher only has to touch the plate, no tag needed. Stepping on first gets an out but lets the run score. With nobody out, stopping the run is worth more.' },
      { type: 'throw', from: '1B', to: 'home', duration: 500, ballArrivesAt: 0.6,
        caption: 'Throw home to the catcher on the plate…',
        runners: [
          { id: 'r3', from: 'third', to: 'home', fromT: 0.45, toT: 1 },
          { id: 'r2', from: 'second', to: 'third', fromT: 0.4, toT: 1 },
          { id: 'r1', from: 'first', to: 'second', fromT: 0.4, toT: 1 },
          { id: 'batter', from: 'home', to: 'first', fromT: 0.4, toT: 1 }
        ] },
      { type: 'result', title: 'Force out at home!', text: 'No run scores, and the bases are still loaded with one out.',
        coach: 'Bases loaded makes home just another force base. Throw home and stop the run.',
        flash: ['1B', 'C'] }
    ]
  }

);
