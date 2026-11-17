/* ============================================================
   Baseball IQ — scenarios-p.js
   Pitcher scenarios, grouped by base situation.

   The pitcher is the only position whose main job starts AFTER he
   stops pitching. Almost every scenario here is one of four things:
     - cover a base somebody else had to leave (first, or home)
     - field a ball hit back at him and pick the right base
     - back up a throw so a bad one does not cost an extra base
     - keep a runner honest before the pitch

   The one people get wrong: the pitcher covers first ONLY when the
   ball pulls the first baseman off the bag. On a comebacker the first
   baseman never moved, so the pitcher just throws to him.
   ============================================================ */

SCENARIOS.push(

  /* ---------------- bases empty ---------------- */

  {
    id: 'p-empty-cover-first',
    position: 'P',
    title: 'Ground ball to the right side',
    situation: { outs: 1, runners: [] },
    description: 'One out, nobody on. A ground ball is hit toward the hole between first and second, and the first baseman has to range way off the bag to get it.',
    steps: [
      { type: 'ball', kind: 'ground', from: 'home', to: 'rightSideHole', duration: 1200,
        caption: 'Ground ball to the right side — the first baseman ranges over…',
        fielders: [{ who: '1B', to: 'rightSideHole' }],
        runners: [{ id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.45 }] },
      { type: 'question',
        prompt: 'The first baseman is way off the bag with the ball. What do you do?',
        options: ['Sprint over to cover first base', 'Stay on the mound and watch', 'Run toward the ball to help him field it'],
        answer: 0,
        hint: 'He has the ball but he is nowhere near the base. Who is left to stand on it?',
        explanation: 'This is the pitcher play. When the ball pulls the first baseman off the bag, there is nobody on first — so you run over and take the throw. Break for the bag the moment you see the ball go to the right side.' },
      { type: 'move', duration: 700, caption: 'You break hard for first base…',
        fielders: [{ who: 'P', to: 'first' }],
        runners: [{ id: 'batter', from: 'home', to: 'first', fromT: 0.45, toT: 0.75 }] },
      { type: 'throw', from: 'rightSideHole', to: 'first', duration: 550, ballArrivesAt: 0.7,
        caption: 'He flips it over to you at the bag…',
        runners: [{ id: 'batter', from: 'home', to: 'first', fromT: 0.75, toT: 1 }] },
      { type: 'result', title: 'Out at first', text: 'You beat the runner to the bag and took the throw.',
        coach: 'Ball to the right side, you cover first. Do not wait to see if he needs you — just go every time.',
        flash: ['P', '1B'] }
    ]
  },

  {
    id: 'p-empty-comebacker',
    position: 'P',
    title: 'Comebacker to the mound',
    situation: { outs: 1, runners: [] },
    description: 'One out, nobody on. The batter hits it right back at you.',
    steps: [
      { type: 'ball', kind: 'line', from: 'home', to: 'mound', duration: 700,
        caption: 'Hit hard, right back at you…',
        runners: [{ id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.5 }] },
      { type: 'pause', ms: 250 },
      { type: 'question',
        prompt: 'You knock it down and pick it up. The first baseman is standing on the bag. What now?',
        options: ['Throw it to him at first base', 'Run the ball over to first base yourself', 'Hold on to it'],
        answer: 0,
        hint: 'Did the first baseman have to leave the bag on this one?',
        explanation: 'The ball came to you, so the first baseman never moved — he is already standing on the base waiting. Just throw it to him. You only run over to cover first when the ball pulls him off the bag.' },
      { type: 'throw', from: 'mound', to: 'first', duration: 550, ballArrivesAt: 0.7,
        caption: 'Easy throw over to first…',
        fielders: [{ who: '1B', to: 'first' }],
        runners: [{ id: 'batter', from: 'home', to: 'first', fromT: 0.5, toT: 1 }] },
      { type: 'result', title: 'Out at first', text: 'Simple play — field it, throw it, done.',
        coach: 'Ball to you means throw to first. Ball to the right side means run and cover first. Two different plays, so know which one you are in.',
        flash: ['P', '1B'] }
    ]
  },

  {
    id: 'p-empty-popup',
    position: 'P',
    title: 'Pop-up over the infield',
    situation: { outs: 0, runners: [] },
    description: 'Nobody out, nobody on. The batter pops it straight up, and it hangs in the air right over the infield near you.',
    steps: [
      { type: 'ball', kind: 'fly', from: 'home', to: [432, 432], duration: 1600,
        caption: 'High pop-up hanging over the infield…',
        fielders: [{ who: '1B', to: [432, 432] }] },
      { type: 'question',
        prompt: 'It is coming down near the mound and the first baseman is calling for it. What do you do?',
        options: ['Get out of the way and let him catch it', 'Call him off and catch it yourself', 'Stand still and hope it lands somewhere safe'],
        answer: 0,
        hint: 'Who has spent more practice time catching pop flies — you, or an infielder?',
        explanation: 'Pop-ups belong to the infielders. They get more practice at it, they can see it better, and you are standing in a hole on a mound. Point at it, call his name, and get out of his way.' },
      { type: 'move', duration: 400, caption: 'You duck away and give him room…',
        fielders: [{ who: 'P', to: [370, 490] }] },
      { type: 'result', title: 'First baseman makes the catch', text: 'One out, and nobody collided with anybody.',
        coach: 'A pitcher catching a pop-up is a pitcher looking for trouble. Let the infielders have it.',
        flash: ['1B'] }
    ]
  },

  /* ---------------- runner on first ---------------- */

  {
    id: 'p-r1-comebacker-double-play',
    position: 'P',
    title: 'Comebacker with a runner on first',
    situation: { outs: 0, runners: ['first'] },
    description: 'Nobody out, runner on first. The batter hits a ground ball straight back to you.',
    steps: [
      { type: 'ball', kind: 'ground', from: 'home', to: 'mound', duration: 900,
        caption: 'Ground ball right back to the mound…',
        fielders: [{ who: 'SS', to: 'second' }],
        runners: [
          { id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.35 },
          { id: 'r1', from: 'first', to: 'second', fromT: 0, toT: 0.4 }
        ] },
      { type: 'pause', ms: 200 },
      { type: 'question',
        prompt: 'You have the ball and the shortstop is covering second. Where does it go first?',
        options: ['Throw to second base to start the double play', 'Throw to first for the easy out', 'Run at the runner to chase him back'],
        answer: 0,
        hint: 'The runner from first has to run. That makes one base easier than the others.',
        explanation: 'The runner on first is forced, so second base is the out you can get without a tag — and getting it first keeps the double play alive. Throwing to first instead gives up the second out.' },
      { type: 'throw', from: 'mound', to: 'second', duration: 500, ballArrivesAt: 0.7,
        caption: 'Turn and throw to second…',
        runners: [
          { id: 'r1', from: 'first', to: 'second', fromT: 0.4, toT: 1 },
          { id: 'batter', from: 'home', to: 'first', fromT: 0.35, toT: 0.7 }
        ] },
      { type: 'pause', ms: 180 },
      { type: 'throw', from: 'second', to: 'first', duration: 600, ballArrivesAt: 0.7,
        caption: '…and the shortstop fires on to first.',
        fielders: [{ who: '1B', to: 'first' }],
        runners: [{ id: 'batter', from: 'home', to: 'first', fromT: 0.7, toT: 1 }] },
      { type: 'result', title: 'Double play!', text: 'Two outs on a ball you fielded yourself.',
        coach: 'A comebacker with a runner on first is your best chance at two outs. Turn and go to second first.',
        flash: ['P', 'SS', '1B'] }
    ]
  },

  {
    id: 'p-r1-bunt-throw-first',
    position: 'P',
    title: 'Bunt with a runner on first',
    situation: { outs: 0, runners: ['first'] },
    description: 'Nobody out, runner on first. The batter squares around and lays down a bunt in front of the plate.',
    steps: [
      { type: 'ball', kind: 'ground', from: 'home', to: 'buntHome', duration: 900,
        caption: 'Bunt rolls out in front of the plate — you charge off the mound…',
        fielders: [{ who: 'P', to: 'buntHome' }, { who: '2B', to: 'first' }, { who: 'SS', to: 'second' }],
        runners: [
          { id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.5 },
          { id: 'r1', from: 'first', to: 'second', fromT: 0, toT: 0.75 }
        ] },
      { type: 'question',
        prompt: 'You get to it, but the runner from first is already almost to second. Where do you throw?',
        options: ['To first base for the out you can definitely get', 'To second base to try for the front runner', 'Hold the ball and let everybody be safe'],
        answer: 0,
        hint: 'Look at how far each runner still has to go before you decide.',
        explanation: 'The runner from first got a head start the moment the batter squared, so he is nearly there. The batter is the one still a long way from his base, so first is the out that is actually available. Take the sure one.' },
      { type: 'throw', from: 'buntHome', to: 'first', duration: 550, ballArrivesAt: 0.7,
        caption: 'Quick throw over to first…',
        runners: [
          { id: 'batter', from: 'home', to: 'first', fromT: 0.5, toT: 1 },
          { id: 'r1', from: 'first', to: 'second', fromT: 0.75, toT: 1 }
        ] },
      { type: 'result', title: 'Out at first', text: 'One out. The runner moved up to second, which is what the other team wanted — but you got the out you could get.',
        coach: 'On a bunt, look before you throw. If the front runner already has a head start, take the sure out instead of chasing him.',
        flash: ['P', '2B'] }
    ]
  },

  {
    id: 'p-r1-hold-the-runner',
    position: 'P',
    title: 'Runner on first taking a big lead',
    situation: { outs: 1, runners: ['first'] },
    description: 'One out, runner on first. Before you have even started your motion, he is walking off the base and taking a huge lead.',
    steps: [
      { type: 'move', duration: 900,
        caption: 'The runner strolls off first, further and further…',
        runners: [{ id: 'r1', from: 'first', to: 'second', fromT: 0, toT: 0.22 }] },
      { type: 'question',
        prompt: 'He is a long way off the base and not paying much attention to you. What do you do?',
        options: ['Step off and throw over to first to push him back', 'Ignore him and pitch — he is the catcher’s problem', 'Stare at him for a while and then pitch anyway'],
        answer: 0,
        hint: 'If you never throw over, what stops him from leading off even further next pitch?',
        explanation: 'A runner who is never checked will keep taking more, and a bigger lead means an easier steal. Stepping off and throwing over does not have to get him out — it just has to make him respect you and shorten up.' },
      { type: 'throw', from: 'mound', to: 'first', duration: 450,
        caption: 'You step off and throw over…',
        fielders: [{ who: '1B', to: 'first' }],
        runners: [{ id: 'r1', from: 'first', to: 'second', fromT: 0.22, toT: 0 }] },
      { type: 'result', title: 'Runner dives back', text: 'Safe, but he takes a much smaller lead the rest of the inning.',
        coach: 'You do not have to pick him off. You just have to make him think you might.',
        flash: ['P', '1B'] }
    ]
  },

  /* ---------------- runner on second ---------------- */

  {
    id: 'p-r2-back-up-home',
    position: 'P',
    title: 'Base hit with a runner on second',
    situation: { outs: 1, runners: ['second'] },
    description: 'One out, runner on second. A base hit drops into right field and that runner takes off for home.',
    steps: [
      { type: 'ball', kind: 'ground', from: 'home', to: 'shallowRightField', duration: 1400,
        caption: 'Base hit into right field — the runner is going for home…',
        fielders: [{ who: '1B', to: 'cutoff1B' }, { who: '2B', to: 'first' }],
        runners: [
          { id: 'r2', from: 'second', to: 'home', fromT: 0, toT: 0.5 },
          { id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.6 }
        ] },
      { type: 'question',
        prompt: 'The throw is going to come home. You are not fielding anything. Where do you go?',
        options: ['Get behind home plate to back up the throw', 'Run toward the ball in right field', 'Stay on the mound out of the way'],
        answer: 0,
        hint: 'What happens if that long throw gets past the catcher and nobody is behind him?',
        explanation: 'Long throws get away sometimes. If the throw home gets past the catcher and you are not behind him, every runner moves up a base for free. Sprint behind the plate and line yourself up with the throw.' },
      { type: 'move', duration: 700, caption: 'You sprint behind the plate…',
        fielders: [{ who: 'P', to: 'backupHome' }],
        runners: [
          { id: 'r2', from: 'second', to: 'home', fromT: 0.5, toT: 0.85 },
          { id: 'batter', from: 'home', to: 'first', fromT: 0.6, toT: 1 }
        ] },
      { type: 'throw', from: 'shallowRightField', to: 'cutoff1B', duration: 600,
        caption: 'Right fielder throws to the cut man…',
        runners: [{ id: 'r2', from: 'second', to: 'home', fromT: 0.85, toT: 1 }] },
      { type: 'throw', from: 'cutoff1B', to: 'backupHome', duration: 600,
        caption: '…the throw home skips past the catcher — but you are there.',
        fielders: [{ who: 'C', to: 'home' }] },
      { type: 'result', title: 'Run scores, but nobody else moves', text: 'The throw got past the catcher. Because you were behind the plate, the batter had to stop at first instead of taking second.',
        coach: 'Every throw coming home, you get behind the plate. You will not touch most of them — but the one you do saves a base.',
        flash: ['P'] }
    ]
  },

  {
    id: 'p-r2-comebacker-look-back',
    position: 'P',
    title: 'Comebacker with a runner on second',
    situation: { outs: 1, runners: ['second'] },
    description: 'One out, runner on second. A ground ball comes back to you, and the runner breaks for third.',
    steps: [
      { type: 'ball', kind: 'ground', from: 'home', to: 'mound', duration: 900,
        caption: 'Ground ball back to the mound — and the runner takes off…',
        runners: [
          { id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.4 },
          { id: 'r2', from: 'second', to: 'third', fromT: 0, toT: 0.35 }
        ] },
      { type: 'pause', ms: 200 },
      { type: 'question',
        prompt: 'The runner is partway to third. What do you do?',
        options: ['Look him back first, then throw to first', 'Throw to third to try to get him', 'Throw to first straight away without looking'],
        answer: 0,
        hint: 'Nobody is forcing him to run. What is the easiest way to make him stop?',
        explanation: 'He is not forced, so third base is a tag play you will usually lose. Turn and look right at him — that stops most runners cold — then take the out you know you can get at first.' },
      { type: 'move', duration: 400, caption: 'You turn and look him back. He stops…',
        runners: [{ id: 'r2', from: 'second', to: 'third', fromT: 0.35, toT: 0 }] },
      { type: 'throw', from: 'mound', to: 'first', duration: 550, ballArrivesAt: 0.7,
        caption: 'Now the throw goes to first…',
        fielders: [{ who: '1B', to: 'first' }],
        runners: [{ id: 'batter', from: 'home', to: 'first', fromT: 0.4, toT: 1 }] },
      { type: 'result', title: 'Out at first, runner back at second', text: 'Two outs, and your look sent the runner scrambling back.',
        coach: 'Look first, throw second. A runner who is not forced will stop as soon as he sees you looking at him.',
        flash: ['P', '1B'] }
    ]
  },

  /* ---------------- runner on third ---------------- */

  {
    id: 'p-r3-cover-home',
    position: 'P',
    title: 'Ball gets past the catcher, runner on third',
    situation: { outs: 1, runners: ['third'] },
    description: 'One out, runner on third. Your pitch bounces in the dirt and skips past the catcher toward the backstop.',
    steps: [
      { type: 'ball', kind: 'pitch', from: 'home', to: 'backupHome', duration: 800,
        caption: 'The ball skips past the catcher toward the screen…',
        fielders: [{ who: 'C', to: 'backupHome' }],
        runners: [{ id: 'r3', from: 'third', to: 'home', fromT: 0, toT: 0.35 }] },
      { type: 'question',
        prompt: 'The catcher is chasing the ball to the backstop and the runner is breaking for home. What do you do?',
        options: ['Sprint to cover home plate', 'Chase after the ball to help the catcher', 'Stay on the mound and wait'],
        answer: 0,
        hint: 'The catcher has the ball covered. Who is standing on home plate right now?',
        explanation: 'The catcher has left home plate to go get the ball, so there is nobody there to make the tag. That is your job — sprint down and straddle the plate so he has somewhere to throw.' },
      { type: 'move', duration: 600, caption: 'You sprint down to cover the plate…',
        fielders: [{ who: 'P', to: 'home' }],
        runners: [{ id: 'r3', from: 'third', to: 'home', fromT: 0.35, toT: 0.7 }] },
      { type: 'throw', from: 'backupHome', to: 'home', duration: 450, ballArrivesAt: 0.65,
        caption: 'The catcher throws it back to you at the plate…',
        runners: [{ id: 'r3', from: 'third', to: 'home', fromT: 0.7, toT: 1 }] },
      { type: 'result', title: 'Out at the plate!', text: 'You had the ball waiting and put the tag on him.',
        coach: 'Any time the catcher leaves the plate, home is yours. Do not stand and watch — run.',
        flash: ['P'] }
    ]
  },

  {
    id: 'p-r3-bunt-throw-home',
    position: 'P',
    title: 'Bunt with a runner on third',
    situation: { outs: 1, runners: ['third'] },
    description: 'One out, runner on third. The batter drops a bunt down and the runner breaks for home the moment the ball hits the ground.',
    steps: [
      { type: 'ball', kind: 'ground', from: 'home', to: 'buntHome', duration: 700,
        caption: 'Bunt right in front of the plate — you are on it fast…',
        fielders: [{ who: 'P', to: 'buntHome' }, { who: 'C', to: 'home' }],
        runners: [
          { id: 'r3', from: 'third', to: 'home', fromT: 0, toT: 0.45 },
          { id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.35 }
        ] },
      { type: 'question',
        prompt: 'You got to the ball quickly and the runner is still a few steps from home. Where do you throw?',
        options: ['Home to the catcher to stop the run', 'First base for the sure out', 'Third base behind the runner'],
        answer: 0,
        hint: 'You got there fast. Which throw stops a run instead of just getting an out?',
        explanation: 'You beat the runner to the ball, so the play at home is there. The catcher has to tag him — nobody is forced with only a runner on third — but a run is worth more than an out. When you get to a bunt this fast, look home first.' },
      { type: 'throw', from: 'buntHome', to: 'home', duration: 400, ballArrivesAt: 0.6,
        caption: 'Quick flip home to the catcher…',
        runners: [
          { id: 'r3', from: 'third', to: 'home', fromT: 0.45, toT: 1 },
          { id: 'batter', from: 'home', to: 'first', fromT: 0.35, toT: 1 }
        ] },
      { type: 'result', title: 'Out at the plate!', text: 'The catcher tagged him before he reached the plate. The run does not score.',
        coach: 'Get to the bunt fast and you get a choice. Slow to the ball and your only choice is first base.',
        flash: ['P', 'C'] }
    ]
  },

  /* ---------------- runners on first and second ---------------- */

  {
    id: 'p-r1r2-bunt-throw-third',
    position: 'P',
    title: 'Bunt with runners on first and second',
    situation: { outs: 0, runners: ['first', 'second'] },
    description: 'Nobody out, runners on first and second. The batter squares to bunt, and the shortstop breaks over to cover third.',
    steps: [
      { type: 'ball', kind: 'ground', from: 'home', to: 'buntHome', duration: 800,
        caption: 'Bunt in front of the plate — you charge and field it…',
        fielders: [{ who: 'P', to: 'buntHome' }, { who: 'SS', to: 'third' }, { who: '2B', to: 'first' }],
        runners: [
          { id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.4 },
          { id: 'r1', from: 'first', to: 'second', fromT: 0, toT: 0.45 },
          { id: 'r2', from: 'second', to: 'third', fromT: 0, toT: 0.5 }
        ] },
      { type: 'question',
        prompt: 'You got to it quickly and the shortstop is standing on third. Where do you throw?',
        options: ['Third base for the force on the front runner', 'First base for the easy out', 'Second base'],
        answer: 0,
        hint: 'With runners on first and second, every runner has to run. Which base gets the runner who is furthest along?',
        explanation: 'Everybody is forced, so third base is a force out — no tag needed. Getting the front runner is worth much more than getting the batter, and you only get that choice because you fielded it fast and the shortstop covered.' },
      { type: 'throw', from: 'buntHome', to: 'third', duration: 600, ballArrivesAt: 0.7,
        caption: 'Turn and throw to third…',
        runners: [
          { id: 'r2', from: 'second', to: 'third', fromT: 0.5, toT: 1 },
          { id: 'r1', from: 'first', to: 'second', fromT: 0.45, toT: 1 },
          { id: 'batter', from: 'home', to: 'first', fromT: 0.4, toT: 1 }
        ] },
      { type: 'result', title: 'Force out at third!', text: 'The front runner is out, and the other two only moved up one base.',
        coach: 'On a bunt, the best out is the furthest one you can actually get. Field it fast, look at third first.',
        flash: ['P', 'SS'] }
    ]
  },

  /* ---------------- runners on first and third ---------------- */

  {
    id: 'p-r1r3-two-outs',
    position: 'P',
    title: 'Comebacker with two outs',
    situation: { outs: 2, runners: ['first', 'third'] },
    description: 'Two outs, runners on first and third. A ground ball comes back to you and the runner from third takes off for home.',
    steps: [
      { type: 'ball', kind: 'ground', from: 'home', to: 'mound', duration: 900,
        caption: 'Ground ball back to the mound — the runner on third is going…',
        runners: [
          { id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.45 },
          { id: 'r1', from: 'first', to: 'second', fromT: 0, toT: 0.45 },
          { id: 'r3', from: 'third', to: 'home', fromT: 0, toT: 0.5 }
        ] },
      { type: 'pause', ms: 200 },
      { type: 'question',
        prompt: 'Two outs already. Where do you throw?',
        options: ['First base — one out ends the inning', 'Home, to chase down the runner', 'Third base behind the runner'],
        answer: 0,
        hint: 'How many outs do you need to get off the field, and which one is easiest?',
        explanation: 'With two outs you only need one more, and first base is the closest, simplest throw you have. If you get it before the runner reaches home, the run does not count at all.' },
      { type: 'throw', from: 'mound', to: 'first', duration: 500, ballArrivesAt: 0.65,
        caption: 'Simple throw over to first…',
        fielders: [{ who: '1B', to: 'first' }],
        runners: [
          { id: 'batter', from: 'home', to: 'first', fromT: 0.45, toT: 1 },
          { id: 'r1', from: 'first', to: 'second', fromT: 0.45, toT: 1 },
          { id: 'r3', from: 'third', to: 'home', fromT: 0.5, toT: 1 }
        ] },
      { type: 'result', title: 'Inning over!', text: 'The out at first beat the runner home, so no run counts.',
        coach: 'Two outs makes it easy: take the closest out you have and get off the field.',
        flash: ['P', '1B'] }
    ]
  },

  /* ---------------- bases loaded ---------------- */

  {
    id: 'p-loaded-comebacker-home',
    position: 'P',
    title: 'Comebacker with the bases loaded',
    situation: { outs: 0, runners: ['first', 'second', 'third'] },
    description: 'Nobody out, bases loaded. The batter hits a ground ball right back to you.',
    steps: [
      { type: 'ball', kind: 'ground', from: 'home', to: 'mound', duration: 900,
        caption: 'Ground ball back to the mound with the bases full…',
        fielders: [{ who: 'C', to: 'home' }],
        runners: [
          { id: 'batter', from: 'home', to: 'first', fromT: 0, toT: 0.35 },
          { id: 'r1', from: 'first', to: 'second', fromT: 0, toT: 0.4 },
          { id: 'r2', from: 'second', to: 'third', fromT: 0, toT: 0.4 },
          { id: 'r3', from: 'third', to: 'home', fromT: 0, toT: 0.4 }
        ] },
      { type: 'pause', ms: 200 },
      { type: 'question',
        prompt: 'The runner from third is heading home. Where do you throw?',
        options: ['Home to the catcher — with the bases loaded that is a force out', 'First base for the sure out', 'Second base to start a double play'],
        answer: 0,
        hint: 'Bases loaded means the runner on third has to run. What does that make home plate?',
        explanation: 'Because every base is occupied, the runner on third is forced — so home plate is a force out and the catcher only has to touch the plate. You are close to home and nobody out, so stopping the run is the best play here.' },
      { type: 'throw', from: 'mound', to: 'home', duration: 450, ballArrivesAt: 0.6,
        caption: 'Quick throw home to the catcher standing on the plate…',
        runners: [
          { id: 'r3', from: 'third', to: 'home', fromT: 0.4, toT: 1 },
          { id: 'r2', from: 'second', to: 'third', fromT: 0.4, toT: 1 },
          { id: 'r1', from: 'first', to: 'second', fromT: 0.4, toT: 1 },
          { id: 'batter', from: 'home', to: 'first', fromT: 0.35, toT: 1 }
        ] },
      { type: 'result', title: 'Force out at home!', text: 'The catcher stepped on the plate before the runner arrived. No run scores, and the bases are still loaded.',
        coach: 'Bases loaded turns home into just another force base. Throw home and stop the run instead of trading it for an out.',
        flash: ['P', 'C'] }
    ]
  }

);
