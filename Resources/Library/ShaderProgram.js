/**
 * @fileoverview This file contains all functions that are used by shader operations
 */



function Program(  )
{
    this.shaderProgram = undefined;
}



/**
 * Load shader from xml files, which are defined in the server
 * @param shaderName   Name of the shader Program
 * @param shaderType   The shader type only has two values: vertexShader, fragmentShader
 * @returns {null}
 */
Program.prototype.loadShaderFromXML = function( shaderName, shaderType )
{
    var filename = null;
    var shaderScript = null;

    if( shaderType === "vertexShader" )
    {
        filename = "./Resources/Media/Shaders/vertexShader.xml";
    }
    else if( shaderType === "fragmentShader" )
    {
        filename = "./Resources/Media/Shaders/fragmentShader.xml";
    }
    else
    {
        alert( "ERROR_SHADER: Shader Type is invalid. " );
        return null;
    }

    $.ajax
        (
            {
                async: false,
                url : filename,
                dateType: 'xml',
                success: function( data )
                {
                    $( data ).find( "script" ).each
                    (
                        function( )
                        {
                            var id = $( this ).children( "id" ).text();
                            if( id === shaderName )
                                shaderScript = $( this ).children( "code" ).text();
                        }
                    );
                },

                error: function( data )
                {
                    alert( "ERROR_XML: Failed to load shader: " + data );
                }
            }
        );

    return shaderScript;
};



/**
 * Compile the loaded string of the 'shader'
 * @param shaderScript    The string of the shader, usually loaded from XML files
 * @param shaderType    The shader type only has two values: vertexShader, fragmentShader
 * @returns {*} shader    The complied shader
 */
Program.prototype.compileLoadedShader = function( shaderScript, shaderType )
{
    var shader;
    if( shaderType === "vertexShader" )
    {
        shader = gl.createShader( gl.VERTEX_SHADER );
    }
    else if( shaderType === "fragmentShader" )
    {
        shader = gl.createShader( gl.FRAGMENT_SHADER );
    }
    else
    {
        alert( "ERROR_SHADER: Shader type is invalid." );
        return null;
    }

    gl.shaderSource( shader, shaderScript );
    gl.compileShader( shader );

    if ( !gl.getShaderParameter( shader, gl.COMPILE_STATUS ) )
    {
        alert( gl.getShaderInfoLog( shader ) );
        return null;
    }

    return shader;
};



/**
 * Create a shader program according to the shader name
 * @param vertexShaderName
 * @param fragmentShaderName
 */
Program.prototype.createShaderProgram = function( vertexShaderName, fragmentShaderName)
{
    var vertexShaderScript = this.loadShaderFromXML( vertexShaderName, "vertexShader" );
    var fragmentShaderScript = this.loadShaderFromXML( fragmentShaderName, "fragmentShader" );

    var vertexShader = this.compileLoadedShader( vertexShaderScript, "vertexShader" );
    var fragmentShader = this.compileLoadedShader( fragmentShaderScript, "fragmentShader" );

    this.shaderProgram = gl.createProgram( );
    gl.attachShader( this.shaderProgram, vertexShader );
    gl.attachShader( this.shaderProgram, fragmentShader );
    gl.linkProgram( this.shaderProgram );

    if ( !gl.getProgramParameter( this.shaderProgram, gl.LINK_STATUS ) )
    {
        alert( "ERROR_SHADER: Unable to initialize the shader program." );
    }
};



/**
 * Set attribute locations in a list
 * @param attributeList
 */
Program.prototype.setAttributeLocations = function( attributeList )
{
    for( var i=0; i < attributeList.length; i++ )
    {
        this[ attributeList[i] ] = gl.getAttribLocation( this.shaderProgram, attributeList[i] );
    }
};



/**
 * Set uniform locations in a list
 * @param uniformList
 */
Program.prototype.setUniformLocations = function( uniformList )
{
    for( var i = 0; i < uniformList.length; i++ )
    {
        this[ uniformList[i] ] = gl.getUniformLocation( this.shaderProgram, uniformList[i] );
    }
};



/**
 * Use this program as the current shader program
 * @param attributeList
 * @param uniformList
 */
Program.prototype.useAsCurrentProgram = function( attributeList, uniformList )
{
    this.setAttributeLocations( attributeList );
    this.setUniformLocations( uniformList );

    gl.useProgram( this.shaderProgram );
};