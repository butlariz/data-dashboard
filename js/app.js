var dropSede = document.getElementById('drop-sede');
dropSede.addEventListener('change', carregaTurmas);
var dropTurma = document.getElementById('drop-turma');
dropTurma.addEventListener('change', loadGraph);
var mainContent = document.querySelector('main');
timer();

function timer()
{
        var d = new Date();
        document.getElementById('date').innerHTML = d.toLocaleTimeString();
       
        setTimeout('timer()', 1000);
}

window.onload = carregaSedes();

function carregaSedes(){ 
    var nome = document.createElement('option');
    nome.innerHTML = 'selecione sede';
    nome.value = 'none';
    dropSede.appendChild(nome);
    for (eachSede in data){
        var itemMenu = document.createElement('option');
        itemMenu.value = eachSede;
        itemMenu.innerHTML = eachSede;
        dropSede.appendChild(itemMenu);

    }
};
function carregaTurmas(){
  var nome = document.createElement('option');
  nome.innerHTML = 'selecione turma';
  nome.value = 'none';
  dropTurma.appendChild(nome);
    dropTurma.innerHTML='';
  for (eachTurma in data[dropSede.value]){
    console.log(eachTurma);
      var itemMenu = document.createElement('option');
      itemMenu.value = eachTurma;
      itemMenu.innerHTML = eachTurma;
      dropTurma.appendChild(itemMenu);

  }
}

function loadGraph(){
  mainContent.innerHTML='';
  totalAndInactives();
  scoreExceed();
  nps();
  scoreTech();
  scoreHSE();
  jedi();
  teacher();
  satisfaction();
  
}    


// Contar a porcentagem de alunas ativas e inativas
function totalAndInactives(){
  var nameTotal = "Alunas presentes e desistentes"
  var inactives = 0;
  var actives = 0;
	var totalStudents = data[dropSede.value][dropTurma.value]['students'].length;
	for (i in data[dropSede.value][dropTurma.value]['students']){
		if (data[dropSede.value][dropTurma.value]['students'][i]['active'] === false){
			inactives += 1;
		}
  }
  actives = totalStudents - inactives; 
  var total = [actives,inactives]
  var legendGraph = [];
  legendGraph[0] = "Ativas";
  legendGraph[1] = "Inativas";
  pieGraph(total, nameTotal, legendGraph);
}

// Comparação excedem
function scoreExceed(){
  var nameExceed = "Alunas que excederam a pontuação Tech e HSE"
  totalStudents = data[dropSede.value][dropTurma.value]['students'].length
    var sprintsHitGoal = [];
    var percentHitGoal = [];
    for (i in data[dropSede.value][dropTurma.value]['students']){
      for (j in data[dropSede.value][dropTurma.value]['students'][i]['sprints']){
        if (data[dropSede.value][dropTurma.value]['students'][i]['sprints'][j]['score']['hse'] >= 840 && data[dropSede.value][dropTurma.value]['students'][i]['sprints'][j]['score']['tech'] >= 1260){ 
          if (percentHitGoal[j] >= 0) {
            percentHitGoal[j] += (1 / totalStudents);
            sprintsHitGoal += 1;
          } else if (!percentHitGoal[j]){
            percentHitGoal[j] = (1 / totalStudents);
            sprintsHitGoal = 1;
            var scoreTotal = percentHitGoal
           }
        }
      }
    }
    sprintGraph(scoreTotal, nameExceed, sprintsHitGoal)
  }

// Calcular NPS por Sprint 
function nps(){
  var nameNPS = "NPS médio por sprint";
  var sprintNPS = [];
  var sprintPercent = [];

  for (i in data[dropSede.value][dropTurma.value]['ratings']){
    var resultNPS = 0;
    resultNPS = data[dropSede.value][dropTurma.value]['ratings'][i]['nps']['promoters'] - data[dropSede.value][dropTurma.value]['ratings'][i]['nps']['detractors'];
    sprintPercent.push(resultNPS);
    sprintNPS.push(resultNPS/100);
  }

  var mediaSprint = sprintPercent.reduce( function( acum, elem ) {
    return acum + elem;
});

  var mediaNPS = (mediaSprint / 4) + "%";
  sprintGraph(sprintNPS, nameNPS, mediaNPS);
}

// Contar a porcentagem de alunas que excederam a pontuação tecnica por sprint
function scoreTech(){
  var nameTech = "Alunas que excederam a pontuação Tech"
  totalStudents = data[dropSede.value][dropTurma.value]['students'].length
    var sprintsHitGoal = [];
    var percentHitGoal = [];
    for (i in data[dropSede.value][dropTurma.value]['students']){
      for (j in data[dropSede.value][dropTurma.value]['students'][i]['sprints']){
        if (data[dropSede.value][dropTurma.value]['students'][i]['sprints'][j]['score']['tech'] >= 1260){ 
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
  var nameHSE = "Alunas que excederam a pontuação HSE";
  totalStudents = data[dropSede.value][dropTurma.value]['students'].length
    var sprintsHitGoal = [];
    var percentHitGoal = [];
    for (i in data[dropSede.value][dropTurma.value]['students']){
      for (j in data[dropSede.value][dropTurma.value]['students'][i]['sprints']){
        if (data[dropSede.value][dropTurma.value]['students'][i]['sprints'][j]['score']['hse'] >= 840){ 
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

//Calcular nota teacher
function teacher(){
  var nameTeacher = "Nota média Mentores"
  var scoreTeacher = 0;
  var resultTeacher =  0;
  for (i in data[dropSede.value][dropTurma.value]['ratings']){
    resultTeacher += data[dropSede.value][dropTurma.value]['ratings'][i]['teacher'];
    scoreTeacher = resultTeacher / data[dropSede.value][dropTurma.value]['ratings'].length;
  }
  totalTeacher = [scoreTeacher, 5 - scoreTeacher];
  var legendGraph = [];
  legendGraph[0] = "Média";
  legendGraph[1] = "Restante";
  pieGraph(totalTeacher, nameTeacher, legendGraph);
}

//Calcular nota Jedi
function jedi(){
  var nameJedi = "Nota média Jedi"
  var scoreJedi = 0;
  var resultJedi = 0;

  for (i in data[dropSede.value][dropTurma.value]['ratings']){
    resultJedi += data[dropSede.value][dropTurma.value]['ratings'][i]['jedi'];
    scoreJedi = resultJedi / data[dropSede.value][dropTurma.value]['ratings'].length;
  }
  totalJedi = [scoreJedi, 5 - scoreJedi];
  var legendGraph = [];
  legendGraph[0] = "Media";
  legendGraph[1] = "Restante";
  pieGraph(totalJedi, nameJedi, legendGraph);
}

//Calcular satisfação de Alunas
function satisfaction(){
  var nameSatisfaction = "Alunas satisfeitas"
  var percentStudent = [];
  var satisfactionStudent = [];
  for (i in data[dropSede.value][dropTurma.value]['ratings']){
    var resultSatisfaction = 0;
    resultSatisfaction = data[dropSede.value][dropTurma.value]['ratings'][i]['student']['cumple'] + data[dropSede.value][dropTurma.value]['ratings'][i]['student']['supera'];
    percentStudent.push(resultSatisfaction)
    satisfactionStudent.push(resultSatisfaction/100);
  }

  var mediaSprint = percentStudent.reduce( function( acum, elem ) {
    return acum + elem;
  });

  var mediaSatisfaction = (mediaSprint / 4) + "%";
  sprintGraph(satisfactionStudent, nameSatisfaction, mediaSatisfaction);
}

// Gráficos 
function pieGraph(value, nameGraph, status) {
  var divItem = document.createElement('div');
  createHtml(nameGraph,divItem);
  var newGraph = document.createElement('div');
  divItem.appendChild(newGraph);

  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(function(){
    drawChart(value, status);
  });
  function drawChart(valueGraph, statusGraph) {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Status');
    data.addColumn('number', 'Porcentagem');
    data.addRows([
      [statusGraph[0], valueGraph[0]],
      [statusGraph[1], valueGraph[1]]
    ]);
    var options = { 'width':330,
                    'height':350,
                    colors:['#f7b617','#feffa6'],
                    pieSliceTextStyle: {
                      color: 'black',
                    },
                    chartArea:{width: '90%'},
                    pieHole: 0.6,};

    var chart = new google.visualization.PieChart(newGraph);
    chart.draw(data, options);
  }
}

function scoreGraph(value, nameGraph) {
  var divItem = document.createElement('div');
  createHtml(nameGraph,divItem);
  var infoGraph = document.createElement('div');
  var newGraph = document.createElement('div');
  infoGraph.className = "info-graphic";
  divItem.appendChild(infoGraph);
  divItem.appendChild(newGraph);

  for(i in value[1]){
    var counter = parseInt(i);
    var itemInfo = document.createElement('span');
    itemInfo.className = "info-sprint"
    itemInfo.innerHTML  = "<h3>" + value[1][i] + "</h3>"
    itemInfo.innerHTML += "<span> Students </span>"
    itemInfo.innerHTML += "<span> Sprint " + (counter + 1) + "</span>"
    infoGraph.appendChild(itemInfo);
  }

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
      width: 445,
      height: 500,
      vAxis: {
        viewWindow: { min: 0, max: 1 },	
        format: "percent"
      },
      legend: { position: 'none' }
    }
    var chart = new google.charts.Line(newGraph);
    chart.draw(data, google.charts.Line.convertOptions(options));
  }
}

function sprintGraph(value, nameGraph, valueTitle){
  var divItem = document.createElement('div');
  createHtml(nameGraph,divItem);
  var infoGraph = document.createElement('div');
  var newGraph = document.createElement('div');
  infoGraph.className = "info-graphic";
  divItem.appendChild(infoGraph);
  divItem.appendChild(newGraph);

  var itemInfo = document.createElement('span');
  itemInfo.innerHTML  = "<h3>" + valueTitle + "</h3>"
  itemInfo.innerHTML += "<span> Média </span>"
  infoGraph.appendChild(itemInfo);

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
      curveType: 'function',
      width: 280,
      height: 290,
      legend: { position: 'none' },
      vAxis: {
        viewWindow: { min: 0, max: 1 },	
        format: "percent"
      }
    };

    var chart = new google.charts.Line(newGraph);
    chart.draw(data, google.charts.Line.convertOptions(options));
  }
}

function createHtml(nameGraph, divItemLocal){
  var graphTitle = document.createElement('h2');
  graphTitle.textContent = nameGraph;
  console.log(graphTitle);
  divItemLocal.className = "item";
  divItemLocal.appendChild(graphTitle);
  mainContent.appendChild(divItemLocal);
}
