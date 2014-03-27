//@codekit-prepend "d3.v3.min.js"
//@codekit-prepend "queue.v1.min.js"
//@codekit-prepend "topojson.v1.min.js"

if ($(window).width() < 768) {
    var scale = [9000],
        translate = [150, 160],
        symbolRange = [0, 40],
        legendRange = [0, 230],
        fhaKey = "(240, 135)",
        xLegend = 210,
        yLegend = 350,
        height = 400;
} else {
    var scale = [12000],
        translate = [175, 190],
        symbolRange = [0, 50],
        legendRange = [0, 325],
        fhaKey = "(320, 135)",
        height = 600,
        xLegend = 280,
        yLegend = 435;
}

if (Modernizr.touch) {
        touchClick="mouseover";
    } else {
        touchClick="click";
    }

var width = 400;

var projection = d3.geo.transverseMercator()
    .rotate([72.57, -44.20])
    .translate(translate)
    .scale(scale);

var path = d3.geo.path()
    .projection(projection);

var touchClick;

function toUSD(num) {
    var number = num.toString(),

    dollars = number.split('.')[0],
    cents = (number.split('.')[1] || '') +'00';
    dollars = dollars.split('').reverse().join('')
        .replace(/(\d{3}(?!$))/g, '$1,')
        .split('').reverse().join('');
    return '$' + dollars;
}

// Symbol Map Stuff
var radius = d3.scale.sqrt()
    .domain([0, 7e5])
    .range(symbolRange);

var svgFsa = d3.select("body").select("#fsa-mapbox").append("svg")
    .attr("width", width)
    .attr("height", height);

// Choropleth Stuff

var svgFha = d3.select("body").select("#fha-mapbox").append("svg")
    .attr("width", width)
    .attr("height", height);

var color = d3.scale.threshold()
    .domain([10000, 50000, 200000, 500000,1000000,
            2000000, 5000000, 10000000, 25000000])
    .range(["#f7fcf5","#e5f5e0","#c7e9c0","#a1d99b","#74c476",
            "#41ab5d","#238b45","#006d2c","#00441b"]);

// Choropleth Legend
var y = d3.scale.sqrt()
    .domain([0, 20000000])
    .range(legendRange);

var yAxis = d3.svg.axis()
    .scale(y)
    .tickValues(color.domain())
    .orient("right");

queue()
    .defer(d3.json, "data/vermont.json")
    .defer(d3.json, "data/fed/fed.json")
    .defer(d3.csv, "data/fed/vpr-irene-20130827-federal-map.csv")
    .await(ready);


function ready(error, vt, centroid, data) {
    var vermont = topojson.feature(vt, vt.objects.vt_towns);

    // Symbol Code
    svgFsa.append("path")
        .attr("class", "towns")
        .datum(topojson.feature(vt, vt.objects.vt_towns))
        .attr("d", path)
        .style("stroke", "#ddd")
        .style("stroke-width", "1px")
        .style("fill", "#ccc");

    svgFsa.append("path")
        .datum(topojson.feature(vt, vt.objects.lake))
        .attr("d", path)
        .style("stroke", "#89b6ef")
        .style("stroke-width", "1px")
        .style("fill", "#b6d2f5");

    function pieData() {
        var pieArray = [];
        for (i=0; i<centroid.features.length; i++) {
            pieArray.push([
                centroid.features[i].properties.dollars,
                centroid.features[i].properties.ECP,
                centroid.features[i].properties.LIP,
                centroid.features[i].properties.NAP,
                centroid.features[i].properties.SURE
                ]);
        }
        return pieArray;
    }
    var pieArray = pieData();

    svgFsa.selectAll(".symbol")
        .data(centroid.features.sort(function(a,b) {
            return b.properties.dollars - a.properties.dollars; }))
        .enter().append("path")
            .attr("class", "symbol")
            .attr("d", path.pointRadius(function(d) {
                if (d.type == "Feature") { 
                    return radius(d.properties.dollars); }
                })
            )
        .style("fill", "#steelblue")
        .on("mouseover", function(d) {
            var xPosition = d3.mouse(this)[0];
            var yPosition = d3.mouse(this)[1] - 20;

            d3.select(this)
                .style("stroke", "#ffffeb")
                .style("stroke-width", "2px")
                .style("fill-opacity", "1");

            svgFsa.append("text")
                .attr("id", "tooltip")
                .attr("x", function(d) {
                    if (xPosition < 100) {
                        return xPosition + 60;
                    } else {
                        return xPosition;
                    }})
                .attr("y", function(d) {
                    if (yPosition < 100) {
                        return yPosition - 90;
                    } else {
                        return yPosition;
                    }})
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


    var circleLegend = [
        {radius: radius(7e5), cx: xLegend, cy: yLegend},
        {radius: radius(2e5), cx: (xLegend + 22), cy: (yLegend - 85)},
        {radius: radius(5e4), cx: (xLegend + 37), cy: (yLegend - 135)},
        {radius: radius(1e4), cx: (xLegend + 43), cy: (yLegend - 165)}];

    var circleAmount = [
        {text: "$700,000", x: (xLegend + 55), y: (circleLegend[0].cy + 5)},
        {text: "$200,000", x: (xLegend + 55), y: (circleLegend[1].cy + 5)},
        {text: "$50,000", x: (xLegend + 55), y: (circleLegend[2].cy + 5)},
        {text: "$10,000", x: (xLegend + 55), y: (circleLegend[3].cy + 5)}];

    svgFsa.selectAll("circle.guide")
        .data(circleLegend)
        .enter().append("circle")
            .attr("class", "guide")
            .attr("cx", function (d) { return d.cx; })
            .attr("cy", function (d) { return d.cy; })
            .attr("r", function (d) { return d.radius; });

    svgFsa.selectAll("text.legend")
        .data(circleAmount)
        .enter().append("text")
            .attr("class", "legend")
            .attr("x", function (d) { return d.x; })
            .attr("y", function (d) { return d.y; })
            .text(function (d) { return d.text; });

    // Choropleth Code
    for (var i = 0; i < data.length; i++) {
        var dataTown = data[i].town;
        var dataFha = parseFloat(data[i].fha);

        for (var j = 0; j < vt.objects.vt_towns.geometries.length; j++) {
            var jsonTown = vt.objects.vt_towns.geometries[j].properties.town;

            if (dataTown.toUpperCase() == jsonTown.toUpperCase()) {
                vt.objects.vt_towns.geometries[j].properties.fha = dataFha;

                break;
            }
        }
    }

    var g = svgFha.append("g")
        .attr("class", "key")
        .attr("transform", "translate" + fhaKey)
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
            .attr("width", 6)
            .attr("y", function(d) { return d.y0; })
            .attr("height", function(d) { return d.y1 - d.y0; })
            .style("fill", function(d) { return d.z; });


    function mapOrg(organization) {
        svgFha.append("path")
            .datum(vermont)
            .attr("d", path)
            .style("stroke", "#aaa")
            .style("stroke-width", "1");


        svgFha.selectAll(".subunit")
                .data(topojson.feature(vt, vt.objects.vt_towns).features)
            .enter().append("path")
                .attr("d", path)
                .style("fill", function(d) {
                    var org;
                    if (organization == "Federal") {
                        org = d.properties.fha;
                    } else if (organization == "State") {
                        org = d.properties.state;
                    } else if (organization == "Local") {
                        org = d.properties.local;
                    }

                    if (org) {
                        return color(org);
                    } else {
                        return "#ddd";
                    }
                })

            .on("mouseover", function(d) {
                var xPosition = d3.mouse(this)[0];
                var yPosition = d3.mouse(this)[1] - 30;

                svgFha.append("text")
                    .attr("id", "tooltip")
                    .attr("x", function(d) {
                        if (xPosition < 100) {
                            return xPosition + 30;
                        } else {
                            return xPosition;
                        }})
                    .attr("y", function(d) {
                        if (yPosition < 100) {
                            return yPosition + 60;
                        } else {
                            return yPosition;
                        }})
                    .attr("text-anchor", "middle")
                    .attr("font-family", "sans-serif")
                    .attr("font-size", "11px")
                    .attr("font-weight", "bold")
                    .attr("fill", "black")
                    .text(function() {
                        var dollars;
                        if (organization == "Federal") {
                            if (d.properties.fha) {
                                dollars = toUSD(d.properties.fha);
                            } else { dollars = '$0'; }
                        } else if (organization == "State") {
                            if (d.properties.state) {
                                dollars = toUSD(d.properties.state);
                            } else { dollars = '$0'; }
                        } else if (organization == "Local") {
                            if (d.properties.local) {
                                dollars = toUSD(d.properties.local);
                            } else { dollars = '$0'; }
                        }
                        return (d.properties.town + " - " + dollars);
                        });

                d3.select(this)
                .style("fill", "#ed8b00");
            })
            .on("mouseout", function(d) {
                d3.select("#tooltip").remove();

                d3.select(this)
                .transition()
                .duration(250)
                .style("fill", function(d) {
                    var org;
                    if (organization == "Federal") {
                        org = d.properties.fha;
                    } else if (organization == "State") {
                        org = d.properties.state;
                    } else if (organization == "Local") {
                        org = d.properties.local;
                    }

                    if (org) {
                        return color(org);
                    } else {
                        return "#ddd";
                    }
                });
            });

    svgFha.append("path")
        .datum(topojson.feature(vt, vt.objects.lake))
        .attr("d", path)
        .style("stroke", "#89b6ef")
        .style("stroke-width", "1px")
        .style("fill", "#b6d2f5");

    }

    mapOrg("Federal");

    svgFha.select("#map-Federal circle")
        .attr("stroke", "#f7d1cc")
        .attr("fill", "#d63821");

    svgFha.select("#map-Federal text")
        .attr("text-decoration", "underline");

    svgFha.selectAll("text.org-selector")
        .on(touchClick, function (d) {
            mapOrg(d);

            d3.selectAll("circle")
                .attr("stroke", "#ddd")
                .attr("fill", "#999");

            d3.selectAll("text.org-selector")
                .attr("text-decoration", "none");

            d3.select(this.parentNode).select("circle")
                .attr("stroke", "#f7d1cc")
                .attr("fill", "#d63821");

            d3.select(this)
                .attr("text-decoration", "underline");
        });

    var hudClick = d3.select("div.hud").select("p.click-more");

    hudClick.on(touchClick, function (d) {
        d3.select("#hud-description")
            .style("display", "none");
        d3.select("#hud-additional")
            .style("display", "block");
    });

    var edaClick = d3.select("div.eda").select("p.click-more");

    edaClick.on(touchClick, function (d) {
        d3.select("#eda-description")
            .style("display", "none");
        d3.select("#eda-additional")
            .style("display", "block");
    });
    
    var fsaClick = d3.select("div.fsa").select("p.click-more");

    fsaClick.on(touchClick, function (d) {
        d3.select("#fsa-description")
            .style("display", "none");
        d3.select("#fsa-table")
            .style("display", "block");
    });

    var hudClickBack = d3.select("div.hud").select("p.click-back");

    hudClickBack.on(touchClick, function (d) {
        d3.select("#hud-description")
            .style("display", "block");
        d3.select("#hud-additional")
            .style("display", "none");
    });

    var edaClickBack = d3.select("div.eda").select("p.click-back");

    edaClickBack.on(touchClick, function (d) {
        d3.select("#eda-description")
            .style("display", "block");
        d3.select("#eda-additional")
            .style("display", "none");
    });
    
    var fsaClickBack = d3.select("div.fsa").select("p.click-back");

    fsaClickBack.on(touchClick, function (d) {
        d3.select("#fsa-description")
            .style("display", "block");
        d3.select("#fsa-table")
            .style("display", "none");
    });
}

