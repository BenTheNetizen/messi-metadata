-- Author: Evian Liu
-- Date: 11/20/2022
-- Populate database with command: sqlite3 data/football.db ".read load_database.sql"

CREATE TABLE club_cleaned (
    club_id               NUMERIC PRIMARY KEY
                                  NOT NULL
                                  UNIQUE,
    pretty_name           VARCHAR,
    total_market_value    NUMERIC,
    squad_size            NUMERIC,
    average_age           NUMERIC,
    foreigners_number     NUMERIC,
    foreigners_percentage NUMERIC
);
.import --csv --skip 1 data/club_cleaned.csv club_cleaned

CREATE TABLE club_stats (
    player_club_id NUMERIC REFERENCES club_cleaned (club_id),
    year           NUMERIC,
    yellow_cards   NUMERIC,
    red_cards      NUMERIC,
    goals          NUMERIC,
    assists        NUMERIC,
    minutes_played NUMERIC,
    games_played   NUMERIC,
    pretty_name    VARCHAR
);
.import --csv --skip 1 data/club_stats.csv club_stats

CREATE TABLE player_cleaned (
    player_id                   NUMERIC  PRIMARY KEY
                                         UNIQUE
                                         NOT NULL,
    pretty_name                 VARCHAR,
    club_id                     NUMERIC  REFERENCES club_cleaned (club_id),
    club_pretty_name            VARCHAR,
    country_of_citizenship      VARCHAR,
    country_of_birth            VARCHAR,
    date_of_birth               DATETIME,
    position                    VARCHAR,
    sub_position                VARCHAR,
    foot                        VARCHAR,
    height_in_cm                NUMERIC,
    highest_market_value_in_gbp NUMERIC,
    last_season                 NUMERIC
);
.import --csv --skip 1 data/player_cleaned.csv player_cleaned

CREATE TABLE player_stats (
    player_id          NUMERIC REFERENCES player_cleaned (player_id),
    year               NUMERIC,
    player_pretty_name VARCHAR,
    yellow_cards       NUMERIC,
    red_cards          NUMERIC,
    goals              NUMERIC,
    assists            NUMERIC,
    minutes_played     NUMERIC,
    games_played       NUMERIC,
    olympic            VARCHAR
);
.import --csv --skip 1 data/player_stats.csv player_stats
