-- Controller
-- Import module StackList
import qualified StackList as StackList

-- Usage of stack module
empty:: StackList.Stack a
empty = StackList.empty

isEmpty:: StackList.Stack a -> Bool
isEmpty = StackList.isEmpty

push :: a -> StackList.Stack a -> StackList.Stack a
push x xs = StackList.push x xs

pop:: StackList.Stack a -> StackList.Stack a
pop =  StackList.pop

top:: StackList.Stack  a -> a
top =  StackList.top