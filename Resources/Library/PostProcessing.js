/**
 * @fileoverview This file defines functions to deal with post processing
 * The post processing is mainly used in the page "Model Showroom"
 */


function PostProcessing( canvas )
{
    this.framebuffer = undefined;
    this.width = canvas.width;
    this.height = canvas.height;

    this.vertexBuffer = undefined;
    this.textureBuffer = undefined;
    this.startTime = Date.now();

    this.setupGeometry();
    this.setupFrameBuffer( canvas.width, canvas.height );
}

PostProcessing.prototype.setupGeometry = function()
{
    var vertices = [
       -1.0, -1.0,
        1.0, -1.0,
       -1.0,  1.0,

       -1.0,  1.0,
        1.0, -1.0,
        1.0,  1.0
    ];

    var textureCoords = [
        0.0, 0.0,
        1.0, 0.0,
        0.0, 1.0,

        0.0, 1.0,
        1.0, 0.0,
        1.0, 1.0
    ];

    this.vertexBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, this.vertexBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertices ), gl.STATIC_DRAW );

    this.textureBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, this.textureBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( textureCoords ), gl.STATIC_DRAW );

    gl.bindBuffer(gl.ARRAY_BUFFER, null);
};


PostProcessing.prototype.setupFrameBuffer = function( width, height )
{
    this.framebuffer = new FrameBuffer( width, height );
    this.framebuffer.createFrameBuffer();
};


PostProcessing.prototype.drawImage = function( vertexPosition, texturePosition,
                                               uSamplerPosition, timePosition, textureInverse )
{
    gl.activeTexture( gl.TEXTURE5 );
    gl.bindTexture( gl.TEXTURE_2D, this.framebuffer.texture );
    gl.uniform1i( uSamplerPosition, 5 );

    gl.enableVertexAttribArray( vertexPosition );
    gl.bindBuffer( gl.ARRAY_BUFFER, this.vertexBuffer );
    gl.vertexAttribPointer( vertexPosition, 2, gl.FLOAT, false, 0, 0 );

    gl.enableVertexAttribArray( texturePosition );
    gl.bindBuffer( gl.ARRAY_BUFFER, this.textureBuffer );
    gl.vertexAttribPointer( texturePosition, 2, gl.FLOAT, false, 0, 0 );

    if( timePosition )
    {
        gl.uniform1f( timePosition, ( Date.now() - this.startTime )/1000.0 );
    }

    if( textureInverse )
    {
        gl.uniform2f( textureInverse, 1.0 / this.width, 1.0 / this.height );
    }

    gl.drawArrays( gl.TRIANGLES, 0, 6 );
};