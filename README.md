# Assignment 2: Scene Graph

In this assignment, you will create a simple scene graph to position and color HTML elements,
using CSS3 transforms.  
The graph's ```render()``` method will compute all of the transformations on the tree of nodes, 
and  use it to set the full transformation on each HTML element in the graph;  
you will **NOT** use any CSS 3D hierachy for the elements.  
Similarly, the background color of each element will be computed from the lights in the scene.

You will create a module in SG.ts that implements a scene graph.  A skeleton of SG.ts is provide,
and is based loosely on the code in the ray tracing assignment (a1), since you are already 
familiar with that code.
 
The sample code also includes an example program (ex1.html and ex1.ts) that uses SG.ts to render a set of five simple
scenes:

- single div, translated -200 in z, camera translated by (-100,50,200)

![scene 1](https://github.gatech.edu/pages/cs3451f15/a2/img/ex1a.png)

- single div, translated 200 in z so it fills the view

![scene 2](https://github.gatech.edu/pages/cs3451f15/a2/img/ex1b.png)

- single div, rotated by 35 degrees around X

![scene 3](https://github.gatech.edu/pages/cs3451f15/a2/img/ex1c.png)

- two divs, transformed to be 90 degrees rotated on an edge, with a camera rotation

![scene 1](https://github.gatech.edu/pages/cs3451f15/a2/img/ex1d.png)

- single div, rotating, with camera rotating as well

![scene 1](https://github.gatech.edu/pages/cs3451f15/a2/img/ex1e.gif)

## Due: Friday Oct 2nd, 5pm

## Overview 

The assignment requires you to do two things:

1. Implement the scene graph library defined in SG.ts.  A number of the classes are partially defined, mostly providing an interface that you must implement.  
2. Use the scene graph to create a simple "portfolio page" for a hypothetical portforlio (described further below).

You should submit the full project, as in the previous assignments.  All of the code for the scene graph should be in SG.ts, and your simple "portfolio" should be in new a2.html and a2.ts files.  The tsconfig.json should be updated to include this new a2.ts;  the TAs should be able to compile your files by running the ```tsc``` command and then open a2.html to see your simple portfolio.

## Details

We have provided a sample program to test your SG.ts module, ex1.ts and ex1.html.  You can use this as a first set of tests;  once ex1.html matches the images above, your SG.ts probably works:  we will not, of course, guarantee that it works because the tests in ex1 are very simple (very few objects, very little depth to the graph).  You will need to test these yourself.

The second part of the assignment is to create a simple portfolio page.  We do not expact an elaborate portfolio, but rather a mockup of what a page might look like if it used a fancy 3D interface to the elements of the portfolio.  The guidelines (which we will base the grading on) are:

1. you must include at least 10 elements in the portfolio
2. each element is a single DIV, but can contain any number of DIVs within it.  It could be an image, a movie, or a mixture of an image or a movie and some text.
3. each element must be the same size
4. the elements must be layed out in 3D so that it is visually obvious they are in 3D with perspective, but how is up to you.
5. there should be some form of continuous animation or movement of the elements, in 3D.  It can be simple, or complex;  it is up to you. 
6. you should make use of the scene graph hierarchy to manage the scene.  The scene should not be flat, but should be at least 3 levels deep in at least one part of the scene.
6. when you click on one of the elements, it should get larger.  Ideally, it would provide more information about the portfolio element, but that is not necessary for this assignment.  When you click on the element again, or click on a different element, the first element should return to its original size (i.e., only one element is large at a time).

You are free to make up portfolio items as you see fit;  they do not have to actually be your work, but can be anything reasonable.  A collection of 10 or more photos is fine, although we encourage you to take the opportunity to make something that you would be proud to show others.  We will not just the portforlio content elements themselves; the goal is to have a more complex example of your scene graph in use.

For this assignment, you are **NOT** allowed to use any of the CSS3 transformation animation functions;  rather, you must implement the animations in code with your scene graph and requestAnimationFrame.

## Submission

Your grade will be based on satisfying the requirements described above.  You should submit your code in a clean zip file, as in the first two assignments.

**Use the file names we have requested.** (SG.ts, a2.html, a2.ts).  The TAs need to be able to test your program as follows:

1. cd into the directory and run ```npm install```
2. compile with ```tsc```
3. open and view the web page ```a2.html```

The TAs will at least test your SG.ts against the provided ```ex1.html``` and ```ex1.ts``` sample, as 
well as running your ```a2.html``` submission.  **NOTE:** the TAs may also test your SG.ts with other test programs of their own creation, so you should make sure you implement the library fully, as requested.  
