/**
 * @fileoverview This file defines FrameBuffer class which can deal with post processing, etc.
 */



function FrameBuffer( height, width )
{
    this.framebuffer = undefined;
    this.renderbuffer = undefined;
    this.texture = undefined;
    this.width = 0.0;
    this.height = 0.0;

    this.setSize( height, width );
}

FrameBuffer.prototype.setSize = function( width, height )
{
    this.width = width;
    this.height = height;
};

FrameBuffer.prototype.createFrameBuffer = function()
{
    var f_width = this.width;
    var f_height = this.height;

    this.texture = gl.createTexture();
    gl.bindTexture( gl.TEXTURE_2D, this.texture );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE );
    gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, f_width, f_height, 0, gl.RGBA,
        gl.UNSIGNED_BYTE, null );

    this.renderbuffer = gl.createRenderbuffer();
    gl.bindRenderbuffer( gl.RENDERBUFFER, this.renderbuffer );
    gl.renderbufferStorage( gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.width, this.height );

    this.framebuffer = gl.createFramebuffer();
    gl.bindFramebuffer( gl.FRAMEBUFFER, this.framebuffer );
    gl.framebufferTexture2D( gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture ,0 );
    gl.framebufferRenderbuffer( gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER,
        this.renderbuffer );

    var status = gl.checkFramebufferStatus( gl.FRAMEBUFFER );
    if ( status != gl.FRAMEBUFFER_COMPLETE && !gl.isContextLost() )
    {
        alert( "ERROR_FRAME: gl.checkFramebufferStatus() returned " );
    }

    gl.bindTexture( gl.TEXTURE_2D, null );
    gl.bindRenderbuffer( gl.RENDERBUFFER, null );
    gl.bindFramebuffer( gl.FRAMEBUFFER, null );
};


FrameBuffer.prototype.bind = function()
{
    gl.bindFramebuffer( gl.FRAMEBUFFER, this.framebuffer );
    //gl.viewport( 0, 0, this.width, this.height );
};

FrameBuffer.prototype.unbind = function()
{
    gl.bindFramebuffer( gl.FRAMEBUFFER, null );
};

FrameBuffer.prototype.recoverFromLostContext = function()
{
    this.createFrameBuffer();
};