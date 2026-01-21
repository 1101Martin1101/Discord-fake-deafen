(function() {
    var text = new TextDecoder("utf-8");
    var encoder = new TextEncoder();
    var lastModified = 0;
    const THROTTLE_TIME = 10000; // Throttle fake deafen - minimum 10s between each modification

    var originalSend = WebSocket.prototype.send;
    WebSocket.prototype.send = function(data) {
        if (Object.prototype.toString.call(data) === "[object ArrayBuffer]") {
            let decodedData = text.decode(data);
            if (decodedData.includes("self_deaf")) {
                const now = Date.now();
                if (now - lastModified > THROTTLE_TIME) {
                    console.log("found mute/deafen");
                    decodedData = decodedData.replace('"self_deaf":false', '"self_deaf":true');
                    data = encoder.encode(decodedData).buffer;
                    lastModified = now;
                }
            }
        }
        WebSocket.prototype.original.apply(this, [data]);
    }
})();