// Wrap code inside a function that will automatically
// resize the visuals based on the window size

function resizeResponse(){
    // Check if SVG area is empty, if not, remove it and replace
    // with a resized version of the chart
    var svgArea = d3.select("#scatter").select("svg");

    if (!svgArea.empty()){
        svgArea.remove();
    };

    // the SVG wrapper dimensions are determined by the current width
    // and height of the browser window
    var svgWidth = window.innerWidth;
    var svgHeight = window.innerHeight;

    // set margins for the chart and calculate chart height and width
    var margin = {
        top: 50,
        bottom: 50,
        right: 50,
        left: 50
    };

    var chartHeight = svgHeight - margin.top - margin.bottom;
    var chartWidth = svgWidth - margin.left - margin.right;

    // Append SVG element
    var svg = d3.select("#scatter")
        .append("svg")
        .attr("height", svgHeight)
        .attr("width", svgWidth);

    // Append group element and transform based on margin values
    var chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
    // Read CSV
    d3.csv(src = "..data/data.csv").then(function(censusData){

        // parse data
        censusData.forEach(function(data){
            data.healthcare = +data.healthcare;
            data.poverty = +data.poverty;
        });

        // create scales for axes
        var xLinearScale = d3.scaleLinear()
            .domain([0, d3.max(censusData, d => d.poverty)])
            .range([0, chartWidth]);

        var yLinearScale = d3.scaleLinear()
            .domain([0, d3.max(censusData, d => d.healthcare)])
            .range([chartHeight, 0]);

        // create axes
        var xAxis = d3.axisBottom(xLinearScale).ticks(8)
        var yAs = d3.axisLeft(yLinearScale).ticks(13);

        // append axes
        chartGroup.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(xAxis);

        chartGroup.append("g")
            .call(yAxis);

        // append circles
        var circleGroup = chartGroup.selectAll("circle")
            .data(censusData)
            .enter()
            .append("circle")
            .attr("cx", d => xLinearScale(d.poverty))
            .attr("cy", d => yLinearScale(d.healthcare))
            .attr("r", "10")
            .attr("fill", "lightblue");

    })

};

// Call resize function when browser is loads
resizeResponse ();

// Call rezie function when the window is resized
d3.select(window).on("resize", resizeResponse);

