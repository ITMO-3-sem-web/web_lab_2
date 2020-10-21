const $ = window.$;


$(document).ready(function(){

    let x, y, r;
    let messageContentIsPositive, messageBoxIsShown;

    // Canvas parameters
    const i = 160;
    const R = 100;
    let coordinateSystemHasBeenDrawn = false;

    const canvasWidth = 500;
    const canvasHeight = 500;

    const maxXCoord = 5;
    const stepX = 0.5;

    const maxYCoord = 5;
    const stepY = 1;

    const pixelStep = 26;

    let canvas;
    let ctx; // context of Canvas
    //----------------


    initialize();



    //
    function initialize() {
        if (localStorage.getItem("table-content") === null) {
            localStorage.setItem("table-content", "")
        };

        $("#result-table tr:first").after(localStorage.getItem("table-content"));

        // drawGraph(0);

        // prepareCoordinateSystem();
        // drawArea(1);
        initCanvas();
        draw(0);
        // prepareCoordinateSystem();
        // prepareCoordinateSystemTo(0);
    }


    // Handle submit-button clicked action to check the form inputs' values   .
    $("#submit-button").click(function() {
        isValidData();
    });


    // Handle form confirmation action to check the form inputs' values.
    $("#form").on("submit", function(e) {
        e.preventDefault();
        main();

    });
    
    
    // Makes request to PHP-server and handles it's response. If response if positive, 
    // this function changes the table.
    function main() {
        
        if ( isValidData() ){

            $("#form").trigger("reset");

            makeMessagePositive();
            showMessage("Форма успешно отправлена." +
                "<br>Вы хорошо поработали." +
                "<br>Похвалите себя: сходите в бар с друзьями, покатайтесь на велосипеде и тп...");


            let request = "x=" + x + "&y=" + y + "&r=" + r;


            $.get("./php/php.php", request, function(data) {

                data = JSON.parse(data);

                let $responseStatus = data["status"];
                let $responseContent = data["content"];


                if ($responseStatus === "OK") {
                    localStorage.setItem("table-content", $responseContent + localStorage.getItem("table-content"));
                    $("#result-table tr:first").after($responseContent);
                } else if ($responseStatus === "ERROR") {
                    makeMessageNegative();
                    showMessage($responseContent);
                }

            })
        }
    }
    
    
    // Checks whether all the form's inputs have valid data (input).
    function isValidData() {
    
        clearAndHideMessage();
        return  (isValidX() & isValidY() & isValidR()) ;
    }
        
    
    // Checks whether the 'X' value is valid.
    function isValidX() {

        x = $(".checkbox-values.x input:checked").val();
        
        if (x === undefined) {
            makeMessageNegative();
            showAddMessage("Выберете значение X .<br>");
            return false;
        } else {
            return true;
        }
    }
    
    
    // Checks whether the 'Y' value is valid.
    function isValidY() {

        let tmpY = $(".checkbox-values.y").val().replace(",", ".");

        if ( ! $.isNumeric(tmpY)) {
            console.log("y is NOT numeric")
            makeMessageNegative();
            showAddMessage("Введите значение Y в диапазоне от -5 до 5. В Качестве дробного разделителя используйте точку или запятую.<br>");
            return false;
        }

        let tmpArr = tmpY.split(".");

        let intPart = parseInt(tmpArr[0]);
        let fracPart = 0;

        if (tmpArr.length === 2) {
            fracPart = parseInt(tmpArr[1]);
        }

        y = parseFloat(tmpY);

        if ( ! isCorrectValueY(intPart, fracPart) ) {
            makeMessageNegative();
            showAddMessage("Введите значение Y в диапазоне от -5 до 5. В Качестве дробного разделителя используйте точку или запятую.<br>");
            return false;
            
        } else {
            console.log("Y = " + y);
            return true;
        }
    }
    
    
    // Checks whether the specified 'y' numeric value is in the range {-5...5}.
    function isCorrectValueY(intPart, fracPart) {
        let leftLimit = -5;
        let rightLimit = +5;


        if ( ((intPart === leftLimit) || (intPart === rightLimit)) && (fracPart === 0) ) {
            return true;
        } else {
            return ( (intPart > leftLimit) && (intPart < rightLimit) );
        }
    }

    
    // Checks whether the 'R' value is valid.
    function isValidR() {

        r = $(".checkbox-values.r input:checked").val();
        
        if (r === undefined) {
            makeMessageNegative();
            showAddMessage("Выберете значение R .<br>");
            return false;
            
        } else {
            return true;
        }
    }




   function initCanvas() {
       canvas = document.getElementById('canvass');
       if (canvas && canvas.getContext) {
           ctx = canvas.getContext('2d');
           ctx.translate(canvasWidth/2, canvasHeight/2);
           ctx.save();
       }
   }

   function draw(r) {

        if (typeof r == "undefined") {
            return ;
        }
        // console.log("drawing with r = " + r);
        // ctx.restore();
        ctx.clearRect(-canvasWidth/2, -canvasHeight/2, canvas.width, canvas.height);

       ctx.lineWidth = 0;

       ctx.strokeStyle = "rgba(0,0,0,1)";
       ctx.fillStyle = "rgba(0, 0, 0, 1)";
       ctx.lineWidth = 2;

       // Ray X
       ctx.moveTo(-i,0);
       ctx.lineTo(i,0);
       // Arrow end
       ctx.lineTo(i-i/15, i/15);
       ctx.moveTo(i,0);
       ctx.lineTo(i-i/15, -i/15);


       // Ray Y
       ctx.moveTo(0, i);
       ctx.lineTo(0, -i);
       // Arrow end
       ctx.lineTo(i/15, -i+i/15);
       ctx.moveTo(0, -i);
       ctx.lineTo(-i/15, -i+i/15);



       var pixelXCoord = -maxXCoord * pixelStep - 4;
       for(let j=-maxXCoord; j<=maxXCoord; j += stepX) {

           if (j % 1 === 0) {
               ctx.fillText(j,  pixelXCoord, -4);
           } else {
               ctx.fillText(j,  pixelXCoord, 10);
           }
           pixelXCoord += pixelStep * stepX;
       }



       var pixelYCoord = maxYCoord * pixelStep + 4;
       for(let j=-maxYCoord; j <= maxYCoord; j += stepY) {

           if ( j !== 0 ) {
               if (j % 1 === 0) {
                   ctx.fillText(j,  4, pixelYCoord);
               } else {
                   ctx.fillText(j,  -10, pixelYCoord);
               }
           }


           pixelYCoord -= pixelStep * stepY;
       }


       ctx.stroke();


       //квадрат
       ctx.rotate(-Math.PI/2);
       ctx.fillStyle = "rgba(95, 158, 160, 0.5)";
       // ctx.strokeStyle = "rgba(255,0,0,0)";
       ctx.fillRect(0, 0, r * pixelStep, r * pixelStep);

       //треугольник
       ctx.beginPath();
       ctx.moveTo(0, 0);
       ctx.lineTo(- (r * pixelStep), 0);
       ctx.lineTo(0, r * pixelStep);
       ctx.fill();


       //полукруг

       ctx.beginPath();
       ctx.rotate(Math.PI/2);
       ctx.moveTo(0, 0);
       ctx.arc(0, 0, (r * pixelStep)/2, Math.PI, Math.PI/2, true);
       ctx.lineTo(0, 0);

       ctx.fill();

       // Убираем прошлые Path, чтобы они не возникли на холсте потом
       ctx.beginPath();

   }



    // Inserts 'text' below content in message-box.
    function showAddMessage(text) {

        let oldContent = $(".message-box .message-box-content").html();
        
        if (oldContent.indexOf(text) === -1) {
            showMessage(oldContent + text);
        }
    };


    // Sets text to message-box and makes the last one visible.
    function showMessage(text) {

        messageBoxIsShown = true;
        $(".message-box").css("display", "block");
        $(".message-box .message-box-content").html(text);

    };


    // Hides the message-box.
    function hideMessage() {
        messageBoxIsShown = false;
        $(".message-box").css("display", "none");
    };

    
    // Clears the contet inside message-box and hides the last one.
    function clearAndHideMessage() {
        clearMessage();
        hideMessage();
    }

    
    // Clears the message-box content.
    function clearMessage() {
        $(".message-box .message-box-content").html("");
    };


    // Changes message-box css to 'positive' style.
    function makeMessagePositive() {
        messageContentIsPositive = true;
        $(".message-box").css("background-color", "rgba(115, 230, 0, .6)");
        $(".message-box").css("border", "solid rgb(0, 179, 0)");

    };


    // Changes message-box css to 'negative' style.
    function makeMessageNegative() {
        messageContentIsPositive = false;
        $(".message-box").css("background-color", "rgba(255, 77, 140, .6)");
        $(".message-box").css("border", "solid rgb(255, 77, 140)");

    }


    // Allows choosing only one "X" checkbox.
    $(".checkbox-values.x input").on('change', function() {
       $(this).siblings(".checkbox-values.x input").prop('checked', false);
    });
    
    
    // Allows choosing only one "R" checkbox.
    $(".checkbox-values.r input").on('change', function() {
        // prepareCoordinateSystem();
        // drawArea($(".checkbox-values.r input:checked").val());
        let r = $(".checkbox-values.r input:checked").val();
        // drawGraph($(".checkbox-values.r input:checked").val());
        // prepareCoordinateSystemTo(r);
        // drawArea(r);
        // prepareCoordinateSystemTo();
        draw(r);
        console.log("r value=" + r);
       $(this).siblings(".checkbox-values.r input").prop('checked', false);
    });


    $("form :input").change(function() {
        if (messageContentIsPositive) {
            clearAndHideMessage();
        }
    });


    function sleep(milliseconds) {
        var currentTime = new Date().getTime();

        while (currentTime + milliseconds >= new Date().getTime()) {
        }
    }

    
});