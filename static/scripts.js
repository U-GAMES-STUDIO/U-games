// Inicjalizacja po załadowaniu strony
document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initScrollProgress();
    initParallax();
    initFilters();
    initSmoothScroll();
});

// Custom cursor
function initCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorInner = document.querySelector('.cursor-inner');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        cursorInner.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    });

    document.addEventListener('mousedown', () => {
        cursor.classList.add('cursor-click');
        cursorInner.classList.add('cursor-click');
    });

    document.addEventListener('mouseup', () => {
        cursor.classList.remove('cursor-click');
        cursorInner.classList.remove('cursor-click');
    });

    // Efekt hover na linkach
    const links = document.querySelectorAll('a, button');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursorInner.style.transform = 'scale(0.5)';
        });
        link.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursorInner.style.transform = 'scale(1)';
        });
    });
}

// Pasek postępu przewijania
function initScrollProgress() {
    const progressBar = document.querySelector('.progress-bar');
    
    window.addEventListener('scroll', () => {
        const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.pageYOffset / totalScroll) * 100;
        progressBar.style.width = `${progress}%`;
    });
}

// Efekt parallax
function initParallax() {
    const elements = document.querySelectorAll('.floating-element');
    
    window.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;async function enhancedDiscordIntegration() {
            try {
                const response = await fetch('https://discord.com/api/guilds/1323385215783014484/widget.json');
                const data = await response.json();
                
                // Server stats
                document.getElementById('discord-data').innerHTML = `
                    <h3>${data.name}</h3>
                    <div class="server-stats">
                        <div class="stat-item">
                            <h4>${data.presence_count}</h4>
                            <p>Online</p>
                        </div>
                        <div class="stat-item">
                            <h4>${data.members.length}</h4>
                            <p>Active Members</p>
                        </div>
                        <div class="stat-item">
                            <h4>${data.channels.length}</h4>
                            <p>Channels</p>
                        </div>
                    </div>
                `;
        
                // Active members list
                document.getElementById('discord-presence').innerHTML = `
                    <h3>Active Members</h3>
                    <div class="members-list">
                        ${data.members.map(member => `
                            <div class="member">
                                <img src="${member.avatar_url}" alt="${member.username}">
                                <div class="member-info">
                                    <h4>${member.username}</h4>
                                    <p>${member.game ? member.game.name : 'Online'}</p>
                                </div>
                                <span class="member-status status-${member.status}"></span>
                            </div>
                        `).join('')}
                    </div>
                `;
            } catch (error) {
                console.error('Error fetching Discord data:', error);
            }
        }
        
        // Add to existing DOMContentLoaded event listener
        document.addEventListener('DOMContentLoaded', () => {
            // ... existing code ...
            enhancedDiscordIntegration();
            initDiscordWidgets();
        });

        function initDiscordWidgets() {
            // Staff DM Widget
            const staffMembers = [
                { id: 'owner1_id', name: 'Anna Kowalska', role: 'CEO', avatar: 'person1.jpg' },
                { id: 'owner2_id', name: 'Jan Nowak', role: 'Lead Developer', avatar: 'person2.jpg' }
            ];

            const staffList = document.getElementById('staffList');
            staffList.innerHTML = staffMembers.map(staff => `
                <div class="staff-member" onclick="openDiscordDM('${staff.id}')">
                    <img src="${staff.avatar}" alt="${staff.name}" width="40" height="40">
                    <div>
                        <h4>${staff.name}</h4>
                        <p>${staff.role}</p>
                    </div>
                    <button class="dm-btn">Send DM</button>
                </div>
            `).join('');

            // Events Widget
            const events = [
                { name: 'Game Launch Party', date: '2024-02-20', time: '18:00 UTC' },
                { name: 'Community Game Night', date: '2024-02-25', time: '20:00 UTC' }
            ];

            const eventsList = document.getElementById('eventsList');
            eventsList.innerHTML = events.map(event => `
                <div class="event-item">
                    <h4>${event.name}</h4>
                    <p>📅 ${event.date} at ${event.time}</p>
                    <button class="event-remind-btn">Set Reminder</button>
                </div>
            `).join('');
        }

        function openDiscordDM(userId) {
            window.open(`discord:///users/${userId}`, '_blank');
        }        
        // Refresh Discord data periodically
        setInterval(enhancedDiscordIntegration, 60000); // Updates every minute
        
        const centerY = window.innerHeight / 2;

        elements.forEach(element => {
            const moveX = (clientX - centerX) * 0.05;
            const moveY = (clientY - centerY) * 0.05;
            element.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
}

// Filtrowanie projektów
function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Usuń aktywną klasę ze wszystkich przycisków
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projects.forEach(project => {
                if (filterValue === 'all') {
                    project.style.display = 'block';
                    setTimeout(() => project.style.opacity = '1', 0);
                } else if (project.getAttribute('data-category') === filterValue) {
                    project.style.display = 'block';
                    setTimeout(() => project.style.opacity = '1', 0);
                } else {
                    project.style.opacity = '0';
                    setTimeout(() => project.style.display = 'none', 300);
                }
            });
        });
    });
}

// Płynne przewijanie
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Animacja ładowania
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    loader.classList.add('loader-hidden');
    
    setTimeout(() => {
        loader.style.display = 'none';
    }, 1000);
});

// Animacje przy przewijaniu
window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.fade-up');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
        }
    });
});
// Dodaj do istniejącego scripts.js
function initGameCards() {
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach(card => {
        card.addEventListener('click', () => {
            const gameId = card.getAttribute('data-game-id');
            window.location.href = `/game-details.html?id=${gameId}`;
        });
    });
}
