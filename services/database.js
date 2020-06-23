export async function getUserNickname() {
    let user = auth.currentUser;
    if (!user)
        return null;
    
    const snapshot = await db.ref('/users/' + user.uid + '/nickname').once('value');
    return snapshot.val();
}

export async function setUserNickname(nick) {
    let user = auth.currentUser;
    if (user) {
        const snapshot = (await db.ref('/users/' + user.uid).once('value')).val();
        snapshot['nickname'] = nick;
        db.ref('/users/' + user.uid).set(snapshot);
    }
}

export async function getUserAvatar() {
    let user = auth.currentUser;
    if (!user)
        return null;
    const snapshot = await db.ref('/users/' + user.uid + '/avatar').once('value');
    return snapshot.val();
}

export async function getImageId() {
    const snapshot = await db.ref('/image_count/id').once('value');
    return snapshot.val();
}

export function setImageId(id) {
    db.ref('/image_count').set({ id });
}

export async function getImage(avatar) {
    const imgRef = storage.ref('/images/' + avatar);
    const downloadURL = await imgRef.getDownloadURL();
    return downloadURL;
}

export function setImage(file, imageId, extension) {
    let imageRef = storage.ref('/images/' + imageId + '.' + extension);
    return imageRef.put(file);
}