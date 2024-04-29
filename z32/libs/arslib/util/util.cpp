#include <inttypes.h>
#include <math.h>
#include <iostream>
#include <time.h>
#include "./util.h"

using namespace std;

long currentTime ()
{
    long            ms; // Milliseconds
    struct timespec spec;
    clock_gettime(CLOCK_REALTIME, &spec);
    return (intmax_t) spec.tv_sec * 1000;
}

// change number to value inside [max,min] using cos
template <typename T> float nonLinearCoerceValueToMaxMin (T value, T min, T max) {
  if (value >= min && value <= max) return value;
  float coercedToValueBetween0And1 = util::abs(cos(value));
  float amplitude = (float) max - min;
  float valueAdjustedToAmplitude = coercedToValueBetween0And1 * amplitude;
  float coercedValueAdjustedToMinMax = valueAdjustedToAmplitude + min;

  return coercedValueAdjustedToMinMax;
}

// // test
// // compile with "g++ -g util.cpp -o util -lm"
// int main() {
//   cout << "current time is: ";
//   cout << currentTime() << endl;

//   cout << "18 non-linearly coerced between 10 and 15: ";
//   cout << nonLinearCoerceValueToMaxMin (18, 10, 15) << endl;
// }
