// Wrap code inside a function that will automatically
// resize the visuals based on the window size
function resizeResponse() {
    // Check if SVG area is empty, if not, remove it and replace
    // with a resized version of the chart
    var svgArea = d3.select("#scatter").select("svg");

    if (!svgArea.empty()) {
        svgArea.remove();
    };

    // the SVG wrapper dimensions are determined by the current width
    // and height of the browser window
    var svgWidth = window.innerWidth / 1.8;
    var svgHeight = window.innerHeight / 1.9;

    // set margins for the chart and calculate chart height and width
    var margin = {
        top: 20,
        bottom: 100,
        right: 50,
        left: 70
    };

    var chartHeight = svgHeight - margin.top - margin.bottom;
    var chartWidth = svgWidth - margin.left - margin.right;

    // Append SVG element
    var svg = d3.select("#scatter")
        .append("svg")
        .attr("height", svgHeight)
        .attr("width", svgWidth)
        .attr("class", "iframeContainer");

    // Append group element and transform based on margin values
    var chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Read CSV
    d3.csv(src = "data.csv").then(function (censusData) {

        // parse data
        censusData.forEach(function (data) {
            data.healthcare = +data.healthcare;
            data.poverty = +data.poverty;
        });

        // create scales for axes
        var xLinearScale = d3.scaleLinear()
            .domain([d3.min(censusData, d => d.poverty) - 1, d3.max(censusData, d => d.poverty) + 2])
            .range([0, chartWidth]);

        var yLinearScale = d3.scaleLinear()
            .domain([0, d3.max(censusData, d => d.healthcare)])
            .range([chartHeight, 0]);

        // create axes
        var xAxis = d3.axisBottom(xLinearScale).ticks(8)
        var yAxis = d3.axisLeft(yLinearScale).ticks(13);

        // append axes
        chartGroup.append("g")
            .attr("transform", `translate(0, ${chartHeight})`)
            .call(xAxis);

        chartGroup.append("g")
            .call(yAxis);

        // Create Axes labels

        chartGroup.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left + 10)
            .attr("x", 0 - (chartHeight / 2))
            .attr("dy", "1em")
            .attr("class", "active")
            .text("Lacks Healthcare (%)");

        chartGroup.append("text")
            .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + margin.bottom - 50})`)
            .attr("class", "active")
            .text("In Poverty (%)");

        // Create a common g element to hold both the circle and the text within
        var circleGroup = chartGroup.selectAll(null)
            .data(censusData)
            .enter()
            .append("g");

        // Append circles
        circleGroup.append("circle")
            .attr("cx", d => xLinearScale(d.poverty))
            .attr("cy", d => yLinearScale(d.healthcare))
            .attr("r", "10")
            .attr("class", "stateCircle");

        // Append text to go within each circle
        circleGroup.append("text")
            .text(function (d) {
                return d.abbr
            })
            .attr("x", d => xLinearScale(d.poverty))
            .attr("y", d => yLinearScale(d.healthcare))
            .attr("class", "stateText")
            .attr("dy", +4)
            .attr("font-size", 10);

        // Initialize Tooltip
        var tooltip = d3.tip()
            .attr("class", "d3-tip")
            .html(function (d) {
                return (`${d.state}
                Poverty: ${d.poverty}%
                Healthcare: ${d.healthcare}%`)
            });

        chartGroup.call(tooltip)

        circleGroup.on("mouseover", function (d) {
            tooltip.show(d, this);
        })

            .on("mouseout", function (d) {
                tooltip.hide(d);
            });


    });

};

// Call resize function when browser is loads
resizeResponse();

// Call rezie function when the window is resized
d3.select(window).on("resize", resizeResponse);

