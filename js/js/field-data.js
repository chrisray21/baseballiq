/* ============================================================
   Baseball IQ — field-data.js
   Shared spatial + roster data. Loaded first; everything else
   (scenario files, field.js, app.js) reads these globals.
   Coordinates are in the 800x700 SVG viewBox drawn in index.html.
   ============================================================ */

/* ---- Named spots on the field ----
   Bases + a handful of common "go-to" throwing/coverage spots that
   scenario files can reference by name instead of raw coordinates. */
const SPOTS = {
  home:          [400, 620],
  mound:         [400, 473],
  first:         [555, 465],
  second:        [400, 310],
  third:         [245, 465],

  // shallow / cutoff / relay spots infielders and outfielders break to
  cutoffHome:    [400, 545],
  // Where the cut man sets up on a play at the plate. 1B takes the cut
  // on balls to centre and right; 3B takes it on balls to left. Both
  // sit on the line between the outfielder and home plate.
  cutoff1B:      [462, 466],
  cutoff3B:      [338, 466],
  cutoffFirst:   [470, 400],
  cutoffThird:   [330, 400],
  relayRight:    [470, 260],
  relayLeft:     [330, 260],
  relayCenter:   [400, 220],
  shallowRight:  [480, 400],
  shallowLeft:   [320, 400],
  // outfielders playing a shallow / "no-doubles" depth — these sit
  // just past the infield dirt, same as shortCenterField below.
  shortRightField: [520, 260],
  shortLeftField:  [280, 260],
  shortCenterField:[400, 240],

  // true shallow-outfield-grass spots (outside the infield dirt, r=215
  // from [400,470]) — use these for balls that should visibly land
  // past the infield, not the "short" spots above which sit just
  // inside the dirt for infielders playing back at DP depth.
  shallowRightField: [555, 235],
  shallowLeftField:  [245, 235],
  shallowCenterField:[400, 200],

  // bunt coverage. The first- and third-base lines ARE the foul lines,
  // so a bunt "down the line" has to be nudged into fair territory or
  // it renders sitting on the chalk and reads as foul.
  buntFirst:     [420, 538],
  buntThird:     [380, 538],
  buntHome:      [400, 560],

  // ---- extra-range grounder spots ----
  // NAMING RULE: "right" and "left" here always mean the FIELDER'S OWN
  // right and left as he stands facing home plate — never screen
  // direction. Facing home, a second baseman's right is toward SECOND
  // BASE (up the middle) and his left is toward FIRST BASE; a shortstop
  // is the mirror image (right = toward third, left = toward second).
  // Naming these by screen direction is what put an earlier "ground ball
  // in the hole" scenario on the wrong side of the diamond, so keep the
  // fielder's-eye convention and run tools/validate-scenarios.js.
  backhand2B:    [412, 342],  // 2B ranging to HIS RIGHT, deep up the middle
  hole34:        [515, 408],  // 2B ranging to HIS LEFT, the 3-4 hole by first
  // The ball that pulls the first baseman off the bag toward second,
  // which is the one play where the PITCHER covers first.
  rightSideHole: [478, 398],
  backhandSS:    [288, 405],  // SS ranging to HIS RIGHT, the 5-6 hole by third
  // Down the third base line — the 3B's RIGHT. Note this is a different
  // spot from backhandSS: the same patch of dirt is the shortstop's
  // right but the third baseman's left, since they face home from
  // different angles. It hugs the line on purpose, so the validator
  // warns about the foul-line margin; that warning is expected here.
  downTheLine3B: [268, 468],
  upMiddle:      [396, 346],  // straight up the middle, either middle infielder
  slowRoller2B:  [430, 430],
  slowRollerSS:  [370, 430],
  rightCenterGap:[560, 150],
  leftCenterGap: [240, 150],

  // foul territory — for foul pop-ups (use kind: 'foul')
  foulBehindPlate: [400, 668],
  foulNearFirst:   [572, 552],
  foulNearThird:   [228, 552],

  // backing-up spots
  // backupMound sits BEHIND the pitcher from the hitter's point of view
  // (between the mound and second base) — a comebacker that deflects or
  // handcuffs the pitcher carries on up the middle, so that is where a
  // middle infielder converges to keep the play alive.
  backupMound:   [420, 425],
  backupHome:    [400, 660],
  backupFirst:   [575, 500],
  backupSecond:  [400, 260],
  backupThird:   [225, 500]
};

/* ---- The nine positions ----
   `home` is each fielder's starting spot for a fresh scenario;
   field.js resets fielders here between plays / on replay. */
const POSITIONS = [
  { code: 'P',  label: 'Pitcher',      short: 'Pitcher',      home: [400, 473] },
  { code: 'C',  label: 'Catcher',      short: 'Catcher',      home: [400, 655] },
  { code: '1B', label: 'First Base',   short: 'First base',   home: [500, 430] },
  { code: '2B', label: 'Second Base',  short: 'Second base',  home: [460, 360] },
  { code: 'SS', label: 'Shortstop',    short: 'Shortstop',    home: [335, 360] },
  { code: '3B', label: 'Third Base',   short: 'Third base',   home: [300, 430] },
  { code: 'LF', label: 'Left Field',   short: 'Left field',   home: [160, 200] },
  { code: 'CF', label: 'Center Field', short: 'Center field', home: [400, 110] },
  { code: 'RF', label: 'Right Field',  short: 'Right field',  home: [640, 200] }
];

/* ---- Scenario registry ----
   Each js/scenarios-<position>.js pushes its own scenario objects
   in here. Positions with zero entries show "Coming soon". */
const SCENARIOS = [];
