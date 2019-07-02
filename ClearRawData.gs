// resets our data
function reset() {
  var s=SpreadsheetApp.getActiveSpreadsheet().getSheetByName("RawData");
  s.getRange("A:Z").clearContent();
  var app = SpreadsheetApp;
  var sheet = app.getActiveSpreadsheet().getSheetByName("Foreign-ForeignConvert"); 
   sheet.getRange("t2:t").clearContent();
}
