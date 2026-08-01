/* ============================================================
   Baseball IQ — scenarios-3b.js
   Third base scenarios, grouped by base situation.

   Facing home, the third baseman's RIGHT is toward the foul line and
   his LEFT is toward the shortstop hole.

   His two defining jobs:
     - Charge bunts and slow rollers. He is closer to the plate than
       anyone except the pitcher and catcher.
     - Take the cut on every throw home from LEFT field. (Centre and
       right belong to the first baseman.)
   ============================================================ */

SCENARIOS.push(

  /* ---------------- bases empty ---------------- */

  {
    id: '3b-empty-routine-grounder',
    position: '3B',
    title: 'Ground ball right at you',
    situation: { outs: 1, runners: [] },
    description: 'One out, nobody on. A ground ball is hit hard right at you.',
    steps: [
      { type: 'ball', kind: 'ground', from: 'home', to: '3B', duration: 950,
        caption: 'Hard ground ball right at the third baseman…',
        runners: [{ id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.5 }] },
      { type: 'pause', ms: 250 },
      { type: 'question',
        prompt: 'You knock it down and pick it up. Where does the throw go?',
        options: ['Throw to first base', 'Throw to second base', 'Run it over to third'],
        answer: 0,
        hint: 'Only one runner is going anywhere.',
        explanation: 'Nobody is on base, so the batter is the only runner and first is the only play. It is a long throw from third, so get your feet set and throw it hard and on a line.' },
      { type: 'throw', from: '3B', to: 'first', duration: 800, ballArrivesAt: 0.7,
        caption: 'Long throw across the diamond…',
        fielders: [{ who: '1B', to: 'first' }],
        runners: [{ id: 'batter', from: 'home', to: 'first', fromT: 0.5, toT: 1 }] },
      { type: 'result', title: 'Out at first', text: 'Strong throw all the way across.',
        coach: 'Balls come at you fast at third base. Knock it down first, then worry about picking it up — a ball in front of you is still an out.',
        flash: ['3B', '1B'] }
    ]
  },

  {
    id: '3b-empty-down-the-line',
    position: '3B',
    title: 'Ground ball to your right',
    situation: { outs: 1, runners: [] },
    description: 'One out, nobody on. A ground ball is hit to your right, down toward the third base line.',
    steps: [
      { type: 'ball', kind: 'ground', from: 'home', to: 'downTheLine3B', duration: 1000,
        caption: 'Hit to your right, down the line — you have to dive over…',
        fielders: [{ who: '3B', to: 'downTheLine3B' }],
        runners: [{ id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.55 }] },
      { type: 'question',
        prompt: 'You knock it down near the line. What matters most now?',
        options: ['Keep it in front of you, then throw — a ball down the line becomes a double', 'Dive past it trying to catch it cleanly', 'Let it go, the shortstop will get it'],
        answer: 0,
        hint: 'What happens if a ball gets past you down the line?',
        explanation: 'Anything that gets past you down the line rolls into the corner, and the batter is standing on second before it is thrown back in. Knocking it down and throwing late is far better than diving past it and letting it go.' },
      { type: 'throw', from: 'downTheLine3B', to: 'first', duration: 850, ballArrivesAt: 0.7,
        caption: 'You pick it up and fire across…',
        fielders: [{ who: '1B', to: 'first' }],
        runners: [{ id: 'batter', from: 'home', to: 'first', fromT: 0.55, toT: 1 }] },
      { type: 'result', title: 'Out at first', text: 'Knocking it down kept it in the infield and still got the out.',
        coach: 'Guard the line. A ball through you at third is worth two bases; a ball you knock down is worth none.',
        flash: ['3B', '1B'] }
    ]
  },

  {
    id: '3b-empty-slow-roller',
    position: '3B',
    title: 'Slow roller down the line',
    situation: { outs: 0, runners: [] },
    description: 'Nobody out, nobody on. The batter chops one that trickles slowly down the third base line, and it is still in fair territory.',
    steps: [
      { type: 'ball', kind: 'ground', from: 'home', to: 'buntThird', duration: 1500,
        caption: 'Slow roller dying down the line…',
        runners: [{ id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.7 }] },
      { type: 'question',
        prompt: 'The ball is barely moving and the batter is running. What do you do?',
        options: ['Charge it hard — nobody else can get there in time', 'Wait for it to come to you', 'Hope it rolls foul'],
        answer: 0,
        hint: 'Who else on the field is close enough to field this?',
        explanation: 'Nobody is coming to help. The shortstop is too far away and the pitcher is behind it, so this ball is yours alone. Charge it the moment you see it is slow — waiting turns an out into an infield hit.' },
      { type: 'move', duration: 700, caption: 'You charge in and scoop it…',
        fielders: [{ who: '3B', to: 'buntThird' }],
        runners: [{ id: 'batter', from: 'home', to: 'first', fromT: 0.7, toT: 0.85 }] },
      { type: 'throw', from: 'buntThird', to: 'first', duration: 600, ballArrivesAt: 0.7,
        caption: 'Throw on the run to first…',
        fielders: [{ who: '1B', to: 'first' }],
        runners: [{ id: 'batter', from: 'home', to: 'first', fromT: 0.85, toT: 1 }] },
      { type: 'result', title: 'Out at first — barely', text: 'Charging was the only way to have a play at all.',
        coach: 'Slow rollers at third are yours, every time. The moment you see it is slow, go get it.',
        flash: ['3B', '1B'] }
    ]
  },

  /* ---------------- runner on first ---------------- */

  {
    id: '3b-r1-throw-to-second',
    position: '3B',
    title: 'Ground ball with a runner on first',
    situation: { outs: 0, runners: ['first'] },
    description: 'Nobody out, runner on first. A ground ball is hit to you.',
    steps: [
      { type: 'ball', kind: 'ground', from: 'home', to: '3B', duration: 1000,
        caption: 'Ground ball to third…',
        fielders: [{ who: '2B', to: 'second' }],
        runners: [
          { id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.35 },
          { id: 'r1', from: 'first', to: 'second', fromT: 0, toT: 0.4 }
        ] },
      { type: 'pause', ms: 200 },
      { type: 'question',
        prompt: 'The second baseman is covering second. Where does the ball go first?',
        options: ['Throw to second base to start the double play', 'Throw straight to first', 'Step on third base'],
        answer: 0,
        hint: 'Nobody is running to third. Which base actually has a force?',
        explanation: 'Third base does nothing here — no runner is heading there, so stepping on it is not an out. The runner from first is forced at second, so go there first and let them relay across for two.' },
      { type: 'throw', from: '3B', to: 'second', duration: 550, ballArrivesAt: 0.7,
        caption: 'Throw to second…',
        runners: [
          { id: 'r1', from: 'first', to: 'second', fromT: 0.4, toT: 1 },
          { id: 'batter', from: 'home', to: 'first', fromT: 0.35, toT: 0.7 }
        ] },
      { type: 'pause', ms: 180 },
      { type: 'throw', from: 'second', to: 'first', duration: 600, ballArrivesAt: 0.7,
        caption: '…and on to first to finish it.',
        fielders: [{ who: '1B', to: 'first' }],
        runners: [{ id: 'batter', from: 'home', to: 'first', fromT: 0.7, toT: 1 }] },
      { type: 'result', title: 'Double play!', text: 'Around the horn for two outs.',
        coach: 'A base only helps you if somebody is running to it. With just a runner on first, second base is where the force is.',
        flash: ['3B', '2B', '1B'] }
    ]
  },

  {
    id: '3b-r1-charge-the-bunt',
    position: '3B',
    title: 'Bunt with a runner on first',
    situation: { outs: 0, runners: ['first'] },
    description: 'Nobody out, runner on first. The batter squares around to bunt.',
    steps: [
      { type: 'question',
        prompt: 'You see the batter square to bunt before the pitch even arrives. What do you do?',
        options: ['Charge in toward the plate as the pitch is thrown', 'Stay back at third base', 'Move over toward shortstop'],
        answer: 0,
        hint: 'A bunt is going to stop quickly. Where does it need you to be?',
        explanation: 'The moment you see him square, charge. Bunts die fast and the only way to get an out is to already be moving. The shortstop knows to slide over and cover third behind you.' },
      { type: 'move', duration: 650, caption: 'You charge as the pitch goes…',
        fielders: [{ who: '3B', to: 'buntThird' }, { who: 'SS', to: 'third' }, { who: '2B', to: 'first' }] },
      { type: 'ball', kind: 'ground', from: 'home', to: 'buntThird', duration: 800,
        caption: 'Bunt rolls right to you…',
        runners: [
          { id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.55 },
          { id: 'r1', from: 'first', to: 'second', fromT: 0, toT: 0.7 }
        ] },
      { type: 'throw', from: 'buntThird', to: 'first', duration: 700, ballArrivesAt: 0.7,
        caption: 'Throw across to first…',
        runners: [
          { id: 'batter', from: 'home', to: 'first', fromT: 0.55, toT: 1 },
          { id: 'r1', from: 'first', to: 'second', fromT: 0.7, toT: 1 }
        ] },
      { type: 'result', title: 'Out at first', text: 'You charged, fielded it clean, and got the batter.',
        coach: 'Batter squares, you charge. Third base is the shortstop’s problem once you commit.',
        flash: ['3B', '2B'] }
    ]
  },

  /* ---------------- runner on second ---------------- */

  {
    id: '3b-r2-take-the-cut',
    position: '3B',
    title: 'Base hit to left, runner on second',
    situation: { outs: 1, runners: ['second'] },
    description: 'One out, runner on second. A base hit drops into left field and that runner takes off for home.',
    steps: [
      { type: 'ball', kind: 'ground', from: 'home', to: 'shallowLeftField', duration: 1400,
        caption: 'Base hit into left field — the runner is going for home…',
        runners: [
          { id: 'r2', from: 'second', to: 'home', fromT: 0, toT: 0.5 },
          { id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.55 }
        ] },
      { type: 'question',
        prompt: 'The throw is coming home from left field. What is your job?',
        options: ['Run out and line up between the left fielder and home plate', 'Stay on third base', 'Run toward the ball in left field'],
        answer: 0,
        hint: 'Somebody has to stand in the middle of that long throw. On a ball to left, who?',
        explanation: 'On any ball to LEFT field with a play at the plate, you are the cut man. Get out in a straight line between the left fielder and home. The shortstop slides over to cover third behind you.' },
      { type: 'move', duration: 650, caption: 'You run out and line up with the throw…',
        fielders: [{ who: '3B', to: 'cutoff3B' }, { who: 'SS', to: 'third' }],
        runners: [
          { id: 'r2', from: 'second', to: 'home', fromT: 0.5, toT: 0.8 },
          { id: 'batter', from: 'home', to: 'first', fromT: 0.55, toT: 1 }
        ] },
      { type: 'throw', from: 'shallowLeftField', to: 'cutoff3B', duration: 600,
        caption: 'The left fielder throws right at you…',
        runners: [{ id: 'r2', from: 'second', to: 'home', fromT: 0.8, toT: 0.92 }] },
      { type: 'throw', from: 'cutoff3B', to: 'home', duration: 450, ballArrivesAt: 0.65,
        caption: 'You turn and fire home…',
        fielders: [{ who: 'C', to: 'home' }],
        runners: [{ id: 'r2', from: 'second', to: 'home', fromT: 0.92, toT: 1 }] },
      { type: 'result', title: 'Out at the plate!', text: 'The relay got it home far faster than one long throw.',
        coach: 'Ball to left with a runner scoring: the cut is yours. Centre and right belong to the first baseman.',
        flash: ['3B', 'C'] }
    ]
  },

  {
    id: '3b-r2-runner-coming-to-you',
    position: '3B',
    title: 'Ground ball with a runner on second',
    situation: { outs: 1, runners: ['second'] },
    description: 'One out, runner on second. A ground ball comes to you, and the runner is already running at you toward third.',
    steps: [
      { type: 'ball', kind: 'ground', from: 'home', to: '3B', duration: 1000,
        caption: 'Ground ball to third — and the runner is coming right at you…',
        runners: [
          { id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.45 },
          { id: 'r2', from: 'second', to: 'third', fromT: 0, toT: 0.5 }
        ] },
      { type: 'pause', ms: 200 },
      { type: 'question',
        prompt: 'The runner is nearly to third and you are standing right by the bag. What do you do?',
        options: ['Tag him as he goes by, then throw to first', 'Step on third base for the force', 'Throw to first and forget about him'],
        answer: 0,
        hint: 'Is he forced to run? And how close is he to you right now?',
        explanation: 'He is not forced, so stepping on the bag does nothing — you have to tag him. And he is running straight at you, which makes it the easiest tag you will ever get. Tag first, then throw to first.' },
      { type: 'move', duration: 400, caption: 'You slap the tag on him as he arrives…',
        runners: [{ id: 'r2', from: 'second', to: 'third', fromT: 0.5, toT: 0.9 }] },
      { type: 'throw', from: '3B', to: 'first', duration: 800, ballArrivesAt: 0.7,
        caption: 'Then the throw across to first…',
        fielders: [{ who: '1B', to: 'first' }],
        runners: [
          { id: 'r2', from: 'second', to: 'third', fromT: 0.9, toT: 1 },
          { id: 'batter', from: 'home', to: 'first', fromT: 0.45, toT: 1 }
        ] },
      { type: 'result', title: 'Two outs!', text: 'Tag on the runner, then the throw across for the second out.',
        coach: 'A runner running straight at you with the ball in your glove is a free out — but only if you remember he needs a tag, not the base.',
        flash: ['3B', '1B'] }
    ]
  },

  /* ---------------- runner on third ---------------- */

  {
    id: '3b-r3-squeeze-throw-home',
    position: '3B',
    title: 'Bunt with a runner on third',
    situation: { outs: 1, runners: ['third'] },
    description: 'One out, runner on third. The batter drops a bunt down and the runner breaks for home behind you.',
    steps: [
      { type: 'ball', kind: 'ground', from: 'home', to: 'buntThird', duration: 750,
        caption: 'Bunt down the third base line — you charge and get it fast…',
        fielders: [{ who: '3B', to: 'buntThird' }, { who: 'C', to: 'home' }],
        runners: [
          { id: 'r3', from: 'third', to: 'home', fromT: 0, toT: 0.45 },
          { id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.35 }
        ] },
      { type: 'question',
        prompt: 'You have the ball and the runner is most of the way home. Where do you throw?',
        options: ['Home to the catcher — you are close and the run matters more', 'First base for the sure out', 'Third base, since he left it'],
        answer: 0,
        hint: 'You are only a few steps from home plate. What is the throw worth there?',
        explanation: 'You charged, so you are close to the plate and the throw is short. Stopping a run is worth more than getting the batter. The catcher has to tag him — nobody is forced with just a runner on third.' },
      { type: 'throw', from: 'buntThird', to: 'home', duration: 400, ballArrivesAt: 0.6,
        caption: 'Short quick throw home…',
        runners: [
          { id: 'r3', from: 'third', to: 'home', fromT: 0.45, toT: 1 },
          { id: 'batter', from: 'home', to: 'first', fromT: 0.35, toT: 1 }
        ] },
      { type: 'result', title: 'Out at the plate!', text: 'The catcher tagged him. No run scores.',
        coach: 'Charging a bunt puts you close to home. When the run is coming, look there first.',
        flash: ['3B', 'C'] }
    ]
  },

  /* ---------------- runners on first and second ---------------- */

  {
    id: '3b-r1r2-step-on-third',
    position: '3B',
    title: 'Ground ball with runners on first and second',
    situation: { outs: 0, runners: ['first', 'second'] },
    description: 'Nobody out, runners on first and second. A ground ball is hit right to you.',
    steps: [
      { type: 'ball', kind: 'ground', from: 'home', to: '3B', duration: 1000,
        caption: 'Ground ball to third with runners going…',
        runners: [
          { id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.4 },
          { id: 'r1', from: 'first', to: 'second', fromT: 0, toT: 0.45 },
          { id: 'r2', from: 'second', to: 'third', fromT: 0, toT: 0.45 }
        ] },
      { type: 'pause', ms: 200 },
      { type: 'question',
        prompt: 'This time there IS a runner coming to third. What is the fastest out?',
        options: ['Step on third base yourself', 'Throw all the way to first', 'Throw to second base'],
        answer: 0,
        hint: 'With runners on first and second, everybody has to run. Look at where your feet already are.',
        explanation: 'Now that a runner is forced to third, the bag beside you is a force out — and no throw is faster than your own foot. Step on it, then you still have time to throw to first for two.' },
      { type: 'move', duration: 400, caption: 'You step on the bag yourself…',
        fielders: [{ who: '3B', to: 'third' }],
        runners: [
          { id: 'r2', from: 'second', to: 'third', fromT: 0.45, toT: 1 },
          { id: 'r1', from: 'first', to: 'second', fromT: 0.45, toT: 0.8 },
          { id: 'batter', from: 'home', to: 'first', fromT: 0.4, toT: 0.6 }
        ] },
      { type: 'throw', from: 'third', to: 'first', duration: 750, ballArrivesAt: 0.7,
        caption: 'Then the long throw to first…',
        fielders: [{ who: '1B', to: 'first' }],
        runners: [
          { id: 'batter', from: 'home', to: 'first', fromT: 0.6, toT: 1 },
          { id: 'r1', from: 'first', to: 'second', fromT: 0.8, toT: 1 }
        ] },
      { type: 'result', title: 'Double play!', text: 'Force at third with your own foot, then across to first.',
        coach: 'Same ground ball, different answer — because this time somebody was running to third. Always check who is forced before you decide.',
        flash: ['3B', '1B'] }
    ]
  },

  {
    id: '3b-r1r2-bunt-take-first',
    position: '3B',
    title: 'Bunt with runners on first and second',
    situation: { outs: 0, runners: ['first', 'second'] },
    description: 'Nobody out, runners on first and second. The batter squares to bunt and you charge hard toward the plate.',
    steps: [
      { type: 'ball', kind: 'ground', from: 'home', to: 'buntThird', duration: 800,
        caption: 'You charge and field the bunt near the line…',
        fielders: [{ who: '3B', to: 'buntThird' }, { who: 'SS', to: 'third' }, { who: '2B', to: 'first' }],
        runners: [
          { id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.5 },
          { id: 'r1', from: 'first', to: 'second', fromT: 0, toT: 0.6 },
          { id: 'r2', from: 'second', to: 'third', fromT: 0, toT: 0.75 }
        ] },
      { type: 'question',
        prompt: 'You charged past third and the shortstop is covering it behind you. Where do you throw?',
        options: ['First base — you are running the wrong way to throw behind you', 'Third base for the front runner', 'Hold the ball'],
        answer: 0,
        hint: 'Your momentum is carrying you toward home. How hard is it to stop and throw backwards to third?',
        explanation: 'You are charging toward home, so third is behind you — stopping, turning and throwing back there is slow and wild. Once you commit to charging, take the out in front of you at first.' },
      { type: 'throw', from: 'buntThird', to: 'first', duration: 700, ballArrivesAt: 0.7,
        caption: 'Throw across to first…',
        runners: [
          { id: 'batter', from: 'home', to: 'first', fromT: 0.5, toT: 1 },
          { id: 'r1', from: 'first', to: 'second', fromT: 0.6, toT: 1 },
          { id: 'r2', from: 'second', to: 'third', fromT: 0.75, toT: 1 }
        ] },
      { type: 'result', title: 'Out at first', text: 'One out. The runners moved up, but you made the throw you could actually make.',
        coach: 'If you charged, throw forwards. The front runner belongs to whoever is still behind the ball.',
        flash: ['3B', '2B'] }
    ]
  },

  /* ---------------- runners on first and third ---------------- */

  {
    id: '3b-r1r3-two-outs',
    position: '3B',
    title: 'Ground ball with two outs',
    situation: { outs: 2, runners: ['first', 'third'] },
    description: 'Two outs, runners on first and third. A ground ball comes to you and the runner from third breaks for home.',
    steps: [
      { type: 'ball', kind: 'ground', from: 'home', to: '3B', duration: 1000,
        caption: 'Ground ball to third — the runner on third takes off…',
        runners: [
          { id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.45 },
          { id: 'r1', from: 'first', to: 'second', fromT: 0, toT: 0.45 },
          { id: 'r3', from: 'third', to: 'home', fromT: 0, toT: 0.5 }
        ] },
      { type: 'pause', ms: 200 },
      { type: 'question',
        prompt: 'Two outs. Careful — is third base a force here?',
        options: ['No. Throw to first, that is the only force', 'Yes, step on third base', 'Throw home to stop the run'],
        answer: 0,
        hint: 'The runner started on third. Is anybody forcing him off it?',
        explanation: 'The runner on third is not forced — first and second are not both occupied behind him, so he can stay if he wants. Stepping on the bag gets you nothing. The batter IS forced, so first base is your out, and it ends the inning before the run counts.' },
      { type: 'throw', from: '3B', to: 'first', duration: 800, ballArrivesAt: 0.7,
        caption: 'Long throw across to first…',
        fielders: [{ who: '1B', to: 'first' }],
        runners: [
          { id: 'batter', from: 'home', to: 'first', fromT: 0.45, toT: 1 },
          { id: 'r1', from: 'first', to: 'second', fromT: 0.45, toT: 1 },
          { id: 'r3', from: 'third', to: 'home', fromT: 0.5, toT: 1 }
        ] },
      { type: 'result', title: 'Inning over!', text: 'The out at first beat the runner home, so the run does not count.',
        coach: 'Standing on a base only helps when the runner is forced to come to it. Check that before you trust your feet.',
        flash: ['3B', '1B'] }
    ]
  },

  /* ---------------- bases loaded ---------------- */

  {
    id: '3b-loaded-step-on-third',
    position: '3B',
    title: 'Ground ball with the bases loaded',
    situation: { outs: 1, runners: ['first', 'second', 'third'] },
    description: 'One out, bases loaded. A ground ball is hit right to you.',
    steps: [
      { type: 'ball', kind: 'ground', from: 'home', to: '3B', duration: 1000,
        caption: 'Ground ball to third with the bases full…',
        runners: [
          { id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.4 },
          { id: 'r1', from: 'first', to: 'second', fromT: 0, toT: 0.4 },
          { id: 'r2', from: 'second', to: 'third', fromT: 0, toT: 0.45 },
          { id: 'r3', from: 'third', to: 'home', fromT: 0, toT: 0.45 }
        ] },
      { type: 'pause', ms: 200 },
      { type: 'question',
        prompt: 'Everybody is forced and the bag is right beside you. What is quickest?',
        options: ['Step on third base, then throw to first', 'Throw home first', 'Throw to first and stop there'],
        answer: 0,
        hint: 'One of these outs needs no throw at all.',
        explanation: 'With the bases loaded every runner is forced, so the bag beside you is a force out — and your own foot is faster than any throw. Take that one, then throw across for the second out.' },
      { type: 'move', duration: 400, caption: 'You step on the bag…',
        fielders: [{ who: '3B', to: 'third' }],
        runners: [
          { id: 'r2', from: 'second', to: 'third', fromT: 0.45, toT: 1 },
          { id: 'r3', from: 'third', to: 'home', fromT: 0.45, toT: 1 },
          { id: 'r1', from: 'first', to: 'second', fromT: 0.4, toT: 0.75 },
          { id: 'batter', from: 'home', to: 'first', fromT: 0.4, toT: 0.6 }
        ] },
      { type: 'throw', from: 'third', to: 'first', duration: 750, ballArrivesAt: 0.7,
        caption: 'Then the throw across to first…',
        fielders: [{ who: '1B', to: 'first' }],
        runners: [
          { id: 'batter', from: 'home', to: 'first', fromT: 0.6, toT: 1 },
          { id: 'r1', from: 'first', to: 'second', fromT: 0.75, toT: 1 }
        ] },
      { type: 'result', title: 'Double play — inning over!', text: 'Force at third with your foot, then across to first for the third out.',
        coach: 'Bases loaded means every base is a force. Use the one you are already standing next to.',
        flash: ['3B', '1B'] }
    ]
  }

);
