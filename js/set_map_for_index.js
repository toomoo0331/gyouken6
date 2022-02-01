// 　　　画面ロード時の処理
// 　　　map変更時に常にmap_baseの子要素を削除するため，
// 　　　初期値としてmap1を読み込み子要素を用意しておく 
  window.onload = function(){
    document.getElementById("Iframe_map").contentWindow.set_map("1");
    set_selectbox();
  }

//
  function set_selectbox(){
    var script = document.createElement('script');
    script.src = "json/select_box.json";
    document.getElementsByTagName('head')[0].appendChild(script);
  }

window.feed_select = function(results) {
  document["ad"]["myselect"].length = results.features.length+1;
  document["ad"]["myselect"].options[0].text = "Select Map";
  document["ad"]["myselect"].options[0].value ="";
  for (var i = 1; i < results.features.length+1; i++) {
    var coords = results.features[i-1];
    document["ad"]["myselect"].options[i].text = coords.map;
    document["ad"]["myselect"].options[i].value = coords.num;
  }
}


// map更新時の処理
const selected = document.getElementById("change_js");
  selected.onchange = function() {
    document.getElementById("Iframe_map").contentWindow.change_map(selected.value)
  };  

