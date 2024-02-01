#!/usr/bin/env python3
"""module for LFU cache replacement policy"""
from collections import Counter


BaseCaching = __import__('base_caching').BaseCaching


class LFUCache(BaseCaching):
    """inherits from BaseCaching and is a caching system"""

    def __init__(self):
        """Initialization"""
        super().__init__()
        self.frequency = Counter()

    def put(self, key, item):
        """Must assign to the dictionary self.cache_data
        the item value for the key key"""
        if key and item:
            if len(self.cache_data) < BaseCaching.MAX_ITEMS:
                self.cache_data[key] = item
                self.frequency[key] += 1
            else:
                if key in self.cache_data:
                    self.cache_data[key] = item
                    self.frequency[key] += 1
                else:
                    least_frequency = min(self.frequency.values())
                    least_frequent_keys = []
                    for k, freq in self.frequency.items():
                        if freq == least_frequency:
                            least_frequent_keys.append(k)
                    k = least_frequent_keys[0]
                    print("DISCARD:", k)
                    del self.cache_data[k]
                    del self.frequency[k]
                    self.cache_data[key] = item
                    self.frequency[key] = 1

    def get(self, key):
        """return the value in self.cache_data linked to key"""
        item = self.cache_data.get(key, None)
        if item:
            self.frequency[key] += 1
        return item
