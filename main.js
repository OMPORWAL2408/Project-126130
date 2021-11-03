song1 = "";
song2 = "";
rightWristX = 0;
rightWristY = 0;
leftWristX = 0;
leftWristY = 0;
scoreleftWrist = 0;
scorerightWrist = 0;
statusleft = "";
statusright = "";
function preload()
{
   song1 = loadSound("music.mp3");
   song2 = loadSound("Believer.mp3");
    
}


function setup()
{
    canvas = createCanvas(600, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelloaded);
    poseNet.on('pose', getPoses);
}

function modelloaded()
{
    console.log(" Posenet is initialized!!");
}

function draw()
{
    image(video, 0, 0, 600, 500 );

    
    statusleft = song1.isPlaying();
    circle(rightWristX, rightWristY, 20);
    if(scoreleftWrist > 0.2)
    {
        circle(leftWristX, leftWristY, 20);
        song2.stop()

        if(statusleft == false)
        {
            song1.play();
            document.getElementById("songname").innerHTML = "Song name: Harry Potter Song";
        }
    }
    
    statusright = song2.isPlaying();
    if(scorerightWrist > 0.2)
    {
        circle(rightWristX, rightWristY, 20);
        song1.stop()

        if(statusright == false)
        {
            song2.play();
            document.getElementById("songname").innerHTML = "Song name: Believer";
        }
    }
}

function getPoses(results)
{
    if(results.length > 0)
    {
        scoreleftWrist = results[0].pose.keypoints[9].score;
        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left wrist X " + leftWristX + "Left wrist Y " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right Wrist X " + rightWristX + "Right Wrist Y " + rightWristY);
    }
}