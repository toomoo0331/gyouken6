
  
// 　　　map更新時の処理
// 　　　map_baseの子要素を削除したうえで
// 　　　set_map()で新たに子要素を追加する．
  function set_map(value) {
    document.getElementById('map_img').src="map/map"+value+".jpg";
    //document.getElementById('map_img').src="map/map.jpg";
    var script = document.createElement('script');
    script.src = "json/map"+value+".json";
    document.getElementsByTagName('head')[0].appendChild(script);
    map_for_addimg=value;
  };
  
  function change_map(value) {
    let tmp_i=document.getElementById('map_base').children.length;
    for(let i = 1; i < tmp_i; i++){
      document.getElementById('map_base').removeChild(document.getElementById('map_base').children[1]);
    }
    set_map(value)
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


　
//map_baseに子要素を追加する処理
//jsonファイルを読み込んで追加する．
 window.feed_callback = function(results) {
  for (var i = 0; i < results.features.length; i++) {
    var coords = results.features[i];
    addNote(coords.x,coords.y,coords.img);
  }
}
function addNote(x,y,name) {
  let elm = document.createElement('div');
  elm.className = 'note';
  elm.style.top = y+'%';
  elm.style.left = x+'%';
  let elm_mark = document.createElement('span');
  elm_mark.className = 'mark';
  elm_mark.img_name = name.split(".")[0];
  let elm_name = document.createElement('span');
  elm_name.className = 'camera_name';
  elm_name.textContent = "camera"+name.split(".")[0];

  elm_mark.onclick = function () {
    window.parent.set_img(elm_mark.img_name);
  }
  elm.appendChild(elm_mark);
  elm.appendChild(elm_name);
  document.getElementById('map_base').appendChild(elm);
}
