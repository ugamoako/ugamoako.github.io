/** Class implementing the bar chart view. */
var margin = 50;
var width = 500;
var height = 400;
var maxVal;

class BarChart {

    /**
     * Create a bar chart instance and pass the other views in.
     * @param worldMap
     * @param infoPanel
     * @param allData
     */
    constructor(worldMap, infoPanel, allData) {
        this.worldMap = worldMap;
        this.infoPanel = infoPanel;
        this.allData = allData;
        this.sortedData = sortData(getCurrentData(data, 'attendance'), "year");
        this.xScale;
        this.yScale;
    
    }

    /**
     * Render and update the bar chart based on the selection of the data type in the drop-down box
     */
    updateBarChart(selectedDimension) {



        // ******* TODO: PART I *******


        // Create the x and y scales; make
        // sure to leave room for the axes
        this.xScale = d3.scaleBand().range([0, width - margin]).padding(0.4);
        this.yScale = d3.scaleLinear().range([height - margin, 0]);

        d3.selectAll(".bar").remove()
        
            var svg = d3.select("#barChart")
              .attr("width", width)
              .attr("height", height)
              .attr("transform", "translate(0,70)");

              var self = this;
              this.xScale.domain(self.sortedData.map(function(d) {
                return d.year;
              }));
              this.yScale.domain([0, d3.max(self.sortedData, function(d) {
                return d.value;
              })]);
          // Create the axes (hint: use #xAxis and #yAxis)
              svg.select("#xAxis")
                .attr("transform", "translate(60," + (height - margin) + ")")
                .call(d3.axisBottom(self.xScale));
          
              svg.select("#xAxis").selectAll("text")
                .style("transform", "rotate(270deg) translate(-35px,-15px)");
          
              svg.select("#yAxis")
                .attr("transform", "translate(60,0)")
                .call(d3.axisLeft(self.yScale).tickFormat(function(d) {
                  return d;
                }).ticks(10))
                .append("text")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .attr("text-anchor", "end")
                .text("value");
          // Create the bars (hint: use #bars)
              svg.selectAll("#bars")
                .selectAll("rect")
                .data(self.sortedData)
                .enter()
                .append("rect")
                .attr("class", "bar")
                .attr("x", function(d) {
                  return self.xScale(d.year);
                });
          
              d3.selectAll("rect.bar")
                .attr("y", function(d) {
                  return self.yScale(d.value);
                })
                .attr("width", self.xScale.bandwidth())
                .attr("height", function(d) {
                  return height - self.yScale(d.value);
                })
                .attr("transform", "translate(60,-50)");
          
              maxVal = findMaxVal(this.sortedData);
          
        // Call the necessary update functions for when a user clicks on a bar.
        // Note: think about what you want to update when a different bar is selected.

              d3.selectAll("rect")
                .style("fill", function(d) {
                  if (d) {
                    var k = 255 - 255 * d.value / maxVal + 60;
                    return "rgb(0,0," + ~~k + ")";
                  }
                })
                .on('mouseover', function(d) {
                  d3.select(this).style("fill", "red");
                })
                .on('mouseout', function(d) {
                  d3.selectAll("rect")
                    .style("fill", function(d) {
                      if (d) {
                        var k = 255 - 255 * d.value / maxVal +60;
                        return "rgb(0,0," + ~~k + ")"; // Color the selected bar to indicate is has been selected.
                      }
                    });
                })
                .on('click', function(d) {
                  self.infoPanel.updateInfo(d.year);
                  self.worldMap.updateMap(d.year);
                });      
        // Create colorScale

        

        




        // ******* TODO: PART II *******

        // Implement how the bars respond to click events
        
        // Make sure only the selected bar has this new color.

    }

    /**
     *  Check the drop-down box for the currently selected data type and update the bar chart accordingly.
     *
     *  There are 4 attributes that can be selected:
     *  goals, matches, attendance and teams.
     */
    chooseData(selectedDimension) {
        // ******* TODO: PART I *******
        var self = this;
        this.sortedData.forEach(function(d) {
          var newSortedData = sortData(getCurrentData(data, selectedDimension), "year");
          var newVal = getDataByYear(newSortedData, d.year)
          d.value = newVal.value;
        });
    
        this.xScale.domain(self.sortedData.map(function(d) {
          return d.year;
        }));
        this.yScale.domain([0, d3.max(self.sortedData, function(d) {
          return d.value;
        })]);
    
        d3.selectAll("rect.bar")
          .transition()
          .duration(2500)
          .attr('y', function(d) {
            return self.yScale(d.value);
          })
          .attr('height', function(d) {
            return height - self.yScale(d.value);
          })
    
        d3.select("#yAxis")
          .transition()
          .duration(2500)
          .attr("transform", "translate(60,0)")
          .call(d3.axisLeft(self.yScale).tickFormat(function(d) {
            return d;
          }).ticks(10));
    
        maxVal = findMaxVal(this.sortedData);
    
        d3.selectAll("rect")
          .transition(2500)
          .style("fill", function(d) {
            if (d) {
              var k = 255 - 255 * d.value / maxVal + 60;
              return "rgb(0,0," + ~~k + ")";
            }
          });
        //Changed the selected data when a user selects a different
        // menu item from the drop down.

    }
}