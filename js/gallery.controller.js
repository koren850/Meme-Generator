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
    var strHTML = '';
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







