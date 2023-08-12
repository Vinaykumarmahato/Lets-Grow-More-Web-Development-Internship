const loginForm = document.getElementById("loginForm");
const resultContainer = document.getElementById("resultContainer");
const usernameSpan = document.getElementById("usernameSpan");
const resultTableBody = document.getElementById("resultTableBody");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = event.target.username.value;
  const password = event.target.password.value;
  // Perform login validation here (not implemented in this example)

  // If login is successful (replace this with real logic):
  usernameSpan.textContent = username;
  loginForm.style.display = "none";
  resultContainer.style.display = "block";

  // Simulate fetching results from the server (replace this with real API calls):
  const mockResults = [
    { subject: "Math", score: 85 },
    { subject: "Science", score: 92 },
    { subject: "English", score: 78 },
  ];

  mockResults.forEach((result) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${result.subject}</td><td>${result.score}</td>`;
    resultTableBody.appendChild(row);
  });
});
