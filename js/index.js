//アノテーションボタンを押したときの処理
//triggar_iframe()で，視点の方向を取得する．
var tmp_xyz =[]
function OnButtonClick_ann() {
  triggar_iframe();
  var tmp_src=document.getElementById('exampleIframe').src;
  if(tmp_src.split("&")[1]=="ann=0"){
    document.getElementById('exampleIframe').src=tmp_src.split("&")[0]+"&ann=1&x="+tmp_xyz[0]+"&y="+tmp_xyz[1]+"&z="+tmp_xyz[2]+"&zoom="+tmp_xyz[3];
  }
  else if(tmp_src.split("&")[1]=="ann=1"){
    document.getElementById('exampleIframe').src=tmp_src.split("&")[0]+"&ann=0&x="+tmp_xyz[0]+"&y="+tmp_xyz[1]+"&z="+tmp_xyz[2]+"&zoom="+tmp_xyz[3];
  }
}


//tmp_img.htmlのgetCameraDir()を呼び出す．
//getCameraDir()は本ファイルのsetCameraDir()に引数(カメラの向きとzoom)を与えて呼ぶ関数．
function triggar_iframe(){
  document.getElementById("exampleIframe").contentWindow.getCameraDir();
}


//tmp_xyzに値を入れる関数
//
function setCameraDir(x,y,z,zoom){
  tmp_xyz=[x,y,z,zoom];
}


//show_map.jsから呼ばれる関数
//カメラを選択した時に，360度画像が変更されるようにする．
function set_img(value,x,y){
  document.getElementById('exampleIframe').src="show_img.html?num="+value+"&ann=0&x=0&y=0&z=1&zoom=70";
  set_num_for_step(x,y);
}


//
//「Find stepladderボタン」を押したときの処理
function OnButtonClick_findstep(){

}