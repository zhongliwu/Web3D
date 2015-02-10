/**
 * @fileoverview This file defines observe items of the scene
 */


function ObserveScene( )
{
    this.view = mat4.identity();
    this.model = mat4.identity();
    this.modelView = mat4.identity();
    this.normal = mat3.create();
    this.projection = mat4.identity();
}

ObserveScene.prototype.calculateNormalMatrix = function()
{
    mat4.multiply( this.view, this.model, this.modelView );
    mat4.toInverseMat3( this.modelView, this.normal );
    mat3.transpose( this.normal );
};

ObserveScene.prototype.calculateModelViewMatrix = function()
{
    mat4.multiply( this.view, this.model, this.modelView );
};

ObserveScene.prototype.updateModelMatrix = function( mod )
{
    this.model = mod;
};

ObserveScene.prototype.updateViewMatrix = function( view )
{
    this.view = view;
};

ObserveScene.prototype.updateProjectionMatrix = function( pro )
{
    this.projection = pro;
};

ObserveScene.prototype.uploadMatrixToShader = function( mvPosition, proPosition, norPosition )
{
    this.calculateModelViewMatrix();
    this.calculateNormalMatrix();

    if( mvPosition )
    {
        gl.uniformMatrix4fv( mvPosition, false, this.modelView );
    }

    if( proPosition )
    {
        gl.uniformMatrix4fv( proPosition, false, this.projection );
    }

    if( norPosition )
    {
        gl.uniformMatrix3fv( norPosition, false, this.normal );
    }
};

ObserveScene.prototype.upload4X4MatrixToShader = function( position, matrix )
{
    if( position )
    {
        gl.uniformMatrix4fv( position, false, matrix );
    }
};

ObserveScene.prototype.upload3X3MatrixToShader = function( position, matrix )
{
    if( position )
    {
        gl.uniformMatrix3fv( position, false, matrix );
    }
};