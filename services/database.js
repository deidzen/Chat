export async function getUserNickname(uid) {
    if (!uid)
        return null;
    let userRef = firestore.collection("users").doc(uid);
    let nickname;
    await userRef.get().then(function (doc) {
        nickname = doc.data().nickname;
    })
    return nickname;
}

export async function setUserNickname(nick) {
    let user = auth.currentUser;
    if (user) {
        let userRef = firestore.collection("users").doc(user.uid);
        userRef.update({
            nickname: nick
        })
    }
}

export async function getUserAvatar(uid) {
    if (!uid)
        return null;
    let userRef = firestore.collection("users").doc(uid);
    let avatar;
    await userRef.get().then(function (doc) {
        avatar = doc.data().avatar;
    })
    return avatar;
}

export async function getImageId() {
    let imageIdRef = firestore.collection("counters").doc("image_count");
    let counter;
    await imageIdRef.get().then(function (doc) {
        counter = doc.data().counter;
    })
    return counter;
}

export function setImageId(id) {
    let imageIdRef = firestore.collection("counters").doc("image_count");
    imageIdRef.update({
        counter: id
    })
}

export async function getImage(avatar) {
    let imgRef;
    if (avatar) {
        imgRef = storage.ref('/images/' + avatar);   
    } else {
        imgRef = storage.ref('/images/default-avatar.png');
    }
    let downloadURL = await imgRef.getDownloadURL();
    return downloadURL;
}

export function setImage(file, imageId, extension) {
    let imageRef = storage.ref('/images/' + imageId + '.' + extension);
    return imageRef.put(file);
}

export function setChatId(id) {
    let chatIdRef = firestore.collection("counters").doc("chat_count");
    chatIdRef.update({
        counter: id
    })
}

export async function getChatId() {
    let chatIdRef = firestore.collection("counters").doc("chats_count");
    let counter;
    await chatIdRef.get().then(function (doc) {
        counter = doc.data().counter;
    })
    return counter;
}

export function setChat(id, name, chatType, password) {
    firestore
        .collection("chats")
        .doc(id.toString())
        .set({
            id: id,
            name: name,
            chat_type: chatType,
            password: password
        });
}

export async function getChat(id) {
    let chatRef = firestore.collection("chats").doc(id.toString());
    let chat;
    await chatRef.get().then(function (doc) {
        chat = doc.data();
    })
    return chat;
}

export async function getChatUsers(chatId) {
    let chatRef = firestore.collection("chats").doc(chatId.toString());
    let users;
    await chatRef.get().then(function (doc) {
        users = doc.data().users;
    })
    return users;
}

export function setChatUser(chatId) {
    let chatRef = firestore.collection("chats").doc(chatId.toString());
    chatRef.update({
        [`users.${auth.currentUser.uid}`]: auth.currentUser.uid
    })
    let userRef = firestore.collection("users").doc(auth.currentUser.uid);
    userRef.update({
        [`chats.${chatId}`]: chatId.toString()
    })
}