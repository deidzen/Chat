let Chat = {
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
            <main class="main" id="main">
                <section class="chats-container" id="chats-container">
                    <form class="search-container" id="search-container" method="GET">
                        <div class="search-input">
                            <input type="text" id="chats-search" placeholder="Search.."/>
                            <input type="submit" class="fas fa-search" value="&#xf002;">
                        </div>
                        <div class="search-switch">
                            <label class="switch">
                                <input type="checkbox">
                                <span class="slider round"></span>
                            </label>
                            <span class="toggle-label">all</span>
                        </div>
                    </form>
                    <table class="chat-table">
                        <thead>
                            <tr>
                                <th>NAME</th>
                                <th>TYPE</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>public chat</td>
                                <td>PUBLIC</td>
                            </tr>
                            <tr>
                                <td>VIP only</td>
                                <td>SECRET</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
                <section class="chat-window" id="chat-window">
                    <div class="chat-header">
                        <p class="chat-name">VIP only</p>
                    </div>

                    <div class="chat-history">
                        <div class="chat-message chat-message-other" id="message-1">
                            <div class="chat-message-container">
                                <img src="images/default-avatar.png">
                                <div class="chat-message-main">
                                    <div class="chat-message-upper-row">
                                        <p class="chat-message-nick">Alex</p>
                                        <p class="chat-message-sending-indicator"></p>
                                    </div>
                                    <p class="chat-message-text">Hi!</p>
                                    <time class="chat-message-datetime" datetime="2020-05-17T22:49">17.05.2020 22:49</time>
                                </div>
                            </div>
                        </div>

                        <div class="chat-message chat-message-my" id="message-2">
                            <div class="chat-message-container">
                                <img src="images/default-avatar.png">
                                <div class="chat-message-main">
                                    <div class="chat-message-upper-row">
                                        <p class="chat-message-nick">Nick</p>
                                        <p class="chat-message-sending-indicator read">
                                            <i class="fas fa-check-double"></i>
                                        </p>
                                    </div>
                                    <p class="chat-message-text">Hello!</p>
                                    <time class="chat-message-datetime" datetime="2020-05-17T23:08">17.05.2020 23:08</time>
                                </div>
                            </div>
                        </div>

                        <div class="chat-message" id="message-3">
                            <div class="chat-message-container">
                                <img src="images/default-avatar.png">
                                <div class="chat-message-main">
                                    <div class="chat-message-upper-row">
                                        <p class="chat-message-nick">Alex</p>
                                        <p class="chat-message-sending-indicator">
                                            <i class="fas fa-check-double"></i>
                                        </p>
                                    </div>
                                    <p class="chat-message-text">cjxbxkkjxjvbxvbxckvjbcxbvkxcbjbvjxcvbxjckvkxckvxxcbvcbvhcbvchvbfjdvbfjkdbdbvjkbvsjkdbvjkdbvjsbjkcdsjkcdsbjkvcs</p>
                                    <time class="chat-message-datetime" datetime="2020-05-17T23:17">17.05.2020 23:17</time>
                                </div>
                            </div>
                        </div>

                        <div class="chat-message chat-message-my" id="message-4">
                            <div class="chat-message-container">
                                <img src="images/default-avatar.png">
                                <div class="chat-message-main">
                                    <div class="chat-message-upper-row">
                                        <p class="chat-message-nick">Nick</p>
                                        <p class="chat-message-sending-indicator read">
                                            <i class="fas fa-check-double"></i>
                                        </p>
                                    </div>
                                    <p class="chat-message-text">cjxbxkkjxjvbxvbxckvjbcxbvkxcbjbvjxcvbxjckvkxckvxxcbvcbvhcbvchvbfjdvbfjkdbdbvjkbvkjfdbvjkdbvjkvjkdjdbjkvbvkbsdsd</p>
                                    <time class="chat-message-datetime" datetime="2020-05-17T23:18">17.05.2020 23:18</time>
                                </div>
                            </div>
                        </div>

                        <div class="chat-message chat-message-my" id="message-5">
                            <div class="chat-message-container">
                                <img src="images/default-avatar.png">
                                <div class="chat-message-main">
                                    <div class="chat-message-upper-row">
                                        <p class="chat-message-nick">Nick</p>
                                        <p class="chat-message-sending-indicator read">
                                            <i class="fas fa-check-double"></i>
                                        </p>
                                    </div>
                                    <p class="chat-message-text">cjxbxkkjxjvbxvbxckvjbcxbvkxcbjbvjxcvbxjckvkxckvxxcbvcbvhcbvchvbfjdvbfjkdbdbvjkbvdvdsvfdvdvfdvfdvfdvfdvfdvd</p>
                                    <time class="chat-message-datetime" datetime="2020-05-17T23:18">17.05.2020 23:18</time>
                                </div>
                            </div>
                        </div>

                        <div class="chat-message" id="message-6">
                            <div class="chat-message-container">
                                <img src="images/default-avatar.png">
                                <div class="chat-message-main">
                                    <div class="chat-message-upper-row">
                                        <p class="chat-message-nick">Alex</p>
                                        <p class="chat-message-sending-indicator">
                                            <i class="fas fa-check-double"></i>
                                        </p>
                                    </div>
                                    <p class="chat-message-text">cjxbxkkjxjvbxvbxckvjbcxbvkxcbjbvjxcvbxjckvkxckvxxcbvcbvhcbvchvbfjdvbfjkdbdbvjkbvdvdsvfdvdvfdvfdvfdvfdvfdvd</p>
                                    <time class="chat-message-datetime" datetime="2020-05-17T23:25">17.05.2020 23:25</time>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="chat-input">
                        <div class="typing-indicator-block">
                            <p class="typing-indicator">Alex is typing...</p>
                        </div>
                        <div class="message-block">
                            <textarea class="message-box" placeholder="Enter message..." rows="3"></textarea>
                            <button class="sticker-btn" id="sticker-btn">
                                <i class="far fa-smile"></i>
                            </button>
                            <button class="send-btn" id="send-btn">
                                <i class="far fa-paper-plane"></i>
                            </button>
                        </div>
                    </div>
                </section>
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

export default Chat;