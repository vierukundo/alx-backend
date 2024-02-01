#!/usr/bin/env python3
"""module for FIFO cache replacement policy"""


BaseCaching = __import__('base_caching').BaseCaching


class FIFOCache(BaseCaching):
    """inherits from BaseCaching and is a caching system"""

    def __init__(self):
        """Initialization"""
        super().__init__()

    def put(self, key, item):
        """Must assign to the dictionary self.cache_data
        the item value for the key key"""
        if key and item:
            if len(self.cache_data) < BaseCaching.MAX_ITEMS:
                self.cache_data[key] = item
            else:
                first_key = next(iter(self.cache_data))
                print("DISCARD:", first_key)
                del self.cache_data[first_key]
                self.cache_data[key] = item

    def get(self, key):
        """return the value in self.cache_data linked to key"""
        return self.cache_data.get(key, None)
