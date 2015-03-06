IAW-final
=========

Entrega para el final de la materia Ingeniería de Aplicaciones Web (previa al Proyecto Final de Carrera)

# DESCRIPCIÓN #

## Objetivos de la aplicación - Características implementadas ##
  * Seleccionar aplicación *(pantalla inicial)*
    - **Ubicación actual**: encuentra la más cercana mediante el servicio de geolocalización
    - **Ubicaciones vistas**:
      - Permite agregar ubicaciones seleccionando de una lista y quitarlas
      - Guarda en la memoria del dispositivo *(localStorage)* las ubicaciones seleccionadas 
    - *Cada ubicación corresponde a una estación meteorológica.*
  * Ver en la pantalla inicial síntesis del estado actual del tiempo de cada ubicación seleccionada
  * Para cada ubicacón, consultar datos actuales del tiempo, pronóstico actual, y mapa (Google Maps, imagen satelital)
 
## Obtención de los datos ##
  * Lista de todas las ubicaciones disponibles, con su nombre y geolocalización: guardada en la aplicación de forma estática
  * Ubicación más cercana: la encuentra comparando la geolocalización del dispositivo, con la lista de todas las ubicaciones 
  * Consulta de los datos actuales de tiempo y pronóstico de las ubicaciones seleccionadas: datos obtenidos directamente de los **XML del servidor de MeteoBahia**
    - Datos actuales (registro más reciente de la estación, se actualizan con distinta frecuencia):
        http://meteorologia.cerzos-conicet.gob.ar/mobile/xml/now-[ID].xml
    - Pronóstico a 5 días (se actualiza 4 veces al día):
        http://meteorologia.cerzos-conicet.gob.ar/mobile/forecast/for-[ID].xml        
    - En ambos casos 'ID' es el id de la estación
     - por ejemplo 'bb' es Bahía Blanca (CONICET): http://meteorologia.cerzos-conicet.gob.ar/mobile/xml/now-bb.xml - http://meteorologia.cerzos-conicet.gob.ar/mobile/forecast/for-bb.xml
    - La aplicación parsea el XML, y obtiene de ahí los datos que se quieren mostrar
    - *En un navegador esto no funciona, ya que se viola la política de same origin. Para esto debe usarse un proxy CORS. En la aplicación compilada e instalda no hay problema, ya que se indica en white list el dominio consultado*           


## Tecnologías usadas (frameworks, librerías) ##
  * Android SDK
  * Apache Cordova 3.5 *(para compilar aplicación para Android)* 
  * JQuery 1.11
  * RequireJS 2.1.14 *(manejo de módulos javascript AMD, carga asincrónica de scripts)*
  * Backbone 1.1.2 *(arquitectura MVC javascript)*
  * Underscore 1.6 *(dependencia de Backbone - template system)*
  * Librerías (plugins) js:
    - google maps
    - jquery.xml2json 
  * JQueryMobile 1.4.3 *(HTML5 mobile framework)*
  * Tema JQueryMobile: NativeDroid *(estilo app nativa Android)*
  * Sass *(desarrollo y compilación de estilos CSS)*


    - Instalación de frameworks y librerías: descarga de archivos desde el sitio de cada uno

## ARQUITECTURA DE LA APLICACIÓN ##

### Backend (server-side) ###
  * No desarrollado. Se consulta directamente XML del serivdor de MeteoBahía

### Hybrid app (client-side) ###
  * Web app - Single Page Application HTML5
    - AMD: Definición de módulos y carga asincrónica de scripts, mediante requirejs
    - Arquitectura MVC: Framework Backbone
        + Modelos
          - Ubicación: *información de una estacion*
            - UbicacionActual: *datos actuales de la estación (fetch desde XML - parse)*
            - UbicacionPronostico: *pronostico de la estacion (fetch desde XML - parse)*
        + Colecciones
          - Ubicaciones: *lista de estaciones disponibles (data guardada en json incluido en la aplicación)*
          - UbicacionesGuardadas: *ubicaciones seleccionadas y vistas (guardadas en localstorage)* - SINGLETON
        + Router (controller): Direcciona a distintas vistas usando url
          - "":  vista home
          - "ubicacion/:id": vista ubicacion con ese id
          - *Guarda las vistas de ubicaciones creadas* 
        + Vistas (inicialización, escucha de eventos, manipulación de DOM)
          - Home: *página inicial - encargada de cargar las colecciones de ubicaciones, encontrar más cercana, crear subvistas y actualizar datos* - SINGLETON
            - UbicacionItem: *ubicación mostrada en la pantalla inicial (sistesis del estado actual)*
            - UbicacionItemCerca: *ubicación más cercana, mostrada en pantalla inicial*  
          - UbicacionPage: *pagina de cada ubicación - encargada de crear subvistas y hacer fetch de los datos*
            - UbicacionActual: *sección datos actuales*
            - UbicacionPronostico: *sección pronostico*
            - UbicaciónMapa: *carga módulo de googlemaps y crea mapa en la localización de la ubicación* 
          - Panel: *panel izquierdo para navegación* - SINGLETON
    - Web UI HTML5: JQueryMobile
        - Se definen templates con datos dinámicos que luego son cargados por las vistas mediante Underscore
        - Elementos HTML5 de JQueryMobile
        - Tema NativeDroid
        - Estilos propios. Creados mediante SASS   
  * Apache Cordova - Compilación de aplicación nativa
      - La web app se incluye en una WebView. La aplicación móvil usa una instancia de su navegador web para ejecutar la aplicación
      - Cordova javascript API - Plugins: se incluye en la aplicación código javascript que permite a la app acceder a funcionalidades nativas.
        + Plugin: geolocalización
  * Aplicación Android: 
    - Luego de compilar con Apache Cordova queda una aplicaicón instalable en android.
    - El usuario no distingue a simple vista entre una aplicación nativa y una híbrida
      - La aplicación híbrida puede tener peor perfomance, ya que se ejecuta sobre una webview, toda su lógica está en javascript y renderiza HTML + CSS (en lugar de usar el lenguaje nativo del sistema operativo, Java en el caso de Android)
      - La aplicación híbrida puede no seguir las líneas de estilo del sistema operativo         


## Diseño de pantallas - User interface ##
  * Basado en el tema NativeDroid de JqueryMobile
  * Panel de navegación a la izquierda (no se terminó de implementar)
  * Pantalla principal con la lista de ubicaciones vistas y la más cercana
  * Pantalla con información de una ubicación: scrolling hacia abajo (cada sección en forma de cards) 


## Workflow desarrollo ##
### Servidor ###
  No hubo desarrollo de backend

### Hybrid app ###
  * Desarrollo web HTML5
    - Descarga de librerías - frameworks
    - Desarrollo de lógica en javascript (arquitectura MVC con backbone)
    - Templates con HTML
    - Estilos usando SASS: se desarrolla distintos archivos, SASS luego compila en uno solo 
  * Debugging y testeo
    - Corriendo servidor (XAMPP - Apache) 
    - En la PC con Google Chrome (herramientas para desarrolladores)
    - También mediante Google Chorme, emulación de Phonegap con Ripple Emulator
    - En celular Android, desde el navegador default. Viendo mensajes en consola con adb 
  * Building, compiling & running app
    - CLI Apache Cordova

	
## Estructura del proyecto ##	
  * **/phonegap**: cordova app
    * /platforms: aquí van las aplicaciones compiladas para cada plataforma
    * /plugins: plugins instalados para esta aplicación
    * /www: web app (lo mismo que /www, pero no se incluyen los archivos de desarrollo)
    - config.xml: configuraciones de la aplicaicón Cordova
  * **/www**: web app  (usada para desarrollo)
    * /css: estilos
    * /data: datos estáticos incluidos en la aplicación
    * /js:  scripts
        * /app
            * /collections: colecciones
            * /lib: plugins y librerías desarrolladas por mí
                - geolocalización.js: funciones para calcular distancias y cercanía
                - gmaps.js: módulo encargado de renderizar google maps
                - jquery.xml2json: converts XML (document of code) into a JSON object
            * /models: modelos
            * /views: vistas  
            - app.js: inicialización de la app - router
        * /vendor: frameworks y librerías
        - jquerymobile.config: configuraciones de jquerymobile
        - main.js: inicialización de la aplicación: este es el script que carga requirejs - define modulos
    * /sass: archivos de estilizacion, para ser compilados en css (desarrollo)
    * /templates: htmls correspondientes a las vistas
    - index.html: single page: "entry-point" de la aplicación     

# ANÁLISIS Y CONCLUSIONES  #    

### Perfomance ###

### Ventajas y limitaciones ###