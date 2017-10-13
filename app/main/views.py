#!/usr/bin/env python


from datetime import datetime
from flask import render_template,session,redirect,url_for
from . import main


@main.route('/',methods=['GET','POST'])
def index():
    print ("index")
    return render_template('index.html')