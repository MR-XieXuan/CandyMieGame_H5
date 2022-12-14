function putup_pic(x, y, n, t) {
    var canvasDiv = document.getElementById("canvas_div");
    var layer1 = document.createElement('canvas');
    layer1.width = prW;
    layer1.height = prH;
    layer1.style = "display:none;"
    layer1.id = "pic_" + n + "_canvas";
    canvasDiv.append(layer1);
    var layer1_canvas = layer1.getContext('2d');
    layer1_canvas.fillStyle = "#000000";
    switch (t) {
        case 1:
            layer1_canvas.fillStyle = "#F00FF0";
            break;
        case 2:
            layer1_canvas.fillStyle = "#FF0000";
            break;
        case 3:
            layer1_canvas.fillStyle = "#00FF00";
            break;
        case 4:
            layer1_canvas.fillStyle = "#0000FF";
            break;
    }
    layer1_canvas.fillRect(communicate.gw_to_cw(x - game.POKER_SIZE/2) + mapPosition[0], communicate.gh_to_ch(y - game.POKER_SIZE/2) + mapPosition[1],
        communicate.gw_to_cw(game.POKER_SIZE), communicate.gh_to_ch(game.POKER_SIZE));
    layer1_canvas.strokeRect(communicate.gw_to_cw(x - game.POKER_SIZE/2) + mapPosition[0], communicate.gh_to_ch(y - game.POKER_SIZE/2) + mapPosition[1],
        communicate.gw_to_cw(game.POKER_SIZE), communicate.gh_to_ch(game.POKER_SIZE));
    return layer1;
}
function putup_can(n, t) {
    var canvasDiv = document.getElementById("canvas_div");
    var layer1 = document.createElement('canvas');
    layer1.width = prW;
    layer1.height = prH;
    layer1.style = "display:none;"
    layer1.id = "pic_can" + n + "_canvas";
    canvasDiv.append(layer1);
    var layer1_canvas = layer1.getContext('2d');
    layer1_canvas.fillStyle = "#000000";
    switch (t) {
        case 1:
            layer1_canvas.fillStyle = "#F00FF0";
            break;
        case 2:
            layer1_canvas.fillStyle = "#FF0000";
            break;
        case 3:
            layer1_canvas.fillStyle = "#00FF00";
            break;
        case 4:
            layer1_canvas.fillStyle = "#0000FF";
            break;
    }
    layer1_canvas.fillRect(n * prW / 7 + 2, parseInt(prH * 0.8) + 2,
        parseInt(prW / 7) - 4, parseInt(prW / 7) - 4);
    layer1_canvas.strokeRect(n * prW / 7, parseInt(prH * 0.8),
        parseInt(prW / 7) - 4, parseInt(prW / 7) - 4);
    return layer1;
}
function put_pics_first() {
    // ?????????????????????
    var canvas = document.getElementById("botton_canvas").getContext("2d");
    for (var i = 1; i <= game.amount; i++) {
        putup_pic(game.get_poker_x(i), game.get_poker_y(i), i, game.get_poker_t(i));
        canvas.drawImage(document.getElementById("pic_" + i + "_canvas"), 0, 0, prW, prH, 0, 0, prW, prH);
    }
    document.getElementById("botton_canvas").addEventListener("click", function (event) {
        get_mouse_pos(document.getElementById("botton_canvas"), event);
    });
}
function put_pics() {
    var canvas = document.getElementById("botton_canvas").getContext("2d");
    for (var i = 1; i <= game.amount; i++) {
        if (game.get_poker_have(i)) {
            canvas.drawImage(document.getElementById("pic_" + i + "_canvas"), 0, 0, prW, prH, 0, 0, prW, prH);
        }
    }
}
function put_can() {
    var canvas = document.getElementById("botton_canvas").getContext("2d");
    for (var i = 0; i < 7; i++) {
        var obj = document.getElementById("pic_" + "can" + i + "_canvas");
        if (obj) {
            obj.innerHTML = "";//??????div??????

            //??????div
            var parentObj = obj.parentNode;//??????div????????????
            parentObj.removeChild(obj);//??????div????????????????????????
        }
    }
    for (var i = 0; i < can.pokerAmount; i++) {
        if (can.pokerMap[i] == 0) {
            break;
        }
        putup_can(i, can.pokerMap[i]);
        canvas.drawImage(document.getElementById("pic_" + "can" + i + "_canvas"), 0, 0, prW, prH, 0, 0, prW, prH);
    }
}
function put_background() {
    var canvas = document.getElementById("botton_canvas").getContext("2d");
    canvas.fillStyle = "#f58f98";
    canvas.fillRect(0, 0,
        parseInt(prW), parseInt(prH));
    canvas.fillStyle = "#F0F0F0";
    canvas.fillRect(0, parseInt(prH * 0.8),
        parseInt(prW), parseInt(prW / 7));
    canvas.strokeRect(0, parseInt(prH * 0.8),
        parseInt(prW), parseInt(prW / 7));
}
function clearn_canvas() {
    var canvas = document.getElementById("botton_canvas").getContext("2d");
    var w = document.getElementById("botton_canvas").width;
    var h = document.getElementById("botton_canvas").height;
    canvas.clearRect(0, 0, w, h);
}
function print_canvas() {
    var canvas = document.getElementById("botton_canvas").getContext("2d");
    canvas.restore();
    canvas.save();
}
function get_mouse_pos(canvas, event) {
    // ???????????????????????????
    document.getElementById('audiomusic').play();
    var rect = canvas.getBoundingClientRect();
    var cx = event.clientX - rect.left * (canvas.width / rect.width);
    var cy = event.clientY - rect.top * (canvas.height / rect.height);
    if (cx >= mapPosition[0] && cx <= mapPosition[0] + mapSize && cy >= mapPosition[1] && cy <= mapPosition[1] + mapSize) {
        // ?????????????????????????????????
        var gx = communicate.cw_to_gw(cx - mapPosition[0]);
        var gy = communicate.ch_to_gh(cy - mapPosition[1]);
        //  ??????????????????????????????
        console.log("x:" + cx + ",y:" + cy);
        console.log("x:" + gx + ",y:" + gy);
        // ?????????
        can.place_a_poker(game.takeaway_a_poker(gx, gy));
        can.eliminate_pokers();
        game.refresh_poker_a();
        clearn_canvas();
        put_background()
        put_pics();
        put_can();
        print_canvas();
    } else {
        // ????????????????????????
    }

}


var can = new MieGameCan(7);
const node = document.getElementById('json-script-level');
const jsonStr = node.innerText;
document.body.style.overflow = 'hidden';

/*
var audio = new Audio("./?????????.mp3");//?????????????????????mp3?????????????????????????????????
var duration;
duration = audio.duration;//??????????????????
function bgm() {
    audio.play();//??????
}
bgm();//???????????????????????????????????????
window.setInterval("bgm()", duration * 1000 + 1000);
*/
var json = JSON.parse(jsonStr);
// ???????????? ??????
var prH = window.screen.availHeight;
var prW = window.screen.availWidth;
// ???????????????????????????????????????
// ???????????? ?????????????????? ?????????70
var mapSize = parseInt((prW < prH ? prW : prH) * 0.7);
var canvasDiv = document.getElementById("canvas_div");
var layer1 = document.createElement('canvas');
layer1.width = prW;
layer1.height = prH;
layer1.id = "botton_canvas";
canvasDiv.append(layer1);
// ????????????
var game = new MieGamePoker(json.pokerSize);
var communicate = new CanvasCommunicatGame(json.mapSizeW, json.mapSizeH, mapSize, mapSize);
var mapPosition = [parseInt((prW - mapSize) / 2), parseInt((prH - mapSize) / 2)];

for (var i = 0; i < json.pokerAmount; i++) {
    game.place_a_poker(json.pokerList[i][0], json.pokerList[i][1], json.pokerList[i][2]);
}
game.refresh_poker_a();
put_background();
put_pics_first();
print_canvas();