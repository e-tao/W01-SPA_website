export default function calculation() {
    let initInt = Number(document.getElementById("initInv").value);
    let monthPay = Number(document.getElementById("monthPay").value);
    let interest = Number(document.getElementById("interest").value) / 100;
    let cpdN = document.getElementById("compound").value;
    let years = Number(document.getElementById("years").value);
    let totalCpdPeriod;

    switch (cpdN) {
        case "monthly":
            totalCpdPeriod = Number(years * 12);
            cpdN = 12;
            break;
        case "quarterly":
            totalCpdPeriod = Number(years * 4);
            cpdN = 4;
            break;
        case "halfyear":
            totalCpdPeriod = Number(years * 2);
            cpdN = 2;
            break;
        case "yearly":
            totalCpdPeriod = Number(years);
            cpdN = 1;
            break;
    }

    let finalAmt = (initInt * Math.pow((1 + interest / cpdN), totalCpdPeriod)) + monthPay * (Math.pow((1 + interest / cpdN), totalCpdPeriod) - 1) / (interest / cpdN);

    let result = document.getElementById("result");
    if (isNaN(finalAmt)) {
        result.innerHTML = 'error occurred in calculation, please check your input';
    } else {
        result.innerHTML = `the investment after ${years} years will grow to $${finalAmt.toFixed(2)}.`
    }
}