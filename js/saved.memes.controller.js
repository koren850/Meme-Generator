'use strict'
var gElSavedMemes = document.querySelector('.saved-memes')
var gSavedMemes;
var gId = 0;


function renderSavedMemes() {
    gElSavedMemes.classList.remove('hide');
    gElAboutMe.classList.remove('hide');
    gElGallery.classList.remove('hide');
    gElFilters.classList.remove('hide');
    gElGallery.classList.add('hide');
    gElMemeEdit.classList.add('hide');
    resetLines()
    var strHTML = '';
    gSavedMemes = loadFromStorage(STORAGE_KEY);
    gId = 0;
    gSavedMemes.forEach((meme, idx) => {
        strHTML += `<img data-lines="${idx}" class='flex' id='${`saved-img-${++gId}`}' onclick='renderEditorSaved(this,${meme.id})' src='${meme.url}' alt='' />`
    });
    gElSavedMemes.innerHTML = strHTML
}

function renderEditorSaved(elImg, id) {
    gElGallery.classList.add('hide')
    gElAboutMe.classList.add('hide')
    gElSavedMemes.classList.add('hide');
    gElMemeEdit.classList.remove('hide')
    renderSavedImg(elImg, id)
    if (gCanvas.getBoundingClientRect().width === 300 && gCanvas.getBoundingClientRect().height === 300) {
        gMobile = true
    }
    else gMobile = false
}

function renderSavedImg(elImg, id) {
    var elImgtoDraw = document.getElementById(`img-${id}`);
    gCtx.drawImage(elImgtoDraw, 0, 0, gCanvas.width, gCanvas.height);
    var memes = getMeme();
    memes.selectedImgId = id;
    renderSavedCanvas(elImg, id);
}

function renderSavedCanvas(elImg, id) {
    const selectedImg = getImg();
    drawImg(selectedImg);
    setTimeout(drawSavedText, 1, elImg);
    if (!gDownload) setTimeout(focusText, 1);

}

function drawSavedText(elImg) {
    var linesIdx = elImg.getAttribute('data-lines');
    const lines = gSavedMemes[linesIdx].lines;
    var memes = getMeme();
    memes.lines = lines;
    gChosenLine = memes.lines[memes.selectedLineIdx];
    updateInputTxt();
    lines.forEach(line => {
        gCtx.font = `${line.fontSize}px ${line.font}`;
        gCtx.textAlign = "center";
        gCtx.fillStyle = line.color;
        gCtx.fillText(`${line.txt}`, line.posX, line.posY);
        gCtx.strokeStyle = line.strokeColor;
        gCtx.strokeText(`${line.txt}`, line.posX, line.posY);
        const textWidth = gCtx.measureText(line.txt).width;
        setLineWidth(textWidth, line);
    });
}



