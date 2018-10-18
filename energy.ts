/**
 * Blocks for energy monitoring
 */
//% weight=100 color=#0fbc11 icon="\uf1e6"
namespace energy {
    /**
     * Calculates and returns the value, in Watts, of the current power usage
     * being detected using the magnetometer.
     */
    //% blockId=get_energy_consumption_W block="get energy consumption (W)" blockGap=8
    export function getEnergyConsumption(): number {
        return 0;
    }

    /**
     * Registers code to run when a device is detected as switched on.
     */
    //% blockId=on_device_switched_on block="on device switched on" blockGap=8
    export function onDeviceSwitchedOn(body: Action) {
        control.inBackground(() => {
            while (true) {
                body();
            }
        })
    }
}
