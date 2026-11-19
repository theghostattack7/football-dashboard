from flask import Flask, jsonify
from flask_cors import CORS
import json
import os
from pathlib import Path

from football_stats import (
    matches, scored, conceded, won, lost,
    tied, teams, points, position
)
app = Flask(__name__)
CORS(app)

json_path = Path(__file__).with_name('laliga25:26.json')

with open(json_path, 'r') as file:
    data = json.load(file)

@app.route('/api/matches')
def get_matches():
    return jsonify(data['matches'])

@app.route('/api/teams')
def get_teams():
    return jsonify(teams())


@app.route('/api/stats/<team>')
def get_stats(team):
    stats = {
        'played': matches(team),
        'scored': scored(team),
        'conceded': conceded(team),
        'won': won(team),
        'lost': lost(team),
        'tied': tied(team),
        'points': points(team),
        'position': position(team)
    }
    print("Received team:", team)
    return jsonify(stats)

if __name__ == '__main__':
    app.run(debug=True, port=5000)