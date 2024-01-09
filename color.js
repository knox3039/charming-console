const RESET = "\x1b[0m";

const STYLES = {
  RESET,
  BRIGHT: "\x1b[1m",
  DIM: "\x1b[2m",
  UNDERLINE: "\x1b[4m",
  BLINK: "\x1b[5m",
  REVERSE: "\x1b[7m",
  HIDDEN: "\x1b[8m",
  ITALIC: "\x1b[3m",
};

const COLORS = {
  BLACK: "\x1b[30m",
  RED: "\x1b[31m",
  GREEN: "\x1b[32m",
  YELLOW: "\x1b[33m",
  BLUE: "\x1b[34m",
  MAGENTA: "\x1b[35m",
  CYAN: "\x1b[36m",
  WHITE: "\x1b[37m",
  GRAY: "\x1b[90m",
  BRIGHT_RED: "\x1b[91m",
  BRIGHT_GREEN: "\x1b[92m",
  BRIGHT_YELLOW: "\x1b[93m",
  BRIGHT_BLUE: "\x1b[94m",
  BRIGHT_MAGENTA: "\x1b[95m",
  BRIGHT_CYAN: "\x1b[96m",
  BRIGHT_WHITE: "\x1b[97m",
};

const BGCOLORS = {
  BG_BLACK: "\x1b[40m",
  BG_RED: "\x1b[41m",
  BG_GREEN: "\x1b[42m",
  BG_YELLOW: "\x1b[43m",
  BG_BLUE: "\x1b[44m",
  BG_MAGENTA: "\x1b[45m",
  BG_CYAN: "\x1b[46m",
  BG_WHITE: "\x1b[47m",
  BG_GRAY: "\x1b[100m",
  BG_BRIGHT_RED: "\x1b[101m",
  BG_BRIGHT_GREEN: "\x1b[102m",
  BG_BRIGHT_YELLOW: "\x1b[103m",
  BG_BRIGHT_BLUE: "\x1b[104m",
  BG_BRIGHT_MAGENTA: "\x1b[105m",
  BG_BRIGHT_CYAN: "\x1b[106m",
  BG_BRIGHT_WHITE: "\x1b[107m",
};

const getColorCode = (color) => {
  if (color.charAt(0) === '#') {
    // Hex code
    return `\x1b[38;2;${parseInt(color.slice(1, 3), 16)};${parseInt(color.slice(3, 5), 16)};${parseInt(color.slice(5, 7), 16)}m`;
  } else {
    // Named color
    return COLORS[color.toUpperCase()] || '';
  }
};

const getBgColorCode = (bgColor) => {
  if (bgColor && bgColor.charAt(0) === '#') {
    // Hex code for background color
    return `\x1b[48;2;${parseInt(bgColor.slice(1, 3), 16)};${parseInt(bgColor.slice(3, 5), 16)};${parseInt(bgColor.slice(5, 7), 16)}m`;
  } else if (bgColor) {
    // Named background color
    return BGCOLORS[bgColor.toUpperCase()] || '';
  } else {
    // Default to an empty string if bgColor is not provided
    return '';
  }
};

const applyStyle = (text, style) => {
  const styles = style && style.split(',').map(s => STYLES[s.toUpperCase()]).join('');
  return styles ? styles + text + RESET : text;
};

const colorize = (text, color, bgColor, style) => {
  const colorCode = getColorCode(color);
  const bgColorCode = getBgColorCode(bgColor);

  // Check if the output is a terminal
  const isTTY = process.stdout.isTTY;

  // Apply styles only if the output is a terminal
  const styledText = isTTY ? applyStyle(text, style) : text;

  const colorizedText = isTTY ? colorCode + bgColorCode + styledText + RESET : text;
  return colorizedText;
};

const SYMBOLS = {
  success: '\u2713',  // Checkmark
  error: '\u2717',    // Cross mark
  warning: '\u26A0',  // Warning sign
  info: '\u2139',     // Information source
  star: '\u2605',     // Star
  heart: '\u2665',    // Heart
  arrowUp: '\u2191',  // Upwards arrow
  arrowDown: '\u2193',  // Downwards arrow
  checkCircle: '\u2714',  // Checkmark in a circle
  crossCircle: '\u2716',  // Cross mark in a circle
  lightning: '\u26A1',    // Lightning bolt
  hourglass: '\u231B',    // Hourglass
  smiley: '\uD83D\uDE04',  // Smiling face emoji (replace with your preferred emoji)
  sadFace: '\uD83D\uDE22',  // Sad face emoji (replace with your preferred emoji)
};

const alignText = (text, alignment) => {
  if (alignment === 'right') {
    return text.padStart(process.stdout.columns);
  } else if (alignment === 'center') {
    return text.padStart(Math.floor((process.stdout.columns - text.length) / 2) + text.length);
  } else {
    // Default to left alignment
    return text;
  }
};

const table = (data, textColor = 'white', bgColor = 'bgBlack') => {
  const keys = Object.keys(data[0]);
  const header = colorize(keys.join(' | '), textColor, bgColor);
  const separator = colorize('-'.repeat(header.length), textColor, bgColor);
  const rows = data.map(row => keys.map(key => colorize(row[key], textColor, bgColor)).join(' | '));
  return [header, separator, ...rows].join('\n');
};

const createClickableLink = (text, url, textColor = 'blue', bgColor = '', style = '') => {
  const textColorCode = getColorCode(textColor);
  const bgColorCode = getBgColorCode(bgColor);

  // Check if the output is a terminal
  const isTTY = process.stdout.isTTY;

  // Apply color, background color, and style only if the output is a terminal
  const styledText = isTTY ? applyStyle(text, style) : text;
  const coloredText = isTTY ? textColorCode + bgColorCode + styledText + RESET : text;

  // Create a clickable link if the output supports it
  const clickableLink = isTTY ? `\u001b]8;;${url}\u0007${coloredText}\u001b]8;;\u0007` : text;

  return clickableLink;
};

const clearLine = () => process.stdout.write('\r\x1b[K');

const renderSpinner = (frames, interval) => {
  let currentFrameIndex = 0;
  const spinnerInterval = setInterval(() => {
    clearLine();
    process.stdout.write(frames[currentFrameIndex]);
    currentFrameIndex = (currentFrameIndex + 1) % frames.length;
  }, interval);

  return spinnerInterval;
};

const spinners = {
 "1": {
    "interval": 80,
    "frames": [
      "⠋",
      "⠙",
      "⠹",
      "⠸",
      "⠼",
      "⠴",
      "⠦",
      "⠧",
      "⠇",
      "⠏"
    ]
  },
  "2": {
    "interval": 80,
    "frames": [
      "⣾",
      "⣽",
      "⣻",
      "⢿",
      "⡿",
      "⣟",
      "⣯",
      "⣷"
    ]
  },
  "3": {
    "interval": 80,
    "frames": [
      "⠋",
      "⠙",
      "⠚",
      "⠞",
      "⠖",
      "⠦",
      "⠴",
      "⠲",
      "⠳",
      "⠓"
    ]
  },
  "4": {
    "interval": 80,
    "frames": [
      "⠄",
      "⠆",
      "⠇",
      "⠋",
      "⠙",
      "⠸",
      "⠰",
      "⠠",
      "⠰",
      "⠸",
      "⠙",
      "⠋",
      "⠇",
      "⠆"
    ]
  },
  "5": {
    "interval": 80,
    "frames": [
      "⠋",
      "⠙",
      "⠚",
      "⠒",
      "⠂",
      "⠂",
      "⠒",
      "⠲",
      "⠴",
      "⠦",
      "⠖",
      "⠒",
      "⠐",
      "⠐",
      "⠒",
      "⠓",
      "⠋"
    ]
  },
  "6": {
    "interval": 80,
    "frames": [
      "⠁",
      "⠉",
      "⠙",
      "⠚",
      "⠒",
      "⠂",
      "⠂",
      "⠒",
      "⠲",
      "⠴",
      "⠤",
      "⠄",
      "⠄",
      "⠤",
      "⠴",
      "⠲",
      "⠒",
      "⠂",
      "⠂",
      "⠒",
      "⠚",
      "⠙",
      "⠉",
      "⠁"
    ]
  },
  "7": {
    "interval": 80,
    "frames": [
      "⠈",
      "⠉",
      "⠋",
      "⠓",
      "⠒",
      "⠐",
      "⠐",
      "⠒",
      "⠖",
      "⠦",
      "⠤",
      "⠠",
      "⠠",
      "⠤",
      "⠦",
      "⠖",
      "⠒",
      "⠐",
      "⠐",
      "⠒",
      "⠓",
      "⠋",
      "⠉",
      "⠈"
    ]
  },
  "8": {
    "interval": 80,
    "frames": [
      "⠁",
      "⠁",
      "⠉",
      "⠙",
      "⠚",
      "⠒",
      "⠂",
      "⠂",
      "⠒",
      "⠲",
      "⠴",
      "⠤",
      "⠄",
      "⠄",
      "⠤",
      "⠠",
      "⠠",
      "⠤",
      "⠦",
      "⠖",
      "⠒",
      "⠐",
      "⠐",
      "⠒",
      "⠓",
      "⠋",
      "⠉",
      "⠈",
      "⠈"
    ]
  },
  "lines1": {
    "interval": 130,
    "frames": [
      "-",
      "\\",
      "|",
      "/"
    ]
  },
  "lines2": {
    "interval": 100,
    "frames": [
      "⠂",
      "-",
      "–",
      "—",
      "–",
      "-"
    ]
  },
  "arrowPipe": {
    "interval": 100,
    "frames": [
      "┤",
      "┘",
      "┴",
      "└",
      "├",
      "┌",
      "┬",
      "┐"
    ]
  },
  "lilDots": {
    "interval": 400,
    "frames": [
      ".  ",
      ".. ",
      "...",
      "   "
    ]
  },
  "scrollyDots": {
    "interval": 200,
    "frames": [
      ".  ",
      ".. ",
      "...",
      " ..",
      "  .",
      "   "
    ]
  },
  "stary": {
    "interval": 70,
    "frames": [
      "✶",
      "✸",
      "✹",
      "✺",
      "✹",
      "✷"
    ]
  },
  "xstars": {
    "interval": 80,
    "frames": [
      "+",
      "x",
      "*"
    ]
  },
  "waveFlip": {
    "interval": 70,
    "frames": [
      "_",
      "_",
      "_",
      "-",
      "`",
      "`",
      "'",
      "´",
      "-",
      "_",
      "_",
      "_"
    ]
  },
  "spongebob": {
    "interval": 100,
    "frames": [
      "☱",
      "☲",
      "☴"
    ]
  },
  "upDown": {
    "interval": 120,
    "frames": [
      "▁",
      "▃",
      "▄",
      "▅",
      "▆",
      "▇",
      "▆",
      "▅",
      "▄",
      "▃"
    ]
  },
  "leftRight": {
    "interval": 120,
    "frames": [
      "▏",
      "▎",
      "▍",
      "▌",
      "▋",
      "▊",
      "▉",
      "▊",
      "▋",
      "▌",
      "▍",
      "▎"
    ]
  },
  "balloonPop": {
    "interval": 140,
    "frames": [
      " ",
      ".",
      "o",
      "O",
      "@",
      "*",
      " "
    ]
  },
  "balloonPop2": {
    "interval": 120,
    "frames": [
      ".",
      "o",
      "O",
      "°",
      "O",
      "o",
      "."
    ]
  },
  "flash": {
    "interval": 100,
    "frames": [
      "▓",
      "▒",
      "░"
    ]
  },
  "cornerBounce": {
    "interval": 120,
    "frames": [
      "▖",
      "▘",
      "▝",
      "▗"
    ]
  },
  "lineBounce": {
    "interval": 100,
    "frames": [
      "▌",
      "▀",
      "▐",
      "▄"
    ]
  },
  "triangle": {
    "interval": 50,
    "frames": [
      "◢",
      "◣",
      "◤",
      "◥"
    ]
  },
  "binary": {
    "interval": 80,
    "frames": [
      "010010",
            "001100",
            "100101",
            "111010",
            "111101",
            "010111",
      "101011",
      "111000",
      "110011",
      "110101"
    ]
  },
  "noahsArc": {
    "interval": 100,
    "frames": [
      "◜",
      "◠",
      "◝",
      "◞",
      "◡",
      "◟"
    ]
  },
  "around": {
    "interval": 120,
    "frames": [
      "◡",
      "⊙",
      "◠"
    ]
  },
  "squareCorners": {
    "interval": 180,
    "frames": [
      "◰",
      "◳",
      "◲",
      "◱"
    ]
  },
  "circle25": {
    "interval": 120,
    "frames": [
      "◴",
      "◷",
      "◶",
      "◵"
    ]
  },
  "circle.5": {
    "interval": 50,
    "frames": [
      "◐",
      "◓",
      "◑",
      "◒"
    ]
  },
  "grid": {
    "interval": 100,
    "frames": [
      "╫",
      "╪"
    ]
  },
  "toggleLine": {
    "interval": 250,
    "frames": [
      "⊶",
      "⊷"
    ]
  },
  "togglesmBox": {
    "interval": 80,
    "frames": [
      "▫",
      "▪"
    ]
  },
  "togglebBox": {
    "interval": 120,
    "frames": [
      "□",
      "■"
    ]
  },
  "togglesbBox": {
    "interval": 100,
    "frames": [
      "■",
      "□",
      "▪",
      "▫"
    ]
  },
  "toggleReq": {
    "interval": 100,
    "frames": [
      "▮",
      "▯"
    ]
  },
  "target": {
    "interval": 80,
    "frames": [
      "⦾",
      "⦿"
    ]
  },
  "eye": {
    "interval": 100,
    "frames": [
      "◉",
      "◎"
    ]
  },
  "arrowRound": {
    "interval": 100,
    "frames": [
      "←",
      "↖",
      "↑",
      "↗",
      "→",
      "↘",
      "↓",
      "↙"
    ]
  },
  "arrowRight": {
    "interval": 120,
    "frames": [
      "▹▹▹▹▹",
      "▸▹▹▹▹",
      "▹▸▹▹▹",
      "▹▹▸▹▹",
      "▹▹▹▸▹",
      "▹▹▹▹▸"
    ]
  },
  "reboundingBar": {
    "interval": 80,
    "frames": [
      "[    ]",
      "[=   ]",
      "[==  ]",
      "[=== ]",
      "[====]",
      "[ ===]",
      "[  ==]",
      "[   =]",
      "[    ]",
      "[   =]",
      "[  ==]",
      "[ ===]",
      "[====]",
      "[=== ]",
      "[==  ]",
      "[=   ]"
    ]
  },
  "bounceBall": {
    "interval": 80,
    "frames": [
      "( ●    )",
      "(  ●   )",
      "(   ●  )",
      "(    ● )",
      "(     ●)",
      "(    ● )",
      "(   ●  )",
      "(  ●   )",
      "( ●    )",
      "(●     )"
    ]
  },
  "silly": {
    "interval": 200,
    "frames": [
      "😄 ",
      "😝 "
    ]
  },
  "peekaBoo": {
    "interval": 300,
    "frames": [
      "🙈 ",
      "🙈 ",
      "🙉 ",
      "🙊 "
    ]
  },
  "love": {
    "interval": 100,
    "frames": [
      "💛 ",
      "💙 ",
      "💜 ",
      "💚 ",
      "❤️ "
    ]
  },
  "time": {
    "interval": 100,
    "frames": [
      "🕛 ",
      "🕐 ",
      "🕑 ",
      "🕒 ",
      "🕓 ",
      "🕔 ",
      "🕕 ",
      "🕖 ",
      "🕗 ",
      "🕘 ",
      "🕙 ",
      "🕚 "
    ]
  },
  "earth": {
    "interval": 180,
    "frames": [
      "🌍 ",
      "🌎 ",
      "🌏 "
    ]
  },
  "moonPhase": {
    "interval": 80,
    "frames": [
      "🌑 ",
      "🌒 ",
      "🌓 ",
      "🌔 ",
      "🌕 ",
      "🌖 ",
      "🌗 ",
      "🌘 "
    ]
  },
  "trackStar": {
    "interval": 140,
    "frames": [
      "🚶 ",
      "🏃 "
    ]
  },
  "pingPong": {
    "interval": 80,
    "frames": [
      "▐⠂       ▌",
      "▐⠈       ▌",
      "▐ ⠂      ▌",
      "▐ ⠠      ▌",
      "▐  ⡀     ▌",
      "▐  ⠠     ▌",
      "▐   ⠂    ▌",
      "▐   ⠈    ▌",
      "▐    ⠂   ▌",
      "▐    ⠠   ▌",
      "▐     ⡀  ▌",
      "▐     ⠠  ▌",
      "▐      ⠂ ▌",
      "▐      ⠈ ▌",
      "▐       ⠂▌",
      "▐       ⠠▌",
      "▐       ⡀▌",
      "▐      ⠠ ▌",
      "▐      ⠂ ▌",
      "▐     ⠈  ▌",
      "▐     ⠂  ▌",
      "▐    ⠠   ▌",
      "▐    ⡀   ▌",
      "▐   ⠠    ▌",
      "▐   ⠂    ▌",
      "▐  ⠈     ▌",
      "▐  ⠂     ▌",
      "▐ ⠠      ▌",
      "▐ ⡀      ▌",
      "▐⠠       ▌"
    ]
  },
  "babyShark": {
    "interval": 120,
    "frames": [
      "▐|\\____________▌",
      "▐_|\\___________▌",
      "▐__|\\__________▌",
      "▐___|\\_________▌",
      "▐____|\\________▌",
      "▐_____|\\_______▌",
      "▐______|\\______▌",
      "▐_______|\\_____▌",
      "▐________|\\____▌",
      "▐_________|\\___▌",
      "▐__________|\\__▌",
      "▐___________|\\_▌",
      "▐____________|\\▌",
      "▐____________/|▌",
      "▐___________/|_▌",
      "▐__________/|__▌",
      "▐_________/|___▌",
      "▐________/|____▌",
      "▐_______/|_____▌",
      "▐______/|______▌",
      "▐_____/|_______▌",
      "▐____/|________▌",
      "▐___/|_________▌",
      "▐__/|__________▌",
      "▐_/|___________▌",
      "▐/|____________▌"
    ]
  },
  "forcast": {
    "interval": 100,
    "frames": [
      "☀️ ",
      "☀️ ",
      "☀️ ",
      "🌤 ",
      "⛅️ ",
      "🌥 ",
      "☁️ ",
      "🌧 ",
      "🌨 ",
      "🌧 ",
      "🌨 ",
      "🌧 ",
      "🌨 ",
      "⛈ ",
      "🌨 ",
      "🌧 ",
      "🌨 ",
      "☁️ ",
      "🌥 ",
      "⛅️ ",
      "🌤 ",
      "☀️ ",
      "☀️ "
    ]
  },
  "santa": {
    "interval": 400,
    "frames": [
      "🌲",
      "🎄"
    ]
  },
  "bomb": {
    "interval": 80,
    "frames": [
      "،  ",
      "′  ",
      " ´ ",
      " ‾ ",
      "  ⸌",
      "  ⸊",
      "  |",
      "  ⁎",
      "  ⁕",
      " ෴ ",
      "  ⁓",
      "   ",
      "   ",
      "   "
    ]
  },
  "fingy": {
    "interval": 160,
    "frames": [
      "🤘 ",
      "🤟 ",
      "🖖 ",
      "✋ ",
      "🤚 ",
      "👆 "
    ]
  },
  "booYah": {
    "interval": 80,
    "frames": [
      "🤜\u3000\u3000\u3000\u3000🤛 ",
      "🤜\u3000\u3000\u3000\u3000🤛 ",
      "🤜\u3000\u3000\u3000\u3000🤛 ",
      "\u3000🤜\u3000\u3000🤛\u3000 ",
      "\u3000\u3000🤜🤛\u3000\u3000 ",
      "\u3000🤜✨🤛\u3000\u3000 ",
      "🤜\u3000✨\u3000🤛\u3000 "
    ]
  },
  "soccer": {
    "interval": 80,
    "frames": [
      " 🧑⚽️       🧑 ",
      "🧑  ⚽️      🧑 ",
      "🧑   ⚽️     🧑 ",
      "🧑    ⚽️    🧑 ",
      "🧑     ⚽️   🧑 ",
      "🧑      ⚽️  🧑 ",
      "🧑       ⚽️🧑  ",
      "🧑      ⚽️  🧑 ",
      "🧑     ⚽️   🧑 ",
      "🧑    ⚽️    🧑 ",
      "🧑   ⚽️     🧑 ",
      "🧑  ⚽️      🧑 "
    ]
  },
  "crazy": {
    "interval": 160,
    "frames": [
      "😐 ",
      "😐 ",
      "😮 ",
      "😮 ",
      "😦 ",
      "😦 ",
      "😧 ",
      "😧 ",
      "🤯 ",
      "💥 ",
      "✨ ",
      "\u3000 ",
      "\u3000 ",
      "\u3000 "
    ]
  },
  "colorPulse": {
    "interval": 100,
    "frames": [
      "🔸 ",
      "🔶 ",
      "🟠 ",
      "🟠 ",
      "🔶 ",
      "🔹 ",
      "🔷 ",
      "🔵 ",
      "🔵 ",
      "🔷 "
    ]
  },
  "load": {
    "interval": 80,
    "frames": [
      "▰▱▱▱▱▱▱",
      "▰▰▱▱▱▱▱",
      "▰▰▰▱▱▱▱",
      "▰▰▰▰▱▱▱",
      "▰▰▰▰▰▱▱",
      "▰▰▰▰▰▰▱",
      "▰▰▰▰▰▰▰",
      "▰▱▱▱▱▱▱"
    ]
  }
  // Add more spinners as needed
};

const spin = (spinnerName) => {
  const spinner = spinners[spinnerName];
  if (spinner) {
    const spinnerInterval = renderSpinner(spinner.frames, spinner.interval);
    return spinnerInterval;
  } else {
    console.error(`Spinner '${spinnerName}' not found`);
    return null;
  }
};
var dateRegex = /(?=(YYYY|YY|MM|DD|HH|mm|ss|ms))\1([:\/]*)/g;
var timespan = {
  YYYY: ['getFullYear', 4],
  YY: ['getFullYear', 2],
  MM: ['getMonth', 2, 1], // getMonth is zero-based, thus the extra increment field
  DD: ['getDate', 2],
  HH: ['getHours', 2],
  mm: ['getMinutes', 2],
  ss: ['getSeconds', 2],
  ms: ['getMilliseconds', 3]
};
var time = function(str, date, utc) {
  if (typeof str !== 'string') {
    date = str;
    str = 'YYYY-MM-DD';
  }

  if (!date) date = new Date();
  return str.replace(dateRegex, function(match, key, rest) {
    var args = timespan[key];
    var name = args[0];
    var chars = args[1];
    if (utc === true) name = 'getUTC' + name.slice(3);
    var val = '00' + String(date[name]() + (args[2] || 0));
    return val.slice(-chars) + (rest || '');
  });
};

time.utc = function(str, date) {
  return time(str, date, true);
};
let symbols = SYMBOLS
module.exports = {
  colorize,
  COLORS,
  BGCOLORS,
  STYLES,
  symbols,
  alignText,
  createClickableLink,
  table,
  spin,
  time,
};