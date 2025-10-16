// start.js
window.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("startForm");
  const input = document.getElementById("startAmountInput");
  const currentAmount = document.getElementById("currentAmount");

  // 顯示目前的月初金額
  const savedAmount = JSON.parse(localStorage.getItem("monthly_start_amount")) || 0;
  if (savedAmount) currentAmount.textContent = savedAmount + " 元";

  // 提交儲存
  form.addEventListener("submit", e => {
    e.preventDefault();
    const amount = Number(input.value);
    if (amount < 0) return alert("金額不能是負的！");
    
    localStorage.setItem("monthly_start_amount", JSON.stringify(amount));
    currentAmount.textContent = amount + " 元";
    alert("✅ 已更新月初金額！");
    input.value = "";
  });
});
