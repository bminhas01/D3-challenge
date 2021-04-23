# D3-challenge

## Context

This project is focused on analyzing the current trends shaping people's lives and presenting findings in a visual format. More importantly, each visual element must also have an interactive feature, one that will allow users to better understand the findings. 

The data set comes from the U.S. Census Bureau and the Behavioral Risk Factor Surveillance System. Specifically, the dataset is based on 2014 ACS 1-year estimates from the [US Census Bureau](https://data.census.gov/cedsci/). The factors included within the dataset are rates of income, obsesity, poverty, etc. by state. The dataset is including as a csv file called `data.csv`.

### Core Assignment: D3 Dabbler

Create a scatter plot between two of the data variables - "Healthcare vs. Poverty" using D3 techniques. Each circle element within the scatter plot should represent a different state.

* Use the `d3.csv` function to pull data from `data.csv`
* Each circle should include an abbreviation for the state
* Create and situate the axes and labels to the left and bottom of the chart

#### 2. Incorporate d3-tip

While the ticks on the axes allow us to infer approximate values for each circle, it's impossible to determine the true value without adding another layer of data. Enter tooltips: developers can implement these in their D3 graphics to reveal a specific element's data when the user hovers their cursor over the element. Add tooltips to the circles and display each tooltip with the data that the user has selected. Use the `d3-tip.js` plugin developed by [Justin Palmer](https://github.com/Caged).

* Check out [David Gotz's example](https://bl.ocks.org/davegotz/bd54b56723c154d25eedde6504d30ad7) to see how you should implement tooltips with d3-tip.

* Note: Running the visualization may require the use of `python -m http.server`. This will host the page at `localhost:8000` in the web browser.


