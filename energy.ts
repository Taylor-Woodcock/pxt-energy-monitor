/**
 * Blocks for energy monitoring
 */
//% weight=100 color=#0fbc11 icon="\uf1e6"
namespace energy {
    /**
     * Registers code to run when a device is detected as switched on.
     */
    //% blockId=on_device_switched_on block="on device switched on" blockGap=8
    export function onDeviceSwitchedOn(body: Action) {
        control.inBackground(() => {
            while (true) {
                int usage = getEnergyUsage();
                if(usage > 10)
                    body();
            }
        })
    }
}
