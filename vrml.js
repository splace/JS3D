
viewTransform=new vrml.VrmlMatrix().setTransform(new vrml.SFVec3f(0,0,10));
viewTransform=viewTransform.multRight(new vrml.VrmlMatrix().setTransform(new vrml.SFVec3f(0,0,0),new vrml.SFRotation(1,0,0,0)));

viewAngle=content.getAttribute("viewAngle");

function responseToMouse(event){
viewTransform=viewTransform.multRight(responseToMouse.modes[responseToMouse.mode].movement(event.clientX-xl,event.clientY-yl));
drawAll(objects);
xl=event.clientX;
yl=event.clientY;

};

responseToMouse.path=geometry.firstChild.nextSibling;
responseToMouse.content=content;
responseToMouse.modes={
length:4,
0:{name:"study",
available:true,
movement:function(dx,dy){
var rot=new vrml.SFRotation(0,1,0,Math.sqrt(dx*dx+dy*dy)/100);
rot.setAxis(new vrml.SFVec3f(0,0,1).cross(new vrml.SFVec3f(dx,dy,0)).normalize());
return new vrml.VrmlMatrix().setTransform(new vrml.SFVec3f(0,0,0),rot)}
},
1:{name:"walk",
available:true,
movement:function(dx,dy){
return new vrml.VrmlMatrix().setTransform(new vrml.SFVec3f(0,0,dy/50),new vrml.SFRotation(0,1,0,-dx/300))}
},
2:{name:"slide",
available:true,
movement:function(dx,dy){
return new vrml.VrmlMatrix().setTransform(new vrml.SFVec3f(dx/40,dy/40,0))}
},
3:{name:"pan",
available:true,
movement:function(dx,dy){
return new vrml.VrmlMatrix().setTransform(new vrml.SFVec3f(0,0,0),new vrml.SFRotation(new vrml.SFVec3f(dy,-dx,0).normalize(),Math.sqrt(dx*dx+dy*dy)/300))}
}
};

for (var i=0;i<responseToMouse.modes.length;i++){responseToMouse.modes[responseToMouse.modes[i].name]=i;};

responseToMouse.mode=responseToMouse.modes["walk"];

basicShapes={
box:{
coordinates:["-1 -1 -1","-1 1 -1","1 1 -1","1 -1 -1","-1 -1 1","-1 1 1","1 1 1","1 -1 1"],
indexes:["0 1 2 3","6 7 3 2","7 6 5 4","4 5 1 0","1 5 6 2","4 0 3 7"]
},
cylinder:{
coordinates:["1 -1 0",".951057 -1 .309017",".809017 -1 .587785",".587785 -1 .809017",".309017 -1 .951056","0 -1 1","-.309017 -1 .951057","-.587785 -1 .809017","-.809017 -1 .587786","-.951056 -1 .309018","-1 -1 0","-.951057 -1 -.309016","-.809017 -1 -.587785","-.587786 -1 -.809016","-.309018 -1 -.951056","0 -1 -1",".309016 -1 -.951057",".587784 -1 -.809018",".809016 -1 -.587786",".951056 -1 -.309018","1 1 0",".951057 1 .309017",".809017 1 .587785",".587785 1 .809017",".309017 1 .951056","0 1 1","-.309017 1 .951057","-.587785 1 .809017","-.809017 1 .587786","-.951056 1 .309018","-1 1 0","-.951057 1 -.309016","-.809017 1 -.587785","-.587786 1 -.809016","-.309018 1 -.951056","0 1 -1",".309016 1 -.951057",".587784 1 -.809018",".809016 1 -.587786",".951056 1 -.309018","0 0 0"],
indexes:["0 19 39 20","1 0 20 21","2 1 21 22","3 2 22 23","4 3 23 24","5 4 24 25","6 5 25 26","7 6 26 27","8 7 27 28","9 8 28 29","10 9 29 30","11 10 30 31","12 11 31 32","13 12 32 33","14 13 33 34","15 14 34 35","16 15 35 36","17 16 36 37","18 17 37 38","19 18 38 39","0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19","39 38 37 36 35 34 33 32 31 30 29 28 27 26 25 24 23 22 21 20"]
},
cone:{
coordinates:["1 -1 0","0.951057 -1 0.309017","0.809017 -1 0.587785","0.587785 -1 0.809017","0.309017 -1 0.951056","0 -1 1","-0.309017 -1 0.951057","-0.587785 -1 0.809017","-0.809017 -1 0.587786","-0.951056 -1 0.309017","-1 -1 0","-0.951057 -1 -0.309015","-0.809017 -1 -0.587785","-0.587786 -1 -0.809014","-0.309017 -1 -0.951056","0 -1 -1","0.309015 -1 -0.951057","0.587782 -1 -0.809018","0.809014 -1 -0.587786","0.951056 -1 -0.309017","0 1 0"],
indexes:["0 19 20","1 0 20","2 1 20","3 2 20","4 3 20","5 4 20","6 5 20","7 6 20","8 7 20","9 8 20","10 9 20","11 10 20","12 11 20","13 12 20","14 13 20","15 14 20","16 15 20","17 16 20","18 17 20","19 18 20","0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19"]
},
sphere:{
coordinates:["0.2319284 0.1389806 0.9727329","-0.01318484 0.2700603 0.9727329","-0.2443637 0.1157271 0.9727329","-0.2172871 -0.1609121 0.9727329","0.2319284 -0.3474105 0.9727329","0.6328167 -0.1609121 0.7700428","0.6569803 0.1157271 0.7578256","0.450672 0.2700603 0.8621356","0.4118671 0.524768 0.7578256","-0.03494478 0.7157612 0.7792039","-0.4610267 0.4821517 0.7578256","-0.4748357 0.2248753 0.8621356","-0.807821 -0.07906707 0.6796085","-0.4222218 -0.3126766 0.8621356","-0.3587899 -0.5623929 0.7578256","-0.09402938 -0.6461487 0.7700428","0.4313637 -0.6461487 0.6447735","0.6621283 -0.5623929 0.5144084","0.7658016 -0.3126766 0.5788755","0.9153902 -0.1791742 0.3863585","0.9295636 0.3067204 0.4031479","0.5815764 0.6106627 0.5551356","0.4862954 0.8008226 0.3761854","0.2267217 0.8942775 0.4100984","-0.3127563 0.8679392 0.4100984","-0.561992 0.7496433 0.3761854","-0.6382961 0.5511063 0.5551356","-0.8192969 0.3588645 0.4682782","-0.7341657 -0.5109127 0.4682782","-0.519325 -0.6644108 0.5551356","-0.3209764 -0.9793389 0.2419992","-0.00485529 -0.8271609 0.5788755","0.2655267 -0.8271609 0.5144084","0.3398819 -0.9141271 0.2610892","0.7527863 -0.7409091 0.07113717","0.9528016 -0.3029775 0.1403188","0.9961858 -0.1420654 -0.08213905","0.9996924 0.1335024 -0.04591079","0.7933841 0.6216485 0.05839917","0.5952976 0.8064762 0.120551","0.3209764 0.9793389 -0.2419992","0.09090658 0.9880731 0.186449","-0.1867239 0.9745186 0.186449","-0.3170919 0.9567434 -0.05839917","-0.7527863 0.7409091 -0.07113717","-0.9137039 0.3760884 0.2074084","-0.9961858 0.1420654 0.08213905","-0.9795717 -0.09587751 0.2248609","-0.9497342 -0.3325262 0.08213905","-0.8234415 -0.5461149 0.2074084","-0.6928012 -0.732814 0.04822608","0.1396282 -0.9961493 0.08663801","0.1867239 -0.9745186 -0.186449","0.431396 -0.8720954 -0.2695602","0.8102012 -0.4943842 -0.3442004","0.9227997 -0.2405687 -0.3314862","0.807821 0.07906707 -0.6796085","0.9296135 0.2949013 -0.2610892","0.8234415 0.5461149 -0.2074084","0.6537036 0.6597031 -0.3959533","-0.1624182 0.953533 -0.289328","-0.2655267 0.8271609 -0.5144084","-0.5174473 0.7111833 -0.4957643","-0.8861738 0.3523188 -0.3314862","-0.982018 0.1298329 -0.1951912","-0.9295636 -0.3067204 -0.4031479","-0.6958805 -0.6953107 -0.2271762","-0.4862954 -0.8008226 -0.3761854","-0.2855458 -0.9378397 -0.2413213","-0.03208251 -0.9445109 -0.3552261","0.03494478 -0.7157612 -0.7792039","0.4433524 -0.7454871 -0.5167237","0.6382961 -0.5511063 -0.5551356","0.5887621 -0.3507883 -0.7413652","0.5997871 0.5156204 -0.6274605","0.3587899 0.5623929 -0.7578256","0.1854095 0.7505892 -0.6492725","-0.08652481 0.7227204 -0.6996458","-0.2319284 0.3474105 -0.9727329","-0.5760447 0.4973583 -0.6634176","-0.7658016 0.3126766 -0.5788755","-0.7481168 0.05280211 -0.675906","-0.571274 -0.4571647 -0.6956738","-0.4221694 -0.678266 -0.6172874","0.3471003 -0.3562388 -0.878596","0.2443637 -0.1157271 -0.9727329","0.3891294 0.1165623 -0.9242874","0.2503795 0.3570264 -0.910581","-0.5416803 -0.007617117 -0.8519625","-0.450672 -0.2700603 -0.8621356","-0.1878216 -0.3146939 -0.9407478","-0.03092203 -0.09434697 -1.004718"],
indexes:["4 0 1 2 3","0 4 5 6 7","1 0 7 8 9","2 1 9 10 11","3 2 11 12 13","4 3 13 14 15","5 4 16 17 18","6 5 18 19 20","7 6 20 21 8","9 8 21 22 23","10 9 24 25 26","11 10 26 27 12","13 12 28 29 14","15 14 29 30 31","4 15 31 32 16","17 16 32 33 34","18 17 34 35 19","20 19 35 36 37","21 20 38 39 22","23 22 39 40 41","9 23 41 42 24","25 24 42 43 44","26 25 44 45 27","12 27 45 46 47","28 12 47 48 49","29 28 49 50 30","31 30 51 33 32","34 33 51 52 53","35 34 54 55 36","37 36 55 56 57","20 37 57 58 38","39 38 58 59 40","41 40 60 43 42","44 43 60 61 62","45 44 63 64 46","47 46 64 65 48","49 48 65 66 50","30 50 66 67 68","51 30 68 69 52","53 52 69 70 71","34 53 71 72 54","55 54 72 73 56","57 56 74 59 58","40 59 74 75 76","60 40 76 77 61","62 61 77 78 79","44 62 79 80 63","64 63 80 81 65","66 65 82 83 67","68 67 83 70 69","71 70 84 73 72","56 73 84 85 86","74 56 86 87 75","76 75 87 78 77","79 78 88 81 80","65 81 88 89 82","83 82 89 90 70","84 70 90 91 85","86 85 91 78 87","88 78 91 90 89"]
}
}

function addPanListener(event){
if (event.button==0){
event.preventDefault();
xl=event.clientX;
yl=event.clientY;
responseToMouse.content.addEventListener("mousemove",responseToMouse, true);
geometry.setAttribute("fill","LightGrey");
};
};
function removePanListener(event){
if (event.button==0){
responseToMouse.content.removeEventListener("mousemove",responseToMouse, true);
geometry.removeAttribute("fill");
};
};

content.addEventListener("mousedown",addPanListener, true);
content.addEventListener("mouseup",removePanListener, true);

calcPath=function(object,matrix,res){
r=res?res/viewAngle:1000/viewAngle;
var ro=r/2;
var loc={x:0,y:0};
var loc0={x:0,y:0};
var xl,yl;
var temp="";
var theta,rad;
var vec;
var coords=object.coords.multMatrix(matrix);
var k;
for (var j=0;object.indexes.length>j;j++){
itemIndexes=object.indexes[j];
vec=coords[itemIndexes[0]];
if (coords[itemIndexes[1]].subtract(vec).cross(coords[itemIndexes[itemIndexes.length-1]].subtract(vec)).dot(vec)>0){continue;};
loc0=calcPath.projection(vec);
temp+="M"+Math.round(loc0.x)+","+Math.round(loc0.y);
xl=loc0.x;
yl=loc0.y;
for (k=1;itemIndexes.length>k;k++){
loc=calcPath.projection(coords[itemIndexes[k]]);
// use polynomial curves, calc'd from three points in space, when within half view angle
if (loc.x>ro || loc.x<-ro || loc.y>ro || loc.y<-ro || xl>ro || xl<-ro || yl>ro || yl<-ro){
loc2=calcPath.projection(coords[itemIndexes[k]].slerp(coords[itemIndexes[k-1]],.5));
temp+="q"+Math.round(loc2.x-xl)+","+Math.round(loc2.y-yl)+","+Math.round(loc.x-xl)+","+Math.round(loc.y-yl);
} else {
temp+="l"+Math.round(loc.x-xl)+","+Math.round(loc.y-yl);
};
xl=loc.x;
yl=loc.y;
};
if (loc0.x>ro || loc0.x<-ro || loc0.y>ro || loc0.y<-ro || xl>ro || xl<-ro || yl>ro || yl<-ro){
loc2=calcPath.projection(coords[itemIndexes[0]].slerp(coords[itemIndexes[itemIndexes.length-1]],.5));
temp+="q"+Math.round(loc2.x-xl)+","+Math.round(loc2.y-yl)+","+Math.round(loc0.x-xl)+","+Math.round(loc0.y-yl)+"Z";
} else {
temp+="l"+Math.round(loc0.x-xl)+","+Math.round(loc0.y-yl)+"Z";
};
};
return temp
};
// functions to convert arrays of delimited lists of numbers in strings, into objects
parse={
coordinates:function(coordsList){
var temp=new vrml.MFVec3f();
for (j=0;coordsList.length>j;++j){
coordList=coordsList[j].split(/ +/,32000);
temp.push(new vrml.SFVec3f(coordList[0],coordList[1],coordList[2]));
};
return temp
},
indexes:function(indexsList,minIndexes){
var temp=new Array();
for (var j=0;indexsList.length>j;++j){
indexList=indexsList[j].split(/ *, *| +/,32000);
var temp2= new Array();
for (var k=0;indexList.length>k;++k){
if (indexList[k]){temp2.push(indexList[k])};
};
if (!minIndexes || temp2.length>=minIndexes){temp.push(temp2);};
};
return temp
}
};

calcPath.projection=function(vec){
theta=Math.atan2(vec.y,vec.x);
rad=Math.atan2(Math.sqrt(vec.x*vec.x+vec.y*vec.y),vec.z)*r;
return {x:Math.cos(theta)*rad,y:Math.sin(theta)*rad}
};

//shapes=document.getElementById("shapes");
//ifsList=document.getElementsByTagNameNS("http://www.web3d.org/specifications/x3d-3.0","IndexedFaceSet");
shapeList=document.getElementsByTagNameNS("http://www.web3d.org/specifications/x3d-3.0","Shape");
objects=new Array();
for (var i=0;shapeList.length>i;i++){

if (shapeList[i].getElementsByTagNameNS("http://www.web3d.org/specifications/x3d-3.0","IndexedFaceSet").length){
coor=shapeList[i].getElementsByTagNameNS("http://www.web3d.org/specifications/x3d-3.0","IndexedFaceSet")[0].getElementsByTagNameNS("http://www.web3d.org/specifications/x3d-3.0","Coordinate")[0].getAttributeNode("point").value.split(/ *, */,32000);
ind=shapeList[i].getElementsByTagNameNS("http://www.web3d.org/specifications/x3d-3.0","IndexedFaceSet")[0].getAttributeNode("coordIndex").value.split("-1",32000);
};
if (shapeList[i].getElementsByTagNameNS("http://www.web3d.org/specifications/x3d-3.0","Box").length){
coor=basicShapes.box.coordinates;
ind=basicShapes.box.indexes;
};
if (shapeList[i].getElementsByTagNameNS("http://www.web3d.org/specifications/x3d-3.0","Cone").length){
coor=basicShapes.cone.coordinates;
ind=basicShapes.cone.indexes;
};
if (shapeList[i].getElementsByTagNameNS("http://www.web3d.org/specifications/x3d-3.0","Cylinder").length){
coor=basicShapes.cylinder.coordinates;
ind=basicShapes.cylinder.indexes;
};
if (shapeList[i].getElementsByTagNameNS("http://www.web3d.org/specifications/x3d-3.0","Sphere").length){
coor=basicShapes.sphere.coordinates;
ind=basicShapes.sphere.indexes;
};

objects.push({
node:shapeList[i]
,colour:shapeList[i].hasAttribute("colour")?shapeList[i].getAttribute("colour"):"none"
//,baseTransform:new vrml.VrmlMatrix()
,baseTransform:new vrml.VrmlMatrix().setTransform(new vrml.SFVec3d(shapeList[i].hasAttribute("x")?shapeList[i].getAttribute("x"):0,shapeList[i].hasAttribute("y")?shapeList[i].getAttribute("y"):0,shapeList[i].hasAttribute("z")?shapeList[i].getAttribute("z"):0),new vrml.SFRotation(shapeList[i].hasAttribute("rx")?shapeList[i].getAttribute("rx"):0,shapeList[i].hasAttribute("ry")?shapeList[i].getAttribute("ry"):1,shapeList[i].hasAttribute("rz")?shapeList[i].getAttribute("rz"):0,shapeList[i].hasAttribute("rt")?shapeList[i].getAttribute("rt"):0 ),new vrml.SFVec3d(shapeList[i].hasAttribute("sx")?shapeList[i].getAttribute("sx"):1,shapeList[i].hasAttribute("sy")?shapeList[i].getAttribute("sy"):1,shapeList[i].hasAttribute("sz")?shapeList[i].getAttribute("sz"):1)  )
// add NS and "http://www.w3.org/2000/svg",
,coords:parse.coordinates(coor)
,indexes:parse.indexes(ind,2)
});
};
//h2.textContent+=objects[0].baseTransform;
//h2.textContent+=shapeList[0].getAttributeNode("x").value;

// change number index to object references.
for (var i=0;objects.length>i;i++){

};
// make vertex lists
for (var i=0;objects.length>i;i++){
for (var j=0;objects[i].indexes.length>j;j++){
objects[i].indexes.verts=new Array();
for (var k=0;objects[i].indexes[j].length>=k;k++){
objects[i].indexes.verts.push([objects[i].coords[objects[i].indexes[j][k]],objects[i].coords[objects[i].indexes[j][k+1]]]);
};
if (objects[i].coords[objects[i].indexes[j][k]]!=objects[i].coords[objects[i].indexes[j][0]]){
objects[i].indexes.verts.push([objects[i].coords[objects[i].indexes[j][k]],objects[i].coords[objects[i].indexes[j][0]]]);
};
};
};


var currentDist;
var dist;
for (var i=0;objects.length>i;i++){
// find the two points that are the farthest apart, defining a bounding sphere (wrong)
objects[i].farthestApartee=0;
currentDist=0;
for (var j=0;objects[i].coords.length>j;j++){
if (j==objects[i].farthestApartee){continue;};
dist=objects[i].coords[objects[i].farthestApartee].subtract(objects[i].coords[j]).length();
if (currentDist<dist){
currentDist=dist;
objects[i].farthestAparteez=objects[i].farthestApartee;
objects[i].farthestApartee=j;
j=-1;
};
};
var diam=currentDist;
for (var j=0;objects[i].coords.length>j;j++){
if (j==objects[i].farthestApartee || j==objects[i].farthestAparteez){continue;};
dist=objects[i].coords[objects[i].farthestApartee].subtract(objects[i].coords[j]).length()+objects[i].coords[objects[i].farthestAparteez].subtract(objects[i].coords[j]).length();
if (currentDist<dist){
currentDist=dist;
objects[i].farthestAparteezz=j;
};
};
if (currentDist<=diam*Math.SQRT2){
objects[i].boundingSphere={
centre:objects[i].coords[objects[i].farthestAparteez].slerp(objects[i].coords[objects[i].farthestApartee],.5),
diameter:diam};
} else {
objects[i].boundingSphere={
centre:objects[i].coords[objects[i].farthestAparteez].slerp(objects[i].coords[objects[i].farthestApartee],.5),
diameter:diam};
};
};

//h2.textContent="vrml type objects: "+vrml.count;
//h2.textContent=objects[2].boundingSphere.centre+":r"+objects[2].boundingSphere.diameter/2;

function drawAll(o){
drawAll.startTime=new Date();
var painting=new Array();
var trans;
var count;
for (var i=0;o.length>i;++i){
trans=viewTransform.multLeft(o[i].baseTransform);
if (trans[14]<0){continue;};  // skip objects with -ve z position
// optimise: build record of distances from viewer, so dont recalculate for sort
painting.push({index:i,transform:trans,distance:trans.getTranslation().length()});
// non-optimised; painting.push({index:i,transform:trans});
};
painting.sort(function (x,y){return y.distance-x.distance});
// non-optimised; painting.sort(function (x,y){return y.transform.getTranslation().length()-x.transform.getTranslation().length()});


for (var i=0;painting.length>i;++i){
shapes[i].setAttribute("d",calcPath(o[painting[i].index],painting[i].transform));
shapes[i].setAttribute("fill",o[painting[i].index].colour);
};
count=i;
for (;drawAll.count>i;++i){
shapes[i].setAttribute("d","M0,0");
};
drawAll.count=count;
content.forceRedraw();
//h2.textContent=(new Date()-drawAll.startTime)/1000;
hd.textContent=parseInt(1000/(new Date()-drawAll.startTime))+"fps";
};
drawAll.count=10;
//      for (i=0;1000>i;++i){
//svg.forceRedraw();
//       line[0].setAttribute("d","M0,0");

//};
//debug.Verbose=true;
//debug.print(svg);
//this.h1.textContent=path;


