'use strict'

var gChosenLine;
var gDownload = false;
var gIsClicking = false;
var gCurrClickIsLine = false;
var gStartPos;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];

function renderEditor(elImg, id) {
    gElGallery.classList.add('hide');
    gElAboutMe.classList.add('hide');
    gElGallery.classList.add('hide');
    gElFilters.classList.add('hide');
    gElSavedMemes.classList.add('hide');
    gElMemeEdit.classList.remove('hide');
    if (gCanvas.getBoundingClientRect().width === 300 && gCanvas.getBoundingClientRect().height === 300) {
        renderMobileLines();
        gMobile = true;
    }
    else gMobile = false;
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
    setTimeout(drawText, 5);
    if (!gDownload) setTimeout(focusText, 5);

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
    setFont(font);
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

function onMove(ev) {
    if (!gIsClicking || !gCurrClickIsLine) return;
    if (ev.type === 'touchmove') ev.preventDefault();
    const pos = getEvPos(ev)
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveCircle(dx, dy)
    gStartPos = pos
    renderCanvas()

    // console.log(ev);
}

function onDown(ev) {
    gIsClicking = true;
    //the rect i used
    // (line.posX - line.width / 2) - 10, (line.posY - line.fontSize) - 5, line.width + 20, line.size + line.fontSize)
    var lines = getLines();
    var clickedLineIdx = lines.findIndex((line) => {
        return (ev.offsetX > (line.posX - line.width / 2) - 10 &&
            ev.offsetX < (line.posX + line.width / 2) + 10 &&
            ev.offsetY > (line.posY - line.fontSize) - 5 &&
            ev.offsetY < ((line.posY - line.fontSize) - 5) + (line.size + line.fontSize))
    });
    if (clickedLineIdx === -1) return

    if (clickedLineIdx === gChosenLine) return
    else {
        const pos = getEvPos(ev)
        gStartPos = pos
        gCanvas.style.cursor = 'grabbing'
        gCurrClickIsLine = true
        gMeme.selectedLineIdx = clickedLineIdx
        updateInputTxt();
        renderCanvas();
    }
}

function onUp(ev) {
    gIsClicking = false;
    gCurrClickIsLine = false;
    gCanvas.style.cursor = 'grab'
    console.log('up');
}

function renderMobileLines() {
    gCanvas.width = 300;
    gCanvas.height = 300;
    resetLines();
}


function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft,
            y: ev.pageY - ev.target.offsetTop
        }
    }
    return pos
}

function moveCircle(dx, dy) {
    gChosenLine.posX += dx
    gChosenLine.posY += dy

}




