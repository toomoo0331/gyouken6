window.onload = function(){
	console.log("faf");
	set_selectbox();
}

function add_name(){
	this.json_name = "json/select_box.json";
	this.flag=false;
	this.array_name=[];
	this.set_selectbox();
}

function get_name() {
	return this.json_name;
}

function set_selectbox(){
	var script = document.createElement('script');
	script.src = "json/select_box.json";
	document.getElementsByTagName('head')[0].appendChild(script);
	console.log(document.getElementsByTagName('head')[0].children[0]);


}

window.feed_select = function(results) {
	let elm = document.createElement('div');
	for (var i = 0; i < results.features.length; i++) {
		var coords = results.features[i];
		elm.class="item"
		elm.map_name=coords.map;
		elm.map_num=coords.num;
		document.getElementById("grid_map").appendChild(elm);
	}
	console.log(document.getElementById("grid_map").children);
}

var bool_addMap = Boolean("");

function load_map(){
const textbox = document.getElementById("map_name");
  const inputValue = textbox.value;
  var img = document.getElementById("add_map_for_map_img");
  img.src="map/"+inputValue;
  bool_addMap = Boolean("true");
}


function add_map(){
	if(bool_addMap){
		console.log("add_map");
	}
	bool_addMap = Boolean("");
}

function save(){

}