'use strict'
var gElGallery = document.querySelector('.gallery');
var gElMemeEdit = document.querySelector('.meme-edit');
var gElAboutMe = document.querySelector('.about-me');
var gElFilters = document.querySelector('.filters');
var gCanvas;
var gCtx;
var gMobile = false

function init() {
    gCanvas = document.getElementById('my-canvas');
    gCtx = gCanvas.getContext('2d');
    addMouseListeners();
    addTouchListeners();
    renderMemes();
    changeKeyWordsFontOnInit()
}

function renderGallery() {
    gElGallery.classList.remove('hide');
    gElGallery.classList.remove('hide');
    gElAboutMe.classList.remove('hide');
    gElMemeEdit.classList.add('hide');
    gElFilters.classList.remove('hide');
    gElSavedMemes.classList.add('hide');
    gMeme.selectedImgId = ''
    resetLines()
}


function renderMemes(fillter = 'none', imgs = null) {
    if (fillter === 'none' || fillter === '') var memes = getImgs();
    else (memes = imgs)
    var strHTML = '<div style="border:1px solid" border class="flex"><input type="file" class="file-input flex" name="upload" oninput="onImgInput(event)" /> will support all aspect ratio soon! \n (for now only 1:1)</div>';
    memes.forEach((meme) => {
        strHTML += `<img class='flex' id='${`img-${meme.id}`}' onclick='renderEditor(this, ${meme.id})' src='${meme.url}' alt='' />`
    });
    gElGallery.innerHTML = strHTML
}

function openHamburger() {
    document.querySelector('.nav').classList.toggle('open');
    document.querySelector('.black-screen').classList.toggle('active');
}


function onFilter(key) {
    var imgs = getImgs();
    var filterImg = [];
    imgs.forEach(img => {
        if (img.keywords.findIndex(imgKey => imgKey === key) !== -1) filterImg.push(img);
    });
    renderMemes(key, filterImg);
}
function calcFillterAmmount(key) {
    var imgs = getImgs();
    var filterImg = [];
    imgs.forEach(img => {
        if (img.keywords.findIndex(imgKey => imgKey === key) !== -1) filterImg.push(img);
    });
    return filterImg.length
}

function showMore() {
    var toTooggle = document.querySelectorAll('.on-more');
    var elBtnMoreLess = document.querySelector('.more-less')
    toTooggle.forEach(keyword => {
        keyword.classList.toggle('hide');
    });
    if (elBtnMoreLess.innerText === 'more..') elBtnMoreLess.innerText = 'less..';
    else elBtnMoreLess.innerText = 'more..';
}

function changeKeyWordsFontOnInit() {
    var keyWords = document.querySelectorAll('.key');
    keyWords.forEach(elKey => {
        var size = calcFillterAmmount(elKey.innerText);
        elKey.style.fontSize = `${size * 5}px`
    })
}

function onAddFontSize(elKeyword) {
    var size = elKeyword.style.fontSize
    var newSize = size.slice(0, size.length - 2)
    elKeyword.style.fontSize = `${+newSize + 2}px`
}







