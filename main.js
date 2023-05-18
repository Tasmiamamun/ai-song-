song1=""
song2=""
song1_status=""
song2_status=""
score_right_wrist=0
score_left_wrist=0
right_wristX=0
right_wristY=0
left_wristX=0
left_wristY=0



function preload(){
    song1=loadSound("26-Heart-Attack.mp3")
    song2=loadSound("wolves.mp3")
}



function setup(){
    canvas=createCanvas(600,600)
    canvas.center()
    video=createCapture(VIDEO)
    video.hide()
    poseNet=ml5.poseNet(video,modal_loaded)
    poseNet.on("pose",got_poses)
}


function modal_loaded(){
    console.log("Model is loaded")
}


function got_poses(results){
    console.log(results)
    if (results.length>0) {
        score_right_wrist=results[0].pose.keypoints[10].score
        score_left_wrist=results[0].pose.keypoints[9].score
        right_wristX=results[0].pose.rightWrist.x
        right_wristY=results[0].pose.rightWrist.y
        left_wristX=results[0].pose.leftWrist.x
        left_wristY=results[0].pose.leftWrist.y
    }
   
    }


    

function draw(){
    image(video,0,0,600,600)
song1_status=song1.isPlaying()
song2_status=song2.isPlaying()

    if (score_right_wrist>0.2) {
        song1.play()
        if (song1_status==true) {
            song2.stop()
            document.getElementById("status").innerHTML="Wolves song is playing on the screen"
        }
        
        circle(right_wristX,right_wristY,20)
    }


    if (score_left_wrist>0.2) {
        song2.play()
        if (song2_status==true) {
            song1.stop()
            document.getElementById("status").innerHTML="Heart Attack is playing on the screen"
        }
        
        circle(left_wristX,left_wristY,20)
    }
}


function play(){
    song.play()
    song.setVolume(1)
    song.rate(1)
}