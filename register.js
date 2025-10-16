document.getElementById("register-btn").addEventListener("click", () => {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirm = document.getElementById("confirm").value.trim();

  if (!username || !password || !confirm) {
    alert("請完整填寫所有欄位！");
    return;
  }

  if (password !== confirm) {
    alert("兩次輸入的密碼不一致！");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  // 檢查帳號是否已存在
  if (users.find(u => u.username === username)) {
    alert("此帳號已被註冊！");
    return;
  }

  users.push({ username, password });
  localStorage.setItem("users", JSON.stringify(users));

  alert("註冊成功！請登入。");
  window.location.href = "login.html";
});
