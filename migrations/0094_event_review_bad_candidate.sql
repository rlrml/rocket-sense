-- A review candidate can be unusable independently of whether the detector's
-- event is correct: the clip may be mis-anchored, target the wrong player, or
-- omit the moment being reviewed. Preserve that distinction instead of
-- forcing reviewers to record these cases as detector rejections.
ALTER TABLE event_reviews
    DROP CONSTRAINT event_reviews_status_check,
    ADD CONSTRAINT event_reviews_status_check
        CHECK (status IN (
            'confirmed',
            'rejected',
            'corrected',
            'uncertain',
            'needs_second_review',
            'bad_candidate'
        ));
