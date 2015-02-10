/**
 * @fileoverview This file defines GUI in the page using jQuery
 * @caution This file is just applied to showroom page
 */




//The accordion controller
$(
    function()
    {
        var accordionOptions =
        {
            active: false,
            collapsible: true,
            beforeActivate: changeItems
        };

        $("#controlAccordion").accordion( accordionOptions );
    }
);

function changeItems( event, ui )
{
    if( ui.newHeader.find("a").text() === "Color Controller" )
    {
        eventParameter.itemPointer = 1;
    }
    else if( ui.newHeader.find("a").text() === "Texture Controller" )
    {
        eventParameter.itemPointer = 2;
    }
    else if( ui.newHeader.find("a").text() === "Strip Controller" )
    {
        eventParameter.itemPointer = 3;
    }
    else if( ui.newHeader.find("a").text() === "NormalMap Controller" )
    {
        eventParameter.itemPointer = 4;
    }
    else if( ui.newHeader.find("a").text() === "Model Controller" )
    {
        eventParameter.itemPointer = 5;
    }
    else
    {
        eventParameter.itemPointer = 1;
    }
}







//Items in color controller
$(
    function()
    {
        var sliderOptions =
        {
            orientation: "horizontal",
            min: 0.0,
            max: 1.0,
            step: 0.01,
            animate: true,
            slide: refreshColor,
            change: refreshColor
        };
        $( "#red, #green, #blue" ).slider(sliderOptions);
        $( "#red" ).slider( "value", 1.0 );
        $( "#green" ).slider( "value", 1.0 );
        $( "#blue" ).slider( "value", 1.0 );
    }
);

function refreshColor( )
{
    eventParameter.mRed = $( "#red" ).slider( "value" );
    eventParameter.mGreen = $( "#green" ).slider( "value" );
    eventParameter.mBlue = $( "#blue" ).slider( "value" );
}


$(
    function()
    {
        $( "#objectSelect" ).buttonset();
    }
);


function refreshColorObject()
{
    $("#cCube").click(
        function()
        {
            eventParameter.colorModel = "c1";
        }
    );

    $("#cPyramid").click(
        function()
        {
            eventParameter.colorModel = "c2";
        }
    );

    $("#cCylinder").click(
        function()
        {
            eventParameter.colorModel = "c3";
        }
    );

    $("#cSphere").click(
        function()
        {
            eventParameter.colorModel = "c4";
        }
    );

    $("#cTorus").click(
        function()
        {
            eventParameter.colorModel = "c5";
        }
    );
}





//Items in texture controller
$(
    function()
    {
        $( "#td1" ).draggable( { appendTo: "body", helper: "clone" } );
        $( "#td2" ).draggable( { appendTo: "body", helper: "clone"  } );
        $( "#td3" ).draggable( { appendTo: "body", helper: "clone"  } );
    }
);

$(
    function()
    {
        var dropOptions =
        {
            drop: dropTexture
        };
        $("#modelContainer").droppable( dropOptions );
    }
);

function dropTexture( event, ui )
{
    if( ui.draggable.attr("id") == "td1" )
    {
        eventParameter.textureNumber = "tex1";
    }
    else if( ui.draggable.attr("id") == "td2" )
    {
        eventParameter.textureNumber = "tex2";
    }
    else if( ui.draggable.attr("id") == "td3" )
    {
        eventParameter.textureNumber = "tex3";
    }
    else
    {
        eventParameter.textureNumber = "tex1";
    }
}


$(
    function()
    {
        $( "#textureModelSelect" ).buttonset();
    }
);

function refreshTextureObject()
{
    $("#tCube").click(
        function()
        {
            eventParameter.textureModel = "t1";
        }
    );

    $("#tPyramid").click(
        function()
        {
            eventParameter.textureModel = "t2";
        }
    );

    $("#tCylinder").click(
        function()
        {
            eventParameter.textureModel = "t3";
        }
    );

    $("#tSphere").click(
        function()
        {
            eventParameter.textureModel = "t4";
        }
    );

    $("#tTorus").click(
        function()
        {
            eventParameter.textureModel = "t5";
        }
    );
}










//Items in stripTorus controller
$(
    function()
    {
        var sliderOptions =
        {
            orientation: "horizontal",
            min: 0.0,
            max: 1.0,
            step: 0.01,
            animate: true,
            slide: refreshBackgroundColor,
            change: refreshBackgroundColor
        };
        $( "#BRed, #BGreen, #BBlue" ).slider(sliderOptions);
        $( "#BRed" ).slider( "value", 0.0 );
        $( "#BGreen" ).slider( "value", 0.0 );
        $( "#BBlue" ).slider( "value", 0.0 );
    }
);

function refreshBackgroundColor( )
{
    eventParameter.bRed = $( "#BRed" ).slider( "value" );
    eventParameter.bGreen = $( "#BGreen" ).slider( "value" );
    eventParameter.bBlue = $( "#BBlue" ).slider( "value" );
}



$(
    function()
    {
        var sliderOptions =
        {
            orientation: "horizontal",
            min: 0.0,
            max: 1.0,
            step: 0.01,
            animate: true,
            slide: refreshStripColor,
            change: refreshStripColor
        };
        $( "#SRed, #SGreen, #SBlue" ).slider(sliderOptions);
        $( "#SRed" ).slider( "value", 1.0 );
        $( "#SGreen" ).slider( "value", 1.0 );
        $( "#SBlue" ).slider( "value", 1.0 );
    }
);

function refreshStripColor( )
{
    eventParameter.sRed = $( "#SRed" ).slider( "value" );
    eventParameter.sGreen = $( "#SGreen" ).slider( "value" );
    eventParameter.sBlue = $( "#SBlue" ).slider( "value" );
}



$(
    function()
    {
        var sliderOptions =
        {
            orientation: "horizontal",
            min: 0.2,
            max: 2.0,
            step: 0.2,
            animate: true,
            slide: refreshStripNumber,
            change: refreshStripNumber
        };
        $( "#SNumber" ).slider(sliderOptions);
        $( "#SNumber" ).slider( "value", 0.2 );
    }
);

function refreshStripNumber()
{
    eventParameter.stripNum = $( "#SNumber" ).slider( "value" );
}






$(
    function()
    {
        $( "#postProcessingSelect" ).buttonset();
    }
);

function refreshPostProcessing()
{
    $("#normal").click(
        function()
        {
            eventParameter.postNum = "p1";
        }
    );

    $("#invert").click(
        function()
        {
            eventParameter.postNum = "p2";
        }
    );

    $("#gray").click(
        function()
        {
            eventParameter.postNum = "p3";
        }
    );

    $("#wavy").click(
        function()
        {
            eventParameter.postNum = "p4";
        }
    );

    $("#cinema").click(
        function()
        {
            eventParameter.postNum = "p5";
        }
    );
}


$(
    function()
    {
        $( "#modelSelect" ).buttonset();
    }
);

function refreshModel()
{
    $("#teapot").click(
        function()
        {
            eventParameter.modelNum = "m1";
        }
    );

    $("#bunny").click(
        function()
        {
            eventParameter.modelNum = "m2";
        }
    );

    $("#cat").click(
        function()
        {
            eventParameter.modelNum = "m3";
        }
    );

    $("#deer").click(
        function()
        {
            eventParameter.modelNum = "m4";
        }
    );
}

$(
    function()
    {
        var sliderOptions =
        {
            orientation: "horizontal",
            min: 0.0,
            max: 1.0,
            step: 0.01,
            animate: true,
            slide: refreshModelColor,
            change: refreshModelColor
        };
        $( "#cRed, #cGreen, #cBlue" ).slider(sliderOptions);
        $( "#cRed" ).slider( "value", 1.0 );
        $( "#cGreen" ).slider( "value", 1.0 );
        $( "#cBlue" ).slider( "value", 1.0 );
    }
);

function refreshModelColor( )
{
    eventParameter.cRed = $( "#cRed" ).slider( "value" );
    eventParameter.cGreen = $( "#cGreen" ).slider( "value" );
    eventParameter.cBlue = $( "#cBlue" ).slider( "value" );
}


$(document).ready
(
    function()
    {
        $(function() {
            $( "#dialog-modal" ).dialog({
                height: 500,
                width: 650,
                modal: true,
                show: {
                    effect: "explode",
                    duration: 500
                },
                hide: {
                    effect: "explode",
                    duration: 500
                }

            });
        });


        refreshColorObject();
        refreshTextureObject();
        refreshPostProcessing();
        refreshModel();
    }
);