// each square on the board is an instance of the square class
class Square {

    // constructor is called on creation of an instance
    constructor(id) {
        this.id = id;
        this.active = false;
        this.tempActive = undefined;
    }
    // swaps the square between active and inactive (including css classes for colors and active value for class instance)
    swapActive() {
        // swap active variable
        this.active = this.active === true ? false : true;
        // add or remove css class
        if (this.active === true) {
            $(`#${ this.id }`).addClass("active");
        } else {
            $(`#${ this.id }`).removeClass("active");
        }
    }
    makeFalse() {
        this.active = false;
        if ($(`#${ this.id }`).hasClass("active")) {
            $(`#${ this.id }`).removeClass("active");
        };
    }
    makeTrue() {
        this.active = true;
        if (!$(`#${ this.id }`).hasClass("active")) {
            $(`#${ this.id }`).addClass("active");
        };
    }
    update() {
        if (this.tempActive === true) {
            this.makeTrue();
        } else if (this.tempActive === false) {
            this.makeFalse();
        }
    }
    // check the state of all of the square's neighbors
    checkNeighbors() {
        // this dictionary holds the objects for each neighbor (as elements of the squares array)
        const neighbors = {
            top_left: getSquare(parseInt(this.id - WIDTH - 1)),
            top: getSquare(parseInt(this.id - WIDTH)),
            top_right: getSquare(parseInt(this.id - WIDTH + 1)),
            left: getSquare(parseInt(this.id - 1)),
            right: getSquare(parseInt(this.id + 1)),
            bottom_left: getSquare(parseInt(this.id + WIDTH - 1)),
            bottom: getSquare(parseInt(this.id + WIDTH)),
            bottom_right: getSquare(parseInt(this.id + WIDTH + 1))
        };
        var activeArr = [];
        for (i of Object.values(neighbors)) {
            if (i) {
                if (i.obj.active === true) {
                    activeArr.push(i);
                }
            }
        }
        if (activeArr.length < 2) {
            this.tempActive = false;
        } else if (activeArr.length === 2) {
            this.tempActive = this.active;
        } else if (activeArr.length === 3) {
            this.tempActive = true;
        } else if (activeArr.length > 3) {
            this.tempActive = false;
        }
    }
}

// represents the size that the grid should be - many values are calculated based on this value
var WIDTH = 20;
var HEIGHT = 20;
var pxWidth = (WIDTH / HEIGHT) * 500;
var GRID_SIZE = WIDTH * HEIGHT;


// passes the length of one side to the css variable --size
document.querySelector(":root").style.setProperty('--length', WIDTH);
document.querySelector(":root").style.setProperty('--width', HEIGHT);
document.querySelector(":root").style.setProperty('--pxwidth', pxWidth);
// holds each square with an id and a class object
var squares = [];
// creates DOM elements for each square
function makeSquares() {
    for (i = 0; i < GRID_SIZE; i++) {
        var square = $(`<div id="${ i }" class="square"></div>`);
        $("#squares").append(square);
        // adds object with id and Square object to squares array
        squares.push({ id: i, obj: new Square(i) });
    }
}
// finds a square in the squares array based on its id
function getSquare(id) {
    // loop through squares
    for (i of squares) {
        // if the square is on the grid
        if (0 >= i < GRID_SIZE) {
            // if the id of the object is the same as the id passed to the function
            if (i.id === id) {
                // return the object
                return i;
            }
        } else {
            // if the square is not on the board return false
            return false;
        }
    }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


$(document).ready(function() {   
    // make the board
    makeSquares();
    // when a square is clicked
    $(".square").on("click", function() {
        var square = getSquare(parseInt(this.id));
        square.obj.swapActive();
    });
    $("#increment").on("click", function() {
        for (i of squares) {
            i.obj.checkNeighbors();
        }
        for (i of squares) {
            i.obj.update();
        }
    })
    var autorun = false;
    var speed = 250;
    $("#autorun").on("click", async function() {
        if (autorun === true) {
            return;
        }
        $("#autorun").addClass("running");
        autorun = true;
        while (autorun) {
            for (i of squares) {
                i.obj.checkNeighbors();
            }
            for (i of squares) {
                i.obj.update();
            }
            await sleep(speed);
        }
    })
    $("#autorun-stop").on("click", function() {
        $("#autorun").removeClass("running");
        autorun = false;
    })
    $("#submitSpeed").on("click", function() {
        var newSpeed = $("#speed").val();
        $("#speed").val("");
        if (newSpeed < 10000) {
            speed = newSpeed;
        }
    })
    $("#rect").on("click", function() {
        $(".square").remove();
        WIDTH = 60;
        HEIGHT = 20;
        var pxWidth = (WIDTH / HEIGHT) * 500;
        GRID_SIZE = WIDTH * HEIGHT;
        document.querySelector(":root").style.setProperty('--pxwidth', pxWidth);
        $("#squares").css("grid-template-rows", `repeat(${HEIGHT}, 1fr)`)
        $("#squares").css("grid-template-columns", `repeat(${WIDTH}, 1fr)`)
        squares.length = 0;
        makeSquares();
        $(".square").off();
        $(".square").on("click", function() {
            var square = getSquare(parseInt(this.id));
            square.obj.swapActive();
        });
    })
    $("#board-lg").on("click", function() {
        $(".square").remove();
        WIDTH = 30;
        HEIGHT = 30;
        GRID_SIZE = WIDTH * HEIGHT;
        var pxWidth = (WIDTH / HEIGHT) * 500;
        document.querySelector(":root").style.setProperty('--pxwidth', pxWidth);
        $("#squares").css("grid-template-rows", `repeat(${HEIGHT}, 1fr)`)
        $("#squares").css("grid-template-columns", `repeat(${WIDTH}, 1fr)`)
        squares.length = 0;
        makeSquares();
        $(".square").off();
        $(".square").on("click", function() {
            var square = getSquare(parseInt(this.id));
            square.obj.swapActive();
        });
    })
    $("#board-md").on("click", function() {
        $(".square").remove();
        WIDTH = 20;
        HEIGHT = 20;
        GRID_SIZE = WIDTH * HEIGHT;
        var pxWidth = (WIDTH / HEIGHT) * 500;
        document.querySelector(":root").style.setProperty('--pxwidth', pxWidth);
        $("#squares").css("grid-template-rows", `repeat(${HEIGHT}, 1fr)`)
        $("#squares").css("grid-template-columns", `repeat(${WIDTH}, 1fr)`)
        squares.length = 0;
        makeSquares();
        $(".square").off();
        $(".square").on("click", function() {
            var square = getSquare(parseInt(this.id));
            square.obj.swapActive();
        });
    })
    $("#board-sm").on("click", function() {
        $(".square").remove();
        WIDTH = 10;
        HEIGHT = 10;
        GRID_SIZE = WIDTH * HEIGHT;
        var pxWidth = (WIDTH / HEIGHT) * 500;
        document.querySelector(":root").style.setProperty('--pxwidth', pxWidth);
        $("#squares").css("grid-template-rows", `repeat(${HEIGHT}, 1fr)`);
        $("#squares").css("grid-template-columns", `repeat(${WIDTH}, 1fr)`);
        squares.length = 0;
        makeSquares();
        $(".square").off();
        $(".square").on("click", function() {
            var square = getSquare(parseInt(this.id));
            square.obj.swapActive();
        });
    })
    $("#clear").on("click", function() {
        for (i of squares) {
            i.obj.makeFalse();
        }
    })


    // SHAPES -----------------------------------------------------------------------------------

    function draw(array, width, height) {
        if (WIDTH == width && HEIGHT == height) {
            for (i of squares) {
                i.obj.makeFalse();
            }
            for (i of array) {
                for (j of squares) {
                    if (j.id == i) {
                        j.obj.makeTrue();
                        break;
                    }
                }
            }
        }
    }

    $("#glider-gun").on("click", function() {
        var arr = [206, 264, 266, 314, 315, 322, 323, 336, 337, 373, 377, 382, 383, 396, 397, 422, 423, 432, 438, 442, 443, 482, 483, 492, 496, 498, 499, 504, 506, 552, 558, 566, 613, 617, 674, 675]
        draw(arr, 60, 20);
    })
    $("#hammerhead").on("click", function() {
        var arr = [101, 102, 103, 104, 105, 161, 166, 174, 175, 221, 233, 234, 236, 237, 238, 282, 292, 293, 295, 296, 297, 298, 344, 345, 349, 350, 352, 353, 356, 357, 406, 411, 414, 467, 469, 471, 473, 528, 588, 647, 649, 651, 653, 706, 711, 714, 764, 765, 769, 770, 772, 773, 776, 777, 822, 832, 833, 835, 836, 837, 838, 881, 893, 894, 896, 897, 898, 941, 946, 954, 955, 1001, 1002, 1003, 1004, 1005]
        draw(arr, 60, 20);
    })
    $("#pulsar").on("click", function() {
        var arr = [66, 67, 68, 72, 73, 74, 104, 109, 111, 116, 124, 129, 131, 136, 144, 149, 151, 156, 166, 167, 168, 172, 173, 174, 206, 207, 208, 212, 213, 214, 224, 229, 231, 236, 244, 249, 251, 256, 264, 269, 271, 276, 306, 307, 308, 312, 313, 314]
        draw(arr, 20, 20);
    })
    $("#glider-sm").on("click", function() {
        var arr = [1, 12, 20, 21, 22];
        draw(arr, 10, 10);
    })
    $("#glider-md").on("click", function() {
        var arr = [1, 22, 40, 41, 42];
        draw(arr, 20, 20);
    })
    $("#glider-lg").on("click", function() {
        var arr = [1, 32, 60, 61, 62]
        draw(arr, 30, 30);
    })
    $("#dart").on("click", function() {
        var arr = [123, 182, 184, 242, 245, 304, 362, 363, 364, 365, 423, 425, 426, 428, 482, 483, 484, 489, 490, 549, 550, 602, 603, 604, 609, 610, 663, 665, 666, 668, 722, 723, 724, 725, 784, 842, 845, 902, 904, 963]
        draw(arr, 60, 20);
    })
    $("#penta").on("click", function() {
        var arr = [109, 129, 148, 150, 169, 189, 209, 229, 248, 250, 269, 289];
        draw(arr, 20, 20);
    })
    $("#fella").on("click", function() {
        var arr = [33, 35, 44, 54, 64];
        draw(arr, 10, 10);
    })
})

