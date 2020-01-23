
// event listeners
document.addEventListener('DOMContentLoaded', function() { calculate(); });
document.addEventListener('input', function() { calculate(); });

function calculate() {
  try {
    calculateCumulativeGPA();
    calculateProjectedTermGPA();
    calculateResults();
  } catch (err) {
    console.log( "Error: " + err );
  }
}

function calculateCumulativeGPA() {
  let qualityPoints = parseFloat( document.getElementById('quality-points').value );
  let gpaHours = parseFloat( document.getElementById('gpa-hours').value );
  const cumulativeGPA = document.getElementById('cumulative-gpa');
  const resultsCumulativeGPA = document.getElementById('results-cumulative-gpa'); 
  resultsCumulativeGPA.value = cumulativeGPA.value = parseFloat( qualityPoints / gpaHours ).toPrecision(2);
}
function calculateProjectedTermGPA() {
  const lg = document.getElementsByName('letter-grade');
  const nc = document.getElementsByName('number-credits');
  const ppc = document.getElementsByName('points-per-credit'); 
  const qp = document.getElementsByName('quality-points');
  let i; const length = lg.length;
  let ncTotal = 0, qpTotal = 0;
  // loop through all projected rows
  for( i=0; i<length; i++ ) {
    if( lg[i].value ) {
      ppc[i].value = parseFloat( lg[i].value ).toFixed(2);
      if( nc[i].value ) {
        qp[i].value = parseFloat( lg[i].value * nc[i].value ).toFixed(2);
        ncTotal += parseFloat( nc[i].value );
        qpTotal += parseFloat( qp[i].value );
      }
    }
  }
  const projectedTermGPA = document.getElementById('projected-term-gpa');
  const resultsProjectedTermGPA = document.getElementById('results-projected-term-gpa');
  const resultsTermCredits = document.getElementById('results-term-credits');
  const resultsTermQualityPoints = document.getElementById('results-term-quality-points');
  resultsTermCredits.value = ncTotal.toFixed(2);
  resultsTermQualityPoints.value = qpTotal.toFixed(2);
  resultsProjectedTermGPA.value = projectedTermGPA.value = parseFloat( qpTotal / ncTotal ).toFixed(2);
}
function calculateResults() {
  const resultsProjectedCumulativeGPA = document.getElementById('results-projected-cumulative-gpa');
  const resultsTermCredits = document.getElementById('results-term-credits');
  const resultsTermQualityPoints = document.getElementById('results-term-quality-points');
  let qualityPoints = parseFloat( document.getElementById('quality-points').value );
  let gpaHours = parseFloat( document.getElementById('gpa-hours').value );
  let totalCredits = gpaHours + parseFloat( resultsTermCredits.value );
  let totalPoints = qualityPoints + parseFloat( resultsTermQualityPoints.value );
  resultsProjectedCumulativeGPA.value = ( totalPoints / totalCredits ).toFixed(2);
}
