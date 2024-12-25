function read_fuel_solution(fuel_solution_text){
    
    if(!fuel_solution_text) return;

    const parts = fuel_solution_text.trim().split('\n')
                    .map(part => part.trim())
                    .filter(part => part.length > 1)

    const search_phrases = [];

    parts.forEach((part, i) => {
        if(/QTY:\s[A-Z|\d]+/.test(part)){
            const _exec = /I \d\d/.exec(part);
            const _parts = parts[i+1].substring(0, /EX: /.exec(parts[i+1]).index).trim().replace(/\s+/g, ' ').split(/\s/);            
            const state = _parts.pop();
            const city = _parts.join(' ');

            const stop = {
                name: part.substring(0,_exec.index).trim(),
                city: city.trim(), state: state.trim(),
                highway: _exec[0].replace(' ','-'),
                exit: /EX: \d+/.exec(parts[i+1])[0].match(/\d+/)[0]
            };
            
            if(/(pilot\s\#)/gi.test(stop.name)){
                stop.name = "PILOT TRAVEL CE";
            }
            if(/(loves\stravel\sst)/gi.test(stop.name)){
                stop.name = "LOVES TRAVEL";
            }
            let n = stop.city.indexOf('/');
            if(n > 0){
                stop.city = stop.city.substring(0, n);
            }
            search_phrases.push(`${stop.name} ${stop.city} ${stop.state} ${stop.highway} exit ${stop.exit}`)
        }
    })
    
    return search_phrases;
}

module.exports = read_fuel_solution;