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
const collectionRef = db.collection('cardTest').doc('QvM6qh3BS0fXXFVeW2Vj');
collectionRef.get().then((doc) => {
    if (doc.exists) {
        const data = doc.data();
        displayData(data); // 取得したデータを表示する関数を呼び出す
    } else {
        console.log("No such document!");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});

// データを表示する関数
function displayData(data) {
    // 画像のパスを設定
    document.querySelector('img[alt="らーめん"]').src = data.写真;

    // テキスト情報を設定
    document.querySelector('p.text-3xl').textContent = data.店名;
    document.querySelectorAll('span')[0].textContent = `#${data.味}`;
    document.querySelectorAll('span')[1].textContent = `#${data.値段}`;
    document.querySelectorAll('span')[3].textContent = data.店舗リンク;
    document.querySelector('div.flex.flex-col.overflow-scroll.gap-2.h-48 p').textContent = data.コメント;
}