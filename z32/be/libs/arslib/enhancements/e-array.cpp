#include <stdio.h>
#include <vector>
#include "../util/random.h"
#include "./e-array.h"

// ------------------------------------------------------ //
// ------------------------------------------------------ //

template <typename T> int lastIndex (std::vector<T> const& vector) {
  return vector.size() - 1;
}

template <typename T> T last (std::vector<T> const& vector) {
  return *vector.back();
}

template <typename T> T first (std::vector<T> const& vector) {
  return *vector.front();
}

template <typename T> bool isLast (std::vector<T> const& vector, T const &element) {
  return last(vector) == *element;
}

template <typename T> bool isFirst (std::vector<T> const& vector, T const &element) {
  return first(vector) == *element;
}

// **** CONTINUE ***


// from array of arrays to single array
template <typename T> std::vector<T> flatten (std::vector<std::vector<T>> const& originalVector) {
    std::vector<T> ret;
    for(const auto &v: originalVector)
        ret.insert(ret.end(), v.begin(), v.end());                                                                                         
    return ret;
}

// // from 'flat' array to array of arrays of length 'size'
// // Note: preserveOriginalArray === true is slower
// unflatten = (flattenedArray, size, preserveOriginalArray = true) => {
//   let arrayToUse = preserveOriginalArray?
//     JSON.parse(JSON.stringify(flattenedArray)) : flattenedArray
//   let resultArray = []
//   while (arrayToUse.length > 0) resultArray.push(arrayToUse.splice(0, size))  
//   return resultArray
// }

// removeLast = array => {
//   array.splice(-1,1)
//   return array
// }

// clone = (array, cloneFunction) => {
//   if (!cloneFunction)
//     return array.map(e => 
//       Array.isArray(e)? 
//         e.clone() :
//         typeof e === 'object'?
//           Object.assign({},e) :
//           e
//     )
//   return array.map(function(item) {
//     return cloneFunction(item)
//   })
// }

// //get random element from array (with different chances for each one)
// choiceWithProbabilities = (array, probabilities) => {
//   Assert.assertIsArray(probabilities)
//   Assert.assert(probabilities.length === array.length, 'Probabilities size must be equal to array size')
//   //each one select a number based on its probability and the
//   //one with the bigger number wins.
//   let generatedValues = probabilities.map(prob => Math.random() * prob)
//   let selectedIndex = indexOfGreaterValue(generatedValues)
//   return array[selectedIndex]
// }

// //get random element from array
// choice = array => array[Random.randomInt(array.length)]


// //get random index from array
// indexChoice = array => Random.randomInt(array.length)

// indexOfGreaterValue = array => {
//   let greater = array[0]
//   let resultIndex = 0
//   for(let i=1; i<array.length; i++)
//     if(array[i] > greater) {
//       greater = array[i]
//       resultIndex = i
//     }

//   return resultIndex
// }


// // test
// // compile with "g++ -g e-array.cpp -o e-array"
// int main() {
//   std::vector<std::vector<int>> vv; 
//   vv.push_back(std::vector<int>{1, 2, 3});
//   vv.push_back(std::vector<int>{10, 20});
//   flatten(vv);
// }
