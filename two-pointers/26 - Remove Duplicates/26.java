/*
@title: Remove duplicates from sorted array
@difficulty: Easy
@tags: Two Pointers
@link: https://leetcode.com/problems/remove-duplicates-from-sorted-array/description/
*/

class Solution {
    public int removeDuplicates(int[] nums) {
        int left = 1;

        for(int right = 1; right < nums.length; right ++){
            if(nums[right] != nums[right - 1]){
                nums[left] = nums[right];
                left++;
            }
        }
        return left;
    }
}