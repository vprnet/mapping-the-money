//@codekit-prepend "d3.v3.min.js"
//@codekit-prepend "queue.v1.min.js"
//@codekit-prepend "topojson.v1.min.js"

var width = 400,
    height = 500;

var radius = d3.scale.sqrt()
    .domain([0, 5e5])
    .range([0, 40]);

// Define map projection
var projection = d3.geo.transverseMercator()
    .rotate([72.57, -44.20])
    .translate([175,190])
    .scale([12000]);

// Define path generator
var path = d3.geo.path()
    .projection(projection);

// Create SVG Element
var svg = d3.select("body").select("#mapbox").append("svg")
    .attr("width", width)
    .attr("height", height);

var touchClick;
var townInfo = d3.select("div#vcf-town-info");
var mainInfo = d3.select("div#vcf-info-main");
var countyInfo = d3.select("div#vcf-county-info");
var resetData = d3.selectAll("p.vcf-reset");

if (Modernizr.touch) {
    touchClick = "mouseover";
} else {
    touchClick="click";
}

resetData.on(touchClick, function() {
    resetData.style("display", "none");
    townInfo.style("display", "none");
    countyInfo.style("display", "none");
    mainInfo.style("display", "block");

});


function toUSD(num) {
    var number = num.toString(),

    dollars = number.split('.')[0],
    cents = (number.split('.')[1] || '') +'00';
    dollars = dollars.split('').reverse().join('')
        .replace(/(\d{3}(?!$))/g, '$1,')
        .split('').reverse().join('');
    return '$' + dollars;
}

queue()
    .defer(d3.json, "data/vermont.json")
    .defer(d3.json, "data/vcf.json")
    .defer(d3.csv, "data/vpr-vcf-20130703-org.csv")
    .await(ready);


function ready(error, vt, centroid, data) {
    svg.append("path")
        .attr("class", "towns")
        .datum(topojson.feature(vt, vt.objects.vt_towns))
        .attr("d", path)
        .style("stroke", "#ddd")
        .style("stroke-width", "1px")
        .style("fill", "#ccc");

    svg.append("path")
        .datum(topojson.feature(vt, vt.objects.lake))
        .attr("d", path)
        .style("stroke", "#89b6ef")
        .style("stroke-width", "1px")
        .style("fill", "#b6d2f5");

    svg.selectAll(".symbol")
        .data(centroid.features.sort(function(a,b) {
            return b.properties.dollars - a.properties.dollars; }))
        .enter().append("path")
            .attr("class", function(d) {
                return ("symbol " + d.properties.unit);
            })
            .attr("d", path.pointRadius(function(d) {
                return radius(d.properties.dollars); })
            )
        .style("fill", function(d) {
            if (d.properties.unit === 'town') {
                return "#e77565";
            } else {
                return "#steelblue";
            }
        })
        .on(touchClick, function(d) {
            resetData.style("display", "block");

            if (d.properties.unit === 'town') {
                var tableTotal = 0;
                var tableArray = [];
                var rowCount = 0;

                for (var i=0; i < data.length; i++) {
                    if (d.properties.name === data[i].city) {
                        tableArray.push([
                            data[i].organization,
                            toUSD(data[i].amount)
                        ]);
                        tableTotal += parseFloat(data[i].amount);
                        rowCount += 1;
                    }
                }

                if ( rowCount > 1 ) {
                    tableArray.push([
                        'Total',
                        toUSD(tableTotal)
                        ]);
                }

                mainInfo.style("display", "none");
                countyInfo.style("display", "none");
                townInfo.style("display", "block");

                townInfo.select("h3")
                    .text(d.properties.name);

                d3.select("tbody").selectAll("tr").remove();

                var tr = d3.select("tbody").selectAll("tr")
                    .data(tableArray)
                    .enter().append("tr");

                var td = tr.selectAll("td")
                    .data(function(d) { return d; })
                    .enter().append("td")
                        .text(function(d) { return d; });
            } else {
                mainInfo.style("display", "none");
                townInfo.style("display", "none");
                countyInfo.style("display", "block");

                countyInfo.select("h2")
                    .text("In " + d.properties.name);

                countyInfo.select("h3#num-farmers")
                    .text(d.properties.number);

                countyInfo.select("h3#dollar-farmers")
                    .text(toUSD(d.properties.dollars));
            }
        })
        .on("mouseover", function(d) {
            var xPosition = d3.mouse(this)[0];
            var yPosition = d3.mouse(this)[1] - 10;

            d3.select(this)
                .style("stroke", "#ffffeb")
                .style("stroke-width", "2px")
                .style("fill-opacity", "1");

            svg.append("text")
                .attr("id", "tooltip")
                .attr("x", function(d) {
                    if (xPosition < 100) {
                        return xPosition + 40;
                    } else {
                        return xPosition;
                    }})
                .attr("y", yPosition)
                .attr("text-anchor", "middle")
                .attr("font-family", "sans-serif")
                .attr("font-size", "11px")
                .attr("font-weight", "bold")
                .attr("fill", "black")
                .text(d.properties.name + " - " + toUSD(d.properties.dollars));
        })
        .on("mouseout", function(d) {
            d3.select("#tooltip").remove();

            d3.select(this)
                .style("stroke", "#fff")
                .style("stroke-width", "1px")
                .style("fill-opacity", ".8");
        });

    var xLegend = 230;
    var yLegend = 460;

    svg.append("circle")
        .attr("class", "guide")
        .attr("cx", xLegend)
        .attr("cy", yLegend)
        .attr("r", "8")
        .on("mouseover", function(d) {
            svg.selectAll(".town")
                .style("display", "none");
        })
        .on("mouseout", function(d) {
            svg.selectAll(".town")
                .style("display", "block");
        });

    svg.append("text")
        .attr("class", "legend")
        .attr("x", xLegend + 15)
        .attr("y", yLegend + 4)
        .style("font-size", "12px")
        .text("Farmers");

    svg.append("circle")
        .attr("class", "guide")
        .attr("cx", xLegend)
        .attr("cy", yLegend + 25)
        .attr("r", "8")
        .style("fill", "#e77565")
        .on("mouseover", function(d) {
            svg.selectAll(".farm")
                .style("display", "none");
        })
        .on("mouseout", function(d) {
            svg.selectAll(".farm")
                .style("display", "block");
        });

    svg.append("text")
        .attr("class", "legend")
        .attr("x", xLegend + 15)
        .attr("y", yLegend + 29)
        .style("font-size", "12px")
        .text("Organizations");

}

