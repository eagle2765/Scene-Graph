// utility function to make sure we don't have too small numbers
function epsilon( value: number ): number {
    return Math.abs( value ) < 0.000001 ? 0 : value;
}

// convert degrees to radians
var degreeToRadiansFactor = Math.PI / 180;
function degToRad( degrees: number): number {
    return degrees * degreeToRadiansFactor;
}

// convert radians to degress
var radianToDegreesFactor = 180 / Math.PI;
function radToDeg( radians: number): number {
    return radians * radianToDegreesFactor;
}    
	
/////////////////////////////
// classes adapted from a1, the Typescript RayTracer sample
export class Vector {
    constructor(public x: number,
                public y: number,
                public z: number) {
    }
    static times(k: number, v: Vector) { return new Vector(k * v.x, k * v.y, k * v.z); }
    static minus(v1: Vector, v2: Vector) { return new Vector(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z); }
    static plus(v1: Vector, v2: Vector) { return new Vector(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z); }
    static dot(v1: Vector, v2: Vector) { return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z; }
    static mag(v: Vector) { return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z); }
    static norm(v: Vector) {
        var mag = Vector.mag(v);
        var div = (mag === 0) ? Infinity : 1.0 / mag;
        return Vector.times(div, v);
    }
    static cross(v1: Vector, v2: Vector) {
        return new Vector(v1.y * v2.z - v1.z * v2.y,
                          v1.z * v2.x - v1.x * v2.z,
                          v1.x * v2.y - v1.y * v2.x);
    }
}

export class Color {
    constructor(public r: number,
                public g: number,
                public b: number) {
    }
    static scale(k: number, v: Color) { return new Color(k * v.r, k * v.g, k * v.b); }
    static plus(v1: Color, v2: Color) { return new Color(v1.r + v2.r, v1.g + v2.g, v1.b + v2.b); }
    static times(v1: Color, v2: Color) { return new Color(v1.r * v2.r, v1.g * v2.g, v1.b * v2.b); }
    static white = new Color(1.0, 1.0, 1.0);
    static grey = new Color(0.5, 0.5, 0.5);
    static black = new Color(0.0, 0.0, 0.0);
    static background = Color.black;
    static defaultColor = Color.black;
    static random = new Color (Math.random(), Math.random(), Math.random());
    static toDrawingColor(c: Color) {
        var legalize = d => d > 1 ? 1 : d;
        return {
            r: Math.floor(legalize(c.r) * 255),
            g: Math.floor(legalize(c.g) * 255),
            b: Math.floor(legalize(c.b) * 255)
        }
    }
}

///////////////////////////////////////////
// new minimal matrix class
export class Matrix {
    // the matrix elements
    elements: number[];
    
    // construct a new matrix (including copying one and creating an identity matrix)
	constructor ( n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44 ) {
    	this.elements = new Array<number>( 16 );
        var te = this.elements;
		te[ 0 ] = n11; te[ 4 ] = n12; te[ 8 ] = n13; te[ 12 ] = n14;
		te[ 1 ] = n21; te[ 5 ] = n22; te[ 9 ] = n23; te[ 13 ] = n24;
		te[ 2 ] = n31; te[ 6 ] = n32; te[ 10 ] = n33; te[ 14 ] = n34;
		te[ 3 ] = n41; te[ 7 ] = n42; te[ 11 ] = n43; te[ 15 ] = n44;
		return this;
	}

    // transpose the matrix, returning a new matrix with the result
    static transpose(m: Matrix): Matrix {
        // array representation of matrix m
        var te = new Array<number>( 16 );
        te[ 0 ] = m.elements[0]; te[ 4 ] = m.elements[4]; te[ 8 ] = m.elements[8]; te[ 12 ] = m.elements[12];
		te[ 1 ] = m.elements[1]; te[ 5 ] = m.elements[5]; te[ 9 ] = m.elements[9]; te[ 13 ] = m.elements[13];
		te[ 2 ] = m.elements[2]; te[ 6 ] = m.elements[6]; te[ 10 ] = m.elements[10]; te[ 14 ] = m.elements[14];
		te[ 3 ] = m.elements[3]; te[ 7 ] = m.elements[7]; te[ 11 ] = m.elements[11]; te[ 15 ] = m.elements[15];
        return new Matrix(te[0], te[1], te[2], te[3], te[4], te[5], te[6], te[7], te[8], te[9], te[10], te[11], te[12], te[13], te[14], te[15]);
        
    }     

    // copy the matrix to a new matrix
	static copy (m: Matrix): Matrix {
        // array representation of matrix m
        var te = new Array<number>( 16 );
        te[ 0 ] = m.elements[0]; te[ 4 ] = m.elements[4]; te[ 8 ] = m.elements[8]; te[ 12 ] = m.elements[12];
		te[ 1 ] = m.elements[1]; te[ 5 ] = m.elements[5]; te[ 9 ] = m.elements[9]; te[ 13 ] = m.elements[13];
		te[ 2 ] = m.elements[2]; te[ 6 ] = m.elements[6]; te[ 10 ] = m.elements[10]; te[ 14 ] = m.elements[14];
		te[ 3 ] = m.elements[3]; te[ 7 ] = m.elements[7]; te[ 11 ] = m.elements[11]; te[ 15 ] = m.elements[15];
        return new Matrix(te[0], te[4], te[8], te[12], te[1], te[5], te[9], te[13], te[2], te[6], te[10], te[14], te[3], te[7], te[11], te[15]);
       
        
	}

    // return a new matrix containing the identify matrix
	static identity(): Matrix { 
        return new Matrix(1, 0, 0, 0, 
                          0, 1, 0, 0, 
                          0, 0, 1, 0, 
                          0, 0, 0, 1); 
    }

    // create a new rotation matrix from the input vector. 
    // eu.x, eu.y, eu.z contain the rotations in degrees around the three axes. 
    // Apply the rotations in the order x, y, z.
    static makeRotationFromEuler (eu: Vector): Matrix {
        var eux = degToRad(eu.x);
        var euy = degToRad(eu.y);
        var euz = degToRad(eu.z);      
        // x rotation matrix
        var xmatrix = new Matrix(1, 0, 0, 0,
                                 0, Math.cos(eux), -1 * Math.sin(eux), 0,
                                 0, Math.sin(eux), Math.cos(eux), 0,
                                 0, 0, 0, 1)

        
        // y rotation matrix
        var ymatrix = new Matrix(Math.cos(euy), 0, Math.sin(euy), 0,
                                 0, 1, 0, 0,
                                 -1 * Math.sin(euy), 0, Math.cos(euy), 0,
                                 0, 0, 0, 1)

        // z rotation matrix
        var zmatrix = new Matrix(Math.cos(euz), -1 * Math.sin(euz), 0, 0,
                                 Math.sin(euz), Math.cos(euz), 0, 0,
                                 0, 0, 1, 0,
                                 0, 0, 0, 1)
        // multiply rotations
        var temp = xmatrix;
        temp = xmatrix.multiply(ymatrix);
        temp = temp.multiply(zmatrix);
        return temp;
	}

    // create a new translation matrix from the input vector
    // t.x, t.y, t.z contain the translation values in each direction
	static makeTranslation(t: Vector): Matrix {
        return new Matrix(1, 0, 0, t.x, 0, 1, 0, t.y, 0, 0, 1, t.z, 0, 0, 0, 1);
	}

    // create a new scale matrix from the input vector
    // s.x, s.y, s.z contain the scale values in each direction
	static makeScale(s: Vector): Matrix {
        return new Matrix(s.x, 0, 0, 0,
                            0, s.y, 0, 0,
                            0, 0, s.z, 0,
                            0, 0, 0, 1)
    }
        
    // compose transformations with multiplication.  Multiply this * b, 
    // returning the result in a new matrix
   	multiply (b: Matrix ): Matrix {
        // array representation of this matrix
        var n11; var n12; var n13; var n14;
        var n21; var n22; var n23; var n24;
        var n31; var n32; var n33; var n34;
        var n41; var n42; var n43; var n44;
        
        // array repesntation of b matrix
        var b11; var b12; var b13; var b14;
        var b21; var b22; var b23; var b24;
        var b31; var b32; var b33; var b34;
        var b41; var b42; var b43; var b44;
        
        // new matrix
        var x11; var x12; var x13; var x14;
        var x21; var x22; var x23; var x24;
        var x31; var x32; var x33; var x34;
        var x41; var x42; var x43; var x44;
        

        // this matrix
        n11 = this.elements[0]; n12 = this.elements[4]; n13 = this.elements[8]; n14= this.elements[12];
        n21 = this.elements[1]; n22 = this.elements[5]; n23 = this.elements[9]; n24= this.elements[13];
        n31 = this.elements[2]; n32 = this.elements[6]; n33 = this.elements[10]; n34= this.elements[14];
        n41 = this.elements[3]; n42 = this.elements[7]; n43 = this.elements[11]; n44= this.elements[15];
        
        // b matrix
        b11 = b.elements[0]; b12 = b.elements[4]; b13 = b.elements[8]; b14= b.elements[12];
        b21 = b.elements[1]; b22 = b.elements[5]; b23 = b.elements[9]; b24= b.elements[13];
        b31 = b.elements[2]; b32 = b.elements[6]; b33 = b.elements[10]; b34= b.elements[14];
        b41 = b.elements[3]; b42 = b.elements[7]; b43 = b.elements[11]; b44= b.elements[15];
        
        // math for multiplied matrix
        x11 = n11*b11 + n12*b21 + n13*b31 + n14*b41;
        x12 = n11*b12 + n12*b22 + n13*b32 + n14*b42;
        x13 = n11*b13 + n12*b23 + n13*b33 + n14*b43;
        x14 = n11*b14 + n12*b24 + n13*b34 + n14*b44;
        
        x21 = n21*b11 + n22*b21 + n23*b31 + n24*b41;
        x22 = n21*b12 + n22*b22 + n23*b32 + n24*b42;
        x23 = n21*b13 + n22*b23 + n23*b33 + n24*b43;
        x24 = n21*b14 + n22*b24 + n23*b34 + n24*b44;
        
        x31 = n31*b11 + n32*b21 + n33*b31 + n34*b41;
        x32 = n31*b12 + n32*b22 + n33*b32 + n34*b42;
        x33 = n31*b13 + n32*b23 + n33*b33 + n34*b43;
        x34 = n31*b14 + n32*b24 + n33*b34 + n34*b44;
        
        x41 = n41*b11 + n42*b21 + n43*b31 + n44*b41;
        x42 = n41*b12 + n42*b22 + n43*b32 + n44*b42;
        x43 = n41*b13 + n42*b23 + n43*b33 + n44*b43;
        x44 = n41*b14 + n42*b24 + n43*b34 + n44*b44;
        
        
        
        //multiplying and returning
        return new Matrix( x11, x12, x13, x14, x21, x22, x23, x24, x31, x32, x33, x34, x41, x42, x43, x44 );
        
        
	}

    // get the translation/positional componenet out of the matrix
    getPosition(): Vector {
        return new Vector(this.elements[12], this.elements[13], this.elements[14]);
    }
    
    // get the x, y and z vectors out of the rotation part of the matrix
    getXVector(): Vector {
        return new Vector(this.elements[0], this.elements[4], this.elements[8]);
    }
    getYVector(): Vector {
        return new Vector(this.elements[1], this.elements[5], this.elements[9]);
    }
    getZVector(): Vector {
        return new Vector(this.elements[2], this.elements[6], this.elements[10]);
    }
}

// The nodes in the graph and the scene are inspired by the raytracer, but are different.
// All the nodes in the tree are Things
export class Thing {
    // the children of the node, and the parent
    children: Thing[];
    parent: Thing;
    
    // store position and scale as vectors, but orientation as a matrix, since there are many
    // ways to create an orientation matrix.
    position: Vector;
    rotation: Matrix;
    scale: Vector;
    
    // the transform should be computed as position * rotation * scale, and NOT be set by the 
    // programmer who is using this library
    transform: Matrix;
    
    // inverse should be computed 
    inverseTransform: Matrix;
    worldTransform: Matrix;
        
    constructor() {
        // we'll provide the constructor as a hint
        this.position = new Vector(0,0,0);
        this.rotation = Matrix.identity();
        this.scale = new Vector(1,1,1);
        
        this.parent = undefined;
        this.children = new Array();
        this.transform = Matrix.identity();
        this.inverseTransform = Matrix.identity();
        this.worldTransform = Matrix.identity();
    }

    // compute transform from position * rotation * scale and inverseTransform from their inverses 
    computeTransforms() {
        var temp;
        // make translation matrix
        var pmatrix = Matrix.makeTranslation(this.position);
        
        // rotation matrix
        var rmatrix = this.rotation;
        
        // make scale matrix
        var smatrix = Matrix.makeScale(this.scale);
        
        // position * rotation * scale
        temp = pmatrix.multiply(rmatrix);
        temp = temp.multiply(smatrix);
        
        // set transform matrix
        this.transform = temp;
        
        // create inverse translation matrix
        var ipvector = Vector.times( -1, this.position);
        var ipmatrix = Matrix.makeTranslation(ipvector);
        
        // inverse scale vector
        var isvector = new Vector(1/this.scale.x, 1/this.scale.y, 1/this.scale.z);
        
        // create inverse scale matrix
        var ismatrix = Matrix.makeScale(isvector);
        
        // create inverse rotation matrix
        var irmatrix = Matrix.transpose(this.rotation);
        
        // math the inverse transform
        temp = ismatrix.multiply(irmatrix);
        temp = temp.multiply(ipmatrix);
        this.inverseTransform = temp;
        
    }    

    // add a child to this Thing.  Be sure to take care of setting the Thing's parent to this
    add(c: Thing) {
        this.children.push(c);
        c.parent = this;
    }

    // remove a Thing    
    remove(c: Thing) {
        // find index of child in this thing if it existss
        var index = this.children.indexOf(c);
        
        // remove it if it exists
        if (index > -1) {
            this.children.splice(index, 1);
        }       
    }

    // traverse the graph, executing the provided callback on this node and it's children
    // execute the callback before traversing the children
	traverse ( callback: (obj: Thing ) => void ) {
        callback(this);
        for ( var x = 0; x < this.children.length; x++ ) {
            callback(this.children[x]);
        }
	}    
}

// a simple interface for the surface color of a DIV.  We aren't doing any fancy lighting here.
export interface Surface {
    diffuse: Color;
}

// Things that are Drawable.  Only one here, the HTMLDivThing below.  
// A simple implementation is provided, as the class just holds some common data 
// for all drawable Things
export class Drawable extends Thing {
    surface: Surface;

    constructor() {
        super();
        this.surface = {diffuse: Color.white};
    }    
    
    setMaterial(s: Surface) {
        this.surface = s;
    }    
}

// The HTMLDivThing is simply a holder for the div being manipulated by the library.
// By having it be a class, we can recognize when a node is one of these and handle appropriately
export class HTMLDivThing extends Drawable {    
    constructor(public div: HTMLDivElement) {
        super();
        // set the position style of this to 'absolute' since we'll be moving it around
    	this.div.style.position = 'absolute';        
    }
}

// A simple Thing for a Light
export class Light extends Thing {
    constructor (public color: Color) {
       super(); 
    }
}

// The Camera Thing.  There must be one and only one in the Scene.
export class Camera extends Thing {
    // hint:  you will need to figure out and keep track of the inverse transform from
    // the camera up to the root of the scene.  
    worldInverseTransform: Matrix;
    
    constructor(public fovy: number) {
        super();
		this.worldInverseTransform = Matrix.identity();
    }

    // get the focal length (distance from the viewplane) for a window of a specified
    // height and the camera's fovy    
    getFocalLength (height: number): number {
        var t = height/2;
        return (t/(Math.tan(degToRad(this.fovy)/2)));
    }
}
 
export class Scene {
    world: Thing;
    camera: Camera;
    
    // an ambient color. Default to the defaultColor
    ambient: Color = Color.defaultColor;
    
    // internal
    private domElement: HTMLDivElement;
    private width: number;
    private height: number;
            
    // cached
    private lights: Light[];
    
    // We are providing a constructor for convenience
    constructor(public container: HTMLDivElement) {
        this.lights = new Array();
        this.world = new Thing();
        this.camera = undefined;

        // we will create a NEW DOM element inside the provided container div
        this.domElement = document.createElement( 'div' );

        // uncomment this to clip the contents of the domElement to the boundaries of the 
        // domElement; otherwise, div's can go outside of it's boundaries (useful for 
        // debugging!)
        //this.domElement.style.overflow = 'hidden';

        // set the transform-style to "preserve-3d" so the 3D values inherit
        this.domElement.style.transformStyle
            = this.domElement.style["-webkit-transform-style"]
            = this.domElement.style["-moz-transform-style"]
            = this.domElement.style["-o-transform-style"]
            = this.domElement.style["-ms-transform-style"] = "preserve-3d";

        // add our new DOM element to the provided container
        this.container.appendChild(this.domElement);

        // get the size of the provided container, and set our DOM element to it's size       
        var rect = container.getBoundingClientRect();
        this.width = rect.width;
        this.height = rect.height;
		this.domElement.style.width = this.width + 'px';
		this.domElement.style.height = this.height + 'px';
        
        // CSS uses a weird +y is DOWN coordinate frame, so we're going to
        // scale by -1 in Y in each of the elements, and then undo that scale here.
        // By doing this, all of our transformations can by in the more common
        // +1 is UP coordinate frame 
        this.domElement.style.transform   			
                            = this.domElement.style["-webkit-transform"]
                            = this.domElement.style["-moz-transform"]
                            = this.domElement.style["-o-transform"]
                            = this.domElement.style["-ms-transform"] 
                            = "matrix3d(1,0,0,0, 0,-1,0,0, 0,0,1,0, 0,0,0,1)"; 
    }

    // internal function to compute the color of a Drawable.  The color is a simple
    // diffuse Lambertian color, as described in chapter 10.1.
    // This function should account for all lights and an ambient light
    private shade(thing: Drawable, pos: Vector, normal: Vector): Color {
        // dot product of normal and vector
        var ln = Math.abs(Vector.dot(normal, pos));
        // initialize
        var total = Color.black;
        console.log("I have this many lights: " + this.lights.length);
        // time to add up lights
        for ( var x = 0; x < this.lights.length; x++ ) {
                
                // cr * cl * dotproduct of l and n
                var thiscontribution = Color.scale(ln, Color.times(this.lights[x].color, thing.surface.diffuse));
                
                // keep track of total light
                total = Color.plus( total, thiscontribution );
        }
        
        // add ambient to it
       total = Color.plus( total, this.ambient);
       return total;
    }

    // convenience function provided so you don't have to fight with this.  
    // we invert Y here, as described above
    getObjectCSSMatrix( m: Matrix ): string {
		var elements = m.elements;

		return 'matrix3d(' +
			epsilon( elements[ 0 ]  ) + ',' +
			epsilon( elements[ 1 ]  ) + ',' +
			epsilon( elements[ 2 ]  ) + ',' +
			epsilon( elements[ 3 ]  ) + ',' +
			epsilon( - elements[ 4 ]  ) + ',' +
			epsilon( - elements[ 5 ]  ) + ',' +
			epsilon( - elements[ 6 ]  ) + ',' +
			epsilon( - elements[ 7 ]  ) + ',' +
			epsilon( elements[ 8 ]  ) + ',' +
			epsilon( elements[ 9 ]  ) + ',' +
			epsilon( elements[ 10 ]  ) + ',' +
			epsilon( elements[ 11 ]  ) + ',' +
			epsilon( elements[ 12 ]  ) + ',' +
			epsilon( elements[ 13 ]  ) + ',' +
			epsilon( elements[ 14 ]  ) + ',' +
			epsilon( elements[ 15 ]  ) +
		')';
	};
    
    // the render function.
    //
    // In here, you should:
    // - update all the Things' internal matrices
    // - update all the Things' worldTransforms
    // - find the Lights and save them
    // - find the Camera and save it, and figure out it's inverse transformation to the root
    // - set the perspective on this.domElement from the focalLength, as follows:
    //         this.domElement.style.perspective 
    //                = this.domElement.style["-webkit-perspective"]
    //                = this.domElement.style["-moz-perspective"]
    //                = this.domElement.style["-o-perpective"]
    //                = this.domElement.style["-ms-perspective"] 
    //                = focalLength.toString() + "px";
    // - for each object, figure out the entire transformation to that object
    //   (including the inverse camera transformation). 
    // - add the DIV's in the HTMLDivThings directly to this.domElement (do not use a
    //   heirarchy) and set the transformation as follows:
    //        const transformStr = this.getObjectCSSMatrix(m);
    //        obj.div.style.transform   			
    //                        = obj.div.style["-webkit-transform"]
    //                        = obj.div.style["-moz-transform"]
    //                        = obj.div.style["-o-transform"]
    //                        = obj.div.style["-ms-transform"] = transformStr; 
    //
    // hint: you will need to traverse the graph more than once to do this.
    //
    render() {  
        var focalLength = 0;
        var transformers = (obj: Thing) => {
        // stuff to do in the callback
            obj.computeTransforms();
            // if (obj.parent != null) {
            //     obj.worldTransform = obj.transform.multiply(obj.parent.worldTransform);
            // }
            // if light
            if (obj instanceof Light) {
                this.lights.push(obj);
            }
            
            if (obj instanceof Camera) {
                this.camera = obj;
                focalLength = this.camera.getFocalLength(this.height);
                console.log("Height: " + this.height);
                console.log("Focal length: " + focalLength);
                console.log("Fovy: " + this.camera.fovy);
            }
        };
        
        this.world.traverse(transformers);
        
        
        // find object's world transforms
        var worldts = (obj: Thing) => {
            if (obj.parent != null) {
                obj.worldTransform = obj.transform.multiply(obj.parent.worldTransform);
            }
        }
        
        this.world.traverse(worldts);
        
        // go upwards to get the inverse transform of the camera to the root
        var temp = this.camera.parent;
        var final = this.camera.inverseTransform;
        while (temp != null) {
            final = final.multiply(temp.inverseTransform);
            temp = temp.parent;
        }
        this.camera.inverseTransform = final;
        
        this.domElement.style.perspective 
            = this.domElement.style["-webkit-perspective"]
            = this.domElement.style["-moz-perspective"]
            = this.domElement.style["-o-perpective"]
            = this.domElement.style["-ms-perspective"] 
            = focalLength.toString() + "px";
            

            
        // Find each object's entire transform to that object
        var round2 = (obj: Thing) => {
            obj.worldTransform = this.camera.inverseTransform.multiply(obj.worldTransform);
        }    
        this.world.traverse(round2);
        
        // Divs
        var divs = (obj: Thing) => {
            if (obj instanceof HTMLDivThing){
                const transformStr = this.getObjectCSSMatrix(obj.worldTransform);
                obj.div.style.transform 
                    = obj.div.style["-webkit-transform"]
                    = obj.div.style["-moz-transform"]
                    = obj.div.style["-o-transform"]
                    = obj.div.style["-ms-transform"] = transformStr;
                this.domElement.appendChild(obj.div);
                var color = this.shade(obj, obj.worldTransform.getPosition(), obj.worldTransform.getZVector() );
                obj.div.style.backgroundColor = "rgb(" + String(color.r) + ", " + String(color.g) + ", " + String(color.b) + ")";
            }   
        }
        this.world.traverse(divs);
            
        this.camera.worldInverseTransform = Matrix.identity();
        this.lights.splice(0, this.lights.length);
    }

}