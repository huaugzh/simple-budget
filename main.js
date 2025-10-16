// main.js

// 從 localStorage 取出所有記帳資料
const records = JSON.parse(localStorage.getItem("records")) || [];

// 計算收入、支出、餘額
let totalIncome = 0;
let totalExpense = 0;

records.forEach(r => {
  if (r.type === "income") totalIncome += r.amount;
  else totalExpense += r.amount;
});

const balance = totalIncome - totalExpense;

// 更新畫面上的文字
document.getElementById("balance").textContent = `$${balance}`;
document.getElementById("summary").textContent = `收入 $${totalIncome} / 支出 $${totalExpense}`;

// ---------- 支出分類圓餅圖 ----------
const expenseData = {};

records
  .filter(r => r.type === "expense")
  .forEach(r => {
    if (!expenseData[r.category]) expenseData[r.category] = 0;
    expenseData[r.category] += r.amount;
  });

const ctxPie = document.getElementById("expenseChart").getContext("2d");
new Chart(ctxPie, {
  type: "pie",
  data: {
    labels: Object.keys(expenseData),
    datasets: [{
      data: Object.values(expenseData),
      backgroundColor: [
        "#4e79a7", "#f28e2b", "#e15759", "#76b7b2", "#59a14f", "#edc948"
      ],
    }]
  },
  options: {
    plugins: {
      legend: { position: "bottom" }
    }
  }
});

// ---------- 支出趨勢圖 ----------
const trendByDate = {};

records
  .filter(r => r.type === "expense")
  .forEach(r => {
    if (!trendByDate[r.date]) trendByDate[r.date] = 0;
    trendByDate[r.date] += r.amount;
  });

const ctxLine = document.getElementById("trendChart").getContext("2d");
new Chart(ctxLine, {
  type: "line",
  data: {
    labels: Object.keys(trendByDate),
    datasets: [{
      label: "每日支出",
      data: Object.values(trendByDate),
      fill: false,
      tension: 0.3
    }]
  }
});
