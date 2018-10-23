enum State {
    ON = 1,
    OFF = 0
}

/**
 * Blocks for energy monitoring
 */
//% weight=100 color=#0fbc11 icon="\uf1e6"
namespace energy {
    let isOn = false;

    /**
     * Registers code to run when electrical power is detected as switched on.
     * @param state pin to read from, eg: State.ON
     */
    //% blockId=on_electrical_power_switched_on block="on electrical power switched %state" blockGap=8
    //% weight=97
    export function onElectricalPowerSwitched(state: State, body: Action) {
        control.inBackground(() => {
            if (state && getPowerStatus() && !isOn) {
                body();
                isOn = true;
            } else if (!state && !getPowerStatus() && isOn) {
                body();
                isOn = false;
            }

            basic.pause(100);
        })
    }

    /**
     * Returns the on/off status of the electrical power.
     */
    //% blockId=get_electrical_power_state block="electrical power status" blockGap=8
    //% weight=99
    export function getPowerStatus(): boolean {
        return (getEnergyUsage() > 0 ? true : false)
    }
}
