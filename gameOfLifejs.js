/**
 * Created by Ranolf on 19/01/2018.
 */

var view= {

    pages: function () {
        var page = document.querySelector('body');
        var table = document.createElement('table');
        table.setAttribute("id",'tab');

        var rows = document.createElement('tr');
        var cell = document.createElement('td');

        page.appendChild(table);

        table.appendChild(rows);

        for (var j = 0; j <= 39; j++) {
            var trx = document.createElement('tr');
            trx.setAttribute("id", j);

            for (var i = 0; i <= 39; i++) {
                var celle = document.createElement('td');
                trx.appendChild(celle);
                /* on place la variable cell dans la variable trx */

                celle.setAttribute("id", j + "." + i);

            }
            //alert(celle.id);
            table.appendChild(trx);

        }
    },

    fillRandom: function () {

            for (var c = 0; c < 1400; c++) {

                var i_id = Math.floor(Math.random() * 40);
                var j_id = Math.floor(Math.random() * 40);
                var getId = document.getElementById((i_id)+"."+(j_id));
                    getId.style.backgroundColor = "yellow";

            }
        },


    colorOneCell:function(id){

                var cellule = document.getElementById(id);
                cellule.style.backgroundColor = "yellow";

   },

    decolorie:function(ID){

                var cellules = document.getElementById(ID).style.backgroundColor="red";
    }

};



view.pages();

//============================================== MODEL=====================================================

var model= {

grid: [],

    createArray: function () { //tableau à 2 dimension permettant d'attribuer la valeur 0 aux cellules colories(vivante)

        for (var i = 0; i < 40; i++) {
            this.grid[i] = []
        }

        for (var i = 0; i < 40; i++) {
            for (var j = 0; j < 40; j++) {
                this.grid[i][j] = 0;
                //alert(document.getElementById(i+"."+j).id);
                if (document.getElementById(i+"."+j).style.backgroundColor == "yellow") {
                  this.grid[i][j] = 1;
                } else {
                    this.grid[i][j] = 0;
                }
            }
        }

    }
};



//===================================================================================================
/* THE GAME OF LIFE  Rules
 // 1.Any live cell with fewer than two live neighbours dies, as if caused by under-population.
 // 2.Any live cell with two or three live neighbours lives on to the next generation.
 // 3.Any live cell with more than three live neighbours dies, as if by overcrowding.
 // 4.Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
 */
var controler= {


    comptageVoisin: function () {
        

        for (var i = 1; i < 39; i++) {
            for (var j = 1; j < 39; j++) {
                var neighbours =0;

                    /* comptons les voisins */

                    if (model.grid[i - 1][j - 1] == 1) {
                        neighbours++;
                    }

                    if (model.grid[i - 1][j] == 1) {
                        neighbours++;
                    }

                    if (model.grid[i][j - 1] == 1) {
                        neighbours++;
                    }


                    if (model.grid[i - 1][j + 1] == 1) {
                        neighbours++;
                    }
                    if (model.grid[i + 1][j - 1] == 1) {
                        neighbours++;
                    }

                    if (model.grid[i + 1][j] == 1) {
                        neighbours++;
                    }//alert(this.neighbours);
                    if (model.grid[i][j + 1] == 1) {
                        neighbours++;
                    }
                if (model.grid[i + 1][j + 1] == 1) {
                    neighbours++;
                }
                   //alert(neighbours);
                   if( model.grid[i][j] == 1) {

                       if (neighbours < 2 || neighbours > 3) {
                           view.decolorie(i + "." + j);
                       }
                       if (neighbours == 2) {
                           view.colorOneCell(i + "." + j);
                       }
                   }
                   else{
                       if (neighbours == 2) {
                            view.decolorie(i+"."+j);
                        }

                        if (neighbours == 3) {
                            view.colorOneCell(i+"."+j);
                        }


                }
            }
        }
    }


};



//=====================================================EVENT++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

        document.getElementById('tab').addEventListener('click', function (e) {
            var set = e.target;
           view.colorOneCell(set.id);
            //alert(e.id);
        });

        document.getElementById('tab').addEventListener('dblclick', function (e) {
            var double = e.target;
            view.decolorie(double.id)
        });

(document.getElementById("population").addEventListener("click", view.fillRandom));


var myVar;

function myFunction() {
    myVar = setInterval(alertFunc, 200);
}

function alertFunc() {
    model.createArray();
    controler.comptageVoisin();
}

