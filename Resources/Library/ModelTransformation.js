/**
 * @fileoverview This file defines the matrix, who handles the model transformation
 */




function ModelTransformation()
{
    this.modelMatrix = mat4.identity();
    this.modelStack = [];
}


ModelTransformation.prototype.move = function( direction )
{
    mat4.translate( this.modelMatrix, direction);
};


ModelTransformation.prototype.rotate = function( angle, axis )
{
    mat4.rotate( this.modelMatrix, angle, axis );
};

ModelTransformation.prototype.deformation = function( x, y, z )
{
    mat4.scale( this.modelMatrix, [x, y, z] );
};

ModelTransformation.prototype.pushModelMatrix = function()
{
    var copyToPush = mat4.create( this.modelMatrix );
    this.modelStack.push( copyToPush );
};

ModelTransformation.prototype.popModelMatrix = function()
{
    if( this.modelStack.length === 0 )
    {
        alert( "ERROR_MATRIX: The modelStack is empty when you try to pop it!" );
    }

    this.modelMatrix = this.modelStack.pop();
};