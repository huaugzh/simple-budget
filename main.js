document.getElementById("add-btn").addEventListener("click", () => {
  const date = document.getElementById("record-date").value;
  const category = document.getElementById("record-category").value;
  const amount = document.getElementById("record-amount").value;
  const note = document.getElementById("record-note").value;

  if (!date || !amount) {
    alert("請填寫日期與金額！");
    return;
  }

  const newRecord = { date, category, amount: parseFloat(amount), note };
  addRecord(newRecord);

  // 清空輸入欄位
  document.getElementById("record-date").value = "";
  document.getElementById("record-amount").value = "";
  document.getElementById("record-note").value = "";
});

let records = JSON.parse(localStorage.getItem("records")) || [];

function saveToLocal() {
  localStorage.setItem("records", JSON.stringify(records));
}

function renderRecords() {
  const recordList = document.getElementById("record-list");
  recordList.innerHTML = "";

  records.forEach((record, index) => {
    const li = document.createElement("li");
    li.className = "record-item";
    li.innerHTML = `
      <span>${record.date} | ${record.category} | ${record.amount}元 | ${record.note}</span>
      <div>
        <button onclick="editRecord(${index})">🔧</button>
        <button onclick="deleteRecord(${index})">🗑️</button>
      </div>
    `;
    recordList.appendChild(li);
  });
}

function addRecord(record) {
  records.push(record);
  saveToLocal();
  renderRecords();
}

function deleteRecord(index) {
  records.splice(index, 1);
  saveToLocal();
  renderRecords();
}

function editRecord(index) {
  const newAmount = prompt("修改金額", records[index].amount);
  const newNote = prompt("修改備註", records[index].note);

  if (newAmount !== null && newNote !== null) {
    records[index].amount = newAmount;
    records[index].note = newNote;
    saveToLocal();
    renderRecords();
  }
}

// 初始化載入
document.addEventListener("DOMContentLoaded", renderRecords);

