t = 0;
delta_t = 0.06;

// Sun
x_sun = 0;
y_sun = 0;
r_sun = 20;

// Earth
r_earth = 30;
r_sun_earth = 100;
x_earth = 0;
y_earth = 0;
v_earth = 1;
v_earth_spin = 365;
latitude = 34;

// Moon
r_moon = 10;
r_earth_moon = 0.002676 * r_sun_earth;
x_moon = 0;
y_moon = 0;
v_moon = 12;

// Venus
r_venus = 30;
r_sun_venus = 0.7238 * r_sun_earth;
x_venus = 0;
y_venus = 0;
z_venus = 0;
v_venus = v_earth / 0.61562;
v_venus_spin = v_earth_spin / 116.75;
venus_orbit_inclin = 3.38 * (Math.PI/180);
venus_orbit_normal = 0;
venus_major_axis = 0;
venus_minor_axis = 0;

// Mars
r_mars = 30;
r_sun_mars = 1.504 * r_sun_earth;
x_mars = 0;
y_mars = 0;
z_mars = 0;
v_mars = v_earth / 1.88;
v_mars_spin = v_earth_spin / 1.02749;
mars_orbit_inclin = 1.81 * (Math.PI/180);
mars_orbit_normal = 0;
mars_major_axis = 0;
mars_minor_axis = 0;

// Jupiter
r_jupiter = 30;
r_sun_jupiter = 5.209 * r_sun_earth;
x_jupiter = 0;
y_jupiter = 0;
z_jupiter = 0;
v_jupiter = v_earth / 11.86;
v_jupiter_spin = v_earth_spin / 0.41354;
jupiter_orbit_inclin = 1.31 * (Math.PI/180);
jupiter_orbit_normal = 0;
jupiter_major_axis = 0;
jupiter_minor_axis = 0;

function setup() {

/* Setup the animation */
  createCanvas(window.innerWidth, window.innerHeight);
  colorMode(RGB);
  textSize(15);
  translate(width / 2, height / 2);
  scale(1, -1);

// Setup Mars
  mars_orbit_normal = new Vector(0, cos((Math.PI/2)-mars_orbit_inclin), sin((Math.PI/2)-mars_orbit_inclin));
  mars_major_axis = new Vector(0, sin((Math.PI/2)-mars_orbit_inclin), -cos((Math.PI/2)-mars_orbit_inclin));
  mars_minor_axis = mars_orbit_normal.cross(mars_major_axis);

// Setup Venus
  venus_orbit_normal = new Vector(0, cos((Math.PI/2)-venus_orbit_inclin), sin((Math.PI/2)-venus_orbit_inclin));
  venus_major_axis = new Vector(0, sin((Math.PI/2)-venus_orbit_inclin), -cos((Math.PI/2)-venus_orbit_inclin));
  venus_minor_axis = venus_orbit_normal.cross(venus_major_axis);

// Setup Jupiter
  jupiter_orbit_normal = new Vector(0, cos((Math.PI/2)-jupiter_orbit_inclin), sin((Math.PI/2)-jupiter_orbit_inclin));
  jupiter_major_axis = new Vector(0, sin((Math.PI/2)-jupiter_orbit_inclin), -cos((Math.PI/2)-jupiter_orbit_inclin));
  jupiter_minor_axis = jupiter_orbit_normal.cross(jupiter_major_axis);

}

function draw() {

/* The draw loop which is called continuously */
  translate(width / 2, height / 2);
  scale(1, -1);
  background(0);

// Earth position
  x_earth = x_sun + r_sun_earth * cos(v_earth * t);
  y_earth = y_sun + r_sun_earth * sin(v_earth * t);

// Moon position
  x_moon = x_earth + r_earth_moon * cos(v_moon * t);
  y_moon = y_earth + r_earth_moon * sin(v_moon * t);

// Mars position
  x_mars = x_sun + r_sun_mars * cos(v_mars * t);
  y_mars = y_sun + r_sun_mars * sin(v_mars * t);
  //vec_mars = new Vector(r_sun_mars * cos(v_mars * t) * mars_major_axis.x + r_sun_mars * sin(v_mars * t) * mars_minor_axis.x, r_sun_mars * cos(v_mars * t) * mars_major_axis.y + r_sun_mars * sin(v_mars * t) * mars_minor_axis.y, r_sun_mars * cos(v_mars * t) * mars_major_axis.z + r_sun_mars * sin(v_mars * t) * mars_minor_axis.z);
  vec_mars_z = r_sun_mars * cos(v_mars * t) * mars_major_axis.z + r_sun_mars * sin(v_mars * t) * mars_minor_axis.z;
  //z_mars = 10 * vec_mars.z;
  z_mars = 10 * vec_mars_z;

// Venus Postion
  x_venus = x_sun + r_sun_venus * cos(v_venus * t);
  y_venus = y_sun + r_sun_venus * sin(v_venus * t);
  //vec_venus = new Vector(r_sun_venus * cos(v_venus * t) * venus_major_axis.x + r_sun_venus * sin(v_venus * t) * venus_minor_axis.x, r_sun_venus * cos(v_venus * t) * venus_major_axis.y + r_sun_venus * sin(v_venus * t) * venus_minor_axis.y, r_sun_venus * cos(v_venus * t) * venus_major_axis.z + r_sun_venus * sin(v_venus * t) * venus_minor_axis.z);
  vec_venus_z = r_sun_venus * cos(v_venus * t) * venus_major_axis.z + r_sun_venus * sin(v_venus * t) * venus_minor_axis.z;
  //z_venus = 10 * vec_venus.z;
  z_venus = 10 * vec_venus_z;

// Jupiter Postion
  x_jupiter = x_sun + r_sun_jupiter * cos(v_jupiter * t);
  y_jupiter = y_sun + r_sun_jupiter * sin(v_jupiter * t);
  //vec_jupiter = new Vector(r_sun_jupiter * cos(v_jupiter * t) * jupiter_major_axis.x + r_sun_jupiter * sin(v_jupiter * t) * jupiter_minor_axis.x, r_sun_jupiter * cos(v_jupiter * t) * jupiter_major_axis.y + r_sun_jupiter * sin(v_jupiter * t) * jupiter_minor_axis.y, r_sun_jupiter * cos(v_jupiter * t) * jupiter_major_axis.z + r_sun_jupiter * sin(v_jupiter * t) * jupiter_minor_axis.z);
  vec_jupiter_z = r_sun_jupiter * cos(v_jupiter * t) * jupiter_major_axis.z + r_sun_jupiter * sin(v_jupiter * t) * jupiter_minor_axis.z;
  //z_jupiter = 10 * vec_jupiter.z;
  z_jupiter = 10 * vec_jupiter_z;

/*
  //a = atan2(y_mars - y_earth, x_mars - x_earth);
  fraction = 100 * (((v_earth * t) * (180 / Math.PI)) % 360) / 360;
  //console.log( ((calcNoonSunAngle(fraction, latitude) + latitude - 90)/23.5 ) * (height/2));
  //y_eclip = -23.5*cos(2*Math.PI*fraction/100);

  v_1 = new Vector(0, 1, 0);
  v_1 = new Vector(cos(Math.PI/3), sin(Math.PI/3));
  v_1 = new Vector(cos(v_earth_spin * t), sin(v_earth_spin * t));
  v_2 = new Vector(x_mars - x_earth, y_mars - y_earth, 0);
  angle = atan2(v_2.y, v_2.x) - atan2(v_1.y, v_1.x);

  if (angle > Math.PI) {
    angle -= 2 * Math.PI;
  }

  else if (angle <= -Math.PI) {
    angle += 2 * Math.PI;
  }

  angle = -((360 + (180 / Math.PI) * angle) % 360);

  if (-360 <= angle && angle <= -180) {
    angle = 360 + angle;
  }

*/

// Sun
  fill(255, 255, 0);
  //circle(0, 0, r_sun);

// Earth
  fill(0, 0, 255);
  //circle(x_earth, y_earth, r_earth);

// Moon
  fill(0, 255, 0);
  //circle(x_moon, y_moon, r_moon);

// Mars
  mars_pos_x = -5000000;

  if(x_mars - x_earth > 0) {
    stroke(255, 131, 0);
    //line(x_earth, y_earth, x_mars, y_mars);
    noStroke();
    aa_mars = atan2(x_mars - x_earth, y_mars - y_earth) - (Math.PI / 2);
    mars_pos_x = ((aa_mars/(Math.PI / 2)) * (width / 2));
  }

  fill(255, 131, 0);
  //circle(x_mars, y_mars, r_mars);
  circle(mars_pos_x, z_mars, 15);

// Venus
  venus_pos_x = -5000000;

  if(x_venus - x_earth > 0) {
    stroke(255, 215, 0);
    //line(x_earth, y_earth, x_venus, y_venus);
    noStroke();
    aa_venus = atan2(x_venus - x_earth, y_venus - y_earth) - (Math.PI / 2);
    venus_pos_x = ((aa_venus/(Math.PI / 2)) * (width / 2));
  }

  fill(255, 215, 0);
  //circle(x_venus, y_venus, r_venus);
  circle(venus_pos_x, z_venus, 15);

// Jupiter
  jupiter_pos_x = -5000000;

  if(x_jupiter - x_earth > 0) {
    stroke(139, 69, 19);
    //line(x_earth, y_earth, x_jupiter, y_jupiter);
    noStroke();
    aa_jupiter = atan2(x_jupiter - x_earth, y_jupiter - y_earth) - (Math.PI / 2);
    jupiter_pos_x = ((aa_jupiter/(Math.PI / 2)) * (width / 2));
  }

    fill(139, 69, 19);
    //circle(x_jupiter, y_jupiter, r_jupiter);
    circle(jupiter_pos_x, z_jupiter, 15);

  t += delta_t;

}

class Vector {
/* custom Vector class */
  constructor(x, y, z){
    this.x = x;
    this.y = y;
    this.z = z;
    this.magnitude = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2));
  }

  dot(V){
    return this.x * V.x + this.y * V.y + this.z * V.z;
  }

  cross(V){
    return new Vector(this.y * V.z - this.z * V.y, this.z * V.x - this.x * V.z, this.x * V.y - this.y * V.x);
  }

}

/*
function calcNoonSunAngle(fr, latitude) {
  if (0 <= fr && fr <= 50) {
    var f = (float(23.5 * fr) / 25) - 23.5;
    return 90 + f - latitude;
  }

  else if (50 < fr  && fr <= 100 ){
    var f = 23.5 - (float(23.5 * (fr-50)) / 25);
    return 90 + f - latitude;
  }

  return null;
}
*/
