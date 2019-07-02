// Grabs Exchange rate for transactions from 3rd party API

function importExchangeRates(){
  var app = SpreadsheetApp;
  var activeSheet = app.getActiveSpreadsheet().getSheetByName("Foreign-ForeignConvert");  
  var range = activeSheet.getRange(2,1).getValue();
  Logger.log(range);
  
  if (range == 1) { 
     
  
    var rowNum = 2; // first row on spreadsheet
    
    var Avals = activeSheet.getRange("A1:A").getValues();
    var Alast = Avals.filter(String).length; // Last row on spreadsheet
    
    
    
    // start of while Loop
    while (rowNum <= Alast){
      
      // Changing Variables
      var Txndate = activeSheet.getRange(rowNum, 19).getValue();
      var CurrencyValue = activeSheet.getRange(rowNum, 5).getValue();
      var url = "http://api.openrates.io/"+ Txndate + "?base="+ CurrencyValue;
      
      var response = UrlFetchApp.fetch(url);
      var ER = JSON.parse(response);
      var ExchangeRate = ER.rates.CAD;
      
      var NewVariable = activeSheet.getRange(rowNum,20).setValue(ExchangeRate);
      
      
      Logger.log("counter is " + rowNum);
      rowNum += 1;
      
      
      
    }
  }
}
