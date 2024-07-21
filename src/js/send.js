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
const storage = firebase.storage();


document.addEventListener('DOMContentLoaded', function() {
    const iconTigger = document.getElementById('inputTigger');
    const fileInput = document.getElementById('picture');

    fileInput.addEventListener('change', function() {
        const file = this.files[0];

        const reader = new FileReader();
        reader.onload = function(event) {
            const imageUrl = event.target.result;

            const imgElement = document.createElement('img');
            imgElement.src = imageUrl;
            imgElement.alt = 'selected icon';

            imgElement.style.width = '80%';
            imgElement.style.height = '100%';
            imgElement.style.objectFit = 'cover';
            imgElement.style.margin = 'auto';
            imgElement.style.borderRadius = '10px';

            // iconTiggerがnullでないことを確認してから追加する
            if (iconTigger !== null) {
                iconTigger.innerHTML = '';
                iconTigger.appendChild(imgElement);
            } else {
                console.error('iconTiggerが見つかりません。');
            }
        };

        reader.readAsDataURL(file);
    });
});

async function registerData() {
    const picture = document.getElementById('picture').files[0];
    const name = document.getElementById('name').value;
    const tasteElements = document.getElementsByName('taste');
    const priceElements = document.getElementsByName('price');
    const link = document.getElementById('link').value;
    const comment = document.getElementById('comment').value;

    let taste = '';
    for (let i = 0; i < tasteElements.length; i++) {
        if (tasteElements[i].checked) {
            taste = tasteElements[i].value;
            break;
        }
    }

    let price = '';
    for (let i = 0; i < priceElements.length; i++) {
        if (priceElements[i].checked) {
            price = priceElements[i].value;
            break;
        }
    }

    // 写真をFirebase Storageにアップロード
    const storageRef = storage.ref();
    const pictureRef = storageRef.child(`images/${picture.name}`);
    await pictureRef.put(picture);
    const pictureURL = await pictureRef.getDownloadURL();

    // Firestoreにデータ保存
    await db.collection('cardTest').add({
        'コメント': comment,
        '値段': price,
        '写真': pictureURL,
        '味': taste,
        '店名': name,
        '店舗リンク': link,
        '距離': "100m"
    });

    // alert('データが登録されました！');
    // モーダルを表示
    showModal();
}

function showModal() {
    const modal = document.getElementById("myModal");
    modal.style.display = "block";
    setTimeout(() => {
        closeModalAndRedirect();
    }, 2000); //2秒間
}

function closeModalAndRedirect() {
    closeModal();
    window.location.href = "home.html";
}

function closeModal() {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
}