#!/usr/bin/env python

from flask import Flask
from config import config


def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    config[config_name].init_app(app)


    from main import main as main_blueprint
    from api_1_0 import ms_api 


    app.register_blueprint(main_blueprint)
    app.register_blueprint(ms_api.api, url_prefix='/api')



    return app