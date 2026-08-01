/* ============================================================
   Baseball IQ — scenarios-ss.js
   Shortstop scenarios, grouped by base situation.

   The shortstop is the mirror of the second baseman, with two
   differences worth keeping straight while reading this file:
     - Facing home, the SS's RIGHT is toward third base and his LEFT
       is toward second. (Opposite of the 2B.)
     - He is a long way from first base (244px on this field, versus
       82px to second), which is why "take the closest force" so often
       means second base for him.
   ============================================================ */

SCENARIOS.push(

  /* ---------------- bases empty ---------------- */

  {
    id: 'ss-empty-routine-grounder',
    position: 'SS',
    title: 'Routine grounder, bases empty',
    situation: { outs: 1, runners: [] },
    description: 'One out, nobody on. A ground ball comes right at you.',
    steps: [
      { type: 'ball', kind: 'ground', from: 'home', to: 'SS', duration: 1100,
        caption: 'Ground ball right at the shortstop…',
        runners: [{ id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.5 }] },
      { type: 'pause', ms: 300 },
      { type: 'question',
        prompt: 'You field it cleanly. Where does the throw go?',
        options: ['Throw to first base', 'Throw to second base', 'Hold on to the ball'],
        answer: 0,
        hint: 'Only one player is running anywhere. Where is he going?',
        explanation: 'Nobody is on base, so the only runner is the batter and the only play is at first. It is the longest throw you make, so field the ball, get your feet under you, and let it go.' },
      { type: 'throw', from: 'SS', to: 'first', duration: 750, ballArrivesAt: 0.7,
        caption: 'Long throw across the diamond…',
        fielders: [{ who: '1B', to: 'first' }],
        runners: [{ id: 'batter', from: 'home', to: 'first', fromT: 0.5, toT: 1 }] },
      { type: 'result', title: 'Out at first', text: 'Strong throw beats the runner.',
        coach: 'Shortstop makes the longest throw on the infield. Nothing fancy — field it clean and throw it hard.',
        flash: ['SS', '1B'] }
    ]
  },

  {
    id: 'ss-empty-in-the-hole',
    position: 'SS',
    title: 'Ground ball in the hole, bases empty',
    situation: { outs: 1, runners: [] },
    description: 'One out, nobody on. A hard ground ball is hit to your right, into the gap between you and the third baseman.',
    steps: [
      { type: 'ball', kind: 'ground', from: 'home', to: 'backhandSS', duration: 1000,
        caption: 'Hit hard to your right, into the hole…',
        fielders: [{ who: 'SS', to: 'backhandSS' }],
        runners: [{ id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.6 }] },
      { type: 'pause', ms: 250 },
      { type: 'question',
        prompt: 'You backhand it deep in the hole, moving away from first base. What now?',
        options: ['Plant your feet, then make one strong throw', 'Throw it as fast as you can off your back foot', 'Hold the ball — it is too far to throw'],
        answer: 0,
        hint: 'This is already the longest throw on the field. What happens if you rush it too?',
        explanation: 'You are deep in the hole and moving the wrong way, so this throw is long. Take the extra half second to plant your feet. A throw that is a little late but on target beats one that is early and sails past the first baseman.' },
      { type: 'throw', from: 'backhandSS', to: 'first', duration: 800, ballArrivesAt: 0.7,
        caption: 'Planted, and a strong throw across…',
        fielders: [{ who: '1B', to: 'first' }],
        runners: [{ id: 'batter', from: 'home', to: 'first', fromT: 0.6, toT: 1 }] },
      { type: 'result', title: 'Out at first — just barely', text: 'Setting your feet was exactly what made the throw good enough.',
        coach: 'Getting to the ball is athletic. Getting the out is about your feet. Plant, then throw.',
        flash: ['SS', '1B'] }
    ]
  },

  {
    id: 'ss-empty-shallow-pop',
    position: 'SS',
    title: 'Pop-up into shallow left field',
    situation: { outs: 0, runners: [] },
    description: 'Nobody out, nobody on. A pop fly drops into shallow left field — past you, but in front of the left fielder.',
    steps: [
      { type: 'ball', kind: 'fly', from: 'home', to: 'shallowLeftField', duration: 1500,
        caption: 'High pop-up carrying out past the infield…' },
      { type: 'move', duration: 900,
        caption: 'You drift back on it while the left fielder comes charging in…',
        fielders: [{ who: 'LF', to: [215, 220] }, { who: 'SS', to: [290, 275] }] },
      { type: 'question',
        prompt: 'You are drifting back and the left fielder is charging in — and he calls for it. What do you do?',
        options: ['Get out of the way and let him take it', 'Call him off and catch it yourself', 'Keep going for it and hope he stops'],
        answer: 0,
        hint: 'Who has the easier time catching a ball: someone running forward, or someone backing up?',
        explanation: 'The outfielder gets the ball any time you can both reach it. He is running forward and can see it the whole way; you are backpedalling, which is the hardest way to catch anything. Call for balls you are sure of, but the second you hear him call it, get out of the way.' },
      { type: 'move', duration: 350, caption: 'You peel off and give him room…',
        fielders: [{ who: 'SS', to: [335, 330] }, { who: 'LF', to: 'shallowLeftField' }] },
      { type: 'result', title: 'Left fielder makes the catch', text: 'Easy catch, nobody ran into anybody.',
        coach: 'Outfielder calls it, you get out of the way. Every time.',
        flash: ['LF'] }
    ]
  },

  {
    id: 'ss-empty-gap-relay',
    position: 'SS',
    title: 'Ball in the gap, bases empty',
    situation: { outs: 1, runners: [] },
    description: 'One out, bases empty. The batter drives one into the gap in left-center field.',
    steps: [
      { type: 'ball', kind: 'fly', from: 'home', to: 'leftCenterGap', duration: 1900,
        caption: 'Deep drive into the left-center gap…',
        runners: [{ id: 'batter', from: 'home', to: 'second', fromT: 0, toT: 0.9 }] },
      { type: 'question',
        prompt: 'The ball is way out in the gap and the batter is running hard. What is your job?',
        options: ['Run out toward the outfielder so he has someone close to throw to', 'Stay at second base and wait for the ball', 'Run out and help chase the ball down'],
        answer: 0,
        hint: 'That is a very long way to throw. Who can make it shorter?',
        explanation: 'The outfielder cannot throw that far accurately, so you run out and become the middle man. He throws to you, you turn and throw to the base. Getting out where he can reach you is the whole job.' },
      { type: 'move', duration: 800, caption: 'You run out to meet the throw…',
        fielders: [{ who: 'SS', to: 'relayLeft' }],
        runners: [{ id: 'batter', from: 'home', to: 'second', fromT: 0.9, toT: 1 }] },
      { type: 'throw', from: 'leftCenterGap', to: 'relayLeft', duration: 800,
        caption: 'The outfielder fires it in to you…' },
      { type: 'result', title: 'Runner holds at second', text: 'Getting the ball back in quickly kept him from trying for third.',
        coach: 'On a ball hit way out there, you stop being a fielder and start being a middle man. Run out and give him a close target.',
        flash: ['SS'] }
    ]
  },

  /* ---------------- runner on first ---------------- */

  {
    id: 'ss-r1-start-double-play',
    position: 'SS',
    title: 'Ground ball with a runner on first',
    situation: { outs: 0, runners: ['first'] },
    description: 'Nobody out, runner on first. A ground ball is hit right to you.',
    steps: [
      { type: 'ball', kind: 'ground', from: 'home', to: 'SS', duration: 1150,
        caption: 'Two-hopper to the shortstop…',
        fielders: [{ who: '2B', to: 'second' }],
        runners: [
          { id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.4 },
          { id: 'r1', from: 'first', to: 'second', fromT: 0, toT: 0.4 }
        ] },
      { type: 'pause', ms: 250 },
      { type: 'question',
        prompt: 'The second baseman is running over to cover the bag. Where does the ball go first?',
        options: ['Throw to second base to start the double play', 'Throw straight to first', 'Run the ball over to second yourself'],
        answer: 0,
        hint: 'You have a chance at two outs here. Which base has to happen first?',
        explanation: 'The runner from first has to run, so second base is a force. Get that out first, then let the second baseman finish it at first. Throwing straight to first gives up the double play.' },
      { type: 'throw', from: 'SS', to: 'second', duration: 500,
        caption: 'Throw to the second baseman covering…',
        runners: [
          { id: 'r1', from: 'first', to: 'second', fromT: 0.4, toT: 1 },
          { id: 'batter', from: 'home', to: 'first', fromT: 0.4, toT: 0.7 }
        ] },
      { type: 'pause', ms: 180 },
      { type: 'throw', from: 'second', to: 'first', duration: 600, ballArrivesAt: 0.7,
        caption: '…and he turns and throws to first.',
        fielders: [{ who: '1B', to: 'first' }],
        runners: [{ id: 'batter', from: 'home', to: 'first', fromT: 0.7, toT: 1 }] },
      { type: 'result', title: 'Double play!', text: 'Two outs on one ground ball.',
        coach: 'Runner on first and a grounder to you: second base first, every time. Get the force, then let your partner finish it.',
        flash: ['2B', '1B'] }
    ]
  },

  {
    id: 'ss-r1-cover-second-pivot',
    position: 'SS',
    title: 'Ground ball to the second baseman',
    situation: { outs: 0, runners: ['first'] },
    description: 'Nobody out, runner on first. The ground ball goes to the second baseman instead of you.',
    steps: [
      { type: 'ball', kind: 'ground', from: 'home', to: '2B', duration: 1150,
        caption: 'Ground ball to the right side, to the second baseman…',
        runners: [
          { id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.4 },
          { id: 'r1', from: 'first', to: 'second', fromT: 0, toT: 0.4 }
        ] },
      { type: 'question',
        prompt: 'The second baseman has the ball and there is a force at second. Where do you go?',
        options: ['Sprint to cover second base', 'Stay where you are — the ball is not near you', 'Run toward first base'],
        answer: 0,
        hint: 'The second baseman has the ball in his glove. Who is left to stand on the bag?',
        explanation: 'When the second baseman fields it, he cannot throw to himself — somebody has to be standing on second. That is you. Sprint over, catch his throw, touch the bag, then throw on to first.' },
      { type: 'move', duration: 500, caption: 'You sprint to the bag…',
        fielders: [{ who: 'SS', to: 'second' }] },
      { type: 'throw', from: '2B', to: 'second', duration: 500,
        caption: 'Flip over to you at second…',
        runners: [
          { id: 'r1', from: 'first', to: 'second', fromT: 0.4, toT: 1 },
          { id: 'batter', from: 'home', to: 'first', fromT: 0.4, toT: 0.7 }
        ] },
      { type: 'pause', ms: 180 },
      { type: 'throw', from: 'second', to: 'first', duration: 600, ballArrivesAt: 0.7,
        caption: '…you touch the bag and throw on to first.',
        fielders: [{ who: '1B', to: 'first' }],
        runners: [{ id: 'batter', from: 'home', to: 'first', fromT: 0.7, toT: 1 }] },
      { type: 'result', title: 'Double play!', text: 'You took the feed, touched second, and finished it at first.',
        coach: 'Whoever does not field the ball covers the bag. If it goes to the second baseman, second base is yours.',
        flash: ['SS', '1B'] }
    ]
  },

  {
    id: 'ss-r1-steal-cover-lhb',
    position: 'SS',
    title: 'Stolen base attempt, left-handed batter',
    situation: { outs: 1, runners: ['first'] },
    description: 'One out, runner on first. A left-handed batter is up, and the runner takes off for second.',
    steps: [
      { type: 'move', duration: 900,
        caption: 'The runner breaks for second and the catcher comes up throwing…',
        fielders: [{ who: 'SS', to: 'second' }],
        runners: [{ id: 'r1', from: 'first', to: 'second', fromT: 0, toT: 0.75 }] },
      { type: 'question',
        prompt: 'A left-handed batter is at the plate. Who covers second base on the steal?',
        options: ['You do — the second baseman stays to guard the right side', 'The second baseman does', 'Whoever gets there first'],
        answer: 0,
        hint: 'A lefty usually hits the ball toward the right side. Who needs to stay over there?',
        explanation: 'With a lefty up, the second baseman has to stay home and guard the right side, so covering second on a steal is your job. It is decided before the pitch is even thrown — you should already know whose bag it is.' },
      { type: 'throw', from: 'C', to: 'second', duration: 550, ballArrivesAt: 0.7,
        caption: 'Strong throw down from the catcher…',
        runners: [{ id: 'r1', from: 'first', to: 'second', fromT: 0.75, toT: 1 }] },
      { type: 'result', title: 'Caught stealing!', text: 'You take the throw and get the tag down just before he slides in.',
        coach: 'Lefty at the plate means the bag is yours. Righty means it is the second baseman’s. Know which one before the pitch.',
        flash: ['SS'] }
    ]
  },

  {
    id: 'ss-r1-bunt-cover-second',
    position: 'SS',
    title: 'Bunt with a runner on first',
    situation: { outs: 0, runners: ['first'] },
    description: 'Nobody out, runner on first. The batter squares around to bunt.',
    steps: [
      { type: 'move', duration: 700,
        caption: 'The batter squares and both corners charge in…',
        fielders: [{ who: '1B', to: 'buntFirst' }, { who: '3B', to: 'buntThird' }] },
      { type: 'question',
        prompt: 'The corners are charging and the runner is going to second. Where do you go?',
        options: ['Cover second base', 'Cover third base', 'Charge in and help field the bunt'],
        answer: 0,
        hint: 'Follow the runner. Which base is he running to?',
        explanation: 'The runner from first is heading to second, so that base needs somebody on it. The second baseman is busy covering first for the charging first baseman, which leaves second to you.' },
      { type: 'move', duration: 550, caption: 'You break for second…',
        fielders: [{ who: 'SS', to: 'second' }, { who: '2B', to: 'first' }] },
      { type: 'ball', kind: 'ground', from: 'home', to: 'buntThird', duration: 800,
        caption: 'Bunt rolls toward third — fielded quickly…',
        runners: [
          { id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.55 },
          { id: 'r1', from: 'first', to: 'second', fromT: 0, toT: 0.6 }
        ] },
      { type: 'throw', from: 'buntThird', to: 'second', duration: 500, ballArrivesAt: 0.7,
        caption: 'He got to it fast — throw to second for the lead runner!',
        runners: [
          { id: 'r1', from: 'first', to: 'second', fromT: 0.6, toT: 1 },
          { id: 'batter', from: 'home', to: 'first', fromT: 0.55, toT: 1 }
        ] },
      { type: 'result', title: 'Force out at second!', text: 'Because you were standing on the bag, the defence got the front runner instead of settling for the batter.',
        coach: 'Cover your base even when you think the throw is going somewhere else. If the bunt is fielded fast, your bag is where the best out is.',
        flash: ['SS', '3B'] }
    ]
  },

  /* ---------------- runner on second ---------------- */

  {
    id: 'ss-r2-look-him-back',
    position: 'SS',
    title: 'Ground ball with a runner on second',
    situation: { outs: 1, runners: ['second'] },
    description: 'One out, runner on second. A ground ball is hit to you, and the runner takes off for third behind your back.',
    steps: [
      { type: 'ball', kind: 'ground', from: 'home', to: 'SS', duration: 1150,
        caption: 'Grounder to short — and the runner breaks for third…',
        runners: [
          { id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.5 },
          { id: 'r2', from: 'second', to: 'third', fromT: 0, toT: 0.35 }
        ] },
      { type: 'pause', ms: 200 },
      { type: 'question',
        prompt: 'The runner is halfway to third. What do you do?',
        options: ['Look him back first, then throw to first', 'Throw to third to try to get him', 'Throw to first without looking'],
        answer: 0,
        hint: 'He does not have to run — there is no force. What makes him stop?',
        explanation: 'Nobody is forcing him to third, so a throw over there is a risky tag play you will usually lose. Turn and look at him — that alone stops most runners — then take the sure out at first.' },
      { type: 'move', duration: 400, caption: 'You turn and stare him down. He stops…',
        runners: [{ id: 'r2', from: 'second', to: 'third', fromT: 0.35, toT: 0 }] },
      { type: 'throw', from: 'SS', to: 'first', duration: 750, ballArrivesAt: 0.7,
        caption: 'Now the throw goes to first…',
        fielders: [{ who: '1B', to: 'first' }],
        runners: [{ id: 'batter', from: 'home', to: 'first', fromT: 0.5, toT: 1 }] },
      { type: 'result', title: 'Out at first, runner stuck', text: 'Two outs, and the runner had to scramble back to second.',
        coach: 'A good long look freezes the runner. Then take the out you know you can get.',
        flash: ['SS', '1B'] }
    ]
  },

  {
    id: 'ss-r2-cover-second-on-cut',
    position: 'SS',
    title: 'Base hit to center, runner on second',
    situation: { outs: 1, runners: ['second'] },
    description: 'One out, runner on second. A base hit goes through to center field and that runner is trying to score.',
    steps: [
      { type: 'ball', kind: 'ground', from: 'home', to: 'shallowCenterField', duration: 1400,
        caption: 'Base hit up the middle into center field…',
        runners: [
          { id: 'r2', from: 'second', to: 'home', fromT: 0, toT: 0.45 },
          { id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.5 }
        ] },
      { type: 'move', duration: 600,
        caption: 'The first baseman goes out to take the cut, and the second baseman covers first…',
        fielders: [{ who: '1B', to: 'cutoff1B' }, { who: '2B', to: 'first' }],
        runners: [
          { id: 'r2', from: 'second', to: 'home', fromT: 0.45, toT: 0.62 },
          { id: 'batter', from: 'home', to: 'first', fromT: 0.5, toT: 0.75 }
        ] },
      { type: 'question',
        prompt: 'The first baseman took the cut and the second baseman took first. Where do you go?',
        options: ['Cover second base', 'Cover third base', 'Run out to take the throw yourself'],
        answer: 0,
        hint: 'Two bases already have somebody. Which one is left, and where might the batter go next?',
        explanation: 'On a ball to center or right the first baseman takes the cut, which pulls the second baseman over to first. That leaves second base for you — and the batter will try for it the moment the throw goes home.' },
      { type: 'move', duration: 500, caption: 'You cover second…',
        fielders: [{ who: 'SS', to: 'second' }],
        runners: [
          { id: 'r2', from: 'second', to: 'home', fromT: 0.62, toT: 0.78 },
          { id: 'batter', from: 'home', to: 'first', fromT: 0.75, toT: 1 }
        ] },
      { type: 'throw', from: 'shallowCenterField', to: 'cutoff1B', duration: 650,
        caption: 'Center fielder throws to the cut man…',
        runners: [{ id: 'r2', from: 'second', to: 'home', fromT: 0.78, toT: 0.9 }] },
      { type: 'throw', from: 'cutoff1B', to: 'home', duration: 550, ballArrivesAt: 0.7,
        caption: '…and he turns and fires home.',
        fielders: [{ who: 'C', to: 'home' }],
        runners: [{ id: 'r2', from: 'second', to: 'home', fromT: 0.9, toT: 1 }] },
      { type: 'result', title: 'Out at the plate!', text: 'The cut man got it home in time, and you had second covered so the batter could not move up.',
        coach: 'Ball to center or right: first baseman cuts, second baseman takes first, you take second.',
        flash: ['1B', 'C', 'SS'] }
    ]
  },

  /* ---------------- runner on third ---------------- */

  {
    id: 'ss-r3-cover-third-on-cut',
    position: 'SS',
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
        fielders: [{ who: '3B', to: 'cutoff3B' }],
        runners: [
          { id: 'r3', from: 'third', to: 'home', fromT: 0.75, toT: 1 },
          { id: 'batter', from: 'home', to: 'first', fromT: 0.5, toT: 0.75 }
        ] },
      { type: 'question',
        prompt: 'The third baseman just left his base to take the cut. Where do you go?',
        options: ['Cover third base', 'Cover second base', 'Run out and back up the throw'],
        answer: 0,
        hint: 'He left a base empty. Which one, and who is closest to it?',
        explanation: 'On a ball to left the third baseman takes the cut, which leaves third base empty. That one is yours — the second baseman has second covered. If the batter tries to take an extra base later, third has to have somebody on it.' },
      { type: 'move', duration: 500, caption: 'You slide over to cover third…',
        fielders: [{ who: 'SS', to: 'third' }, { who: '2B', to: 'second' }],
        runners: [{ id: 'batter', from: 'home', to: 'first', fromT: 0.75, toT: 1 }] },
      { type: 'throw', from: 'shallowLeftField', to: 'cutoff3B', duration: 600,
        caption: 'The left fielder throws to the cut man…' },
      { type: 'throw', from: 'cutoff3B', to: 'home', duration: 500,
        caption: '…and he turns and throws home.',
        fielders: [{ who: 'C', to: 'home' }] },
      { type: 'result', title: 'Run scores, batter holds at first', text: 'The runner beat the throw, but with third covered the batter never thought about going anywhere.',
        coach: 'Ball to left: the third baseman cuts, so third base is yours. Watch who leaves their base — that tells you which one to run to.',
        flash: ['3B', 'SS'] }
    ]
  },

  /* ---------------- runners on first and second ---------------- */

  {
    id: 'ss-r1r2-bunt-cover-third',
    position: 'SS',
    title: 'Bunt with runners on first and second',
    situation: { outs: 0, runners: ['first', 'second'] },
    description: 'Nobody out, runners on first and second. The batter squares around to bunt.',
    steps: [
      { type: 'move', duration: 700,
        caption: 'The batter squares. The corners charge and the pitcher comes off the mound…',
        fielders: [{ who: '1B', to: 'buntFirst' }, { who: '3B', to: 'buntThird' }] },
      { type: 'question',
        prompt: 'The third baseman charged in, and the runner on second is heading for third. Where do you go?',
        options: ['Cover third base', 'Cover second base', 'Charge in to help field the bunt'],
        answer: 0,
        hint: 'This is different from a bunt with only a runner on first. Which base has a runner coming to it AND nobody on it?',
        explanation: 'The third baseman charged, so third is empty — and this time there is a runner on his way there. That is the base that matters. With a runner only on first you would take second, but here the front runner is going to third, so third is yours.' },
      { type: 'move', duration: 550, caption: 'You sprint over to third…',
        fielders: [{ who: 'SS', to: 'third' }, { who: '2B', to: 'first' }] },
      { type: 'ball', kind: 'ground', from: 'home', to: 'buntHome', duration: 800,
        caption: 'Bunt rolls out in front of the plate — the pitcher fields it…',
        fielders: [{ who: 'P', to: 'buntHome' }],
        runners: [
          { id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.5 },
          { id: 'r1', from: 'first', to: 'second', fromT: 0, toT: 0.55 },
          { id: 'r2', from: 'second', to: 'third', fromT: 0, toT: 0.6 }
        ] },
      { type: 'throw', from: 'buntHome', to: 'third', duration: 600, ballArrivesAt: 0.7,
        caption: 'He fielded it fast — throw to third!',
        runners: [
          { id: 'r2', from: 'second', to: 'third', fromT: 0.6, toT: 1 },
          { id: 'r1', from: 'first', to: 'second', fromT: 0.55, toT: 1 },
          { id: 'batter', from: 'home', to: 'first', fromT: 0.5, toT: 1 }
        ] },
      { type: 'result', title: 'Force out at third!', text: 'You were standing on the bag, so the defence got the front runner instead of the easy out at first.',
        coach: 'Runner on first only, you cover second. Runner on second too, you cover third. Follow the front runner.',
        flash: ['SS', 'P'] }
    ]
  },

  {
    id: 'ss-r1r2-infield-fly',
    position: 'SS',
    title: 'Pop-up with runners on first and second',
    situation: { outs: 0, runners: ['first', 'second'] },
    description: 'Nobody out, runners on first and second. The batter pops it straight up over the infield. The umpire yells "Infield fly, batter is out!"',
    steps: [
      { type: 'ball', kind: 'fly', from: 'home', to: [320, 330], duration: 1600,
        caption: 'High pop-up over the infield — the umpire calls infield fly…',
        fielders: [{ who: 'SS', to: [320, 330] }] },
      { type: 'question',
        prompt: 'The umpire called infield fly. What does that mean for you?',
        options: ['The batter is already out — catch it and leave the runners alone', 'You have to catch it or the batter is safe', 'Let it drop so you can get two outs'],
        answer: 0,
        hint: 'The umpire said "batter is out" before anybody caught anything.',
        explanation: 'Infield fly means the batter is out the second the umpire calls it, caught or not. The rule stops the defence from dropping it on purpose to get an easy double play. So just catch it, hold the ball, and let the runners be.' },
      { type: 'result', title: 'Batter is out', text: 'You squeeze it. One out, and both runners stay where they were.',
        coach: 'Infield fly means the batter is out no matter what. Catch it and hold the ball — do not go chasing anybody.',
        flash: ['SS'] }
    ]
  },

  /* ---------------- runners on first and third ---------------- */

  {
    id: 'ss-r1r3-two-outs',
    position: 'SS',
    title: 'Ground ball with two outs, runners on first and third',
    situation: { outs: 2, runners: ['first', 'third'] },
    description: 'Two outs, runners on first and third. A ground ball comes to you.',
    steps: [
      { type: 'ball', kind: 'ground', from: 'home', to: 'SS', duration: 1100,
        caption: 'Ground ball to short…',
        fielders: [{ who: '2B', to: 'second' }],
        runners: [
          { id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.5 },
          { id: 'r1', from: 'first', to: 'second', fromT: 0, toT: 0.5 },
          { id: 'r3', from: 'third', to: 'home', fromT: 0, toT: 0.5 }
        ] },
      { type: 'pause', ms: 200 },
      { type: 'question',
        prompt: 'Two outs already, and the runner from third is racing home. Where is your quickest out?',
        options: ['Throw to second — it is a force and it is much closer than first', 'Make the long throw to first', 'Throw home to stop the run'],
        answer: 0,
        hint: 'You need one out to end the inning. Which base is closest to you?',
        explanation: 'The runner from first has to run, so second base is a force — no tag needed. It is also less than half the distance of the throw to first. With two outs, any out ends the inning and the run does not count.' },
      { type: 'throw', from: 'SS', to: 'second', duration: 450, ballArrivesAt: 0.7,
        caption: 'Short, quick throw to second…',
        runners: [
          { id: 'r1', from: 'first', to: 'second', fromT: 0.5, toT: 1 },
          { id: 'r3', from: 'third', to: 'home', fromT: 0.5, toT: 1 },
          { id: 'batter', from: 'home', to: 'first', fromT: 0.5, toT: 1 }
        ] },
      { type: 'result', title: 'Inning over!', text: 'The force at second is the third out, so the run does not count.',
        coach: 'Two outs means take the easiest out you can find. For a shortstop that is usually second base, not the long throw to first.',
        flash: ['SS', '2B'] }
    ]
  },

  /* ---------------- runners on second and third ---------------- */

  {
    id: 'ss-r2r3-no-force',
    position: 'SS',
    title: 'Ground ball with runners on second and third',
    situation: { outs: 1, runners: ['second', 'third'] },
    description: 'One out, runners on second and third. A ground ball comes right to you.',
    steps: [
      { type: 'ball', kind: 'ground', from: 'home', to: 'SS', duration: 1100,
        caption: 'Grounder to short…',
        runners: [
          { id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.5 },
          { id: 'r2', from: 'second', to: 'third', fromT: 0, toT: 0.25 },
          { id: 'r3', from: 'third', to: 'home', fromT: 0, toT: 0.25 }
        ] },
      { type: 'pause', ms: 200 },
      { type: 'question',
        prompt: 'Neither runner has to run anywhere. What do you do?',
        options: ['Look the runners back, then throw to first', 'Throw to third for the runner there', 'Throw home right away'],
        answer: 0,
        hint: 'Nobody is forced, so every base needs a tag. Which out is actually available?',
        explanation: 'With runners on second and third and nobody forced, there is no easy out anywhere except first base. Freeze them with a look so they do not run, then take the out you can definitely get.' },
      { type: 'move', duration: 350, caption: 'A hard look freezes both runners…',
        runners: [
          { id: 'r2', from: 'second', to: 'third', fromT: 0.25, toT: 0 },
          { id: 'r3', from: 'third', to: 'home', fromT: 0.25, toT: 0 }
        ] },
      { type: 'throw', from: 'SS', to: 'first', duration: 750, ballArrivesAt: 0.7,
        caption: 'Throw across to first…',
        fielders: [{ who: '1B', to: 'first' }],
        runners: [{ id: 'batter', from: 'home', to: 'first', fromT: 0.5, toT: 1 }] },
      { type: 'result', title: 'Out at first', text: 'Two outs, and both runners had to stay where they were.',
        coach: 'When nobody is forced, do not go hunting for a fancy out. Look them back and take first.',
        flash: ['SS', '1B'] }
    ]
  },

  /* ---------------- bases loaded ---------------- */

  {
    id: 'ss-loaded-step-on-second',
    position: 'SS',
    title: 'Ground ball with the bases loaded',
    situation: { outs: 0, runners: ['first', 'second', 'third'] },
    description: 'Nobody out, bases loaded. A ground ball is hit to you, a few steps from second base.',
    steps: [
      { type: 'ball', kind: 'ground', from: 'home', to: 'SS', duration: 1100,
        caption: 'Ground ball to short with the bases full…',
        runners: [
          { id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.4 },
          { id: 'r1', from: 'first', to: 'second', fromT: 0, toT: 0.4 },
          { id: 'r2', from: 'second', to: 'third', fromT: 0, toT: 0.4 },
          { id: 'r3', from: 'third', to: 'home', fromT: 0, toT: 0.4 }
        ] },
      { type: 'pause', ms: 200 },
      { type: 'question',
        prompt: 'Everybody is forced and second base is only a few steps away. What is fastest?',
        options: ['Step on second base yourself, then throw to first', 'Throw home for the force there', 'Make the long throw to first'],
        answer: 0,
        hint: 'You do not always have to throw the ball. Look where your feet already are.',
        explanation: 'Everyone is forced, so any base works — and second is right beside you. Stepping on it yourself is faster than any throw, and it still leaves you time to throw to first for two outs.' },
      { type: 'move', duration: 450, caption: 'Two steps over and you touch the bag yourself…',
        fielders: [{ who: 'SS', to: 'second' }],
        runners: [
          { id: 'r1', from: 'first', to: 'second', fromT: 0.4, toT: 1 },
          { id: 'r2', from: 'second', to: 'third', fromT: 0.4, toT: 1 },
          { id: 'r3', from: 'third', to: 'home', fromT: 0.4, toT: 0.8 },
          { id: 'batter', from: 'home', to: 'first', fromT: 0.4, toT: 0.65 }
        ] },
      { type: 'throw', from: 'second', to: 'first', duration: 650, ballArrivesAt: 0.7,
        caption: '…then the throw to first.',
        fielders: [{ who: '1B', to: 'first' }],
        runners: [
          { id: 'batter', from: 'home', to: 'first', fromT: 0.65, toT: 1 },
          { id: 'r3', from: 'third', to: 'home', fromT: 0.8, toT: 1 }
        ] },
      { type: 'result', title: 'Double play, one run in', text: 'You touched second and threw to first for two outs. The runner from third scored, but two outs was well worth it.',
        coach: 'If a base is right beside you and the runner is forced, step on it. The fastest throw is the one you never have to make.',
        flash: ['SS', '1B'] }
    ]
  }

);
