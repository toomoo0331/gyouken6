  var url = new URL(window.location.href);

  var params = url.searchParams;

  let name_ann = "";
  if (params.get('ann') == 1){
    name_ann="./ann/";
  }else{
    name_ann="./img/"
  }
  var name = name_ann+params.get('num')+'.jpg';
  
  var x = parseFloat(params.get("x"));
  var y = parseFloat(params.get("y"));
  var z = parseFloat(params.get("z"));
  var zoom = parseFloat(params.get('zoom'));
  var firstview_xy=[calculate_xyz(x,y,z)[0],calculate_xyz(x,y,z)[1],zoom];

  var img = new ThView({id:'image-1', file:name, width:window.innerWidth,
    height:window.innerHeight,rotation:false, firstview:firstview_xy[0], firstview_y:firstview_xy[1], zoom:firstview_xy[2]});


  function getCameraDir(){
    //カメラの角度を取得する関数
    var x = img.getCameraDir().x;
    var y = img.getCameraDir().y;
    var z = img.getCameraDir().z;
    var zoom = img.getCameraZoom();
    window.parent.setCameraDir(x,y,z,zoom);
  }

  function calculate_xyz(x,y,z){
    //カメラの画角を全天球から極座標へ変換する関数
    var tmp_theta=0;
    var tmp_phai=0;
    if (x>0){
      tmp_theta=-1*((Math.acos(z/(x*x+y*y+z*z))*180)/Math.PI);
    }else{
      tmp_theta=(Math.acos(z/(x*x+y*y+z*z))*180)/Math.PI;
    }
    if (x==0 || y==0){
      tmp_phai=0;
    }else if(x>0){
      tmp_phai=-1*(Math.atan(y/x)*180)/Math.PI;
    }else{
      tmp_phai=(Math.atan(y/x)*180)/Math.PI;
    }
    return [tmp_theta,tmp_phai];
  }