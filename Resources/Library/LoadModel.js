/**
 * @fileoverview This file defines functions to handle jSon models.
 */


function LoadJson()
{
    this.jSon = undefined;

    this.vertex = [];
    this.normal = [];
    this.textureCoord = [];
    this.index = [];

    this.modelVertexBuffer = undefined;
    this.modelNormalBuffer = undefined;
    this.modelTextureBuffer = undefined;
    this.modelIndexBuffer = undefined;

    this.vertexItemSize = 0;
    this.vertexNumberOfItems = 0;
    this.normalItemSize = 0;
    this.normalNumberOfItems = 0;
    this.textureItemSize = 0;
    this.textureNumberOfItems = 0;
    this.indexItemSize = 0;
    this.indexNumberOfItems = 0;
}

LoadJson.prototype.loadJSONFromServer = function( modelName )
{
    var JSONData = [3];
    var filename = "./Resources/Media/Model/" + modelName;

    $.ajax
    (
        {
            async: false,
            url : filename,
            dateType: 'xml',
            success: function( data )
            {
                $( data ).find( "vertex" ).each
                (
                    function( )
                    {
                        JSONData[0] = $( this ).text();
                    }
                );

                $( data ).find( "normal" ).each
                (
                    function( )
                    {
                        JSONData[1] = $( this ).text();
                    }
                );

                $( data ).find( "index" ).each
                (
                    function( )
                    {
                        JSONData[2] = $( this ).text();
                    }
                );
            },

            error: function( data )
            {
                alert( "ERROR_JSON: Failed to load json model: " + modelName );
            }
        }
    );

    return JSONData;
};

LoadJson.prototype.initializeJSONModel = function( modelName )
{
    var dataScript = this.loadJSONFromServer( modelName );
    this.vertex = dataScript[0].split( "," );
    this.normal = dataScript[1].split( "," );
    this.index = dataScript[2].split( "," );

    this.modelVertexBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, this.modelVertexBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( this.vertex ), gl.STATIC_DRAW );
    this.vertexItemSize = 3;
    this.vertexNumberOfItems = this.vertex.length / 3;

    this.modelNormalBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, this.modelNormalBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( this.normal ), gl.STATIC_DRAW );
    this.normalItemSize = 3;
    this.normalNumberOfItems = this.normal.length / 3;

    this.modelIndexBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.modelIndexBuffer );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array( this.index ), gl.STATIC_DRAW );
    this.indexItemSize = 1;
    this.indexNumberOfItems = this.index.length;
};

LoadJson.prototype.drawModel = function( vertexPosition, normalPosition,
                                         colorPosition, texturePosition,
                                         boolPosition, r, g, b, a)
{
    gl.uniform1i( boolPosition, false );

    gl.bindBuffer( gl.ARRAY_BUFFER, this.modelVertexBuffer );
    gl.enableVertexAttribArray( vertexPosition );
    gl.vertexAttribPointer( vertexPosition, this.vertexItemSize, gl.FLOAT, false, 0, 0 );

    gl.bindBuffer( gl.ARRAY_BUFFER, this.modelNormalBuffer );
    gl.enableVertexAttribArray( normalPosition );
    gl.vertexAttribPointer( normalPosition, this.normalItemSize, gl.FLOAT, false, 0, 0 );

    gl.disableVertexAttribArray( colorPosition );
    gl.vertexAttrib4f( colorPosition, r, g, b, a );
    gl.disableVertexAttribArray( texturePosition );

    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.modelIndexBuffer );
    gl.drawElements( gl.TRIANGLES, this.indexNumberOfItems, gl.UNSIGNED_SHORT, 0 );
};