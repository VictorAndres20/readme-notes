# Install Sdk 2.2 in Ubuntu 16.06
https://dotnet.microsoft.com/learn/dotnet/hello-world-tutorial/install
1. $ sudo wget -q https://packages.microsoft.com/config/ubuntu/16.04/packages-microsoft-prod.deb
2. $ sudo dpkg -i packages-microsoft-prod.deb
3. $ sudo apt-get install apt-transport-https
4. $ sudo apt-get update
5. $ sudo apt-get install dotnet-sdk-2.2

Once you've installed, open a new terminal and run the following command
6. $ dotnet

# Install Sdk 2.1 in Ubuntu 16.06
https://dotnet.microsoft.com/download/linux-package-manager/ubuntu16-04/sdk-2.1.505
1. $ sudo wget -q https://packages.microsoft.com/config/ubuntu/16.04/packages-microsoft-prod.deb
2. $ sudo dpkg -i packages-microsoft-prod.deb
3. $ sudo apt-get install apt-transport-https
4. $ sudo apt-get update
5. $ sudo apt-get install dotnet-sdk-2.1

Once you've installed, open a new terminal and run the following command
6. $ dotnet

############################################################################################################

# Create console app
https://dotnet.microsoft.com/learn/dotnet/hello-world-tutorial/install

$ dotnet new console -o myapp
$ cd myapp
To run
$ dotnet run

# Create webApp app
https://dotnet.microsoft.com/learn/web/aspnet-hello-world-tutorial/create

$ dotnet new webApp -o myWebApp --no-https
$ cd myWebApp
To run on port 5000
$ dotnet run

# Create webApp MVC app

$ dotnet new mvc -o myWebApp --no-https
$ cd myWebApp
To run on port 5000
$ dotnet run

# Create any of above with specific dotnet version

1. $ dotnet --list-sdks
2. $ dotnet --list-runtimes
3. https://docs.microsoft.com/en-us/dotnet/core/versions/selection

#############################################################################################################

# Tool for asp.net code generator
$ dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design
$ dotnet tool install --global dotnet-aspnet-codegenerator

#############################################################################################################

# Target Runtimes
https://docs.microsoft.com/en-us/dotnet/core/rid-catalog

on project-name.csproj, add inside project tag
  <PropertyGroup>
    <TargetFramework>netcoreapp2.2</TargetFramework>
    +<RuntimeIdentifiers>win10-x64;osx.10.12-x64;linux-x64</RuntimeIdentifiers>
  </PropertyGroup>

#############################################################################################################

# Install Packages with nuget .NET CLI
$ dotnet add package Microsoft.EntityFrameworkCore --version 2.2.3

# Uninstall Packages with nuget .NET CLI
$ dotnet remove package Microsoft.EntityFrameworkCore

############################################################################################################

# Entity Framework
http://www.entityframeworktutorial.net/efcore/entity-framework-core.aspx

# Install with nuget .NET CLI
$ dotnet add package Microsoft.EntityFrameworkCore --version 2.2.3

# Install for SQL SERVER with nuget .NET CLI
$ dotnet add package Microsoft.EntityFrameworkCore.SqlServer --version 2.2.3

############################################################################################################

# Generate Models and Controllers
https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-mvc-app/adding-model?view=aspnetcore-2.2&tabs=visual-studio-mac

0. Install require packages
dotnet tool install --global dotnet-aspnet-codegenerator
dotnet add package Microsoft.EntityFrameworkCore.SqlServer --version 2.2.2
dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design

1. Create Model on Models folder
https://docs.microsoft.com/es-es/ef/ef6/modeling/code-first/data-annotations
-- MODELING --
https://docs.microsoft.com/en-us/ef/core/modeling/keys

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace nameApp.Models
{
    public class Facturas
    {
        [Key]
        public int FacturaID{get;set;}

        [Required (ErrorMessage="Este dato es obligatorio")]
        public int NumeroFactura{get;set;}

        [Required (ErrorMessage="Este dato es obligatorio")]
        [DisplayFormat(DataFormatString="{0:dd/MM/yyyy}")]
        public DateTime Fecha{get;set;}

        [Required (ErrorMessage="Este dato es obligatorio")]
        public string TipodePago{get;set;}

        [Required (ErrorMessage="Este dato es obligatorio")]
        public int DocumentoCliente{get;set;}

        [Required (ErrorMessage="Este dato es obligatorio")]
        public string NombreCliente{get;set;}

        [Required (ErrorMessage="Este dato es obligatorio")]
        public int SubTotal{get;set;}

        [Required (ErrorMessage="Este dato es obligatorio")]
        public decimal Descuento{get;set;}

        [Required (ErrorMessage="Este dato es obligatorio")]
        public decimal IVA{get;set;}

        [Required (ErrorMessage="Este dato es obligatorio")]
        public decimal TotalDescuento{get;set;}

        [Required (ErrorMessage="Este dato es obligatorio")]
        public decimal TotalImpuesto{get;set;}

        [Required (ErrorMessage="Este dato es obligatorio")]
        public decimal Total{get;set;}

        //RELATIONS
        public ICollection<Detalles> Detalles { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace AppFacturacion.Models
{
    public class Detalles
    {
        [Key]
        public int idDetalle{get;set;}

        [Required (ErrorMessage="Este dato es obligatorio")]
        public int idFactura{get;set;}

        [Required (ErrorMessage="Este dato es obligatorio")]
        public int idProducto{get;set;}

        [Range(1, 999999999)]
        [Required (ErrorMessage="Este dato es obligatorio")]
        public int Cantidad{get;set;}

        [Range(0, 999999999)]
        [Required (ErrorMessage="Este dato es obligatorio")]
        public int PrecioUnitario{get;set;}

        public Productos Productos{get;set;}
        public Facturas Facturas{get;set;}

    }
}

2. Create Context on Models folder

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace facturacionApp.Models
{
    public class FacturacionContext : DbContext
    {
        public FacturacionContext (DbContextOptions<FacturacionContext> options)
            : base(options)
        {
        }

		  protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Facturas>()
                .ToTable("facturas");

            modelBuilder.Entity<Detales>()
                .ToTable("detalles");

				/* Si se necesita especificar la tabla de la base de datos a la que la entidad pertence* /
				modelBuilder.Entity<UsuarioLicencia>()
                .ToTable("usuario_licencia");

				/** Two Primary Keys */
            modelBuilder.Entity<UsuarioLicencia>().HasKey(table => new {
                table.id_usuario, table.cod_t_licencia
            });

				/* Si se necesita especificar hacia que llave foranea apunta un atributoEntidad de la entidad
				 * En este caso, La tabla Asignacion tiene dos llaves foraneas que apuntan a una misma tabla,
				 * Por lo tanto es necesario especificar que llave foranea es la que apunta cada entidad de la tabla Usuario
				 * Sirve tambien cuando la llave foranea no se llama igual a la llave primaria de la tabla foranea
				* /
				modelBuilder.Entity<Asignacion>()
                    .HasOne(a => a.usuarioEst)
                    .WithMany(e => e.asignacionesEst)
                    .HasForeignKey(a => a.id_usuario_estu);

            modelBuilder.Entity<Asignacion>()
                    .HasOne(a => a.usuarioProf)
                    .WithMany(e => e.asignacionesProf)
                    .HasForeignKey(a => a.id_usuario_prof);

        }

        public DbSet<facturacionApp.Models.Facturas> Facturas { get; set; }
        public DbSet<facturacionApp.Models.Detalles> Detalles { get; set; }
		  public DbSet<facturacionApp.Models.UsuarioLicencia> UsuarioLicencia { get; set; }
		  // OTHER Models
    }
}

3. Modify Startup.cs file adding on ConfigureServices method, adding Context

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using AppFacturacion.Models;
...
	public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<CookiePolicyOptions>(options =>
            {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });

            +services.AddDbContext<FacturacionContext>(options =>
            +    options.UseSqlServer(Configuration.GetConnectionString("FacturacionContext")));

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
        }

4. appsettings.json, add ConnectionString
https://www.connectionstrings.com/sql-server/
...
"ConnectionStrings": {
    "FacturacionContext": "Server=localhost;Database=facturacionstd;User Id=safacturacion;Password=Facturacion123*;"
  }

5. Create Controller 
$ dotnet aspnet-codegenerator controller -name FacturasController -m Facturas -dc FacturacionContext --relativeFolderPath Controllers --useDefaultLayout --referenceScriptLibraries

############################################################################################################

# Redirect from Controller to other controller view

return RedirectToAction("Index","Usuario");

############################################################################################################

# For each on view using DataView
@using NameApp.Models

...

<tbody>
	@foreach(var est in ViewData["profesores"] as IEnumerable<Usuario>){
		<tr>
			<td>
				{@est.id_usuario}
			</td>
			<td>
				{@est.nom_usuario}
			</td>
			<td>
				{@est.correo_usuario}
			</td>
			<td>
				{@est.cod_t_usuario}
			</td>
		</tr>
	}
</tbody>

############################################################################################################

# Getting form data with IFormCollection

using Microsoft.AspNetCore.Http;

...

[HttpPost]
public IActionResult CrearEstudiante(IFormCollection form)
{ 
	/** Pasar mensjaje de alerta en none */
   ViewData["ALERT"]=form["nomEst"].ToString();
   return View("Estudiantes");
}

############################################################################################################

# Some queries using Entity Framework Core

# Include to get relations
ViewData["estudiantes"]=_context.Usuario.Where(u => u.cod_t_usuario==2).Include(u => u.estadoUsuario).Include(u => u.tipoUsuario).ToList();

# Order by


############################################################################################################

# Http.Session
https://docs.microsoft.com/en-us/aspnet/core/fundamentals/app-state?view=aspnetcore-2.2

1. on Startup.cs add

+ using Microsoft.AspNetCore.Session;

...

        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<CookiePolicyOptions>(options =>
            {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });

            /** Context For Entity Framework */
            services.AddDbContext<DBContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DBContext")));

            /** SESSION STATE
             * https://docs.microsoft.com/en-us/aspnet/core/fundamentals/app-state?view=aspnetcore-2.2
             */
            + services.AddDistributedMemoryCache();
            + services.AddSession(options =>
            + {
            + options.IdleTimeout = TimeSpan.FromSeconds(120);
            + options.Cookie.HttpOnly = true;
            + // Make the session cookie essential
            + options.Cookie.IsEssential = true;
            + });
            /************** */

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseCookiePolicy();

            /* TO USE SESSION STATE */
            + app.UseSession();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });

2. On Controllers you can use Http.Session.setString("key","value"), Http.Session.getString("key")

using Microsoft.AspNetCore.Http;

...

HttpContext.Session.SetString("userName","Nombre string");
HttpContext.Session.SetInt32("userId",123456);

string session=HttpContext.Session.GetString("userName");
int sessionId=(int)HttpContext.Session.GetInt32("userId");

HttpContext.Session.Remove("userName");
HttpContext.Session.Remove("userId");

# Using static Model to handle sessions

1. Model static

using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Session;

namespace CarClassApp.Models
{
    public static class SessionHandler
    {
        public static void createSession(HttpContext context,string name, int id)
        {
            context.Session.SetString("userName",name);
            context.Session.SetInt32("userId",id);
        }

        public static bool validateSession(HttpContext context)
        {
            if(context.Session.GetString("userName")!=null && context.Session.GetInt32("userId")!=null)
            {
                return true;
            }
            return false;
        }

        public static void removeSession(HttpContext context)
        {
            context.Session.Remove("userName");
            context.Session.Remove("userId");
        }
    }
}

2. Using it on Controller

using Microsoft.AspNetCore.Http;
...

SessionHandler.createSession(HttpContext,usuario.nom_usuario,usuario.id_usuario);

SessionHandler.removeSession(HttpContext);


############################################################################################################

# Get Client IP
1. Startup.cs

				services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            /** HttpContextAccessor FOR IP CLIENT
             * https://edi.wang/post/2017/10/16/get-client-ip-aspnet-20
             */
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            /************** */

2. Controller

using Microsoft.AspNetCore.Http;
...
		  private IHttpContextAccessor _accessor;
...
		  public AdminController(IHttpContextAccessor accessor)
        {
            _accessor = accessor;
        }
...
		  _accessor.HttpContext.Connection.RemoteIpAddress.ToString();

############################################################################################################
