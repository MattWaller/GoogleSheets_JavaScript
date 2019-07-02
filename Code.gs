function BaseQBOWhileLoop(){
  
  var app = SpreadsheetApp;
  var activeSheet = app.getActiveSpreadsheet().getSheetByName("BaseQBOEntries");  
  var range = activeSheet.getRange(2,1).getValue();
  Logger.log(range);
  
  if (range == 1) {
    var rowNum = 2; // first row on spreadsheet
    
    var Avals = activeSheet.getRange("A1:A").getValues();
    var Alast = Avals.filter(String).length; // Last row on spreadsheet
    
    
    // Oauth2 token access
    var a = SpreadsheetApp;
    var aS = a.getActiveSpreadsheet().getSheetByName("Refresh_Key");   
   
   // reference the refresh token from the stored spreadsheet
    var refresh_k = aS.getRange(1, 1).getValue();   
    var token_url = "https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer";
    
    // defining the variables required to send the API post to QuickBooks Online using Oauth2
    var token_options = 
        {
          "headers": {
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/json",
            "Authorization": "Basic // ADD YOUR AUTHORIZATION CODE HERE"
          },
          "payload": {
            "grant_type" : "refresh_token",
            "refresh_token" : refresh_k,
          }
        };
    var token_response = UrlFetchApp.fetch(token_url,token_options); 
    var access_token = JSON.parse(token_response);
    var token_key = access_token.access_token;
    var refresh_key = access_token.refresh_token;
    var a = SpreadsheetApp;
    var aS = a.getActiveSpreadsheet().getSheetByName("Refresh_Key");
    
    // store new refresh key in spreadsheet
    var refreshKeyStorage = aS.getRange(1, 1).setValue(refresh_key);  
    
    
    
    // enter companyid here -- this is for journal entries
    var url = "https://quickbooks.api.intuit.com/v3/company/{COMPANY_ID}/journalentry";
    var Auth_Token = "bearer " + token_key;
    
    // start of while Loop
    while (rowNum <= Alast){
      
      // Changing Variables
      var Txndate = activeSheet.getRange(rowNum, 15).getValue();
      var CurrencyValue = activeSheet.getRange(rowNum, 2).getValue();
      var CurrencyName = activeSheet.getRange(rowNum, 11).getValue();
      var ExchangeRate = activeSheet.getRange(rowNum, 9).getValue();
      var Description = activeSheet.getRange(rowNum, 10).getValue();
      var Amount = activeSheet.getRange(rowNum, 12).getValue();
      var ForeignPT = activeSheet.getRange(rowNum, 13).getValue();
      var BasePT = activeSheet.getRange(rowNum, 14).getValue();
      var ForeignGL = activeSheet.getRange(rowNum, 16).getValue();
      var BaseGL = activeSheet.getRange(rowNum, 17).getValue();
      var ForeignVal = activeSheet.getRange(rowNum, 18).getValue();
      var BaseVal = activeSheet.getRange(rowNum, 19).getValue();    
      var payload =
          {
            
            "TxnDate": Txndate,
            "CurrencyRef": {
              "value": CurrencyValue,
              "name": CurrencyName,
            },
            "ExchangeRate": ExchangeRate,
            "Line": [
              {
                "Id": "0",
                "Description": Description,
                "Amount": Amount,
                "DetailType": "JournalEntryLineDetail",
                "JournalEntryLineDetail": {
                  "PostingType": ForeignPT,
                  "AccountRef": {
                    "value": ForeignVal,
                    "name": ForeignGL
                  }
                }
              },
              {
                "Id": "1",
                "Description": Description,
                "Amount": Amount,
                "DetailType": "JournalEntryLineDetail",
                "JournalEntryLineDetail": {
                  "PostingType": BasePT,
                  "AccountRef": {
                    "value": BaseVal,
                    "name": BaseGL
                  }
                }
              }
            ],
            "TxnTaxDetail": {} 
          };
      
      Logger.log(JSON.stringify(payload));
      var options = 
          { 
            "method" : "POST",
            "headers": {
              "Content-Type": "application/json",
              "Accept": "application/json",
              "Authorization": Auth_Token,
            },
            "payload": JSON.stringify(payload),
          }; 
      var response = UrlFetchApp.fetch(url,options);
      Logger.log(response); 
      
      Logger.log("counter is " + rowNum);
      rowNum += 1;
      
      
    }
    Logger.log("finished");
}
}

