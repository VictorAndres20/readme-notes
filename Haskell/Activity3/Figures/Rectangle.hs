-- Rectangle module
module Rectangle(Rectangle(..),getArea,getPerimeter) where
import Point
data Rectangle = Rectangle { a::Point, b::Point, c::Point, d::Point} deriving (Show)

-- Rectangle functions
-- Get area
getArea:: Rectangle -> Float
getArea (Rectangle a b c d) = (getDistance a b) * (getDistance c d)

-- Get Perimeter
getPerimeter:: Rectangle -> Float
getPerimeter (Rectangle a b c d)= (getDistance a b) + (getDistance b c) + (getDistance c d) + (getDistance d a)

-- Get Distance
getDistance:: Point -> Point -> Float
getDistance (Point x1 y1) (Point x2 y2) =  sqrt((x2-x1)^2 + (y2-y1)^2)