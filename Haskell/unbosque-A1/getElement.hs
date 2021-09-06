-- Fifth Function exercise
getElement :: [a] -> Int -> a
getElement a x = last [xs | xs <- (take x a)]