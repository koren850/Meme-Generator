'use strict'

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
var gImgs = [
    { id: 1, url: 'imgs/memes/1.jpg', keywords: ['celebs', 'funny'] },
    { id: 2, url: 'imgs/memes/2.jpg', keywords: ['cute', 'dogs'] },
    { id: 3, url: 'imgs/memes/3.jpg', keywords: ['cute', 'dogs'] },
    { id: 4, url: 'imgs/memes/4.jpg', keywords: ['cute', 'dogs'] },
    { id: 5, url: 'imgs/memes/5.jpg', keywords: ['cute', 'dogs'] },
    { id: 6, url: 'imgs/memes/6.jpg', keywords: ['cute', 'dogs'] },
    { id: 7, url: 'imgs/memes/7.jpg', keywords: ['cute', 'dogs'] },
    { id: 8, url: 'imgs/memes/8.jpg', keywords: ['cute', 'dogs'] },
    { id: 9, url: 'imgs/memes/9.jpg', keywords: ['cute', 'dogs'] },
    { id: 10, url: 'imgs/memes/10.jpg', keywords: ['cute', 'dogs'] },
    { id: 11, url: 'imgs/memes/11.jpg', keywords: ['cute', 'dogs'] },
    { id: 12, url: 'imgs/memes/12.jpg', keywords: ['cute', 'dogs'] },
    { id: 13, url: 'imgs/memes/13.jpg', keywords: ['cute', 'dogs'] },
    { id: 14, url: 'imgs/memes/14.jpg', keywords: ['cute', 'dogs'] },
    { id: 15, url: 'imgs/memes/15.jpg', keywords: ['cute', 'dogs'] },
    { id: 16, url: 'imgs/memes/16.jpg', keywords: ['cute', 'dogs'] },
    { id: 17, url: 'imgs/memes/17.jpg', keywords: ['cute', 'dogs'] },
    { id: 18, url: 'imgs/memes/18.jpg', keywords: ['cute', 'dogs'] },

]
var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            align: 'center',
            color: 'white',
            strokeColor: 'black',
            font: 'impact',
            posX: document.getElementById('my-canvas').width / 2,
            posY: document.getElementById('my-canvas').height / 6,
            fontSize: 30
        },
        {
            txt: 'And sometimes eat hummus ',
            size: 20,
            align: 'center',
            color: 'white',
            strokeColor: 'black',
            font: 'impact',
            posX: document.getElementById('my-canvas').width / 2,
            posY: document.getElementById('my-canvas').height * 5 / 6,
            fontSize: 30
        }
    ]
}

function resetLines() {
    gMeme.lines = [{ txt: 'I sometimes eat Falafel', size: 20, align: 'center', color: 'white', strokeColor: 'black', font: 'impact', posX: document.getElementById('my-canvas').width / 2, posY: document.getElementById('my-canvas').height / 6, fontSize: 30 },
    { txt: 'And sometimes eat hummus ', size: 20, align: 'center', color: 'white', strokeColor: 'black', font: 'impact', posX: document.getElementById('my-canvas').width / 2, posY: document.getElementById('my-canvas').height * 5 / 6, fontSize: 30 }]
}

function getImgs() {
    return gImgs;
}
function getMeme() {
    return gMeme;
}
function getLines() {
    return gMeme.lines;
}

function getMemeByid(id) {
    var foundMeme = gImgs.find(meme => {
        return meme.id === id;
    })
    return foundMeme;
}

function focusText() {
    const line = getLine();
    if (!line) return;
    gCtx.beginPath()
    gCtx.lineWidth = 3;
    gCtx.rect((line.posX - line.width / 2) - 10, (line.posY - line.fontSize) - 5, line.width + 20, line.size + line.fontSize)
    gCtx.strokeStyle = 'white'
    gCtx.stroke()
}

function setLineWidth(width, line) {
    line.width = width;
}

function changeText(txt) {
    if (!gChosenLine) return;
    gChosenLine.txt = txt;
}

function changeTextColor(color) {
    gChosenLine.color = color
}

function changeStrokeColor(color) {
    gChosenLine.strokeColor = color
}

function getImg() {
    const imgId = gMeme.selectedImgId;
    var selctedImg = document.getElementById(`img-${imgId}`)
    return selctedImg
}

function getLine() {
    return gMeme.lines[gMeme.selectedLineIdx];
}

function setLineTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt;
    updateInputTxt()
}

function addLine() {
    if (gMeme.lines.length === 0) {
        gMeme.lines.push({
            txt: 'I sometimes eat Borekas',
            size: 20,
            align: 'center',
            color: 'white',
            strokeColor: 'black',
            font: 'impact',
            posX: document.getElementById('my-canvas').width / 2,
            posY: document.getElementById('my-canvas').height / 6,
            fontSize: 30
        })
        gChosenLine = gMeme.lines[gMeme.lines.length - 1];
        gMeme.selectedLineIdx = gMeme.lines.length - 1;
        updateInputTxt()
    }
    else
        gMeme.lines.push({
            txt: 'I sometimes eat Borekas',
            size: 20,
            align: 'center',
            color: 'white',
            strokeColor: 'black',
            font: 'impact',
            posX: gMeme.lines[gMeme.lines.length - 1].posX,
            posY: gMeme.lines[gMeme.lines.length - 1].posY + 70,
            fontSize: 30
        })
    gChosenLine = gMeme.lines[gMeme.lines.length - 1];
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
    updateInputTxt()

}

function onSaveMeme() {
    const url = gCanvas.toDataURL()
    var savedMemeId = gMeme.selectedImgId;
    var lines = gMeme.lines
    var obj = { id: savedMemeId, lines: lines, url: url }
    var savedMemes = loadFromStorage(STORAGE_KEY);
    savedMemes.push(obj)
    saveToStorage(STORAGE_KEY, savedMemes)
}


