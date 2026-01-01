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

SignInForm.addEventListener('submit', async (e) => {
    e.preventDefault(); 

    // Get password values inside the submit handler (FIX #1)
    const pass = passwordInput.value;
    const Confirmpass = ConfirmPasswordInput.value;

    // Check if passwords match before making API call
    if (pass !== Confirmpass) {
        alert("Passwords do not match, please try again.")    
        return;
    }

    SignInBtn.textContent = "Signing Up...";
    SignInBtn.disabled = true;

    const UserData = {
        username: UsernameInput.value,
        email: EmailInput.value,
        password: passwordInput.value,
        password2: ConfirmPasswordInput.value,
    };

    try {
        const response = await fetch("https://django-todo-api-1.onrender.com/register/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(UserData)
        })
        const result = await response.json();

        if (response.ok) {
            // FIX #2: Store tokens after successful registration
            if (result.access && result.refresh) {
                localStorage.setItem('access_token', result.access);
                localStorage.setItem('refreshToken', result.refresh);
            }
            
            alert("Account created successfully!");
            window.location.href = "../Dashboard/index.html";
        } else {
            alert("Error: " + JSON.stringify(result));
            SignInBtn.disabled = false;
            SignInBtn.textContent = "Sign Up";
        }
    } catch (error) {
        console.error("Network error:", error);
        alert("Cannot connect to server.");
        SignInBtn.disabled = false;
        SignInBtn.textContent = "Sign Up";
    }
});









// const UsernameInput = document.querySelector(".SignInUsername")
// const passwordInput = document.querySelector(".SignInPassword")
// const ConfirmPasswordInput = document.querySelector(".ConfirmPassword")
// const SignInForm = document.querySelector("#SignInInputForm")
// const SignInBtn = document.querySelector(".SignInButton")
// const EmailInput = document.querySelector(".UserEmail")

// passwordInput.addEventListener('focus', () => {
//     passwordInput.type = 'text';
// });

// passwordInput.addEventListener('blur', () => {
//     passwordInput.type = 'password';
// });

// const pass = passwordInput.value;
// const Confirmpass = ConfirmPasswordInput.value;

// SignInForm.addEventListener('submit', async (e) => {
//     e.preventDefault(); 

    
//     SignInBtn.textContent = "Signing In...";
//     SignInBtn.disabled = true;

//     const UserData = {
//         username: UsernameInput.value,
//         email: EmailInput.value,
//         password: passwordInput.value,
//         password2: ConfirmPasswordInput.value,
//     };

//     if (pass!= Confirmpass){
//     alert("Passwords do not match, please try again.")    
//     return;
//     }

//     try{
//         const response = await fetch("https://django-todo-api-1.onrender.com/register/",{
//             method: "POST",
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(UserData)
//         })
//         const result = await response.json();

//         if (response.ok) {
//             alert("Success!");
//             window.location.href = "../Dashboard/index.html";
//         } else {
//             alert("Error: " + JSON.stringify(result));
//             SignInBtn.disabled = false;
//             SignInBtn.textContent = "Sign In";
//         }
//     } catch (error) { // <--- THIS WAS MISSING
//         console.error("Network error:", error);
//         alert("Cannot connect to server.");
//         SignInBtn.disabled = false;
//         SignInBtn.textContent = "Sign In";
//     }
// });
