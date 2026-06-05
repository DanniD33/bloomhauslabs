@mixin center($width: null, $height: null) {
  position: absolute;
  top: 50%;
  left: 50%;
  @if not $width and not $height {
    transform: translate(-50%, -50%);
  } @else if $width and $height {
    width: $width;
    height: $height;
    margin: -($width / 2) #{0 0} -($height / 2)
  } @else if not $height {
    margin-left: -($width / 2);
    transform: translateY(-50%);
    width: $width;
  } @else {
    margin-top: -($height / 2);
    transform: translateX(-50%);
    height: $height;
  }
}

@mixin pos ($position, $top: auto, $right: auto, $bottom: auto, $left: auto) {
  position: $position;
  top: $top;
  right: $right;
  bottom: $bottom;
  left: $left;
}


/**
 * Variables
 */

// Colors
$primary-color: #151515;
$off-white: #E8E9E2;

// Animations
$timing: cubic-bezier(0.215, 0.610, 0.355, 1.000);
$duration: 5s;

// Spacing
$spacing: 0.35em;


/**
 * Animations
 */
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(teal, 0.2);
  }

  100% {
    box-shadow: 0 0 0 400px rgba(teal, 0);
  }
}

@keyframes hover {
  0% {
    transform: translate3d(0, 0, 0);
  }

  50% {
    transform: translate3d(0, -3%, 0);
  }

  100% {
    transform: translate3d(0, 0, 0);
  }
}


/**
 * Base
 */
*,
*:after,
*:before {
    box-sizing: border-box;
}

body {
  font-family: "Helvetica Neue","Helvetica", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: bold;
}


/**
 * Gallery
 */
.gallery {
  @include pos(absolute, 0, 0, 0, 0);
  z-index: 1;
  width: 100%;
  height: 100%;
  overflow: hidden;
  opacity: 1;
  transition: $duration opacity $timing;
	background: $primary-color;
	background: radial-gradient(ellipse at center, lighten($primary-color, 5%) 0%, $primary-color 100%);

  &.fadeOut {
    opacity: 0;
  }
}

.gallery__body {
  @include center();
  transform-origin: center center;
}


/**
 * Poster
 */
.poster {
  @include center();
  transform-origin: center center;
  display: inline-block;
  vertical-align: middle;

  &:before,
  &:after {
    z-index: -1;
    position: absolute;
    content: "";
    bottom: 15px;
    left: 8px;
    width: 50%;
    top: 80%;
    max-width: 300px;
    background: #777;
    box-shadow: 0 15px 10px rgba(#000,.5);
    transform: rotate(-3deg);
  }

  &:after {
    transform: rotate(3deg);
    right: 8px;
    left: auto;
  }
}

.poster__content {
  position: relative;
  width: 500px;
  height: 700px;
  overflow: hidden;
	padding: 2%;
  background-color: $off-white;
  color: $primary-color;
  box-shadow: 0 1px 4px 2px rgba(#000,.2);
}

.poster__header {
    position: absolute;
    left: $spacing;
    right: $spacing;
    bottom: $spacing;
    width: 100%;
    overflow: hidden;
}

.poster__header-col {
    width: 33.3333%;
    float: left;
    font-size: 9px;
    font-weight: bold;

    li {
        margin-bottom: $spacing/2;
    }
}

.poster__header-title {
    font-size: 24px;
    line-height: 0.7;
    margin: 0 0 $spacing*5.75;
}

.poster__body {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.poster__body-circ {
    position: absolute;
    border-radius: 50%;
    background-color: $primary-color;
    transition: all $duration $timing;
    overflow: hidden;

    &:nth-child(1) {
        z-index: 4;
        left: 25%;
        top: -65%;
        width: 800px;
        height: 800px;
        animation: pulse $duration 3s $timing infinite alternate, hover $duration*2 $timing infinite;
    }

    &:nth-child(2) {
        z-index: 3;
        width: 260px;
        height: 260px;
        left: $spacing;
        top: 27.5%;
        animation: pulse $duration 2s $timing infinite alternate, hover $duration*1.5 $timing infinite;
    }

    &:nth-child(3) {
        z-index: 2;
        width: 110px;
        height: 110px;
        left: 40%;
        top: 60%;
        animation: pulse $duration 1s $timing infinite alternate, hover $duration $timing infinite;
    }

    &:nth-child(4) {
        z-index: 1;
        width: 45px;
        height: 45px;
        left: 58%;
        top: 56%;
        animation: pulse $duration $timing infinite alternate, hover $duration/2 $timing infinite;
    }
}