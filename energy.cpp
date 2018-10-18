#include "pxt.h"

using namespace pxt;

#include "MicroBit.h"

#define SAMPLES 250
#define HISTORY 5
#define RANGE_MIN 3607
#define RANGE_MAX 256981
#define WATTAGE_MAX 3000

namespace energy {
  int samples[SAMPLES];
  int history[HISTORY];
  
  int amplitude;
  int watts;

  int sampleAmplitude(int samples[SAMPLES])
  {
    int peak = 0;
    int trough = 0;
    
    for(int i = 0; i < SAMPLES; i++)
    {
      if(samples[i] > peak)
        peak = samples[i];
  
      if(samples[i] < trough || trough == 0)
        trough = samples[i];
    }
    return peak - trough;
  }
  
  /**
   * Maps a value from one range to another.
   *
   * @param value The value from the original 
   */
  int map(int value, int fromLow, int fromHigh, int toLow, int toHigh)
  {
    int val = ((value - fromLow) * (toHigh - toLow)) / (fromHigh - fromLow) + toLow;
    if(val < 0)
      return 0;
    return val;
  }
  
  /**
    * Measures and returns the usage of a decive in Watts using the on-board magnetometer.
    */
    //% blockId=getEnergyUsage block="get energy usage (W)" 
    //% blockExternalInputs=0
    //% advanced=false
    //% weight=99
  int getEnergyUsage()
  {
    int period = uBit.compass.getPeriod();
    uBit.compass.setPeriod(1);
    
    for(int sample = 0; sample < SAMPLES; sample++)
    {
      samples[sample] = uBit.compass.getFieldStrength(); 
    }
    
    int amplitude = sampleAmplitude(samples);
    int watts = map(amplitude, RANGE_MIN, RANGE_MAX, 0, WATTAGE_MAX);
    
    return watts;
  }
  
}
