-- Keep inclusive min/max season filters indexable. Season codes span two
-- numbering eras (`s` legacy, then `f` free-to-play), so lexical ordering is
-- not chronological and the API compares the same normalized ordinal.
CREATE INDEX replays_season_ordinal_idx
    ON replays ((
        CASE
            WHEN lower(btrim(season)) ~ '^[sf][0-9]+$'
                THEN (
                    CASE left(lower(btrim(season)), 1)
                        WHEN 's' THEN 0
                        ELSE 1000
                    END
                ) + substring(lower(btrim(season)) from 2)::int
        END
    ))
    WHERE season IS NOT NULL;
