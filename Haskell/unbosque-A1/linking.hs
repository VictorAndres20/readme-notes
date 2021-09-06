-- Fourth Exercise function
linking :: [[a]] -> [a]
linking matrix = [head x | x <- matrix] ++ [last xs | xs <- matrix]