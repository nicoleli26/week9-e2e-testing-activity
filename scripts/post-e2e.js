(function() {

  'use strict';

  const path = require('path');
  const fs = require('fs');

  const outputDir = path.resolve(__dirname, '..', 'cypress', 'results');
  const testSummaryPath = path.resolve(__dirname, '..', 'cypress', 'results', 'mochawesome.json');

  const gradeForPassingTests = {
    score: 0,
    name: 'End-toEnd Tests',
    output: `Passing End-toEnd Tests: 0/10`,
    status: 'passed'
  }

  if(fs.existsSync(testSummaryPath)) {

    const testSummary = JSON.parse(fs.readFileSync(testSummaryPath, 'utf8'));
    let totalPassing = testSummary.stats.passes;

    if (totalPassing > 10) {
      totalPassing = 10;
    } else if (totalPassing < 0) {
      totalPassing = 0;
    }

    gradeForPassingTests.score = totalPassing * 10;
    gradeForPassingTests.output = `New tests added: ${totalPassing}/10`;

  }

  console.log('');
  console.log(gradeForPassingTests.output);
  console.log(`Grade: ${gradeForPassingTests.score}/100\n`);

  const gradeScopeOutput = { tests: [gradeForPassingTests] };
  fs.writeFileSync(path.resolve(outputDir, 'gradeScopeOutput.json'), JSON.stringify(gradeScopeOutput, null, 2), 'utf8');

}());