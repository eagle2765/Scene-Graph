// import the little Scene Graph library
import sg = require('./SG');

// find the div's we want to use as our 3D Scene containers
var s1 = new sg.Scene(<HTMLDivElement>document.getElementById("element1"));

///////////////////////////////////
// Element 1.


var cam1 = new sg.Camera(0);
cam1.position = new sg.Vector(0,0,0); 
s1.world.add(cam1);

var light1 = new sg.Light(new sg.Color(0.1,0.9,0.5));
light1.position = new sg.Vector(-100,400,1000); 
s1.world.add(light1);

// The cat, parent of these elements
var p1 = document.createElement("div");
p1.className = "panel";
var cat1 = document.createElement("img");
cat1.src = 'images/cat1.jpeg';

// add picture to the div
p1.appendChild(cat1);

// put the div in the scene graph, pushed out a bit further down the z axis
var n1 = new sg.HTMLDivThing(p1);
var n1x = 300;
var n1y = 600;
var n1z = 0;
n1.position = new sg.Vector(n1x,n1y,n1z); 
s1.world.add(n1);






// running gif
var p2 = document.createElement("div");
p2.className = "panel";
var run2 = document.createElement("img");
run2.src = 'images/run.gif';
p2.appendChild(run2);

var n2 = new sg.HTMLDivThing(p2);
n2.rotation = sg.Matrix.makeRotationFromEuler(new sg.Vector(0,30,0)); 
n2.position = new sg.Vector( -185,0,50);
n1.add(n2);


// create a div for our content
var p3 = document.createElement("div");
p3.className = "panel";
var i3 = document.createElement("img");
i3.src = 'images/spiral.gif';
p3.appendChild(i3);

// put the div in the scene graph
var n3 = new sg.HTMLDivThing(p3);
n3.rotation = sg.Matrix.makeRotationFromEuler(new sg.Vector(-30,0,0)); 
n3.position = new sg.Vector(0,-182,50);
n2.add(n3);

// create a div for our content
var p4 = document.createElement("div");
p4.className = "panel";
var i4 = document.createElement("img");
i4.src = 'images/hypno.gif';
p4.appendChild(i4);

// put the div in the scene graph
var n4 = new sg.HTMLDivThing(p4);
n4.rotation = sg.Matrix.makeRotationFromEuler(new sg.Vector(0,-30,0)); 
n4.position = new sg.Vector(185,-0,50);
n1.add(n4);

// create a div for our content
var p5 = document.createElement("div");
p5.className = "panel";
var i5 = document.createElement("img");
i5.src = 'images/help.jpg';
p5.appendChild(i5);


// put the div in the scene graph
var n5 = new sg.HTMLDivThing(p5);
n5.rotation = sg.Matrix.makeRotationFromEuler(new sg.Vector(0,-30,0)); 
n5.position = new sg.Vector(185,-0,50);
n4.add(n5);

// create a div for our content
var p6 = document.createElement("div");
p6.className = "panel";
var i6 = document.createElement("img");
i6.src = 'images/clap.gif';
p6.appendChild(i6);


// put the div in the scene graph
var n6 = new sg.HTMLDivThing(p6);
n6.rotation = sg.Matrix.makeRotationFromEuler(new sg.Vector(0,-30,0)); 
n6.position = new sg.Vector(185,-0,50);
n5.add(n6);


// create a div for our content
var p7 = document.createElement("div");
p7.className = "panel";
var i7 = document.createElement("img");
i7.src = 'images/clap.gif';
p7.appendChild(i7);


// put the div in the scene graph
var n7 = new sg.HTMLDivThing(p7);
n7.rotation = sg.Matrix.makeRotationFromEuler(new sg.Vector(0,-30,0)); 
n7.position = new sg.Vector(185,-0,50);
n6.add(n7);


// create a div for our content
var p8 = document.createElement("div");
p8.className = "panel";
var i8 = document.createElement("img");
i8.src = 'images/clap.gif';
p8.appendChild(i8);


// put the div in the scene graph
var n8 = new sg.HTMLDivThing(p8);
n8.rotation = sg.Matrix.makeRotationFromEuler(new sg.Vector(0,0,0)); 
n8.position = new sg.Vector(0,200,0);
n1.add(n8);


// create a div for our content
var p9 = document.createElement("div");
p9.className = "panel";
var i9 = document.createElement("img");
i9.src = 'images/clap.gif';
p9.appendChild(i9);


// put the div in the scene graph
var n9 = new sg.HTMLDivThing(p9);
n9.rotation = sg.Matrix.makeRotationFromEuler(new sg.Vector(0,0,0)); 
n9.position = new sg.Vector(0,-200,0);
n1.add(n9);


// create a div for our content
var p10 = document.createElement("div");
p10.className = "panel";
var i10 = document.createElement("img");
i10.src = 'images/clap.gif';
p10.appendChild(i10);


// put the div in the scene graph
var n10 = new sg.HTMLDivThing(p10);
n10.rotation = sg.Matrix.makeRotationFromEuler(new sg.Vector(0,0,0)); 
n10.position = new sg.Vector(0,200,0);
n4.add(n10);



s1.render();

var zRotation = 0;
var xTrans = 0;
var xforward = 1;
var yTrans = 0;
var yup = 0;

var camYRotation =20;
var camYInc = 0.25;

p1.onmouseenter = (e)=>{
	p1.className = "apanel";
}
p1.onmouseout = (e)=> {
	p1.className = "panel";
}
p2.onmouseenter = (e)=>{
	p2.className = "apanel";
}
p2.onmouseout = (e)=> {
	p2.className = "panel";

}
p3.onmouseenter = (e)=>{
	p3.className = "apanel";
}
p3.onmouseout = (e)=> {
	p3.className = "panel";
}
p4.onmouseenter = (e)=>{
	p4.className = "apanel";
}
p4.onmouseout = (e)=> {
	p4.className = "panel";
}
p5.onmouseenter = (e)=>{
	p5.className = "apanel";
}
p5.onmouseout = (e)=> {
	p5.className = "panel";
}
p6.onmouseenter = (e)=>{
	p6.className = "apanel";
}
p6.onmouseout = (e)=> {
	p6.className = "panel";

}
p7.onmouseenter = (e)=>{
	p7.className = "apanel";
}
p7.onmouseout = (e)=> {
	p7.className = "panel";
}
p8.onmouseenter = (e)=>{
	p8.className = "apanel";
}
p8.onmouseout = (e)=> {
	p8.className = "panel";
}

p9.onmouseenter = (e)=>{
	p9.className = "apanel";
}
p9.onmouseout = (e)=> {
	p9.className = "panel";
}
p10.onmouseenter = (e)=>{
	p10.className = "apanel";
}
p10.onmouseout = (e)=> {
	p10.className = "panel";
}

var s1renderFunc = function() {

	
	camYRotation += camYInc;
	if (camYRotation > 90 || camYRotation < -90) {
		camYInc *= -1;
	}
	cam1.rotation = sg.Matrix.makeRotationFromEuler(new sg.Vector(0,camYRotation,0));
	
	// spin clockwise
	zRotation -= 1;

	n1.position = new sg.Vector(n1x + xTrans, n1y, n1z);
	n1.rotation = sg.Matrix.makeRotationFromEuler(new sg.Vector(0 ,0 ,zRotation)); 

	s1.render();
	requestAnimationFrame(s1renderFunc);
};
s1renderFunc();
