'use strict';

class Thermostat {

    MAX_TEMP_P_ON = 25;
    MAX_TEMP_P_OFF = 32;
    MIN_TEMP = 10;
    DEFAULT_INCREASE = 1;
    DEFAULT_DECREASE = 1;
    DEFAULT_TEMP = 20;
    LOW_USAGE = 18;
    MEDIUM_USAGE = 25;

    constructor() {
        this.temperature = this.DEFAULT_TEMP;
        this.isSavingPower = true;
    }

    up(increase = this.DEFAULT_INCREASE) {
        let maxTemp = this._calculateMax()
        return this.temperature = (this.temperature += increase) > maxTemp ? maxTemp : this.temperature;
    }

    down(decrease = this.DEFAULT_DECREASE) {
        return this.temperature = (this.temperature -= decrease) <= this.MIN_TEMP ? this.MIN_TEMP : this.temperature;
    }

    powerSaving() {
        return this.isSavingPower
    }

    togglePowerSavings() {
        this.isSavingPower = !this.isSavingPower
        return this.up(0)
    }

    reset() {
        return this.temperature = this.DEFAULT_TEMP;
    }

    usage() {
        if (this.temperature < this.LOW_USAGE) return "Low-usage";
        if (this.temperature <= this.MEDIUM_USAGE) return "Medium-usage";
        return "High-usage";
    }


    _calculateMax() {
        return this.powerSaving() ? this.MAX_TEMP_P_ON : this.MAX_TEMP_P_OFF;
    }

}

//thermostat = new Thermostat()
//thermostat.togglePowerSavings();
//thermostat.up(15);
//thermostat.togglePowerSavings();
//console.log(thermostat.maxTemp);