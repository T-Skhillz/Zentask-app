const UsernameInput = document.querySelector(".SignInUsername")
const passwordInput = document.querySelector(".SignInPassword")
const ConfirmPasswordInput = document.querySelector(".ConfirmPassword")
const SignInForm = document.querySelector("#SignInInputForm")
const SignInBtn = document.querySelector(".SignInButton")
const EmailInput = document.querySelector(".UserEmail")

passwordInput.addEventListener('focus', () => {
    passwordInput.type = 'text';
});

passwordInput.addEventListener('blur', () => {
    passwordInput.type = 'password';
});

const pass = passwordInput.value;
const Confirmpass = ConfirmPasswordInput.value;

SignInForm.addEventListener('submit', async (e) => {
    e.preventDefault(); 

    
    SignInBtn.textContent = "Signing In...";
    SignInBtn.disabled = true;

    const UserData = {
        username: UsernameInput.value,
        email: EmailInput.value,
        password: passwordInput.value,
        password2: ConfirmPasswordInput.value,
    };

    if (pass!= Confirmpass){
    alert("Passwords do not match, please try again.")    
    return;
    }

    try{
        const response = await fetch("https://django-todo-api-1.onrender.com/register/",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(UserData)
        })
        const result = await response.json();

        if (response.ok) {
            alert("Success!");
            window.location.href = "../Dashboard/index.html";
        } else {
            alert("Error: " + JSON.stringify(result));
            SignInBtn.disabled = false;
            SignInBtn.textContent = "Sign In";
        }
    } catch (error) { // <--- THIS WAS MISSING
        console.error("Network error:", error);
        alert("Cannot connect to server.");
        SignInBtn.disabled = false;
        SignInBtn.textContent = "Sign In";
    }
});
