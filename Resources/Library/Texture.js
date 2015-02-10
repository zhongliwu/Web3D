/**
 *@fileoverview This file defines the texture operation of the application
 * We define cubemap texture in Skybox.js, this file only contains TEXTURE_2D operation
 */



function Texture()
{
    this.src = undefined;
    this.image = new Image();
    this.texture = undefined;
}

Texture.prototype.handleLoadedTexture = function()
{
    gl.bindTexture( gl.TEXTURE_2D, this.texture );
    gl.pixelStorei( gl.UNPACK_FLIP_Y_WEBGL, true );
    gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.image );

    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST );
    gl.generateMipmap( gl.TEXTURE_2D );

    gl.bindTexture( gl.TEXTURE_2D, null );

    if( !gl.isTexture( this.texture ) )
    {
        alert( "TEXTURE_ERROR: Texture is invalid." );
    }
};

Texture.prototype.loadTexture = function( url )
{
    this.texture = gl.createTexture();
    this.src = url;
    this.image = document.getElementById( url );
    this.handleLoadedTexture();
};

Texture.prototype.useTexture = function( currentPosition )
{
    gl.activeTexture( gl.TEXTURE0 );
    gl.bindTexture( gl.TEXTURE_2D, this.texture );
    gl.uniform1i( currentPosition, 0 );
};