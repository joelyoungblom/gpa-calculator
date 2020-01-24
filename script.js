document.addEventListener('DOMContentLoaded', initialize);

function initialize() {
  document.addEventListener('input', calculate);
  document.getElementById('add-row').addEventListener('click', addRow);

  calculate();
}

function calculate() {
  try {
    // calculateProjectedTermGPA();
    // calculateResults();

    // cumulative gpa
    const qualityPoints = parseFloat( document.getElementById('quality-points').value );
    const gpaHours = parseFloat( document.getElementById('gpa-hours').value );
    document.getElementById('cumulative-gpa').value = 
      document.getElementById('results-cumulative-gpa').value = 
      ( qualityPoints / gpaHours ).toFixed(2);

    // projected gpa
    const grades = document.getElementsByName('grade[]');
    const credits = document.getElementsByName('credits[]');
    const points = document.getElementsByClassName('points');
    const quality = document.getElementsByClassName('quality');

    let creditTotal = qualityTotal = 0;
    const numRows = grades.length;
    for( let i=0; i<numRows; i++ ) {
      if( grades[i].value ) {
        points[i].value = parseFloat( grades[i].value ).toFixed(2);

        if( credits[i].value ) {
          quality[i].value = parseFloat( grades[i].value * credits[i].value ).toFixed(2);

          creditTotal += parseFloat( credits[i].value );
          qualityTotal += parseFloat( quality[i].value );
        }
      }
    }
    document.getElementById('results-term-credits').value = parseFloat( creditTotal ).toFixed(2);
    document.getElementById('results-term-quality-points').value = parseFloat( qualityTotal ).toFixed(2);
    document.getElementById('projected-term-gpa').value = 
      document.getElementById('results-projected-term-gpa').value = 
      parseFloat( qualityTotal / creditTotal ).toFixed(2);

    const totalCredits = gpaHours + creditTotal; 
    const totalPoints = qualityPoints + qualityTotal;
    document.getElementById('results-projected-cumulative-gpa').value = ( totalPoints / totalCredits ).toFixed(2);
  } catch (err) {
    console.log( "Error: " + err );
  }
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

/**
 * Adds row to table based on html template in document. Updates id and for
 * attributes to be unique and match as new rows are added. 
 */
function addRow() {
  try {
    // get pointer to row template
    const template = document.querySelector('#term-row');
    let clone = document.importNode( template.content, true );

    // find out how many rows already exist and add 1
    const number = document.querySelectorAll('#projected tbody tr').length + 1;

    // update ids and labels
    let newId, label;
    let formObjects = clone.querySelectorAll('[id*="-n"]');
    formObjects.forEach( function(object) {
      // pointer to label for object
      label = clone.querySelector('[for="' + object.id + '"]');
      // compose new id
      newId = object.id.replace( /(.*)-n/, '$1' + number );

      // apply new ids
      label.htmlFor = newId;
      object.id = newId;
    });

    // add row
    document.querySelector('#projected tbody').appendChild( clone );
  } catch (err) {
    console.log( "Error: " + err );
  }
}

