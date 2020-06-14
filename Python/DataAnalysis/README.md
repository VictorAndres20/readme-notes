# Data Analysis with Python using JupiterNotebook and JupiterLab

For this example, I used a public DataSet from 
https://www.datos.gov.co/
More specific:
https://www.datos.gov.co/Salud-y-Protecci-n-Social/Tasa-de-mortalidad-por-tumor-maligno-de-la-mama-CI/y5a7-nuqf

---------------------------------------------------------------------------------------------------------------------------------------------

## Data Visualize Libs
**MATPLOTLIB**
https://matplotlib.org/gallery/index.html

**SEABORN**
https://seaborn.pydata.org/examples/index.html

---------------------------------------------------------------------------------------------------------------------------------------------

## Example in JupiterNotebook

1. Go to JupiterNotebook, and click `Try it in oyur browser`, or intall if you want
https://jupyter.org/

2. Click JupiterLab and create new Notebook

3. Upload you CSV file from https://www.datos.gov.co/Salud-y-Protecci-n-Social/Tasa-de-mortalidad-por-tumor-maligno-de-la-mama-CI/y5a7-nuqf

4. You first intall `pandas_profilling`. Execute from code space in your notebook
```
pip install pandas_profiling
```
Run

5. Import `pandas` and `pandas_profiling`
```
import pandas as pd
import pandas_profiling as pf
```
Run

6. Get data to profile in your file
```
data = pd.read_csv("TASA_MORTALIDAD.csv")
```
Run

7. You can visualize it in a table with executing
```
data.head()
```
Run

8. Profile data with executing
```
pf.ProfileReport(data)
```
Run

9. Imports for visualize
```
import numpy as np
import scipy.stats
import pandas as pd

import matplotlib
import matplotlib.pyplot as plt

import seaborn as sns

from IPython import display
from ipywidgets import interact, widgets

%matplotlib inline
```
Run

10. Visualize MATPLOT
**scatter**
```
data[data.fuente == "Estadisticas Vitales - EEVV, Consultado en la bodega de datos del SISPRO 4 de mayo de 2020"].plot.scatter('nomdepto','2018')
```

**scatter setting color to dots**
```
fig, ax = plt.subplots(1,1,figsize = (18, 6))
ax.scatter(data['nomdepto'], data['2018'], c='tab:brown', s=len(data['nomdepto']), label='Cantidad',alpha=0.3, edgecolors='none')
ax.legend()
ax.grid(True)

plt.show()
```

**Filling the area between lines**
```
x = data['2017']
y = data['2018']

# fit a linear curve an estimate its y-values and their error.
a, b = np.polyfit(x, y, deg=1)
y_est = a * x + b
y_err = x.std() * np.sqrt(1/len(x) +
                          (x - x.mean())**2 / np.sum((x - x.mean())**2))

fig, ax = plt.subplots()
ax.plot(x, y_est, '-')
ax.fill_between(x, y_est - y_err, y_est + y_err, alpha=0.2)
ax.plot(x, y, 'o', color='tab:brown')
```

11. Data Visualize with SEABORN
```
import seaborn as sns
```

**Line Representation for many entities**
```
def lineplotSeabron(maxDate, totalDeps):
    sns.set(style="whitegrid")
    columns = []
    leyend = []

    min = 2005
    if not maxDate:
        max = 2018 + 1
    else:
        max = int(maxDate) + 1
        
    if not totalDeps:
        maxDep = 30
    else:
        maxDep = totalDeps

    for i in range(min, max):
        columns.append(str(i))
    matrix = []
    for i in columns:
        tmpArray = []
        for j in range(maxDep):
            tmpArray.append(data[i][j])
        matrix.append(tmpArray)
    
    for i in range(maxDep):
        leyend.append(data['nomdepto'][i])

    values = matrix
    dates = columns
    dataPlot = pd.DataFrame(values, dates, columns=leyend)
    dataPlot = dataPlot.rolling(7).mean()

    sns.lineplot(data=dataPlot, palette="tab10", linewidth=2.5, dashes=False, size="coherence")
```

12. Use Interactive Widgets
**Select or Combobox AND Slider**
```
options = []
for i in range(2013, 2019):
    options.append(str(i))
interact(lineplotSeabron, maxDate=widgets.Combobox(options=options), totalDeps=widgets.IntSlider(min=1, max=30, step=1, value=4))
```

---------------------------------------------------------------------------------------------------------------------------------------------