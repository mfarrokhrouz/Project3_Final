const url = "http://127.0.0.1:5000/api/v1.0/";
let city_list = [];
//get the dropdown element 
let d3cityselect = d3.select("#selCityDataset");

// let d3yearselect = d3.select("#selYearDataset");

d3.select("#selCityDataset").on("change", updateGraph);
// d3.select("#selYearDataset").on("change", updateGraph);

function updateGraph(){
    let city_name = d3.select("#selCityDataset").property("value");
    // let weather_year = d3.select("#selYearDataset").property("value");

    console.log(city_name);
    // console.log(weather_year);
    drawBarGraph(city_name);
    Graph2(city_name);
}

//Function to initialize the first landing web page
function init() {
    let urlcities = url + "city"
    let urlyear = url + "year"
    //get the city json data
    d3.json(urlcities).then(function (data) {
        //get the samples
        city_list = data;

        //update to dropdown menu with sample ids list
        var options = d3cityselect.selectAll("option")
            .data(city_list)
            .enter()
            .append("option");
        options.text(function (datavalue) {
            return datavalue;
        })
            .attr("value", function (datavalue) {
                return datavalue;
            });
        //change the bar chart and bubble chart
        updateGraph();
    });
    //get the year json data
    d3.json(urlyear).then(function (data) {
        //get the samples
        year_list = data;

        //update to dropdown menu with sample ids list
        var options = d3yearselect.selectAll("option")
            .data(year_list)
            .enter()
            .append("option");
        options.text(function (datavalue) {
            return datavalue;
        })
            .attr("value", function (datavalue) {
                return datavalue;
            });
        //change the bar chart and bubble chart
        updateGraph();
    });
}


//Calling Init function to display charts for the first OTUs
init();

//function to create bubble chart
function drawBarGraph(city_name) {
    //get the url graph
    let urlBarGraph = ""
    urlBarGraph = url+"weather/"+city_name
    console.log(urlBarGraph)

    d3.json(urlBarGraph).then(function Temperature(data) {
        var MaxTemp_arr =[];
        var MinTemp_arr=[];
        var Diff_arr = [];
        var rainfall_arr = [];
        var weatherdates = [];
        console.log(data);
        for (var value of data) {
            console.log(value["date"]);
            console.log(value["maxtemp"]);
            console.log(value["mintemp"]);
            console.log(value["Rainfall"]);
            console.log(value["pressure9am"]);
            MaxTemp_arr.push(value["maxtemp"]);
            MinTemp_arr.push(value["mintemp"]);
            rainfall_arr.push(value["Rainfall"]);
            Diff_arr.push(value["maxtemp"]-value["mintemp"])
            weatherdates.push(value["date"]);
            
        }
        // //CREATE trace variable
        var trace1 = {
            type: "scatter",
            mode: "lines",
            name: "Min. Temp",
            x: weatherdates,
            y: MinTemp_arr,
            
            line:{color:'#0000FF'}
        }
        var trace2 = {
            type: "scatter",
            mode: "lines",
            name: "Max Temp",
            x: weatherdates,
            y: MaxTemp_arr,
            line:{color:'#FF0000'}  
        }
        var trace0 = {
            type: "scatter",
            mode: "lines",
            name: "Diff Temp",
            x: weatherdates,
            y: Diff_arr,
            fill: 'tozeroy',
            line:{color:'#00FF00'}
        }
        var graph1 = [trace0,trace1,trace2];
        //Set the layout
        var layout1 = {
            title: "<b> Daily Temperature Difference between the Extremes </b>",
            xaxis: {
                autorange: true,
                range: ['2007-01-01', '2023-04-01'],
                raneselector: {button: [
                    {
                        count: 1,
                        label: '1m',
                        step: 'month',
                        stepmode: 'backward'
                    },
                    {
                        count: 6,
                        label: '6m',
                        step: 'month',
                        stepmode: 'backward'
                    },
                    {step: 'all'}
                ]},
                rangeslider: {range: ['2007-01-01', '2023-04-01']},
                type: 'date'

            },
            yaxis: {
                autorange: true,
                range: [-10,30],
                type: 'linear',
                height: 500,
                width: 1200,

            }
            

        };
        //Plot the Graph
        Plotly.newPlot("plot1", graph1, layout1,{responsive: true});
          
    });
    }
function Graph2(city_name){
    //get the url graph
    let urlBarGraph = ""
    urlBarGraph = url+"weather/"+city_name
    // if(weather_year=="All")
    // {
    //     urlBarGraph = url+"weather/"+city_name
    // }
    // else
    // {
    //     urlBarGraph = url+"weather/"+city_name+"/"+weather_year
    // }
    console.log(urlBarGraph)

    d3.json(urlBarGraph).then(function WaterCycle(data) {
        var rainfall_arr = [];
        var weatherdates = [];
        var Evaporation_arr = [];
        var aridity_index = [];
        var Pressure_arr = [];
        count = 0
        console.log(data);
        for (var value of data) {
            console.log(value["date"]);
            console.log(value["Rainfall"]);
            console.log(value["evaporation"]);
            console.log(value["pressure9am"]);
            console.log(value["evaporation"]/value["Rainfall"]);
            rainfall_arr.push(value["Rainfall"]);
            weatherdates.push(value["date"]);
            Evaporation_arr.push(value["evaporation"]);
            aridity_index.push(value["evaporation"]/value["Rainfall"]);
            Pressure_arr.push(value["pressure9am"]);
        }
        // //CREATE trace variable
        var trace3 = {
            type: "scatter",
            mode: "lines",
            name: "Rainfall",
            x: weatherdates,
            y: rainfall_arr,
            fill: 'tozeroy',
            line:{color:'#006480'}
        }
        var trace4 = {
            type: "scatter",
            mode: "lines",
            name: "Evaporation",
            x: weatherdates,
            y: Evaporation_arr,
            fill: 'tozeroy',
            line: {color:'#FFF000'}
        }
        var trace5 = {
            type: "scatter",
            mode: "lines",
            name: "Aridity Index",
            x: weatherdates,
            y: aridity_index,
            fill: 'tozeroy',
            line: {color:'#76A000'}
        }
        var graph2 = [trace4,trace3,trace5];
        var layout2 = {
            title: "<b> Date vs. Water Cycle </b>",
            xaxis: {
                autorange: true,
                range: ['2007-01-01', '2023-04-01'],
                raneselector: {button: [
                    {
                        count: 1,
                        label: '1m',
                        step: 'month',
                        stepmode: 'backward'
                    },
                    {
                        count: 6,
                        label: '6m',
                        step: 'month',
                        stepmode: 'backward'
                    },
                    {step: 'all'}
                ]},
                rangeslider: {range: ['2007-01-01', '2023-04-01']},
                type: 'date'

            },
            yaxis: {
                autorange: true,
                range: [0,50],
                type: 'linear',
                height: 500,
                width: 1200

            }
        };
        Plotly.newPlot("plot2", graph2,layout2, {responsive: true});
    });
}
function Graph3(city_name){
    //get the url graph
    let urlBarGraph = ""
    urlBarGraph = url+"weather/"+city_name
    // if(weather_year=="All")
    // {
    //     urlBarGraph = url+"weather/"+city_name
    // }
    // else
    // {
    //     urlBarGraph = url+"weather/"+city_name+"/"+weather_year
    // }
    console.log(urlBarGraph)

    d3.json(urlBarGraph).then(function WaterCycle(data) {
        var rainfall_arr = [];
        var weatherdates = [];
        var Pressure_arr = [];
        console.log(data);
        for (var value of data) {
            console.log(value["date"]);
            console.log(value["Rainfall"]);
            console.log(value["pressure"]);
            rainfall_arr.push(value["Rainfall"]);
            weatherdates.push(value["date"]);
            Pressure_arr.push(value["pressure"]-1000);
        }
        // //CREATE trace variable
        var trace5 = {
            type: "scatter",
            mode: "lines",
            name: "Rainfall",
            x: weatherdates,
            y: rainfall_arr,
            
            line:{color:'#006480'}
        }
        var trace6 = {
            type: "scatter",
            mode: "lines",
            name: "Pressure",
            x: weatherdates,
            y: Pressure_arr,
            fill: 'tozeroy',
            line: {color:'#FFF000'}
        }
        var graph3 = [trace5,trace6];
        var layout3 = {
            title: "<b> Date vs. Pressure </b>",
            xaxis: {
                autorange: true,
                range: ['2007-01-01', '2023-04-01'],
                raneselector: {button: [
                    {
                        count: 1,
                        label: '1m',
                        step: 'month',
                        stepmode: 'backward'
                    },
                    {
                        count: 6,
                        label: '6m',
                        step: 'month',
                        stepmode: 'backward'
                    },
                    {step: 'all'}
                ]},
                rangeslider: {range: ['2007-01-01', '2023-04-01']},
                type: 'date'

            },
            yaxis: {
                autorange: true,
                range: [0,50],
                type: 'linear',
                height: 500,
                width: 1200

            }
        };
        Plotly.newPlot("plot3", graph3,layout3, {responsive: true});
    });
}

