// CipherVault Application Logic


// A curated list of 200 memorable, clean, easy-to-spell English words for Passphrase Mode
const WORDLIST = [
  "actor", "agent", "amber", "angel", "anvil", "apple", "armor", "arrow", "aspect", "atlas",
  "bacon", "badge", "baker", "basin", "beach", "beacon", "beast", "beauty", "bench", "bison",
  "blade", "blaze", "board", "cabin", "camel", "canal", "canvas", "canyon", "cargo", "castle",
  "cedar", "chain", "chaos", "charm", "chart", "chief", "cliff", "clover", "coast", "copper",
  "cosmos", "crater", "crown", "crystal", "dancer", "dawn", "desert", "detail", "device", "dial",
  "diamond", "diner", "doctor", "dolphin", "dragon", "drama", "dream", "dune", "eagle", "earth",
  "echo", "ellipse", "ember", "engine", "enigma", "epoch", "exile", "expert", "factor", "falcon",
  "fancy", "fiber", "field", "flame", "flavor", "flight", "flower", "flute", "focus", "forest",
  "fossil", "frost", "fruit", "galaxy", "garden", "garlic", "gate", "genius", "giant", "glacier",
  "glide", "globe", "glory", "glove", "grace", "granite", "gravity", "guitar", "harbor", "haven",
  "hazard", "heart", "helmet", "hermit", "hero", "hiking", "honey", "hope", "horizon", "hunter",
  "hybrid", "icon", "image", "impact", "index", "infant", "irony", "island", "ivory", "jacket",
  "jaguar", "jasper", "jester", "jungle", "junior", "karma", "kernel", "keyboard", "knight", "laser",
  "launch", "lava", "legacy", "legend", "lemon", "leopard", "level", "limit", "lion", "lizard",
  "logic", "lunar", "luxury", "magnet", "maple", "marble", "matrix", "meadow", "melody", "merit",
  "meteor", "mirror", "monkey", "monster", "mortar", "mosaic", "mountain", "nebula", "nectar", "needle",
  "neon", "nest", "neutron", "nomad", "novel", "oasis", "ocean", "olive", "onyx", "opal",
  "orbit", "orchid", "organ", "outlet", "oxygen", "oyster", "palace", "panda", "panel", "panic",
  "panther", "parade", "parcel", "patent", "patrol", "pebble", "pencil", "phantom", "pilot", "planet",
  "plasma", "plaza", "poem", "poet", "polar", "polite", "pony", "portal", "power", "prism",
  "proton", "pulse", "pyramid", "quantum", "quartz", "queen", "radar", "rainbow", "ranger", "raven",
  "record", "relief", "relic", "rescue", "resort", "rhythm", "ribbon", "riddle", "rider", "river",
  "rocket", "rookie", "route", "ruby", "runner", "safari", "sailor", "salad", "salon", "salute",
  "sample", "sand", "sapphire", "saturn", "scale", "scarf", "scenic", "scheme", "scholar", "scout",
  "scuba", "season", "secret", "sensor", "serum", "shadow", "shield", "shore", "silent", "silver",
  "siren", "sketch", "slang", "slide", "smart", "smile", "smoke", "solar", "soldier", "sonar",
  "spark", "sphere", "spice", "spider", "spiral", "spirit", "splendor", "sponge", "spring", "squad",
  "stable", "stadium", "staff", "stage", "stamp", "stand", "star", "statue", "steam", "steel",
  "stone", "storm", "studio", "stylus", "summer", "sunlight", "sunrise", "sunset", "super", "survey",
  "swamp", "swan", "sweater", "symbol", "syntax", "syrup", "system", "table", "tablet", "tackle",
  "talent", "tango", "target", "task", "tattoo", "tavern", "taxi", "teacher", "team", "techno",
  "temple", "tenant", "tennis", "tensor", "tent", "term", "terrain", "terror", "theory", "thesis",
  "thread", "threat", "thunder", "ticket", "tiger", "timber", "titan", "toast", "token", "tonic",
  "topic", "torch", "tornado", "torus", "total", "touch", "tourist", "towel", "tower", "toxic",
  "toy", "trace", "track", "tractor", "trade", "traffic", "trail", "train", "treaty", "tree",
  "trench", "trend", "triad", "trial", "triangle", "tribe", "tribute", "trick", "trigger", "trio",
  "tripod", "triumph", "trophy", "tropic", "truck", "trumpet", "trunk", "trust", "truth", "tube",
  "tulip", "tumble", "tundra", "tunnel", "turban", "turbine", "turbo", "turtle", "tutor", "tweed",
  "twilight", "twin", "twist", "typhoon", "ultra", "umbrella", "uncle", "unicorn", "union", "unique",
  "unit", "universe", "update", "uranium", "urban", "urge", "urn", "usage", "utopia", "vacuum",
  "valley", "valve", "vapor", "vector", "velvet", "vendor", "venture", "venue", "venus", "verb",
  "verdict", "vessel", "vest", "veteran", "veto", "vibrant", "victim", "victory", "video", "view",
  "vigorous", "villa", "village", "vine", "vintage", "viola", "violet", "violin", "viper", "virtual",
  "virtue", "virus", "visa", "vision", "visit", "visor", "vista", "visual", "vital", "vitamin",
  "vivid", "vocal", "vodka", "vogue", "voice", "volcano", "vortex", "vote", "vowel", "voyage",
  "vulture", "wagon", "waist", "waiter", "walk", "wall", "walnut", "wander", "warden", "warmth",
  "warrior", "wash", "wasp", "watch", "water", "wave", "wax", "way", "wealth", "weapon",
  "weasel", "weather", "web", "wedding", "wedge", "weight", "welcome", "whip", "whisper", "whistle",
  "white", "wicked", "widget", "widow", "width", "wild", "willow", "wind", "window", "wine",
  "wing", "winter", "wire", "wisdom", "wish", "witch", "witness", "wizard", "wolf", "woman",
  "wonder", "wood", "wool", "word", "work", "world", "worm", "worry", "wreath", "wreck",
  "wrist", "writer", "writing", "wrong", "xenon", "yacht", "yard", "yarn", "year", "yeast",
  "yellow", "yeti", "yield", "yoga", "yogurt", "young", "youth", "zebra", "zenith", "zephyr",
  "zero", "zinc", "zipper", "zodiac", "zone"
];

// Similar characters to exclude when configured
const SIMILAR_CHARS = /[il1Lo0O|I]/g;

// UI Global Variables
let currentTab = 'generator';
let currentMode = 'password'; // 'password' or 'passphrase'
let passwordHistory = [];

// DOM Elements
const elLengthInput = document.getElementById('input-length');
const elLengthVal = document.getElementById('display-length-val');
const elLengthLabelText = document.getElementById('length-label-text');
const elPasswordDisplay = document.getElementById('password-display');
const elToast = document.getElementById('toast');

// Config check boxes
const elChkUpper = document.getElementById('chk-upper');
const elChkLower = document.getElementById('chk-lower');
const elChkNumbers = document.getElementById('chk-numbers');
const elChkSymbols = document.getElementById('chk-symbols');
const elChkExcludeSimilar = document.getElementById('chk-exclude-similar');
const elTxtCustomSymbols = document.getElementById('txt-custom-symbols');

// Passphrase config
const elSelWordSeparator = document.getElementById('sel-word-separator');
const elSelCapitalization = document.getElementById('sel-capitalization');
const elChkPassphraseNumber = document.getElementById('chk-passphrase-number');

// Strength Meter elements
const elStrengthBar = document.getElementById('strength-meter-bar');
const elStrengthLabel = document.getElementById('strength-label');
const elEntropyLabel = document.getElementById('entropy-label');
const elCrackTime = document.getElementById('crack-time');
const elOnlineCrackTime = document.getElementById('online-crack-time');

// Tester Elements
const elTesterInput = document.getElementById('txt-tester-input');
const elTesterPercent = document.getElementById('tester-strength-percent');
const elTesterLabel = document.getElementById('tester-strength-label');
const elTesterProgressCircle = document.getElementById('tester-progress-circle');
const elTesterEntropy = document.getElementById('tester-entropy');
const elTesterCrackTime = document.getElementById('tester-crack-time');
const elTesterLength = document.getElementById('tester-length');
const elTesterSuggestionsCard = document.getElementById('tester-suggestions-card');
const elTesterSuggestionsList = document.getElementById('tester-suggestions-list');

// Initialize App
window.addEventListener('DOMContentLoaded', () => {
  // Sync sliders
  elLengthInput.addEventListener('input', (e) => {
    const val = e.target.value;
    elLengthVal.textContent = val;
    generateNew();
  });

  // Generator Options Events
  [elChkUpper, elChkLower, elChkNumbers, elChkSymbols, elChkExcludeSimilar].forEach(item => {
    item.addEventListener('change', () => generateNew());
  });
  elTxtCustomSymbols.addEventListener('input', () => {
    if (elChkSymbols.checked) generateNew();
  });

  // Passphrase Options Events
  [elSelWordSeparator, elSelCapitalization, elChkPassphraseNumber].forEach(item => {
    item.addEventListener('change', () => generateNew());
  });

  // Run initial password generation
  generateNew();
});

// Tab Switcher
function switchTab(tabId) {
  currentTab = tabId;
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.panel-section').forEach(sec => sec.classList.remove('active'));

  if (tabId === 'generator') {
    document.getElementById('tab-generator').classList.add('active');
    document.getElementById('panel-generator').classList.add('active');
    generateNew();
  } else if (tabId === 'tester') {
    document.getElementById('tab-tester').classList.add('active');
    document.getElementById('panel-tester').classList.add('active');
    analyzeCustomPassword();
  }
}

// Mode Switcher (Password vs Passphrase)
function switchMode(mode) {
  currentMode = mode;
  document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
  
  if (mode === 'password') {
    document.getElementById('mode-password').classList.add('active');
    document.getElementById('config-password').classList.add('active');
    document.getElementById('config-passphrase').classList.remove('active');
    document.getElementById('legend-bar').classList.remove('hidden');
    elLengthLabelText.textContent = "Password Length";
    elLengthInput.min = 6;
    elLengthInput.max = 64;
    elLengthInput.value = Math.max(6, Math.min(elLengthInput.value, 64));
    elLengthVal.textContent = elLengthInput.value;
  } else {
    document.getElementById('mode-passphrase').classList.add('active');
    document.getElementById('config-passphrase').classList.add('active');
    document.getElementById('config-password').classList.remove('active');
    document.getElementById('legend-bar').classList.add('hidden');
    elLengthLabelText.textContent = "Word Count";
    elLengthInput.min = 3;
    elLengthInput.max = 12;
    elLengthInput.value = Math.max(3, Math.min(elLengthInput.value, 12));
    elLengthVal.textContent = elLengthInput.value;
  }
  generateNew();
}

// Collapsible Advanced settings panel
function toggleAdvanced() {
  const divider = document.querySelector('.advanced-divider');
  const panel = document.getElementById('advanced-rules');
  divider.classList.toggle('open');
  panel.classList.toggle('open');
}

// Collapsible History panel
function toggleHistory() {
  const card = document.querySelector('.history-card');
  card.classList.toggle('open');
}

// Cryptographically secure integer generator [0, max - 1]
function secureRandomInt(max) {
  if (max <= 0) return 0;
  const range = max;
  const bitsNeeded = Math.ceil(Math.log2(range));
  const bytesNeeded = Math.ceil(bitsNeeded / 8);
  const maxVal = Math.pow(256, bytesNeeded);
  const filterVal = maxVal - (maxVal % range);
  
  const buffer = new Uint8Array(bytesNeeded);
  
  while (true) {
    window.crypto.getRandomValues(buffer);
    let val = 0;
    for (let i = 0; i < bytesNeeded; i++) {
      val = (val << 8) + buffer[i];
    }
    if (val < filterVal) {
      return val % range;
    }
  }
}

// Fisher-Yates shuffle utilizing crypto random source
function cryptShuffler(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = secureRandomInt(i + 1);
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

// CORE GENERATOR LOGIC
function generateNew() {
  let pw = "";
  
  if (currentMode === 'password') {
    pw = generateRandomPassword();
  } else {
    pw = generatePassphrase();
  }
  
  if (!pw) {
    elPasswordDisplay.innerHTML = `<span style="color: var(--text-muted); font-size: 0.95rem;">Select at least one character type</span>`;
    updateStrengthMeter("", 0);
    return;
  }
  
  // Update result display with custom typography spans for color coding
  displayPasswordHighlighted(pw);
  
  // Calculate Strength/Entropy
  const stats = analyzeStrength(pw);
  updateStrengthMeter(stats.label, stats.entropy, stats.crackTimeText, stats.onlineCrackTimeText);
  
  // Store in history
  addToHistory(pw, stats.label);
}

// Character set rules generator
function generateRandomPassword() {
  const length = parseInt(elLengthInput.value, 10);
  
  let upperPool = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let lowerPool = "abcdefghijklmnopqrstuvwxyz";
  let numPool = "0123456789";
  let symPool = elTxtCustomSymbols.value.trim() || "!@#$%^&*()_+-=[]{}|;:,.<>?";
  
  if (elChkExcludeSimilar.checked) {
    upperPool = upperPool.replace(SIMILAR_CHARS, '');
    lowerPool = lowerPool.replace(SIMILAR_CHARS, '');
    numPool = numPool.replace(SIMILAR_CHARS, '');
    symPool = symPool.replace(SIMILAR_CHARS, '');
  }
  
  let combinedPool = "";
  let requiredChars = [];
  
  if (elChkUpper.checked) {
    combinedPool += upperPool;
    requiredChars.push(upperPool[secureRandomInt(upperPool.length)]);
  }
  if (elChkLower.checked) {
    combinedPool += lowerPool;
    requiredChars.push(lowerPool[secureRandomInt(lowerPool.length)]);
  }
  if (elChkNumbers.checked) {
    combinedPool += numPool;
    requiredChars.push(numPool[secureRandomInt(numPool.length)]);
  }
  if (elChkSymbols.checked) {
    combinedPool += symPool;
    requiredChars.push(symPool[secureRandomInt(symPool.length)]);
  }
  
  if (combinedPool.length === 0) return "";
  
  // Fill the remaining length with random chars from combined pool
  const fillLength = length - requiredChars.length;
  for (let i = 0; i < fillLength; i++) {
    const idx = secureRandomInt(combinedPool.length);
    requiredChars.push(combinedPool[idx]);
  }
  
  // Shuffle final set so required characters are not predictable at the start
  const shuffledArr = cryptShuffler(requiredChars);
  return shuffledArr.join("");
}

// Passphrase generator logic
function generatePassphrase() {
  const wordCount = parseInt(elLengthInput.value, 10);
  const separator = elSelWordSeparator.value;
  const capitalization = elSelCapitalization.value;
  const addNumber = elChkPassphraseNumber.checked;
  
  let chosenWords = [];
  for (let i = 0; i < wordCount; i++) {
    const idx = secureRandomInt(WORDLIST.length);
    let word = WORDLIST[idx];
    
    // Capitalization formats
    if (capitalization === 'title') {
      word = word.charAt(0).toUpperCase() + word.slice(1);
    } else if (capitalization === 'upper') {
      word = word.toUpperCase();
    } // default is lower
    
    chosenWords.push(word);
  }
  
  let phrase = chosenWords.join(separator);
  
  if (addNumber) {
    const randNum = secureRandomInt(90) + 10; // secure 2-digit number [10-99]
    phrase += separator + randNum;
  }
  
  return phrase;
}

// Character Highlighting
function displayPasswordHighlighted(pw) {
  if (currentMode === 'passphrase') {
    // Passphrase highlight is simple white
    elPasswordDisplay.textContent = pw;
    return;
  }
  
  elPasswordDisplay.innerHTML = "";
  
  const uppers = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowers = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  
  for (let i = 0; i < pw.length; i++) {
    const c = pw[i];
    const span = document.createElement("span");
    span.textContent = c;
    
    if (uppers.includes(c)) {
      span.className = "char-upper";
    } else if (lowers.includes(c)) {
      span.className = "char-lower";
    } else if (numbers.includes(c)) {
      span.className = "char-number";
    } else {
      span.className = "char-symbol";
    }
    
    elPasswordDisplay.appendChild(span);
  }
}

// Copy Action
function copyPassword() {
  const pwText = elPasswordDisplay.textContent;
  if (!pwText || pwText === "Generating..." || pwText.startsWith("Select at least")) return;
  
  navigator.clipboard.writeText(pwText).then(() => {
    // Show toast
    elToast.classList.add('show');
    
    // Switch action icon
    const copyBtn = document.getElementById('btn-copy');
    const copyIcon = copyBtn.querySelector('.copy-icon');
    const checkIcon = copyBtn.querySelector('.check-icon');
    
    copyIcon.classList.add('hidden');
    checkIcon.classList.remove('hidden');
    
    setTimeout(() => {
      elToast.classList.remove('show');
      copyIcon.classList.remove('hidden');
      checkIcon.classList.add('hidden');
    }, 1800);
  });
}

// Specific history items copy
function copySpecific(pw) {
  navigator.clipboard.writeText(pw).then(() => {
    elToast.textContent = "Password copied to clipboard!";
    elToast.classList.add('show');
    setTimeout(() => elToast.classList.remove('show'), 1500);
  });
}

// Reveal specific hidden password in history
function toggleHistoryPw(el) {
  el.classList.toggle('revealed');
}

// Dynamic regeneration
function generateNewBtn() {
  const btn = document.getElementById('btn-regenerate');
  btn.classList.add('rotating');
  generateNew();
  setTimeout(() => btn.classList.remove('rotating'), 500);
}

// SECURITY & ENTROPY MATHEMATICS
function analyzeStrength(pw) {
  if (!pw) return { label: "Weak", entropy: 0, crackTimeText: "Instant", onlineCrackTimeText: "Instant" };
  
  // Calculate unique pools used in the password
  let hasUpper = false;
  let hasLower = false;
  let hasNumber = false;
  let hasSymbol = false;
  
  const uppers = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowers = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  
  let poolSize = 0;
  
  for (let i = 0; i < pw.length; i++) {
    const c = pw[i];
    if (uppers.includes(c)) hasUpper = true;
    else if (lowers.includes(c)) hasLower = true;
    else if (numbers.includes(c)) hasNumber = true;
    else hasSymbol = true;
  }
  
  if (currentMode === 'passphrase') {
    // Passphrase pool is wordlist length (2000 or here 600 words)
    // Here we have 500+ words. Let's calculate entropy based on 500 word choices
    // H = L * log2(WORDLIST.length)
    const wordCount = pw.split(elSelWordSeparator.value || "").length;
    poolSize = WORDLIST.length;
    // Add numbers if append option is checked
    if (elChkPassphraseNumber.checked) {
      poolSize += 90; // two digits
    }
  } else {
    if (hasUpper) poolSize += 26;
    if (hasLower) poolSize += 26;
    if (hasNumber) poolSize += 10;
    if (hasSymbol) poolSize += (elTxtCustomSymbols.value.length || 32);
  }
  
  if (poolSize === 0) poolSize = 1;
  
  // Shannon entropy formula: H = L * log2(N)
  let entropy = 0;
  if (currentMode === 'passphrase') {
    // Exact word units count
    const units = pw.split(elSelWordSeparator.value || " ");
    entropy = units.length * Math.log2(poolSize);
  } else {
    entropy = pw.length * Math.log2(poolSize);
  }
  
  entropy = Math.round(entropy);
  
  // Labeling criteria
  let label = "Weak";
  if (entropy < 30) label = "Weak";
  else if (entropy < 55) label = "Medium";
  else if (entropy < 80) label = "Strong";
  else if (entropy < 105) label = "Secure";
  else label = "Ultimate";
  
  // Time to crack calculations
  // Offline Attack: 10 billion (10^10) tries per second
  const offlineRate = 1e10; 
  // Online Attack: 100 tries per second
  const onlineRate = 100;
  
  const attempts = Math.pow(2, entropy - 1); // average time is half the pool searches
  
  const offlineSeconds = attempts / offlineRate;
  const onlineSeconds = attempts / onlineRate;
  
  return {
    label: label,
    entropy: entropy,
    crackTimeText: formatTime(offlineSeconds),
    onlineCrackTimeText: formatTime(onlineSeconds)
  };
}

// Render formatted readable crack time estimates
function formatTime(seconds) {
  if (seconds < 1) return "Instant";
  if (seconds < 60) return `${Math.round(seconds)} Seconds`;
  
  const minutes = seconds / 60;
  if (minutes < 60) return `${Math.round(minutes)} Minutes`;
  
  const hours = minutes / 60;
  if (hours < 24) return `${Math.round(hours)} Hours`;
  
  const days = hours / 24;
  if (days < 365) return `${Math.round(days)} Days`;
  
  const years = days / 365;
  if (years < 1000) return `${Math.round(years)} Years`;
  if (years < 1e6) return `${Math.round(years / 1000)} Thousand Years`;
  if (years < 1e9) return `${Math.round(years / 1e6)} Million Years`;
  if (years < 1e12) return `${Math.round(years / 1e9)} Billion Years`;
  
  return "Centuries (Universal Scale)";
}

// Live Strength Indicator renderer
function updateStrengthMeter(label, entropy, crackTime, onlineCrackTime) {
  if (entropy === 0) {
    elStrengthBar.style.width = "0%";
    elStrengthLabel.textContent = "Select Options";
    elStrengthLabel.style.color = "var(--text-muted)";
    elEntropyLabel.textContent = "0 Bits of Entropy";
    elCrackTime.textContent = "Instant";
    elOnlineCrackTime.textContent = "Instant";
    return;
  }
  
  // Map label to properties
  let color = "var(--color-weak)";
  let shadow = "var(--color-weak-glow)";
  let percent = 20;
  
  switch(label) {
    case "Weak":
      color = "var(--color-weak)";
      shadow = "var(--color-weak-glow)";
      percent = 20 + (entropy / 30) * 15;
      break;
    case "Medium":
      color = "var(--color-medium)";
      shadow = "var(--color-medium-glow)";
      percent = 40 + ((entropy - 30) / 25) * 20;
      break;
    case "Strong":
      color = "var(--color-strong)";
      shadow = "var(--color-strong-glow)";
      percent = 65 + ((entropy - 55) / 25) * 15;
      break;
    case "Secure":
      color = "var(--color-secure)";
      shadow = "var(--color-secure-glow)";
      percent = 80 + ((entropy - 80) / 25) * 10;
      break;
    case "Ultimate":
      color = "var(--color-ultimate)";
      shadow = "var(--color-ultimate-glow)";
      percent = 100;
      break;
  }
  
  elStrengthBar.style.width = `${percent}%`;
  elStrengthBar.style.backgroundColor = color;
  elStrengthBar.style.boxShadow = `0 0 12px ${shadow}`;
  
  elStrengthLabel.textContent = label;
  elStrengthLabel.style.color = color;
  elEntropyLabel.textContent = `${entropy} Bits of Entropy`;
  elCrackTime.textContent = crackTime;
  elOnlineCrackTime.textContent = onlineCrackTime;
}

// SECURE PASSWORD HISTORY
function addToHistory(pw, label) {
  if (!pw || pw.startsWith("Select at least")) return;
  
  // Prevent duplicate additions in immediate history
  if (passwordHistory.length > 0 && passwordHistory[0].pw === pw) return;
  
  passwordHistory.unshift({ pw, label });
  
  if (passwordHistory.length > 8) {
    passwordHistory.pop();
  }
  
  renderHistory();
}

function renderHistory() {
  const listEl = document.getElementById('history-list');
  const countEl = document.getElementById('history-count');
  
  countEl.textContent = passwordHistory.length;
  listEl.innerHTML = "";
  
  passwordHistory.forEach((item, index) => {
    const li = document.createElement('li');
    li.className = "history-item";
    
    let badgeClass = "weak";
    if (item.label === "Medium") badgeClass = "medium";
    else if (item.label === "Strong") badgeClass = "strong";
    else if (item.label === "Secure") badgeClass = "secure";
    else if (item.label === "Ultimate") badgeClass = "ultimate";
    
    li.innerHTML = `
      <div class="history-pw-box">
        <span class="history-pw-badge ${badgeClass}">${item.label}</span>
        <span class="history-pw-text" onclick="toggleHistoryPw(this)" title="Click to Reveal">${item.pw}</span>
      </div>
      <div class="history-item-actions">
        <button class="btn-history-action" title="Copy Password" onclick="copySpecific('${item.pw}')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
        </button>
      </div>
    `;
    listEl.appendChild(li);
  });
}

function clearHistory() {
  passwordHistory = [];
  renderHistory();
}

// PASSWORD STRENGTH ANALYZER VIEW LOGIC
function analyzeCustomPassword() {
  const val = elTesterInput.value;
  elTesterLength.textContent = val.length;
  
  if (!val) {
    setTesterUI(0, "Empty", "var(--text-muted)", "rgba(255,255,255,0.03)", 0, "Instant");
    updateCompositionBar(0, 0, 0, 0);
    elTesterSuggestionsCard.classList.add('hidden');
    return;
  }
  
  // Calculate Character types present in text input
  let u = 0, l = 0, n = 0, s = 0;
  const uppers = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowers = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  
  for (let i = 0; i < val.length; i++) {
    const c = val[i];
    if (uppers.includes(c)) u++;
    else if (lowers.includes(c)) l++;
    else if (numbers.includes(c)) n++;
    else s++;
  }
  
  updateCompositionBar(u, l, n, s);
  
  // Calculate dynamic pool size based on detected character families
  let poolSize = 0;
  if (u > 0) poolSize += 26;
  if (l > 0) poolSize += 26;
  if (n > 0) poolSize += 10;
  if (s > 0) poolSize += 32;
  
  const entropy = Math.round(val.length * Math.log2(poolSize));
  elTesterEntropy.textContent = `${entropy} Bits`;
  
  const attempts = Math.pow(2, entropy - 1);
  const offlineRate = 1e10; // 10 Billion attempts
  const crackTimeSec = attempts / offlineRate;
  elTesterCrackTime.textContent = formatTime(crackTimeSec);
  
  // Compute percentage (capped at 100%) for graphical gauge
  // Let 100 bits of entropy be 100% security
  const percent = Math.min(100, Math.round((entropy / 100) * 100));
  
  let label = "Very Weak";
  let color = "var(--color-weak)";
  if (entropy >= 80) {
    label = "Secure";
    color = "var(--color-secure)";
  } else if (entropy >= 55) {
    label = "Strong";
    color = "var(--color-strong)";
  } else if (entropy >= 30) {
    label = "Medium";
    color = "var(--color-medium)";
  } else {
    label = "Weak";
    color = "var(--color-weak)";
  }
  
  setTesterUI(percent, label, color, color, entropy, formatTime(crackTimeSec));
  
  // Suggestions generation
  generateSuggestions(val, u, l, n, s, entropy);
}

// Composition visual breakdown updater
function updateCompositionBar(u, l, n, s) {
  const total = u + l + n + s;
  const compUpper = document.getElementById('comp-upper');
  const compLower = document.getElementById('comp-lower');
  const compNumbers = document.getElementById('comp-numbers');
  const compSymbols = document.getElementById('comp-symbols');
  
  if (total === 0) {
    compUpper.style.width = "0%";
    compLower.style.width = "0%";
    compNumbers.style.width = "0%";
    compSymbols.style.width = "0%";
    return;
  }
  
  compUpper.style.width = `${(u / total) * 100}%`;
  compLower.style.width = `${(l / total) * 100}%`;
  compNumbers.style.width = `${(n / total) * 100}%`;
  compSymbols.style.width = `${(s / total) * 100}%`;
}

// Suggestions algorithm
function generateSuggestions(pw, u, l, n, s, entropy) {
  const suggestions = [];
  
  if (pw.length < 8) {
    suggestions.push("Increase password length to at least 12-16 characters for significantly better safety.");
  }
  if (u === 0) {
    suggestions.push("Add uppercase letters (A-Z) to widen the complexity grid.");
  }
  if (l === 0) {
    suggestions.push("Add lowercase letters (a-z) to make character distribution healthier.");
  }
  if (n === 0) {
    suggestions.push("Include numeric digits (0-9) to stop simple dictionary sequence attacks.");
  }
  if (s === 0) {
    suggestions.push("Insert special symbols (e.g. !, @, $, %) to multiply combinations.");
  }
  
  // Check for repetitions
  const repeatRegex = /(.)\1\1/;
  if (repeatRegex.test(pw)) {
    suggestions.push("Avoid consecutive repeating characters (e.g., 'aaa' or '111') which are simple to guess.");
  }
  
  // Check for common patterns
  const patterns = ["123", "password", "qwerty", "admin", "welcome", "love"];
  let hasPattern = false;
  patterns.forEach(p => {
    if (pw.toLowerCase().includes(p)) hasPattern = true;
  });
  if (hasPattern) {
    suggestions.push("Avoid common dictionary words or keyboard sequences (like '123' or 'qwerty').");
  }
  
  // Render suggestions
  elTesterSuggestionsList.innerHTML = "";
  
  if (suggestions.length === 0 && entropy >= 70) {
    elTesterSuggestionsCard.className = "card suggestions-card secure";
    elTesterSuggestionsCard.querySelector('h4').textContent = "Excellent Security";
    const li = document.createElement('li');
    li.textContent = "Your password meets all safety benchmarks. It is strong, diverse, and robust against brute force attacks.";
    elTesterSuggestionsList.appendChild(li);
    elTesterSuggestionsCard.classList.remove('hidden');
  } else if (suggestions.length > 0) {
    elTesterSuggestionsCard.className = "card suggestions-card";
    elTesterSuggestionsCard.querySelector('h4').textContent = "Security Recommendations";
    suggestions.forEach(tip => {
      const li = document.createElement('li');
      li.textContent = tip;
      elTesterSuggestionsList.appendChild(li);
    });
    elTesterSuggestionsCard.classList.remove('hidden');
  } else {
    elTesterSuggestionsCard.classList.add('hidden');
  }
}

// Update Tester Circular Gauges UI
function setTesterUI(percent, label, colorText, colorBar, entropy, crackTime) {
  elTesterPercent.textContent = `${percent}%`;
  elTesterLabel.textContent = label;
  elTesterLabel.style.color = colorText;
  
  // SVG Stroke calculations: dasharray is 251.2
  // dashoffset = dasharray - (percent / 100 * dasharray)
  const dasharray = 251.2;
  const offset = dasharray - (percent / 100 * dasharray);
  
  elTesterProgressCircle.style.strokeDashoffset = offset;
  elTesterProgressCircle.style.stroke = colorBar;
}

// Toggle Tester Input Visibility
function toggleTesterPasswordVisibility() {
  const eyeOpen = document.getElementById('tester-eye-open');
  const eyeClosed = document.getElementById('tester-eye-closed');
  
  if (elTesterInput.type === "password") {
    elTesterInput.type = "text";
    eyeOpen.classList.add('hidden');
    eyeClosed.classList.remove('hidden');
  } else {
    elTesterInput.type = "password";
    eyeOpen.classList.remove('hidden');
    eyeClosed.classList.add('hidden');
  }
}

// Helper: Bind regenerate button rotation animation
function generateNew() {
  let pw = "";
  
  if (currentMode === 'password') {
    pw = generateRandomPassword();
  } else {
    pw = generatePassphrase();
  }
  
  if (!pw) {
    elPasswordDisplay.innerHTML = `<span style="color: var(--text-muted); font-size: 0.95rem;">Select at least one character type</span>`;
    updateStrengthMeter("", 0);
    return;
  }
  
  displayPasswordHighlighted(pw);
  
  const stats = analyzeStrength(pw);
  updateStrengthMeter(stats.label, stats.entropy, stats.crackTimeText, stats.onlineCrackTimeText);
  addToHistory(pw, stats.label);
}
