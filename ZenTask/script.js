const passwordInput = document.querySelector('.LoginPassword');
const usernameInput = document.querySelector('.LoginUsername');
const loginForm = document.querySelector('#LoginForm'); 
const loginBtn = document.querySelector('.LoginButton');

passwordInput.addEventListener('focus', () => {
    passwordInput.type = 'text';
});

passwordInput.addEventListener('blur', () => {
    passwordInput.type = 'password';
});

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault(); 

    loginBtn.classList.add('button-loading');
    loginBtn.disabled = true;

    const UserData = {
        username: usernameInput.value,
        password: passwordInput.value
    };

    try {
        const response = await fetch("https://django-todo-api-1.onrender.com/api/auth/login/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(UserData)
        });

        const data = await response.json(); 

        if (response.ok) {
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refreshToken', data.refresh);
            window.location.href = "Dashboard/index.html";
        } else {
            alert(data.detail || "Login failed. Please check your credentials.");
        }
    } catch (error) {
        console.error("Network error:", error);
        alert("Could not connect to the server.");
    } finally {
        loginBtn.classList.remove('button-loading');
        loginBtn.disabled = false;
    }

}); 
