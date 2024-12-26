function replace_city(city) {
    let n = city.indexOf('/');
    if (n > 0) {
        return city.substring(0, n);
    }
    return city;
}

module.exports = replace_city;