// import the little Scene Graph library
import sg = require('./SG');

// find the div's we want to use as our 3D Scene containers
var s1 = new sg.Scene(<HTMLDivElement>document.getElementById("element1"));
var s2 = new sg.Scene(<HTMLDivElement>document.getElementById("element2"))

///////////////////////////////////
// Element 1.


var cam1 = new sg.Camera(0);
cam1.position = new sg.Vector(0,0,-10); 
s1.world.add(cam1);

var light1 = new sg.Light(new sg.Color(0.1,0.9,0.5));
light1.position = new sg.Vector(-100,400,1000); 
s1.world.add(light1);

// create a div for our content
var p1 = document.createElement("div");
var cat1 = document.createElement("img");
cat1.src = 'images/cat1.jpeg';

p1.appendChild(cat1);


// put the div in the scene graph, pushed out a bit further down the z axis
var n1 = new sg.HTMLDivThing(p1);
n1.rotation = sg.Matrix.makeRotationFromEuler(new sg.Vector(0,0,35)); 
//n1.position = new sg.Vector(0,0,-200); 
s1.world.add(n1);

var xRotation = 0;
var yRotation = 0;
var s1renderFunc = function() {
	xRotation += 3;
	yRotation += 6;
	if (xRotation > 360) {
		xRotation -= 360;
	}
	if (yRotation > 360) {
		yRotation -= 360;
	}
	n1.rotation = sg.Matrix.makeRotationFromEuler(new sg.Vector(xRotation,yRotation,35)); 

	s1.render();
	requestAnimationFrame(s1renderFunc);
};
s1renderFunc();

///////////////////////////////////
// Element 2.

var cam2 = new sg.Camera(0);
cam2.position = new sg.Vector(0,0,-10); 
s2.world.add(cam2);

var light2 = new sg.Light(new sg.Color(0.1,0.9,0.5));
light2.position = new sg.Vector(-100,400,1000); 
s2.world.add(light2);

// create a div for our content
var p2 = document.createElement("div");
var run2 = document.createElement("img");
run2.src = 'images/run.gif';

p2.appendChild(run2);


// put the div in the scene graph, pushed out a bit further down the z axis
var n2 = new sg.HTMLDivThing(p2);

s2.world.add(n2);

var ytranslation = 0;

var up = 1;
var s2renderFunc = function() {

	if (up == 1) {
		ytranslation += 3;
	} else {
		ytranslation -= 3;
	}

	if (ytranslation > 225) {
		up = 2;
		
	}
	if (ytranslation < 0 ) {
		up = 1;
	}

	n2.rotation = sg.Matrix.makeTranslation(new sg.Vector(0,ytranslation,0)); 


	s2.render();
	requestAnimationFrame(s2renderFunc);
};
s2renderFunc();

