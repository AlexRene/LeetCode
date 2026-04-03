/*
@title: Search Insert Position
@difficulty: Easy
@tags: Binary Search
@link: https://leetcode.com/problems/search-insert-position/description/
*/

class Solution {
  int searchInsert(List<int> nums, int target) {
    int left = 0;
    int rigth = nums.length - 1;

    while(left <= rigth){
        int meio = left + (rigth - left) ~/ 2;

        if(nums[meio] == target){
            return meio;
        }
        else if(nums[meio] < target){
            left = meio + 1;
        }
        else{
            rigth = meio - 1;
        }
    }
    return left;
  }
}