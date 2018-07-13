
var sede = 'AQP';
var turma = '2016-2';

// Contar o total de alunas e alunas inativas
function totalAndInactives(){
  var inactives = 0;
	var totalStudents = data[sede][turma]['students'].length;
	for (i in data[sede][turma]['students']){
		if (data[sede][turma]['students'][i]['active'] === false){
			inactives += 1;
		}
  }
}

// console.log(totalStudents);
// var inactivesPercent = (inactives/totalStudents * 100);
// console.log(inactivesPercent);
// console.log(data[sede]['2016-2']['students']);
// console.log(data[sede]['2016-2']['students'].length);
// console.log(data[sede][turma]['students'][i]['name'] + "-" + data[sede]['2016-2']['students'][i]['active']);

// img.src = data[sede][turma]['students'][i]['photo'];
// listaProgramadoras.appendChild(img);
// var listaProgramadoras = document.getElementById('exibe-programadoras');