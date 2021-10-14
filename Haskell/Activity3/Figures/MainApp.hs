-- Import modules
import qualified Point as Point
import qualified Triangle as Triangle
import qualified Rectangle as Rectangle
import qualified Circle as Circle
 
-- Use triangle module
getTriangleArea:: Triangle.Triangle -> Float
getTriangleArea tr =  Triangle.getArea tr

getTrianglePerimeter:: Triangle.Triangle -> Float
getTrianglePerimeter tr =  Triangle.getPerimeter tr

-- Use circle module
getCircleArea:: Circle.Circle -> Float
getCircleArea cr =  Circle.getArea cr

getCirclePerimeter:: Circle.Circle -> Float
getCirclePerimeter cr =  Circle.getPerimeter cr

-- Use rectangle module
getRectangleArea:: Rectangle.Rectangle -> Float
getRectangleArea rc = Rectangle.getArea rc

getRectanglePerimeter:: Rectangle.Rectangle -> Float
getRectanglePerimeter rc = Rectangle.getPerimeter rc
