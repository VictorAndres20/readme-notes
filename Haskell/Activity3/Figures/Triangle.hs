-- Triangle module
module Triangle(Triangle(..),getArea,getPerimeter) where
import Point
data Triangle = Triangle { a::Point, b::Point, c::Point} deriving (Show)

getArea:: Triangle -> Float
getArea (Triangle a b c) = 
    let s = getSHeron a b c
        x = getDistance a b
        y = getDistance b c
        z = getDistance c a
    in sqrt(s * (s - x) * (s - y) * (s - z))

getPerimeter:: Triangle -> Float
getPerimeter (Triangle a b c)= (getDistance a b) + (getDistance b c) + (getDistance c a)

getDistance:: Point -> Point -> Float
getDistance (Point x1 y1) (Point x2 y2) =  sqrt((x2-x1)^2 + (y2-y1)^2)

getSHeron:: Point -> Point -> Point -> Float
getSHeron a b c = ((getDistance a b) + (getDistance b c) + (getDistance c a)) / 2 
