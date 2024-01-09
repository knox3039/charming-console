```markdown
## charming-log

Enhance your console output with colors, styles, symbols, and more!
```
## Installation

```bash
npm install charming-console
```
## Why charming-log?

- Why have multiple packages, when you can have one?
- Get rid of chalk, cli-spinners, console.table, time-stamp, and many others. We have you covered.
- This package is constantly growing in features! What you need, we have. And if we don't have it, email us at support@logick.live

## Usage

```javascript
const {colorize, symbols, alignText, table, spin, createClickableLink, time} = require('charming-console');

// Colorize text
console.log(colorize('This is red text!', 'red'));
console.log(colorize('This is green text!', 'green'));
console.log(colorize('This is blue text!', 'blue'));

// Apply styles
console.log(applyStyle('Bold and italic text', 'bold,italic'));

// Display symbols
console.log(symbols.success, 'Operation successful!');
console.log(symbols.error, 'Error occurred!');
console.log(symbols.warning, 'Warning: proceed with caution!');
console.log(symbols.info, 'Information: check this out!');

// Align text
console.log(alignText('Right-aligned text', 'right'));
console.log(alignText('Center-aligned text', 'center'));

// Create a table
const data = [
  { name: 'John', age: 28, city: 'New York' },
  { name: 'Alice', age: 22, city: 'Los Angeles' },
  { name: 'Bob', age: 34, city: 'Chicago' },
];
console.log(table(data));

// Clickable link
console.log(createClickableLink('Click me!', 'https://example.com'));
console.log(createClickableLink('Click me!', 'https://example.com', 'green')); 
console.log(createClickableLink('Click me!', 'https://example.com', 'red', 'bold,underline'));
console.log(createClickableLink('Click me!', 'https://example.com', 'blue', 'white', 'bold,underline'));
console.log(createClickableLink('Click me!', 'https://example.com', '#FF0000', '#00FF00', 'bold,underline'));

//Spinners
//Spin forever
const forcast = spin('forcast');
//Spin for 5 seconds
const forcast = spin('forcast');
setTimeout(() => {
  clearInterval(forcast);
}, 5000);

//Timestamps
const formattedDate = time('YYYY-MM-DD HH:mm:ss', new Date());
console.log(formattedDate);
const timestamp = time();
console.log(timestamp);
const timestamputc = time.utc();
console.log(timestamputc);
const formattedUtcDate = time.utc('YYYY-MM-DD HH:mm:ss', new Date());
console.log(formattedUtcDate);
```

## Features

### Colorize

```javascript
//Red Text
console.log(colorize('Red text', 'red'));
//Green text with a yellow background
console.log(colorize('Green text', 'green', 'yellow'));
console.log(colorize('Blue text', '#0000FF', '#FFFF00'));
```

### Apply Styles

```javascript
console.log(applyStyle('Bold and italic text', 'bold,italic'));
console.log(applyStyle('Underlined text', 'underline'));
```

### Display Symbols

```javascript
//Symbol Success `✓`
console.log(symbols.success, 'Operation successful!');
//Symbol Error `✗`
console.log(symbols.error, 'Error occurred!');
//Symbol Warning `⚠`
console.log(symbols.warning, 'Warning: proceed with caution!');
//Symbol Info `ℹ`
console.log(symbols.info, 'Information: check this out!');
```

### Align Text

```javascript
//Align Right
console.log(alignText('Right-aligned text', 'right'));
//Align Center
console.log(alignText('Center-aligned text', 'center'));
```

### Create a Table

```javascript
const data = [
  { name: 'John', age: 28, city: 'New York' },
  { name: 'Alice', age: 22, city: 'Los Angeles' },
  { name: 'Bob', age: 34, city: 'Chicago' },
];
console.log(table(data));
```

### Interactive or clickable console output

```javascript
// Basic usage, default color is blue
console.log(createClickableLink('Click me!', 'https://example.com'));

// Custom color and style
console.log(createClickableLink('Click me!', 'https://example.com', 'green', 'bold,underline'));

// Basic usage with text color and background color
console.log(createClickableLink('Click me!', 'https://example.com', 'blue', 'white', 'bold,underline,italic'));

// Custom text and background colors with style
console.log(createClickableLink('Click me!', 'https://example.com', '#FF0000', '#00FF00', 'bold,underline,italic'));
```
### Spinners

```javascript
//Spin Forever
const forcast = spin('forcast');
//Spin for 5 seconds
const forcast = spin('forcast');
setTimeout(() => {
  clearInterval(forcast);
}, 5000);
```

## Timestamps

#### `time(str, date, utc)`

Formats a date object according to the provided format string.

- `str` (string): The format string specifying how the date should be formatted.
- `date` (Date, optional): The date object to format. Defaults to the current date.
- `utc` (boolean, optional): If `true`, UTC time will be used. Defaults to `false`.

Returns: A formatted date string.

#### `time.utc(str, date)`

Same as `time`, but uses UTC time.

```javascript

const formattedDate = time('YYYY-MM-DD HH:mm:ss', new Date());
console.log(formattedDate);

const formattedUtcDate = time.utc('YYYY-MM-DD HH:mm:ss', new Date());
console.log(formattedUtcDate);
```

## Styles

### Styles
| Style          | Description                                    |
|----------------|------------------------------------------------|
| **RESET**      | Resets all styles.                             |
| **BRIGHT**     | Bright or bold text.                           |
| **DIM**        | Dim or faint text.                             |
| **UNDERLINE**  | Underlined text.                               |
| **BLINK**      | Blinking text.                                 |
| **REVERSE**    | Reversed background and foreground colors.    |
| **HIDDEN**     | Hidden or invisible text.                      |
| **ITALIC**     | Italicized text.                               |

### Colors
| Color          | Description                                    |
|----------------|------------------------------------------------|
| **BLACK**      | Black text.                                    |
| **RED**        | Red text.                                      |
| **GREEN**      | Green text.                                    |
| **YELLOW**     | Yellow text.                                   |
| **BLUE**       | Blue text.                                     |
| **MAGENTA**    | Magenta (purple) text.                         |
| **CYAN**       | Cyan (blue-green) text.                        |
| **WHITE**      | White text.                                    |
| **GRAY**       | Gray text.                                     |
| **BRIGHT_RED** | Bright or light red text.                      |
| **BRIGHT_GREEN**| Bright or light green text.                    |
| **BRIGHT_YELLOW** | Bright or light yellow text.                |
| **BRIGHT_BLUE** | Bright or light blue text.                     |
| **BRIGHT_MAGENTA** | Bright or light magenta (pink) text.      |
| **BRIGHT_CYAN** | Bright or light cyan text.                     |
| **BRIGHT_WHITE** | Bright or light white text.                  |

### Background Color 
| Background Color | Description                                  |
|-------------------|----------------------------------------------|
| **BG_BLACK**      | Black background.                            |
| **BG_RED**        | Red background.                              |
| **BG_GREEN**      | Green background.                            |
| **BG_YELLOW**     | Yellow background.                           |
| **BG_BLUE**       | Blue background.                             |
| **BG_MAGENTA**    | Magenta (purple) background.                 |
| **BG_CYAN**       | Cyan (blue-green) background.                |
| **BG_WHITE**      | White background.                            |
| **BG_GRAY**       | Gray background.                             |
| **BG_BRIGHT_RED** | Bright or light red background.              |
| **BG_BRIGHT_GREEN** | Bright or light green background.          |
| **BG_BRIGHT_YELLOW** | Bright or light yellow background.       |
| **BG_BRIGHT_BLUE** | Bright or light blue background.            |
| **BG_BRIGHT_MAGENTA** | Bright or light magenta (pink) background.|
| **BG_BRIGHT_CYAN** | Bright or light cyan background.            |
| **BG_BRIGHT_WHITE** | Bright or light white background.          |

### Spinner Types

Explore a variety of spinners to add dynamic elements to your console output. Choose from the following spinner types:

| Spinner Type   | Spinner Type   | Spinner Type   | Spinner Type   |
| -------------- | -------------- | -------------- | -------------- |
| **1**          | **2**          | **3**          | **4**          |
| **5**          | **6**          | **7**          | **8**          |
| **lines1**     | **lines2**     | **arrowPipe**  | **lilDots**    |
| **scrollyDots**| **stary**      | **xstars**     | **waveFlip**   |
| **spongebob**  | **upDown**     | **leftRight**  | **balloonPop** |
| **balloonPop2**| **flash**      | **cornerBounce**| **lineBounce** |
| **triangle**   | **binary**     | **noahsArc**   | **around**     |
| **squareCorners**| **circle25** | **circle.5**   | **grid**       |
| **toggleLine** | **togglesmBox**| **togglebBox** | **togglesbBox**|
| **toggleReq**  | **target**     | **eye**        | **arrowRound** |
| **arrowRight** | **reboundingBar**| **bounceBall**| **silly**      |
| **peekaBoo**   | **love**       | **time**       | **earth**      |
| **moonPhase**  | **trackStar**  | **pingPong**   | **babyShark**  |
| **forcast**    | **santa**      | **bomb**       | **fingy**      |
| **booYah**     | **soccer**     | **crazy**      | **colorPulse** |
| **load**       |                |                |                |

Choose the spinner that suits your console output style and adds a touch of creativity!

### Time Format Options

The format string can include the following placeholders:

| Placeholder | Description                          |
|-------------|--------------------------------------|
| `YYYY`      | Full year (4 digits).                 |
| `YY`        | Short year (2 digits).                |
| `MM`        | Month (zero-padded).                  |
| `DD`        | Day of the month (zero-padded).       |
| `HH`        | Hours (zero-padded).                  |
| `mm`        | Minutes (zero-padded).                |
| `ss`        | Seconds (zero-padded).                |
| `ms`        | Milliseconds.                        |

## Questions, Comments, Support?

Send us an email at support@logick.live to create a ticket!
Or join our Discord https://discord.com/invite/wNfFXx7J8q

## License

This project is licensed under the MIT License# charming-console
# charming-console
