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

const container = document.getElementById('container');

firebase.firestore()
    .collection('user')
    .limit(1)   //  最大1件取得
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() はドキュメントの全てのフィールドを含むオブジェクト
            const data = doc.data();
            const name = data.name;
            const profileUrl = data.profileUrl;

            //  確認用
            console.log('Name:', name);
            console.log('Profile URL:', profileUrl);
            console.log('---'); // ドキュメント間に区切りを入れるための区切り文字

            //  userから受け取った表示名をhtmlに渡す
            const userName = document.getElementById('user-name');
            userName.textContent = name;

            // //  userから受け取ったiconをhtmlに渡す
            // const icon = document.getElementById('icon-img');
            // icon.src = profileUrl;
            // icon.alt = `${name}'s icon`;

            //  div取得、pとimgを生成
            const userIconDiv = document.getElementById('user-icon');
            const pElement = document.createElement('p');
            const imgElement = document.createElement('img');

            // 名前を設定
            pElement.textContent = name;
            // 画像を設定
            imgElement.src = profileUrl;
            imgElement.alt = `${name}'s icon`;
            imgElement.width = 100;

            // CSSスタイルを適用する方法
            imgElement.style.borderRadius = '50%'; // 丸みを帯びた形状にする
            imgElement.style.overflow = 'hidden'; // 丸みを帯びた形状を適応するため

            //  divの中にimgを追加
            userIconDiv.appendChild(imgElement);
        });
    })
    .catch((error) => {
        console.error("Error getting documents: ", error);
    });


firebase.firestore()
    .collection('cardTest')
    .where('距離', '==', '100m')    //  100mのみ取得
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() はドキュメントの全てのフィールドを含むオブジェクト
            const data = doc.data();
            const price = data.値段;
            const taste = data.味;
            const menuName = data.店名;
            const menuImgUrl = data.写真;
            const distance = data.距離;

            console.log('nemuName', menuName);
            console.log('price', price);
            console.log('taste', taste);
            console.log('distance',distance);
            console.log('imgUrl', menuImgUrl);
            console.log('---'); // ドキュメント間に区切りを入れるための区切り文字

            const menuImageElement = document.getElementById('menu-image');
            const menuNameElement = document.getElementById('menu-name');
            const tasteElement = document.getElementById('menu-taste');
            const priceElement = document.getElementById('menu-price');

            menuNameElement.textContent = menuName;
            menuImageElement.src = menuImgUrl;
            menuImageElement.alt = `${menuName}'s icon`;
            
            tasteElement.textContent = '#' + taste;
            priceElement.textContent = '#' + price;

            // const cardContainer = document.getElementById('card-container');

            // const postContainer = document.createElement('div',{class:'post-container'});

            // const post =
            //     `
            //         <div class="flex mt-3 justify-around p-4">
            //             <div class="border-4 border-red-700  rounded-2xl shadow-red-700 shadow-md p-2 mt-4 w-36 h-40 flex flex-col gap-1">
            //                 <img class="object-cover h-20 w-30" src="${menuImgUrl}" alt="${menuName}">
            //                 <p class="text-center">${menuName}</p>
            //                 <div class="flex justify-between ">
            //                     <span>#${taste}</span>
            //                     <span>#${price}</span>
            //                 </div>
            //             </div>
            //         </div>
            //     `
            // ;

            // postContainer.innerHTML = post;
            // cardContainer.appendChild(postContainer);
        });
    })
    .catch((error) => {
        console.error("Error getting documents: ", error);
    });

