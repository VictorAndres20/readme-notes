module ListaZipper
(ListaEncadenadaOrdenada(..)
,singleton
,insertarElemento1
,eliminarElemento1
,buscarElemento
,eliminarElemento2
,insertarSubLista
,eliminarElementos
,avanzarLista
)where

import Data.Maybe
data ListaEncadenadaOrdenada lista = EmptyList | Node lista (ListaEncadenadaOrdenada lista) deriving (Show, Read, Eq)
data Direction = L | R deriving (Show)
type BreadCumbs = [Direction]

singleton::(Ord a)=> a ->ListaEncadenadaOrdenada a
singleton newEl = Node newEl EmptyList

insertarElemento1::(Ord a)=> a -> ListaEncadenadaOrdenada a -> ListaEncadenadaOrdenada a
insertarElemento1 newEl EmptyList = singleton newEl
insertarElemento1 newEl (Node actualEl right)
	|newEl == actualEl = Node newEl right
	|newEl < actualEl = Node actualEl (insertarElemento1 newEl right)
	|newEl > actualEl = Node newEl (Node actualEl right)
	
eliminarElemento1::(Ord a)=> a -> ListaEncadenadaOrdenada a -> ListaEncadenadaOrdenada a
eliminarElemento1 eliminado EmptyList = EmptyList
eliminarElemento1 eliminado (Node actualEl right)
	|eliminado == actualEl = right
	|eliminado < actualEl = Node actualEl (eliminarElemento1 eliminado right)
	|eliminado > actualEl = Node actualEl right

buscarElemento::(Ord v) => v -> ListaEncadenadaOrdenada v -> Maybe v
buscarElemento buscado EmptyList = Nothing
buscarElemento buscado (Node actualEl right)
	| buscado == actualEl = (Just buscado)
	| buscado < actualEl = buscarElemento buscado right
	| buscado > actualEl = Nothing

eliminarElemento2::(Ord a)=> a -> ListaEncadenadaOrdenada a -> (ListaEncadenadaOrdenada a, Maybe a)
eliminarElemento2 eliminado EmptyList = (EmptyList, Nothing)
eliminarElemento2 eliminado (Node actualEl right)
	|eliminado == actualEl = (right, Just actualEl)
	|eliminado < actualEl = eliminarElemento2 eliminado right
	|eliminado > actualEl = (Node actualEl right, Nothing)

insertarSubLista::(Ord a)=> ListaEncadenadaOrdenada a -> ListaEncadenadaOrdenada a -> ListaEncadenadaOrdenada a
insertarSubLista EmptyList aList = aList
insertarSubLista (Node actual1 right1) actualList = insertarSubLista right1 (insertarElemento1 actual1 actualList)

eliminarElementos::(Ord a)=> ListaEncadenadaOrdenada a -> ListaEncadenadaOrdenada a -> ListaEncadenadaOrdenada a
eliminarElementos EmptyList aList = aList
eliminarElementos (Node actual1 right1) actualList = eliminarElementos right1 (eliminarElemento1 actual1 actualList)

avanzarLista :: ListaEncadenadaOrdenada a -> ListaEncadenadaOrdenada a
avanzarLista (Node _ r) = r

avanzarLista2 :: (ListaEncadenadaOrdenada a, ListaEncadenadaOrdenada a) -> (ListaEncadenadaOrdenada a, ListaEncadenadaOrdenada a)
avanzarLista2 (Node actual r, Node actual2 r2) = (r, Node actual (Node actual2 r2))

retrocederLista :: (ListaEncadenadaOrdenada a, ListaEncadenadaOrdenada a) -> (ListaEncadenadaOrdenada a, ListaEncadenadaOrdenada a)
retrocederLista (Node actual r, Node actual2 r2) = (Node actual2 (Node actual r), r2)
