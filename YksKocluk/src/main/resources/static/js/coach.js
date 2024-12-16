

// YKSPlatform/src/main/resources/static/js/coach.js
document.addEventListener("DOMContentLoaded", () => {
    const getDataBtn = document.getElementById("getDataBtn");
    const resultDiv = document.getElementById("result");
    const editProfileBtn = document.getElementById("editProfileBtn");
    const viewBookingsBtn = document.getElementById("viewBookingsBtn");
    const bookingsListDiv = document.getElementById("bookingsList");
    const viewMessagesBtn = document.getElementById("viewMessagesBtn");
    const messagesListDiv = document.getElementById("messagesList");

    // Sistem durumu kontrolü
    getDataBtn.addEventListener("click", () => {
        console.log("System Health Button clicked");

        fetch('http://localhost:8080/ykskocluk/coach_health')
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

    // Profil düzenleme
    editProfileBtn.addEventListener("click", () => {
        window.location.href = '/coach/editProfile';
    });

    // Randevuları görüntüleme
    viewBookingsBtn.addEventListener("click", () => {
        fetch('http://localhost:8080/bookings/coach') // Koçun kendi randevularını çekmek için bir endpoint
            .then(response => response.json())
            .then(data => {
                bookingsListDiv.innerHTML = '';
                data.forEach(booking => {
                    const bookingDiv = document.createElement('div');
                    bookingDiv.classList.add('booking-item');
                    bookingDiv.innerHTML = `
                        <p>Öğrenci: ${booking.studentName}</p>
                        <p>Tarih: ${booking.bookingDate}</p>
                        <p>Durum: ${booking.status}</p>
                        <button onclick="respondBooking(${booking.bookingID}, 'confirmed')">Onayla</button>
                        <button onclick="respondBooking(${booking.bookingID}, 'cancelled')">İptal Et</button>
                    `;
                    bookingsListDiv.appendChild(bookingDiv);
                });
            })
            .catch(error => {
                bookingsListDiv.textContent = "Error: " + error;
                console.error("Error:", error);
            });
    });

    // Mesajları görüntüleme
    viewMessagesBtn.addEventListener("click", () => {
        window.location.href = '/coach/messages'; // Mesajlaşma sayfasına yönlendirme
    });
});

// Randevu yanıtı verme fonksiyonu
function respondBooking(bookingID, status) {
    fetch(`http://localhost:8080/bookings/${bookingID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: status })
    })
    .then(response => response.json())
    .then(data => {
        alert(`Randevu ${status} edildi.`);
        // Randevuları yeniden yükleme
        document.getElementById("viewBookingsBtn").click();
    })
    .catch(error => {
        console.error("Error updating booking status:", error);
        alert("Randevu güncellenirken hata oluştu.");
    });
}
