// ==UserScript==
// @name         kinotown
// @namespace    https://t.me/kinotown_bot
// @version      0.19
// @description  Add watch button on kinopoisk.ru website
// @author       kinotown
// @match        *://www.kinopoisk.ru/*
// @icon         https://kinotown.bitbucket.io/favicon.ico
// @grant        none
// @downloadURL  https://github.com/Swayerka/kinotown/raw/main/kinotown.user.js
// @updateURL    https://github.com/Swayerka/kinotown/raw/main/kinotown.user.js
// ==/UserScript==

const ktLogo=`data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB2aWV3Qm94PSI1LjA
yOCA0Ljk5NSA5NC45OTUgODkuNzQ0IiB3aWR0aD0iOTguMzM0IiBoZWlnaHQ9IjkzLjAwNSIgeG
1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cGF0aCBkPSJNIDMwLjY4IDIyL
jA0IEMgMzQuMjU5IDE1Ljg0MyAzNy44MzggMTUuODQzIDQxLjQxNiAyMi4wNCBMIDUyLjE1IDQw
LjYzMiBDIDU1LjcyOSA0Ni44MyA1My45NCA0OS45MjkgNDYuNzgzIDQ5LjkyOSBMIDI1LjMxMyA
0OS45MjkgQyAxOC4xNTcgNDkuOTI5IDE2LjM2NyA0Ni44MyAxOS45NDYgNDAuNjMyIFoiIHN0eW
xlPSJmaWxsLXJ1bGU6IG5vbnplcm87IHBhaW50LW9yZGVyOiBzdHJva2U7IHN0cm9rZTogcmdiK
DI1NSwgMjU1LCAyNTUpOyBmaWxsOiBub25lOyBzdHJva2Utd2lkdGg6IDRweDsiIHRyYW5zZm9y
bT0ibWF0cml4KDAuODY2MDIxLCAtMC41MDAwMDcsIDAuNTAwMDA3LCAwLjg2NjAyMSwgLTEyLjA
wMDg3MywgMjIuNTM0MTE4KSIvPgogIDxwYXRoIGQ9Ik0gNjkuMTIyIDM4LjA0MiBDIDY5LjEyMi
A1NS4xODkgNTUuMjIyIDY5LjA4OSAzOC4wNzUgNjkuMDg5IEMgMjAuOTI4IDY5LjA4OSA3LjAyO
CA1NS4xODkgNy4wMjggMzguMDQyIEMgNy4wMjggMjAuODk1IDIwLjkyOCA2Ljk5NSAzOC4wNzUg
Ni45OTUgQyA1NS4yMjIgNi45OTUgNjkuMTIyIDIwLjg5NSA2OS4xMjIgMzguMDQyIFoiIHN0eWx
lPSJmaWxsOiBub25lOyBmaWxsLXJ1bGU6IG5vbnplcm87IHN0cm9rZTogcmdiKDI1NSwgMjU1LC
AyNTUwKTsgc3Ryb2tlLXdpZHRoOiA0cHg7Ii8+CiAgPHBhdGggZD0iTSA2Mi42NTggNjUuNjg3I
EwgODkuNzExIDkyLjczOSBMIDk4LjAyMyA4NC40MjggTCA3MS4zNDQgNTcuNzQ5IiBzdHlsZT0i
ZmlsbDogbm9uZTsgc3Ryb2tlLWxpbmVjYXA6IHJvdW5kOyBzdHJva2UtbWl0ZXJsaW1pdDogNTA
7IHN0cm9rZS1saW5lam9pbjogcm91bmQ7IHBhaW50LW9yZGVyOiBmaWxsOyBzdHJva2U6IHJnYi
gyNTUsIDI1NSwgMjU1KTsgc3Ryb2tlLXdpZHRoOiA0cHg7Ii8+Cjwvc3ZnPg==`

const BTN_ID="kinotown-btn"
const KP_TYPES=["film","series"]
const WILDCARD="div[class^='styles_header__']"
const KT_LINK="kinotown.bitbucket.io/"

function openPlayer() {
    window.open(`https://${KT_LINK}?id=${window.location.href.split('/')[4]}`, '_blank').focus();
}

window.onload = (event) => {
    const observer = new MutationObserver(() => checkState());
    observer.observe(document, { subtree: true, childList: true });
    checkState();
}

let lastUrl = ""
function checkState(){
	let url = window.location.href;

	if (url === lastUrl) return;
	lastUrl = url;

	let ktBtn = document.getElementById(BTN_ID);
	let kpId = window.location.href.split('/')[4];
	let kpType = window.location.href.split('/')[3];

	if (!kpId || !kpType || !KP_TYPES.includes(kpType)) {
		if (ktBtn) ktBtn.remove();
	} else {
		if (!ktBtn) addBtn();
	}
}
/*
//style_button__PNtXT style_buttonSize52__b5OBe style_buttonAccent__vKDGa style_buttonLight____6ma style_withIconLeft___Myt9
//style_button__PNtXT style_buttonSize52__b5OBe style_buttonAccent__vKDGa style_buttonLight____6ma style_withIconLeft___Myt9
.style_buttonAccent__vKDGa {
    color: #fff;
    background: -webkit-linear-gradient(315deg,#f50 69.91%,#d6bb00);
    background: linear-gradient(135deg,#f50 69.91%,#d6bb00);
    -webkit-transition: background .2s ease,-webkit-transform .2s ease;
    transition: background .2s ease,-webkit-transform .2s ease;
    transition: background .2s ease,transform .2s ease;
    transition: background .2s ease,transform .2s ease,-webkit-transform .2s ease;
}

.style_buttonSize52__b5OBe {
    min-width: 52px;
    min-height: 52px;
    max-height: 52px;
    padding: 15px 26px 15px 22px;
    font-size: 16px;
    font-weight: 600;
    line-height: 20px;
}

.style_button__PNtXT {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    font-weight: 600;
    font-style: normal;
    cursor: pointer;
    text-decoration: none;
    border: none;
    border-radius: 52px;
    outline: none;
    -webkit-transition: background-color .2s ease,-webkit-transform .2s ease;
    transition: background-color .2s ease,-webkit-transform .2s ease;
    transition: transform .2s ease,background-color .2s ease;
    transition: transform .2s ease,background-color .2s ease,-webkit-transform .2s ease;
}

*/

function addBtn(){
    var elementToFind=document.querySelector(WILDCARD)
    var btnWatch = document.createElement('div');
    btnWatch.id=BTN_ID
    btnWatch.style.cssText = 'margin-top:15px;font-family: Graphik Kinopoisk LC Web,Tahoma,Arial,Verdana,sans-serif;';
    btnWatch.classList.add("style_button__PNtXT","style_buttonSize52__b5OBe","style_buttonAccent__vKDGa");
    btnWatch.innerHTML=`<img src="${ktLogo}" alt="" width="40" height="40" class="d-inline-block align-text-top"><a>Kinotown</a>`
    btnWatch.onclick = () => {openPlayer()};
    //elementToFind.firstChild.append(btnWatch)
    elementToFind.appendChild(btnWatch)
}
