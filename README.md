# Rocket Booking

> A MODX extra for Booking Tables per seat per Event


Some basic CSS for the seats.

```
.rocket-booking_seats{display:flex;flex-wrap:wrap;}
.rocket-booking_seat{width:27.1%;flex-basis:27.1%;background-color:#dedede;text-align:center;padding:.5rem 1rem;border:1px solid #FFF;}
```

## Display All Events

```
[[RocketBooking]]
```
![Events Admin](events-admin.png)

![All Events](all-events.png)


## Display Tables of a Specific Event

```
[[RocketBookingTables? &event_id=`4`]]
```
![Events Detail](event-details.png)


## Display Seats of a Specific table

```
[[RocketBookingSeats? &table_id=`5`]]
```

![Events Admin](seats-admin.png)

![All Events](tables.png)
