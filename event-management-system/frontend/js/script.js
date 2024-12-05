const apiUrl = 'http://localhost:5000/api/events'; // URL da API

// Função para criar um evento
async function createEvent() {
    const name = document.getElementById('event-name').value;
    const date = document.getElementById('event-date').value;
    const location = document.getElementById('event-location').value;
    const description = document.getElementById('event-description').value;

    const eventData = { name, date, location, description };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventData),
        });

        if (response.ok) {
            alert('Evento cadastrado com sucesso!');
            // Limpa os campos manualmente
            document.getElementById('event-name').value = '';
            document.getElementById('event-date').value = '';
            document.getElementById('event-location').value = '';
            document.getElementById('event-description').value = '';
            fetchEvents(); // Atualiza a lista de eventos
        } else {
            const errorMessage = await response.text();
            alert(`Erro ao cadastrar o evento: ${errorMessage}`);
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao cadastrar o evento. Tente novamente mais tarde.');
    }
}

// Função para buscar eventos
async function fetchEvents() {
    try {
        const response = await fetch(apiUrl);
        const events = await response.json();
        const eventList = document.getElementById('events');
        eventList.innerHTML = ''; // Limpa a lista antes de atualizar

        events.forEach(event => {
            const li = document.createElement('li');
            li.textContent = `${event.name} - ${new Date(event.date).toLocaleDateString()} - ${event.location}`;
            eventList.appendChild(li);
        });
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao buscar eventos. Tente novamente mais tarde.');
    }
}

// Chama a função para buscar eventos ao carregar a página
window.onload = fetchEvents;

async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const loginData = { username, password };

    try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });

        if (response.ok) {
            const token = await response.text();
            localStorage.setItem('token', token); // Armazena o token no localStorage
            alert('Login bem-sucedido!');
            fetchEvents(); // Atualiza a lista de eventos após o login
        } else {
            const errorMessage = await response.text();
            alert(`Erro ao fazer login: ${errorMessage}`);
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao fazer login. Tente novamente mais tarde.');
    }
}