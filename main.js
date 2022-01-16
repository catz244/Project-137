Status = "";
objects = [];
object_name = "";

function setup(){
    canvas = createCanvas(400, 330);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function gotResults(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}

function draw(){
    image(video, 0, 0, 400, 330);

    if(Status != ""){
        objectDetector.detect(video, gotResults);

        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Objects Detected";

            fill("#FF0000");
            percentage = floor(objects[i].confidence * 100);
            text(objects[i].label +" "+ percentage, objects[i].x, objects[i].y);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }

        if(objects[i].label == object_name){
            video.stop()
            objectDetector.detect(gotResults);
            document.getElementById("status").innerHTML = "object mentioned is found";
            synth = window.SpeechSynthesis;
            utterThis = new SpeechSynthesisUtterance("object mentioned is found");
            synth.speak(utterThis);
        }
        else{
            document.getElementById("status").innerHTML = "object mentioned is not found";
        }
    }
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    object_name = document.getElementById("input").value;
}

function modelLoaded(){
    console.log("model loaded");
    Status = true;
}

