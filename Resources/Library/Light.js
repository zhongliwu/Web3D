/**
 * @fileoverview This file defines light parameter of the application.
 * We use phong reflection model and phong shading model in this application.
 */


var POINT_LIGHT = true;
var DIRECTIONAL_LIGHT = false;


function Light( tp )
{
    if( tp === "pointLight" )
    {
        this.type = POINT_LIGHT;
    }
    else if( tp === "directionalLight" )
    {
        this.type = DIRECTIONAL_LIGHT;
    }
    else
    {
        alert( "ERROR_LIGHT: The light type is incorrect when trying to initialize.\n" +
            "We use point light as default." );
        this.type = POINT_LIGHT;
    }

    this.lightPosition = vec3.create();
    this.ambientLight = vec3.create();
    this.diffuseLight = vec3.create();
    this.specularLight = vec3.create();
}



Light.prototype.setPosition = function( pos )
{
    if( this.type === POINT_LIGHT )
    {
        this.lightPosition = pos;
    }
    else
    {
        alert( "ERROR_LIGHT: Directional light do not have light positions! \n" +
            "Please use setDirection() instead." );
    }
};


Light.prototype.setDirection = function( dir )
{
    if( this.type === DIRECTIONAL_LIGHT )
    {
        this.lightPosition = dir;
    }
    else
    {
        alert( "ERROR_LIGHT: Point light do not have light directions! \n" +
            "Please use setPosition() instead." );
    }
};


Light.prototype.setAmbient = function( amb )
{
    this.ambientLight = amb;
};

Light.prototype.setDiffuse = function( dif )
{
    this.diffuseLight = dif;
};

Light.prototype.setSpecular = function( spec )
{
    this.specularLight = spec;
};



Light.prototype.uploadLightToShader = function( pos, amb, dif, spec, ult )
{
    if( pos )
    {
        gl.uniform3fv( pos, this.lightPosition );
    }

    if( amb )
    {
        gl.uniform3fv( amb, this.ambientLight );
    }

    if( dif )
    {
        gl.uniform3fv( dif, this.diffuseLight );
    }

    if( spec )
    {
        gl.uniform3fv( spec, this.specularLight );
    }

    if( ult )
    {
        gl.uniform1i( ult, this.type );
    }
};