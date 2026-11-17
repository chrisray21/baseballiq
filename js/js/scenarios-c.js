/* ============================================================
   Baseball IQ — scenarios-c.js
   Catcher scenarios, grouped by base situation.

   The catcher is the only fielder who can see the whole field, and
   the only one involved in almost every play. His jobs here:
     - Own home plate: know when it is a FORCE and when it needs a TAG.
       That single distinction decides most plays he is part of.
     - Keep the ball in front of him so runners cannot advance.
     - Throw runners out on steals.
     - Field bunts, and pick the right base.
     - Back up first base on infield ground balls — the job almost
       nobody teaches, and the one that saves the most bases.
   ============================================================ */

SCENARIOS.push(

  /* ---------------- bases empty ---------------- */

  {
    id: 'c-empty-popup-behind-plate',
    position: 'C',
    title: 'Pop-up behind the plate',
    situation: { outs: 0, runners: [] },
    description: 'Nobody out, nobody on. The batter pops one straight up behind you, over foul ground.',
    steps: [
      { type: 'ball', kind: 'foul', from: 'home', to: 'foulBehindPlate', duration: 1700,
        caption: 'Pop-up straight up behind the plate…',
        fielders: [{ who: 'C', to: 'foulBehindPlate' }] },
      { type: 'question',
        prompt: 'The ball is spinning back over your head toward the screen. What do you do first?',
        options: ['Turn your back to the field, find the ball, then move to it', 'Stay facing the field and reach back for it', 'Let it drop — it is foul ground'],
        answer: 0,
        hint: 'A pop-up behind the plate spins back toward the field. Which way should you be facing to follow it?',
        explanation: 'Rip your mask off, turn around so your back is to the infield, and find it. These pop-ups spin back toward the field as they come down, so if you stay facing forward the ball drifts away from you the whole way. And a catch in foul ground is an out just like any other.' },
      { type: 'result', title: 'Caught — out!', text: 'You turned, found it, and squeezed it.',
        coach: 'Mask off, turn around, find the ball, then go get it. Foul ground still counts.',
        flash: ['C'] }
    ]
  },

  {
    id: 'c-empty-back-up-first',
    position: 'C',
    title: 'Ground ball to the infield',
    situation: { outs: 1, runners: [] },
    description: 'One out, nobody on. A routine ground ball goes to the shortstop, and the throw to first is on its way.',
    steps: [
      { type: 'ball', kind: 'ground', from: 'home', to: 'SS', duration: 1100,
        caption: 'Routine ground ball to short…',
        runners: [{ id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.5 }] },
      { type: 'question',
        prompt: 'The shortstop has it and is about to throw to first. What is your job?',
        options: ['Sprint down the line behind first base to back up the throw', 'Stay at home plate', 'Follow the batter down the line to watch'],
        answer: 0,
        hint: 'It is the longest throw on the infield. What happens if it gets past the first baseman?',
        explanation: 'That long throw across the diamond is the one most likely to get away. If it does and nobody is behind first, the batter jogs to second. You are the only player with nothing else to do, so take off down the line the moment the ball is hit.' },
      { type: 'move', duration: 800, caption: 'You sprint down the line behind first…',
        fielders: [{ who: 'C', to: 'backupFirst' }],
        runners: [{ id: 'batter', from: 'home', to: 'first', fromT: 0.5, toT: 0.8 }] },
      { type: 'throw', from: 'SS', to: 'first', duration: 700, ballArrivesAt: 0.7,
        caption: 'Throw across to first…',
        fielders: [{ who: '1B', to: 'first' }],
        runners: [{ id: 'batter', from: 'home', to: 'first', fromT: 0.8, toT: 1 }] },
      { type: 'result', title: 'Out at first', text: 'The throw was good this time — but you were in position if it had not been.',
        coach: 'Every infield ground ball, you run to back up first. You will not be needed most of the time. The one time you are, you save a base.',
        flash: ['C', '1B'] }
    ]
  },

  {
    id: 'c-empty-bunt',
    position: 'C',
    title: 'Bunt in front of the plate',
    situation: { outs: 0, runners: [] },
    description: 'Nobody out, nobody on. The batter drops a bunt that stops almost straight in front of the plate.',
    steps: [
      { type: 'ball', kind: 'ground', from: 'home', to: 'buntHome', duration: 800,
        caption: 'Bunt dies right in front of the plate…',
        fielders: [{ who: 'C', to: 'buntHome' }, { who: '2B', to: 'first' }, { who: '1B', to: 'buntFirst' }],
        runners: [{ id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.55 }] },
      { type: 'question',
        prompt: 'The ball is sitting right in front of you. How should you pick it up and throw?',
        options: ['Come around the ball so you are already facing first when you pick it up', 'Grab it straight ahead, then turn your body to throw', 'Wait for the first baseman to take it'],
        answer: 0,
        hint: 'Turning your whole body after you pick up the ball costs time. Can you avoid needing to?',
        explanation: 'Step around the ball in a small curve so that when you pick it up your shoulders are already pointing at first base. If you grab it facing the mound you then have to spin, and the spin is what makes the throw late and wild.' },
      { type: 'throw', from: 'buntHome', to: 'first', duration: 550, ballArrivesAt: 0.7,
        caption: 'Already facing first — clean throw…',
        runners: [{ id: 'batter', from: 'home', to: 'first', fromT: 0.55, toT: 1 }] },
      { type: 'result', title: 'Out at first', text: 'Coming around the ball is what made the throw quick enough.',
        coach: 'On a bunt straight in front of you, circle around it. Pick it up already facing where you are throwing.',
        flash: ['C', '2B'] }
    ]
  },

  /* ---------------- runner on first ---------------- */

  {
    id: 'c-r1-throw-out-the-steal',
    position: 'C',
    title: 'Runner steals second',
    situation: { outs: 1, runners: ['first'] },
    description: 'One out, runner on first, right-handed batter at the plate. The runner takes off for second as the pitch comes in.',
    steps: [
      { type: 'move', duration: 800,
        caption: 'The runner breaks for second as the pitch arrives…',
        fielders: [{ who: '2B', to: 'second' }],
        runners: [{ id: 'r1', from: 'first', to: 'second', fromT: 0, toT: 0.7 }] },
      { type: 'question',
        prompt: 'A right-handed batter is up. Who are you throwing to at second base?',
        options: ['The second baseman — he covers with a righty at the plate', 'The shortstop', 'Whoever gets there first'],
        answer: 0,
        hint: 'With a righty hitting, which middle infielder has to stay home and guard the left side?',
        explanation: 'With a right-handed batter up, the shortstop stays to guard the left side, so the second baseman takes the bag. Know which one it is before the pitch — you cannot work it out while you are throwing.' },
      { type: 'throw', from: 'C', to: 'second', duration: 550, ballArrivesAt: 0.7,
        caption: 'Up and throw — right on the bag…',
        runners: [{ id: 'r1', from: 'first', to: 'second', fromT: 0.7, toT: 1 }] },
      { type: 'result', title: 'Caught stealing!', text: 'The throw beat him and the second baseman put the tag on.',
        coach: 'Righty at the plate, throw to the second baseman. Lefty, throw to the shortstop. Decide before the pitch.',
        flash: ['C', '2B'] }
    ]
  },

  {
    id: 'c-r1-block-the-pitch',
    position: 'C',
    title: 'Pitch in the dirt with a runner on first',
    situation: { outs: 1, runners: ['first'] },
    description: 'One out, runner on first. The pitch comes in low and bounces in the dirt right in front of you.',
    steps: [
      { type: 'ball', kind: 'pitch', from: [400, 500], to: 'buntHome', duration: 500,
        caption: 'The pitch bounces in the dirt in front of the plate…' },
      { type: 'question',
        prompt: 'The ball is in the dirt. What do you do?',
        options: ['Drop to your knees and keep it in front of you', 'Reach out and try to catch it in your glove', 'Get out of the way and go pick it up after'],
        answer: 0,
        hint: 'Catching it cleanly is nice. But what really matters is where the ball ends up.',
        explanation: 'Do not try to catch it — reaching means it goes under your glove and to the screen. Drop your knees, get your chest over the ball and let it hit you. It does not matter if you catch it. It matters that it stays in front of you so nobody moves up a base.' },
      { type: 'result', title: 'Blocked — runner holds', text: 'The ball stayed right in front of you and the runner never left first.',
        coach: 'Blocking is not catching. Keep it in front and the runners stay where they are.',
        flash: ['C'] }
    ]
  },

  /* ---------------- runner on second ---------------- */

  {
    id: 'c-r2-play-at-the-plate-tag',
    position: 'C',
    title: 'Play at the plate, runner on second',
    situation: { outs: 1, runners: ['second'] },
    description: 'One out, runner on second. A base hit goes to right field and that runner is trying to score.',
    steps: [
      { type: 'ball', kind: 'ground', from: 'home', to: 'shallowRightField', duration: 1400,
        caption: 'Base hit to right — the runner is coming home…',
        fielders: [{ who: '1B', to: 'cutoff1B' }, { who: '2B', to: 'first' }],
        runners: [
          { id: 'r2', from: 'second', to: 'home', fromT: 0, toT: 0.55 },
          { id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.7 }
        ] },
      { type: 'question',
        prompt: 'The throw is coming to you and the runner is coming to you. Is this a force or a tag?',
        options: ['A tag — first base is empty, so he does not have to run', 'A force — just touch the plate', 'Neither, he is automatically safe'],
        answer: 0,
        hint: 'A force only exists if every base behind the runner is occupied. Is first base occupied?',
        explanation: 'He started on second and first base was empty, so nobody pushed him — he chose to run. That means you have to tag him, not just touch the plate. Catch the ball first, then put the glove down in front of the plate where he has to slide.' },
      { type: 'move', duration: 600, caption: 'You set up in front of the plate and wait for the throw…',
        fielders: [{ who: 'C', to: 'home' }],
        runners: [
          { id: 'r2', from: 'second', to: 'home', fromT: 0.55, toT: 0.85 },
          { id: 'batter', from: 'home', to: 'first', fromT: 0.7, toT: 1 }
        ] },
      { type: 'throw', from: 'shallowRightField', to: 'cutoff1B', duration: 550,
        caption: 'The right fielder hits the cut man…',
        runners: [{ id: 'r2', from: 'second', to: 'home', fromT: 0.85, toT: 0.93 }] },
      { type: 'throw', from: 'cutoff1B', to: 'home', duration: 450, ballArrivesAt: 0.65,
        caption: '…and the throw comes home to you.',
        runners: [{ id: 'r2', from: 'second', to: 'home', fromT: 0.93, toT: 1 }] },
      { type: 'result', title: 'Tagged out at the plate!', text: 'You caught it, then put the tag down. No run.',
        coach: 'Runner from second means a tag. Catch it first — dropping the ball while you reach for the tag costs a run.',
        flash: ['C'] }
    ]
  },

  /* ---------------- runner on third ---------------- */

  {
    id: 'c-r3-passed-ball',
    position: 'C',
    title: 'Ball gets past you with a runner on third',
    situation: { outs: 1, runners: ['third'] },
    description: 'One out, runner on third. The pitch skips past you and rolls back toward the screen.',
    steps: [
      { type: 'ball', kind: 'pitch', from: 'home', to: 'backupHome', duration: 800,
        caption: 'The ball gets by you and rolls to the screen…',
        fielders: [{ who: 'C', to: 'backupHome' }, { who: 'P', to: 'home' }],
        runners: [{ id: 'r3', from: 'third', to: 'home', fromT: 0, toT: 0.4 }] },
      { type: 'question',
        prompt: 'You have chased the ball down at the screen and the runner is coming home. What now?',
        options: ['Throw to the pitcher, who is covering the plate', 'Sprint back and try to beat him to the plate yourself', 'Hold the ball, he has already scored'],
        answer: 0,
        hint: 'You are behind the plate and he is running to it. Who got there first?',
        explanation: 'You cannot get back in time, and you do not need to — the pitcher covers home the moment the ball gets past you. Turn, find him at the plate, and give him a low accurate throw so he can catch it and tag in one motion.' },
      { type: 'throw', from: 'backupHome', to: 'home', duration: 450, ballArrivesAt: 0.65,
        caption: 'Quick throw to the pitcher at the plate…',
        runners: [{ id: 'r3', from: 'third', to: 'home', fromT: 0.4, toT: 1 }] },
      { type: 'result', title: 'Out at the plate!', text: 'The pitcher had the plate covered and applied the tag.',
        coach: 'Ball gets by you, go get it fast and look for the pitcher at the plate. He should already be there.',
        flash: ['C', 'P'] }
    ]
  },

  {
    id: 'c-r3-tag-up-throw-home',
    position: 'C',
    title: 'Fly ball with a runner on third',
    situation: { outs: 1, runners: ['third'] },
    description: 'One out, runner on third. A fly ball goes to left field, deep enough that the runner can tag up and try to score.',
    steps: [
      { type: 'ball', kind: 'fly', from: 'home', to: 'shallowLeftField', duration: 1600,
        caption: 'Fly ball to left — the runner goes back to tag…',
        fielders: [{ who: '3B', to: 'cutoff3B' }, { who: 'C', to: 'home' }] },
      { type: 'question',
        prompt: 'He is going to tag and run. Where should you set up, and what are you watching for?',
        options: ['Up the line in front of the plate, watching the cut man in case the throw is off', 'Standing on the plate blocking it', 'Behind the plate where you normally catch'],
        answer: 0,
        hint: 'The throw is coming from left field through a cut man. What can go wrong with it?',
        explanation: 'Set up a step up the line so you can see the whole throw and still get back to the plate. The third baseman is the cut man on a ball to left, and if the throw is off line he will cut it — so watch the ball, not just the runner.' },
      { type: 'move', duration: 700, caption: 'You set up up the line and track the throw…',
        runners: [{ id: 'r3', from: 'third', to: 'home', fromT: 0, toT: 0.5 }] },
      { type: 'throw', from: 'shallowLeftField', to: 'cutoff3B', duration: 550,
        caption: 'The left fielder throws to the cut man…',
        runners: [{ id: 'r3', from: 'third', to: 'home', fromT: 0.5, toT: 0.85 }] },
      { type: 'throw', from: 'cutoff3B', to: 'home', duration: 400, ballArrivesAt: 0.6,
        caption: '…and it comes on through to you.',
        runners: [{ id: 'r3', from: 'third', to: 'home', fromT: 0.85, toT: 1 }] },
      { type: 'result', title: 'Tagged out at the plate!', text: 'The throw came through clean and you got the tag down.',
        coach: 'Set up where you can see the throw. Blocking the plate before you have the ball just gets you run over.',
        flash: ['C', '3B'] }
    ]
  },

  /* ---------------- runners on first and second ---------------- */

  {
    id: 'c-r1r2-bunt-throw-third',
    position: 'C',
    title: 'Bunt with runners on first and second',
    situation: { outs: 0, runners: ['first', 'second'] },
    description: 'Nobody out, runners on first and second. The batter squares to bunt, and the shortstop breaks over to cover third.',
    steps: [
      { type: 'ball', kind: 'ground', from: 'home', to: 'buntHome', duration: 800,
        caption: 'Bunt right in front of the plate — you pounce on it…',
        fielders: [{ who: 'C', to: 'buntHome' }, { who: 'SS', to: 'third' }, { who: '2B', to: 'first' }],
        runners: [
          { id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.4 },
          { id: 'r1', from: 'first', to: 'second', fromT: 0, toT: 0.45 },
          { id: 'r2', from: 'second', to: 'third', fromT: 0, toT: 0.5 }
        ] },
      { type: 'question',
        prompt: 'You got to it first and the shortstop is on third base. Where do you throw?',
        options: ['Third base for the force on the front runner', 'First base for the easy out', 'Second base'],
        answer: 0,
        hint: 'Everybody is forced. Which out hurts the other team most, and can you see that base from here?',
        explanation: 'You are facing the field with the whole play in front of you, which nobody else fielding this bunt can say. Everyone is forced, so third is a force out and it takes away their best runner. Only make this throw if you got to the ball fast — otherwise take first.' },
      { type: 'throw', from: 'buntHome', to: 'third', duration: 600, ballArrivesAt: 0.7,
        caption: 'Strong throw down to third…',
        runners: [
          { id: 'r2', from: 'second', to: 'third', fromT: 0.5, toT: 1 },
          { id: 'r1', from: 'first', to: 'second', fromT: 0.45, toT: 1 },
          { id: 'batter', from: 'home', to: 'first', fromT: 0.4, toT: 1 }
        ] },
      { type: 'result', title: 'Force out at third!', text: 'The front runner is out and the other two only moved up one base.',
        coach: 'You are the only one who sees the whole field. On a bunt you reach first, look at the furthest base you can get.',
        flash: ['C', 'SS'] }
    ]
  },

  /* ---------------- runners on first and third ---------------- */

  {
    id: 'c-r1r3-block-saves-a-run',
    position: 'C',
    title: 'Pitch in the dirt with a runner on third',
    situation: { outs: 1, runners: ['first', 'third'] },
    description: 'One out, runners on first and third. The pitch bounces in the dirt in front of you, and the runner on third is watching for exactly this.',
    steps: [
      { type: 'ball', kind: 'pitch', from: [400, 500], to: 'buntHome', duration: 450,
        caption: 'Another one in the dirt — and the runner on third takes two steps…',
        runners: [{ id: 'r3', from: 'third', to: 'home', fromT: 0, toT: 0.15 }] },
      { type: 'question',
        prompt: 'Same block as before, but now a run is at stake. Does anything change?',
        options: ['No — block it exactly the same way, then look him back to third', 'Reach for it so you can throw quicker', 'Chase it so you can throw home fast'],
        answer: 0,
        hint: 'What is the fastest way to make sure he cannot score?',
        explanation: 'Block it exactly the same. Reaching for it to save time is what sends the ball to the screen and lets the run walk in. Get it in front of you, then pick it up and look him back — the run stays at third because the ball never got away.' },
      { type: 'move', duration: 500, caption: 'You block it dead, pick it up, and stare him back…',
        runners: [{ id: 'r3', from: 'third', to: 'home', fromT: 0.15, toT: 0 }] },
      { type: 'result', title: 'Blocked — no run', text: 'The ball never got away, so the runner had to go back to third.',
        coach: 'The block is the play. Keep it in front and there is nothing to throw at, because nobody went anywhere.',
        flash: ['C'] }
    ]
  },

  /* ---------------- bases loaded ---------------- */

  {
    id: 'c-loaded-force-at-home',
    position: 'C',
    title: 'Ground ball with the bases loaded',
    situation: { outs: 0, runners: ['first', 'second', 'third'] },
    description: 'Nobody out, bases loaded. A ground ball goes to the pitcher and the runner on third breaks for home.',
    steps: [
      { type: 'ball', kind: 'ground', from: 'home', to: 'mound', duration: 900,
        caption: 'Ground ball back to the pitcher…',
        fielders: [{ who: 'C', to: 'home' }],
        runners: [
          { id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.4 },
          { id: 'r1', from: 'first', to: 'second', fromT: 0, toT: 0.4 },
          { id: 'r2', from: 'second', to: 'third', fromT: 0, toT: 0.4 },
          { id: 'r3', from: 'third', to: 'home', fromT: 0, toT: 0.45 }
        ] },
      { type: 'question',
        prompt: 'The throw is coming to you at the plate. Force or tag this time?',
        options: ['A force — every base is full, so just touch the plate', 'A tag — you have to put the glove on him', 'Whichever is easier to reach'],
        answer: 0,
        hint: 'Bases loaded means the batter pushes everybody. Does the runner on third have a choice?',
        explanation: 'With the bases loaded the batter forces every runner to move, including the one on third — so home plate is a force out. Just catch the ball and touch the plate with your foot. Chasing a tag you do not need is how runners end up safe.' },
      { type: 'throw', from: 'mound', to: 'home', duration: 450, ballArrivesAt: 0.6,
        caption: 'Throw home — you step on the plate…',
        runners: [
          { id: 'r3', from: 'third', to: 'home', fromT: 0.45, toT: 1 },
          { id: 'r2', from: 'second', to: 'third', fromT: 0.4, toT: 1 },
          { id: 'r1', from: 'first', to: 'second', fromT: 0.4, toT: 1 },
          { id: 'batter', from: 'home', to: 'first', fromT: 0.4, toT: 1 }
        ] },
      { type: 'result', title: 'Force out at home!', text: 'Foot on the plate, no tag needed. No run scores.',
        coach: 'Bases loaded is the one time home plate is a force. Touch the plate — it is much faster than a tag.',
        flash: ['C'] }
    ]
  }

);
