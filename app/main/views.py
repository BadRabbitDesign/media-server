#!/usr/bin/env python


from datetime import datetime
from flask import render_template,session,redirect,url_for,request
from . import main


@main.route('/',methods=['GET','POST'])
def index():
    print ("index")
    print request.base_url
    return render_template('index.html',base_url=request.base_url)