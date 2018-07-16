var sede = 'AQP';
var turma = '2016-2';
totalAndInactives();
scoreTech();
scoreHSE();
nps();

dataTest = {
  'AQP': {
    '2016-2': {
      'students': [
        {
          'name': 'Donna Sloper',
          'photo': 'http://dummyimage.com/162x148.png/ff4444/ffffff',
          'active': true,
          'sprints': [
            {
              'number': 1,
              'score': {
                'tech': 1213,
                'hse': 854
              }
            },
            {
              'number': 2,
              'score': {
                'tech': 1286,
                'hse': 918
              }
            },
            {
              'number': 3,
              'score': {
                'tech': 1629,
                'hse': 670
              }
            },
            {
              'number': 4,
              'score': {
                'tech': 1140,
                'hse': 1017
              }
            }
          ]
        },
        {
          'name': 'Roana Menego',
          'photo': 'http://dummyimage.com/102x187.png/dddddd/000000',
          'active': false,
          'sprints': [
            {
              'number': 1,
              'score': {
                'tech': 1114,
                'hse': 894
              }
            },
            {
              'number': 2,
              'score': {
                'tech': 1724,
                'hse': 984
              }
            },
            {
              'number': 3,
              'score': {
                'tech': 1034,
                'hse': 632
              }
            },
            {
              'number': 4,
              'score': {
                'tech': 1575,
                'hse': 927
              }
            }
          ]
        },
        {
          'name': 'Ofella Weakley',
          'photo': 'http://dummyimage.com/190x155.png/dddddd/000000',
          'active': false,
          'sprints': [
            {
              'number': 1,
              'score': {
                'tech': 913,
                'hse': 884
              }
            },
            {
              'number': 2,
              'score': {
                'tech': 1021,
                'hse': 887
              }
            },
            {
              'number': 3,
              'score': {
                'tech': 1153,
                'hse': 945
              }
            },
            {
              'number': 4,
              'score': {
                'tech': 1701,
                'hse': 950
              }
            }
          ]
        },
        {
          'name': 'Gretchen Gerhts',
          'photo': 'http://dummyimage.com/147x166.png/5fa2dd/ffffff',
          'active': false,
          'sprints': [
            {
              'number': 1,
              'score': {
                'tech': 1740,
                'hse': 672
              }
            },
            {
              'number': 2,
              'score': {
                'tech': 1784,
                'hse': 1194
              }
            },
            {
              'number': 3,
              'score': {
                'tech': 1516,
                'hse': 649
              }
            },
            {
              'number': 4,
              'score': {
                'tech': 1316,
                'hse': 1072
              }
            }
          ]
        },
        {
          'name': 'Judy Meindl',
          'photo': 'http://dummyimage.com/220x128.png/5fa2dd/ffffff',
          'active': true,
          'sprints': [
            {
              'number': 1,
              'score': {
                'tech': 1004,
                'hse': 631
              }
            },
            {
              'number': 2,
              'score': {
                'tech': 1102,
                'hse': 1050
              }
            },
            {
              'number': 3,
              'score': {
                'tech': 1138,
                'hse': 969
              }
            },
            {
              'number': 4,
              'score': {
                'tech': 1638,
                'hse': 871
              }
            }
          ]
        }
      ],
      'ratings': [
        {
          'sprint': 1,
          'nps': {
            'promoters': 97,
            'passive': 3,
            'detractors': 0
          },
          'student': {
            'no-cumple': 0,
            'cumple': 80,
            'supera': 20
          },
          'teacher': 4.7,
          'jedi': 4.9
        },
        {
          'sprint': 2,
          'nps': {
            'promoters': 81,
            'passive': 17,
            'detractors': 2
          },
          'student': {
            'no-cumple': 14,
            'cumple': 83,
            'supera': 3
          },
          'teacher': 4.4,
          'jedi': 4.3
        },
        {
          'sprint': 3,
          'nps': {
            'promoters': 87,
            'passive': 15,
            'detractors': 8
          },
          'student': {
            'no-cumple': 9,
            'cumple': 72,
            'supera': 19
          },
          'teacher': 3.4,
          'jedi': 4.1
        }
      ]
    }
  }
}

// Contar a porcentagem de alunas ativas e inativas
function totalAndInactives(){
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
  pieGraph(total);
}

// Contar a porcentagem de alunas que excederam a pontuação tecnica por sprint
function scoreTech(){
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
  techGraph(scoreTotal);
}

// Contar a porcentagem de alunas que excederam a pontuação HSE por sprint
function scoreHSE(){
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
    hseGraph(scoreTotal);
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

// Gráficos 
function pieGraph(value) {
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
    var options = {'title':'Total e Desistencia',
                    'width':400,
                    'height':300,
                     pieHole: 0.3,};

    var chart = new google.visualization.PieChart(document.getElementById('chart-totalInactives'));
    chart.draw(data, options);
  }
}

function techGraph(value) {
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
      chart: {
        title: 'Alunas que excederam a pontuação Tech',
      },
      width: 600,
      height: 500,
      vAxis: {
        viewWindow: { min: 0, max: 1 },	
        format: "percent"
      }
    };

    var chart = new google.charts.Line(document.getElementById('chart-techScore'));
    chart.draw(data, google.charts.Line.convertOptions(options));
  }
}

function hseGraph(value) {
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
      chart: {
        title: 'Alunas que excederam a pontuação HSE',
      },
      width: 600,
      height: 500,
      vAxis: {
        viewWindow: { min: 0, max: 1 },	
        format: "percent"
      }
    };

    var chart = new google.charts.Line(document.getElementById('chart-hseScore'));
    chart.draw(data, google.charts.Line.convertOptions(options));
  }
  console.log("grafico hse")
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


function teacher(){
  var scoreTeacher = [];
  for (i in data[sede][turma]['ratings']){
    var resultTeacher = 0;
    resultTeacher = data[sede][turma]['ratings'][i]['teacher'] / data[sede][turma]['ratings'][i]['teacher'].length;
    scoreTeacher.push(resultTeacher);
    
  }
}
function jedi(){
  var scoreJedi = [];
  for (i in data[sede][turma]['ratings']){
    var resultJedi = 0;
    resultJedi = data[sede][turma]['ratings'][i]['jedi'] / data[sede][turma]['ratings'][i]['jedi'].length;
    scoreJedi.push(resultJedi);
    
  }
}
function satisfaction(){
  var satisfactionStudent = [];
  for (i in data[sede][turma]['ratings']){
    var resultSatisfaction = 0;
    resultSatisfaction = data[sede][turma]['ratings'][i]['student']['cumple'] + data[sede][turma]['ratings'][i]['student']['supere'];
    satisfactionStudent.push(resultSatisfaction/100);
  }console.log(satisfactionStudent);
}


//console.log(data[sede][turma]['students'][i]['name'] + ":" + data[sede][turma]['students'][i]['sprints'][0]['score']['tech'])
// console.log(data[sede][turma]['students'][i]['name'] + "-" + data[sede]['2016-2']['students'][i]['active']);
// listaProgramadoras.appendChild(img);
// var listaProgramadoras = document.getElementById('exibe-programadoras');