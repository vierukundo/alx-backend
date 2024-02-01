#!/usr/bin/env python3
"""module for MRU cache replacement policy"""


BaseCaching = __import__('base_caching').BaseCaching


class MRUCache(BaseCaching):
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
                if key in self.cache_data.keys():
                    del self.cache_data[key]
                else:
                    most_used_key = list(self.cache_data.keys())[-1]
                    print("DISCARD:", most_used_key)
                    del self.cache_data[most_used_key]
                self.cache_data[key] = item

    def get(self, key):
        """return the value in self.cache_data linked to key"""
        if key in self.cache_data:
            # Move the key to the most recently used position
            item = self.cache_data.pop(key)
            self.cache_data[key] = item
            return item
        return None
