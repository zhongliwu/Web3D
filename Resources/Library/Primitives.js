/**
 * @fileoverview  This file contains all the primitive buffers rendered in the scene
 * All the primitives are set with the following:
 * Vertex position, Vertex normal, Texture coordinates and Vertex index
 */







function setupCubeBuffer( sideLength)
{
    var vp = sideLength / 2;

    //Setup the cube vertice's buffer
    glBuffer.cubeVertexBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, glBuffer.cubeVertexBuffer );

    var cubeVertex = [
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

    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( cubeVertex ), gl.STATIC_DRAW );
    glNumber.CUBE_VERTEX_ITEM_SIZE = 3;
    glNumber.CUBE_VERTEX_NUMBER_OF_ITEMS = 24;

    glBuffer.cubeIndicesBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, glBuffer.cubeIndicesBuffer );

    var cubeIndices = [
        0, 1, 2,		0, 2, 3,	//Front face
        4, 5, 6,		4, 6, 7,	//Back face
        8, 9, 10,		8, 10, 11,	//Left face
        12, 13, 14,		12, 14, 15,	//Right face
        16, 17, 18,		16, 18, 19,	//Top face
        20, 21, 22,		20, 22, 23	//Bottom face
    ];

    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array( cubeIndices ), gl.STATIC_DRAW );
    glNumber.CUBE_INDICES_ITEM_SIZE = 1;
    glNumber.CUBE_INDICES_NUMBER_OF_ITEMS = cubeIndices.length;


    //Setup the cube's normals
    glBuffer.cubeNormalBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, glBuffer.cubeNormalBuffer );

    var cubeNormals = [
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
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( cubeNormals ), gl.STATIC_DRAW );
    glNumber.CUBE_NORMAL_ITEM_SIZE = 3;
    glNumber.CUBE_NORMAL_NUMBER_OF_ITEMS = 24;

    glBuffer.cubeTextureBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, glBuffer.cubeTextureBuffer );

    var cubeTextureCoord = [
        //Front face
        1.0, 1.0,
        0.0, 1.0,
        0.0, 0.0,
        1.0, 0.0,

        //Back face
        0.0, 1.0,
        1.0, 1.0,
        1.0, 0.0,
        0.0, 0.0,

        //Left face
        1.0, 1.0,
        0.0, 1.0,
        0.0, 0.0,
        1.0, 0.0,

        //Right face
        0.0, 1.0,
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,

        //Top face
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        0.0, 0.0,

        //Bottom face
        1.0, 1.0,
        0.0, 1.0,
        0.0, 0.0,
        1.0, 0.0
    ];

    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( cubeTextureCoord ), gl.STATIC_DRAW );
    glNumber.CUBE_TEXTURE_ITEM_SIZE = 2;
    glNumber.CUBE_TEXTURE_NUMBER_OF_ITEMS = 24;
}


function drawCube_texture( vertexPosition, normalPosition, colorPosition,
                           textureCoordPosition, boolPosition )
{
    gl.uniform1i( boolPosition, true );

    gl.bindBuffer( gl.ARRAY_BUFFER, glBuffer.cubeVertexBuffer );
    gl.enableVertexAttribArray( vertexPosition );
    gl.vertexAttribPointer( vertexPosition, glNumber.CUBE_VERTEX_ITEM_SIZE,
        gl.FLOAT, false, 0, 0);

    gl.bindBuffer( gl.ARRAY_BUFFER, glBuffer.cubeNormalBuffer );
    gl.enableVertexAttribArray( normalPosition );
    gl.vertexAttribPointer( normalPosition, glNumber.CUBE_NORMAL_ITEM_SIZE,
        gl.FLOAT, false, 0, 0);

    gl.bindBuffer( gl.ARRAY_BUFFER, glBuffer.cubeTextureBuffer );
    gl.enableVertexAttribArray( textureCoordPosition );
    gl.vertexAttribPointer( textureCoordPosition, glNumber.CUBE_TEXTURE_ITEM_SIZE,
        gl.FLOAT, false, 0, 0);

    gl.disableVertexAttribArray( colorPosition );

    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, glBuffer.cubeIndicesBuffer );
    gl.drawElements( gl.TRIANGLES, glNumber.CUBE_INDICES_NUMBER_OF_ITEMS, gl.UNSIGNED_SHORT, 0 );
}


function drawCube_color( vertexPosition, normalPosition, colorPosition, texturePosition,
                         boolPosition, r, g, b, a )
{
    gl.uniform1i( boolPosition, false );

    gl.bindBuffer( gl.ARRAY_BUFFER, glBuffer.cubeVertexBuffer );
    gl.enableVertexAttribArray( vertexPosition );
    gl.vertexAttribPointer( vertexPosition, glNumber.CUBE_VERTEX_ITEM_SIZE,
        gl.FLOAT, false, 0, 0);

    gl.bindBuffer( gl.ARRAY_BUFFER, glBuffer.cubeNormalBuffer );
    gl.enableVertexAttribArray( normalPosition );
    gl.vertexAttribPointer( normalPosition, glNumber.CUBE_NORMAL_ITEM_SIZE,
        gl.FLOAT, false, 0, 0);

    gl.disableVertexAttribArray( colorPosition );
    gl.vertexAttrib4f( colorPosition, r, g, b, a );
    gl.disableVertexAttribArray( texturePosition );

    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, glBuffer.cubeIndicesBuffer );
    gl.drawElements( gl.TRIANGLES, glNumber.CUBE_INDICES_NUMBER_OF_ITEMS, gl.UNSIGNED_SHORT, 0 );
}







function setupPyramidBuffer( )
{
    glBuffer.pyramidVertexBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, glBuffer.pyramidVertexBuffer );
    
    var pyramidVertexBuffer = [
        0.0,  0.8,  0.0,    //v0
       -0.8, -0.8,  0.8,    //v1
        0.8, -0.8,  0.8,    //v2
        
        0.0,  0.8,  0.0,    //v3
       -0.8, -0.8, -0.8,    //v4
       -0.8, -0.8,  0.8,    //v5
        
        0.0,  0.8,  0.0,    //v6
        0.8, -0.8, -0.8,    //v7
       -0.8, -0.8, -0.8,    //v8
        
        0.0,  0.8,  0.0,    //v9
        0.8, -0.8,  0.8,    //v10
        0.8, -0.8, -0.8,    //v11

        0.8, -0.8,  0.8,    //v12
       -0.8, -0.8,  0.8,    //v13
       -0.8, -0.8, -0.8,    //v14
        0.8, -0.8, -0.8     //v15
    ];
    
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( pyramidVertexBuffer ) , gl.STATIC_DRAW );
    glNumber.PYRAMID_VERTEX_POSITION_ITEM_SIZE = 3;
    glNumber.PYRAMID_VERTEX_POSITION_NUMBER_OF_ITEMS = 16;
    
    
    
    glBuffer.pyramidNormalBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, glBuffer.pyramidNormalBuffer );
    
    var pyramidNormals = [
        //Front face
        0.0, 1.0, 2.0, 
        0.0, 1.0, 2.0, 
        0.0, 1.0, 2.0,
        
        //Left face
        -2.0, 1.0, 0.0, 
        -2.0, 1.0, 0.0, 
        -2.0, 1.0, 0.0, 
        
        //Back face
        0.0, 1.0, -2.0,
        0.0, 1.0, -2.0, 
        0.0, 1.0, -2.0, 
        
        //Right face
        2.0, 1.0, 0.0, 
        2.0, 1.0, 0.0, 
        2.0, 1.0, 0.0, 
        
        //Bottom face
        0.0, -1.0, 0.0, 
        0.0, -1.0, 0.0, 
        0.0, -1.0, 0.0, 
        0.0, -1.0, 0.0,
    ];
    
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( pyramidNormals ), gl.STATIC_DRAW );
    glNumber.PYRAMID_NORMAL_ITEM_SIZE = 3;
    glNumber.PYRAMID_NORMAL_NUMBER_OF_ITEMS = 16;
    
    
    
    glBuffer.pyramidTextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, glBuffer.pyramidTextureCoordBuffer );
    
    var pyramidTextureCoord = [
       0.5, 1.0, 
       0.0, 0.0, 
       1.0, 0.0, 
       
       0.5, 1.0, 
       0.0, 0.0, 
       1.0, 0.0, 
       
       0.5, 1.0, 
       0.0, 0.0, 
       1.0, 0.0, 
       
       0.5, 1.0, 
       0.0, 0.0, 
       1.0, 0.0, 
       
       1.0, 1.0, 
       0.0, 1.0, 
       0.0, 0.0, 
       1.0, 0.0,
    ];
    
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( pyramidTextureCoord ), gl.STATIC_DRAW );
    glNumber.PYRAMID_TEXTURE_ITEM_SIZE = 2;
    glNumber.PYRAMID_TEXTURE_NUMBER_OF_ITEMS = 16;
    
    
    
    glBuffer.pyramidIndicesBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, glBuffer.pyramidIndicesBuffer );
    
    var pyramidIndices = [
        0, 1, 2,
        3, 4, 5, 
        6, 7, 8, 
        9, 10, 11, 
        12, 13, 14,  12, 14, 15, 
    ];
    
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array( pyramidIndices ), gl.STATIC_DRAW );
    glNumber.PYRAMID_INDICES_ITEM_SIZE = 1;
    glNumber.PYRAMID_INDICES_NUMBER_OF_ITEMS = 18;
}


function drawPyramid_texture( vertexPosition, normalPosition, colorPosition,
                              textureCoordPosition, boolPosition )
{
    gl.uniform1i( boolPosition, true );

    gl.bindBuffer( gl.ARRAY_BUFFER, glBuffer.pyramidVertexBuffer );
    gl.enableVertexAttribArray( vertexPosition );
    gl.vertexAttribPointer( vertexPosition, glNumber.PYRAMID_VERTEX_POSITION_ITEM_SIZE,
        gl.FLOAT, false, 0, 0);

    gl.bindBuffer( gl.ARRAY_BUFFER, glBuffer.pyramidNormalBuffer );
    gl.enableVertexAttribArray( normalPosition );
    gl.vertexAttribPointer( normalPosition, glNumber.PYRAMID_NORMAL_ITEM_SIZE,
        gl.FLOAT, false, 0, 0);

    gl.bindBuffer( gl.ARRAY_BUFFER, glBuffer.pyramidTextureCoordBuffer );
    gl.enableVertexAttribArray( textureCoordPosition );
    gl.vertexAttribPointer( textureCoordPosition, glNumber.PYRAMID_TEXTURE_ITEM_SIZE,
        gl.FLOAT, false, 0, 0);
    gl.disableVertexAttribArray( colorPosition );

    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, glBuffer.pyramidIndicesBuffer );
    gl.drawElements( gl.TRIANGLES, glNumber.PYRAMID_INDICES_NUMBER_OF_ITEMS, gl.UNSIGNED_SHORT, 0);
}


function drawPyramid_color( vertexPosition, normalPosition, colorPosition, texturePosition,
                            boolPosition, r, g, b, a )
{
    gl.uniform1i( boolPosition, false );

    gl.bindBuffer( gl.ARRAY_BUFFER, glBuffer.pyramidVertexBuffer );
    gl.enableVertexAttribArray( vertexPosition );
    gl.vertexAttribPointer( vertexPosition, glNumber.PYRAMID_VERTEX_POSITION_ITEM_SIZE,
        gl.FLOAT, false, 0, 0);

    gl.bindBuffer( gl.ARRAY_BUFFER, glBuffer.pyramidNormalBuffer );
    gl.enableVertexAttribArray( normalPosition );
    gl.vertexAttribPointer( normalPosition, glNumber.PYRAMID_NORMAL_ITEM_SIZE,
        gl.FLOAT, false, 0, 0);

    gl.disableVertexAttribArray( colorPosition );
    gl.vertexAttrib4f( colorPosition, r, g, b, a );
    gl.disableVertexAttribArray( texturePosition );

    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, glBuffer.pyramidIndicesBuffer );
    gl.drawElements( gl.TRIANGLES, glNumber.PYRAMID_INDICES_NUMBER_OF_ITEMS, gl.UNSIGNED_SHORT, 0 );
}







function setupCylinderBuffer( r, l )
{
    var radius = r;
    var length = l;
    var density = 50;
    
    var cylinderVertex = [ ];
    var cylinderIndex = [ ];
    var cylinderNormal = [ ];
    var cylinderTextureCoord = [ ];
    
    cylinderVertex.push( 0 );
    cylinderVertex.push( length / 2 );
    cylinderVertex.push( 0 );
    
    cylinderNormal.push( 0 );
    cylinderNormal.push( 1.0 );
    cylinderNormal.push( 0 );
    
    cylinderTextureCoord.push( 0.5 );
    cylinderTextureCoord.push( 0.5 );
    
    
    cylinderVertex.push( 0 );
    cylinderVertex.push( -length / 2 );
    cylinderVertex.push( 0 );
    
    cylinderNormal.push( 0 );
    cylinderNormal.push( -1.0 );
    cylinderNormal.push( 0 );
    
    cylinderTextureCoord.push( 0.5 );
    cylinderTextureCoord.push( 0.5 );
    
    for( var i = 0; i <= density; i++ ) {
        var x_intersection = i * 2 * Math.PI / density;
        var sin_x = Math.sin( x_intersection );
        var cos_x = Math.cos( x_intersection );
        
        x = radius * cos_x;
        y = length / 2;
        z = radius * sin_x;
        
        u = 0.5 - 0.5 * sin_x;
        v = 0.5 - 0.5 * cos_x;
        
        cylinderVertex.push( x );
        cylinderVertex.push( y );
        cylinderVertex.push( z );
        
        cylinderNormal.push( 0.0 );
        cylinderNormal.push( 1.0 );
        cylinderNormal.push( 0.0 );
        
        cylinderTextureCoord.push( u );
        cylinderTextureCoord.push( v );
    }
    
    for( var i = 0; i <= density; i++ ) {
        var x_intersection = i * 2 * Math.PI / density;
        var sin_x = Math.sin( x_intersection )
        var cos_x = Math.cos( x_intersection );
        
        x = radius * cos_x;
        y = -length / 2;
        z = radius * sin_x;
        
        u = 0.5 + 0.5 * cos_x;
        v = 0.5 + 0.5 * sin_x;
        
        cylinderVertex.push( x );
        cylinderVertex.push( y );
        cylinderVertex.push( z );
        
        cylinderNormal.push( 0.0 );
        cylinderNormal.push( -1.0 );
        cylinderNormal.push( 0.0 );
        
        cylinderTextureCoord.push( u );
        cylinderTextureCoord.push( v );
    }
    
    for( var i = 0; i <= density; i++ ) {
        var x_intersection = i * 2 * Math.PI / density;
        var sin_x = Math.sin( x_intersection )
        var cos_x = Math.cos( x_intersection );
        
        x = radius * cos_x;
        y = length / 2;
        z = radius * sin_x;
        
        u = i / density;
        v = 1.0;
        
        cylinderVertex.push( x );
        cylinderVertex.push( y );
        cylinderVertex.push( z );
        
        cylinderNormal.push( x );
        cylinderNormal.push( y );
        cylinderNormal.push( z );
        
        cylinderTextureCoord.push( 1 - u );
        cylinderTextureCoord.push( v );
    }
    
    for( var i = 0; i <= density; i++ ) {
        var x_intersection = i * 2 * Math.PI / density;
        var sin_x = Math.sin( x_intersection )
        var cos_x = Math.cos( x_intersection );
        
        x = radius * cos_x;
        y = -length / 2;
        z = radius * sin_x;
        
        u = i / density;
        v = 0.0;
        
        cylinderVertex.push( x );
        cylinderVertex.push( y );
        cylinderVertex.push( z );
        
        cylinderNormal.push( x );
        cylinderNormal.push( y );
        cylinderNormal.push( z );
        
        cylinderTextureCoord.push( 1 - u );
        cylinderTextureCoord.push( v );
    }
    
    for( var i = 0; i < density; i++ ) {
        var firstPoint = i + 2;
        var secondPoint = firstPoint + 1;
        
        cylinderIndex.push( 0 );
        cylinderIndex.push( secondPoint );
        cylinderIndex.push( firstPoint );
    }
    
    for( var i = 0; i < density; i++ ) {
        var firstPoint = i + 2 + ( density + 1 );
        var secondPoint = firstPoint + 1;
        
        cylinderIndex.push( 1 );
        cylinderIndex.push( firstPoint );
        cylinderIndex.push( secondPoint );
    }
    
    for( var i = 0; i < density; i++ ) {
        var firstPoint = i + 2 + 2 * ( density + 1 );
        var secondPoint = firstPoint + 1;
        var thirdPoint = firstPoint + ( density + 1 );
        var forthPoint = thirdPoint + 1;
        
        cylinderIndex.push( firstPoint );
        cylinderIndex.push( secondPoint );
        cylinderIndex.push( thirdPoint );
        
        cylinderIndex.push( secondPoint );
        cylinderIndex.push( forthPoint );
        cylinderIndex.push( thirdPoint );
    }
    
    glBuffer.cylinderVertexbuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, glBuffer.cylinderVertexbuffer );
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( cylinderVertex ), gl.STATIC_DRAW );
    glNumber.CYLINDER_VERTEX_ITEM_SIZE = 3;
    glNumber.CYLINDER_VERTEX_NUMBER_OF_ITEMS = cylinderVertex.length / 3;
    
    glBuffer.cylinderNormalbuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, glBuffer.cylinderNormalbuffer );
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( cylinderNormal ), gl.STATIC_DRAW );
    glNumber.CYLINDER_NORMAL_ITEM_SIZE = 3;
    glNumber.CYLINDER_NORMAL_NUMBER_OF_ITEMS = cylinderNormal.length / 3;
    
    glBuffer.cylinderIndexbuffer = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, glBuffer.cylinderIndexbuffer );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array( cylinderIndex ), gl.STATIC_DRAW );
    glNumber.CYLINDER_INDEX_ITEM_SIZE = 1;
    glNumber.CYLINDER_INDEX_NUMBER_OF_ITEMS = cylinderIndex.length;
    
    glBuffer.cylinderTexturebuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, glBuffer.cylinderTexturebuffer );
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( cylinderTextureCoord ), gl.STATIC_DRAW );
    glNumber.CYLINDER_TEXTURE_ITEM_SIZE = 2;
    glNumber.CYLINDER_TEXTURE_NUMBER_OF_ITEMS = cylinderTextureCoord.length / 2;
}


function drawCylinder_texture( vertexPosition, normalPosition, colorPosition,
                               textureCoordPosition, boolPosition )
{
    gl.uniform1i( boolPosition, true );

    gl.bindBuffer( gl.ARRAY_BUFFER, glBuffer.cylinderVertexbuffer );
    gl.enableVertexAttribArray( vertexPosition );
    gl.vertexAttribPointer( vertexPosition, glNumber.CYLINDER_VERTEX_ITEM_SIZE,
        gl.FLOAT, false, 0, 0 );

    gl.bindBuffer( gl.ARRAY_BUFFER, glBuffer.cylinderNormalbuffer );
    gl.enableVertexAttribArray( normalPosition );
    gl.vertexAttribPointer( normalPosition, glNumber.CYLINDER_NORMAL_ITEM_SIZE,
        gl.FLOAT, false, 0, 0 );

    gl.bindBuffer( gl.ARRAY_BUFFER, glBuffer.cylinderTexturebuffer );
    gl.enableVertexAttribArray( textureCoordPosition );
    gl.vertexAttribPointer( textureCoordPosition, glNumber.CYLINDER_TEXTURE_ITEM_SIZE,
        gl.FLOAT, false, 0, 0 );

    gl.disableVertexAttribArray( colorPosition );

    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, glBuffer.cylinderIndexbuffer );
    gl.drawElements( gl.TRIANGLES, glNumber.CYLINDER_INDEX_NUMBER_OF_ITEMS, gl.UNSIGNED_SHORT, 0 );
}


function drawCylinder_color( vertexPosition, normalPosition, colorPosition, texturePosition,
                             boolPosition, r, g, b, a )
{
    gl.uniform1i( boolPosition, false );

    gl.bindBuffer( gl.ARRAY_BUFFER, glBuffer.cylinderVertexbuffer );
    gl.enableVertexAttribArray( vertexPosition );
    gl.vertexAttribPointer( vertexPosition, glNumber.CYLINDER_VERTEX_ITEM_SIZE,
        gl.FLOAT, false, 0, 0 );

    gl.bindBuffer( gl.ARRAY_BUFFER, glBuffer.cylinderNormalbuffer );
    gl.enableVertexAttribArray( normalPosition );
    gl.vertexAttribPointer( normalPosition, glNumber.CYLINDER_NORMAL_ITEM_SIZE,
        gl.FLOAT, false, 0, 0 );

    gl.disableVertexAttribArray( colorPosition );
    gl.vertexAttrib4f( colorPosition, r, g, b, a );
    gl.disableVertexAttribArray( texturePosition );

    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, glBuffer.cylinderIndexbuffer );
    gl.drawElements( gl.TRIANGLES, glNumber.CYLINDER_INDEX_NUMBER_OF_ITEMS, gl.UNSIGNED_SHORT, 0 );
}







function setupSphereBuffer( r )
{
    var latitudeBands = 30;
    var longitudeBands = 30;
    var radius = r;
    
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
    
    glBuffer.sphereVertexBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, glBuffer.sphereVertexBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( sphereVertex ) , gl.STATIC_DRAW );
    glNumber.SPHERE_VERTEX_ITEM_SIZE = 3;
    glNumber.SPHERE_VERTEX_NUMBER_OF_ITEMS = sphereVertex.length / 3;
    
    glBuffer.sphereNormalBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, glBuffer.sphereNormalBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( sphereNormal ) , gl.STATIC_DRAW );
    glNumber.SPHERE_NORMAL_ITEM_SIZE = 3;
    glNumber.SPHERE_NORMAL_NUMBER_OF_ITEMS = sphereNormal.length / 3;
    
    glBuffer.sphereTextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, glBuffer.sphereTextureCoordBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( sphereTextureCoord ) , gl.STATIC_DRAW );
    glNumber.SPHERE_TEXTURE_ITEM_SIZE = 2;
    glNumber.SPHERE_TEXTURE_NUMBER_OF_ITEMS = sphereTextureCoord.length / 2;
    
    glBuffer.sphereIndicesBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, glBuffer.sphereIndicesBuffer );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array( sphereIndices ) , gl.STATIC_DRAW );
    glNumber.SPHERE_INDICES_ITEM_SIZE = 1;
    glNumber.SPHERE_INDICES_NUMBER_OF_ITEMS = sphereIndices.length;
}


function drawSphere_texture( vertexPosition, normalPosition, colorPosition,
                             textureCoordPosition, boolPosition  )
{
    gl.uniform1i( boolPosition, true );

    gl.bindBuffer( gl.ARRAY_BUFFER, glBuffer.sphereVertexBuffer );
    gl.enableVertexAttribArray( vertexPosition );
    gl.vertexAttribPointer( vertexPosition, glNumber.SPHERE_VERTEX_ITEM_SIZE,
        gl.FLOAT, false, 0, 0);

    gl.bindBuffer( gl.ARRAY_BUFFER, glBuffer.sphereNormalBuffer );
    gl.enableVertexAttribArray( normalPosition );
    gl.vertexAttribPointer( normalPosition, glNumber.SPHERE_NORMAL_ITEM_SIZE,
        gl.FLOAT, false, 0, 0);

    gl.bindBuffer( gl.ARRAY_BUFFER, glBuffer.sphereTextureCoordBuffer );
    gl.enableVertexAttribArray( textureCoordPosition );
    gl.vertexAttribPointer( textureCoordPosition, glNumber.SPHERE_TEXTURE_ITEM_SIZE,
        gl.FLOAT, false, 0, 0);

    gl.disableVertexAttribArray( colorPosition );

    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, glBuffer.sphereIndicesBuffer );
    gl.drawElements( gl.TRIANGLES, glNumber.SPHERE_INDICES_NUMBER_OF_ITEMS, gl.UNSIGNED_SHORT, 0);
}


function drawSphere_color( vertexPosition, normalPosition, colorPosition, texturePosition,
                           boolPosition, r, g, b, a )
{
    gl.uniform1i( boolPosition, false );

    gl.bindBuffer( gl.ARRAY_BUFFER, glBuffer.sphereVertexBuffer );
    gl.enableVertexAttribArray( vertexPosition );
    gl.vertexAttribPointer( vertexPosition, glNumber.SPHERE_VERTEX_ITEM_SIZE,
        gl.FLOAT, false, 0, 0);

    gl.bindBuffer( gl.ARRAY_BUFFER, glBuffer.sphereNormalBuffer );
    gl.enableVertexAttribArray( normalPosition );
    gl.vertexAttribPointer( normalPosition, glNumber.SPHERE_NORMAL_ITEM_SIZE,
        gl.FLOAT, false, 0, 0);

    gl.disableVertexAttribArray( colorPosition );
    gl.disableVertexAttribArray( texturePosition );
    gl.vertexAttrib4f( colorPosition, r, g, b, a );

    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, glBuffer.sphereIndicesBuffer );
    gl.drawElements( gl.TRIANGLES, glNumber.SPHERE_INDICES_NUMBER_OF_ITEMS, gl.UNSIGNED_SHORT, 0);
}







function setupTorusBuffer( inn, tube )
{
    var innerRadius = inn;
    var tubeRadius = tube;
    var ringNumber = 30;
    var latitudeNumber = 18;

    var torusVertex = [ ];
    var torusIndex = [ ];
    var torusNormal = [ ];
    var torusTextureCoord = [ ];

    for( var iteratorInLatitude = 0; iteratorInLatitude <= latitudeNumber; iteratorInLatitude++ )
    {
        var xz_intersection = iteratorInLatitude * 2 * Math.PI / latitudeNumber + Math.PI;
        sin_xz = Math.sin( xz_intersection );
        cos_xz = Math.cos( xz_intersection );
        var distanceFromOrigin = innerRadius + tubeRadius * ( 1 + cos_xz );
        var v = iteratorInLatitude * 3.0 * 1.0 / latitudeNumber;

        for( var iteratorInRings = 0; iteratorInRings <= ringNumber; iteratorInRings++ )
        {
            var xy_intersection = iteratorInRings * 2 * Math.PI / ringNumber;
            sin_xy = Math.sin( xy_intersection );
            cos_xy = Math.cos( xy_intersection );

            x = cos_xy * distanceFromOrigin;
            y = sin_xz * tubeRadius;
            z = sin_xy * distanceFromOrigin;

            normal_x = cos_xy * cos_xz;
            normal_y = sin_xz;
            normal_z = sin_xy * cos_xz;

            var u = 1 - iteratorInRings * 5.0 * 1.0 / ringNumber;

            torusVertex.push( x );
            torusVertex.push( y );
            torusVertex.push( z );

            torusNormal.push( normal_x );
            torusNormal.push( normal_y );
            torusNormal.push( normal_z );

            torusTextureCoord.push( u );
            torusTextureCoord.push( v );
        }
    }

    for( var iteratorInLatitude = 0; iteratorInLatitude < latitudeNumber; iteratorInLatitude++ )
    {
        for( var iteratorInRings = 0; iteratorInRings < ringNumber; iteratorInRings++ )
        {
            var firstPoint = ( iteratorInLatitude * ( ringNumber + 1 ) ) + iteratorInRings;
            var secondPoint = firstPoint + 1;
            var thirdPoint = firstPoint + ringNumber + 1;
            var forthPoint = thirdPoint + 1;

            torusIndex.push( firstPoint );
            torusIndex.push( thirdPoint );
            torusIndex.push( secondPoint );

            torusIndex.push( secondPoint );
            torusIndex.push( thirdPoint );
            torusIndex.push( forthPoint );
        }
    }

    glBuffer.torusVertexBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, glBuffer.torusVertexBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( torusVertex ), gl.STATIC_DRAW );
    glNumber.TORUS_VERTEX_ITEM_SIZE = 3;
    glNumber.TORUS_VERTEX_NUMBER_OF_ITEMS = torusVertex.length / 3;

    glBuffer.torusNormalBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, glBuffer.torusNormalBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( torusNormal ), gl.STATIC_DRAW );
    glNumber.TORUS_NORMAL_ITEM_SIZE = 3;
    glNumber.TORUS_NORMAL_NUMBER_OF_ITEMS = torusNormal.length / 3;

    glBuffer.torusTextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, glBuffer.torusTextureCoordBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( torusTextureCoord ), gl.STATIC_DRAW );
    glNumber.TORUS_TEXTURE_ITEM_SIZE = 2;
    glNumber.TORUS_TEXTURE_NUMBER_OF_ITEMS = torusTextureCoord.length / 2;

    glBuffer.torusIndexBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, glBuffer.torusIndexBuffer );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array( torusIndex ), gl.STATIC_DRAW );
    glNumber.TORUS_INDEX_ITEM_SIZE = 1;
    glNumber.TORUS_INDEX_NUMBER_OF_ITEMS = torusIndex.length;
}


function drawTorus_texture( vertexPosition, normalPosition, colorPosition,
                            textureCoordPosition, boolPosition )
{
    gl.uniform1i( boolPosition, true );

    gl.bindBuffer( gl.ARRAY_BUFFER, glBuffer.torusVertexBuffer );
    gl.enableVertexAttribArray( vertexPosition );
    gl.vertexAttribPointer( vertexPosition, glNumber.TORUS_VERTEX_ITEM_SIZE,
        gl.FLOAT, false, 0, 0 );

    gl.bindBuffer( gl.ARRAY_BUFFER, glBuffer.torusNormalBuffer );
    gl.enableVertexAttribArray( normalPosition );
    gl.vertexAttribPointer( normalPosition, glNumber.TORUS_NORMAL_ITEM_SIZE,
        gl.FLOAT, false, 0, 0 );

    gl.bindBuffer( gl.ARRAY_BUFFER, glBuffer.torusTextureCoordBuffer );
    gl.enableVertexAttribArray( textureCoordPosition );
    gl.vertexAttribPointer( textureCoordPosition, glNumber.TORUS_TEXTURE_ITEM_SIZE,
        gl.FLOAT, false, 0, 0);

    gl.disableVertexAttribArray( colorPosition );

    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, glBuffer.torusIndexBuffer );
    gl.drawElements( gl.TRIANGLES, glNumber.TORUS_INDEX_NUMBER_OF_ITEMS, gl.UNSIGNED_SHORT, 0 );
}


function drawTorus_color( vertexPosition, normalPosition, colorPosition, texturePosition,
                          boolPosition, r, g, b, a  )
{
    gl.uniform1i( boolPosition, false );

    gl.bindBuffer( gl.ARRAY_BUFFER, glBuffer.torusVertexBuffer );
    gl.enableVertexAttribArray( vertexPosition );
    gl.vertexAttribPointer( vertexPosition, glNumber.TORUS_VERTEX_ITEM_SIZE,
        gl.FLOAT, false, 0, 0 );

    gl.bindBuffer( gl.ARRAY_BUFFER, glBuffer.torusNormalBuffer );
    gl.enableVertexAttribArray( normalPosition );
    gl.vertexAttribPointer( normalPosition, glNumber.TORUS_NORMAL_ITEM_SIZE,
        gl.FLOAT, false, 0, 0 );

    gl.disableVertexAttribArray( colorPosition );
    gl.vertexAttrib4f( colorPosition, r, g, b, a );
    gl.disableVertexAttribArray( texturePosition );

    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, glBuffer.torusIndexBuffer );
    gl.drawElements( gl.TRIANGLES, glNumber.TORUS_INDEX_NUMBER_OF_ITEMS, gl.UNSIGNED_SHORT, 0 );
}