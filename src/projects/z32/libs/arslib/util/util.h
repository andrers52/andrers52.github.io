#ifndef UTIL_HH
#define UTIL_HH

namespace util
{
  template <typename T> T max(T x, T y) {  return (((x) > (y)) ? (x) : (y)); }
  template <typename T> T min(T x, T y) {  return (((x) < (y)) ? (x) : (y)); }

  template <typename T> T abs(T x) {  return (x >= 0)? x : x * -1; }

  template <typename T> T limitValueToMinMax(T value, T min, T max) {  
    return ((value > max)? max : (value < min)? min : value); 
  }

  template <typename T> T rad2Deg(T radians) {  return radians * 180 / M_PI; }
  template <typename T> T deg2Rad(T degrees) {  return degrees * M_PI / 180; }
  template <typename T> T convert(T value, T fromBase, T toBase) {
    if(fromBase == 0)  fromBase = 1;
    return value * toBase / (fromBase); 
  }


  long currentTime ();

  // change number to value inside [max,min] using cos
  template <typename T> float nonLinearCoerceValueToMaxMin (T value, T min, T max);
}
#endif	// UTIL_HH
