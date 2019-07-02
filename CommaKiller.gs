// to remove all commas from data to ensure CSV file works with QBO uploading .py file
function CommaKiller() { 
  var app = SpreadsheetApp;
  var activeSheet = app.getActiveSpreadsheet().getSheetByName("RawData");  
  
  var rowNum = 2; // first row on spreadsheet
  
  var Avals = activeSheet.getRange("A1:A").getValues();
  var Alast = Avals.filter(String).length; // Last row on spreadsheet
  
  // start of while Loop
  while (rowNum <= Alast){
    
    // Changing Variables
    var Name = activeSheet.getRange(rowNum, 4).getValue();
    var NameChange = Name.replace(/,/g,"");
    var CK = activeSheet.getRange(rowNum, 4).setValue(NameChange);
    Logger.log(Name);
    Logger.log(Name);
    Logger.log(Name);
    Logger.log("counter is " + rowNum);
    rowNum += 1;
  }
}

