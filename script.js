document.addEventListener("DOMContentLoaded", function() {
    initializeCalendar();
    initializeCountdown();
    initializeAnniversaireAnimation();
});

// Calendar functionality
function initializeCalendar() {
    const monthYear = document.getElementById("monthYear");
    const calendarBody = document.getElementById("calendarBody");
    const prevMonth = document.getElementById("prevMonth");
    const nextMonth = document.getElementById("nextMonth");
    let currentDate = new Date();

    function renderCalendar(date) {
        calendarBody.innerHTML = "";
        const year = date.getFullYear();
        const month = date.getMonth();
        monthYear.textContent = date.toLocaleString("fr-FR", { month: "long", year: "numeric" });
        
        const firstDay = new Date(year, month, 1).getDay();
        // Ajustement pour commencer la semaine le lundi
        const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        let row = document.createElement("tr");
        
        for (let i = 0; i < adjustedFirstDay; i++) {
            let emptyCell = document.createElement("td");
            emptyCell.classList.add("empty");
            row.appendChild(emptyCell);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            let cell = document.createElement("td");
            cell.textContent = day;
            
            const cellDate = new Date(year, month, day);
            if (cellDate < new Date()) {
                cell.classList.add('past-day');
                cell.style.backgroundImage = "url('image.png')";
            }
            
            row.appendChild(cell);
            if ((adjustedFirstDay + day) % 7 === 0) {
                calendarBody.appendChild(row);
                row = document.createElement("tr");
            }
        }
        calendarBody.appendChild(row);
    }

    prevMonth.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });

    nextMonth.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });

    renderCalendar(currentDate);
}

// Countdown functionality
function initializeCountdown() {
    const targetDate = new Date("February 15, 2026 00:00:00").getTime();

    const interval = setInterval(function() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerHTML = days;
        document.getElementById("hours").innerHTML = hours;
        document.getElementById("minutes").innerHTML = minutes;
        document.getElementById("seconds").innerHTML = seconds;

        if (distance < 0) {
            clearInterval(interval);
            document.getElementById("countdown").innerHTML = "Le compte à rebours est terminé!";
        }
    }, 1000);
}

// Anniversary animation functionality
function initializeAnniversaireAnimation() {
    const container = document.querySelector('.anniversaire-container');
    let balloonCount = 0;
    let lastBalloonTopPosition = 0;
    const balloonsMultiplier = 10;
    const totalBalloons = 9 * balloonsMultiplier;

    function createBalloons() {
        for (let set = 0; set < balloonsMultiplier; set++) {
            for (let i = 1; i <= 3; i++) {
                for (let j = 1; j <= 3; j++) {
                    const balloon = document.createElement('img');
                    balloon.src = `ballon-${i}-${j}.png`;
                    balloon.classList.add('balloon');
                    
                    balloon.style.left = `${Math.random() * 100}%`;
                    balloon.style.bottom = `${-150 - (Math.random() * 2000)}px`;
                    
                    balloon.style.animation = `flyUp 3s linear forwards`;
                    
                    balloon.addEventListener('animationend', () => {
                        const balloonRect = balloon.getBoundingClientRect();
                        lastBalloonTopPosition = Math.min(lastBalloonTopPosition, balloonRect.top);
                        
                        balloonCount++;
                        balloon.remove();
                        
                        if (balloonCount === totalBalloons) {
                            const additionalDelay = Math.max(0, -lastBalloonTopPosition);
                            
                            setTimeout(() => {
                                document.getElementById('anniversaire-message').style.display = 'block';
                                setTimeout(() => {
                                    container.style.display = 'none';
                                }, 3000);
                            }, additionalDelay);
                        }
                    });
                    
                    container.appendChild(balloon);
                }
            }
        }
    }

    const today = new Date();  // Force la date au 15 février

    if (today.getDate() === 15 && today.getMonth() === 1 && today.getFullYear() === 2026) {
        const h1 = document.querySelector('h1');
        if (h1) {
            h1.textContent = "RIP LA VINGTAINE";
        }
    }


    if (today.getDate() === 15 && today.getMonth() === 1) {  // 1 = février
        createBalloons();
    } else {
        container.style.display = 'none';

        console.log("Ce n'est pas le 15 février, l'animation ne sera pas lancée.");
    }
    
    
}

