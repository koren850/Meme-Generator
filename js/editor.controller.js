'use strict'

var gChosenLine;
var gDownload = false;
var gIsClicking = false;
var gCurrClickIsLine = false;
var gStartPos;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];


function renderEditor(elImg, id = -1) {
    gElGallery.classList.add('hide');
    gElAboutMe.classList.add('hide');
    gElGallery.classList.add('hide');
    gElFilters.classList.add('hide');
    gElSavedMemes.classList.add('hide');
    gElMemeEdit.classList.remove('hide');
    gCanvas.style.cursor = 'grab'
    if (gCanvas.getBoundingClientRect().width === 300 && gCanvas.getBoundingClientRect().height === 300) {
        renderMobileLines();
        gMobile = true;
    }
    else gMobile = false;
    setImgTorender(id);
}

function setImgTorender(id) {
    if (id === -1) var img = -1
    else img = getMemeByid(id);
    var memes = getMeme();
    memes.selectedImgId = img.id;
    updateInputTxt();
    renderCanvas();
}

function renderCanvas() {
    var selectedImg = getImg();
    if (!selectedImg) selectedImg = document.querySelector('.hiddedUploadPhoto')
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
        gCtx.strokeStyle = `${line.strokeColor}`;
        gCtx.lineWidth = 2;
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
    var select = document.getElementById('select-font')
    select.style.fontFamily = select.value
    setFont(font);
    renderCanvas();
}

function ondownload(elLink) {
    const data = gCanvas.toDataURL();
    elLink.href = data;
}

function OnShare() {
    document.querySelector('.share').classList.toggle('red')
    var elDownLoad = document.querySelector('.control-box6')
    elDownLoad.classList.toggle('hide');
    if (elDownLoad.classList.contains('hide')) gDownload = false;
    else gDownload = true
    if (!gDownload) gCanvas.style.cursor = 'grab'
    else gCanvas.style.cursor = 'not-allowed'
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
    if (!gIsClicking || !gCurrClickIsLine || gDownload) return;
    if (ev.offsetX >= gCanvas.width - 1 || ev.offsetX <= 1 || ev.offsetY >= gCanvas.height - 1 || ev.offsetY <= 1) {
        gIsClicking = false
        return
    }
    const pos = getEvPos(ev)
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveCircle(dx, dy)
    gStartPos = pos
    renderCanvas()
}

function onDown(ev) {
    if (gDownload) return;
    gIsClicking = true;
    //the rect i used
    // (line.posX - line.width / 2) - 10, (line.posY - line.fontSize) - 5, line.width + 20, line.size + line.fontSize)
    var lines = getLines();
    var clickedLineIdx = lines.findIndex((line) => {
        return (ev.offsetX > (line.posX - line.width / 2) - 10 &&
            ev.offsetX < (line.posX + line.width / 2) + 10 &&
            ev.offsetY > (line.posY - line.fontSize) - 5 &&
            ev.offsetY < ((line.posY - line.fontSize) + 5) + (line.size + line.fontSize))
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
    if (gDownload) return;
    gIsClicking = false;
    if (!gMobile) gCurrClickIsLine = false;
    if (!ev.type === 'touchend') gCurrClickIsLine = false;
    gCanvas.style.cursor = 'grab'
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

function onImgInput(ev) {
    loadImageFromInput(ev, drawImg)
    renderEditor(0, -1);
}

function loadImageFromInput(ev, onImageReady) {
    document.querySelector('.share-container').innerHTML = ''
    var reader = new FileReader()
    reader.onload = (event) => {
        var img = new Image()
        // Render on canvas
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result
        document.querySelector('.hiddedUploadPhoto').src = img.src
    }
    reader.readAsDataURL(ev.target.files[0])
}




