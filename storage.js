// storage.js
const Storage = {
  getRecords() {
    return JSON.parse(localStorage.getItem("records")) || [];
  },

  saveRecords(records) {
    localStorage.setItem("records", JSON.stringify(records));
  },

  addRecord(record) {
    const records = this.getRecords();
    records.push(record);
    this.saveRecords(records);
  },

  getCategories() {
    return JSON.parse(localStorage.getItem("categories")) || [
      "早餐", "午餐", "晚餐", "三餐外飲食", "玩", "日用品"
    ];
  },

  saveCategories(categories) {
    localStorage.setItem("categories", JSON.stringify(categories));
  }
};
