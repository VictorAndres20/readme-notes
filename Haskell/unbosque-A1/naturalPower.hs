-- Third Exercise function
naturalPower :: (Num a) => a -> Int -> a
naturalPower x y = product (take y (repeat x))