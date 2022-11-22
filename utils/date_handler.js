function getDate(year, month) {
    const longest = ['01', '03', '05', '07', '08', '10', '12'];
    if (longest.includes(month))
        return year+"-"+month+"-31"
    if (month == '02')
        return year+"-"+month+"-29"
    return year+"-"+month+"-30"
}

module.exports = {
    getDate
}