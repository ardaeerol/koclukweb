
// YKSPlatform/src/main/resources/static/js/admin.js
document.addEventListener("DOMContentLoaded", () => {
    const getDataBtn = document.getElementById("getDataBtn");
    const resultDiv = document.getElementById("result");

    // Sistem durumu kontrolü
    getDataBtn.addEventListener("click", () => {
        console.log("System Health Button clicked");

        fetch('http://localhost:8080/ykskocluk/admin_health')
            .then(response => response.text())
            .then(data => {
                resultDiv.textContent = data;
                console.log("Data received:", data);
            })
            .catch(error => {
                resultDiv.textContent = "Error: " + error;
                console.error("Error:", error);
            });
    });
});
