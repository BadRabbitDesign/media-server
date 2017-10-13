# media-server
   Very simple media server designed to run on a raspberry pi based on __flask__ / __jquery__
Its not meant to be clever just an easy way to serve music files to various devices in 
a 'home' environment.

   simple single page app with a __REST__ like api.

   Music files are purely file system stored:

```
/static
   |
   -/music
       |
       |--Artist/
       |     |
       |     |-album-1/
       |     |   |
       |     |   |-track 1.mp3
       |     |   |-track 2.odg
       |     |
       |     |-album-2/
       |     |   |
       |     |   |-track 1.mp3
```
__not a database in sight...__
    
# !WIP!

## TODO
* create .wsgi
* set up static file serving via httpd
* refactor js to reduce redundancy
* create distribution tools
