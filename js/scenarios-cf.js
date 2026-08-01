/* ============================================================
   Baseball IQ — scenarios-cf.js
   Center field scenarios, grouped by base situation.

   The centre fielder has priority over everybody. He beats both
   corner outfielders, and like any outfielder he beats the infielders
   coming back on a ball. If he calls it, it is his — which means he
   also carries the responsibility to call it early and loudly.

   On a throw home, the CENTRE fielder's cut man is the FIRST BASEMAN.
   (Only balls to left go through the third baseman.)
   ============================================================ */

SCENARIOS.push(

  /* ---------------- bases empty ---------------- */

  {
    id: 'cf-empty-call-off-the-corner',
    position: 'CF',
    title: 'Fly ball into the gap',
    situation: { outs: 0, runners: [] },
    description: 'Nobody out, nobody on. A fly ball carries into the gap between you and the left fielder, and you are both sprinting at it.',
    steps: [
      { type: 'ball', kind: 'fly', from: 'home', to: 'leftCenterGap', duration: 1800,
        caption: 'Fly ball into the left-center gap — both of you are going…',
        fielders: [{ who: 'CF', to: [290, 165] }, { who: 'LF', to: [215, 175] }] },
      { type: 'question',
        prompt: 'You can both reach it. Who should take it?',
        options: ['You — call it loudly and he gets out of the way', 'The left fielder, it is closer to him', 'Whoever calls it first'],
        answer: 0,
        hint: 'One outfielder outranks the other two on every ball.',
        explanation: 'You have priority over both corner outfielders, every time. From the middle you see the ball better and have more room to run, so if you can reach it, it is yours. But priority is a responsibility too — call it early and loudly so he has time to peel off.' },
      { type: 'move', duration: 500, caption: 'You call him off and he peels away…',
        fielders: [{ who: 'CF', to: 'leftCenterGap' }, { who: 'LF', to: [190, 200] }] },
      { type: 'result', title: 'Caught!', text: 'You took charge and made the catch.',
        coach: 'Centre field outranks everybody. If you can get there, call it — but call it early enough to matter.',
        flash: ['CF'] }
    ]
  },

  {
    id: 'cf-empty-call-off-the-infielder',
    position: 'CF',
    title: 'Shallow fly with an infielder drifting back',
    situation: { outs: 0, runners: [] },
    description: 'Nobody out, nobody on. A soft fly ball drops into shallow center, and the second baseman is backpedalling out after it.',
    steps: [
      { type: 'ball', kind: 'fly', from: 'home', to: 'shallowCenterField', duration: 1500,
        caption: 'Soft fly into shallow center — the second baseman drifts back…',
        fielders: [{ who: '2B', to: [430, 300] }, { who: 'CF', to: [400, 175] }] },
      { type: 'question',
        prompt: 'You are charging in and he is backpedalling out. Who takes it?',
        options: ['You — an outfielder coming in beats an infielder going back', 'The second baseman, he was there first', 'Let it drop between you'],
        answer: 0,
        hint: 'Which of you can actually see the ball the whole way?',
        explanation: 'You are running forward with the ball in front of you. He is running backwards with his head turned, which is the hardest catch in baseball. Any ball you can reach is yours — call it loudly and he will clear out.' },
      { type: 'move', duration: 500, caption: 'You call him off and he ducks away…',
        fielders: [{ who: 'CF', to: 'shallowCenterField' }, { who: '2B', to: [460, 340] }] },
      { type: 'result', title: 'Caught!', text: 'Easy catch coming forward instead of a hard one going back.',
        coach: 'Coming in always beats going back. Take anything you can reach off an infielder.',
        flash: ['CF'] }
    ]
  },

  {
    id: 'cf-empty-charge-the-single',
    position: 'CF',
    title: 'Base hit up the middle',
    situation: { outs: 1, runners: [] },
    description: 'One out, nobody on. A ground ball gets through the middle of the infield and rolls out toward you.',
    steps: [
      { type: 'ball', kind: 'ground', from: 'home', to: 'shallowCenterField', duration: 1400,
        caption: 'Ground ball up the middle, rolling out to center…',
        runners: [{ id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.6 }] },
      { type: 'question',
        prompt: 'The ball is coming to you and the batter is rounding first hard. What do you do?',
        options: ['Charge it and get to the ball quickly', 'Let it roll to you and save your legs', 'Wait to see if he tries for second'],
        answer: 0,
        hint: 'He is looking at you while he decides whether to keep running.',
        explanation: 'The runner decides whether to go for second by watching how fast you get to the ball. Charge it and he stops. Jog after it and he is standing on second before you pick it up. Getting there quickly does the work — you may not need to throw at all.' },
      { type: 'move', duration: 700, caption: 'You charge hard and field it clean…',
        fielders: [{ who: 'CF', to: 'shallowCenterField' }],
        runners: [{ id: 'batter', from: 'home', to: 'first', fromT: 0.6, toT: 1 }] },
      { type: 'result', title: 'Runner holds at first', text: 'You got there so fast he never considered second.',
        coach: 'How fast you get to the ball decides how far the runner goes. Charge everything.',
        flash: ['CF'] }
    ]
  },

  /* ---------------- runner on first ---------------- */

  {
    id: 'cf-r1-throw-to-third',
    position: 'CF',
    title: 'Base hit with a runner on first',
    situation: { outs: 1, runners: ['first'] },
    description: 'One out, runner on first. A base hit comes out to you, and that runner is trying to go first to third.',
    steps: [
      { type: 'ball', kind: 'ground', from: 'home', to: 'shallowCenterField', duration: 1300,
        caption: 'Base hit to center — the runner rounds second heading for third…',
        fielders: [{ who: 'CF', to: 'shallowCenterField' }, { who: '3B', to: 'third' }],
        runners: [
          { id: 'r1', from: 'first', to: 'third', fromT: 0, toT: 0.55 },
          { id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.7 }
        ] },
      { type: 'question',
        prompt: 'Nobody is trying to score. Where does your throw go?',
        options: ['Third base, ahead of the runner', 'Home plate, just in case', 'Second base behind him'],
        answer: 0,
        hint: 'Throw to where the runner is going, not where he has been.',
        explanation: 'Throw ahead of the runner, not behind him. He is going to third, so third is the only base where an out is possible. A throw to second gets you nothing because he is already past it, and a throw home is pointless with nobody scoring.' },
      { type: 'throw', from: 'shallowCenterField', to: 'third', duration: 700, ballArrivesAt: 0.7,
        caption: 'Long low throw to third…',
        runners: [
          { id: 'r1', from: 'first', to: 'third', fromT: 0.55, toT: 1 },
          { id: 'batter', from: 'home', to: 'first', fromT: 0.7, toT: 1 }
        ] },
      { type: 'result', title: 'Out at third!', text: 'The throw beat him and the third baseman made the tag.',
        coach: 'Always throw ahead of the runner. Behind him is a wasted throw.',
        flash: ['CF', '3B'] }
    ]
  },

  {
    id: 'cf-r1-back-up-second',
    position: 'CF',
    title: 'Runner steals second',
    situation: { outs: 1, runners: ['first'] },
    description: 'One out, runner on first. He takes off to steal second and the catcher comes up throwing.',
    steps: [
      { type: 'move', duration: 800,
        caption: 'The runner breaks and the catcher throws down to second…',
        fielders: [{ who: '2B', to: 'second' }],
        runners: [{ id: 'r1', from: 'first', to: 'second', fromT: 0, toT: 0.7 }] },
      { type: 'question',
        prompt: 'The throw is coming to second and you are standing straight behind it. What do you do?',
        options: ['Sprint in to back up second base', 'Stay put, it is an infield play', 'Move toward right field'],
        answer: 0,
        hint: 'What is directly behind second base if the throw gets past everyone?',
        explanation: 'You are the only player behind second base. If that throw is high or gets missed, the ball comes straight into center field — and if you are still standing where you started, the runner goes to third. Sprint in every time the catcher throws down.' },
      { type: 'move', duration: 550, caption: 'You sprint in behind the bag…',
        fielders: [{ who: 'CF', to: 'backupSecond' }] },
      { type: 'throw', from: 'C', to: 'second', duration: 550, ballArrivesAt: 0.7,
        caption: 'The throw comes down to second…',
        runners: [{ id: 'r1', from: 'first', to: 'second', fromT: 0.7, toT: 1 }] },
      { type: 'result', title: 'Caught stealing!', text: 'The throw was on the money — and you were behind it the whole way.',
        coach: 'Every throw down to second, you run in behind it. Nobody else is back there.',
        flash: ['CF', '2B'] }
    ]
  },

  /* ---------------- runner on second ---------------- */

  {
    id: 'cf-r2-hit-the-cut-man',
    position: 'CF',
    title: 'Base hit with a runner on second',
    situation: { outs: 1, runners: ['second'] },
    description: 'One out, runner on second. A base hit comes out to center and that runner takes off for home.',
    steps: [
      { type: 'ball', kind: 'ground', from: 'home', to: 'shallowCenterField', duration: 1300,
        caption: 'Base hit to center — the runner is going for home…',
        fielders: [{ who: 'CF', to: 'shallowCenterField' }, { who: '1B', to: 'cutoff1B' }, { who: '2B', to: 'first' }],
        runners: [
          { id: 'r2', from: 'second', to: 'home', fromT: 0, toT: 0.55 },
          { id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.7 }
        ] },
      { type: 'question',
        prompt: 'Somebody has run out and lined up between you and home. Who is it, and what do you do?',
        options: ['The first baseman — throw hard and low right at him', 'The third baseman — throw to him', 'Nobody, throw it all the way home yourself'],
        answer: 0,
        hint: 'Balls to left go through one corner infielder; centre and right go through the other.',
        explanation: 'On a ball to centre or right, the first baseman is the cut man. Throw hard and low at his chest. If it is on line he lets it through to the catcher; if it is off he grabs it and stops the batter from taking second. Sailing it over his head throws that away.' },
      { type: 'throw', from: 'shallowCenterField', to: 'cutoff1B', duration: 600,
        caption: 'Hard low throw right at the cut man…',
        runners: [
          { id: 'r2', from: 'second', to: 'home', fromT: 0.55, toT: 0.9 },
          { id: 'batter', from: 'home', to: 'first', fromT: 0.7, toT: 1 }
        ] },
      { type: 'throw', from: 'cutoff1B', to: 'home', duration: 400, ballArrivesAt: 0.6,
        caption: 'On line — he lets it through to the catcher…',
        fielders: [{ who: 'C', to: 'home' }],
        runners: [{ id: 'r2', from: 'second', to: 'home', fromT: 0.9, toT: 1 }] },
      { type: 'result', title: 'Out at the plate!', text: 'Low and on line, straight through the cut man.',
        coach: 'Centre and right go through the first baseman. Left goes through the third baseman. Hit him in the chest.',
        flash: ['CF', '1B', 'C'] }
    ]
  },

  {
    id: 'cf-r2-ball-to-the-fence',
    position: 'CF',
    title: 'Ball to the fence',
    situation: { outs: 1, runners: ['second'] },
    description: 'One out, runner on second. The batter drives one over your head to the fence in deep center.',
    steps: [
      { type: 'ball', kind: 'fly', from: 'home', to: 'rightCenterGap', duration: 1900,
        caption: 'Over your head, all the way to the wall…',
        fielders: [{ who: 'CF', to: 'rightCenterGap' }, { who: 'SS', to: 'relayCenter' }],
        runners: [
          { id: 'r2', from: 'second', to: 'home', fromT: 0, toT: 0.6 },
          { id: 'batter', from: 'home', to: 'second', fromT: 0, toT: 0.6 }
        ] },
      { type: 'question',
        prompt: 'You have run it down at the wall. The shortstop is out on the grass waving his arms at you. What do you do?',
        options: ['Turn and throw to him — he is the relay man', 'Throw as hard as you can toward home', 'Run the ball back in yourself'],
        answer: 0,
        hint: 'How far is it from the fence to home plate, and how accurate is that throw going to be?',
        explanation: 'Nobody can throw accurately from the wall to the infield. The relay man comes out so you only have to make a short throw, and he makes the second one. One long wild throw lets every runner take another base.' },
      { type: 'throw', from: 'rightCenterGap', to: 'relayCenter', duration: 700,
        caption: 'Turn and throw to the relay man…',
        runners: [
          { id: 'r2', from: 'second', to: 'home', fromT: 0.6, toT: 1 },
          { id: 'batter', from: 'home', to: 'second', fromT: 0.6, toT: 1 }
        ] },
      { type: 'result', title: 'Run scores, batter stops at second', text: 'You could not stop the run, but the quick relay kept the batter off third.',
        coach: 'At the wall, find your relay man and hit him fast. Two short throws beat one long one every time.',
        flash: ['CF', 'SS'] }
    ]
  },

  /* ---------------- runner on third ---------------- */

  {
    id: 'cf-r3-tag-up-throw',
    position: 'CF',
    title: 'Fly ball with a runner on third',
    situation: { outs: 1, runners: ['third'] },
    description: 'One out, runner on third. A fly ball comes to you, deep enough for him to tag up and try to score.',
    steps: [
      { type: 'ball', kind: 'fly', from: 'home', to: 'shallowCenterField', duration: 1600,
        caption: 'Fly ball to center — the runner goes back to tag…',
        fielders: [{ who: 'CF', to: 'shallowCenterField' }, { who: '1B', to: 'cutoff1B' }] },
      { type: 'question',
        prompt: 'He is going to tag and go. How do you catch it?',
        options: ['Get behind the ball and catch it moving forward', 'Catch it standing still, then set up to throw', 'Catch it and take a few steps to build momentum'],
        answer: 0,
        hint: 'You have to throw immediately. Where should your body already be moving?',
        explanation: 'Line yourself up behind the ball so you are stepping toward home as you catch it. Then the catch and the throw are one motion. Catching flat-footed means resetting your feet first, and that pause is the run.' },
      { type: 'throw', from: 'shallowCenterField', to: 'cutoff1B', duration: 550,
        caption: 'Caught coming forward, straight into the throw…',
        runners: [{ id: 'r3', from: 'third', to: 'home', fromT: 0, toT: 0.75 }] },
      { type: 'throw', from: 'cutoff1B', to: 'home', duration: 400, ballArrivesAt: 0.6,
        caption: 'Through the cut man to the plate…',
        fielders: [{ who: 'C', to: 'home' }],
        runners: [{ id: 'r3', from: 'third', to: 'home', fromT: 0.75, toT: 1 }] },
      { type: 'result', title: 'Out at the plate — double play!', text: 'The catch was one out and the tag at home was the second.',
        coach: 'Catch tag-up balls moving forward. Your throw should start before the catch is finished.',
        flash: ['CF', 'C'] }
    ]
  },

  /* ---------------- runners on first and second ---------------- */

  {
    id: 'cf-r1r2-throw-ahead',
    position: 'CF',
    title: 'Base hit with runners on first and second',
    situation: { outs: 1, runners: ['first', 'second'] },
    description: 'One out, runners on first and second. A base hit comes to you in center. The runner from second is heading home and the runner from first is going to third.',
    steps: [
      { type: 'ball', kind: 'ground', from: 'home', to: 'shallowCenterField', duration: 1300,
        caption: 'Base hit to center — two runners moving…',
        fielders: [{ who: 'CF', to: 'shallowCenterField' }, { who: '1B', to: 'cutoff1B' }, { who: '2B', to: 'first' }],
        runners: [
          { id: 'r2', from: 'second', to: 'home', fromT: 0, toT: 0.55 },
          { id: 'r1', from: 'first', to: 'third', fromT: 0, toT: 0.55 },
          { id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.7 }
        ] },
      { type: 'question',
        prompt: 'Two runners are on the move. Which one do you throw at?',
        options: ['Home — the run is always worth more than an extra base', 'Third, to get the runner from first', 'First, to keep the batter close'],
        answer: 0,
        hint: 'One of those runners is about to put a number on the scoreboard.',
        explanation: 'A run counts forever; a runner reaching third does not. Throw home through the cut man. If your throw is off line, the first baseman cuts it and can still stop the other runners — which is exactly why you throw through him instead of over him.' },
      { type: 'throw', from: 'shallowCenterField', to: 'cutoff1B', duration: 600,
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
      { type: 'result', title: 'Out at the plate!', text: 'You stopped the run. The other runner reached third, which costs nothing.',
        coach: 'When two runners are going, throw at the one who is about to score. Bases are cheap; runs are not.',
        flash: ['CF', 'C'] }
    ]
  }

);
