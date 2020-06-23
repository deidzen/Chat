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
                <form class="add-chat-form" method="POST">
                    <input type="text" placeholder="name" name="name" maxlength="30" required />
                    <div class="checkbox">
                        <input class="custom-checkbox" type="checkbox" id="secured" name="secured" value="secured">
                        <label for="secured">secured</label>
                    </div>
                    <input type="password" placeholder="password" name="password" maxlength="30" required />
                    <input type="password" placeholder="confirm password" name="confirm" maxlength="30" required />
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
    }
};

export default AddChat;