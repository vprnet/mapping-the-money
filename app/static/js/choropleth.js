//@codekit-prepend "d3.v3.min.js"
//@codekit-prepend "topojson.v1.min.js"

if ($(window).width() < 768) {
    var scale = [9000],
        translate = [150, 160],
        legendRange = [0, 230],
        keyTrans = "translate(240, 135)",
        xLegend = 210,
        yLegend = 350,
        height = 400;
} else {
    var scale = [12000],
        translate = [175, 190],
        legendRange = [0, 325],
        keyTrans = "translate(320, 135)",
        height = 600,
        xLegend = 280,
        yLegend = 435;
}

// Set window height + width
var width = width,
    height = height;

// Define map projection
var projection = d3.geo.transverseMercator()
    .rotate([72.57, -44.20])
    .translate(translate)
    .scale(scale);

// Define path generator
var path = d3.geo.path()
    .projection(projection);

// Create SVG Element
var svg = d3.select("body").select("#mapbox").append("svg")
    .attr("width", width)
    .attr("height", height);

var table= d3.select("body").select("#town-info");

// Define scale to sort data values into color buckets
var color = d3.scale.threshold()
    .domain([10000, 50000, 200000, 500000, 1000000, 2000000, 3000000, 5000000])
    .range(["#fff7ec","#fee8c8","#fdd49e","#fdbb84","#fc8d59","#ef6548","#d7301f","#b30000","#7f0000"]);

// Legend Stuff

var y = d3.scale.sqrt()
    .domain([0, 6000000])
    .range(legendRange);

var commasFormatter = d3.format(",.0f");

var yAxis = d3.svg.axis()
    .scale(y)
    .tickValues(color.domain())
    .tickFormat(function(d) { return "$" + commasFormatter(d); })
    .orient("right");

var touchClick;

if (Modernizr.touch) {
        touchClick="mouseover";
    } else {
        touchClick="click";
    }

var helpText = d3.selectAll("td.help-popup");

helpText
    .on("mouseover", function() {
        d3.select(this).select("span").style("font-weight", "bold");
    })
    .on("mouseout", function(d) {
        d3.select(this).select("span").style("font-weight", "normal");
    });

helpText
    .on(touchClick, function(d) {
        var whichHelp = d3.select(this).attr("id");
        console.log(whichHelp);
        var remText = d3.select("#help-popups")
            .selectAll("div")
            .style("display", "none");

        if (whichHelp == 'ihp-event') {

            d3.select("#ihp-help")
                .style("display", "block");
        } else if (whichHelp == 'pa-event') {
            d3.select("#pa-help")
                .style("display", "block");
        } else if (whichHelp == 'hmgp-event') {
            d3.select("#hmgp-help")
                .style("display", "block");
        } else if (whichHelp == 'ha-event') {
            d3.select("#ha-help")
                .style("display", "block");
        } else if (whichHelp === 'on-event') {
            d3.select("#on-help")
                .style("display", "block");
        }
    });

function toTitleCase(str)
    {
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }

var paHelp = d3.select("#pa-help")
    .on(touchClick, function(d) {
        var remText = d3.select("#help-text")
            .selectAll("div")
            .style("display", "none");

        var helpText = d3.select("#pa-help-text")
            .style("display", "block");
    });

// Load CSV
d3.csv("data/fed/vpr-irene-20130827-federal-map.csv", function(data) {

    // Load TopoJSON
    d3.json("data/vermont.json", function(error, vt) {

        for (var i = 0; i < data.length; i++) {
            var dataTown = data[i].town;
            var dataFEMA = parseFloat(data[i].fema_total);

            for (var j = 0; j < vt.objects.vt_towns.geometries.length; j++) {
                var jsonTown = vt.objects.vt_towns.geometries[j].properties.town;

                if (dataTown.toUpperCase() === jsonTown) {
                    vt.objects.vt_towns.geometries[j].properties.fema_total = dataFEMA;

                    break;
                }
            }
        }

        var vermont = topojson.feature(vt, vt.objects.vt_towns);

        svg.append("path")
            .datum(vermont)
            .attr("d", path)
            .style("stroke", "#777")
            .style("stroke-width", "1");

        var resetButton = d3.select("div#town-name").select("p");

        resetButton
            .on(touchClick, function(d) {
                function toUSD(num) {
                    var number = num.toString(),
                    dollars = number.split('.')[0],
                    cents = (number.split('.')[1] || '') +'00';
                    dollars = dollars.split('').reverse().join('')
                        .replace(/(\d{3}(?!$))/g, '$1,')
                        .split('').reverse().join('');
                    return '$' + dollars;
                }



                table.select('div#town-name h3')
                    .text("Sum across all towns");

                table.select('div#town-name p')
                    .style("display", "none");


                var idx = data.length - 1;
                var tableArray = [];
                tableArray.push(
                    ['', ' ', toUSD(data[idx].ihp_total)],
                    ['', toUSD(data[idx].ha_amount), ' '],
                    ['', toUSD(data[idx].on_amount), ' '],
                    ['', ' ', toUSD(data[idx].pa_total)],
                    ['', ' ', toUSD(data[idx].hmgp_total)],
                    ['', ' ', toUSD(data[idx].nfi)],
                    ['', ' ', toUSD(data[idx].fema_total)]);
                var tdRemove = table.selectAll('tr')
                    .selectAll('td.update-table')
                    .remove();


                var tr = d3.select("tbody").selectAll("tr").data(tableArray);

                tr.enter();

                var td = tr.selectAll("td")
                    .data(function(d) { return d; })
                    .enter().append("td").attr("class", "update-table")
                    .text(function(d) { return d; });
            });

        var g = svg.append("g")
            .attr("class", "key")
            .attr("transform", keyTrans)
            .call(yAxis);

        g.selectAll("rect")
            .data(color.range().map(function(d, i) {
                return {
                    y0: i ? y(color.domain()[i - 1]) : y.range()[0],
                    y1: i < color.domain().length ? y(color.domain()[i]) : y.range()[1],
                    z: d
                };
            }))
            .enter().append("rect")
                .attr("width", 8)
                .attr("y", function(d) { return d.y0; })
                .attr("height", function(d) { return d.y1 - d.y0; })
                .style("fill", function(d) { return d.z; });

        svg.selectAll(".subunit")
            .data(topojson.feature(vt, vt.objects.vt_towns).features)
        .enter().append("path")
            .attr("d", path)
            .style("fill", function(d) {
                var fema = d.properties.fema_total;

                if (fema) {
                    return color(fema);
                } else {
                    return "#d4d5d6";
                }
            })

            .on("mouseover", function(d) {
                var xPosition = d3.mouse(this)[0];
                var yPosition = d3.mouse(this)[1] - 40;

                svg.append("text")
                    .attr("id", "tooltip")
                    .attr("x", xPosition)
                    .attr("y", yPosition)
                    .attr("text-anchor", "middle")
                    .attr("font-family", "sans-serif")
                    .attr("font-size", "11px")
                    .attr("font-weight", "bold")
                    .attr("fill", "black")
                    .text(d.properties.town);

                d3.select(this)
                .style("fill", "#509e2f");
            })
            .on(touchClick, function(d) {
                if (Modernizr.touch) {
                    var xPosition = d3.mouse(this)[0];
                    var yPosition = d3.mouse(this)[1] - 40;

                    svg.append("text")
                        .attr("id", "tooltip")
                        .attr("x", xPosition)
                        .attr("y", yPosition)
                        .attr("text-anchor", "middle")
                        .attr("font-family", "sans-serif")
                        .attr("font-size", "11px")
                        .attr("font-weight", "bold")
                        .attr("fill", "black")
                        .text(d.properties.town);

                    d3.select(this)
                    .style("fill", "#509e2f");
                }


                var townName = d.properties.town;

                function toUSD(num) {
                    var number = num.toString(),
                    dollars = number.split('.')[0],
                    cents = (number.split('.')[1] || '') +'00';
                    dollars = dollars.split('').reverse().join('')
                        .replace(/(\d{3}(?!$))/g, '$1,')
                        .split('').reverse().join('');
                    return '$' + dollars;
                }



                table.select('div#town-name h3')
                    .transition()
                    .text(toTitleCase(townName));

                table.select('div#town-name p')
                    .style("display", "block");

                var tableArray = [];
                for (var i = 0; i < data.length; i++) {
                    if (townName == data[i].town.toUpperCase()) {
                        tableArray.push(
                            ['', ' ', toUSD(data[i].ihp_total)],
                            ['', toUSD(data[i].ha_amount), ' '],
                            ['', toUSD(data[i].on_amount), ' '],
                            ['', ' ', toUSD(data[i].pa_total)],
                            ['', ' ', toUSD(data[i].hmgp_total)],
                            ['', ' ', toUSD(data[i].nfi)],
                            ['', ' ', toUSD(data[i].fema_total)]);
                    }
                }

                if (!tableArray.length) {
                    tableArray = [
                        ['','','$0'],
                        ['','$0',''],
                        ['','$0',''],
                        ['','','$0'],
                        ['','','$0'],
                        ['','','$0'],
                        ['','','$0'] ];
                }


                var tdRemove = table.selectAll('tr')
                    .selectAll('td.update-table')
                    .remove();


                var tr = d3.select("tbody").selectAll("tr").data(tableArray);

                tr.enter();

                var td = tr.selectAll("td")
                    .data(function(d) { return d; })
                    .enter().append("td").attr("class", "update-table")
                    .text(function(d) { return d; });
            })

            .on("mouseout", function(d) {
                d3.select("#tooltip").remove();

                d3.select(this)
                .transition()
                .duration(250)
                .style("fill", function(d) {
                var fema = d.properties.fema_total;

                if (fema) {
                    return color(fema);
                } else {
                    return "#d4d5d6";
                }
                });
            });

            svg.append("path")
                .datum(topojson.feature(vt, vt.objects.lake))
                .attr("d", path)
                .style("stroke", "#89b6ef")
                .style("stroke-width", "1px")
                .style("fill", "#b6d2f5");
    });
});
