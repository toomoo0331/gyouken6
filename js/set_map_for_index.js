
// 　　　画面ロード時の処理
// 　　　map変更時に常にmap_baseの子要素を削除するため，
// 　　　初期値としてmap1を読み込み子要素を用意しておく 

  window.onload = function(){
    document.getElementById("Iframe_map").contentWindow.set_map("1");
    set_selectbox();
  }

  function set_selectbox(){
    var script = document.createElement('script');
    script.src = "json/select_box.json";
    document.getElementsByTagName('head')[0].appendChild(script);
    console.log("asdfa");
    console.log(document.getElementsByTagName('head')[0]);
  }

window.feed_select = function(results) {
  document["ad"]["myselect"].length = results.features.length+1;
  document["ad"]["myselect"].options[0].text = "選ぶ";
  document["ad"]["myselect"].options[0].value ="";
  for (var i = 1; i < results.features.length+1; i++) {
    var coords = results.features[i-1];
    document["ad"]["myselect"].options[i].text = coords.map;
    document["ad"]["myselect"].options[i].value = coords.num;
  }
}

var map_for_addimg=1;


// 　　　map更新時の処理
// 　　　map_baseの子要素を削除したうえで
// 　　　set_map()で新たに子要素を追加する．
const selected = document.getElementById("change_js");
  selected.onchange = function() {
    document.getElementById("Iframe_map").contentWindow.change_map(selected.value)
  };  


  function get_map(){
    return map_for_addimg;
  }

  window.feed_callback = function(results) {
  for (var i = 0; i < results.features.length; i++) {
    var coords = results.features[i];
    addNote(coords.x,coords.y,coords.img);
  }
}