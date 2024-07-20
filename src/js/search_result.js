// Firebaseの初期化
const firebaseConfig = {
    apiKey: "AIzaSyAR6puGjI0wejXqMVFtJgLHFGTAhxiQG-4",
    authDomain: "ikemen-9c89f.firebaseapp.com",
    projectId: "ikemen-9c89f",
    storageBucket: "ikemen-9c89f.appspot.com",
    messagingSenderId: "462068637932",
    appId: "1:462068637932:web:e745925fe748a101fa05c9",
    measurementId: "G-1G03LTN26D"
};

// Firebaseアプリの初期化
const app = firebase.initializeApp(firebaseConfig);

// Firestoreのインスタンス取得
const db = firebase.firestore();

// コレクションデータ取得
const collectionRef = db.collection('cardTest');
collectionRef.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        if (doc.exists) {
            const data = doc.data();
            createCard(data);
        } else {
            console.log("No such document!");
        }
    });
}).catch((error) => {
    console.log("Error getting documents:", error);
});

// カードを作成してHTMLに追加
function createCard(data) {
    const cardContainer = document.querySelector('.card-container');

    const card = document.createElement('div');
    card.className = 'card';

    const cardContent =
        `
            <div class="card-content">
                <table>
                    <tr>
                        <th colspan="2"><span>${data.店名}</span></th>
                    </tr>
                    <tr>
                        <td>#<span>${data.味}</span></td>
                        <td>#<span>${data.値段}</span></td>
                    </tr>
                    <tr>
                        <td colspan="2">現在地から<span>${data.距離}</span></td>
                    </tr>
                </table>
                <img src="${data.写真}" alt="${data.店名}" height="90" width="100">
            </div>
        `
    ;

    card.innerHTML = cardContent;
    cardContainer.appendChild(card);
}