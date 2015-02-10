/**
 * @fileoverview This file defines torus model with strips
 */


function StripTorus()
{
    this.stripTorusVertexBuffer = undefined;
    this.stripTorusNormalBuffer = undefined;
    this.stripTorusTextureBuffer = undefined;
    this.stripTorusIndexBuffer = undefined;

    this.vertexItemSize = 0;
    this.vertexNumberOfItems = 0;
    this.normalItemSize = 0;
    this.normalNumberOfItems = 0;
    this.textureItemSize = 0;
    this.textureNumberOfItems = 0;
    this.indexItemSize = 0;
    this.indexNumberOfItems = 0;

    this.stripeNumber = 0;
    this.stripeWidth = 0;
    this.stripeColor = 0;
    this.backColor = 0;
    this.fuzz = 0;

    this.minFuzz = 0.01;
    this.maxFuzz = 0.5;
}


StripTorus.prototype.setupStripTorusModel = function( inn, tube )
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

        this.stripTorusVertexBuffer = gl.createBuffer();
        gl.bindBuffer( gl.ARRAY_BUFFER, this.stripTorusVertexBuffer );
        gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( torusVertex ), gl.STATIC_DRAW );
        this.vertexItemSize = 3;
        this.vertexNumberOfItems = torusVertex.length / 3;

        this.stripTorusNormalBuffer = gl.createBuffer();
        gl.bindBuffer( gl.ARRAY_BUFFER, this.stripTorusNormalBuffer );
        gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( torusNormal ), gl.STATIC_DRAW );
        this.normalItemSize = 3;
        this.normalNumberOfItems = torusNormal.length / 3;

        this.stripTorusTextureBuffer = gl.createBuffer();
        gl.bindBuffer( gl.ARRAY_BUFFER, this.stripTorusTextureBuffer );
        gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( torusTextureCoord ), gl.STATIC_DRAW );
        this.textureItemSize = 2;
        this.textureNumberOfItems = torusTextureCoord.length / 2;

        this.stripTorusIndexBuffer = gl.createBuffer();
        gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.stripTorusIndexBuffer );
        gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array( torusIndex ), gl.STATIC_DRAW );
        this.indexItemSize = 1;
        this.indexNumberOfItems= torusIndex.length;
};


StripTorus.prototype.setupParameter = function( num, width, color, bcolor, fuzz )
{
    this.stripeNumber = num;
    this.stripeWidth = width;
    this.stripeColor = color;
    this.backColor = bcolor;


    if( fuzz > 0.5 )
    {
        this.fuzz = this.minFuzz;
    }
    else if( fuzz < 0.01 )
    {
        this.fuzz = this.maxFuzz;
    }
    else
    {
        this.fuzz = fuzz;
    }
};

StripTorus.prototype.uploadParameterToShader = function( sColor, bColor, uSWidth,uSNum, uFz )
{
    gl.uniform3fv( sColor, this.stripeColor );
    gl.uniform3fv( bColor, this.backColor );
    gl.uniform1f( uSWidth, this.stripeWidth );
    gl.uniform1f( uSNum, this.stripeNumber );
    gl.uniform1f( uFz, this.fuzz );
};


StripTorus.prototype.drawStripTorus = function( vertexPosition, normalPosition,  textureCoordPosition )
{
    gl.bindBuffer( gl.ARRAY_BUFFER, this.stripTorusVertexBuffer );
    gl.enableVertexAttribArray( vertexPosition );
    gl.vertexAttribPointer( vertexPosition, this.vertexItemSize, gl.FLOAT, false, 0, 0 );

    gl.bindBuffer( gl.ARRAY_BUFFER, this.stripTorusNormalBuffer );
    gl.enableVertexAttribArray( normalPosition );
    gl.vertexAttribPointer( normalPosition, this.normalItemSize, gl.FLOAT, false, 0, 0 );

    gl.bindBuffer( gl.ARRAY_BUFFER, this.stripTorusTextureBuffer );
    gl.enableVertexAttribArray( textureCoordPosition );
    gl.vertexAttribPointer( textureCoordPosition, this.textureItemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.stripTorusIndexBuffer );
    gl.drawElements( gl.TRIANGLES, this.indexNumberOfItems, gl.UNSIGNED_SHORT, 0 );
};