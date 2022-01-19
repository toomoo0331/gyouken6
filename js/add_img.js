var bool_addImg = Boolean("");

function load_img(){
  const textbox = document.getElementById("image_name");
  const inputValue = textbox.value;
  const words = inputValue.split('.');
  var img = document.getElementById("exampleIframe");
  img.src="tmp_img.html?num="+words[0]+"&ann=0&x=0&y=0&z=1&zoom=70"
  bool_addImg=Boolean("true");
}

function add_img(){
  if(bool_addImg){
    const textbox = document.getElementById("image_name");
    const inputValue = textbox.value;
    const words = inputValue.split('.');
    addNote(10,10,120,22,words[0]);
  }
  bool_addImg=Boolean("");
}

let reader = new FileReader();
  let huga = [];
  let fileCount = 1;

//jsonファイルの参照
function fileChanged(input){
  huga = [];                  // 初期化.  
  for(let i = 0; i < input.files.length; i++){
    reader.readAsText(input.files[i], 'UTF-8');
    reader.onload = () =>{
      huga = JSON.parse(reader.result);
  }
}

//jsonファイルの保存
function save(){
  var obj = [];
  for (let i = 0 ; i < document.querySelectorAll("span").length/3; i++){
      var tmp = {"img":document.querySelectorAll("span.camera_name")[i]["textContent"],
      "num":i,
      "x":Number(document.querySelectorAll("div.note")[i]["style"]["left"].slice(0,-1)),
      "y":Number(document.querySelectorAll("div.note")[i]["style"]["top"].slice(0,-1))
    }
    obj.push(tmp);
  }
  let hugastring = JSON.stringify(obj);
  hugastring = "feed_callback({'features':"+hugastring+"});";
  let blob = new Blob([hugastring],{type:"text/plan"});
  let link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = "map"+get_map('map')+'.json';
  link.click();  
}

function back(){
  window.location.href = "index.html";
}

//ここから下は，https://blog.ver001.com/javascript-move-element/を参照．カメラ位置をずらすやつ．
let note_active = null;

document.getElementById('map_base').addEventListener('mousemove', function () {
  if (note_active) {
    event.preventDefault();
    event.stopPropagation();
    let rect = this.getBoundingClientRect();
    let y = event.clientY - rect.top;
    let x = event.clientX - rect.left;
    let px = x / this.clientWidth * 100;
    let py = y / this.clientHeight * 100;
    px = Math.round(px*100)/100;
    py = Math.round(py*100)/100;
    if (px > 100) px = 100;
    if (py > 100) py = 100;
    if (px < 0) px = 0;
    if (py < 0) py = 0;
    note_active.style.left = px+'%';
    note_active.style.top = py+'%';
  }
});

document.getElementById('map_base').addEventListener('mouseclick', function () {
  if (note_active) {
    note_active = null;
  }
});

function addNote(x,y,comment=null)
{
  let elm = document.createElement('div');
  elm.className = 'note';
  elm.style.top = y+'%';
  elm.style.left = x+'%';
  let elm_mark = document.createElement('span');
  elm_mark.className = 'mark';


  let elm_remove = document.createElement('span');
  elm_remove.className = 'remove';
  elm_remove.textContent = 'x';

  let elm_text = document.createElement('span');
  elm_text.className = 'camera_name';
  elm_text.textContent = comment;

  elm_mark.onclick = function () {
    if (note_active) {
      note_active = null;
      elm_mark.style.border = '';
    } else {
      var img = document.getElementById("exampleIframe");
      img.src="tmp_img.html?num="+comment.split(".")[0]+"&ann=0&x=0&y=0&z=1&zoom=70"
      note_active = this.parentNode;
      elm_mark.style.border = '2px solid red';
    }
  };
  elm.onblur = function () {
    note_active = null;
  };
  elm_remove.onclick = function () {
    if (confirm('Will you remove this camera?')) {
      this.parentNode.parentNode.removeChild(elm);
    }
  };
  elm.appendChild(elm_mark);
  elm.appendChild(elm_text);
  elm.appendChild(elm_remove);
  document.getElementById('map_base').appendChild(elm);
};