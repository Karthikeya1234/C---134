img = "";
status = "";
objects = [];

function preload() {
    img = loadImage('Me and champ.jpg');
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380)
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
    console.log("Modal Loaded!");
    status = true;
    objectDetector.detect(video, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    else{
        console.log(results);
        objects = results;
    } 
}

function draw() {
    image(video, 0, 0, 380, 380);
    /*
    fill("#FF0000");
    text("Champ", 190, 210);
    noFill();
    stroke("#FF0000");
    rect(180, 200, 450, 350);

    fill("#FF0000");
    text("Karthikeya", 25, 25);
    noFill();
    stroke("#FF0000");
    rect(00, 00, 450, 350); */

    if(status != "") {
        r = random(255);
        g = random(255);
        b = random(255);   
        objectDetector.detect(video, gotResult)
        for (i = 0; i < objects.length; i++) 
        {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are :" + objects.length;

            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%",objects[i].x +15, objects[i].y +15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}