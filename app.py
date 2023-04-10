
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, cast,Date,distinct
from datetime import datetime
from dateutil.relativedelta import relativedelta
from sqlalchemy.sql import func

from flask import Flask, jsonify, make_response

#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///AllAus_Weather_History.sqlite")

# reflect an existing database into a new model
Base = automap_base()

# reflect the tables
Base.prepare(autoload_with=engine)

# Save reference to the table
AusCityWeather = Base.classes.auscityweather

# def getlastyeardate(session):
#     latest_date = session.query(func.max(AusCityWeather.date)).first()[0]
#     latest_date = datetime.strptime(latest_date, '%Y-%m-%d')
#     last_year_date = latest_date - relativedelta(years=1)
#     return last_year_date.strftime('%Y-%m-%d')
#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/alldata</br>"
        f"/api/v1.0/city</br>"
        f"/api/v1.0/year</br>"
        f"/api/v1.0/weather/<location></br>"
        f"/api/v1.0/weather/<location>/<year></br>"

    )
@app.route("/api/v1.0/alldata")
def alldata():
    # Create our session (link) from Python to the DB
    session = Session(engine)
    """Return a list of all city and all year"""
    # Query all 
    results = session.query(AusCityWeather.City,AusCityWeather.Date,AusCityWeather.MinTemp ,AusCityWeather.MaxTemp,AusCityWeather.Rainfall,AusCityWeather.WindGustSpeed,AusCityWeather.Evaporation,AusCityWeather.Pressure9am).all()
    session.close()

    results_json = []
    for city,date,mintemp,maxtemp,rainfall,windgustspeed,evaporation,pressure in results:
        temp_results = {}
        temp_results["city"] = city
        temp_results["date"]= date
        temp_results["mintemp"] = mintemp
        temp_results["maxtemp"]= maxtemp
        temp_results["Rainfall"] = rainfall
        temp_results["WindGustSpeed"] = windgustspeed
        temp_results["evaporation"] = evaporation
        temp_results["pressure9am"] = pressure
        results_json.append(temp_results)
    response = make_response(jsonify(results_json))
    response.headers["Access-Control-Allow-Origin"]="*"
    return response

@app.route("/api/v1.0/city")
def city():
    # Create our session (link) from Python to the DB
    session = Session(engine)
    """Return a list of all city"""
    # Query all 
    results = session.query(AusCityWeather.City).distinct().all()
    session.close()

    # Convert list of tuples into normal list
    all_city_list = list(np.ravel(results))
    all_cities = list(set(all_city_list))
    # all_cities.insert(0,"All")
    response = make_response(jsonify(all_cities))
    response.headers["Access-Control-Allow-Origin"]="*"
    return response

@app.route("/api/v1.0/year")
def year():
    # Create our session (link) from Python to the DB
    session = Session(engine)
    # """Return a list of all year"""
    # Query all 
    results = session.query(AusCityWeather.Date).all()
    session.close()

    # Convert list of tuples into normal list
    all_year_list = list(np.ravel(results))
    all_year_temp = [int(x[:4]) for x in all_year_list]
    # print(all_year_temp)
    all_year = list(set(all_year_temp))
    all_year.sort()
    # all_year.insert(0,"All")
    response = make_response(jsonify(all_year))
    response.headers["Access-Control-Allow-Origin"]="*"
    return response

# Returns city weather history
@app.route("/api/v1.0/weather/<location>")
def start(location):
    # Create our session (link) from Python to the DB
    session = Session(engine)
    #get the list of date, minimum maximum and average of the temperature for the location
    results = session.query(AusCityWeather.Date,AusCityWeather.MinTemp,AusCityWeather.MaxTemp,AusCityWeather.Rainfall,AusCityWeather.Evaporation,AusCityWeather.WindGustSpeed,AusCityWeather.Pressure9am).\
    order_by(AusCityWeather.Date).filter(AusCityWeather.City == location).all()

    #return the result as a list of dicts
    results_json = []
    for date,mintemp,maxtemp,rainfall,windgustspeed,evaporation,pressure in results:
        temp_results = {}
        temp_results["date"]= date
        temp_results["mintemp"] = mintemp
        temp_results["maxtemp"]= maxtemp
        temp_results["Rainfall"] = rainfall
        temp_results["WindGustSpeed"] = windgustspeed
        temp_results["evaporation"]= evaporation
        temp_results["pressure9am"] = pressure
        results_json.append(temp_results)

    response = make_response( jsonify(results_json))
    response.headers["Access-Control-Allow-Origin"]="*"
    return response

# Returns the min, max, and average temperatures calculated from the given start date to the given end date
@app.route("/api/v1.0/weather/<location>/<year>")
def locationyear(location,year):
    # Create our session (link) from Python to the DB
    session = Session(engine)
    startdate = year+'-01-01'
    enddate = year+'-12-31'
    #get the list of date, minimum maximum and average of the temperature greater than equal to start date
    results = session.query(AusCityWeather.Date,AusCityWeather.MinTemp,AusCityWeather.MaxTemp,AusCityWeather.Rainfall,AusCityWeather.WindGustSpeed,AusCityWeather.Pressure9am).\
    filter(AusCityWeather.City == location,AusCityWeather.Evaporation,AusCityWeather.Date >= startdate,AusCityWeather.Date <=enddate).\
    order_by(AusCityWeather.Date).all()

    #return the result as a list of dicts
    results_json = []
    for date,mintemp,maxtemp,rainfall,windgustspeed,evaporation, pressure in results:
        temp_results = {}
        temp_results["date"]= date
        temp_results["mintemp"] = mintemp
        temp_results["maxtemp"]= maxtemp
        temp_results["Rainfall"] = rainfall
        temp_results["WindGustSpeed"] = windgustspeed
        temp_results["evaporation"] = evaporation
        temp_results["pressure9am"] = pressure
        results_json.append(temp_results)

    response = make_response( jsonify(results_json))
    response.headers["Access-Control-Allow-Origin"]="*"
    return response

#run the app using Flask
if __name__ == '__main__':
    app.run()

