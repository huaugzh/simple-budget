// report.js
window.addEventListener("DOMContentLoaded", () => {
  const records = Storage.getRecords();
  const startAmount = JSON.parse(localStorage.getItem("monthly_start_amount")) || 0;

  // 計算收入支出總額
  const totalIncome = records.filter(r => r.type === "income").reduce((a, b) => a + b.amount, 0);
  const totalExpense = records.filter(r => r.type === "expense").reduce((a, b) => a + b.amount, 0);
  const balance = startAmount + totalIncome - totalExpense;

  document.getElementById("startAmount").textContent = startAmount;
  document.getElementById("totalIncome").textContent = totalIncome;
  document.getElementById("totalExpense").textContent = totalExpense;
  document.getElementById("balance").textContent = balance;

  // 各分類支出統計
  const expenseRecords = records.filter(r => r.type === "expense");
  const categoryTotals = {};
  expenseRecords.forEach(r => {
    categoryTotals[r.category] = (categoryTotals[r.category] || 0) + r.amount;
  });

  // 畫長條圖
  const barCtx = document.getElementById("categoryBarChart").getContext("2d");
  new Chart(barCtx, {
    type: "bar",
    data: {
      labels: Object.keys(categoryTotals),
      datasets: [{
        label: "支出金額",
        data: Object.values(categoryTotals),
        backgroundColor: "#60a5fa"
      }]
    },
    options: {
      scales: {
        y: { beginAtZero: true }
      },
      plugins: {
        legend: { display: false }
      }
    }
  });

  // 每日支出趨勢圖
  const dailyTotals = {};
  expenseRecords.forEach(r => {
    dailyTotals[r.date] = (dailyTotals[r.date] || 0) + r.amount;
  });

  // 對日期排序
  const dates = Object.keys(dailyTotals).sort();
  const amounts = dates.map(d => dailyTotals[d]);

  const lineCtx = document.getElementById("dailyLineChart").getContext("2d");
  new Chart(lineCtx, {
    type: "line",
    data: {
      labels: dates,
      datasets: [{
        label: "每日支出",
        data: amounts,
        borderColor: "#f87171",
        borderWidth: 2,
        tension: 0.3,
        fill: false
      }]
    },
    options: {
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
});
