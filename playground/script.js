/* eslint-disable no-undef */
/* eslint-disable no-console */
const inputFile = document.getElementById('input-file');
const button = document.getElementById('parse-btn');

let tempFile;

const parseExcel = file => {
  file
    .arrayBuffer()
    .then(async result => {
      const mainWorkbook = new window.ExcelJS.Workbook();
      const workbook = await mainWorkbook.xlsx.load(result);
      const data = [];
      workbook.eachSheet(sheet => {
        sheet.eachRow((row, rowIndex) => {
          data.push(row.values);
        });
      });

      console.log('result: ', data);
    })
    .catch(error => {
      console.log(error);
    });
};

if (inputFile) {
  inputFile.addEventListener('change', event => {
    const file = event.target.files[0];
    tempFile = file;
    parseExcel(file);
  });
}

if (button) {
  button.addEventListener('click', () => {
    if (tempFile) {
      parseExcel(tempFile);
    }
  });
}
