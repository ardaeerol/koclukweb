

// YKSPlatform/src/main/resources/static/js/student.js
document.addEventListener("DOMContentLoaded", () => {
    const getDataBtn = document.getElementById("getDataBtn");
    const resultDiv = document.getElementById("result");
    const listCoachesBtn = document.getElementById("listCoachesBtn");
    const filterCoachesBtn = document.getElementById("filterCoachesBtn");
    const coachesListDiv = document.getElementById("coachesList");
    const viewScheduleBtn = document.getElementById("viewScheduleBtn");
    const scheduleViewDiv = document.getElementById("scheduleView");
    const messagesBtn = document.getElementById("messagesBtn");

    // Sistem durumu kontrolü
    getDataBtn.addEventListener("click", () => {
        console.log("System Health Button clicked");

        fetch('http://localhost:8080/ykskocluk/student_health')
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

    // Koçları listeleme
    listCoachesBtn.addEventListener("click", () => {
        console.log("List Coaches Button clicked");

        fetch('http://localhost:8080/coaches')
            .then(response => response.json())
            .then(data => {
                coachesListDiv.innerHTML = '';
                data.forEach(coach => {
                    const coachDiv = document.createElement('div');
                    coachDiv.classList.add('coach-item');
                    coachDiv.innerHTML = `
                        <h3>${coach.fullName}</h3>
                        <p>Uzmanlık: ${coach.expertise}</p>
                        <p>Rating: ${coach.rating}</p>
                        <button onclick="viewCoachProfile(${coach.coachID})">Profili Görüntüle</button>
                    `;
                    coachesListDiv.appendChild(coachDiv);
                });
            })
            .catch(error => {
                coachesListDiv.textContent = "Error: " + error;
                console.error("Error:", error);
            });
    });

    // Filtreleme (Basit bir örnek)
    filterCoachesBtn.addEventListener("click", () => {
        const expertise = prompt("Filtrelemek istediğiniz uzmanlık alanını girin (örn: Math, Physics):");
        if (expertise) {
            fetch(`http://localhost:8080/coaches?expertise=${expertise}`)
                .then(response => response.json())
                .then(data => {
                    coachesListDiv.innerHTML = '';
                    data.forEach(coach => {
                        const coachDiv = document.createElement('div');
                        coachDiv.classList.add('coach-item');
                        coachDiv.innerHTML = `
                            <h3>${coach.fullName}</h3>
                            <p>Uzmanlık: ${coach.expertise}</p>
                            <p>Rating: ${coach.rating}</p>
                            <button onclick="viewCoachProfile(${coach.coachID})">Profili Görüntüle</button>
                        `;
                        coachesListDiv.appendChild(coachDiv);
                    });
                })
                .catch(error => {
                    coachesListDiv.textContent = "Error: " + error;
                    console.error("Error:", error);
                });
        }
    });

    // Ders programını görüntüleme
    viewScheduleBtn.addEventListener("click", () => {
        fetch('http://localhost:8080/students/me') // Öğrencinin kendi bilgilerini çekmek için bir endpoint
            .then(response => response.json())
            .then(data => {
                scheduleViewDiv.innerHTML = `<pre>${data.studySchedule}</pre>`;
            })
            .catch(error => {
                scheduleViewDiv.textContent = "Error: " + error;
                console.error("Error:", error);
            });
    });

    // Mesajları görüntüleme (Basit bir örnek)
    messagesBtn.addEventListener("click", () => {
        window.location.href = 'http://localhost:8080/student/messages'; // Mesajlaşma sayfasına yönlendirme
    });
});

// Koç profilini görüntüleme fonksiyonu
function viewCoachProfile(coachID) {
    window.location.href = `http://localhost:8080/coach/profile/${coachID}`;
}
