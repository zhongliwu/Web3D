/**
 * @fileoverview This file defines the camera matrix, who operating view of the scene
 */




function Camera()
{
    this.eyePosition = vec3.create();
    this.center = vec3.create();
    this.upDirection = vec3.create();

    this.viewMatrix = mat4.identity();
    this.projectionMatrix = mat4.identity();

    this.minZ = 0.1;
    this.maxZ = 10000;
}

Camera.prototype.setPerspectiveProjection = function( fov, scale, zNear, zFar )
{
    if( zNear < this.minZ )
    {
        zNear = this.minZ;
    }

    if( zFar > this.maxZ )
    {
        zFar = this.maxZ;
    }


    mat4.perspective( fov, scale, zNear, zFar, this.projectionMatrix );
};


Camera.prototype.setView = function( eye, cen, up )
{
    this.eyePosition = eye;
    this.center = cen;
    this.upDirection = up;

    mat4.lookAt( this.eyePosition, this.center, this.upDirection, this.viewMatrix );
};

Camera.prototype.uploadWorldCameraPositionToShader = function( currentPosition )
{
    gl.uniform3fv( currentPosition, this.eyePosition );
};

Camera.prototype.goHome = function()
{
    this.viewMatrix = mat4.identity();
};