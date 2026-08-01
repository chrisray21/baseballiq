/* ============================================================
   Baseball IQ — app.js
   Screen flow (position picker <-> play screen) and the scenario
   timeline engine: steps through a scenario's `steps`, driving
   Field for animation and this file for questions/scoring/replay.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------- DOM refs ---------------- */
  const screenSelect   = document.getElementById('screen-select');
  const screenPlay     = document.getElementById('screen-play');
  const positionGrid   = document.getElementById('position-grid');
  const selectNote     = document.getElementById('select-note');

  const scoreBox       = document.getElementById('score');
  const scoreCorrectEl = document.getElementById('score-correct');
  const scoreAskedEl   = document.getElementById('score-asked');
  const btnChangePos   = document.getElementById('btn-change-position');

  const chipPosition   = document.getElementById('chip-position');
  const scenarioTitle  = document.getElementById('scenario-title');
  const chipPaused     = document.getElementById('chip-paused');
  const btnReplayAnim  = document.getElementById('btn-replay-animation');
  const btnReplayLabel = document.getElementById('btn-replay-label');
  const fieldFrame     = document.querySelector('.field-frame');
  const fieldCaption   = document.getElementById('field-caption');

  const sitList        = document.getElementById('sit-list');
  const sitDesc         = document.getElementById('sit-desc');

  const questionCard   = document.getElementById('question-card');
  const questionPrompt = document.getElementById('question-prompt');
  const optionsBox     = document.getElementById('options');
  const feedbackEl     = document.getElementById('feedback');

  const outcomeCard    = document.getElementById('outcome-card');
  const outcomeTitle   = document.getElementById('outcome-title');
  const outcomeText    = document.getElementById('outcome-text');
  const outcomeCoach   = document.getElementById('outcome-coach');

  const panelActions   = document.getElementById('panel-actions');
  const btnNext        = document.getElementById('btn-next');
  const btnTryAgain     = document.getElementById('btn-replay');

  const KEY_LABELS = ['A', 'B', 'C', 'D', 'E'];

  /* ---------------- app state ---------------- */
  const state = {
    list: [],
    index: 0,
    score: { correct: 0, asked: 0 },
    scenario: null,
    steps: [],
    answered: {},        // stepIndex -> { chosen, correct }
    optionOrder: {},     // stepIndex -> display order, as original option indices
    pausedAt: -1,         // index of the step we're currently parked at
    runToken: 0,          // bumped to cancel an in-flight timeline
    animating: false,
    pendingQuestion: null // { stepIndex, render() } for the open question, if any
  };

  function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

  /* Answer options are shuffled for display so the right answer isn't
     always in the same slot. Scenario files can keep listing the correct
     answer first (answer: 0), which is much easier to author and to
     proofread — the shuffle happens here instead.

     The order is fixed once per scenario load and reused by both the
     question screen and the replay, so an option a player already ruled
     out with a wrong guess stays put instead of jumping to a new letter
     mid-question. Replaying the scenario reshuffles, so the answer can't
     be memorised by position. */
  function shuffleOrder(n) {
    const order = Array.from({ length: n }, (_, i) => i);
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = order[i]; order[i] = order[j]; order[j] = t;
    }
    return order;
  }

  function orderFor(step, stepIndex) {
    return state.optionOrder[stepIndex] || step.options.map((_, i) => i);
  }

  /* Offer the replay only when something has actually moved on the field
     before the point we're parked at. A scenario that asks its question
     before the first pitch has nothing to show again. */
  function hasSomethingToReplay(beforeIndex) {
    for (let i = 0; i < beforeIndex; i++) {
      const t = state.steps[i].type;
      if (t === 'ball' || t === 'throw' || t === 'move') return true;
    }
    return false;
  }

  /* ---------------- position picker ---------------- */

  function countFor(code) { return SCENARIOS.filter(s => s.position === code).length; }

  function buildPositionGrid() {
    positionGrid.innerHTML = '';
    POSITIONS.forEach(pos => {
      const n = countFor(pos.code);
      const btn = document.createElement('button');
      btn.className = 'pos-card' + (n === 0 ? ' empty' : '');
      btn.type = 'button';
      btn.innerHTML =
        '<span class="num">' + pos.code + '</span>' +
        '<span class="meta"><strong>' + pos.label + '</strong>' +
        '<small>' + (n === 0 ? 'Coming soon' : n + ' scenario' + (n === 1 ? '' : 's')) + '</small></span>' +
        '<span class="tag">' + (n === 0 ? 'Soon' : 'Ready') + '</span>';
      if (n > 0) btn.addEventListener('click', () => selectPosition(pos.code));
      else btn.disabled = true;
      positionGrid.appendChild(btn);
    });
    const ready = POSITIONS.filter(p => countFor(p.code) > 0).length;
    selectNote.textContent = ready === POSITIONS.length
      ? 'All nine positions are ready. You can switch between them any time.'
      : 'More positions are on the way — start with whichever one shows as Ready.';
  }

  function selectPosition(code) {
    state.list = SCENARIOS.filter(s => s.position === code);
    if (!state.list.length) return;
    state.index = 0;
    state.score = { correct: 0, asked: 0 };
    updateScoreUI();
    screenSelect.hidden = true;
    screenPlay.hidden = false;
    scoreBox.hidden = false;
    btnChangePos.hidden = false;
    loadScenario(state.list[state.index]);
  }

  /* Leaving the play screen has to tear it down properly, not just hide
     it. Two things bite otherwise:
       - the floating "Next scenario" bar is fixed-position, so it keeps
         hanging over the picker with the page still padded for it;
       - the scenario timeline is mid-flight, and without bumping the
         run token it carries on animating behind the picker and can
         re-open the outcome card on its own.
     Used both by the Change position button and by finishing the last
     scenario in a position. */
  function showPositionPicker() {
    state.runToken++;             // cancels any timeline still running
    state.pausedAt = -1;
    state.pendingQuestion = null;
    state.animating = false;

    screenPlay.hidden = true;
    screenSelect.hidden = false;
    scoreBox.hidden = true;
    btnChangePos.hidden = true;

    panelActions.classList.remove('is-floating');
    document.body.classList.remove('has-action-bar');
    questionCard.hidden = true;
    outcomeCard.hidden = true;
    feedbackEl.hidden = true;
    chipPaused.hidden = true;
    btnNext.hidden = true;
    btnTryAgain.hidden = true;
    btnReplayAnim.hidden = true;
    setReplayRunning(false);
    fieldFrame.classList.remove('dimmed');
    fieldCaption.textContent = ' ';

    buildPositionGrid();
  }

  btnChangePos.addEventListener('click', showPositionPicker);

  function updateScoreUI() {
    scoreCorrectEl.textContent = state.score.correct;
    scoreAskedEl.textContent = state.score.asked;
  }

  /* ---------------- situation panel ---------------- */

  function formatRunners(runners) {
    if (!runners || !runners.length) return 'Bases empty';
    if (runners.length === 3) return 'Loaded';
    const names = { first: '1st', second: '2nd', third: '3rd' };
    const order = ['first', 'second', 'third'];
    return order.filter(r => runners.indexOf(r) !== -1).map(r => names[r]).join(' & ');
  }

  function renderSituation(scenario) {
    sitList.innerHTML = '';
    const outsLi = document.createElement('li');
    outsLi.innerHTML = '<span>Outs</span><b>' + scenario.situation.outs + '</b>';
    const runnersLi = document.createElement('li');
    runnersLi.innerHTML = '<span>Runners on</span><b>' + formatRunners(scenario.situation.runners) + '</b>';
    sitList.appendChild(outsLi);
    sitList.appendChild(runnersLi);
    sitDesc.textContent = scenario.description || '';
  }

  /* ---------------- loading / resetting a scenario ---------------- */

  function loadScenario(scenario) {
    state.scenario = scenario;
    state.steps = scenario.steps || [];
    state.answered = {};
    state.optionOrder = {};
    state.steps.forEach((s, i) => {
      if (s.type === 'question' && Array.isArray(s.options)) {
        state.optionOrder[i] = shuffleOrder(s.options.length);
      }
    });
    state.pausedAt = -1;
    state.pendingQuestion = null;
    state.runToken++;

    Field.reset(scenario);
    chipPosition.textContent = scenario.position;
    scenarioTitle.textContent = scenario.title || '';
    renderSituation(scenario);

    questionCard.hidden = true;
    outcomeCard.hidden = true;
    feedbackEl.hidden = true;
    chipPaused.hidden = true;
    btnReplayAnim.hidden = true;
    setReplayRunning(false);  // a replay may have been cut short by this load
    fieldFrame.classList.remove('dimmed');
    panelActions.classList.remove('is-floating');
    document.body.classList.remove('has-action-bar');
    btnNext.hidden = true;
    btnTryAgain.hidden = true;
    fieldCaption.textContent = ' ';

    runTimeline(0, state.runToken);
  }

  /* ---------------- the timeline engine ---------------- */

  async function runTimeline(startIndex, token) {
    for (let i = startIndex; i < state.steps.length; i++) {
      if (token !== state.runToken) return; // superseded by a reload / try-again
      const step = state.steps[i];

      if (step.type === 'question') {
        state.pausedAt = i;
        await showQuestion(step, i, token);
        if (token !== state.runToken) return;
        continue;
      }

      if (step.type === 'result') {
        state.pausedAt = i;
        showResult(step);
        return;
      }

      // animated / dead-time steps
      chipPaused.hidden = true;
      btnReplayAnim.hidden = true;   // nothing to replay while it's still moving
      fieldFrame.classList.remove('dimmed');
      state.animating = true;

      if (step.caption) fieldCaption.textContent = step.caption;

      if (step.type === 'pause') {
        await delay(step.ms != null ? step.ms : 300);
      } else {
        await Field.playStep(step);
      }
      state.animating = false;
      if (token !== state.runToken) return;
    }
  }

  /* ---------------- question step ---------------- */

  function showQuestion(step, stepIndex, token) {
    return new Promise(resolve => {
      chipPaused.hidden = false;
      // Playback is parked here, so the player can rewatch the play as
      // many times as they like before committing to an answer.
      btnReplayAnim.hidden = !hasSomethingToReplay(stepIndex);
      fieldFrame.classList.add('dimmed');
      questionCard.hidden = false;
      questionPrompt.textContent = step.prompt;
      feedbackEl.hidden = true;
      feedbackEl.className = 'feedback';
      optionsBox.innerHTML = '';

      const qState = { wrongIdxs: [], done: false };
      let askedCounted = false;

      /* `origIdx` indexes step.options as authored; `displayIdx` is the
         on-screen slot after shuffling. Correctness and the ruled-out
         list are always tracked by the original index. */
      function render() {
        optionsBox.innerHTML = '';
        orderFor(step, stepIndex).forEach((origIdx, displayIdx) => {
          const b = document.createElement('button');
          b.className = 'option';
          b.type = 'button';
          const isWrongPicked = qState.wrongIdxs.indexOf(origIdx) !== -1;
          if (qState.done) {
            b.disabled = true;
            if (origIdx === step.answer) b.classList.add('correct');
            else if (isWrongPicked) b.classList.add('wrong');
            else b.classList.add('faded');
          } else if (isWrongPicked) {
            b.classList.add('faded');
            b.disabled = true;
          }
          b.innerHTML =
            '<span class="key">' + (KEY_LABELS[displayIdx] || displayIdx + 1) + '</span>' +
            '<span>' + step.options[origIdx] + '</span>';
          if (!b.disabled) b.addEventListener('click', () => onPick(origIdx));
          optionsBox.appendChild(b);
        });
      }

      function finish(correct) {
        qState.done = true;
        render();
        state.pendingQuestion = null;
        resolve();
      }

      function onPick(idx) {
        if (token !== state.runToken) return;
        if (!askedCounted) { state.score.asked++; askedCounted = true; updateScoreUI(); }

        if (idx === step.answer) {
          qState.done = true;
          render();
          feedbackEl.hidden = false;
          feedbackEl.className = 'feedback good';
          feedbackEl.textContent = 'Yes — that’s the right read.';
          state.score.correct++;
          updateScoreUI();
          state.answered[stepIndex] = { chosen: idx, correct: true };
          try {
            const rect = optionsBox.getBoundingClientRect();
            Fireworks.burst(rect.left + rect.width / 2, rect.top);
          } catch (e) { /* fireworks are cosmetic only */ }
          state.pendingQuestion = null;
          setTimeout(resolve, 900);
          return;
        }

        qState.wrongIdxs.push(idx);
        if (qState.wrongIdxs.length < 2) {
          render();
          feedbackEl.hidden = false;
          feedbackEl.className = 'feedback retry';
          feedbackEl.textContent = step.hint || 'Not quite — give it another look.';
        } else {
          qState.done = true;
          render();
          feedbackEl.hidden = false;
          feedbackEl.className = 'feedback reveal';
          feedbackEl.textContent = step.explanation || 'Here’s the right call on this one.';
          state.answered[stepIndex] = { chosen: idx, correct: false };
          state.pendingQuestion = null;
          setTimeout(resolve, 1800);
        }
      }

      state.pendingQuestion = { stepIndex, render };
      render();
    });
  }

  /* ---------------- result step ---------------- */

  function showResult(step) {
    chipPaused.hidden = false;
    fieldFrame.classList.add('dimmed');
    questionCard.hidden = true;
    outcomeCard.hidden = false;
    outcomeTitle.textContent = step.title || 'Play result';
    outcomeText.textContent = step.text || '';
    outcomeCoach.textContent = step.coach || '';
    Field.flashFielders(step.flash);

    const isLast = state.index >= state.list.length - 1;
    btnNext.hidden = false;
    btnNext.textContent = isLast ? 'Back to positions' : 'Next scenario';
    btnTryAgain.hidden = false;

    panelActions.classList.add('is-floating');
    document.body.classList.add('has-action-bar');
    btnReplayAnim.hidden = !hasSomethingToReplay(state.pausedAt);
  }

  btnNext.addEventListener('click', () => {
    if (state.index < state.list.length - 1) {
      state.index++;
      loadScenario(state.list[state.index]);
    } else {
      showPositionPicker();
    }
  });

  btnTryAgain.addEventListener('click', () => {
    loadScenario(state.scenario);
  });

  /* ---------------- replay animation ---------------- */

  function isParked() {
    return state.pausedAt !== -1 && !state.animating;
  }

  /* Kept in one place so every exit path from a replay — including the
     ones that bail out because the scenario was reloaded mid-replay —
     leaves the button usable again instead of stuck on "Replaying…". */
  function setReplayRunning(running) {
    btnReplayAnim.disabled = running;
    btnReplayAnim.classList.toggle('is-running', running);
    btnReplayLabel.textContent = running ? 'Replaying…' : 'Replay animation';
  }

  async function replayAnimation() {
    if (!isParked() || btnReplayAnim.disabled) return;
    const token = state.runToken;
    const target = state.pausedAt;

    setReplayRunning(true);
    try {
      await runReplay(token, target);
    } finally {
      setReplayRunning(false);
    }
  }

  async function runReplay(token, target) {
    const wasQuestionOpen = state.steps[target].type === 'question' && !state.answered[target];
    const wasResult = state.steps[target].type === 'result';

    questionCard.hidden = true;
    outcomeCard.hidden = true;
    chipPaused.hidden = true;
    fieldFrame.classList.remove('dimmed');
    Field.reset(state.scenario);

    for (let i = 0; i < target; i++) {
      if (token !== state.runToken) return;
      const step = state.steps[i];
      if (step.type === 'question') {
        // briefly show how it was already answered, then move on
        const answer = state.answered[i];
        questionPrompt.textContent = step.prompt;
        optionsBox.innerHTML = '';
        orderFor(step, i).forEach((origIdx, displayIdx) => {
          const idx = origIdx, text = step.options[origIdx];
          const b = document.createElement('button');
          b.className = 'option';
          b.disabled = true;
          if (idx === step.answer) b.classList.add('correct');
          else if (answer && idx === answer.chosen) b.classList.add('wrong');
          else b.classList.add('faded');
          b.innerHTML = '<span class="key">' + (KEY_LABELS[displayIdx] || displayIdx + 1) + '</span><span>' + text + '</span>';
          optionsBox.appendChild(b);
        });
        questionCard.hidden = false;
        await delay(450);
        questionCard.hidden = true;
      } else if (step.type === 'pause') {
        await delay(Math.min(step.ms != null ? step.ms : 300, 250));
      } else {
        if (step.caption) fieldCaption.textContent = step.caption;
        await Field.playStep(step);
      }
    }

    if (token !== state.runToken) return;

    if (wasResult) {
      showResult(state.steps[target]);
    } else if (wasQuestionOpen && state.pendingQuestion) {
      // Put the question back exactly as it was: same shuffled order,
      // same options greyed out by an earlier wrong guess, same hint
      // still showing. Replaying costs the player nothing.
      chipPaused.hidden = false;
      btnReplayAnim.hidden = false;
      fieldFrame.classList.add('dimmed');
      questionCard.hidden = false;
      questionPrompt.textContent = state.steps[target].prompt;
      state.pendingQuestion.render();
    }
  }

  btnReplayAnim.addEventListener('click', replayAnimation);

  /* ---------------- keyboard shortcuts ---------------- */

  document.addEventListener('keydown', e => {
    const key = e.key.toLowerCase();
    if (!questionCard.hidden && state.pendingQuestion) {
      const map = { a: 0, b: 1, c: 2, d: 3, '1': 0, '2': 1, '3': 2, '4': 3 };
      if (key in map) {
        const idx = map[key];
        const btn = optionsBox.children[idx];
        if (btn && !btn.disabled) btn.click();
      }
    }
    if (key === 'r' && !btnReplayAnim.hidden && !btnReplayAnim.disabled) {
      replayAnimation();
    }
  });

  /* ---------------- boot ---------------- */

  Field.init();
  buildPositionGrid();
});
