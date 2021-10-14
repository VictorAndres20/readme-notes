-- StackList module
module StackList(Stack(..), empty, isEmpty, push, pop, top) where
import Data.List(intercalate)

-- Create our Type Stack
data Stack a = XS [a]

-- StackList functions
-- Push function
push :: a -> Stack a -> Stack a
push x (XS xs) = XS (x:xs)

-- Pop function
pop:: Stack a -> Stack a
pop (XS []) = XS []
pop (XS (x:xs)) = XS xs

-- Top function
top:: Stack a -> a
top (XS []) = error "No lements in stack"
top (XS (x:xs)) = x

-- Is Empty function
isEmpty:: Stack a -> Bool
isEmpty (XS []) = True
isEmpty _ = False

-- Empty function
empty:: Stack a
empty = XS []

-- Instance for show stack
instance (Show a) => Show (Stack a) where
    show (XS xs) = "Stack { " ++ intercalate "," (map show xs) ++ " }"

instance (Eq a) => Eq (Stack a) where
    (XS xs) == (XS xs') = xs == xs'