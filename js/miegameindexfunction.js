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
    let img = document.getElementById("img_candy_" + t);
    layer1_canvas.drawImage(img, communicate.gw_to_cw(x - game.POKER_SIZE / 2) + mapPosition[0], communicate.gh_to_ch(y - game.POKER_SIZE / 2) + mapPosition[1],
        communicate.gw_to_cw(game.POKER_SIZE), communicate.gh_to_ch(game.POKER_SIZE));
    layer1_canvas.strokeRect(communicate.gw_to_cw(x - game.POKER_SIZE / 2) + mapPosition[0], communicate.gh_to_ch(y - game.POKER_SIZE / 2) + mapPosition[1],
        communicate.gw_to_cw(game.POKER_SIZE), communicate.gh_to_ch(game.POKER_SIZE));
    return layer1;
}
function putup_pic_dark(x, y, n) {
    var canvasDiv = document.getElementById("canvas_div");
    var layer1 = document.createElement('canvas');
    layer1.width = prW;
    layer1.height = prH;
    layer1.style = "display:none;"
    layer1.id = "pic_" + n + "_dark_canvas";
    canvasDiv.append(layer1);
    var layer1_canvas = layer1.getContext('2d');
    layer1_canvas.fillStyle = "rgba(0,0,0,0.25)";
    layer1_canvas.fillRect(communicate.gw_to_cw(x - game.POKER_SIZE / 2) + mapPosition[0], communicate.gh_to_ch(y - game.POKER_SIZE / 2) + mapPosition[1],
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
    let img = document.getElementById("img_candy_" + 1);
    switch (t) {
        case 1:
            layer1_canvas.fillStyle = "#F00FF0";
            img = document.getElementById("img_candy_" + t);
            break;
        case 2:
            layer1_canvas.fillStyle = "#FF0000";
            img = document.getElementById("img_candy_" + t);
            break;
        case 3:
            layer1_canvas.fillStyle = "#00FF00";
            img = document.getElementById("img_candy_" + t);
            break;
        case 4:
            layer1_canvas.fillStyle = "#0000FF";
            img = document.getElementById("img_candy_" + t);
            break;
    }
    layer1_canvas.drawImage(img, n * window.canSize[0] / 7 + 2 + window.canPosition[0], parseInt(window.canPosition[1]) + 2,
        parseInt(window.canSize[0] / 7) - 4, parseInt(window.canSize[0] / 7) - 4);
    layer1_canvas.strokeRect(n * window.canSize[0] / 7 + 2 + window.canPosition[0], parseInt(window.canPosition[1]) + 2,
        parseInt(window.canSize[0] / 7) - 4, parseInt(window.canSize[0] / 7) - 4);
    return layer1;
}
function put_pics_first() {
    // ?????????????????????
    // ????????????????????????????????????
    var canvas = document.getElementById("botton_canvas").getContext("2d");
    for (var i = 1; i <= game.amount; i++) {
        putup_pic(game.get_poker_x(i), game.get_poker_y(i), i, game.get_poker_t(i));
        putup_pic_dark(game.get_poker_x(i), game.get_poker_y(i), i);
        canvas.drawImage(document.getElementById("pic_" + i + "_canvas"), 0, 0, prW, prH, 0, 0, prW, prH);
        if (!game.get_poker_a(i)) {
            canvas.drawImage(document.getElementById("pic_" + i + "_dark_canvas"), 0, 0, prW, prH, 0, 0, prW, prH);
        }
    }
}
function put_pics() {
    var canvas = document.getElementById("botton_canvas").getContext("2d");
    for (var i = 1; i <= game.amount; i++) {
        if (game.get_poker_have(i)) {
            canvas.drawImage(document.getElementById("pic_" + i + "_canvas"), 0, 0, prW, prH, 0, 0, prW, prH);
            if (!game.get_poker_a(i)) {
                canvas.drawImage(document.getElementById("pic_" + i + "_dark_canvas"), 0, 0, prW, prH, 0, 0, prW, prH);
            }
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
function miegame_put_background() {
    // ??????
    var canvas = document.getElementById("botton_canvas").getContext("2d");
    canvas.fillStyle = "#f58f98";
    canvas.fillRect(0, 0,
        parseInt(window.prW), parseInt(window.prH));
    // ???????????????
    let img = document.getElementById("img_ctrl_close");
    canvas.drawImage(img, window.headerPosition[0], window.headerPosition[1], window.headerSize[1] * 0.6, window.headerSize[1] * 0.6);
    // ??????
    canvas.fillStyle = "rgba(255,255,255,0.5)";
    canvas.fillRect(window.mapPosition[0], window.mapPosition[1],
        window.mapSize, window.mapSize);
    // ?????????
    canvas.fillStyle = "rgba(255,255,255,0.5)";
    canvas.fillRect(window.frePosition[0], window.frePosition[1],
        window.freSize[0], window.freSize[1]);
    // ?????????
    canvas.fillStyle = "rgba(255,255,255,0.5)";
    canvas.fillRect(window.canPosition[0], window.canPosition[1],
        window.canSize[0], window.canSize[1]);
    // ?????????
    canvas.fillStyle = "rgba(255,255,255,0.5)";
    canvas.fillRect(window.propsPosition[0], window.propsPosition[1],
        window.propsSize[0], window.propsSize[1]);

}
function miegame_action(cx, cy) {
    // ???????????????????????????
    document.getElementById('audiomusic').play();
    if (cx >= mapPosition[0] && cx <= mapPosition[0] + mapSize && cy >= mapPosition[1] && cy <= mapPosition[1] + mapSize) {
        // ?????????????????????????????????
        var gx = communicate.cw_to_gw(cx - mapPosition[0]);
        var gy = communicate.ch_to_gh(cy - mapPosition[1]);
        //  ??????????????????????????????
        //console.log("x:" + cx + ",y:" + cy);
        console.log("gx:" + gx + ",gy:" + gy);
        // ?????????
        can.place_a_poker(game.takeaway_a_poker(gx, gy));
        can.eliminate_pokers();
        game.refresh_poker_a();
        if (can.get_poker_fall()) {
            // ??????????????????
            wait_loding();
            window.forInterface = setInterval(miegame_fail, 2000);
        } else { }
        if (game.residue == 0) {
            // ????????????????????????
            wait_loding();
            window.forInterface = setInterval(miegame_win, 2000);
        }
        clearn_canvas();
        miegame_put_background()
        put_pics();
        put_can();
        print_canvas();
    } else if (cx >= window.headerPosition[0] && cx <= window.headerPosition[0] + window.headerSize[1] * 0.6 && cy >= window.headerPosition[1] && cy <= window.headerPosition[1] + window.headerSize[1] * 0.6) {
        // ????????????????????????
        window.nowPage = 0;
        document.getElementById("canvas_div").innerHTML = "";
        var canvasDiv = document.getElementById("canvas_div");
        var layer1 = document.createElement('canvas');
        layer1.width = prW;
        layer1.height = prH;
        layer1.id = "botton_canvas";
        canvasDiv.append(layer1);
        main_index();
    }
}

function miegame_win() {
    console.log("win");
    clearInterval(window.forInterface);
    let post = { ask: "level", main: "level", playerCode: window.gameJson.playerCode, id: ++window.level };
    if (window.level <= window.level_amount) {
        SERVO(post);
    } else {
        window.nowPage = 0;
        clearInterval(window.interval_loding);
        document.getElementById("canvas_div").innerHTML = "";
        var canvasDiv = document.getElementById("canvas_div");
        var layer1 = document.createElement('canvas');
        layer1.width = prW;
        layer1.height = prH;
        layer1.id = "botton_canvas";
        canvasDiv.append(layer1);
        main_index();
    }
}

function miegame_fail() {
    console.log("fail");
    clearInterval(window.forInterface);
    clearInterval(window.interval_loding);
    window.nowPage = 0;
    document.getElementById("canvas_div").innerHTML = "";
    var canvasDiv = document.getElementById("canvas_div");
    var layer1 = document.createElement('canvas');
    layer1.width = prW;
    layer1.height = prH;
    layer1.id = "botton_canvas";
    canvasDiv.append(layer1);
    main_index();
}
