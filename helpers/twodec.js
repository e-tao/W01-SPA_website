export default function (ChangePercent) {

    let perChange = ChangePercent * 100;
    let twoDec = perChange.toFixed(2)
    return twoDec;
}