from index import app
from flask import render_template, request
from config import BASE_URL


@app.route('/fema')
def fema():
    page_url = BASE_URL + request.path
    page_title = 'VPR App Template'

    social = {
        'title': "",
        'subtitle': "",
        'img': "",
        'description': "",
        'twitter_text': "",
        'twitter_hashtag': ""
    }

    return render_template('fema.html',
        page_title=page_title,
        social=social,
        page_url=page_url)


@app.route('/fed')
def fed():
    page_url = BASE_URL + request.path
    page_title = 'VPR App Template'

    social = {
        'title': "",
        'subtitle': "",
        'img': "",
        'description': "",
        'twitter_text': "",
        'twitter_hashtag': ""
    }

    return render_template('fed.html',
        page_title=page_title,
        social=social,
        page_url=page_url)


@app.route('/state')
def state():
    page_url = BASE_URL + request.path
    page_title = 'VPR App Template'

    social = {
        'title': "",
        'subtitle': "",
        'img': "",
        'description': "",
        'twitter_text': "",
        'twitter_hashtag': ""
    }

    return render_template('state.html',
        page_title=page_title,
        social=social,
        page_url=page_url)


@app.route('/ngo')
def ngo():
    page_url = BASE_URL + request.path
    page_title = 'VPR App Template'

    social = {
        'title': "",
        'subtitle': "",
        'img': "",
        'description': "",
        'twitter_text': "",
        'twitter_hashtag': ""
    }

    return render_template('ngo.html',
        page_title=page_title,
        social=social,
        page_url=page_url)
