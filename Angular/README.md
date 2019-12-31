# Get started with angular cli
https://angular.io/


----------------------------------------------------------


## Create project
```
$ ng new project-name
$ ng serve --port 3000
```

----------------------------------------------------------


## GENERATE with cli
https://angular.io/cli/generate


----------------------------------------------------------

## Generate Module

**Module on src/app**
```
$ ng g m moduleName
```

**Module on src/app/folder**
```
$ ng g m folder/muduleName
```

----------------------------------------------------------


## Generate Component

**Component on src/app**
```
$ ng g c componentName
```

**Component on src/app/folder**
```
$ ng g c folder/componentName
```

----------------------------------------------------------

# ROUTING
https://medium.com/@astamataris/setting-up-routing-in-a-multi-module-angular-4-app-using-the-router-module-d8e610196443

----------------------------------------------------------


## Routing only on app.module.ts

1. Create app-routing.module.ts 
```
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/** All components you are routing */
import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroesComponent }      from './heroes/heroes.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';

/** Array object of all routes for render a component */
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'heroes', component: HeroesComponent }
];

/** Add routes to RouterModule.forRoot method */
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
```

2. import your router on app.module.ts and ALL COMONENTS you are using on app-routing.module.ts, or whatever module you need

```
import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
     
import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';
import { HeroesComponent }      from './heroes/heroes.component';
     
import { AppRoutingModule }     from './app-routing.module';
     
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
```

3. Call this router on aoo.component.html, or other html you need with
```
<router-outlet></router-outlet>
```
4. Go to routes with routerLink props
```
<a routerLink="/dashboard">Dashboard</a>
<a routerLink="/heroes">Heroes</a>
```

----------------------------------------------------------

## Routing on app.module.ts and other submodules
https://www.tektutorialshub.com/angular/angular-routing-between-modules/

1. Create the MAIN routing
- 1. Create AppRoutingModule, the MainModule for the application

```
import {NgModule} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';

/** Components */
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

const appRoutes:Routes=[
    {
        path:'', redirectTo:'/inicio/inicio',pathMatch:'full'
    },
    {
        path:'**', component:PageNotFoundComponent
    }
];

@NgModule({
    imports:[
        RouterModule.forRoot(appRoutes,{ enableTracing: true })
    ],
    exports:[
        RouterModule
    ]
})

export class AppRoutingModule{}
```

- 2. Create Import AppRoutingModule on AppModule
```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import {AppRoutingModule} from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule

    /** ALWAYS clled at last */
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

- 3. Router uotlet on app-component.html
```
<router-outlet></router-outlet>
```

2. Create Secondary module, SecondaryRoutingModule, Secondary Main Component, Secondary components

- 1. Secondary Module Routing
```
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

/** Main Component of this module, this will have router-outlet */
import {PrincipalComponent} from './principal/principal.component';

/** Components to route on Principal Page */
import {WelcomeComponent} from './welcome/welcome.component';
import {ServicesComponent} from './services/services.component';

const welcomeRoutes:Routes=[
    {
        path:'inicio', component:PrincipalComponent,children:[
            {
                path:'inicio',component:WelcomeComponent
            },
            {
                path:'servicios', component:ServicesComponent
            }
        ]
    }
]

@NgModule({
    imports:[
        RouterModule.forChild(welcomeRoutes)
    ],
    exports:[
        RouterModule
    ]
})

export class PrincipalRoutingModule{}
```

- 2. On Secondary Module
```
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome/welcome.component';
import { ServicesComponent } from './services/services.component';

import {PrincipalRoutingModule} from './principal-routing.module';
import { PrincipalComponent } from './principal/principal.component';

@NgModule({
  imports: [
    CommonModule,

	 /** LAST */
    PrincipalRoutingModule
  ],
  declarations: [WelcomeComponent, ServicesComponent, PrincipalComponent]
})
export class PrincipalModule { }
```

- 3. On Secondary Main Component .html
```
<p>
  Nav Bar
</p>
<router-outlet></router-outlet>
<p>
  Footter
</p>
```

3. Import all secondaries modules on App Module
```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

/** 
 * Secondaries Modules 
 * 
*/
import {PrincipalModule} from './principal/principal.module';

import {AppRoutingModule} from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    PrincipalModule, //----------------->Secondary MODULE

    /** ALWAYS clled at last */
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```


----------------------------------------------------------


# Integrate Bootstrap on Angular
https://medium.com/@smarrerof/c%C3%B3mo-arrancar-un-proyecto-angular-6-utilizando-bootstrap-4-y-font-awesome-4-5322c834c117}
https://stackoverflow.com/questions/45680644/angular-4-bootstrap-dropdown-require-popper-js


1. Install Bootstarp and Font awesome
```
$ npm install popper.js
$ npm install jquery
$ npm install bootstrap
$ npm install font-awesome
```

2. On angular.json. Note that Jquery and Popper.js ALWAYS BEFORE bootstrap.min.js
```
				...
				"styles": [
              "node_modules/bootstrap/dist/css/bootstrap.min.css",
              "node_modules/font-awesome/css/font-awesome.css",
              "src/styles.css"
            ],
            "scripts": [
              "node_modules/jquery/dist/jquery.slim.min.js",
              "node_modules/popper.js/dist/umd/popper.min.js",
              "node_modules/bootstrap/dist/js/bootstrap.min.js"
            ]
				...
```

3. Use it on components.html normaly


----------------------------------------------------------

# MD Bootstrap RECOMENDED TO BEFORE INSTALL bootstrap

1. Inatll it with npm
```
$ npm install angular-bootstrap-md
```

2. On app.module.ts
```
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

@NgModule({
    imports: [
        MDBBootstrapModule.forRoot()
    ]
});
```

3. On angular.json
```
"schematics": {
    "@schematics/angular:component": {
      "styleext": "scss"
    }
  }
```

4. Make sure you have src/styles.scss. If you have src/styles.css instead, rename it to .scss.

if you want to change styles in existing project you can use ng set defaults.styleExt scss

5. Install Libraries
```
$ npm install chart.js@2.5.0 @types/chart.js @types/chart.js @fortawesome/fontawesome-free hammerjs
```

6. on angular.json
```
"styles": [
    "node_modules/@fortawesome/fontawesome-free/scss/fontawesome.scss",
    "node_modules/@fortawesome/fontawesome-free/scss/solid.scss",
    "node_modules/@fortawesome/fontawesome-free/scss/regular.scss",
    "node_modules/@fortawesome/fontawesome-free/scss/brands.scss",
    "node_modules/angular-bootstrap-md/scss/bootstrap/bootstrap.scss", /IMPORTANT if you had installed bootstrap from npm, CHANGE this to "node_modules/bootstrap/scss/bootstrap.scss"
    "node_modules/angular-bootstrap-md/scss/mdb-free.scss",
    "src/styles.scss"
],
"scripts": [
  "node_modules/chart.js/dist/Chart.js",
  "node_modules/hammerjs/hammer.min.js"
],
```


----------------------------------------------------------


# Sesion Storage
```
sessionStorage.setItem("key", "value");
var lastname = sessionStorage.getItem("key");
sessionStorage.removeItem("key");
sessionStorage.clear(); //--------> REMOVING ALL 
```


----------------------------------------------------------