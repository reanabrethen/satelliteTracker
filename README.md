# Satellite Tracker

In this assignment you'll be using two APIs to create an application that allows you to find out the next time any satellite will be viewable over any address on earth!

The user of your application will enter some address and some satellite's ID (known as a NORAD), press 'search', then voila! They'll receive information on when that satellite can next be seen!

## Requirements

* Users can type in an address and a NORAD to receive information on the next time that satellite will be visible

* Your final website is responsive (looks good on mobile and desktop)

* Your project is hosted on GitHub pages

## Overview

We'll use two APIs for this project. 

The first API, Maps Geocode, accepts an address/location and gives us back the longitude / latitude of that address. 

The second API, Satellite Passes API, accepts a longitude / latitude and a satellite's ID (known as a NORAD) and gives us back information about when the satellite will next be visible over those coordinates.

**Geocoding API: https://geocode.maps.co/ **

**Satellite Passes API: https://satellites.fly.dev/ **

## Steps

#### 1. Take a look at the geocode documentation

To prevent people from abusing their API, the geocode server keepers require its users to 'rate-limiting'. This is a cap on the number of requests made in a certain amount of time.

#### 2. Make an API Request for the geocode in the Browser

Great, now that you have a understanding of how to word your endpoint you're all set to make an API request. 

At this point, read through the How To `Geocode / Search?` section. starting at the `Forward Geocoding` section. The `Forward geocoding` section is particularly useful. In the example section, note that `curl` is simply a command-line program to make API requests. 

Look at the example request in the documentation that makes a request to geocode an address in NYC. Try copying that whole example URL and pasting it into the address bar of your browser. If you get a reasonable JSON response containing information about the geocoded address, then you've succeeded! It should look something like this:

```json
[
    {
    "place_id": 10139899,
    "licence": "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
    "powered_by": "Map Maker: https://maps.co",
    "osm_type": "node",
    "osm_id": 1000793154,
    "boundingbox": [
    "40.7557728",
    "40.7558728",
    "-73.9788465",
    "-73.9787465"
    ],
    "lat": "40.7558228",
    "lon": "-73.9787965",
    "display_name": "Barnes & Noble, 555, 5th Avenue, Midtown East, Manhattan, New York County, New York, 10017, United States",
    "class": "shop",
    "type": "books",
    "importance": 0.621
    },
    {...}
]
```

#### 3. Make an API Request to Geocode in the Javascript

Great, now that we've successfully made an API request in the browser, lets try doing the same thing but with `fetch()` in our Javascript file.

Lets make it so that when the user clicks 'Search', we make an API request to the geocoder using the data in the 'Address' text inputs.

When you make the request, customize the URL so that the the address reflects the value in the address text input.

**Important note:** Browsers expect the values in the API request to be "URL encoded". This means that special characters in the address like spaces should be replaced with valid characters than can go in a URL. To URL encode any string in Javascript, simply use the built in [`encodeURI()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURI) function.

Upon receiving a response from the geocoding API, extract the longitude and latitude from the response JSON (hint: look for abbreviated keys for the coordinates) and console.log them both out.

#### 4. Make an API Request to the Satellite Passes API

Ok so our previous request responded with the longitude and latitude of the address entered in the text input. 

Now, we need take that longitude and latitude along with the satellite ID (a.k.a. NORAD) entered into the text input and make a request to the Satellite Passes API. This will tell us when the satellite will next be visible.

As with before, I recommend first reading the API's documentation [here](https://satellites.fly.dev/) and making a test request in the browser before diving into the Javascript. Additionally, the documentation for this API is pretty sparse so here's an additional example:

```
The following endpoint will make a request for the next visible satellite pass at 
longitude=-57.93 and latitude=-34.91 within the next 15 days.

== REQUEST ==
https://satellites.fly.dev/passes/25544?lat=-34.91&lon=-57.93&limit=1&days=15&visible_only=true

The response below is an array of satellite passes (containing one value). 
Each satellite pass object contains four properties:
* rise        - contains information on when the satellite rises over the horizon into view
* culmination - contains information on when the satellite peaks in its arc on the horizon
* set         - contains information on when the satellite sets below the horizon
* visible     - true or false whether or not the satellite will be visible

== RESPONSE ==
[
    {
        "rise": {
            "alt": "10.05",
            "az": "347.86",
            "az_octant": "N",
            "utc_datetime": "2021-04-17 22:17:25.681676+00:00",
            "utc_timestamp": 1618697845,
            "is_sunlit": true,
            "visible": true
        },
        "culmination": {
            "alt": "28.48",
            "az": "49.32",
            "az_octant": "NE",
            "utc_datetime": "2021-04-17 22:20:23.214247+00:00",
            "utc_timestamp": 1618698023,
            "is_sunlit": true,
            "visible": true
        },
        "set": {
            "alt": "9.99",
            "az": "110.55",
            "az_octant": "E",
            "utc_datetime": "2021-04-17 22:23:22.899452+00:00",
            "utc_timestamp": 1618698202,
            "is_sunlit": false,
            "visible": false
        },
        "visible": true
    }
]
```

After trying this in the browser, move into the code. After receiving the response from the previous API with longitude / latitude. Make a request to the satellite API customizing the `lat`, `lon`, and `norad` portions of the URL.

After receiving a response from the API, console.log out the UTC date/time at which the satellite will rise, culminate, and set.

#### 5. Displaying Information to the User

Finally, add Javascript to display on the DOM the UTC date/time at which the target satellite will rise, culminate, and set on the horizon. You can display this information wherever you like on the page! You may want to edit the HTML to create a designated "output" area.

#### 6. CSS, Responsiveness

Now that all the API functionality works, customize your web application! Edit the CSS rules to make it look how you want. This can be as in-depth as you want it to be.

Additionally, make sure that your site is responsive, meaning that it looks good on both desktop and mobile devices.

## Stretch goals

#### Provide additional satellite viewing information

Provide additional information to the user to better view the satellite:

* Which cardinal direction they should look in to see the satellite
* The duration of the satellite's visibility
* What angle in the sky the satellite will be located at

#### Provide Additional locations Information

When you search for an address with the geocoding API, the API does not return a single location that matches the search, it provides an array of matches!

Make it so that anytime a user searches for a place, the application makes a request to the Satellite API for EACH of the first three matched locations (if given) in the array provided by the API. Your application should display all three of these locations on the DOM along with the relevant information that tells the user when the satellite next will be visible.
