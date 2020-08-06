'use strict';

describe("Thermostat", () => {

    var thermostat;
    beforeEach(() => {
       thermostat = new Thermostat()
    });

    it("Thermostat initializes with a temperature of 20", () => {
        expect(thermostat.temperature).not.toBeUndefined();
        expect(thermostat.temperature).toEqual(20);
    });

    it("#UP 10 degrees (Power saving off)", () => {
        spyOn(thermostat, 'powerSaving').and.returnValue(false)
        thermostat.up(10)
        expect(thermostat.temperature).toEqual(30)
    });

    it("#UP default degrees", () => {
        thermostat.up();
        expect(thermostat.temperature).toEqual(21)
    });

    it("#DOWN 10 degrees", () => {
        thermostat.down();
        expect(thermostat.temperature).toEqual(19)
    });

    it("#DOWN below 10 degrees (keep at 10)", () => {
        thermostat.down(20);
        expect(thermostat.temperature).toEqual(10)
    });

    it("#DOWN default degrees", () => {
        thermostat.down();
        expect(thermostat.temperature).toEqual(19)
    });

    it("#POWER_SAVING ON", () => {
        spyOn(thermostat, 'powerSaving').and.returnValue(true)
        thermostat.up(20)
        expect(thermostat.temperature).toEqual(25)
    });

    it("Turn #POWER_SAVING OFF", () => {
        thermostat.up(20)
        expect(thermostat.temperature).toBe(25)
        thermostat.togglePowerSavings() // Now off
        expect(thermostat.isSavingPower).toBe(false)
        thermostat.up(20)
        expect(thermostat.temperature).toBe(32);
    });

    it("Resets temp to new maximum #TOGGLE OFF", () => {
        thermostat.togglePowerSavings(); // Now off
        expect(thermostat.powerSaving()).toBe(false)
        thermostat.up(15);
        expect(thermostat.temperature).toBe(32);
        thermostat.togglePowerSavings(); // Now on
        expect(thermostat.powerSaving()).toBe(true);
        expect(thermostat.temperature).toBe(25);
    });

    it("#RESET temperature to 20", () => {
        thermostat.up(5);
        expect(thermostat.temperature).toBe(25);
        thermostat.reset()
        expect(thermostat.temperature).toBe(20) ;
    });

    it("#USAGE returns low if < 18 (15 deg)", () => {
       thermostat.down(5)
       expect(thermostat.usage()).toEqual("Low-usage");
    });

    it("#USAGE returns medium if <= 25 (25 deg)", () => {
        thermostat.up(5)
        expect(thermostat.usage()).toEqual("Medium-usage");
    });

    it("#USAGE returns high > 25 (26 deg)", () => {
        spyOn(thermostat, 'powerSaving').and.returnValue(false)
        thermostat.up(6)
        expect(thermostat.temperature).toEqual(26)
        expect(thermostat.usage()).toEqual("High-usage");
    });


});