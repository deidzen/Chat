import * as database from './../services/database.js';

let AddChat = {
    render: async () => {
        return `
        <body>
            <header>
                <a href="/#/chat" id="logo">Chat</a>
                <nav>
                    <a href="#"><i class="far fa-moon"></i></a>
                    <a href="#/add-chat"><i class="fas fa-plus-circle"></i></a>
                    <a href="#/settings"><i class="fas fa-user-cog"></i></a>
                    <a href="#" id="logout-btn"><i class="fas fa-sign-out-alt"></i></a>
                </nav>
            </header>
            <main>
                <form class="add-chat-form" id="add-chat-form" method="POST">
                    <input type="text" placeholder="name" name="name" maxlength="30" required />
                    <div class="checkbox">
                        <input class="custom-checkbox" type="checkbox" id="secured" name="secured" value="secured">
                        <label for="secured">secured</label>
                    </div>
                    <input type="password" placeholder="password" name="password" id="password" maxlength="30" class="hidden" />
                    <input type="password" placeholder="confirm password" name="confirm" id="confirm" maxlength="30" class="hidden" />
                    <input type="submit" value="CREATE CHAT">
                </form>
            </main>
        </body>
        `;
    },

    afterRender: async() => {
        const logoutBtn = document.getElementById("logout-btn");
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                auth.signOut();
            })
        }

        const securedCheckbox = document.getElementById("secured");
        const passwordInput = document.getElementById("password");
        const confirmInput = document.getElementById("confirm");
        if (securedCheckbox) {
            securedCheckbox.addEventListener('change', function() {
                if (this.checked) {
                    if (passwordInput.classList.contains("hidden")) {
                        passwordInput.classList.remove("hidden");
                    }
                    passwordInput.required = true;
                    if (confirmInput.classList.contains("hidden")) {
                        confirmInput.classList.remove("hidden");
                    }
                    confirmInput.required = true;
                } else {
                    passwordInput.classList.add("hidden");
                    confirmInput.classList.add("hidden");
                    passwordInput.required = false;
                    confirmInput.required = false;
                }
            })
        }

        const addChatForm = document.getElementById("add-chat-form");
        addChatForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = addChatForm['name'].value;
            let password = null;
            let confirm = null;
            let chatType = null;
            let chatId = await database.getChatId();
            if (!chatId) chatId = 0;

            let ok = true;

            if (securedCheckbox.checked) {
                password = addChatForm['password'].value;
                confirm = addChatForm['confirm'].value;
                if (password !== confirm) {
                    alert('Passwords are not equal');
                    ok = false;
                } else {
                    chatType = 'SECRET';    
                }
            } else {
                chatType = 'PUBLIC';
            }

            if (ok) {
                database.setChat(chatId + 1, name, chatType, password);
                alert(`Chat ${name} created successfully!`);
                window.location.hash = '/chat';
                database.setChatId(chatId + 1);
            }
        });
    }
};

export default AddChat;