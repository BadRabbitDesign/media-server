
from __future__ import print_function # In python 2.7
from flask import Blueprint, Flask, jsonify, request, current_app
import os
import sys
import logging
import re


logger = logging.getLogger('root')
logger.debug('loaded API module')

app_path = os.getcwd()
music_dir = ("%s/app/static/music" % os.getcwd())
print ("music folder =%s" %(music_dir))

api = Blueprint('api',__name__)

def atoi(text):
    return int(text) if text.isdigit() else text

def natural_keys(text):
    '''
    alist.sort(key=natural_keys) sorts in human order
    http://nedbatchelder.com/blog/200712/human_sorting.html
    (See Toothy's implementation in the comments)
    '''
    return [ atoi(c) for c in re.split('(\d+)', text) ]


@api.route('/_get_artists')
def get_artists():
    current_app.logger.debug("API CWD = %s" % os.getcwd())
    current_app.logger.debug('get artists')
    artists = [o for o in os.listdir(music_dir) if os.path.isdir(os.path.join(music_dir,o))]
    artists.sort()
    return jsonify(artists)



@api.route('/_get_albums', methods=['GET', 'POST'])
def get_album():
    artist = request.args.get('artist', '', type=str)
    current_app.logger.debug('api _get_albums = %s',artist)
    search_dir = os.path.join(music_dir,artist)
    albums = [o for o in os.listdir(search_dir) if os.path.isdir(os.path.join(search_dir,o))]
    albums.sort()
    return jsonify(albums)


@api.route('/_get_tracks')
def get_tracks():
    artist = request.args.get('artist', '', type=str)
    album = request.args.get('album', '', type=str)
    current_app.logger.debug("get tracks %s-%s",artist,album)

    search_dir = os.path.join(music_dir,artist,album)
    tracks =  [o for o in os.listdir(search_dir)]
    tracks.sort()
    url = [("{0}/{1}/{2}/{3}".format("music",artist,album,track)) for track in tracks]
    data = (tracks,url)
    current_app.logger.debug(data)
    json_data = jsonify({'tracks':tracks,'url':url})
    print(json_data, file=sys.stderr)
    return json_data
