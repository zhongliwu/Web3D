/**
 * @fileoverview This file includes the entry of the painting shop
 * It defines everything the painting shop's canvas used
 * @PaintingShop The demo is powered by Olivier
 * But its idea is mostly originated from Google's demo "Dynamic Cubemap"
 */

//Here we defines global variables
var program = new Program();
var skyboxProgram = new Program();
var envSphereProgram = new Program();
var light1 = new Light( "pointLight" );
var skybox = new SkyBox();
var envSphere = new EnvironmentalSphere();

var camera1 = new Camera();
var model1 = new ModelTransformation();
var worldView = new ObserveScene();

var primitivesAtPZ = [ ];
var primitivesAtNZ = [ ];
var primitivesAtPX = [ ];
var primitivesAtNX = [ ];
var FPMS = 50 / 1000.0;



//Initialize all items used in the scene
var attributeListForSkybox = [ "aVertexPosition" ];
var uniformListForSkybox = [ "uCubeMapTexture", "uModelViewMatrix", "uProjectionMatrix" ];

var attributeListForProgram = [ "aVertexPosition", "aVertexNormal",
    "aTextureCoord", "aVertexColor" ];
var uniformListForProgram = [ "uMVMatrix", "uPMatrix", "uNMatrix", "uLightPosition",
    "uAmbientLightColor", "uDiffuseLightColor", "uSpecularLightColor",
    "uSampler", "uUseTexture", "uLightIsPoint" ];

var attributeListForEnvSphereProgram = [ "aVertexPosition", "aVertexNormal" ];
var uniformListForEnvSphereProgram = [ "uModelViewMatrix", "uProjectionMatrix",
    "uModelMatrix", "uEyePosition", "uCubeMapTexture" ];

function initializeShaders()
{
    program.createShaderProgram( "primitiveShader_vertex", "primitiveShader_fragment" );
    skyboxProgram.createShaderProgram( "skyboxShader_vertex", "skyboxShader_fragment" );
    envSphereProgram.createShaderProgram( "envSphereShader_vertex", "envSphereShader_fragment" );
}

function initializeLights()
{
    light1.setPosition([ 0.0, 15.0, 0.0 ]);
    light1.setAmbient([ 0.2, 0.2, 0.2 ]);
    light1.setDiffuse([ 0.7, 0.7, 0.7 ]);
    light1.setSpecular([ 1.0, 1.0, 1.0 ]);
}

function initializeEnvironment()
{
    setupSphereBuffer( 0.15 );

    skybox.setupSkyboxModel();
    skybox.loadSkyboxTexture();

    envSphere.setupEnvSphere();
}

function initializeAnimationObjects()
{
    var startDistance1 = 2.2;
    var startDistance2 = -2.2;
    var rotateSpeed = 3.75;
    var innerRadius = 0.45;
    var moveSpeed = 1.25;
    var moveRange = 0.2;
    var moveDirect1 = 1.0;
    var moveDirect2 = -1.0;

    for( var i = 0; i < 5; i++ )
    {
        primitivesAtPZ.push( new ObjectAnimate(
            startDistance1, rotateSpeed, innerRadius, moveSpeed, moveRange, moveDirect1, 0
        ));

        primitivesAtNZ.push( new ObjectAnimate(
            startDistance2, rotateSpeed, innerRadius, moveSpeed, moveRange, moveDirect2, 0
        ));

        primitivesAtPX.push( new ObjectAnimate(
            startDistance1, rotateSpeed, innerRadius, moveSpeed, moveRange, moveDirect1, 1
        ));

        primitivesAtNX.push( new ObjectAnimate(
            startDistance2, rotateSpeed, innerRadius, moveSpeed, moveRange, moveDirect2, 1
        ));
    }
}






//A class implements multi-objects animation
function ObjectAnimate( startDistance, rotateSpeed, innerRadius, moveSpeed, moveRange,
                        moveDirection, atZ )
{
    this.startDistance = startDistance;
    this.rotateSpeed = rotateSpeed;
    this.innerRadius = innerRadius;
    this.moveSpeed = moveSpeed;
    this.moveRange = moveRange;
    this.moveDirect = moveDirection;
    this.atZ = atZ;

    this.position_x = 0.0;
    this.position_y = 0.0;
    this.position_z = 0.0;

    this.theta = 0.0;
    this.alta = 0.0;

    this.r = 1.0;
    this.g = 1.0;
    this.b = 1.0;
    this.signR = -1;
    this.signG = -1;
    this.signB = -1;
}

ObjectAnimate.prototype.update = function( time, i )
{
    var startTime1 = i * FPMS * this.rotateSpeed;
    var startTime2 = i * FPMS * this.moveSpeed;
    this.alta += Utilities.degToRad( time * FPMS * this.rotateSpeed - startTime1 * 2.5 );
    this.theta += Utilities.degToRad( time * FPMS * this.moveSpeed - startTime2 * 2.5 );

    this.r += this.signR * time / 3500.0;
    this.g += this.signG * time / 3200.0;
    this.b += this.signB * time / 3300.0;

    if( this.r <= 0.25 || this.r >= 1.0 )
    {
        this.signR *= -1;
    }

    if( this.g <= 0.15 || this.g >= 1.0 )
    {
        this.signG *= -1;
    }

    if( this.b <= 0.30 || this.b >= 1.0 )
    {
        this.signB *= -1;
    }
};

ObjectAnimate.prototype.render = function( )
{
    if( this.atZ === 0 )
    {
        this.position_x = this.innerRadius * Math.cos( this.alta );
        this.position_y = this.innerRadius * Math.sin( this.alta );
        this.position_z = this.startDistance
            + this.moveDirect * this.moveRange * Math.cos( this.theta );
    }
    else
    {
        this.position_x = this.startDistance
            + this.moveDirect * this.moveRange * Math.cos( this.theta );
        this.position_y = this.innerRadius * Math.sin( this.alta );
        this.position_z = this.innerRadius * Math.cos( this.alta );
    }


    model1.pushModelMatrix();
    model1.move( [this.position_x, this.position_y, this.position_z] );

    worldView.updateModelMatrix( model1.modelMatrix );
    worldView.uploadMatrixToShader( program.uMVMatrix, program.uPMatrix, program.uNMatrix );

    drawSphere_color( program.aVertexPosition, program.aVertexNormal, program.aVertexColor,
        program.aTextureCoord, program.uUseTexture, this.r, this.g, this.b, 1.0 );
    model1.popModelMatrix();
};







//Here we define all animation items here
var lastTime = 0;
var angle = 0;
function calculateTime()
{
    var timeNow = new Date().getTime();
    if ( lastTime != 0 )
    {
        var elapsed = timeNow - lastTime;
        angle += ( 8 * elapsed ) / 1000.0;
        for( var i1 = 0; i1 < primitivesAtPZ.length; i1++ )
            primitivesAtPZ[i1].update( elapsed, i1 );
        for( var i2 = 0; i2 < primitivesAtNZ.length; i2++ )
            primitivesAtNZ[i2].update( elapsed, i2 );
        for( var i3 = 0; i3 < primitivesAtPX.length; i3++ )
            primitivesAtPX[i3].update( elapsed, i3 );
        for( var i4 = 0; i4 < primitivesAtNX.length; i4++ )
            primitivesAtNX[i4].update( elapsed, i4 );
    }
    lastTime = timeNow;
}

function startAnimate()
{
    requestAnimFrame( startAnimate );
    calculateTime();
    renderScene();
}

function renderScene( )
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

    var cx_position = 5.0 * Math.sin( Utilities.degToRad( angle ) );
    var cz_position = 5.0 * Math.cos( Utilities.degToRad( angle ) );

    camera1.setView( [cx_position, 0, cz_position], [0, 0, 0], [0, 1, 0] );
    worldView.updateViewMatrix( camera1.viewMatrix );
    worldView.updateModelMatrix( model1.modelMatrix );

    program.useAsCurrentProgram( attributeListForProgram, uniformListForProgram );
    worldView.uploadMatrixToShader( program.uMVMatrix, program.uPMatrix, program.uNMatrix );
    light1.uploadLightToShader( program.uLightPosition, program.uAmbientLightColor,
        program.uDiffuseLightColor, program.uSpecularLightColor, program.uLightIsPoint );

    for( var s1 = 0; s1 < primitivesAtPZ.length; s1++ )
        primitivesAtPZ[s1].render();

    for( var s2 = 0; s2 < primitivesAtNZ.length; s2++ )
        primitivesAtNZ[s2].render();

    for( var s3 = 0; s3 < primitivesAtPX.length; s3++ )
        primitivesAtPX[s3].render();

    for( var s4 = 0; s4 < primitivesAtNX.length; s4++ )
        primitivesAtNX[s4].render();





    worldView.updateModelMatrix( mat4.identity( worldView.model ) );

    skyboxProgram.useAsCurrentProgram( attributeListForSkybox, uniformListForSkybox );
    worldView.uploadMatrixToShader( skyboxProgram.uModelViewMatrix,
        skyboxProgram.uProjectionMatrix );

    skybox.drawSkybox( skyboxProgram.aVertexPosition, skyboxProgram.uCubeMapTexture );



    envSphereProgram.useAsCurrentProgram( attributeListForEnvSphereProgram,
        uniformListForEnvSphereProgram );
    worldView.uploadMatrixToShader( envSphereProgram.uModelViewMatrix,
        envSphereProgram.uProjectionMatrix );
    worldView.upload4X4MatrixToShader( envSphereProgram.uModelMatrix, worldView.model );
    camera1.uploadWorldCameraPositionToShader( envSphereProgram.uEyePosition );

    envSphere.drawEnvSphere( envSphereProgram.aVertexPosition,
        envSphereProgram.aVertexNormal, envSphereProgram.uCubeMapTexture, skybox.cubeTexture );
}





//The Entry of the application
function runPaintingShop()
{
    gl = Utilities.createWebGLContext( "webGL" );
    gl = WebGLDebugUtils.makeDebugContext( gl );

    initializeShaders();
    initializeLights();
    initializeEnvironment();
    initializeAnimationObjects();

    gl.clearColor( 0.1, 0.1, 0.1, 1.0 );
    gl.viewport( 0, 0, gl.viewportWidth, gl.viewportHeight );
    gl.enable( gl.DEPTH_TEST );

    camera1.setPerspectiveProjection( 60, gl.viewportWidth / gl.viewportHeight, 0.1, 100 );
    worldView.updateProjectionMatrix( camera1.projectionMatrix );

    startAnimate();
}




//Resize functions
function resizeCanvas()
{
    var c_width = $("#viewContainer").width();
    var c_height = $('#viewContainer').height();
    $("#viewContainer").attr('width',c_width);
    $("#viewContainer").attr('height',c_height);
}

function resizeInstructor()
{
    var c_width = $("#instructor").width();
    var c_height = $('#instructor').height();
    $("#instructor").attr('width',c_width);
    $("#instructor").attr('height',c_height);
}

$(window).resize( function(){resizeCanvas();} );
$(window).resize( function(){resizeInstructor();} );