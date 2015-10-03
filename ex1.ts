// import the little Scene Graph library
import sg = require('./SG');

// find the div's we want to use as our 3D Scene containers
var s1 = new sg.Scene(<HTMLDivElement>document.getElementById("translate-z-negative"));
var s2 = new sg.Scene(<HTMLDivElement>document.getElementById("translate-z-positive"));
var s3 = new sg.Scene(<HTMLDivElement>document.getElementById("rotate-x"));
var s4 = new sg.Scene(<HTMLDivElement>document.getElementById("rotate-y"));
var s5 = new sg.Scene(<HTMLDivElement>document.getElementById("rotate-z"));

///////////////////////////////////
// Scene 1.

// the camera is 25 degrees;  should result in a focal length of ~450 or so, based on a 200 pixel 
// square container.  We'll move it off center, to test
var cam1 = new sg.Camera(25);
cam1.position = new sg.Vector(-100,50,200); 
s1.world.add(cam1);

// create a greenish light and put it up, behind and to the left of the camera
var light1 = new sg.Light(new sg.Color(0.9,0.2,0.5));
light1.position = new sg.Vector(-100,400,1000); 
s1.world.add(light1);

// create a div for our content
var p1 = document.createElement("div");
p1.className = "panel";
p1.innerText = "transZ(-200px)\n\ncamera trans(-100,\n50,200)";

// put the div in the scene graph, pushed out a bit further down the z axis
var n1 = new sg.HTMLDivThing(p1);
n1.position = new sg.Vector(0,0,-200); 	
s1.world.add(n1);

// render this graph into the div container.
s1.render()

///////////////////////////////////
// Scene 2
var cam2 = new sg.Camera(25);
cam2.position = new sg.Vector(0,0,200); 
s2.world.add(cam2);

var light2 = new sg.Light(new sg.Color(0.1,0.9,0.5));
light2.position = new sg.Vector(-100,400,1000); 
s2.world.add(light2);

var p2 = document.createElement("div");
p2.className = "panel";
p2.innerText = "transZ(200px)";
var n2 = new sg.HTMLDivThing(p2);
n2.position = new sg.Vector(0,0,200); 
s2.world.add(n2);

s2.render();

///////////////////////////////////
// Scene 3
var cam3 = new sg.Camera(25);
cam3.position = new sg.Vector(0,0,200); 
s3.world.add(cam3);

var light3 = new sg.Light(new sg.Color(0.1,0.9,0.5));
light3.position = new sg.Vector(-100,400,1000); 
s3.world.add(light3);

var p3 = document.createElement("div");
p3.className = "panel";
p3.innerText = "rotateX(35deg)";
var n3 = new sg.HTMLDivThing(p3);
n3.rotation = sg.Matrix.makeRotationFromEuler(new sg.Vector(35,0,0)); 
s3.world.add(n3);

s3.render();

///////////////////////////////////
// Scene 4.  Two panels, set up so they are at 90 degrees to each other along an edge.
// We also tilt the camera, to test that.
var cam4 = new sg.Camera(25);
cam4.position = new sg.Vector(0,0,200); 
cam4.rotation = sg.Matrix.makeRotationFromEuler(new sg.Vector(0,40,0));
s4.world.add(cam4);

var light4 = new sg.Light(new sg.Color(1.0,0.5,1.0));
light4.position = new sg.Vector(-100,400,1000); 
s4.world.add(light4);

// we move by -70.7 because after rotation by 45 degrees that's about what we have to move
// to get the edge into the center (hint: cos(45 degrees) = ~0.707)
var p4 = document.createElement("div");
p4.className = "panel";
p4.innerText = "rotate(0,45,0)\ntr(-70.7,0,0)";
var n4 = new sg.HTMLDivThing(p4);
n4.rotation = sg.Matrix.makeRotationFromEuler(new sg.Vector(0,45,0)); 
n4.position = new sg.Vector(-70.7,0,0);
s4.world.add(n4);

var p41 = document.createElement("div");
p41.className = "panel";
p41.innerText = "rotateY(-90) tr(100,0,100)";
var n41 = new sg.HTMLDivThing(p41);
n41.rotation = sg.Matrix.makeRotationFromEuler(new sg.Vector(0,-90,0)); 
n41.position = new sg.Vector(100,0,100);
n4.add(n41);

s4.render();

///////////////////////////////////
// Scene 5.  Till in Z, spin in X, and rotate the camera back and forth
var cam5 = new sg.Camera(25);
cam5.position = new sg.Vector(0,0,200); 
s5.world.add(cam5);

var light5 = new sg.Light(new sg.Color(0.1,0.9,1.0));
light5.position = new sg.Vector(-100,400,1000); 
s5.world.add(light5);

var p5 = document.createElement("div");
p5.className = "panel";
p5.innerText = "rotateZ( 35deg )";
var n5 = new sg.HTMLDivThing(p5);
n5.rotation = sg.Matrix.makeRotationFromEuler(new sg.Vector(0,0,35)); 
s5.world.add(n5);

var yRotation = 0;
var camYRotation =20;
var camYInc = 1;
var s5renderFunc = function() {
	yRotation += 3;
	if (yRotation > 360) {
		yRotation -= 360;
	}
	n5.rotation = sg.Matrix.makeRotationFromEuler(new sg.Vector(0,yRotation,35)); 
	
	camYRotation += camYInc;
	if (camYRotation > 30 || camYRotation < -30) {
		camYInc *= -1;
	}
	cam5.rotation = sg.Matrix.makeRotationFromEuler(new sg.Vector(0,camYRotation,0));
	
	s5.render();
	requestAnimationFrame(s5renderFunc);
};
s5renderFunc();