-- First Exercise function
facDouble :: Int -> Int
facDouble 0 = 1
facDouble 1 = 1
-- I prefer to use Texas ranges and product function for lists
facDouble x = if (mod x 2) == 0 then product [2..x] else product [1..x]