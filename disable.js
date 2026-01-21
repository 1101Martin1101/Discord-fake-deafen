(function() {
    // Restore original WebSocket.send method
    if (window.__originalWebSocketSend) {
        WebSocket.prototype.send = window.__originalWebSocketSend;
        console.log("Discord Fake Deafen: DISABLED");
    } else {
        console.log("Discord Fake Deafen: Script not found or already disabled");
    }
})();
