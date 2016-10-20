
// set up mouse wheel zoom
content.addEventListener("mousewheel",function(event){
	viewAngle*=Math.pow(.9995,-event.wheelDelta);
	event.preventDefault();
	content.suspendRedraw(1000);
	startTime=new Date();
	drawAll(objects);
	rateDisplay.textContent=parseInt(100000/(new Date()-startTime))/100;
	content.unsuspendRedrawAll();
	}, false);

// fudge for firefox
// change viewangle with wheel on mouse (different browsers use different names and parameters, and scaling, for this event, WTF !!!) 
content.addEventListener("DOMMouseScroll",function(event){
	viewAngle*=Math.pow(.98,event.detail);
	event.preventDefault();
	content.suspendRedraw(1000);
	startTime=new Date();
	drawAll(objects);
	rateDisplay.textContent=parseInt(100000/(new Date()-startTime))/100;
	content.unsuspendRedrawAll();
	}, false);



// set up arrow keys
// only works in opera, other browsers havent implemented focusiong on svg content
content.addEventListener("keydown",function(event){event.preventDefault();responseToMovement({clientX:xl+codeTodX(event.keyCode),clientY:yl+codeTodY(event.keyCode)})},true);

arrowKeyScaling=10
function codeTodX(c){if(c==37){return -arrowKeyScaling}else{if (c==39){return arrowKeyScaling}};return 0}
function codeTodY(c){if(c==38){return -arrowKeyScaling}else{if (c==40){return arrowKeyScaling}};return 0}

// broswers use a different number for the middle button, this is just stupid
// chrome== 1, 

// set up middle button click for mode change
content.addEventListener("click",function(event){if(event.button==1){responseToMovement.mode=(responseToMovement.mode+1) % responseToMovement.modes.length;modeDisplay.textContent=responseToMovement.modes[responseToMovement.mode].name;}}, false);

// change transform in response to HID motion, and update display
function responseToMovement(event){
viewTransform=viewTransform.multRight(responseToMovement.modes[responseToMovement.mode].movement(event.clientX-xl,event.clientY-yl));
content.suspendRedraw(10000);
startTime=new Date();
drawAll(objects);
rateDisplay.textContent=parseInt(100000/(new Date()-startTime))/100;
content.unsuspendRedrawAll();
xl=event.clientX;
yl=event.clientY;
};

// state and maths for all modes held inside function
responseToMovement.mode=1;
responseToMovement.modes={
length:4,
0:{name:"study",
available:true,
movement:function(dx,dy){
//var rot=new vrml.SFRotation(0,1,0,Math.sqrt(dx*dx+dy*dy)/100);
//rot.setAxis(new vrml.SFVec3f(0,0,1).cross(new vrml.SFVec3f(dx,dy,0)).normalize());
//return new vrml.VrmlMatrix().setTransform(new vrml.SFVec3f(0,0,0),rot)}
return new vrml.VrmlMatrix(new vrml.SFVec3f(dx/40,dy/40,0)).multLeft(new vrml.VrmlMatrix(new vrml.SFVec3f(dx/40,dy/40,0),new vrml.SFRotation(new vrml.SFVec3f(dy,-dx,0).normalize(),Math.sqrt(dx*dx+dy*dy)/300)))}
},
1:{name:"walk",
available:true,
movement:function(dx,dy){
return new vrml.VrmlMatrix(new vrml.SFVec3f(0,0,dy/50),new vrml.SFRotation(0,1,0,-dx/300))}
},
2:{name:"slide",
available:true,
movement:function(dx,dy){
return new vrml.VrmlMatrix(new vrml.SFVec3f(dx/40,dy/40,0))}
},
3:{name:"pan",
available:true,
movement:function(dx,dy){
return new vrml.VrmlMatrix(new vrml.SFVec3f(0,0,0),new vrml.SFRotation(new vrml.SFVec3f(dy,-dx,0).normalize(),Math.sqrt(dx*dx+dy*dy)/300))}
}
};


function addPanListener(event){
if (event.button==0){
event.preventDefault();
xl=event.clientX;
yl=event.clientY;
content.addEventListener("mousemove",responseToMovement, false);
//geometry.setAttribute("fill","LightGrey");
};
};
function removePanListener(event){
if (event.button==0){
content.removeEventListener("mousemove",responseToMovement, false);
//geometry.removeAttribute("fill");
};
};

content.addEventListener("mousedown",addPanListener, true);
content.addEventListener("mouseup",removePanListener, true);

function addTouchListener(event){
event.preventDefault();
xl=event.clientX;
yl=event.clientY;
content.addEventListener("touchmove",responseToMovement, false);
};
function removeTouchListener(event){
content.removeEventListener("touchmove",responseToMovement, false);
};

content.addEventListener("touchstart",addTouchListener, true);
content.addEventListener("touchend",removeTouchListener, true);

