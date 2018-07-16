var sede = 'AQP';
var turma = '2016-2';
totalAndInactives();
scoreTech();
scoreHSE();
nps();
satisfaction();
jedi();
teacher();

// Contar a porcentagem de alunas ativas e inativas
function totalAndInactives(){
  var nameTotal = "Alunas presentes e desistentes"
  var inactives = 0;
  var actives = 0;
	var totalStudents = data[sede][turma]['students'].length;
	for (i in data[sede][turma]['students']){
		if (data[sede][turma]['students'][i]['active'] === false){
			inactives += 1;
		}
  }
  actives = totalStudents - inactives; 
  var total = [actives,inactives]
  pieGraph(total, nameTotal);
}

// Contar a porcentagem de alunas que excederam a pontuação tecnica por sprint
function scoreTech(){
  var nameTech = "Alunas que excederam a pontuação Tech"
  totalStudents = data[sede][turma]['students'].length
    var sprintsHitGoal = [];
    var percentHitGoal = [];
    for (i in data[sede][turma]['students']){
      for (j in data[sede][turma]['students'][i]['sprints']){
        if (data[sede][turma]['students'][i]['sprints'][j]['score']['tech'] >= 1260){ 
          if (sprintsHitGoal[j] >= 0) {
            sprintsHitGoal[j] += 1;
            percentHitGoal[j] += (1 / totalStudents);
          } else if (!sprintsHitGoal[j]){
            sprintsHitGoal[j] = 1;
            percentHitGoal[j] = (1 / totalStudents);
            var scoreTotal = [percentHitGoal, sprintsHitGoal]
          }
        }
      }
    }
  scoreGraph(scoreTotal, nameTech);
}

// Contar a porcentagem de alunas que excederam a pontuação HSE por sprint
function scoreHSE(){
  var nameHSE = "Alunas que excederem a pontuação HSE";
  totalStudents = data[sede][turma]['students'].length
    var sprintsHitGoal = [];
    var percentHitGoal = [];
    for (i in data[sede][turma]['students']){
      for (j in data[sede][turma]['students'][i]['sprints']){
        if (data[sede][turma]['students'][i]['sprints'][j]['score']['hse'] >= 840){ 
          if (sprintsHitGoal[j] >= 0) {
            sprintsHitGoal[j] += 1;
            percentHitGoal[j] += (1 / totalStudents);
          } else if (!sprintsHitGoal[j]){
            sprintsHitGoal[j] = 1;
            percentHitGoal[j] = (1 / totalStudents);
            var scoreTotal = [percentHitGoal, sprintsHitGoal]
           }
        }
      }
    }
    scoreGraph(scoreTotal, nameHSE);
  }

// Calcular NPS por Sprint 
function nps(){
  var sprintNPS = [];
  for (i in data[sede][turma]['ratings']){
    var resultNPS = 0;
    resultNPS = data[sede][turma]['ratings'][i]['nps']['promoters'] - data[sede][turma]['ratings'][i]['nps']['detractors'];
    sprintNPS.push(resultNPS/100);
  }
  npsGraph(sprintNPS);
}
////Calcular nota teacher
function teacher(){
  var scoreTeacher = 0;
  var resultTeacher =  0;
  for (i in data[sede][turma]['ratings']){
    resultTeacher += data[sede][turma]['ratings'][i]['teacher'];
    scoreTeacher = resultTeacher / data[sede][turma]['ratings'].length;
    
  };
}

//Calcular nota Jedi
function jedi(){
  var scoreJedi = 0;
  var resultJedi = 0;

  for (i in data[sede][turma]['ratings']){
    resultJedi += data[sede][turma]['ratings'][i]['jedi'];
    scoreJedi = resultJedi / data[sede][turma]['ratings'].length;
  }
}
//Calcular satisfação de Alunas
function satisfaction(){
  var satisfactionStudent = [];
  for (i in data[sede][turma]['ratings']){
    var resultSatisfaction = 0;
    resultSatisfaction = data[sede][turma]['ratings'][i]['student']['cumple'] + data[sede][turma]['ratings'][i]['student']['supera'];
    satisfactionStudent.push(resultSatisfaction/100);
  }
}

// Gráficos 
function pieGraph(value, nameGraph) {
  var divItem = document.createElement('div');
  var newGraph = document.createElement('div');
  var mainContent = document.querySelector('main');
  var graphTitle = document.createElement('h3');
  graphTitle.textContent = nameGraph;
  divItem.className = "item";
  divItem.appendChild(graphTitle);
  divItem.appendChild(newGraph);
  mainContent.appendChild(divItem);

  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(function(){
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
    var options = { 'width':400,
                    'height':300,
                    pieSliceTextStyle: {
                      color: 'black',
                    },
                    pieHole: 0.6,};

    var chart = new google.visualization.PieChart(newGraph);
    chart.draw(data, options);
  }
}

function scoreGraph(value, nameGraph) {
  var divItem = document.createElement('div');
  var newGraph = document.createElement('div');
  var mainContent = document.querySelector('main');
  var graphTitle = document.createElement('h3');
  graphTitle.textContent = nameGraph;
  divItem.className = "item";
  divItem.appendChild(graphTitle);
  divItem.appendChild(newGraph);
  mainContent.appendChild(divItem);

  google.charts.load('current', {'packages':['line']});
  google.charts.setOnLoadCallback(function(){
    drawChart(value);
  });
  function drawChart(valueGraph) {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Sprints');
    data.addColumn('number', 'Students');
    data.addRows([
      ['Sprint 1',  valueGraph[0][0]],
      ['Sprint 2',  valueGraph[0][1]],
      ['Sprint 3',  valueGraph[0][2]],
      ['Sprint 4',  valueGraph[0][3]]
    ]);

    var options = {
      width: 600,
      height: 500,
      vAxis: {
        viewWindow: { min: 0, max: 1 },	
        format: "percent"
      }
    }
    var chart = new google.charts.Line(newGraph);
    chart.draw(data, google.charts.Line.convertOptions(options));
  }
}

function npsGraph(value){
  google.charts.load('current', {'packages':['line']});
  google.charts.setOnLoadCallback(function(){
    drawChart(value);
  });
  function drawChart(valueGraph) {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Sprints');
    data.addColumn('number', 'NPS');
    data.addRows([
      ['Sprint 1',  valueGraph[0]],
      ['Sprint 2',  valueGraph[1]],
      ['Sprint 3',  valueGraph[2]],
      ['Sprint 4',  valueGraph[3]]
    ]);

    var options = {
      chart: {
        title: 'NPS médio por Sprint',
      },
      curveType: 'function',
      width: 500,
      height: 300,
      vAxis: {
        viewWindow: { min: 0, max: 1 },	
        format: "percent"
      }
    };

    var chart = new google.charts.Line(document.getElementById('chart-NPS'));
    chart.draw(data, google.charts.Line.convertOptions(options));
  }
}