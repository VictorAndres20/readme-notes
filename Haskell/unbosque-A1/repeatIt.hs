-- Second Exercise function
repeatIt :: Int -> a -> [a]
repeatIt n x = take n (repeat x)