// category.js
window.addEventListener("DOMContentLoaded", () => {
  const categoryList = document.getElementById("categoryList");
  const form = document.getElementById("addCategoryForm");
  const newCategoryInput = document.getElementById("newCategory");

  function renderCategories() {
    const categories = Storage.getCategories();
    categoryList.innerHTML = "";

    categories.forEach((c, index) => {
      const li = document.createElement("li");
      li.textContent = c;

      const delBtn = document.createElement("button");
      delBtn.textContent = "刪除";
      delBtn.className = "delete-btn";
      delBtn.onclick = () => {
        if (confirm(`確定要刪除分類「${c}」嗎？`)) {
          const newList = categories.filter((_, i) => i !== index);
          Storage.saveCategories(newList);
          renderCategories();
        }
      };

      li.appendChild(delBtn);
      categoryList.appendChild(li);
    });
  }

  form.addEventListener("submit", e => {
    e.preventDefault();
    const newCategory = newCategoryInput.value.trim();
    if (!newCategory) return alert("請輸入分類名稱");
    
    const categories = Storage.getCategories();
    if (categories.includes(newCategory)) {
      return alert("這個分類已經存在！");
    }

    categories.push(newCategory);
    Storage.saveCategories(categories);
    newCategoryInput.value = "";
    renderCategories();
  });

  renderCategories();
});

