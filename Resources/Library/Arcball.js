/**
 * This file uses arcball algorithm to handle mouse move
 */




function Arcball( width, height )
{
    this.point1 = vec3.create();
    this.point2 = vec3.create();

    this.rotateQuaternion = quat4.create();
    this.rotateMatrix = mat4.identity();
    this.previousMatrix = mat4.identity();

    this.height = 0.0;
    this.width = 0.0;
    this.setBound( width, height );
}


Arcball.prototype.setBound = function( newWidth, newHeight )
{
    this.width = newWidth;
    this.height = newHeight;
};


Arcball.prototype.mapToSphere = function( oldPoint )
{
    var x = 0;
    var y = 1;
    var z = 2;

    var newPoint = vec3.create();
    newPoint[x] = oldPoint[x] / this.width * 2.0 - 1.0;
    newPoint[y] = 1.0 - oldPoint[y] / this.height * 2.0;

    var square = newPoint[x] * newPoint[x] + newPoint[y] * newPoint[y];
    if( square > 1.0)
    {
        newPoint[z] = 0.0;
        vec3.normalize( newPoint );
    }
    else
    {
        newPoint[z] = Math.sqrt( 1.0 - square );
    }

    return newPoint;
};




Arcball.prototype.leftClick = function( x, y )
{
    var temp = vec3.create();

    temp[0] = x;
    temp[1] = y;
    temp[2] = 0.0;

    this.point1 = this.mapToSphere( temp );
};

Arcball.prototype.drag = function( x, y )
{
    var temp = vec3.create();

    temp[0] = x;
    temp[1] = y;
    temp[2] = 0.0;

    this.point2 = this.mapToSphere( temp );

    var crossProduct = vec3.create();
    vec3.cross( this.point1, this.point2, crossProduct );

    if( vec3.length( crossProduct ) > 0 )
    {
        var angle = 0.0;
        angle = vec3.dot( this.point1, this.point2 );
        this.rotateQuaternion[0] = crossProduct[0];
        this.rotateQuaternion[1] = crossProduct[1];
        this.rotateQuaternion[2] = crossProduct[2];
        this.rotateQuaternion[3] = angle;
    }
    else
    {
        this.rotateQuaternion[0] = 0.0;
        this.rotateQuaternion[1] = 0.0;
        this.rotateQuaternion[2] = 0.0;
        this.rotateQuaternion[3] = 0.0;
    }

    this.rotateMatrix = quat4.toMat4( this.rotateQuaternion );
};