-- Circle Module
-- Specify functions

module Circle(Circle(..), getArea, getPerimeter) where 
import Point
data Circle = Circle { point::Point, radium::Float} deriving (Show)

-- Circle functions
-- Get area
getArea:: Circle -> Float
getArea (Circle _ radium) = pi * radium * radium

-- Get perimeter
getPerimeter:: Circle -> Float
getPerimeter (Circle _ radium)= 2.0 * pi * radium