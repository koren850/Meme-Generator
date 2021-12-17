'use strict'

function changeFontSize(diff) {
    if (!gChosenLine) return;
    var change = (diff === 'add') ? 2 : -2
    gChosenLine.fontSize += change;
}

function switchLine() {
    if (gMeme.lines.length < 1) return;
    if (gMeme.lines.length === 1) {
        gMeme.selectedLineIdx = 0;
        gChosenLine = gMeme.lines[0];
        focusText();
        return
    }
    if (gMeme.selectedLineIdx + 1 >= gMeme.lines.length) {
        gMeme.selectedLineIdx = 0;
        gChosenLine = gMeme.lines[0];
        updateInputTxt();
    }
    else {
        gMeme.selectedLineIdx++;
        gChosenLine = gMeme.lines[gMeme.selectedLineIdx];
        updateInputTxt();
    }
}

function deleteLine() {
    if (!gChosenLine) return;
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    if (gMeme.selectedLineIdx === gMeme.lines.length) {
        switchLine();
        updateInputTxt();
    }

}
function moveY(diff) {
    if (!gChosenLine) return;
    gMeme.lines[gMeme.selectedLineIdx].posY += diff;
}
function moveX(diff) {
    if (!gChosenLine) return;
    if (diff === 'center') gMeme.lines[gMeme.selectedLineIdx].posX = gCanvas.width / 2
    else gMeme.lines[gMeme.selectedLineIdx].posX += diff;
}


function updateInputTxt() {
    if (gMeme.lines.length === 0) document.querySelector('.line-add').value = '';
    else if (gMeme.selectedLineIdx === gMeme.lines.length) document.querySelector('.line-add').value = gMeme.lines[0].txt;
    else document.querySelector('.line-add').value = gMeme.lines[gMeme.selectedLineIdx].txt;
}

function setFont(font) {
    switch (font) {
        case 'impact':
            gChosenLine.font = 'impact';
            break;
        case 'bangers':
            gChosenLine.font = 'bangers';
            break;
        case 'fredoka':
            gChosenLine.font = 'fredoka';
            break;
        case 'orbitron':
            gChosenLine.font = 'orbitron';
            break;
        case 'permanentMarker':
            gChosenLine.font = 'permanentMarker';
            break;
    }
}

