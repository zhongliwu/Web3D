/**
 * @fileoverview This file is the entry of Model Showroom
 * @ModelShowroom In this page users could glance over the models provided by the application
 * The users can also do some interaction with those models
 */


//Here we define all global variables needed in the applcation
var program = new Program();
var strProgram = new Program();
var norProgram = new Program();
var postInvertProgram = new Program();
var postGrayProgram = new Program();
var postWavyProgram = new Program();
var postCinemaProgram = new Program();

var light1 = new Light( "pointLight" );
var texture1 = new Texture();
var texture2 = new Texture();
var texture3 = new Texture();
var texture4 = new Texture();
var postTexture = new Texture();

var norCube = new NormalMap();
var strTorus = new StripTorus();
var postPro;
var json1 = new LoadJson();
var json2 = new LoadJson();
var json3 = new LoadJson();
var json4 = new LoadJson();

var camera1 = new Camera();
var model1 = new ModelTransformation();
var worldView = new ObserveScene();
var arc;
var previousMatrix = mat4.identity();
var currentMatrix = mat4.identity();
var isDragging = false;
var last_x = 0, last_y = 0, current_x = 0, current_y = 0;

var attributeListForNorProgram = [ "aVertexPosition", "aVertexNormal",
    "aVertexTangent", "aTextureCoord" ];
var uniformListForNorProgram = [ "uModelViewMatrix", "uProjectionMatrix","uNormalMatrix",
    "uLightPosition", "uAmbientLightColor", "uSpecularLightColor",
    "uSamplerColor", "uSamplerTexture"];

var attributeListForProgram = [ "aVertexPosition", "aVertexNormal",
    "aTextureCoord", "aVertexColor" ];
var uniformListForProgram = [ "uMVMatrix", "uPMatrix", "uNMatrix", "uLightPosition",
    "uAmbientLightColor", "uDiffuseLightColor", "uSpecularLightColor",
    "uSampler", "uUseTexture", "uLightIsPoint" ];

var attributeListForStrProgram = [ "aVertexPosition", "aVertexNormal", "aTextureCoord" ];
var uniformListForStrProgram = [ "uMVMatrix", "uPMatrix", "uNMatrix", "uLightPosition",
    "uAmbientLightColor", "uDiffuseLightColor", "uSpecularLightColor", "uLightIsPoint",
    "uStripeColor", "uBackColor", "uStripeWidth", "uStripeNumber", "uFuzz" ];


var attributeListForPostProgram = [ "aVertexPosition", "aTextureCoord" ];

var uniformListForPostInvert = [ "uSampler" ];
var uniformListForPostGray = [ "uSampler" ];
var uniformListForPostWavy = [ "uSampler", "uTime" ];
var uniformListForPostCinema = [ "uSampler", "uNoiseSampler", "uTime", "uInverseTextureSize" ];


//Here we initialize all items needed in the application
function initializeShaders()
{
    program.createShaderProgram( "primitiveShader_vertex", "primitiveShader_fragment" );
    norProgram.createShaderProgram( "normalMapShader_vertex", "normalMapShader_fragment" );
    strProgram.createShaderProgram( "stripTorusShader_vertex", "stripTorusShader_fragment" );
    postGrayProgram.createShaderProgram( "postProcessingShader_vertex",
        "postProcessingShader_grayFragment" );
    postInvertProgram.createShaderProgram( "postProcessingShader_vertex",
        "postProcessingShader_invertFragment" );
    postWavyProgram.createShaderProgram( "postProcessingShader_vertex",
        "postProcessingShader_wavyFragment" );
    postCinemaProgram.createShaderProgram( "postProcessingShader_vertex",
        "postProcessingShader_cinemaFragment" );
}

function initializeLights()
{
    light1.setPosition([ 8.0, 15.0, 5.0 ]);
    light1.setAmbient([ 0.2, 0.2, 0.2 ]);
    light1.setDiffuse([ 0.7, 0.7, 0.7 ]);
    light1.setSpecular([ 1.0, 1.0, 1.0 ]);
}

function initializeEnvironment()
{
    texture1.loadTexture( "pTexture1" );
    texture2.loadTexture( "pTexture2" );
    texture3.loadTexture( "pTexture3" );
    texture4.loadTexture( "pTexture4" );
    postTexture.loadTexture( "noiseTexture" );

    setupCubeBuffer( 1.6 );
    setupSphereBuffer( 0.8 );
    setupCylinderBuffer( 0.8, 2 );
    setupTorusBuffer( 0.7, 0.18 );
    setupPyramidBuffer();

    norCube.setupTexture();
    norCube.setupModel( 1.6 );
    strTorus.setupStripTorusModel( 0.7, 0.18 );

    arc = new Arcball( gl.viewportWidth, gl.viewportHeight );
    postPro = new PostProcessing( canvas );

    json1.initializeJSONModel( "Teapot.xml" );
    json2.initializeJSONModel( "Bunny.xml" );
    json3.initializeJSONModel( "Cat.xml" );
    json4.initializeJSONModel( "Deer.xml" );
}

function initializeEventParameter()
{
    eventParameter.itemPointer = 1;
    eventParameter.colorModel = "c1";
    eventParameter.textureModel = "t1";
    eventParameter.textureNumber = "tex1";
    eventParameter.postNum = "p1";
}





//Here we define all render functions, they may use different types of shader and parameter
function renderColorModel( type, r, g, b )
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

    worldView.updateModelMatrix( currentMatrix );
    program.useAsCurrentProgram( attributeListForProgram, uniformListForProgram );
    worldView.uploadMatrixToShader( program.uMVMatrix, program.uPMatrix, program.uNMatrix );
    light1.uploadLightToShader( program.uLightPosition, program.uAmbientLightColor,
        program.uDiffuseLightColor, program.uSpecularLightColor, program.uLightIsPoint );


    switch( type )
    {
        case "c1": drawCube_color( program.aVertexPosition, program.aVertexNormal,
            program.aVertexColor, program.aTextureCoord, program.uUseTexture, r, g, b, 1.0);
            break;

        case "c2": drawPyramid_color( program.aVertexPosition, program.aVertexNormal,
            program.aVertexColor, program.aTextureCoord, program.uUseTexture, r, g, b, 1.0);
            break;

        case "c3": drawCylinder_color( program.aVertexPosition, program.aVertexNormal,
            program.aVertexColor, program.aTextureCoord, program.uUseTexture, r, g, b, 1.0);
            break;

        case "c4": drawSphere_color( program.aVertexPosition, program.aVertexNormal,
            program.aVertexColor, program.aTextureCoord, program.uUseTexture, r, g, b, 1.0);
            break;

        case "c5": drawTorus_color( program.aVertexPosition, program.aVertexNormal,
            program.aVertexColor, program.aTextureCoord, program.uUseTexture, r, g, b, 1.0);
            break;

        default : drawCube_color( program.aVertexPosition, program.aVertexNormal,
            program.aVertexColor, program.aTextureCoord, program.uUseTexture, r, g, b, 1.0);
            break;
    }
}

function renderTextureModel( type, textureNumber )
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

    worldView.updateModelMatrix( currentMatrix );
    program.useAsCurrentProgram( attributeListForProgram, uniformListForProgram );
    worldView.uploadMatrixToShader( program.uMVMatrix, program.uPMatrix, program.uNMatrix );
    light1.uploadLightToShader( program.uLightPosition, program.uAmbientLightColor,
        program.uDiffuseLightColor, program.uSpecularLightColor, program.uLightIsPoint );

    switch( textureNumber )
    {
        case "tex1": texture1.useTexture( program.uSampler );
            break;

        case "tex2": texture2.useTexture( program.uSampler );
            break;

        case "tex3": texture3.useTexture( program.uSampler );
            break;

        default : texture1.useTexture( program.uSampler );
            break;
    }

    switch( type )
    {
        case "t1": drawCube_texture( program.aVertexPosition, program.aVertexNormal,
            program.aVertexColor, program.aTextureCoord, program.uUseTexture );
            break;

        case "t2": drawPyramid_texture( program.aVertexPosition, program.aVertexNormal,
            program.aVertexColor, program.aTextureCoord, program.uUseTexture );
            break;

        case "t3": drawCylinder_texture( program.aVertexPosition, program.aVertexNormal,
            program.aVertexColor, program.aTextureCoord, program.uUseTexture );
            break;

        case "t4": drawSphere_texture( program.aVertexPosition, program.aVertexNormal,
            program.aVertexColor, program.aTextureCoord, program.uUseTexture );
            break;

        case "t5": drawTorus_texture( program.aVertexPosition, program.aVertexNormal,
            program.aVertexColor, program.aTextureCoord, program.uUseTexture );
            break;

        default : drawCube_texture( program.aVertexPosition, program.aVertexNormal,
            program.aVertexColor, program.aTextureCoord, program.uUseTexture );
            break;
    }
}

function renderStripTorus( br, bg, bb, sr, sg, sb, strNum )
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

    worldView.updateModelMatrix( currentMatrix );
    strTorus.setupParameter( strNum, 1, [sr, sg, sb], [br, bg, bb], 0.5 );
    strProgram.useAsCurrentProgram( attributeListForStrProgram, uniformListForStrProgram );
    worldView.uploadMatrixToShader( strProgram.uMVMatrix, strProgram.uPMatrix, strProgram.uNMatrix );
    light1.uploadLightToShader( strProgram.uLightPosition, strProgram.uAmbientLightColor,
        strProgram.uDiffuseLightColor, strProgram.uSpecularLightColor, strProgram.uLightIsPoint );
    strTorus.uploadParameterToShader( strProgram.uStripeColor, strProgram.uBackColor,
        strProgram.uStripeWidth, strProgram.uStripeNumber, strProgram.uFuzz );
    strTorus.drawStripTorus( strProgram.aVertexPosition, strProgram.aVertexNormal,
        strProgram.aTextureCoord );
}

function renderNormalMap()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

    worldView.updateModelMatrix( currentMatrix );
    norProgram.useAsCurrentProgram( attributeListForNorProgram, uniformListForNorProgram );
    worldView.uploadMatrixToShader( norProgram.uModelViewMatrix,
    norProgram.uProjectionMatrix, norProgram.uNormalMatrix );
    light1.uploadLightToShader( norProgram.uLightPosition, norProgram.uAmbientLightColor,
        null, norProgram.uSpecularLightColor, null );
    norCube.drawNormalMap( norProgram.aVertexPosition, norProgram.aVertexNormal,
        norProgram.aTextureCoord, norProgram.aVertexTangent,
        norProgram.uSamplerColor, norProgram.uSamplerTexture );
}


function usePostInvert()
{
    postInvertProgram.useAsCurrentProgram( attributeListForPostProgram,
        uniformListForPostInvert );
    postPro.drawImage( postInvertProgram.aVertexPosition,
        postInvertProgram.aTextureCoord, postInvertProgram.uSampler );
}

function usePostGray()
{
    postGrayProgram.useAsCurrentProgram( attributeListForPostProgram,
        uniformListForPostGray );
    postPro.drawImage( postGrayProgram.aVertexPosition,
        postGrayProgram.aTextureCoord, postGrayProgram.uSampler );
}

function usePostWavy()
{
    postWavyProgram.useAsCurrentProgram( attributeListForPostProgram,
        uniformListForPostWavy );
    postPro.drawImage( postWavyProgram.aVertexPosition,
        postWavyProgram.aTextureCoord, postWavyProgram.uSampler, postWavyProgram.uTime );
}

function usePostCinema()
{
    postCinemaProgram.useAsCurrentProgram( attributeListForPostProgram,
        uniformListForPostCinema );
    postTexture.useTexture( postCinemaProgram.uNoiseSampler );
    postPro.drawImage( postCinemaProgram.aVertexPosition,
        postCinemaProgram.aTextureCoord, postCinemaProgram.uSampler, postCinemaProgram.uTime,
        postCinemaProgram.uInverseTextureSize );
}


function renderPostProcessing( type )
{
    postPro.framebuffer.bind();
    renderNormalMap();
    postPro.framebuffer.unbind();

    switch( type )
    {
        case "p1": renderNormalMap();
            break;

        case "p2": usePostInvert();
            break;

        case "p3": usePostGray();
            break;

        case "p4": usePostWavy();
            break;

        case "p5": usePostCinema();
            break;

        default : renderNormalMap();
    }
}


function renderTeapot( r, g, b)
{
    model1.pushModelMatrix();
    model1.deformation( 0.085, 0.085, 0.085 );
    mat4.multiply( model1.modelMatrix, currentMatrix );
    worldView.updateModelMatrix( model1.modelMatrix );
    worldView.uploadMatrixToShader( program.uMVMatrix, program.uPMatrix, program.uNMatrix );
    json1.drawModel(program.aVertexPosition, program.aVertexNormal,
        program.aVertexColor, program.aTextureCoord, program.uUseTexture, r, g, b, 1.0 );
    model1.popModelMatrix();
}

function renderBunny( r, g, b )
{
    model1.pushModelMatrix();
    model1.deformation( 0.0045, 0.0045, 0.0045 );
    mat4.multiply( model1.modelMatrix, currentMatrix );
    worldView.updateModelMatrix( model1.modelMatrix );
    worldView.uploadMatrixToShader( program.uMVMatrix, program.uPMatrix, program.uNMatrix );
    json2.drawModel(program.aVertexPosition, program.aVertexNormal,
        program.aVertexColor, program.aTextureCoord, program.uUseTexture, r, g, b, 1.0 );
    model1.popModelMatrix();
}

function renderCat( r, g, b )
{
    model1.pushModelMatrix();
    model1.deformation( 0.225, 0.225, 0.225 );
    mat4.multiply( model1.modelMatrix, currentMatrix );
    worldView.updateModelMatrix( model1.modelMatrix );
    worldView.uploadMatrixToShader( program.uMVMatrix, program.uPMatrix, program.uNMatrix );
    json3.drawModel(program.aVertexPosition, program.aVertexNormal,
        program.aVertexColor, program.aTextureCoord, program.uUseTexture, r, g, b, 1.0 );
    model1.popModelMatrix();
}

function renderDeer( r, g, b )
{
    model1.pushModelMatrix();
    model1.deformation( 0.25, 0.25, 0.25 );
    mat4.multiply( model1.modelMatrix, currentMatrix );
    worldView.updateModelMatrix( model1.modelMatrix );
    worldView.uploadMatrixToShader( program.uMVMatrix, program.uPMatrix, program.uNMatrix );
    json4.drawModel(program.aVertexPosition, program.aVertexNormal,
        program.aVertexColor, program.aTextureCoord, program.uUseTexture, r, g, b, 1.0 );
    model1.popModelMatrix();
}


function renderJSonModel( type, r, g, b )
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

    program.useAsCurrentProgram( attributeListForProgram, uniformListForProgram );
    worldView.uploadMatrixToShader( program.uMVMatrix, program.uPMatrix, program.uNMatrix );
    light1.uploadLightToShader( program.uLightPosition, program.uAmbientLightColor,
        program.uDiffuseLightColor, program.uSpecularLightColor, program.uLightIsPoint );

    switch(type)
    {
        case "m1": renderTeapot( r, g, b );
            break;

        case "m2": renderBunny( r, g, b );
            break;

        case "m3": renderCat( r, g, b );
            break;

        case "m4": renderDeer( r, g, b );
            break;

        default : renderTeapot( r, g, b );
            break;
    }
}









//Here is the render cycle, we define and use interaction functions here
function renderScene()
{

    if( eventParameter.itemPointer === 1 )
    {
        renderColorModel( eventParameter.colorModel, eventParameter.mRed,
            eventParameter.mGreen, eventParameter.mBlue );
    }
    else if( eventParameter.itemPointer === 2 )
    {
        renderTextureModel( eventParameter.textureModel, eventParameter.textureNumber );
    }
    else if( eventParameter.itemPointer === 3 )
    {
        renderStripTorus( eventParameter.bRed, eventParameter.bGreen, eventParameter.bBlue,
            eventParameter.sRed, eventParameter.sGreen, eventParameter.sBlue,
            eventParameter.stripNum );
    }
    else if( eventParameter.itemPointer === 4 )
    {
        renderPostProcessing( eventParameter.postNum );
    }
    else if( eventParameter.itemPointer === 5 )
    {
        renderJSonModel( eventParameter.modelNum, eventParameter.cRed,
            eventParameter.cGreen, eventParameter.cBlue );
    }
    else
    {
        renderColorModel( eventParameter.colorModel, eventParameter.mRed,
            eventParameter.mGreen, eventParameter.mBlue );
    }
}

function renderCycle()
{
    requestAnimFrame( renderCycle );
    renderScene();
}


//The entry of the application
function runModelShowroom()
{
    gl = Utilities.createWebGLContext( "webGL_model" );
    gl = WebGLDebugUtils.makeDebugContext( gl );
    canvas = document.getElementById( "webGL_model" );

    initializeShaders();
    initializeLights();
    initializeEnvironment();
    initializeEventParameter();

    gl.clearColor( 0.1, 0.1, 0.1, 1.0 );
    gl.viewport( 0, 0, gl.viewportWidth, gl.viewportHeight );
    gl.enable( gl.DEPTH_TEST );

    camera1.setPerspectiveProjection( 60, gl.viewportWidth / gl.viewportHeight, 0.1, 100 );
    camera1.setView( [0, 0, 3.5], [0, 0, 0], [0, 1, 0] );
    worldView.updateViewMatrix( camera1.viewMatrix );
    worldView.updateProjectionMatrix( camera1.projectionMatrix );

    canvas.addEventListener( 'mousedown', handleMouseDown, false );
    canvas.addEventListener( 'mousemove', handleMouseMove, false );
    canvas.addEventListener( 'mouseup', handleMouseUp, false );

    renderCycle();
}



//Here we defines functions to deal with canvas events
function handleMouseDown( event )
{
    isDragging = true;

    last_x = event.clientX;
    last_y = event.clientY;
    current_x = event.clientX;
    current_y = event.clientY;

    arc.leftClick( last_x, last_y );
}

function handleMouseMove( event )
{
    if( !isDragging )
    {
        return;
    }

    current_x = event.clientX;
    current_y = event.clientY;

    arc.drag( current_x, current_y );
    currentMatrix = arc.rotateMatrix;
    mat4.multiply( arc.rotateMatrix, previousMatrix, currentMatrix );
}

function handleMouseUp()
{
    isDragging = false;
    previousMatrix = arc.rotateMatrix;
}

