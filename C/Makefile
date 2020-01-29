#
# Example Makefile for C app
#

CC = gcc

OBJECTS = main.o util.o code.o

# Generate an executable from a buncle of many object files
executableBundle: $(OBJECTS)
	$(CC) $(OBJECTS) -o executeme
	$(CC) $(OBJECTS) -o executeme.exe

main.o: main.c util.h code.h
	$(CC) -c main.c

util.o: util.c util.h
	$(CC) -c util.c

code.o: code.c code.h
	$(CC) -c code.c

cleanAll:
	-@echo "Cleaning..."
	-rm executeme
	-rm executeme.exe
	-rm program
	-rm program.exe
	-rm $(OBJECTS)
	-@echo "Clean"

cleanObjects:
	-@echo "Cleaning objects..."
	-rm $(OBJECTS)
	-@echo "Clean"

# Generate an executable from one C file
executable: program.c
	$(CC) program.c -o program
	$(CC) program.c -o program.exe

all: executableBundle executable

