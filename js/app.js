var sede = 'AQP';
var turma = '2016-2';
var studentsTotal = totalAndInactives();

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
                    'height':300};

    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}
}

scoreTech();
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
          percentHitGoal[j] += (1 / totalStudents * 100);
        } else if (!sprintsHitGoal[j]){
          sprintsHitGoal[j] = 1;
          percentHitGoal[j] = (1 / totalStudents * 100);
        }
      }
    }
  }
}

//console.log(data[sede][turma]['students'][i]['name'] + ":" + data[sede][turma]['students'][i]['sprints'][0]['score']['tech'])
// console.log(data[sede][turma]['students'][i]['name'] + "-" + data[sede]['2016-2']['students'][i]['active']);
// listaProgramadoras.appendChild(img);
// var listaProgramadoras = document.getElementById('exibe-programadoras');