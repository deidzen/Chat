import * as database from './../services/database.js';

let Register = {
    render: async() => {
        return `
        <body>
            <header>
                <a href="/" id="logo">Chat</a>
                <nav>
                    <a href="#"><i class="far fa-moon"></i></a>
                </nav>
            </header>
            <main>
                <form class="register-form" id="register-form" method="POST">
                    <input type="text" placeholder="email" name="email" id="email" maxlength="30" required />
                    <input type="password" placeholder="password" name="password" id="password" maxlength="30" required />
                    <input type="password" placeholder="confirm password" name="confirm" id="confirm" maxlength="30" required />
                    <input type="text" placeholder="nickname" name="nickname" id="nickname" maxlength="30" required />
                    <input type="submit" id="register-btn" value="REGISTER">
                    <p>
                        Registered? Just
                        <a class="register-a" href="/#">login</a>
                    </p>
                </form>
            </main>
        </body>
        `;
    },

    afterRender: async() => {
        window.location.hash = '/register';
        const regForm = document.querySelector('#register-form');
        let isSuccessful = true;

        regForm.addEventListener('submit', e => {
            e.preventDefault();
            const email = regForm['email'].value;
            const password = regForm['password'].value;
            const confirm = regForm['confirm'].value;
            const nickname = regForm['nickname'].value;
            if (password !== confirm) {
                alert('Passwords are not equal');
            } else if (email === '' | password === '' | confirm === '' | nickname === '') {
                alert('Fields can\'t be empty');
            } else {
                const promise = auth.createUserWithEmailAndPassword(email, password);
                promise
                    .then(async function (newUser) {
                        let uid = newUser.user.uid;
                        
                        db.ref('/users/' + uid).set({
                            nickname: nickname,
                            email: email
                        });
                    })
                    .catch(e => {
                        alert(e.message);
                        isSuccessful = false;
                });
            }
            if (isSuccessful) {
                auth.onAuthStateChanged(firebaseUser => {
                    if (firebaseUser) {
                        alert(`User ${firebaseUser.email } registered successfully!`);
                        window.location.hash = '/chat';
                    }
                });
            }
        });
    }
};

export default Register;