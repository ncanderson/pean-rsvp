
begin transaction;

-- insert into pean_rsvp.event (
--     id_event,
--     title,
--     location,
--     datetime_start,
--     datetime_end,
--     view_public,
--     description
-- )
-- values
-- (
--     uuid_generate_v4(),
--     'Test 1',
--     'Here I guess?',
--     now(),
--     null,
--     true,
--     'This is a test'
-- ),
-- (
--     uuid_generate_v4(),
--     'Test 2',
--     'Here I guess?',
--     now(),
--     null,
--     true,
--     'This is a test'
-- ),
-- (
--     uuid_generate_v4(),
--     'Test 3',
--     'Here I guess?',
--     now(),
--     null,
--     true,
--     'This is a test'    
-- );


select *
from pean_rsvp.event;


insert into pean_rsvp.rsvp (
	id_rsvp,
    userid,
    name,
    eventid,
    attending,
    comments
)
values 
(
	uuid_generate_v4(),
    null,
    'Test 1',
    null,
    false,
    'test'
),
(
   	uuid_generate_v4(),
    null,
    'Test 2',
    null,
    false,
    'test'
),
(
	uuid_generate_v4(),
    null,
    'Test 3',
    null,
    false,
    'test'    
);



rollback transaction;
