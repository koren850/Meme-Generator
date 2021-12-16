'use strict'

var gChosenLine;
var gDownload = false;

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
    setLineTxt(txt);
    changeText(txt);
    renderCanvas();
}

function onFontSize(diff) {
    changeFontSize(diff);
    renderCanvas();
}

function onChangeTextColor(color) {
    changeTextColor(color);
    renderCanvas();
}

function onChangeStrokeColor(color) {
    changeStrokeColor(color);
    renderCanvas();
}

function onSwitchLine() {
    switchLine();
    renderCanvas();
}
function onAddLine() {
    addLine();
    renderCanvas();
}

function onDeleteLine() {
    deleteLine();
    renderCanvas();
}

function onMoveY(diff) {
    var change = (diff === 'add') ? 30 : -30;
    moveY(change);
    renderCanvas();
}

function onMoveX(diff) {
    if (diff === 'center') moveX(diff)
    else {
        var change = (diff === 'add') ? -30 : 30;
        moveX(change);
    }
    renderCanvas();
}

function onSetLang(font) {
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

