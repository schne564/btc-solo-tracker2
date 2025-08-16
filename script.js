let currentAddress = "bc1qd6mfkav3yzztuhpq6qg0kfm5fc2ay7jvy52rdn"; // default

function updateAddress() {
  const input = document.getElementById("btcAddress").value.trim();
  if (input) {
    currentAddress = input;
    fetchStats(); // refresh immediately
  }
}

function updateField(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value ?? "Unavailable";
}

async function fetchStats() {
  try {
    const res = await fetch(`https://broad-cell-151e.schne564.workers.dev/?address=${currentAddress}`);
    const data = await res.json();

    updateField("address", data.address);
    updateField("workers", data.workers);
    updateField("bestshare", data.bestshare);
    updateField("difficulty", data.difficulty);
    updateField("lastBlock", data.lastBlock);
    updateField("soloChance", data.soloChance);
    updateField("chancePerBlock", data.chancePerBlock);
    updateField("chancePerDay", data.chancePerDay);
    updateField("timeEstimate", data.timeEstimate);
    updateField("hashrate1hr", data.hashrate1hr);
    updateField("hashrate5m", data.hashrate5m);
    updateField("lastUpdated", "Last updated: " + new Date().toLocaleTimeString());

    if (data.newBestShare) notifyNewBestShare(data.bestshare);
  } catch (err) {
    console.error("Fetch error:", err);
    updateField("lastUpdated", "Error fetching data");
  }
}

// Initial fetch
fetchStats();

// Auto-refresh every 30 seconds
setInterval(fetchStats, 30000);
