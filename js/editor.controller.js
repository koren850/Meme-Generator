'use strict'

var gChosenLine;
var gDownload = false;
var gStartPos;

function renderEditor(elImg, id) {
    gElGallery.classList.add('hide');
    gElAboutMe.classList.add('hide');
    gElGallery.classList.add('hide');
    gElSavedMemes.classList.add('hide');
    gElMemeEdit.classList.remove('hide');
    renderImg(elImg, id);
}

function renderImg(elImg, id) {
    gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height);
    var img = getMemeByid(id);
    var memes = getMeme();
    memes.selectedImgId = img.id;
    updateInputTxt();
    renderCanvas();
}

function renderCanvas() {
    const selectedImg = getImg();
    drawImg(selectedImg);
    setTimeout(drawText, 1);
    if (!gDownload) setTimeout(focusText, 1);

}


function drawText() {
    const lines = getLines();
    var meme = getMeme();
    gChosenLine = meme.lines[meme.selectedLineIdx];
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


function drawImg(elImg) {
    gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height);
}


function onchangeText(txt) {
    if (gDownload) return
    setLineTxt(txt);
    changeText(txt);
    renderCanvas();
}

function onFontSize(diff) {
    if (gDownload) return
    changeFontSize(diff);
    renderCanvas();
}

function onChangeTextColor(color) {
    if (gDownload) return
    changeTextColor(color);
    renderCanvas();
}

function onChangeStrokeColor(color) {
    if (gDownload) return
    changeStrokeColor(color);
    renderCanvas();
}

function onSwitchLine() {
    if (gDownload) return
    switchLine();
    renderCanvas();
}
function onAddLine() {
    if (gDownload) return
    addLine();
    renderCanvas();
}

function onDeleteLine() {
    if (gDownload) return
    deleteLine();
    renderCanvas();
}

function onMoveY(diff) {
    if (gDownload) return
    var change = (diff === 'add') ? 30 : -30;
    moveY(change);
    renderCanvas();
}

function onMoveX(diff) {
    if (gDownload) return
    if (diff === 'center') moveX(diff)
    else {
        var change = (diff === 'add') ? -30 : 30;
        moveX(change);
    }
    renderCanvas();
}

function onSetFont(font) {
    if (gDownload) return
    if (!gChosenLine) return;
    setLang(font);
    renderCanvas();
}

function ondownload(elLink) {
    const data = gCanvas.toDataURL();
    elLink.href = data;
}

function OnShare() {
    var elDownLoad = document.querySelector('.control-box6')
    elDownLoad.classList.toggle('hide');
    if (elDownLoad.classList.contains('hide')) gDownload = false;
    else gDownload = true
    renderCanvas();
}

function addMouseListeners() {
    gCanvas.addEventListener('mousemove', onMove)
    gCanvas.addEventListener('mousedown', onDown)
    gCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gCanvas.addEventListener('touchmove', onMove)
    gCanvas.addEventListener('touchstart', onDown)
    gCanvas.addEventListener('touchend', onUp)
}

function onMove() {

}

function onDown() {

}

function onUp() {

}




