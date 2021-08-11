class Solution:
    # Total: O(nlogn)
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        prevSeen = {}
        for i, num in enumerate(nums):
            complement = target - num
            if complement in prevSeen.keys():
                return [prevSeen[complement], i]
            prevSeen[num] = i
        return