

let Login = {
    render: async () => {
        return `
        <body>
            <header>
                <a href="/" id="logo">Chat</a>
                <nav>
                    <button><i class="far fa-moon"></i></button>
                </nav>
            </header>
            <main>
                <form class="login-form" id="login-form" method="POST">
                    <input type="text" placeholder="email" name="email" required />
                    <input type="password" placeholder="password" name="password" maxlength="30" required />
                    <input type="submit" value="LOGIN">
                    <a class="login-a" href="/#/register">Create an account</a>
                </form>
            </main>
        </body>
        `;
    },

    afterRender: async() => {
        const loginForm = document.querySelector('#login-form');
        
        loginForm.addEventListener('submit', e => {
            e.preventDefault();
            const email = loginForm['email'].value;
            const password = loginForm['password'].value;
            auth.signInWithEmailAndPassword(email, password).then(() => {
                auth.onAuthStateChanged(firebaseUser => {
                    if(firebaseUser){
                        alert(`User ${firebaseUser.email } authorized successfully!`);
                        window.location.hash = '/chat';
                    }
                });
            }).catch(e => {
                alert(e.message);
            });
        });
    }
};

export default Login;