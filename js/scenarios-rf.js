/* ============================================================
   Baseball IQ — scenarios-rf.js
   Right field scenarios, grouped by base situation.

   Right field is where the longest throw on the field lives — right
   field to third base — and where the most overlooked backup job
   lives: getting behind every throw to first.

   Priority, same as the other outfield files: he beats any infielder
   on a ball they can both reach, and he gets out of the way for the
   centre fielder.

   On a throw home, the RIGHT fielder's cut man is the FIRST BASEMAN.
   ============================================================ */

SCENARIOS.push(

  /* ---------------- bases empty ---------------- */

  {
    id: 'rf-empty-call-off-the-infielder',
    position: 'RF',
    title: 'Shallow fly with the second baseman drifting back',
    situation: { outs: 0, runners: [] },
    description: 'Nobody out, nobody on. A soft fly drops into shallow right, and the second baseman is backpedalling out after it.',
    steps: [
      { type: 'ball', kind: 'fly', from: 'home', to: 'shallowRightField', duration: 1500,
        caption: 'Soft fly into shallow right — the second baseman drifts back…',
        fielders: [{ who: '2B', to: [510, 275] }, { who: 'RF', to: [585, 220] }] },
      { type: 'question',
        prompt: 'You are charging in and he is backing up. Who takes it?',
        options: ['You — call for it loudly and he clears out', 'The second baseman, he is already under it', 'Let it drop between you to be safe'],
        answer: 0,
        hint: 'Which of you can see the ball the whole way down?',
        explanation: 'You are running forward with the ball in front of you the whole time. He is backpedalling with his head turned, which is the hardest catch there is. Any ball you can reach is yours — but call it early and loudly so he can get out of the way.' },
      { type: 'move', duration: 500, caption: 'You call him off and he peels away…',
        fielders: [{ who: 'RF', to: 'shallowRightField' }, { who: '2B', to: [460, 320] }] },
      { type: 'result', title: 'Caught!', text: 'Easy catch coming in, and nobody ran into anybody.',
        coach: 'Coming forward beats backing up. Take it off the infielder — just call it early.',
        flash: ['RF'] }
    ]
  },

  {
    id: 'rf-empty-defer-to-cf',
    position: 'RF',
    title: 'Fly ball into the right-center gap',
    situation: { outs: 1, runners: [] },
    description: 'One out, nobody on. A fly ball carries into the gap between you and the center fielder, and you are both going hard.',
    steps: [
      { type: 'ball', kind: 'fly', from: 'home', to: 'rightCenterGap', duration: 1800,
        caption: 'Fly ball into the right-center gap — both of you are going…',
        fielders: [{ who: 'RF', to: [590, 175] }, { who: 'CF', to: [500, 165] }] },
      { type: 'question',
        prompt: 'You can both get there and the center fielder calls for it. What do you do?',
        options: ['Peel off and get behind him to back him up', 'Keep going, you have a better angle', 'Both go for it'],
        answer: 0,
        hint: 'One outfielder has priority over the other two.',
        explanation: 'The centre fielder outranks both corner outfielders. When he calls it, you give way immediately — then get behind him, because if it pops out of his glove you are the one who keeps it from rolling to the wall.' },
      { type: 'move', duration: 500, caption: 'You peel off and slide in behind him…',
        fielders: [{ who: 'CF', to: 'rightCenterGap' }, { who: 'RF', to: [615, 200] }] },
      { type: 'result', title: 'Center fielder makes the catch', text: 'You gave way and backed him up.',
        coach: 'Centre fielder calls it, you give way. Then back him up — giving way is not the same as stopping.',
        flash: ['CF'] }
    ]
  },

  {
    id: 'rf-empty-back-up-first',
    position: 'RF',
    title: 'Ground ball to the infield',
    situation: { outs: 1, runners: [] },
    description: 'One out, nobody on. A ground ball goes to the shortstop and the long throw to first is on its way.',
    steps: [
      { type: 'ball', kind: 'ground', from: 'home', to: 'SS', duration: 1100,
        caption: 'Routine ground ball to short…',
        runners: [{ id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.5 }] },
      { type: 'question',
        prompt: 'The ball is nowhere near you and the throw is going across to first. What do you do?',
        options: ['Sprint in behind first base to back up the throw', 'Stay where you are, it is an infield play', 'Move toward center field'],
        answer: 0,
        hint: 'If that long throw gets past the first baseman, which direction does it roll?',
        explanation: 'A throw that gets past first base rolls straight into right field — your territory. If you are still standing in your spot, the batter jogs to second while you run it down. Break in on every infield ground ball. This is the most overlooked job in right field.' },
      { type: 'move', duration: 800, caption: 'You sprint in behind first base…',
        fielders: [{ who: 'RF', to: 'backupFirst' }],
        runners: [{ id: 'batter', from: 'home', to: 'first', fromT: 0.5, toT: 0.8 }] },
      { type: 'throw', from: 'SS', to: 'first', duration: 700, ballArrivesAt: 0.7,
        caption: 'The throw comes across to first…',
        fielders: [{ who: '1B', to: 'first' }],
        runners: [{ id: 'batter', from: 'home', to: 'first', fromT: 0.8, toT: 1 }] },
      { type: 'result', title: 'Out at first', text: 'The throw was good — but you were behind it if it had not been.',
        coach: 'Every ground ball to the infield, you run in behind first. You are the only one back there.',
        flash: ['RF', '1B'] }
    ]
  },

  /* ---------------- runner on first ---------------- */

  {
    id: 'rf-r1-throw-to-third',
    position: 'RF',
    title: 'Base hit with a runner on first',
    situation: { outs: 1, runners: ['first'] },
    description: 'One out, runner on first. A base hit comes to you in right, and that runner is trying to go all the way to third.',
    steps: [
      { type: 'ball', kind: 'ground', from: 'home', to: 'shallowRightField', duration: 1300,
        caption: 'Base hit to right — the runner rounds second heading for third…',
        fielders: [{ who: 'RF', to: 'shallowRightField' }, { who: '3B', to: 'third' }],
        runners: [
          { id: 'r1', from: 'first', to: 'third', fromT: 0, toT: 0.5 },
          { id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.7 }
        ] },
      { type: 'question',
        prompt: 'This is the longest throw on the whole field. How do you make it?',
        options: ['Get behind the ball, then throw low on one bounce to third', 'Throw it as high and far as you can', 'Give up on him and throw to second'],
        answer: 0,
        hint: 'A throw that bounces once still gets there. What happens to a high throw?',
        explanation: 'Right field to third is the longest throw you will ever make, so do not try to do it all in the air — a high looping throw takes longer and is impossible to catch for a tag. Line yourself up behind the ball and throw low. One bounce into the third baseman’s glove is faster and far easier to handle.' },
      { type: 'throw', from: 'shallowRightField', to: 'third', duration: 800, ballArrivesAt: 0.7,
        caption: 'Long low throw across to third…',
        runners: [
          { id: 'r1', from: 'first', to: 'third', fromT: 0.5, toT: 1 },
          { id: 'batter', from: 'home', to: 'first', fromT: 0.7, toT: 1 }
        ] },
      { type: 'result', title: 'Out at third!', text: 'The low throw got there in time for the tag.',
        coach: 'Long throws go low, not high. One bounce beats a rainbow every single time.',
        flash: ['RF', '3B'] }
    ]
  },

  /* ---------------- runner on second ---------------- */

  {
    id: 'rf-r2-hit-the-cut-man',
    position: 'RF',
    title: 'Base hit with a runner on second',
    situation: { outs: 1, runners: ['second'] },
    description: 'One out, runner on second. A base hit comes to you in right and that runner takes off for home.',
    steps: [
      { type: 'ball', kind: 'ground', from: 'home', to: 'shallowRightField', duration: 1300,
        caption: 'Base hit to right — the runner is going for home…',
        fielders: [{ who: 'RF', to: 'shallowRightField' }, { who: '1B', to: 'cutoff1B' }, { who: '2B', to: 'first' }],
        runners: [
          { id: 'r2', from: 'second', to: 'home', fromT: 0, toT: 0.55 },
          { id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.7 }
        ] },
      { type: 'question',
        prompt: 'The first baseman is out on the grass lined up between you and home. What do you do?',
        options: ['Throw hard and low straight at him', 'Throw over him all the way to the catcher', 'Hold the ball, the run is going to score anyway'],
        answer: 0,
        hint: 'He is standing in that exact spot for a reason. What can he do that a long throw cannot?',
        explanation: 'That is your cut man, and on a ball to centre or right it is always the first baseman. Throw hard and low at his chest. On line, he lets it through to the catcher; off line, he grabs it and keeps the batter at first. Throwing over his head means nobody can fix a bad throw.' },
      { type: 'throw', from: 'shallowRightField', to: 'cutoff1B', duration: 600,
        caption: 'Hard low throw at the cut man…',
        runners: [
          { id: 'r2', from: 'second', to: 'home', fromT: 0.55, toT: 0.9 },
          { id: 'batter', from: 'home', to: 'first', fromT: 0.7, toT: 1 }
        ] },
      { type: 'throw', from: 'cutoff1B', to: 'home', duration: 400, ballArrivesAt: 0.6,
        caption: 'On line — through to the catcher…',
        fielders: [{ who: 'C', to: 'home' }],
        runners: [{ id: 'r2', from: 'second', to: 'home', fromT: 0.9, toT: 1 }] },
      { type: 'result', title: 'Out at the plate!', text: 'Low and on line, straight through the cut man.',
        coach: 'Your cut man on a play at the plate is the first baseman. Hit him in the chest and let him decide.',
        flash: ['RF', '1B', 'C'] }
    ]
  },

  {
    id: 'rf-r2-ball-down-the-line',
    position: 'RF',
    title: 'Ball down the right field line',
    situation: { outs: 1, runners: ['second'] },
    description: 'One out, runner on second. The batter slices one down the right field line and it rolls into the corner.',
    steps: [
      { type: 'ball', kind: 'fly', from: 'home', to: [700, 300], duration: 1800,
        caption: 'Sliced down the line and into the corner…',
        fielders: [{ who: 'RF', to: [700, 300] }, { who: '2B', to: 'relayRight' }],
        runners: [
          { id: 'r2', from: 'second', to: 'home', fromT: 0, toT: 0.6 },
          { id: 'batter', from: 'home', to: 'second', fromT: 0, toT: 0.6 }
        ] },
      { type: 'question',
        prompt: 'You have chased it into the corner and the second baseman is out on the grass waving. What do you do?',
        options: ['Turn and throw to him — he is your relay man', 'Throw as far toward home as you can', 'Run the ball back in yourself'],
        answer: 0,
        hint: 'The corner is the furthest point on the field from home plate.',
        explanation: 'The corner is the longest throw there is, and nobody makes it accurately. The second baseman runs out to be your relay man. Hit him quickly with a short throw and let him make the next one — that is how you keep the batter from reaching third.' },
      { type: 'throw', from: [700, 300], to: 'relayRight', duration: 700,
        caption: 'Turn and hit the relay man…',
        runners: [
          { id: 'r2', from: 'second', to: 'home', fromT: 0.6, toT: 1 },
          { id: 'batter', from: 'home', to: 'second', fromT: 0.6, toT: 1 }
        ] },
      { type: 'result', title: 'Run scores, batter holds at second', text: 'The run scored, but the quick relay kept the batter off third.',
        coach: 'Out of the corner, find your relay man fast. Two short throws always beat one long one.',
        flash: ['RF', '2B'] }
    ]
  },

  /* ---------------- runner on third ---------------- */

  {
    id: 'rf-r3-tag-up-throw',
    position: 'RF',
    title: 'Fly ball with a runner on third',
    situation: { outs: 1, runners: ['third'] },
    description: 'One out, runner on third. A fly ball comes to you, deep enough for him to tag up and try to score.',
    steps: [
      { type: 'ball', kind: 'fly', from: 'home', to: 'shallowRightField', duration: 1600,
        caption: 'Fly ball to right — the runner goes back to tag…',
        fielders: [{ who: 'RF', to: 'shallowRightField' }, { who: '1B', to: 'cutoff1B' }] },
      { type: 'question',
        prompt: 'He will tag and go the moment you touch it. How do you catch it?',
        options: ['Get behind the ball and catch it stepping toward home', 'Catch it standing still, then set your feet', 'Catch it off to the side and turn'],
        answer: 0,
        hint: 'The throw has to start the instant you catch it. Where should your body already be going?',
        explanation: 'Line yourself up behind the ball so you are already stepping toward home as you catch it. The catch and the throw become one motion. Catching flat-footed means resetting your feet first — and that pause is exactly how long he needs to score.' },
      { type: 'throw', from: 'shallowRightField', to: 'cutoff1B', duration: 550,
        caption: 'Caught coming forward, straight into the throw…',
        runners: [{ id: 'r3', from: 'third', to: 'home', fromT: 0, toT: 0.75 }] },
      { type: 'throw', from: 'cutoff1B', to: 'home', duration: 400, ballArrivesAt: 0.6,
        caption: 'Through the cut man to the plate…',
        fielders: [{ who: 'C', to: 'home' }],
        runners: [{ id: 'r3', from: 'third', to: 'home', fromT: 0.75, toT: 1 }] },
      { type: 'result', title: 'Out at the plate — double play!', text: 'The catch was one out and the tag at home was the second.',
        coach: 'On a tag-up, catch it moving forward. Your throw starts before the catch is finished.',
        flash: ['RF', 'C'] }
    ]
  },

  /* ---------------- runners on first and second ---------------- */

  {
    id: 'rf-r1r2-throw-ahead',
    position: 'RF',
    title: 'Base hit with runners on first and second',
    situation: { outs: 1, runners: ['first', 'second'] },
    description: 'One out, runners on first and second. A base hit comes to you. The runner from second is heading home and the runner from first is going to third.',
    steps: [
      { type: 'ball', kind: 'ground', from: 'home', to: 'shallowRightField', duration: 1300,
        caption: 'Base hit to right — two runners on the move…',
        fielders: [{ who: 'RF', to: 'shallowRightField' }, { who: '1B', to: 'cutoff1B' }, { who: '2B', to: 'first' }],
        runners: [
          { id: 'r2', from: 'second', to: 'home', fromT: 0, toT: 0.55 },
          { id: 'r1', from: 'first', to: 'third', fromT: 0, toT: 0.55 },
          { id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.7 }
        ] },
      { type: 'question',
        prompt: 'Two runners are moving. Which do you throw at?',
        options: ['Home through the cut man — the run matters most', 'Third, to get the runner from first', 'First, to hold the batter'],
        answer: 0,
        hint: 'One of them is about to put a run on the board.',
        explanation: 'A run counts forever, and a runner standing on third does not. Throw home through your cut man. Going through him is what lets the defence still stop the other runners if your throw is off line.' },
      { type: 'throw', from: 'shallowRightField', to: 'cutoff1B', duration: 600,
        caption: 'Hard low throw at the cut man…',
        runners: [
          { id: 'r2', from: 'second', to: 'home', fromT: 0.55, toT: 0.9 },
          { id: 'r1', from: 'first', to: 'third', fromT: 0.55, toT: 1 },
          { id: 'batter', from: 'home', to: 'first', fromT: 0.7, toT: 1 }
        ] },
      { type: 'throw', from: 'cutoff1B', to: 'home', duration: 400, ballArrivesAt: 0.6,
        caption: 'Through to the catcher…',
        fielders: [{ who: 'C', to: 'home' }],
        runners: [{ id: 'r2', from: 'second', to: 'home', fromT: 0.9, toT: 1 }] },
      { type: 'result', title: 'Out at the plate!', text: 'You stopped the run. The other runner made third, which costs nothing.',
        coach: 'Two runners going means throw at the one about to score. Bases are cheap; runs are not.',
        flash: ['RF', 'C'] }
    ]
  },

  /* ---------------- bases loaded ---------------- */

  {
    id: 'rf-loaded-catch-and-throw-home',
    position: 'RF',
    title: 'Fly ball with the bases loaded',
    situation: { outs: 1, runners: ['first', 'second', 'third'] },
    description: 'One out, bases loaded. A fly ball comes out to you, deep enough for the runner on third to tag.',
    steps: [
      { type: 'ball', kind: 'fly', from: 'home', to: 'shallowRightField', duration: 1600,
        caption: 'Fly ball to right with the bases full — everybody tags…',
        fielders: [{ who: 'RF', to: 'shallowRightField' }, { who: '1B', to: 'cutoff1B' }] },
      { type: 'question',
        prompt: 'You catch it for the second out. Where does the throw go?',
        options: ['Home through the cut man — that is the run', 'Third base', 'Second base'],
        answer: 0,
        hint: 'The catch already got the out. What is the runner on third doing right now?',
        explanation: 'The catch is out number two, so the only thing that still matters is the runner trying to score from third. Come up throwing to your cut man on a line toward home. The runners behind him are not worth a throw.' },
      { type: 'throw', from: 'shallowRightField', to: 'cutoff1B', duration: 550,
        caption: 'Catch and throw in one motion…',
        runners: [{ id: 'r3', from: 'third', to: 'home', fromT: 0, toT: 0.75 }] },
      { type: 'throw', from: 'cutoff1B', to: 'home', duration: 400, ballArrivesAt: 0.6,
        caption: 'Through to the catcher…',
        fielders: [{ who: 'C', to: 'home' }],
        runners: [{ id: 'r3', from: 'third', to: 'home', fromT: 0.75, toT: 1 }] },
      { type: 'result', title: 'Out at the plate — inning over!', text: 'The catch was the second out and the tag at home was the third.',
        coach: 'After the catch, the only runner worth a throw is the one trying to score.',
        flash: ['RF', 'C'] }
    ]
  }

);
