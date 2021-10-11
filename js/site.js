let events = [{
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 240000,
        date: "06/01/2017",
    },
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 250000,
        date: "06/01/2018",
    },
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 257000,
        date: "06/01/2019",
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 130000,
        date: "06/01/2017",
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 140000,
        date: "06/01/2018",
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 150000,
        date: "06/01/2019",
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 40000,
        date: "06/01/2017",
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 45000,
        date: "06/01/2018",
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 50000,
        date: "06/01/2019",
    },
];



//dd = dropdown
//build a dropdown of distinct cities
function buildDropDown() {

    let eventDD = document.getElementById("eventDropDown");
    //clear out the drop down
    eventDD.innerHTML = "";

    //Get the template
    let ddTemplate = document.getElementById("cityDD-template");

    let currentEvents = JSON.parse(localStorage.getItem("eventData")) || events;



    //get unique values from the array
    let distinctEvents = [...new Set(currentEvents.map((event) => event.city))];


    let ddItemNode = document.importNode(ddTemplate.content, true);
    //<li><a class ="dropdown-item" onclick="getEvents(this)"></a></li>

    let ddItem = ddItemNode.querySelector("a");
    //<a class ="dropdown-item" data-string="All" onclick="getEvents(this)"></a>


    ddItem.setAttribute("data-string", "All");
    //<a class ="dropdown-item" data-string="All" onclick="getEvents(this)">All</a>

    ddItem.textContent = "All";
    //<a class ="dropdown-item" data-string="All" onclick="getEvents(this)">All</a>
    //append the node item ot the page

    eventDD.appendChild(ddItemNode);


    //Add the Cities to the dropdown
    for (let index = 0; index < distinctEvents.length; index++) {
        ddItemNode = document.importNode(ddTemplate.content, true);
        ddItem = ddItemNode.querySelector("a");
        ddItem.setAttribute("data-string", distinctEvents[index])
        ddItem.textContent = distinctEvents[index];
        eventDD.appendChild(ddItemNode);
    }

    //dispalys stats for all events
    displayStats(currentEvents);
    //displays
    displayData();
}
//display stas for the filtered events
function displayStats(filteredEvents) {
    let total = 0;
    let average = 0;
    let most = 0;
    let least = -1;
    let currentAttendance = 0;

    for (let index = 0; index < filteredEvents.length; index++) {
        currentAttendance = filteredEvents[index].attendance;
        total += currentAttendance;

        if (most < currentAttendance) {
            most = currentAttendance;
        }
        if (most < currentAttendance || least < 0) {
            least = currentAttendance;
        }
    }

    //Calculate the Average
    average = total / filteredEvents.length
    document.getElementById("total").innerHTML = total.toLocaleString();
    document.getElementById("most").innerHTML = most.toLocaleString();
    document.getElementById("average").innerHTML = average.toLocaleString(
        undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }
    );
}


//display data for the current events
function displayData() {
    let template = document.getElementById("event-Data-template");
    let eventBody = document.getElementById("eventBody");

    eventBody.innerHTML = "";
 
     let currentEvents = JSON.parse(localStorage.getItem("eventData")) || events;


    for (let index = 0; index < currentEvents.length; index++) {
        let eventRow = document.importNode(template.content, true);
        let eventCols = eventRow.querySelectorAll("td");

        eventCols[0].textContent = currentEvents[index].event
        eventCols[1].textContent = currentEvents[index].city
        eventCols[2].textContent = currentEvents[index].state
        eventCols[3].textContent = currentEvents[index].attendance
        eventCols[4].textContent = new Date(
            currentEvents[index].date).toLocaleDateString();

        eventBody.appendChild(eventRow);


    }
}

//Get the event for the selected City
function getEvents(ddElement) {
    let cityName = ddElement.getAttribute("data-string");
    let currentEvents = JSON.parse(localStorage.getItem("eventData")) || events;

    let filteredEvents = currentEvents

    // How to filter an array (City in this case)
    document.getElementById("statsHeader").innerHTML = `Stats for ${cityName} Events`


    if (cityName != "All") {
        //Filter the array using filter array method
        filteredEvents = currentEvents.filter(
            function (item) {
                if (item.city == city) {
                    return item;
                }
            })
    }
    displayStats(filteredEvents);
}

function saveData(){
    let currentEvents = JSON.parse(localStorage.getItem("eventData")) || events;

    let stateSelect = document.getElementById("addState")
    let eventDate = document.getElementById("addDate").value
    let eventDate2 = `${eventDate} 00:00`;


    let newEvent = {
        event: document.getElementById("addEventName").value,
        city: document.getElementById("addCity"),
        state: stateSelect.options[stateSelect.selectedIndex].text,
        attendance: parseInt(document.getElementById("addAttendance").value,10 ),
        date: new Date(eventDate2).toLocaleDateString()
    };

    currentEvents.push(newEvent);

    localStorage.setItem("eventData", JSON.stringify(currentEvents))

    buildDropDown();
    displayData();

}
