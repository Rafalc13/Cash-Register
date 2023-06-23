function checkCashRegister(price, cash, cid) {
    const currencyValues = {
      "PENNY": 1,
      "NICKEL": 5,
      "DIME": 10,
      "QUARTER": 25,
      "ONE": 100,
      "FIVE": 500,
      "TEN": 1000,
      "TWENTY": 2000,
      "ONE HUNDRED": 10000
    };
  
    let changeAmount = Math.round((cash - price) * 100);
    let totalCid = cid.reduce((acc, curr) => acc + curr[1] * 100, 0);
  
    if (totalCid < changeAmount) {
      return { status: "INSUFFICIENT_FUNDS", change: [] };
    } else if (totalCid === changeAmount) {
      return { status: "CLOSED", change: cid };
    } else {
      let change = [];
  
      for (let i = cid.length - 1; i >= 0; i--) {
        const currencyUnit = cid[i][0];
        let currencyAmount = cid[i][1] * 100;
        const currencyValue = currencyValues[currencyUnit];
        let currencyCount = 0;
  
        while (currencyAmount > 0 && changeAmount >= currencyValue) {
          changeAmount -= currencyValue;
          currencyAmount -= currencyValue;
          currencyCount++;
        }
  
        if (currencyCount > 0) {
          change.push([currencyUnit, currencyValue * currencyCount / 100]);
        }
      }
  
      if (changeAmount > 0) {
        return { status: "INSUFFICIENT_FUNDS", change: [] };
      }
  
      return { status: "OPEN", change: change };
    }
  }
  
  const cid = [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
  ];
  
  
  console.log(checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));