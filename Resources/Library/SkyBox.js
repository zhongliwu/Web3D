/**
 * @fileoverview  This file defines Skybox of the scene
 * The skybox is actually a cube encompasses the scene
 * In our program, we define the cube in the range of [-6, 6] at every axis
 */



function SkyBox()
{
    this.cubeTexture = undefined;

    this.skyboxVertexBuffer = undefined;
    this.skyboxIndexBuffer = undefined;
    this.skyboxNormalBuffer = undefined;

    this.skyboxVertexItemSize = 0;
    this.skyboxVertexNumberOfItems = 0;
    this.skyboxIndexItemSize = 0;
    this.skyboxIndexNumberOfItems = 0;
    this.skyboxNormalItemSize = 0;
    this.skyboxNormalNumberOfItems = 0;
}

SkyBox.prototype.handleLoadedCubeMapTexture = function( target, url )
{
    var image = new Image();
    image = document.getElementById( url );
    gl.bindTexture( gl.TEXTURE_CUBE_MAP, this.cubeTexture );
    gl.texImage2D( target, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image );
    gl.bindTexture( gl.TEXTURE_CUBE_MAP, null );
};

SkyBox.prototype.loadSkyboxTexture = function()
{
    this.cubeTexture = gl.createTexture();

    gl.bindTexture( gl.TEXTURE_CUBE_MAP, this.cubeTexture );
    gl.texParameteri( gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR );
    gl.texParameteri( gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR );
    gl.texParameteri( gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE );
    gl.texParameteri( gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE );

    this.handleLoadedCubeMapTexture( gl.TEXTURE_CUBE_MAP_POSITIVE_X, "positive_x" );
    this.handleLoadedCubeMapTexture( gl.TEXTURE_CUBE_MAP_NEGATIVE_X, "negative_x" );
    this.handleLoadedCubeMapTexture( gl.TEXTURE_CUBE_MAP_POSITIVE_Y, "positive_y" );
    this.handleLoadedCubeMapTexture( gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, "negative_y" );
    this.handleLoadedCubeMapTexture( gl.TEXTURE_CUBE_MAP_POSITIVE_Z, "positive_z" );
    this.handleLoadedCubeMapTexture( gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, "negative_z" );
};

SkyBox.prototype.setupSkyboxModel = function()
{
    //Setup Skybox's vertex
    this.skyboxVertexBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, this.skyboxVertexBuffer );

    var skyboxVertex = [
       // Front face
        6.0,  6.0,  6.0, //v0
       -6.0,  6.0,  6.0, //v1
       -6.0, -6.0,  6.0, //v2
        6.0, -6.0,  6.0, //v3

       // Back face
        6.0,  6.0, -6.0, //v4
       -6.0,  6.0, -6.0, //v5
       -6.0, -6.0, -6.0, //v6
        6.0, -6.0, -6.0, //v7

       // Left face
       -6.0,  6.0,  6.0, //v8
       -6.0,  6.0, -6.0, //v9
       -6.0, -6.0, -6.0, //v10
       -6.0, -6.0,  6.0, //v11

       // Right face
        6.0,  6.0,  6.0, //v12
        6.0, -6.0,  6.0, //v13
        6.0, -6.0, -6.0, //v14
        6.0,  6.0, -6.0, //v15

       // Top face
        6.0,  6.0,  6.0, //v16
        6.0,  6.0, -6.0, //v17
       -6.0,  6.0, -6.0, //v18
       -6.0,  6.0,  6.0, //v19

       // Bottom face
        6.0, -6.0,  6.0, //v20
       -6.0, -6.0,  6.0, //v21
       -6.0, -6.0, -6.0, //v22
        6.0, -6.0, -6.0  //v23
    ];

    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( skyboxVertex ), gl.STATIC_DRAW );
    this.skyboxVertexItemSize = 3;
    this.skyboxVertexNumberOfItems = 24;



    //Setup Skybox's index
    this.skyboxIndexBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.skyboxIndexBuffer );

    var skyboxIndex = [
        0, 1, 2,		0, 2, 3,	//Front face
        4, 5, 6,		4, 6, 7,	//Back face
        8, 9, 10,		8, 10, 11,	//Left face
        12, 13, 14,		12, 14, 15,	//Right face
        16, 17, 18,		16, 18, 19,	//Top face
        20, 21, 22,		20, 22, 23 	//Bottom face
    ];

    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array( skyboxIndex ), gl.STATIC_DRAW );
    this.skyboxIndexItemSize = 1;
    this.skyboxIndexNumberOfItems = 36;



    //Setup skybox's normals
    this.skyboxNormalBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, this.skyboxNormalBuffer );

    var skyboxNormal = [
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
        0.0, -1.0, 0.0,
    ];
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( skyboxNormal ), gl.STATIC_DRAW );
    this.skyboxNormalItemSize = 3;
    this.skyboxNormalNumberOfItems = 24;
};

SkyBox.prototype.drawSkybox = function( vertexPosition, samplerPosition )
{
    gl.activeTexture( gl.TEXTURE3 );
    gl.bindTexture( gl.TEXTURE_CUBE_MAP, this.cubeTexture );
    gl.uniform1i( samplerPosition, 3 );

    gl.bindBuffer( gl.ARRAY_BUFFER, this.skyboxVertexBuffer );
    gl.enableVertexAttribArray( vertexPosition );
    gl.vertexAttribPointer( vertexPosition, this.skyboxVertexItemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.skyboxIndexBuffer );
    gl.drawElements( gl.TRIANGLES, this.skyboxIndexNumberOfItems, gl.UNSIGNED_SHORT, 0 );
};







function EnvironmentalSphere()
{
    this.envSphereVertexBuffer = undefined;
    this.envSphereNormalBuffer = undefined;
    this.envSphereTextureBuffer = undefined;
    this.envSphereIndexBuffer = undefined;

    this.envSphereVertexItemSize = 0;
    this.envSphereVertexNumberOfItems = 0;
    this.envSphereNormalItemSize = 0;
    this.envSphereNormalNumberOfItems = 0;
    this.envSphereTextureItemSize = 0;
    this.envSphereTextureNumberOfItems = 0;
    this.envSphereIndexItemSize = 0;
    this.envSphereIndexNumberOfItems = 0;
}

EnvironmentalSphere.prototype.setupEnvSphere = function()
{
    var latitudeBands = 30;
    var longitudeBands = 30;
    var radius = 1.45;

    var sphereVertex = [ ];
    var sphereIndices = [ ];
    var sphereNormal = [ ];
    var sphereTextureCoord = [ ];

    for( var i = 0; i <= latitudeBands; i++ ) {
        var y_intersection = i * Math.PI / latitudeBands;
        var sin_y = Math.sin( y_intersection );
        var cos_y = Math.cos( y_intersection );

        for( var j = 0; j <= longitudeBands; j++ ) {
            var x_intersection = j * 2 * Math.PI / longitudeBands;
            var sin_x = Math.sin( x_intersection );
            var cos_x = Math.cos( x_intersection );

            var x = sin_y * cos_x;
            var y = cos_y;
            var z = sin_y * sin_x;

            var u = 1 - ( j / longitudeBands );
            var v = 1 - ( i / latitudeBands );

            sphereNormal.push( x );
            sphereNormal.push( y );
            sphereNormal.push( z );

            sphereVertex.push( radius * x );
            sphereVertex.push( radius * y );
            sphereVertex.push( radius * z );

            sphereTextureCoord.push( u );
            sphereTextureCoord.push( v );
        }
    }

    for( var i = 0; i < latitudeBands; i++ ){
        for( var j = 0; j < longitudeBands; j++ ) {
            var firstPoint = ( i * ( longitudeBands + 1 ) ) + j;
            var secondPoint = firstPoint + 1;
            var thirdPoint = firstPoint + longitudeBands + 1;
            var forthPoint = thirdPoint + 1;

            sphereIndices.push( firstPoint );
            sphereIndices.push( secondPoint );
            sphereIndices.push( thirdPoint );

            sphereIndices.push( secondPoint );
            sphereIndices.push( forthPoint );
            sphereIndices.push( thirdPoint );
        }
    }

    this.envSphereVertexBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, this.envSphereVertexBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( sphereVertex ) , gl.STATIC_DRAW );
    this.envSphereVertexItemSize = 3;
    this.envSphereVertexNumberOfItems = sphereVertex.length / 3;

    this.envSphereNormalBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, this.envSphereNormalBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( sphereNormal ) , gl.STATIC_DRAW );
    this.envSphereNormalItemSize = 3;
    this.envSphereNormalNumberOfItems = sphereNormal.length / 3;

    this.envSphereTextureBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, this.envSphereTextureBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( sphereTextureCoord ) , gl.STATIC_DRAW );
    this.envSphereTextureItemSize = 2;
    this.envSphereTextureNumberOfItems = sphereTextureCoord.length / 2;

    this.envSphereIndexBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.envSphereIndexBuffer );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array( sphereIndices ) , gl.STATIC_DRAW );
    this.envSphereIndexItemSize = 1;
    this.envSphereIndexNumberOfItems = sphereIndices.length;
};

EnvironmentalSphere.prototype.drawEnvSphere = function( vertexPosition, normalPosition,
                                                        samplerPosition, texture )
{
    gl.activeTexture( gl.TEXTURE3 );
    gl.bindTexture( gl.TEXTURE_CUBE_MAP, texture );
    gl.uniform1i( samplerPosition, 3 );

    gl.bindBuffer( gl.ARRAY_BUFFER, this.envSphereVertexBuffer );
    gl.enableVertexAttribArray( vertexPosition );
    gl.vertexAttribPointer( vertexPosition, this.envSphereVertexItemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer( gl.ARRAY_BUFFER, this.envSphereNormalBuffer );
    gl.enableVertexAttribArray( normalPosition );
    gl.vertexAttribPointer( normalPosition, this.envSphereNormalItemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.envSphereIndexBuffer );
    gl.drawElements( gl.TRIANGLES, this.envSphereIndexNumberOfItems, gl.UNSIGNED_SHORT, 0);
};