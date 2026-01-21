# Discord Fake Deafen

A userscript that fakes the deafen status in Discord by intercepting WebSocket messages and modifying self_deaf packets.

## Features

- 🔇 Automatically converts `self_deaf: false` to `self_deaf: true` in Discord WebSocket messages
- ⏱️ Throttled to prevent spam - only modifies packets once every 10 seconds
- 🎯 Minimal overhead - only processes ArrayBuffer WebSocket messages
- 📝 Console logging for debugging

## Installation

### Option 1: Browser DevTools Console

⚠️ **IMPORTANT**: Before running the script:
1. **Enable mute/deafen** yourself in Discord (click the microphone/speaker icons to turn them off)
2. Once the script is successfully running and you see the console message, you can **unmute/undeafen**

Steps:
1. Open Discord in your browser
2. Press `F12` to open DevTools
3. Go to **Console** tab
4. Paste the contents of `code.js` and press Enter
5. You should see: `found mute/deafen`
6. After confirmation, you can safely unmute/undeafen

### Disabling the Script

To disable the fake deafen script:

1. Open Discord DevTools Console again (`F12` → **Console**)
2. Paste the contents of `disable.js` and press Enter
3. You'll see: `Discord Fake Deafen: DISABLED`
4. The original WebSocket behavior is now restored

## How It Works

The script:
1. Saves the original WebSocket `send()` method
2. Overrides it with a custom function that:
   - Checks if the data is an ArrayBuffer
   - Decodes it to a string
   - If it contains `"self_deaf":false`, modifies it to `"self_deaf":true`
   - Re-encodes to ArrayBuffer and sends
3. Throttles modifications to once per 10 seconds to avoid detection

```javascript
const THROTTLE_TIME = 10000; // 10 seconds in milliseconds
```

Modify this value to change the throttle interval.

## Console Output

When active, you'll see:
```
found mute/deafen
```

## Disclaimer

⚠️ **Educational purposes only.** Using automation or modification tools on Discord violates the Terms of Service and may result in account suspension or ban. Use at your own risk.

## License

MIT
