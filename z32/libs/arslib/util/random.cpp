#include <iostream>
#include <stdlib.h>
#include <time.h>
#include <math.h>
#include "./util.h"
#include "./random.h"

using namespace std;

void randomStart() {
  srand(static_cast <unsigned> (time(0)));
}

template <typename T> T valueInRange(T range) {
  //baseRand -> [0.0, 1.0]
  float baseRand = static_cast <float> (rand()) / static_cast <float> (RAND_MAX);
  return (T) (baseRand * range);
}

template <typename T> T valueFromIntervalInclusive(T value1, T value2) {
  T max, min, delta;
  min = util::min(value1, value2);
  max = util::max(value1, value2);
  delta = max - min;
  return valueInRange(delta + ((std::is_same<T, int>::value)? 1 : 0)) + min;
}

template <typename T> T valueFromInterval(T value1, T value2) {
  T max, min, delta;
  min = util::min(value1, value2);
  max = util::max(value1, value2);
  delta = max - min;
  return valueInRange(delta) + min;
}

template <typename T> bool occurrenceProbability(T occurrenceProbability) {
  if(occurrenceProbability <= 0) {
    return false;
  }
  if(occurrenceProbability >= 1) {
    return true;
  }
  int scale = 1/occurrenceProbability;
  return valueFromInterval(1, (int) scale) == 1.0;
}

// test
// compile with "g++ -Wall -g random.cpp -o random"
int main() {
  randomStart();
  cout << "valueInRange(2.0): ";
  cout << valueInRange(2.0) << endl;  
  cout << "valueFromIntervalInclusive(1.0, 2.0): ";
  cout << valueFromIntervalInclusive(1.0, 2.0) << endl;  
  return 0;
}
