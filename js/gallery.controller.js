'use strict'
var gElGallery = document.querySelector('.gallery');
var gElMemeEdit = document.querySelector('.meme-edit');
var gElAboutMe = document.querySelector('.about-me');
var gElFilters = document.querySelector('.filters');
var gCanvas;
var gCtx;

function init() {
    gCanvas = document.getElementById('my-canvas');
    gCtx = gCanvas.getContext('2d');
    renderMemes();
}

function renderGallery() {
    gElGallery.classList.remove('hide');
    gElGallery.classList.remove('hide');
    gElAboutMe.classList.remove('hide');
    gElMemeEdit.classList.add('hide');
    gElSavedMemes.classList.add('hide');
    gMeme.selectedImgId = ''
    resetLines()
}


function renderMemes() {
    var memes = getImgs();
    var strHTML = '';
    memes.forEach((meme) => {
        strHTML += `<img class='flex' id='${`img-${meme.id}`}' onclick='renderEditor(this, ${meme.id})' src='${meme.url}' alt='' />`
    });
    gElGallery.innerHTML = strHTML
}







