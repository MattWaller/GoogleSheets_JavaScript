// imports the raw data from google drive

function importCSVFromGoogleDrive() {
  var file = DriveApp.getFilesByName("PP-Transactions.CSV").next();
  var csvData = Utilities.parseCsv(file.getBlob().getDataAsString());
  var app = SpreadsheetApp;
  var sheet = app.getActiveSpreadsheet().getSheetByName("RawData"); 
  sheet.getRange(1, 1, csvData.length, csvData[0].length).setValues(csvData);
}
 
