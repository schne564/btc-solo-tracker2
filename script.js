const endpoint = "https://broad-cell-151e.schne564.workers.dev/";

fetch(endpoint)
  .then((res) => res.json())
  .then((data) => {
    document.getElementById("address").textContent = data.address;
    document.getElementById("workers").textContent = data.workers;
    document.getElementById("bestshare").textContent = data.bestshare.toLocaleString();
    document.getElementById("difficulty").textContent = data.difficulty.toLocaleString();
    document.getElementById("lastBlock").textContent = data.lastBlock;
    document.getElementById("chance").textContent = (data.chance * 100).toExponential(2) + " %";
  })
  .catch((err) => {
    console.error("Error fetching data:", err);
  });
