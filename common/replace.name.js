function replace_name(name){
    switch (true) {
        case /(pilot\s\#)/gi.test(name):
            return "PILOT TRAVEL CE";
        case /(loves\stravel\sst)/gi.test(name):
            return "LOVES TRAVEL";
        case /\//.test(name):
            return name.substring(0, name.indexOf('/'))
        default:
            return name
    }
}

module.exports = replace_name;