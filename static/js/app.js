// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    let metadata = data.metadata;

    // Filter the metadata for the object with the desired sample number
    let top10Filter = metadata.filter(sampleNum => sampleNum.id == sample);

    // Use d3 to select the panel with id of `#sample-metadata`
    let panel = d3.select('#sample-metadata"');

    // Use `.html("") to clear any existing metadata
    panel.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    top10Filter.forEach((item)=>{
      ///

    })
   
  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    let samplesField = data.samples;

    // Filter the samples for the object with the desired sample number
    let Top10 = samplesField.filter(sampleObject => sampleObject.id == sample);

    // Get the otu_ids, otu_labels, and sample_values
    let otu_ids = Top10[0].otu_ids;
    let otu_labels = Top10[0].otu_labels;
    let sample_values = Top10[0].sample_values;

    // Build a Bubble Chart
    let bubbleData = [
      {
        x: otu_IDs,
        y: sample_values,
        text: otu_labels,
        mode: "markers",
        marker: {
          size: sample_values,
          color: otu_IDs,
          colorscale: 'blue'
        }
      }];

      let bubbleLayout = {
        title: "Bacteria Cultures per Sample",
        titlefont: {"size": 25},
        xaxis: {title: "OTU ID"},
        yaxis: {title: "Number of Bacteria"},
        hovermode: "closest"      
      };

    // Render the Bubble Chart
    Plotly.newPlot('bubble', bubbleData, bubbleLayout);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    let barData = [{
      y: yticks,
      x: sample_values, //.slice(0,10).reverse(),
      text: otu_labels, //.slice(0,10).reverse(),
      type: 'bar',
      orientation: 'h',
    }];

    let barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      xaxis: {title: 'Number of Bacteria'}
    };

    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
  

    // Render the Bar Chart
    Plotly.newPlot("bar", barData, barLayout)
  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    let names = data.names;

    // Use d3 to select the dropdown with id of `#selDataset`
    let dropdownMenu = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    samplenNames.forEach((name) => {
      dropdown.append("option").text(name).property("value", name);
    });

    // Get the first sample from the list
    let firstSample = samplenNames[0];

    // Build charts and metadata panel with the first sample
    buildCharts(firstSample);
    buildMetadata(firstSample)
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample)
}

// Initialize the dashboard
init();
