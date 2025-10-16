if (localStorage.getItem("loggedInUser")) {
  window.location.href = "dashboard.html";
}

document.getElementById("login-btn").addEventListener("click", () => {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    alert("請輸入帳號與密碼！");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    alert("帳號或密碼錯誤！");
    return;
  }

  localStorage.setItem("loggedInUser", username);
  alert("登入成功！");
  window.location.href = "dashboard.html";
});
