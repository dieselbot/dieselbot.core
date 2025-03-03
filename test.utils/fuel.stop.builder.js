const { getValidFuelStop } = require("./fuel.stop.factory");

class FuelStopBuilder {
    constructor() {
        this.fuelstop = getValidFuelStop();
    }

    code(value){
        this.fuelstop.code = value;
        return this;
    }

    display_name(value){
        this.fuelstop.display_name = value;
        return this;
    }

    address(value){
        this.fuelstop.address = value;
        return this;
    }

    city(value){
        this.fuelstop.city = value;
        return this;
    }

    state(value){
        this.fuelstop.state = value;
        return this;
    }

    highway(value){
        this.fuelstop.highway = value;
        return this;
    }
    
    get(){
        const { fuelstop } = this;
        this.fuelstop = getValidFuelStop();
        return fuelstop;
    }
}

module.exports = FuelStopBuilder