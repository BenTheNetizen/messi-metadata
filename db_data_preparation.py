"""
Author: Shuyu Rao, Evian Liu
Date: 11/20/2022
This file:
- requires `athlete_events.csv`
- cleans `player_cleaned.csv` and `club_cleaned.csv`
- prepares `player_stats.csv` and `club_stats.csv`
"""

import pandas as pd
import numpy as np
import datetime as dt
import re

# Prepare datasets
olympic = pd.read_csv('data/athlete_events.csv')
olympic = olympic.loc[olympic['Sport'] == 'Football']
appearance = pd.read_csv('https://query.data.world/s/kk5efwvwix5jxxzgvrbgdyauhl57k5')
club = pd.read_csv('https://query.data.world/s/vfgbksks6mop5mgr33dpcizkfvj66r')
player = pd.read_csv('https://query.data.world/s/b4jdaxzhwnavriuko7p74s5luqohkw')

# Drop duplicated rows
club = club.drop_duplicates()
player = player.drop_duplicates()
olympic = olympic.drop_duplicates()

# Drop unused columns
player = player.drop(['current_club_id', 'name', 'agent_name', 'market_value_in_gbp',
                      'contract_expiration_date', 'domestic_competition_id',
                      'club_name', 'image_url', 'url'], axis = 1)
player['height_in_cm'] = player['height_in_cm'].replace({0:np.nan})
club = club.drop(['name', 'domestic_competition_id', 'national_team_players',
                  'stadium_name', 'stadium_seats', 'net_transfer_record',
                  'coach_name', 'url'], axis = 1)

# Drop middle name
olympic['Name'] =  olympic['Name'].str.replace(r" \(.*\)", "")
olympic['Name'] = olympic['Name'].str.split(' ').str[0] + ' ' + olympic['Name'].str.split(' ').str[-1]

# Prepare datetime for group by year
appearance['date'] = pd.to_datetime(appearance['date'])
appearance['year'] = appearance['date'].dt.year.astype('Int64', errors='ignore')

# Match olympic player name
p = appearance.player_pretty_name.isin(olympic.Name)
p2 = appearance.iloc[np.where(p.values)]
pattern = '|'.join(p2.player_pretty_name.values)

df = olympic.iloc[np.where(olympic.Name.str.contains(pattern) == True)]
df['olympic'] = df[['Games', 'Event', 'Medal']].dropna().apply("-".join, axis = 1)
df = df[['Name', 'olympic']]


# Prepare player_stats
player_stats = appearance.groupby(['player_id', 'year']).agg({'player_pretty_name':'first',
                                                              'yellow_cards': 'sum',
                                                              'red_cards': 'sum',
                                                              'goals':'sum',
                                                              'assists':'sum',
                                                              'minutes_played':'mean'}).reset_index()
player_stats = player_stats.merge(df, how='left', left_on='player_pretty_name', right_on='Name')
player_stats = player_stats.drop('Name', axis=1)

# Handle players with multiple olympic medals
p3 = player_stats.groupby('player_id').agg({'player_id': 'first',
                                            'player_pretty_name':'first',
                                            'olympic': lambda x: list(set(x[x.notnull()].values))
                                            if np.any(x.notna()) else np.nan})

player_stats = player_stats.merge(p3, how='left', on='player_pretty_name')
player_stats = player_stats.drop('olympic_x', axis=1)
player_stats = player_stats.drop('player_id_y', axis=1)
player_stats = player_stats.rename(columns={"player_id_x": "player_id", "olympic_y": "olympic"})



# Prepare club_stats
club_stats = appearance.groupby(['player_club_id', 'year']).agg({'yellow_cards': 'sum',
                                                                 'red_cards': 'sum',
                                                                 'goals':'sum',
                                                                 'assists':'sum',
                                                                 'minutes_played':'mean'}).reset_index()
# Match club id with club name, contains many NaN
club_stats = club_stats.merge(club[['club_id','pretty_name']], how='left',
                              left_on='player_club_id', right_on='club_id')
club_stats = club_stats.drop(columns='club_id')


# Output datasets
player.to_csv(r'data/player_cleaned.csv', index = None, header=True)
club.to_csv(r'data/club_cleaned.csv', index = None, header=True)
player_stats.to_csv(r'data/player_stats.csv', index = None, header=True)
club_stats.to_csv(r'data/club_stats.csv', index = None, header=True)
