#ifndef RANDOM_H
#define RANDOM_H

namespace util
{

  void start();

  // [0, range)
  template <typename T> T valueInRange(T range);

  // Returns a random value between value1 (included) and value2 (included)
  template <typename T> T valueFromIntervalInclusive(T value1, T value2);

  // Returns a random between value1 (included) and value2 (excluded)
  template <typename T> T valueFromInterval(T value1, T value2);

  // Returns true if "happens" inside the probability
  template <typename T> bool occurrenceProbability(float occurrenceProbability);

}

#endif	// RANDOM_H