# Fantansy Map Manager

The idea was to create a lightweight app to maintaint a fantasy map and the places has been visited during the an RPG gameplay. 

### Map 
The places are  visualized on an Interactive Map. By __clicking__ on the _marker_ the _popup_ shows the description and any other content related to the place.

The _pointer_ (top-left corner) can be used to capture coordinates for new places. Simple drag the pointer to the desired place and __copy-paste__ the coordinates into the markdown. 

You can turn off and on layers (control at right) to get better overview of the places.

### Places 
Describing places is easy just by editing a [Markdown file](https://simplemde.com/markdown-guide).
Each Heading 2 `##` represents a place in the markdown file. The location and other meta data can be added as attribute `{lat=<latitude> lng=<longitude>}`. 
__Example:__
```
## This is a place {id=1 lat=-30 lng=30 icon=home}
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam consectetur justo sit amet pellentesque iaculis. Donec fermentum, nibh nec cursus gravida, nibh sem vulputate dolor
![image](/images/upload_60b0192d029ff327321567ae1669fe0a){width=200px}

## Another place {...}
...
```

The content _inside_ the heading will be presented as popup. It is posible to upload images by simple __drag and drop__  into the editor.

---
## Tech

Super simple Single Page App (SPA) displaying [Maptiles](https://openmaptiles.org) and [Markdown files](https://simplemde.com) with [Express](http://expressjs.com) backend to handle static file storage and media uploads. Markdown file is the storage that descibes the places with Semantic formatting.  The raster map has been created with [maptiler.com](http://maptiler.com).

__Frameworks and plugins__
- [LeafletJs](http://leafletjs.com)
- [Leaflet Awesome Markers](https://github.com/lvoogdt/Leaflet.awesome-markers)
- [JQuery](https://jquery.com)
- [Bootstrap](http://getbootstrap.com)
- [ionicon](http://ionicons.com)
- [markdown-it](https://github.com/markdown-it/markdown-it)
- [markdown-it-attrs](https://github.com/arve0/markdown-it-attrs)
- [SimpleMDE](https://simplemde.com)
- [Inline Attachment](https://github.com/Rovak/InlineAttachment)
- [express](http://expressjs.com)
- [express-formidable](https://www.npmjs.com/package/express-formidable)

## Deploy
You can deploy the app either to [OpenShift](htt://openshift.com) or [Heroku](http://heroku.com/)
All you need to setup some environment variables:

- __OpenShift__
  - OPENSHIFT_NODEJS_PORT=8080
  - OPENSHIFT_NODEJS_HOST=0.0.0.0
  - PROJECT=project/my-project
- __Heroku__
  - HOST : 0.0.0.0
  - PROJECT=project/my-project // relative path for the __Project__

## Project 
The Project folder has the following structure (see demo):
```
/maptiles // maptiles for leaflet - you can use maptiler or other tool.
/images   // folder for receiving image uploads
places.md // places markdown
```

## Develop

``` 
$ git clone https://github.com/zsim0n/fantasy-map
cd fantasy-map
npm install
npm start:dev
```

## Roadmap

- Bugfixes
- Adding a gallery to present other multimedia materials like charachers, items with short description etc.
