


function pad(num, size) {
    var s = "000000000" + num;
    return s.substr(s.length - size);
}

function add_indicator_style() {
    var exists = document.getElementById("exists");
    if (exists == null) {
        var exists = document.createElement("exists");
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = "\
#slidecontainer {width: 100%;\
outline: none;}\
\
.slider {-webkit-appearance: none;\
appearance: none;\
width: 300px;\
height: 75px;\
outline: none;\
opacity: 0.5;\
-webkit-transition: .2s;\
transition: opacity .2s;\
}\
\
.slider:hover {opacity: 1;\
outline: none;}\
.slider:focus { outline: none; }\
.slider::-webkit-slider-thumb {\
-webkit-appearance: none;\
appearance: none;\
width: 25px;\
height: 25px;\
background: #4CAF50;\
cursor: pointer;\
outline: none;}\
\
.slider::-moz-range-thumb {\
width: 25px;\
height: 25px;\
background: #4CAF50;\
cursor: pointer;\
outline: none;}"
        document.body.appendChild(exists);
        document.body.appendChild(css);
    }
}

function create_play_control(id,static_url) {

    var play_btn = static_url+"play-button.png";
    var pause_btn = static_url+"pause-button.png";
    var sound_id = "s_" + id;
    var source_id = "trk_" + id;
    var indicator_id = "ind_" + id;
    var var_data = document.createElement("VAR");
    var_data.id = "var_data_"+id;
    var_data.play_btn = play_btn;
    var_data.pause_btn = pause_btn;
    var_data.enable_update=true;

    var id=id;

    var play_button = document.createElement("input");
    play_button.type = "image";
    play_button.src = "play-button.png";
    play_button.style = "outline: none;";
    play_button.id = "pb_" + id;
    play_button.onclick = function () {
        if (document.getElementById(sound_id).paused) {
            document.getElementById(sound_id).play();
            document.getElementById("pb_" + id).src = pause_btn;
        }
        else {
            document.getElementById(sound_id).pause();
            document.getElementById("pb_" + id).src = play_btn;
        }
    };

    var ind = document.createElement("input");
    ind.type = "range";
    ind.min = "0";
    ind.max = "100";
    ind.value = "0";
    
    ind.className = "slider";
    ind.id = indicator_id;

    wrap_ind = document.createElement("div");
    wrap_ind.id = "slidecontainer";
    wrap_ind.appendChild(ind);

    ind.onmousedown = function () {
        var var_data = document.getElementById("var_data_"+id);
        var sound = document.getElementById(sound_id);
        var_data.wp = !sound.paused;
        sound.pause();
    };

    ind.onmouseup = function () {
        var var_data = document.getElementById("var_data_"+id);
        var sound = document.getElementById(sound_id);
        console.log(var_data.wp);
        if (var_data.wp) {
            sound.play();
        }
    };

    ind.onchange = function () {
        pos = this.value
        document.getElementById(sound_id).currentTime = ((pos / 100) * track_length);
    };


    ct = document.createElement("div");
    ct.id = "ct_" + id;
    ct.style = "display: inline";
    ct.innerHTML = "0:00";
    sep = document.createElement("div");
    sep.style = "display: inline";
    sep.innerHTML = '- ';
    pt = document.createElement("div");
    pt.id = "pt_" + id;
    pt.style = "display: inline";
    pt.innerHTML = "0:00";
    wrapper = document.createElement("div");
    wrapper.appendChild(ct);
    wrapper.appendChild(sep);
    wrapper.appendChild(pt);

    var pct = document.createElement('TABLE');
    tb = document.createElement("tbody");
    pr = document.createElement("ROW");
    c1 = document.createElement("TD");
    c2 = document.createElement("TD");
    c3 = document.createElement("TD");
    c3.setAttribute("style", "vertical-align:middle; font-size:2em;");
    c1.appendChild(play_button);
    c2.appendChild(wrap_ind);
    c3.appendChild(wrapper);
    pr.appendChild(c1);
    pr.appendChild(c2);
    pr.appendChild(c3);
    tb.appendChild(pr);
    pct.appendChild(tb);

    var source = document.createElement('source');
    source.id = source_id;
    sound = document.createElement('audio');
    sound.autoplay = true;
    sound.volume = 1.0;
    sound.id = sound_id;
    sound.appendChild(source);

    sound.onvolumechange = function () {
        volume = document.getElementById(sound_id).volume;
    };

    sound.onended = function () {
        document.getElementById("pb_" + id).src = play_btn;
        var_data = document.getElementById("var_data_"+id);
        var_data.wp = false;
        document.getElementById("ind_"+id).value = 0;

        callback = var_data.callback;
        if (callback && typeof(callback) === "function") {
              callback();
            }
    };

    sound.oncanplay = function () {
        var_data = document.getElementById("var_data_"+id);
        if(var_data.enable_update == true)
        {
            track_length = document.getElementById(sound_id).duration
            track_length = Math.round(track_length);
            sec = track_length % 60;
            min = Math.floor(track_length / 60);
            t_str = min + ":" + pad(sec + "", 2) + " "
            document.getElementById("pt_" + id).innerHTML=t_str;
        }
    }

    sound.ontimeupdate = function () {
        var_data = document.getElementById("var_data_"+id);
        if(var_data.enable_update == true)
        {
            currentTime = document.getElementById(sound_id).currentTime;
            currentTime = Math.round(currentTime);
            sec = currentTime % 60;
            min = Math.floor(currentTime / 60);
            t_str = min + ":" + pad(sec + "", 2) + " "
            document.getElementById("ct_" + id).innerHTML=t_str;
            slider = document.getElementById(indicator_id);
            slider.value = (currentTime / track_length) * 100;
        }
    }
    add_indicator_style();

    $("." + id).append($(pct));
    $("." + id).append($(var_data));
    $("." + id).append($(sound));

    if (document.getElementById(sound_id).paused) {
        document.getElementById("pb_" + id).src = pause_btn;
    }
}



function set_track(id,track_url)
{
    var source = document.getElementById("trk_" + id);
    var sound = document.getElementById("s_" + id);
    var_data = document.getElementById("var_data_"+id);
    var_data.enable_update = true;
    source.src = track_url;
    source.type = 'audio/mpeg';
    sound.autoplay = 'true';
    sound.load();
    sound.play();
}

function set_onended_callback(id,cb)
{
    var_data = document.getElementById("var_data_"+id);
    var_data.callback=cb;
}

function stop(id)
{
    try{
    var_data = document.getElementById("var_data_"+id);
    var_data.wp = false;
    var_data.enable_update = false;
    var sound = document.getElementById("s_" + id);
    sound.pause();
    sound.currentTime = 0;
    document.getElementById("pb_" + id).src = var_data.play_btn;
    document.getElementById("ct_" + id).innerHTML="0:00";
    document.getElementById("pt_" + id).innerHTML="0:00";}
    catch(err){}
}
