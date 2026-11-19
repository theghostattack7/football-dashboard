import json
with open('laliga25:26.json','r') as file:
    data_25_26 = json.load(file)

def teams():
    list_of_teams = []
    for match in data_25_26['matches'][0:10]:
        list_of_teams.append(match['team1'])
        list_of_teams.append(match['team2'])
    return sorted(list_of_teams)



def matches(team):
    matches_played = 0
    for match in data_25_26['matches']:
        if team in match['team1'] or team in match['team2']:
            matches_played += 1
    print(f'{team} played {matches_played} matches in the 25/26 season')
    return matches_played


def scored(team):
    goals_scored = 0 
    for match in data_25_26['matches']:
        if team in match['team1'] or team in match['team2']:
            print(match['team1'], match['team2'], match['score'])
        if team in match['team1']:
            goals_scored += match['score']['ft'][0]
        elif team in match['team2']:
            goals_scored += match['score']['ft'][1]
    print(f'{team} scored {goals_scored} goals in the 25/26 season')
    return goals_scored

def conceded(team):
    goals_conceded = 0 
    for match in data_25_26['matches']:
        if team in match['team1']:
            goals_conceded += match['score']['ft'][1]
        elif team in match['team2']:
            goals_conceded += match['score']['ft'][0]
    print(f'{team} conceded {goals_conceded} goals in the 25/26 season')
    return goals_conceded

def won(team):
    matches_won = 0 
    for match in data_25_26['matches']:
        if team in match['team1']:
            if match['score']['ft'][0] > match['score']['ft'][1]:
              matches_won += 1
        elif team in match['team2']:
         if match['score']['ft'][1] > match['score']['ft'][0]:
            matches_won += 1
    print(f'{team} won {matches_won} matches in the 25/26 season')
    return matches_won

def lost(team):
    matches_lost = 0 
    for match in data_25_26['matches']:
        if team in match['team1']:
          if match['score']['ft'][0] < match['score']['ft'][1]:
              matches_lost += 1
        elif team in match['team2']:
          if match['score']['ft'][1] < match['score']['ft'][0]:
            matches_lost += 1
    print(f'{team} lost {matches_lost} matches in the 25/26 season')
    return matches_lost

def tied(team):
    matches_tied = 0 
    for match in data_25_26['matches']:
     if team in match['team1'] or team in match['team2']:
          if match['score']['ft'][0] == match['score']['ft'][1]:
               matches_tied += 1
    print(f'{team} tied {matches_tied} matches in the 25/26 season')
    return matches_tied

def points(team):
    point = won(team)*3+tied(team)*1
    print(point)
    return point

def table():
    rows = []
    for t in teams():
        s = scored(t)
        c = conceded(t)
        rows.append({
            "team": t,
            "points": points(t),
            "gd": s - c,
            "scored": s,
    })
    rows.sort(key=lambda r:(r["points"],r["gd"],r["scored"]), reverse=True)
    return rows

def position(team):
    for i, row in enumerate(table(), start=1):
        if row["team"] == team:
            return i 
    return None
    