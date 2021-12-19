module Principal 
(insertarElemento1
,eliminarElemento1
,buscarElemento
,eliminarElemento2
,insertarSubLista
,eliminarElementos
,avanzarLista
) where 

import System.IO
import Data.Maybe
import qualified ListaZipper as LEO

main = do
    sequenceNumbers <- readFile("entrada.txt")
    let n = splitStr "\n" sequenceNumbers
    let ns = map words n
    let orden = foldr insertarElemento1 LEO.EmptyList n

insertarElemento1::(Ord a)=> a -> LEO.ListaEncadenadaOrdenada a -> LEO.ListaEncadenadaOrdenada a
insertarElemento1 newEl LEO.EmptyList = LEO.singleton newEl
insertarElemento1 newEl sbList = LEO.insertarElemento1 newEl sbList

eliminarElemento1::(Ord a)=> a -> LEO.ListaEncadenadaOrdenada a -> LEO.ListaEncadenadaOrdenada a
eliminarElemento1 deleted LEO.EmptyList = LEO.EmptyList
eliminarElemento1 deleted sbList = LEO.eliminarElemento1 deleted sbList

buscarElemento::(Ord v) => v -> LEO.ListaEncadenadaOrdenada v -> Maybe v
buscarElemento buscado LEO.EmptyList = Nothing
buscarElemento buscado sbList = LEO.buscarElemento buscado sbList

eliminarElemento2::(Ord a)=> a -> LEO.ListaEncadenadaOrdenada a -> (LEO.ListaEncadenadaOrdenada a, Maybe a)
eliminarElemento2 deleted LEO.EmptyList = (LEO.EmptyList, Nothing)
eliminarElemento2 deleted sbList = LEO.eliminarElemento2 deleted sbList

insertarSubLista::(Ord a)=> LEO.ListaEncadenadaOrdenada a -> LEO.ListaEncadenadaOrdenada a -> LEO.ListaEncadenadaOrdenada a
insertarSubLista LEO.EmptyList aList = aList
insertarSubLista sbList actualList = LEO.insertarSubLista sbList actualList

eliminarElementos::(Ord a)=> LEO.ListaEncadenadaOrdenada a -> LEO.ListaEncadenadaOrdenada a -> LEO.ListaEncadenadaOrdenada a
eliminarElementos LEO.EmptyList aList = aList
eliminarElementos sbList actualList = LEO.eliminarElementos sbList actualList

avanzarLista :: LEO.ListaEncadenadaOrdenada a -> LEO.ListaEncadenadaOrdenada a
avanzarLista sbList = LEO.avanzarLista sbList

class MiFunctor f where
	funmap :: (a->b) -> f a -> f b

instance MiFunctor LEO.ListaEncadenadaOrdenada where
	funmap _ (LEO.EmptyList) = LEO.EmptyList
	funmap f (LEO.Node x right) = LEO.Node (f x) (funmap f right)

class MiMonoide m where
	esIdentidad :: m 
	unirCajas :: m -> m -> m 

instance (Ord a) => MiMonoide (LEO.ListaEncadenadaOrdenada a) where
	esIdentidad = LEO.EmptyList 
	unirCajas lista1 lista2= insertarSubLista lista1 lista2 
