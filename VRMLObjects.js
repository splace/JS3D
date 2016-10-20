vrml=new Object();

vrml.type=function(name){
	this.typename=name;
	};

vrml.count=0;
vrml.type.prototype.init=function(){this.reference=++vrml.count;};
vrml.type.prototype.getRef=function(){return this.reference};
vrml.type.prototype.toString=function(){return "Vrml Object:"+this.reference+"("+vrml.count+")  type:"+this.typename };
vrml.type.prototype.inLine=function(){return this.reference+":"+this.packed()};


vrml.SFVec2d=function(x,y){
	this.x=parseFloat(x?x:0);
	this.y=parseFloat(y?y:0);
	this.init.call(this);
	};

vrml.SFVec2d.prototype=new vrml.type('SFVec2d');

vrml.SFVec2d.prototype.negate=function(){return new vrml.SFVec2d(-this.x,-this.y)};
vrml.SFVec2d.prototype.toString=function(res){return this.typename+'=['+(res?Math.round(this.x/res)*res+','+Math.round(this.y/res)*res:this.x+','+this.y)+']'};
vrml.SFVec2d.prototype.add=function(v){return new vrml.SFVec2d(this.x+v.x,this.y+v.y)};
vrml.SFVec2d.prototype.subtract=function(v){return new vrml.SFVec2d(this.x-v.x,this.y-v.y)};
vrml.SFVec2d.prototype.dot=function(v){return this.x*v.x+this.y*v.y};
vrml.SFVec2d.prototype.multiply=function(v){return new vrml.SFVec2d(this.x*v,this.y*v)};
vrml.SFVec2d.prototype.divide=function(v){return new vrml.SFVec2d(this.x/v,this.y/v)};
vrml.SFVec2d.prototype.length=function(){return Math.sqrt(this.x*this.x+this.y*this.y)};
vrml.SFVec2d.prototype.normalize=function(){var l=this.length();return new vrml.SFVec2d(this.x/l,this.y/l)};
vrml.SFVec2d.prototype.slerp=function(vec,t){return new vrml.SFVec2d(this.x+(vec.x-this.x)*t,this.y+(vec.y-this.y)*t)};

vrml.SFVec3d=function(x,y,z){
	this.x=parseFloat(x?x:0);
	this.y=parseFloat(y?y:0);
	this.z=parseFloat(z?z:0);
	this.init.call(this);
	};

vrml.SFVec3d.prototype=new vrml.type('SFVec3d');

vrml.SFVec3d.prototype.add=function(v){return new vrml.SFVec3d(this.x+v.x,this.y+v.y,this.z+v.z)};
vrml.SFVec3d.prototype.negate=function(){return new vrml.SFVec3d(-this.x,-this.y,-this.z)};
vrml.SFVec3d.prototype.subtract=function(v){return new vrml.SFVec3d(this.x-v.x,this.y-v.y,this.z-v.z)};
vrml.SFVec3d.prototype.toString=function(res){return this.typename+'=['+(res?Math.round(this.x/res)*res+','+Math.round(this.y/res)*res+','+Math.round(this.z/res)*res:this.x+','+this.y+','+this.z)+']'};
vrml.SFVec3d.prototype.packed=function(){return this.x.toString().slice(0,4)+this.y.toString().slice(0,4)+this.z.toString().slice(0,4)};
vrml.SFVec3d.prototype.divide=function(v){return new vrml.SFVec3d(this.x/v,this.y/v,this.z/v)};
vrml.SFVec3d.prototype.length=function(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)};
vrml.SFVec3d.prototype.normalize=function(){var l=this.length();return new vrml.SFVec3d(this.x/l,this.y/l,this.z/l)};
vrml.SFVec3d.prototype.dot=function(v){return this.x*v.x+this.y*v.y+this.z*v.z};
vrml.SFVec3d.prototype.cross=function(v){return new vrml.SFVec3d(this.y*v.z-this.z*v.y,this.z*v.x-this.x*v.z,this.x*v.y-this.y*v.x)};
vrml.SFVec3d.prototype.multiply=function(v){return new vrml.SFVec3d(this.x*v,this.y*v,this.z*v)};
vrml.SFVec3d.prototype.slerp=function(vec,t){return new vrml.SFVec3d(this.x+(vec.x-this.x)*t,this.y+(vec.y-this.y)*t,this.z+(vec.z-this.z)*t)};

vrml.SFRotation=function(x,y,z,angle){
	switch (arguments.length) {
		case 0:
			this.x=0;
			this.y=0;
			this.z=0;
			this.angle=0;
			break;
		case 4:
			this.x=parseFloat(x);
			this.y=parseFloat(y);
			this.z=parseFloat(z);
			this.angle=parseFloat(angle?angle:0);
			break;
		case 1:
			this.x=x.x;
			this.y=x.y;
			this.z=x.z;
			this.angle=0;
			break;
		case 2:
			this.x=x.x;
			this.y=x.y;
			this.z=x.z;
			this.angle=parseFloat(y);
			};
		if (this.x==0 && this.y==0 && this.z==0){this.y=1;};
		this.init.call(this);
		};

vrml.SFRotation.prototype=new vrml.type('SFRotation');

vrml.SFRotation.prototype.getAxis=function(){return new vrml.SFVec3d(this.x,this.y,this.z)};
vrml.SFRotation.prototype.setAxis=function(vec){this.x=vec.x;this.y=vec.y;this.z=vec.z;};
vrml.SFRotation.prototype.inverse=function(){return new vrml.SFRotation(this.x,this.y,this.z,-this.angle)};
vrml.SFRotation.prototype.toString=function(res){return 'SFRotation=['+(res?Math.round(this.x/res)*res+','+Math.round(this.y/res)*res+','+Math.round(this.z/res)*res+','+Math.round(this.angle/res)*res:this.x+','+this.y+','+this.z+','+this.angle)+'r]'};

vrml.VrmlMatrix = function(t,r,s,sr,c ){
	switch (arguments.length) {
		case 0:
			this[0]=1;this[1]=0;this[2]=0;this[3]=0;
			this[4]=0;this[5]=1;this[6]=0;this[7]=0;
			this[8]=0;this[9]=0;this[10]=1;this[11]=0;
			this[12]=0;this[13]=0;this[14]=0;this[15]=1;
			break;
		case 1:case 2: case 3: case 4: case 5:
			this.setTransform.apply(this,arguments);
			break;
		case 16:
			for (var i=0;i<16;i++){this[i]=parseFloat(arguments[i])};
			break;
		default:
			throw 'argumentCountError: new VrmlMatrix with '+arguments.length+' arguments.';
		};
		this.init.call(this);
	};

vrml.VrmlMatrix.prototype=new vrml.type('VrmlMatrix');

vrml.VrmlMatrix.prototype.toString=function(res){return 'VrmlMatrix=[['+(res?Math.round(this[0]/res)*res+','+Math.round(this[1]/res)*res+','+Math.round(this[2]/res)*res+','+Math.round(this[3]/res)*res+'],['+Math.round(this[4]/res)*res+','+Math.round(this[5]/res)*res+','+Math.round(this[6]/res)*res+','+Math.round(this[7]/res)*res+'],['+Math.round(this[8]/res)*res+','+Math.round(this[9]/res)*res+','+Math.round(this[10]/res)*res+','+Math.round(this[11]/res)*res+'],['+Math.round(this[12]/res)*res+','+Math.round(this[13]/res)*res+','+Math.round(this[14]/res)*res+','+Math.round(this[15]/res)*res:this[0]+','+this[1]+','+this[2]+','+this[3]+'],['+this[4]+','+this[5]+','+this[6]+','+this[7]+'],['+this[8]+','+this[9]+','+this[10]+','+this[11]+'],['+this[12]+','+this[13]+','+this[14]+','+this[15])+']]' };

vrml.VrmlMatrix.prototype.setTransform = function(t,r,s,sr,c ){
	switch (arguments.length) {
		case 1:
			var r=new vrml.SFRotation(0,1,0,0);
		case 2:
			var s=new vrml.SFVec3d(1,1,1);
		case 3:
			var sr=new vrml.SFRotation(0,1,0,0);
		case 4:
			var c=new vrml.SFVec3d(0,0,0);
		case 5:
			var ca=(1-Math.cos(sr.angle));
			var sa=Math.sin(sr.angle);
			var sx=Math.abs(s.x*(1+ca*(sr.x*sr.x-1))+s.y*(ca*sr.x*sr.y-sr.z*sa)+s.z*(ca*sr.x*sr.z+sr.y*sa));
			var sy=Math.abs(s.x*(ca*sr.y*sr.x+sr.z*sa)+s.y*(1+ca*(sr.y*sr.y-1))+s.z*(ca*sr.y*sr.z-sr.x*sa));
			var sz=Math.abs(s.x*(ca*sr.z*sr.x-sr.y*sa)+s.y*(ca*sr.z*sr.y+sr.x*sa)+s.z*(1+ca*(sr.z*sr.z-1)));
			ca=(1-Math.cos(r.angle));
			sa=Math.sin(r.angle);
			this[0]=sx*(1+ca*(r.x*r.x-1));
			this[1]=sx*(ca*r.x*r.y+r.z*sa);
			this[2]=sx*(ca*r.x*r.z-r.y*sa);
			this[3]=0;
			this[4]=sy*(ca*r.x*r.y-r.z*sa);
			this[5]=sy*(1+ca*(r.y*r.y-1));
			this[6]=sy*(ca*r.y*r.z+r.x*sa);
			this[7]=0;
			this[8]=sz*(ca*r.x*r.z+r.y*sa);
			this[9]=sz*(ca*r.y*r.z-r.x*sa);
			this[10]=sz*(1+ca*(r.z*r.z-1));
			this[11]=0;
			this[12]=t.x-c.x*this[0]-c.y*this[4]-c.z*this[8]+c.x;
			this[13]=t.y-c.x*this[1]-c.y*this[5]-c.z*this[9]+c.y;
			this[14]=t.z-c.x*this[2]-c.y*this[6]-c.z*this[10]+c.z;
			this[15]=1;
			break;
		default:
			throw 'argumentCountError: VrmlMatrix called with '+arguments.length+' arguments.';
		};
		return this
	};

vrml.VrmlMatrix.prototype.multLeft= function(m){
	return new vrml.VrmlMatrix(
		this[0]*m[0]+this[4]*m[1]+this[8]*m[2]+this[12]*m[3],
		this[1]*m[0]+this[5]*m[1]+this[9]*m[2]+this[13]*m[3],
		this[2]*m[0]+this[6]*m[1]+this[10]*m[2]+this[14]*m[3],
		this[3]*m[0]+this[7]*m[1]+this[11]*m[2]+this[15]*m[3],
		this[0]*m[4]+this[4]*m[5]+this[8]*m[6]+this[12]*m[7],
		this[1]*m[4]+this[5]*m[5]+this[9]*m[6]+this[13]*m[7],
		this[2]*m[4]+this[6]*m[5]+this[10]*m[6]+this[14]*m[7],
		this[3]*m[4]+this[7]*m[5]+this[11]*m[6]+this[15]*m[7],
		this[0]*m[8]+this[4]*m[9]+this[8]*m[10]+this[12]*m[11],
		this[1]*m[8]+this[5]*m[9]+this[9]*m[10]+this[13]*m[11],
		this[2]*m[8]+this[6]*m[9]+this[10]*m[10]+this[14]*m[11],
		this[3]*m[8]+this[7]*m[9]+this[11]*m[10]+this[15]*m[11],
		this[0]*m[12]+this[4]*m[13]+this[8]*m[14]+this[12]*m[15],
		this[1]*m[12]+this[5]*m[13]+this[9]*m[14]+this[13]*m[15],
		this[2]*m[12]+this[6]*m[13]+this[10]*m[14]+this[14]*m[15],
		this[3]*m[12]+this[7]*m[13]+this[11]*m[14]+this[15]*m[15]
		)};
vrml.VrmlMatrix.prototype.multRight= function(m){
	return new vrml.VrmlMatrix(
		m[0]*this[0]+m[4]*this[1]+m[8]*this[2]+m[12]*this[3],
		m[1]*this[0]+m[5]*this[1]+m[9]*this[2]+m[13]*this[3],
		m[2]*this[0]+m[6]*this[1]+m[10]*this[2]+m[14]*this[3],
		m[3]*this[0]+m[7]*this[1]+m[11]*this[2]+m[15]*this[3],
		m[0]*this[4]+m[4]*this[5]+m[8]*this[6]+m[12]*this[7],
		m[1]*this[4]+m[5]*this[5]+m[9]*this[6]+m[13]*this[7],
		m[2]*this[4]+m[6]*this[5]+m[10]*this[6]+m[14]*this[7],
		m[3]*this[4]+m[7]*this[5]+m[11]*this[6]+m[15]*this[7],
		m[0]*this[8]+m[4]*this[9]+m[8]*this[10]+m[12]*this[11],
		m[1]*this[8]+m[5]*this[9]+m[9]*this[10]+m[13]*this[11],
		m[2]*this[8]+m[6]*this[9]+m[10]*this[10]+m[14]*this[11],
		m[3]*this[8]+m[7]*this[9]+m[11]*this[10]+m[15]*this[11],
		m[0]*this[12]+m[4]*this[13]+m[8]*this[14]+m[12]*this[15],
		m[1]*this[12]+m[5]*this[13]+m[9]*this[14]+m[13]*this[15],
		m[2]*this[12]+m[6]*this[13]+m[10]*this[14]+m[14]*this[15],
		m[3]*this[12]+m[7]*this[13]+m[11]*this[14]+m[15]*this[15]
		)};

vrml.VrmlMatrix.prototype.multVecMatrix= function(vec){
	return new vrml.SFVec3d(
		this[0]*vec.x+this[4]*vec.y+this[8]*vec.z+this[12],
		this[1]*vec.x+this[5]*vec.y+this[9]*vec.z+this[13],
		this[2]*vec.x+this[6]*vec.y+this[10]*vec.z+this[14]
		)};

// TODO
//vrml.VrmlMatrix.prototype.multVecExistingMatrix= function(vec,existingVec){
//		existingVec['x']=this[0]*vec.x+this[4]*vec.y+this[8]*vec.z+this[12];
//		existingVec['y']=this[1]*vec.x+this[5]*vec.y+this[9]*vec.z+this[13];
//		existingVec['z']=this[2]*vec.x+this[6]*vec.y+this[10]*vec.z+this[14];
//		};



vrml.VrmlMatrix.prototype.multMatrixVec= function(vec){
	return new vrml.SFVec3d(
		this[0]*vec.x+this[1]*vec.y+this[2]*vec.z+this[3],
		this[4]*vec.x+this[5]*vec.y+this[6]*vec.z+this[7],
		this[8]*vec.x+this[9]*vec.y+this[10]*vec.z+this[11]
		)};


vrml.VrmlMatrix.prototype.getTransform= function(t,r,s){
	switch (arguments.length){
		case 3:
			s=this.getScale();
		case 2:
			r=this.getRotation();
		case 1:
			t=this.getTranslation();
		};
	};
vrml.VrmlMatrix.prototype.getTranslation= function(){return new vrml.SFVec3d(this[12],this[13],this[14])};
vrml.VrmlMatrix.prototype.getRotation= function(){
	var sx=Math.sqrt(this[0]*this[0]+this[1]*this[1]+this[2]*this[2]);
	var sy=Math.sqrt(this[4]*this[4]+this[5]*this[5]+this[6]*this[6]);
	var sz=Math.sqrt(this[8]*this[8]+this[9]*this[9]+this[10]*this[10]);
	var rxsa=(this[6]/sy-this[9]/sz)/2;
	var rysa=(this[8]/sz-this[2]/sx)/2;
	var rzsa=(this[1]/sx-this[4]/sy)/2;
	var sa=Math.sqrt(rxsa*rxsa+rysa*rysa+rzsa*rzsa);
	if (sa){
		return new vrml.SFRotation(rxsa/sa,rysa/sa,rzsa/sa,Math.acos((this[0]/sx+this[5]/sy+this[10]/sz-1)/2))
		} else {
		return new vrml.SFRotation(0,1,0,Math.acos((this[0]/sx+this[5]/sy+this[10]/sz-1)/2))
	};
	};
vrml.VrmlMatrix.prototype.getScale= function(){
	var sx=Math.sqrt(this[0]*this[0]+this[1]*this[1]+this[2]*this[2]);
	var sy=Math.sqrt(this[4]*this[4]+this[5]*this[5]+this[6]*this[6]);
	var sz=Math.sqrt(this[8]*this[8]+this[9]*this[9]+this[10]*this[10]);
	return new vrml.SFVec3d(sx,sy,sz)
	};

vrml.VrmlMatrix.prototype.transpose=function(){
	return new vrml.VrmlMatrix(this[0],this[4],this[8],this[12],this[1],this[5],this[9],this[13],this[2],this[6],this[10],this[14],this[3],this[7],this[11],this[15])
	};

vrml.VrmlMatrix.prototype.inverse=function(){
	var det=(this[3] * this[6] * this[9] * this[12]-this[2] * this[7] * this[9] * this[12]-this[3] * this[5] * this[10] * this[12]+this[1] * this[7] * this[10] * this[12]+ this[2] * this[5] * this[11] * this[12]-this[1] * this[6] * this[11] * this[12]-this[3] * this[6] * this[8] * this[13]+this[2] * this[7] * this[8] * this[13]+  this[3] * this[4] * this[10] * this[13]-this[0] * this[7] * this[10] * this[13]-this[2] * this[4] * this[11] * this[13]+this[0] * this[6] * this[11] * this[13]+  this[3] * this[5] * this[8] * this[14]-this[1] * this[7] * this[8] * this[14]-this[3] * this[4] * this[9] * this[14]+this[0] * this[7] * this[9] * this[14]+ this[1] * this[4] * this[11] * this[14]-this[0] * this[5] * this[11] * this[14]-this[2] * this[5] * this[8] * this[15]+this[1] * this[6] * this[8] * this[15]+ this[2] * this[4] * this[9] * this[15]-this[0] * this[6] * this[9] * this[15]-this[1] * this[4] * this[10] * this[15]+this[0] * this[5] * this[10] * this[15]);
	return new vrml.VrmlMatrix( (this[6]*this[11]*this[13] - this[7]*this[10]*this[13] + this[7]*this[9]*this[14] - this[5]*this[11]*this[14] - this[6]*this[9]*this[15] + this[5]*this[10]*this[15])/det,( this[3]*this[10]*this[13] - this[2]*this[11]*this[13] - this[3]*this[9]*this[14] + this[1]*this[11]*this[14] + this[2]*this[9]*this[15] - this[1]*this[10]*this[15])/det,( this[2]*this[7]*this[13] - this[3]*this[6]*this[13] + this[3]*this[5]*this[14] - this[1]*this[7]*this[14] - this[2]*this[5]*this[15] + this[1]*this[6]*this[15])/det,( this[3]*this[6]*this[9] - this[2]*this[7]*this[9] - this[3]*this[5]*this[10] + this[1]*this[7]*this[10] + this[2]*this[5]*this[11] - this[1]*this[6]*this[11])/det,( this[7]*this[10]*this[12] - this[6]*this[11]*this[12] - this[7]*this[8]*this[14] + this[4]*this[11]*this[14] + this[6]*this[8]*this[15] - this[4]*this[10]*this[15])/det,(this[2]*this[11]*this[12] - this[3]*this[10]*this[12] + this[3]*this[8]*this[14] - this[0]*this[11]*this[14] - this[2]*this[8]*this[15] + this[0]*this[10]*this[15])/det,( this[3]*this[6]*this[12] - this[2]*this[7]*this[12] - this[3]*this[4]*this[14] + this[0]*this[7]*this[14] + this[2]*this[4]*this[15] - this[0]*this[6]*this[15])/det,(this[2]*this[7]*this[8] - this[3]*this[6]*this[8] + this[3]*this[4]*this[10] - this[0]*this[7]*this[10] - this[2]*this[4]*this[11] + this[0]*this[6]*this[11])/det,(this[5]*this[11]*this[12] - this[7]*this[9]*this[12] + this[7]*this[8]*this[13] - this[4]*this[11]*this[13] - this[5]*this[8]*this[15] + this[4]*this[9]*this[15])/det,(this[3]*this[9]*this[12] - this[1]*this[11]*this[12] - this[3]*this[8]*this[13] + this[0]*this[11]*this[13] + this[1]*this[8]*this[15] - this[0]*this[9]*this[15])/det,( this[1]*this[7]*this[12] - this[3]*this[5]*this[12] + this[3]*this[4]*this[13] - this[0]*this[7]*this[13] - this[1]*this[4]*this[15] + this[0]*this[5]*this[15])/det,( this[3]*this[5]*this[8] - this[1]*this[7]*this[8] - this[3]*this[4]*this[9] + this[0]*this[7]*this[9] + this[1]*this[4]*this[11] - this[0]*this[5]*this[11])/det,(this[6]*this[9]*this[12] - this[5]*this[10]*this[12] - this[6]*this[8]*this[13] + this[4]*this[10]*this[13] + this[5]*this[8]*this[14] - this[4]*this[9]*this[14])/det,( this[1]*this[10]*this[12] - this[2]*this[9]*this[12] + this[2]*this[8]*this[13] - this[0]*this[10]*this[13] - this[1]*this[8]*this[14] + this[0]*this[9]*this[14])/det,(this[2]*this[5]*this[12] - this[1]*this[6]*this[12] - this[2]*this[4]*this[13] + this[0]*this[6]*this[13] + this[1]*this[4]*this[14] - this[0]*this[5]*this[14])/det,( this[1]*this[6]*this[8] - this[2]*this[5]*this[8] + this[2]*this[4]*this[9] - this[0]*this[6]*this[9] - this[1]*this[4]*this[10] + this[0]*this[5]*this[10])/det)
};

vrml.VrmlMatrix.prototype.slerp=function(m,t){
	var rt=1-t;
	return new vrml.VrmlMatrix(
		this[0]*rt+m[0]*t,
		this[1]*rt+m[1]*t,
		this[2]*rt+m[2]*t,
		this[3]*rt+m[3]*t,
		this[4]*rt+m[4]*t,
		this[5]*rt+m[5]*t,
		this[6]*rt+m[6]*t,
		this[7]*rt+m[7]*t,
		this[8]*rt+m[8]*t,
		this[9]*rt+m[9]*t,
		this[10]*rt+m[10]*t,
		this[11]*rt+m[11]*t,
		this[12]*rt+m[12]*t,
		this[13]*rt+m[13]*t,
		this[14]*rt+m[14]*t,
		this[15]*rt+m[15]*t
		)
	};


vrml.SFRotation.prototype.multVec=function(vec){return new vrml.VrmlMatrix().setTransform(new vrml.SFVec3d(0,0,0),this).multVecMatrix(vec)};

vrml.SFRotation.prototype.multiply=function(rot){return new vrml.VrmlMatrix().setTransform(new vrml.SFVec3d(0,0,0),this).multRight(new vrml.VrmlMatrix().setTransform(new vrml.SFVec3d(0,0,0),rot)).getRotation()};

vrml.SFRotation.prototype.slerp=function(rot,t){return new vrml.VrmlMatrix().setTransform(new vrml.SFVec3d(0,0,0),this).slerp(new vrml.VrmlMatrix().setTransform(new vrml.SFVec3d(0,0,0),rot),t).getRotation()};

vrml.MFConstructor=function(){
	if (arguments.length==1 && typeof(arguments[0])=='number' ){
	this.length=arguments[0]
	} else{
	for (var i=0;i<arguments.length;i++){this.push(arguments[i]);};
	//for (var i=0;i<arguments.length;i++){this.push(new vrml.SFVec3d(arguments[i].x,arguments[i].y,arguments[i].z));};
	}
	};

vrml.componentWiseCallback=function(closure){
	for (var i=0;i<this.length;i++){closure.item(this[i]);};
	return closure.callback()
	};

vrml.concatClosure=function(sep,res){
	var s="";
	return {
		item:function(i){s+=(s?sep:"")+(res?i.toString(res):i)},
		callback:function(){return s}
		};
	};

vrml.MFVec3d=vrml.MFConstructor
vrml.MFVec3d.prototype=new Array();
vrml.MFVec3d.prototype.toString=function(){return 'MFVec3d=['+vrml.componentWiseCallback.call(this,vrml.concatClosure(','))+']'};

vrml.MFVec2d=vrml.MFConstructor
vrml.MFVec2d.prototype=new Array();
vrml.MFVec2d.prototype.toString=function(){return 'MFVec2d=['+vrml.componentWiseCallback.call(this,vrml.concatClosure(','))+']'};

vrml.MFRotation=vrml.MFConstructor
vrml.MFRotation.prototype=new Array();
vrml.MFRotation.prototype.toString=function(){return 'MFRotation=['+vrml.componentWiseCallback.call(this,vrml.concatClosure(','))+']'};

vrml.MFVrmlMatrix=vrml.MFConstructor
vrml.MFVrmlMatrix.prototype=new Array();
vrml.MFVrmlMatrix.prototype.toString=function(){return 'MFVrmlMatrix=['+vrml.componentWiseCallback.call(this,vrml.concatClosure(','))+']'};


vrml.SFVec2f=function(){
	vrml.SFVec2d.apply(this,arguments);
	};
vrml.SFVec2f.prototype=vrml.SFVec2d.prototype;
vrml.SFVec2f.prototype.toString=function(res){return 'SFVec2f=['+(res?Math.round(this.x/res)*res+','+Math.round(this.y/res)*res:this.x+','+this.y)+']'};

vrml.MFVec2f=vrml.MFConstructor
vrml.MFVec2f.prototype=new Array();
vrml.MFVec2f.prototype.toString=function(){return 'MFVec2f=['+vrml.componentWiseCallback.call(this,vrml.concatClosure(','))+']'};


vrml.SFVec3f=function(){
	vrml.SFVec3d.apply(this,arguments);
	};
vrml.SFVec3f.prototype=vrml.SFVec3d.prototype;

vrml.MFVec3f=vrml.MFConstructor
vrml.MFVec3f.prototype=new Array();
vrml.MFVec3f.prototype.toString=function(){return 'MFVec3f=['+vrml.componentWiseCallback.call(this,vrml.concatClosure(','))+']'};




