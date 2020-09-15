import * as database from './../services/database.js';

let Settings = {
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
                <form class="settings-form" id="settings-form" method="POST">
                    <img class="user-avatar" id="user-avatar" src="layout/images/default-avatar.png">
                    <input type="text" id="nickname" placeholder="new nickname" name="nickname" maxlength="30" required />
                    <input type="file" id="inputfile" name="file" class="inputfile" accept="image/*"/>
                    <input type="submit" id="submit-btn" value="APPLY CHANGES">
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

        let image = null;
        let imageExtension = null;

        let userNickname = await database.getUserNickname(auth.currentUser.uid);
        const nicknameInput = document.getElementById("nickname");
        nicknameInput.value = userNickname;

        const inputFile = document.getElementById("inputfile");
        inputFile.addEventListener('change', e => {
            image = e.target.files[0];
            imageExtension = inputFile.value.split('.')[1];
        });
        
        const userAvatar = document.getElementById("user-avatar");
        let avatar = await database.getUserAvatar(auth.currentUser.uid);
        if (avatar) {
            let avatarURL = await database.getImage(avatar);
            userAvatar.src = avatarURL;
        }

        const settingsForm = document.getElementById("settings-form");
        settingsForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (image) {
                let imageId = await database.getImageId();
                if (!imageId) imageId = 0;
                
                let uploadImageTask = database.setImage(image, imageId + 1, imageExtension);

                uploadImageTask.on('state_changed',
                function (snapshot) {
                    
                }, function (error) {
                    
                }, function () {
                   uploadImageTask.snapshot.ref.getDownloadURL().then(function (avatarURL) {
                       userAvatar.src = avatarURL;
                   });
                });

                database.setImageId(imageId + 1);
                imageId++;
                let userId = auth.currentUser.uid;
                await db.ref('/users/' + userId).update({
                    avatar: imageId + '.' + imageExtension
                });
            }
            database.setUserNickname(nicknameInput.value)
            .then(async function () {
                alert("Changes applied!");
            });
        });
        
    }
};

export default Settings;