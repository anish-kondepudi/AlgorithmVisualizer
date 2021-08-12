class Solution:
    def isPalindrome(self, x: int) -> bool:
        
        # Using Strings
        # return str(x) == str(x)[::-1]
        
        # Without Strings
        if x == 0: return True
        if x < 0 or x % 10 == 0: return False
        backwardNum = 0
        forwardNum = x
        while x > 0:
            lastDigit = x%10
            backwardNum = backwardNum*10 + lastDigit
            x //= 10
        return forwardNum == backwardNum