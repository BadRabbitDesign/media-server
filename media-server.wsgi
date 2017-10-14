#!/usr/bin/python
import sys
import logging
logging.basicConfig(stream=sys.stderr)
sys.path.insert(0,"/var/www/media-server/")

from ms import application
application.secret_key = 'badRabbitOnceBadAllwaysBad'
