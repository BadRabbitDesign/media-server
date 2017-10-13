#!/usr/bin/env python

import os
basedir = os.path.abspath(__file__)


class Config(object):
    SECRET_KEY=os.environ.get('SECRET_KEY')

    @staticmethod
    def init_app(app):
        pass

class DevelopmentConfig(Config):
    DEBUG = True
    MUSIC_STORAGE_PATH = "/home_wd/music"


config = {
    'development':DevelopmentConfig
}
