-- Import to load modules for functins like 'isDigit' 'intercalate'
import Data.Char
import Data.List

-- Function 1
functionOne :: Int -> [a] -> [a] -> ([a],[a])
functionOne n param1 param2 = (drop n param1 ++ take n param2, drop n param2 ++ take n param1)

-- Function 2
functionTwo :: String -> Int
functionTwo [] = 0
functionTwo str = if all isDigit (head (words str)) 
                  then (read (head (words str)) :: Int) + functionTwo (intercalate " " (drop 1 (words str))) 
                  else 0 + functionTwo (intercalate " " (drop 1 (words str)))