/*
@title: Remove Element
@difficulty: Easy
@tags: Two Pointers
@link: https://leetcode.com/problems/remove-element/description/
*/

import 'dart:collection';

class Solution {
  int removeElement(List<int> nums, int val) {
    int k = 0;
    for(int i = 0; i < nums.length; i++){
        if(nums[i] != val){
            nums[k] = nums[i];
            k++;
        }
    }
    return k;
  }
}