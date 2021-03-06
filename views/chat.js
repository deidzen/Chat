import * as database from './../services/database.js';

let Chat = {
    render: async () => {
        return `
        <body>
            <header>
                <a href="/#/chat" id="logo">Chat</a>
                <nav>
                    <button><i class="far fa-moon"></i></button>
                    <a href="#/add-chat"><i class="fas fa-plus-circle"></i></a>
                    <a href="#/settings"><i class="fas fa-user-cog"></i></a>
                    <button id="logout-btn"><i class="fas fa-sign-out-alt"></i></button>
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
                    <table class="chat-table" id="chat-table">
                        <thead>
                            <tr>
                                <th>NAME</th>
                                <th>TYPE</th>
                            </tr>
                        </thead>
                        <tbody id="chat-table-body">
                        </tbody>
                    </table>
                </section>
                <section class="chat-window" id="chat-window">
                    <div class="chat-header">
                        <p class="chat-name" id="chat-name"></p>
                    </div>

                    <div class="chat-history" id="chat-history">
                        
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

    afterRender: async(chatId) => {
        const logoutBtn = document.getElementById("logout-btn");

        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                auth.signOut();
            })
        }
        
        const chatTableBody = document.getElementById("chat-table-body");

        firestore.collection("chats").get().then(function (chatsList) {
            chatsList.forEach(function (element) {
                let tr = document.createElement('tr');
                tr.dataset.chatId = element.get('id');
                let chatName = document.createElement('td');
                chatName.appendChild(document.createTextNode(element.get('name')));
                let chatType = document.createElement('td');
                chatType.appendChild(document.createTextNode(element.get('chat_type')));
                tr.appendChild(chatName);
                tr.appendChild(chatType);
                tr.addEventListener('click', () => {
                    window.location.hash = '/chat/' + tr.dataset.chatId;
                })
                chatTableBody.appendChild(tr);
            })
        })
        
        function convertTimestamp(timestamp) {
            let date = new Date(timestamp.seconds * 1000);
            let formatter = new Intl.DateTimeFormat("ru", {
                day: "numeric",
                month: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric"
            });
            return formatter.format(date);
        }

        async function processMessage(data) {
            let messageDiv = document.createElement('div');
            messageDiv.classList.add("chat-message");
            messageDiv.id = data.id;
            if (data.user === auth.currentUser.uid) {
                messageDiv.classList.add("chat-message-my");
            }
            let messageContainerDiv = document.createElement('div');
            messageContainerDiv.classList.add("chat-message-container");
            
            let messageAvatarImg = document.createElement('img');
            let userAvatar = await database.getUserAvatar(data.user);
            let avatarImage = await database.getImage(userAvatar);
            messageAvatarImg.src = avatarImage;
            
            let messageMainDiv = document.createElement('div');
            messageMainDiv.classList.add("chat-message-main");

            let upperRowDiv = document.createElement('div');
            upperRowDiv.classList.add("chat-message-upper-row");

            let messageNickP = document.createElement('p');
            messageNickP.classList.add("chat-message-nick");
            messageNickP.innerHTML = await database.getUserNickname(data.user);
            upperRowDiv.appendChild(messageNickP);


            if (data.user === auth.currentUser.uid) {
                let messageSendingIndicatorP = document.createElement('p');
                messageSendingIndicatorP.classList.add("chat-message-sending-indicator");
                messageSendingIndicatorP.classList.add("read");
                messageSendingIndicatorP.innerHTML = "<i class=\"fas fa-check-double\"></i>";
                upperRowDiv.appendChild(messageSendingIndicatorP);
            }

            let messageTextP = document.createElement("p");
            messageTextP.classList.add("chat-message-text");
            messageTextP.innerHTML = data.text;

            let messageDateTime = document.createElement('time');
            messageDateTime.classList.add("chat-message-datetime");
            messageDateTime.innerHTML = convertTimestamp(data.datetime);

            messageMainDiv.appendChild(upperRowDiv);
            messageMainDiv.appendChild(messageTextP);
            messageMainDiv.appendChild(messageDateTime);

            messageContainerDiv.appendChild(messageAvatarImg);
            messageContainerDiv.appendChild(messageMainDiv);

            messageDiv.appendChild(messageContainerDiv);

            const chatHistory = document.getElementById("chat-history");
            chatHistory.appendChild(messageDiv);
        }


        if (chatId) {
            const chatName = document.getElementById("chat-name");
            const chat = await database.getChat(chatId);
            chatName.innerHTML = chat.name;

            const usersList = await database.getChatUsers(chatId);
            if (usersList == null || usersList[auth.currentUser.uid] == null) {
                database.setChatUser(chatId);
            }

            let query = firestore
                .collection('chats/' + chatId + '/messages')
                .orderBy('datetime', 'asc');
            query.onSnapshot(async function (snapshot) {
                let changes = snapshot.docChanges();
                for (const change of changes) {
                    await processMessage(change.doc.data());
                }
            })
            
        }

    }
};

export default Chat;