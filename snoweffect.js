// -------------------------------------------------------------------------------------------------
// JavaScript Snow Effect - © Copyright 2020 - Jam-Es.com
// Horizontal snow particle movement code contributed by Randolf Richardson on 2021-Mar-01.
// Licensed under the MIT License (MIT). See LICENSE in the repo root for license information.
// -------------------------------------------------------------------------------------------------

// Change the following variables to customize the appearance of the particles
var numParticles = window.innerWidth / 3;
var maxSpeed = 0.7;
var minSpeed = 0.1;
var maxSize = 2.5;
var minSize = 0.5;
var maxOpacity = 0.7;
var minOpacity = 0.1;
var horizontalMovementFrequency = 42; // Lower = More frequent
var horizontalMovementSize = 1.5;
var canvasId = "snowcanvas";

// If the following is true, the canvas resolution will be set to match the full viewport width and height.
var fixCanvasResolution = true;

var snow_particles = [];

window.onload = function() {
	if (fixCanvasResolution) {
		var c = document.getElementById(canvasId);
		c.width = window.innerWidth;
		c.height = window.innerHeight;
	}
	InitPoints();
	setInterval(Redraw, 5);
}

function Redraw() {
	var c = document.getElementById(canvasId);
	var ctx = c.getContext("2d");
	ctx.clearRect(0,0,c.width,c.height);
	for (i = 0; i < snow_particles.length; i++) {
		var newYPos = snow_particles[i].yPos + snow_particles[i].speed;
		if (newYPos > window.innerHeight) {
			newYPos = getRandomInt(-100,-10);
			snow_particles[i].xPos = getRandomInt(0, window.innerWidth);
			snow_particles[i].speed = Math.random() * (maxSpeed - minSpeed) + minSpeed;
			snow_particles[i].opacity = Math.random() * (maxOpacity - minOpacity) + minOpacity;
			snow_particles[i].size = Math.random() * (maxSize - minSize) + minSize;
		}
		snow_particles[i].yPos = newYPos;

		// Occasionally move snow particle horizontally
		if (Math.floor(Math.random() * (horizontalMovementFrequency / snow_particles[i].speed)) == 0) {
			var newXPos = snow_particles[i].xPos + (Math.random() * horizontalMovementSize * 2 - horizontalMovementSize);
			if (newXPos < 0) {
				newXPos = window.innerWidth - 1; // Wrap disappearing particle to right side of screen
			} else if (newXPos >= window.innerWidth) {
				newXPos = 0; // Wrap disappearing particle to left side of screen
			}
			snow_particles[i].xPos = newXPos;
		}

		ctx.beginPath();
		ctx.arc(snow_particles[i].xPos, newYPos, snow_particles[i].size, 0, 2 * Math.PI);
		ctx.fillStyle = "rgba(255, 255, 255, " + snow_particles[i].opacity + ")";
		ctx.fill();
	}
}

function InitPoints() {
	for (i = 0; i < numParticles; i++) {
		var startX = getRandomInt(0, window.innerWidth);
		var startY = getRandomInt(0, window.innerHeight);
		var speed = Math.random() * (maxSpeed - minSpeed) + minSpeed;
		var opacity = Math.random() * (maxOpacity - minOpacity) + minOpacity;
		var size = Math.random() * (maxSize - minSize) + minSize;

		snow_particles.push({
			"xPos": startX,
			"yPos": startY,
			"speed": speed,
			"opacity": opacity,
			"size": size,
		});
	}
}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}
