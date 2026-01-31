// Offscreen document script - plays chime when requested by the service worker.
// Required in MV3 because service workers cannot use the Audio API.

const chimeUrl = chrome.runtime.getURL("out/sounds/chime.mp3");

chrome.runtime.onMessage.addListener(
  (message, _sender, sendResponse) => {
    if (message.action === "playChime") {
      const audio = new Audio(chimeUrl);
      audio.volume = typeof message.volume === "number" ? message.volume : 0.5;
      audio.play().then(() => sendResponse({ played: true })).catch((err) => sendResponse({ played: false, error: err.message }));
      return true; // keep channel open for async sendResponse
    }
  }
);
