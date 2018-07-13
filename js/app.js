
var sede = 'AQP';
var turma = '2016-2';
// totalAndInactives();
var inactivesPercent = 0;
var activesPercent = 0;

// Contar o total de alunas e alunas inativas
// function totalAndInactives(){
  var inactives = 0;
	var totalStudents = data[sede][turma]['students'].length;
	for (i in data[sede][turma]['students']){
		if (data[sede][turma]['students'][i]['active'] === false){
			inactives += 1;
		}
  }
  inactivesPercent += (inactives/totalStudents * 100);
  activesPercent += 100% - inactivesPercent;
// }

console.log(inactivesPercent + "" + activesPercent)

  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Status');
      data.addColumn('number', 'Porcentagem');
      data.addRows([
        ['Ativas', activesPercent],
        ['Inativas',inactivesPercent]
      ]);

      var options = {'title':'Total e Desistencia',
                      'width':400,
                      'height':300};

      var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
      chart.draw(data, options);
  }






// console.log(totalStudents);
// 
// console.log(inactivesPercent);
// console.log(data[sede]['2016-2']['students']);
// console.log(data[sede]['2016-2']['students'].length);
// console.log(data[sede][turma]['students'][i]['name'] + "-" + data[sede]['2016-2']['students'][i]['active']);

// img.src = data[sede][turma]['students'][i]['photo'];
// listaProgramadoras.appendChild(img);
// var listaProgramadoras = document.getElementById('exibe-programadoras');