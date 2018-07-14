var sede = 'CDMX';
var turma = '2017-1';
var studentsTotal = totalAndInactives();

// Contar o total de alunas ativas e inativas
function totalAndInactives(){
  var activesPercent = 0;
  var inactivesPercent = 0;
  var inactives = 0;
	var totalStudents = data[sede][turma]['students'].length;
	for (i in data[sede][turma]['students']){
		if (data[sede][turma]['students'][i]['active'] === false){
			inactives += 1;
		}
  }
  inactivesPercent += (inactives/totalStudents * 100);
  activesPercent += 100% - inactivesPercent;
  var total = [activesPercent,inactivesPercent]
  pieGraph(total);
}

function pieGraph(value) {
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(function () {
  drawChart(value);
});
  function drawChart(valueGraph) {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Status');
    data.addColumn('number', 'Porcentagem');
    data.addRows([
      ['Ativas', valueGraph[0]],
      ['Inativas', valueGraph[1]]
    ]);

    var options = {'title':'Total e Desistencia',
                    'width':400,
                    'height':300};

    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}
}


// console.log(data[sede][turma]['students'][i]['name'] + "-" + data[sede]['2016-2']['students'][i]['active']);
// listaProgramadoras.appendChild(img);
// var listaProgramadoras = document.getElementById('exibe-programadoras');