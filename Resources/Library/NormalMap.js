/**
 * @fileoverview This file defines a normal map
 * As we implemented it in a cube, we also need to calculate vertex tangent
 */



function NormalMap()
{
    this.vertexBuffer = undefined;
    this.normalBuffer = undefined;
    this.textureBuffer = undefined;
    this.indexBuffer = undefined;
    this.tangentBuffer = undefined;

    this.colorTexture = undefined;
    this.normalTexture = undefined;

    this.vertexItemSize = 0;
    this.vertexNumberOfItems = 0;
    this.normalItemSize = 0;
    this.normalNumberOfItems = 0;
    this.textureItemSize = 0;
    this.textureNumberOfItems = 0;
    this.indexItemSize = 0;
    this.indexNumberOfItems = 0;
    this.tangentItemSize = 0;
    this.tangentNumberOfItems = 0;
}


NormalMap.prototype.setupTexture = function()
{
    this.colorTexture = new Texture();
    this.colorTexture.loadTexture( "mTexture1" );
    this.normalTexture = new Texture();
    this.normalTexture.loadTexture( "nTexture1" );
};


NormalMap.prototype.setupModel = function( sideLength )
{
    var vp = sideLength / 2;

    //Setup the vertex buffer
    this.vertexBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, this.vertexBuffer );

    var vertex = [
        // Front face
        vp,  vp,  vp, //v0
       -vp,  vp,  vp, //v1
       -vp, -vp,  vp, //v2
        vp, -vp,  vp, //v3

        // Back face
        vp,  vp, -vp, //v4
       -vp,  vp, -vp, //v5
       -vp, -vp, -vp, //v6
        vp, -vp, -vp, //v7

        // Left face
       -vp,  vp,  vp, //v8
       -vp,  vp, -vp, //v9
       -vp, -vp, -vp, //v10
       -vp, -vp,  vp, //v11

        // Right face
        vp,  vp,  vp, //v12
        vp, -vp,  vp, //v13
        vp, -vp, -vp, //v14
        vp,  vp, -vp, //v15

        // Top face
        vp,  vp,  vp, //v16
        vp,  vp, -vp, //v17
       -vp,  vp, -vp, //v18
       -vp,  vp,  vp, //v19

        // Bottom face
        vp, -vp,  vp, //v20
       -vp, -vp,  vp, //v21
       -vp, -vp, -vp, //v22
        vp, -vp, -vp  //v23
    ];

    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertex ), gl.STATIC_DRAW );
    this.vertexItemSize = 3;
    this.vertexNumberOfItems = 24;

    this.indexBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer );

    var index = [
        0, 1, 2,		0, 2, 3,	//Front face
        4, 5, 6,		4, 6, 7,	//Back face
        8, 9, 10,		8, 10, 11,	//Left face
        12, 13, 14,		12, 14, 15,	//Right face
        16, 17, 18,		16, 18, 19,	//Top face
        20, 21, 22,		20, 22, 23	//Bottom face
    ];

    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array( index ), gl.STATIC_DRAW );
    this.indexItemSize = 1;
    this.indexNumberOfItems = index.length;


    //Setup the cube's normals
    this.normalBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, this.normalBuffer );

    var normal = [
        //Front face
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,

        //Back face
        0.0, 0.0, -1.0,
        0.0, 0.0, -1.0,
        0.0, 0.0, -1.0,
        0.0, 0.0, -1.0,

        //Left face
        -1.0, 0.0, 0.0,
        -1.0, 0.0, 0.0,
        -1.0, 0.0, 0.0,
        -1.0, 0.0, 0.0,

        //Right face
        1.0, 0.0, 0.0,
        1.0, 0.0, 0.0,
        1.0, 0.0, 0.0,
        1.0, 0.0, 0.0,

        //Top face
        0.0, 1.0, 0.0,
        0.0, 1.0, 0.0,
        0.0, 1.0, 0.0,
        0.0, 1.0, 0.0,

        //Bottom face
        0.0, -1.0, 0.0,
        0.0, -1.0, 0.0,
        0.0, -1.0, 0.0,
        0.0, -1.0, 0.0
    ];
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( normal ), gl.STATIC_DRAW );
    this.normalItemSize = 3;
    this.normalNumberOfItems = 24;

    this.textureBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, this.textureBuffer );

    var texture = [
        //Front face
        1.0, 1.0,
        0.0, 1.0,
        0.0, 0.0,
        1.0, 0.0,

        //Back face
        1.0, 1.0,
        0.0, 1.0,
        0.0, 0.0,
        1.0, 0.0,

        //Left face
        1.0, 1.0,
        0.0, 1.0,
        0.0, 0.0,
        1.0, 0.0,

        //Right face
        1.0, 1.0,
        0.0, 1.0,
        0.0, 0.0,
        1.0, 0.0,

        //Top face
        1.0, 1.0,
        0.0, 1.0,
        0.0, 0.0,
        1.0, 0.0,

        //Bottom face
        1.0, 1.0,
        0.0, 1.0,
        0.0, 0.0,
        1.0, 0.0
    ];

    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( texture ), gl.STATIC_DRAW );
    this.textureItemSize = 2;
    this.textureNumberOfItems = 24;


    var tangent = [];
    tangent = Utilities.calculateTangents( vertex, texture, index );
    this.tangentBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.tangentBuffer );
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array( tangent ), gl.STATIC_DRAW);
    this.tangentItemSize = 3;
    this.tangentNumberOfItems = tangent.length / 3;
};

NormalMap.prototype.drawNormalMap = function( vertexPosition, normalPosition,
                                              textureCoordPosition, tangentPosition,
                                              colorSampler, normalSampler )
{
    gl.activeTexture( gl.TEXTURE1 );
    gl.bindTexture( gl.TEXTURE_2D, this.colorTexture.texture );
    gl.uniform1i( colorSampler, 1 );

    gl.activeTexture( gl.TEXTURE2 );
    gl.bindTexture( gl.TEXTURE_2D, this.normalTexture.texture );
    gl.uniform1i( normalSampler, 2 );


    gl.bindBuffer( gl.ARRAY_BUFFER, this.vertexBuffer );
    gl.enableVertexAttribArray( vertexPosition );
    gl.vertexAttribPointer( vertexPosition, this.vertexItemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer( gl.ARRAY_BUFFER, this.normalBuffer );
    gl.enableVertexAttribArray( normalPosition );
    gl.vertexAttribPointer( normalPosition, this.normalItemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer( gl.ARRAY_BUFFER, this.textureBuffer );
    gl.enableVertexAttribArray( textureCoordPosition );
    gl.vertexAttribPointer( textureCoordPosition, this.textureItemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer( gl.ARRAY_BUFFER, this.tangentBuffer );
    gl.enableVertexAttribArray( tangentPosition );
    gl.vertexAttribPointer( tangentPosition, this.tangentItemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer );
    gl.drawElements( gl.TRIANGLES, this.indexNumberOfItems, gl.UNSIGNED_SHORT, 0 );
};