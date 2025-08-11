function formatWithSuffix(value) {
  if (value >= 1e12) return (value / 1e12).toFixed(2) + " T";
  if (value >= 1e9) return (value / 1e9).toFixed(2) + " G";
  if (value >= 1e6) return (value / 1e6).toFixed(2) + " M";
  return value.toLocaleString();
}

const endpoint = "https://broad-cell-151e.schne564.workers.dev/";

fetch(endpoint)
  .then((res) => res.json())
  .then((data) => {
    document.getElementById("address").textContent = data.address;
    document.getElementById("workers").textContent = data.workers;
    document.getElementById("bestshare").textContent = formatWithSuffix(data.bestshare);
    document.getElementById("difficulty").textContent = data.difficulty.toLocaleString();
    document.getElementById("lastBlock").textContent = data.lastBlock;
    document.getElementById("chance").textContent = (data.chance * 100).toExponential(2) + " %";
  })
  .catch((err) => {
    console.error("Error fetching data:", err);
  });
