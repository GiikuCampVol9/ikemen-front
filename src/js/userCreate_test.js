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
firebase.initializeApp(firebaseConfig);

// FirestoreとAuthのインスタンスを取得
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

let uid = "";

function userCreate() {
    console.log('userCreate 関数が呼び出されました');
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('pass').value;
    
    console.log('email:', email, ',password:', password);

    // Firebase でユーザー登録
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // ユーザー登録成功時の処理
            uid = userCredential.user.uid;
            console.log('uid', uid);

            userCreateName();
            // navigateToPage();
        })
        .catch((error) => {
            // ユーザー登録失敗時の処理
            console.log('ユーザー登録エラー:', error.message);
        });
}

function userCreateName() {
    console.log('userCreateName 関数が呼び出されました');

    const name = document.getElementById("name").value;    
    const fileInput = document.getElementById('icon');    
    const file = fileInput.files[0];
    const created_at = firebase.firestore.FieldValue.serverTimestamp();

    if (file) {
        console.log('ファイルが選択されました: ',file.name);
    } else {
        alert('ファイルが選択されていません');
    }

    // Firebase Storageへの参照を作成
    const storageRef = firebase.storage().ref();
    // アップロードするファイルのパスを指定してアップロード
    const uploadTask = storageRef.child(file.name).put(file);

    // アップロードタスクの監視
    uploadTask.then(snapshot => {
        // アップロードが完了したら、ダウンロードURLを取得
        snapshot.ref.getDownloadURL().then(downloadURL => {
            console.log('ファイルのアップロードが完了しました。\nダウンロードURL: ',downloadURL);
            
            // データを追加
            db.collection("user").add({
                uid: uid,
                name: name,
                // 画像のパス(変更削除するときにいるはず)
                // prof_img: path,
                // 表示するようのなんとか
                profileUrl: downloadURL,
                created_at: created_at
            }).then(docRef => {
                navigateToPage();
                console.log("Document written with ID: ", docRef.id);
            }).catch(error => {
                console.error("Error adding document: ", error);
            });
        });
    });
}

function navigateToPage () {
    //  ページ遷移
    location.href='./home.html';
}

// function userLogin() {
//     console.log('userLogin 関数が呼び出されました');
    
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('pass').value;
    
//     alert('email:' + email + ',password:' + password + 'でログインします');

//     // ログイン
//     firebase.auth().signInWithEmailAndPassword(email, password)
//         .then((userCredential) => {
//             // ログイン成功時の処理
//             alert('ログインしました:' + userCredential.user);
//         })
//         .catch((error) => {
//             // ログイン失敗時の処理
//             alert('ログインエラー:' + error.message);
//         });
// }
