function formatWithSuffix(value) {
  if (value >= 1e12) return (value / 1e12).toFixed(2) + " T";
  if (value >= 1e9) return (value / 1e9).toFixed(2) + " G";
  if (value >= 1e6) return (value / 1e6).toFixed(2) + " M";
  if (value >= 1e3) return (value / 1e3).toFixed(2) + " K";
  return value?.toLocaleString?.() ?? "Unavailable";
}

const endpoint = "https://broad-cell-151e.schne564.workers.dev/";

function notifyNewBestShare(bestShare) {
  const badge = document.createElement("div");
  badge.textContent = `🎉 New Best Share: ${bestShare.toLocaleString()}`;
  badge.style.position = "fixed";
  badge.style.top = "20px";
  badge.style.right = "20px";
  badge.style.background = "#28a745";
  badge.style.color = "#fff";
  badge.style.padding = "10px 20px";
  badge.style.borderRadius = "8px";
  badge.style.boxShadow = "0 0 10px rgba(0,0,0,0.3)";
  badge.style.zIndex = "9999";
  badge.style.fontSize = "16px";
  document.body.appendChild(badge);

  // Remove after 5 seconds
  setTimeout(() => badge.remove(), 5000);

  // Optional: Play sound
  const audio = new Audio("https://assets.mixkit.co/sfx/download/mixkit-achievement-bell-600.wav");
  audio.play();
}

// Example usage after fetching Worker data
fetch("https://broad-cell-151e.schne564.workers.dev/?address=bc1qd6mfkav3yzztuhpq6qg0kfm5fc2ay7jvy52rdn")
  .then(res => res.json())
  .then(data => {
    if (data.newBestShare) {
      notifyNewBestShare(data.bestshare);
    }
    // Continue rendering dashboard...
  });

function updateStats() {
  fetch(endpoint)
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("address").textContent = data.address;
      document.getElementById("workers").textContent = formatWithSuffix(data.workers);
      document.getElementById("bestshare").textContent = formatWithSuffix(data.bestshare);
      document.getElementById("shares").textContent = formatWithSuffix(data.shares);
      document.getElementById("difficulty").textContent = formatWithSuffix(data.difficulty);
      document.getElementById("lastBlock").textContent = formatWithSuffix(data.lastBlock);
      document.getElementById("soloChance").textContent = data.soloChance;
      document.getElementById("hashrate1hr").textContent = data.hashrate1hr;
      document.getElementById("hashrate5m").textContent = data.hashrate5m;
      document.getElementById("chancePerBlock").textContent = data.chancePerBlock;
      document.getElementById("chancePerDay").textContent = data.chancePerDay;
      document.getElementById("timeEstimate").textContent = data.timeEstimate;
      document.getElementById("lastUpdated").textContent = "Last updated: " + new Date().toLocaleTimeString();
    })
    .catch((err) => {
      console.error("Error fetching data:", err);
      document.getElementById("lastUpdated").textContent = "Error fetching data";
    });
}

// Initial fetch
updateStats();

// Auto-refresh every 30 seconds
setInterval(updateStats, 30000);
