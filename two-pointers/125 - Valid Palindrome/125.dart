class Solution {
  bool isPalindrome(String s) {
    if(s.isEmpty){ return true;}
    int right = s.length - 1 , left = 0;

    while(left < right)
    {
       while (left < right && !isAlphanumeric(s[left])) {
        left++;
      }
      while (left < right && !isAlphanumeric(s[right])) {
        right--;
      }
        if(s[left].toLowerCase() != s[right].toLowerCase()){
            return false;
        }
            left++;
            right--;
    }
    return true;
  }

  bool isAlphanumeric(String c) {
    int code = c.codeUnitAt(0);

    return (code >= 48 && code <= 57) || // 0-9
           (code >= 65 && code <= 90) || // A-Z
           (code >= 97 && code <= 122);  // a-z
  }
}