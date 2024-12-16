const getDataBtn = document.getElementById("getDataBtn");
const resultDiv = document.getElementById("result");

getDataBtn.addEventListener("click", () => {
    console.log("Button clicked");

    fetch('http://localhost:8080/ykskocluk/home_health')
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