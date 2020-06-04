# Some notes for Dart

## Main Method
In Dart, you need Main method to set entry point of your program
```
void main(){
	print('Hello World');
}
```


---------------------------------------------------------------------------------------------------------------------------------------------


## Method and Funtions example
**Void method**
```
void func(){
	//Code with no return
}
```

**Classic Return function**
```
String funcName(String name, int age){
	return "Me llamo $name y tengo $age años";
}
```

**Name argument function**
```
void main() {
	print(funcName(name: 'Andres', age: 18));
	print(funcName(age: 18,name: 'Andres'));
}

//You can use arguments with name, no positionals
String funcName({String name, int age}){
	return "Me llamo $name y tengo $age años";
}
```

**Arrow function**
```
void main() {
	print(arrowFunc(name: 'Andres', age: 18));
	print(arrowFunc(age: 18,name: 'Andres'));
}

//You can use arguments with name, no positionals
String arrowFunc({String name, int age}) => "Me llamo $name y tengo $age años";
```

---------------------------------------------------------------------------------------------------------------------------------------------

## Using Classes
**Classic Constructor**
```
void main() {
	final myCar = new Car(4, 'XFG-876', false);
	print(myCar);
	print("Carro encendido? ${myCar.started}");
}

//Class
class Car{
	int wheels;
	String id;
	bool started;
  
	//Positional Constructor
	Car(int wheels, String id, bool started){
		this.wheels = wheels;
		// ETC
	}
  
	String toString() => "[Ruedas: ${this.wheels}], Placa: ${this.id}";
}
```

**Positional Constructor**
```
void main() {
	final myCar = new Car(4, 'XFG-876', false);
	print(myCar);
	print("Carro encendido? ${myCar.started}");
}

//Class
class Car{
	int wheels;
	String id;
	bool started;
  
	//Positional Constructor
	Car(this.wheels, this.id, this.started);
  
	String toString() => "[Ruedas: ${this.wheels}], Placa: ${this.id}";
}
```

**Named Constructor**
```
void main() {
	final myCar = new Car(wheels: 4, id: 'XFG-876', started: false);
	print(myCar);
	print("Carro encendido? ${myCar.started}");
}

//Class
class Car{
	int wheels;
	String id;
	bool started;
	  
	//Named Constructor
	Car({this.wheels, this.id, this.started});
	  
	String toString() => "[Ruedas: ${this.wheels}], Placa: ${this.id}";
}
```

**Getters and setters**
```
void main() {
  final myCar = new Car();
  myCar.wheels = 5;
  myCar.id = 'CGH-987';
  myCar.started = false;
  print(myCar);
  print("Ruedas? ${myCar.wheels}");
  print("Carro encendido? ${myCar.started}");
}

//Class
class Car{
  int _wheels;
  String _id;
  bool _started;
  
  set wheels(int wheels){
    _wheels = wheels;
  }
  
  set started(bool started){
    _started = started;
  }
  
  set id(String id){
    _id = id;
  }
  
  //GETTERS with out parenthesis
  int get wheels {
    return _wheels;
  }
  
  String get id{
    return _id;
  }
  
  bool get started{
    return _started;
  }
  
  String toString() => "[Ruedas: ${this._wheels}], Placa: ${this._id}";
}
```

**Mapped class from JSON object**
```
import 'dart:convert';

void main() {
	final rawJson = '{"wheels":6,"id":"FGT-897","started":true}';
	final parsedJson = json.decode(rawJson);
	print(parsedJson);
  
	final myCar = new Car.fromJson(parsedJson);
	print(myCar);
	print("Carro encendido? ${myCar.started}");
}

//Class
class Car{
	int wheels;
	String id;
	bool started;
	
	//Named Constructor
	Car({this.wheels, this.id, this.started});
	
	//From JSON constructor
	Car.fromJson(parsedJson){
		this.wheels = parsedJson['wheels'];
		this.id = parsedJson['id'];
		this.started = parsedJson['started'];
	}
	
	String toString() => "[Ruedas: ${this.wheels}], Placa: ${this.id}";
}
```

**Abstract classes**
```
void main() {
	final myCar = new Car();
	myCar.wheels = 5;
	myCar.id = 'CGH-987';
	myCar.started = false;
	final truck = new Truck();
	truck.wheels = 4;
	truck.id = 'JKIU-890';
	truck.started = false;
	truck.capacity = 5676;
	final bike = new Bike(wheels:2, id:'JHHYGHY6676', started: false);
	print(myCar);
	print("Ruedas? ${myCar.wheels}");
	print("Carro encendido? ${myCar.started}");
	myCar.move();
	bike.move();
	print(truck);
	truck.move();
}

abstract class Vehicule{
	String id;
	bool started;
  
	void move();
}

class Car implements Vehicule{
	int wheels;
	String id;
	bool started;
	
	Car({this.wheels, this.id, this.started});
	
	void move(){
		print("I am moving!");
	}
	
	String toString() => "[Ruedas: ${this.wheels}], Placa: ${this.id}";
}

class Truck extends Car{  
	int capacity;
}

class Bike implements Vehicule{
	int wheels;
	String id;
	bool started;
	
	Bike({this.wheels, this.id, this.started});
	
	void move(){
		print("I am moving like a bike!");
	}
	
	String toString() => "[Ruedas: ${this.wheels}], Placa: ${this.id}";
}
```