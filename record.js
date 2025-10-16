// record.js
window.addEventListener("DOMContentLoaded", () => {
  const recordList = document.getElementById("recordList");
  const modal = document.getElementById("editModal");
  const editAmount = document.getElementById("editAmount");
  const editNote = document.getElementById("editNote");
  const editCategory = document.getElementById("editCategory");
  const saveBtn = document.getElementById("saveEditBtn");
  const cancelBtn = document.getElementById("cancelEditBtn");

  const searchInput = document.getElementById("searchInput");
  const filterCategory = document.getElementById("filterCategory");

  let currentEditIndex = null;
  let allRecords = [];

  // 初始化分類篩選選單
  function initFilterCategories() {
    const categories = Storage.getCategories();
    categories.forEach(cat => {
      const opt = document.createElement("option");
      opt.value = cat;
      opt.textContent = cat;
      filterCategory.appendChild(opt);
    });
  }

  // 取得過濾後的紀錄
  function getFilteredRecords() {
    const keyword = searchInput.value.trim().toLowerCase();
    const selectedCat = filterCategory.value;

    return allRecords.filter(r => {
      const matchKeyword =
        r.category.toLowerCase().includes(keyword) ||
        r.note?.toLowerCase().includes(keyword) ||
        String(r.amount).includes(keyword);

      const matchCategory = selectedCat === "" || r.category === selectedCat;

      return matchKeyword && matchCategory;
    });
  }

  // 渲染紀錄
  function renderRecords() {
    allRecords = Storage.getRecords();
    const records = getFilteredRecords();
    recordList.innerHTML = "";

    if (records.length === 0) {
      recordList.innerHTML = "<p>查無符合條件的紀錄。</p>";
      return;
    }

    records.forEach((r, index) => {
      const li = document.createElement("li");
      li.className = "record-item";

      const typeEmoji = r.type === "income" ? "📈" : "📉";
      li.innerHTML = `
        <div>
          <strong>${typeEmoji} ${r.category}</strong> - ${r.note || "（無備註）"}
          <br>
          金額：${r.amount} 元　日期：${r.date}
        </div>
      `;

      const editBtn = document.createElement("button");
      editBtn.textContent = "編輯";
      editBtn.className = "edit-btn";
      editBtn.onclick = () => openEditModal(allRecords.indexOf(r));

      const delBtn = document.createElement("button");
      delBtn.textContent = "刪除";
      delBtn.className = "delete-btn";
      delBtn.onclick = () => {
        if (confirm("確定要刪除此筆紀錄嗎？")) {
          const newRecords = allRecords.filter(item => item !== r);
          Storage.saveRecords(newRecords);
          renderRecords();
        }
      };

      li.appendChild(editBtn);
      li.appendChild(delBtn);
      recordList.appendChild(li);
    });
  }

  // 編輯視窗邏輯（同前）
  function openEditModal(index) {
    const record = allRecords[index];
    currentEditIndex = index;

    editCategory.innerHTML = "";
    Storage.getCategories().forEach(cat => {
      const opt = document.createElement("option");
      opt.value = cat;
      opt.textContent = cat;
      if (cat === record.category) opt.selected = true;
      editCategory.appendChild(opt);
    });

    editAmount.value = record.amount;
    editNote.value = record.note || "";
    document.querySelectorAll("input[name='editType']").forEach(radio => {
      radio.checked = radio.value === record.type;
    });

    modal.classList.remove("hidden");
  }

  function closeModal() {
    modal.classList.add("hidden");
    currentEditIndex = null;
  }

  saveBtn.onclick = () => {
    if (currentEditIndex === null) return;
    const updated = {
      ...allRecords[currentEditIndex],
      amount: Number(editAmount.value),
      note: editNote.value,
      category: editCategory.value,
      type: document.querySelector("input[name='editType']:checked").value
    };

    allRecords[currentEditIndex] = updated;
    Storage.saveRecords(allRecords);
    closeModal();
    renderRecords();
  };

  cancelBtn.onclick = closeModal;
  modal.addEventListener("click", e => {
    if (e.target === modal) closeModal();
  });

  // 綁定搜尋與篩選事件
  searchInput.addEventListener("input", renderRecords);
  filterCategory.addEventListener("change", renderRecords);

  initFilterCategories();
  renderRecords();
});
