-- Main module Point
module Point(Point(..),getX,getY) where 
data Point = Point { x::Float, y::Float} deriving (Show)

-- Point functions
-- Get X point
getX :: Point -> Float
getX = x   

-- Get Y point
getY :: Point -> Float
getY = y