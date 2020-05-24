#
# Universidad El Bosque
# Curso Bif Data y Analitica de datos
# Ejemplo Web Scraping
#
import codecs
import urllib.request
import matplotlib.pyplot as plt
import csv
url="http://www.mambiente.munimadrid.es/opendata/horario.txt"
response=urllib.request.urlopen((url))
cr = csv.reader(codecs.iterdecode(response,'utf-8'))
magnitud = '12'
for row in cr:
    if(row[0]+row[1]+row[2]=='28079004' and row[3]== magnitud):
       hora = 0
       desp = 9
       vs = []
       horas = []
       while hora <=23:
         plt.title("Oxido de nitrogeno: "
                 + row[8]+"/"+row[7]+"/"+row[6])
         if row[desp+2*hora+1]=='V':
           vs.append(row[desp+2*hora])
           horas.append(hora)
           hora +=1
         plt.plot(horas, vs)
         plt.show()
print("end")