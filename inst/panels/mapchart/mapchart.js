// Generated by CoffeeScript 1.7.1
var mapchart;

mapchart = function() {
  var axispos, chart, height, linecolor, linecolorhilit, linewidth, margin, markerSelect, nyticks, rectcolor, rotate_ylab, tickwidth, title, titlepos, width, xlab, xscale, ylab, ylim, yscale, yticks;
  width = 1000;
  height = 600;
  margin = {
    left: 60,
    top: 40,
    right: 40,
    bottom: 40,
    inner: 10
  };
  axispos = {
    xtitle: 25,
    ytitle: 30,
    xlabel: 5,
    ylabel: 5
  };
  titlepos = 20;
  ylim = null;
  nyticks = 5;
  yticks = null;
  tickwidth = 10;
  rectcolor = d3.rgb(230, 230, 230);
  linecolor = "slateblue";
  linecolorhilit = "Orchid";
  linewidth = 3;
  title = "";
  xlab = "Chromosome";
  ylab = "Position (cM)";
  rotate_ylab = null;
  xscale = d3.scale.ordinal();
  yscale = d3.scale.linear();
  markerSelect = null;
  chart = function(selection) {
    return selection.each(function(data) {
      var chr, g, gEnter, mar, markSelect, marker, markernames, markerpos, markers, martip, pos, svg, titlegrp, xaxis, xrange, yaxis, yextentByChr, ymax, ymin, yrange, _i, _j, _len, _len1, _ref, _ref1;
      yextentByChr = {};
      _ref = data.chr;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        chr = _ref[_i];
        pos = (function() {
          var _results;
          _results = [];
          for (marker in data.map[chr]) {
            _results.push(data.map[chr][marker]);
          }
          return _results;
        })();
        yextentByChr[chr] = d3.extent(pos);
      }
      ymin = (function() {
        var _j, _len1, _ref1, _results;
        _ref1 = data.chr;
        _results = [];
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          chr = _ref1[_j];
          _results.push(yextentByChr[chr][0]);
        }
        return _results;
      })();
      ymax = (function() {
        var _j, _len1, _ref1, _results;
        _ref1 = data.chr;
        _results = [];
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          chr = _ref1[_j];
          _results.push(yextentByChr[chr][1]);
        }
        return _results;
      })();
      ylim = ylim != null ? ylim : d3.extent(ymin.concat(ymax));
      svg = d3.select(this).selectAll("svg").data([data]);
      gEnter = svg.enter().append("svg").append("g");
      svg.attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom);
      g = svg.select("g");
      g.append("rect").attr("x", margin.left).attr("y", margin.top).attr("height", height).attr("width", width).attr("fill", rectcolor).attr("stroke", "none");
      xrange = [margin.left + margin.inner, margin.left + width - margin.inner];
      xscale.domain(data.chr).rangePoints(xrange, 1);
      yrange = [margin.top + margin.inner, margin.top + height - margin.inner];
      yscale.domain(ylim).range(yrange);
      yticks = yticks != null ? yticks : yscale.ticks(nyticks);
      titlegrp = g.append("g").attr("class", "title").append("text").attr("x", margin.left + width / 2).attr("y", margin.top - titlepos).text(title);
      xaxis = g.append("g").attr("class", "x axis");
      xaxis.selectAll("empty").data(data.chr).enter().append("line").attr("x1", function(d) {
        return xscale(d);
      }).attr("x2", function(d) {
        return xscale(d);
      }).attr("y1", margin.top).attr("y2", margin.top + height).attr("class", "x axis grid");
      xaxis.selectAll("empty").data(data.chr).enter().append("text").attr("x", function(d) {
        return xscale(d);
      }).attr("y", margin.top + height + axispos.xlabel).text(function(d) {
        return d;
      });
      xaxis.append("text").attr("class", "title").attr("x", margin.left + width / 2).attr("y", margin.top + height + axispos.xtitle).text(xlab);
      rotate_ylab = rotate_ylab != null ? rotate_ylab : ylab.length > 1;
      yaxis = g.append("g").attr("class", "y axis");
      yaxis.selectAll("empty").data(yticks).enter().append("line").attr("y1", function(d) {
        return yscale(d);
      }).attr("y2", function(d) {
        return yscale(d);
      }).attr("x1", margin.left).attr("x2", margin.left + width).attr("class", "y axis grid");
      yaxis.selectAll("empty").data(yticks).enter().append("text").attr("y", function(d) {
        return yscale(d);
      }).attr("x", margin.left - axispos.ylabel).text(function(d) {
        return formatAxis(yticks)(d);
      });
      yaxis.append("text").attr("class", "title").attr("y", margin.top + height / 2).attr("x", margin.left - axispos.ytitle).text(ylab).attr("transform", rotate_ylab ? "rotate(270," + (margin.left - axispos.ytitle) + "," + (margin.top + height / 2) + ")" : "");
      g.append("g").attr("id", "chromosomes").selectAll("empty").data(data.chr).enter().append("line").attr("x1", function(d) {
        return xscale(d);
      }).attr("x2", function(d) {
        return xscale(d);
      }).attr("y1", function(d) {
        return yscale(yextentByChr[d][0]);
      }).attr("y2", function(d) {
        return yscale(yextentByChr[d][1]);
      }).attr("fill", "none").attr("stroke", linecolor).attr("stroke-width", linewidth).style("pointer-events", "none");
      martip = d3.tip().attr('class', 'd3-tip').html(function(d) {
        pos = d3.format(".1f")(markerpos[d].pos);
        return "" + d + " (" + pos + ")";
      }).direction('e').offset([0, 10]);
      svg.call(martip);
      markerpos = {};
      _ref1 = data.chr;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        chr = _ref1[_j];
        for (marker in data.map[chr]) {
          markerpos[marker] = {
            chr: chr,
            pos: data.map[chr][marker]
          };
        }
      }
      markernames = (function() {
        var _results;
        _results = [];
        for (mar in markerpos) {
          _results.push(mar);
        }
        return _results;
      })();
      markers = g.append("g").attr("id", "points");
      markSelect = markers.selectAll("empty").data(markernames).enter().append("line").attr("x1", function(d) {
        return xscale(markerpos[d].chr) - tickwidth;
      }).attr("x2", function(d) {
        return xscale(markerpos[d].chr) + tickwidth;
      }).attr("y1", function(d) {
        return yscale(markerpos[d].pos);
      }).attr("y2", function(d) {
        return yscale(markerpos[d].pos);
      }).attr("fill", "none").attr("stroke", linecolor).attr("stroke-width", linewidth).on("mouseover.paneltip", function(d) {
        d3.select(this).attr("stroke", linecolorhilit);
        return martip.show(d);
      }).on("mouseout.paneltip", function() {
        d3.select(this).attr("stroke", linecolor);
        return martip.hide();
      });
      return g.append("rect").attr("x", margin.left).attr("y", margin.top).attr("height", height).attr("width", width).attr("fill", "none").attr("stroke", "black").attr("stroke-width", "none");
    });
  };
  chart.width = function(value) {
    if (!arguments.length) {
      return width;
    }
    width = value;
    return chart;
  };
  chart.height = function(value) {
    if (!arguments.length) {
      return height;
    }
    height = value;
    return chart;
  };
  chart.margin = function(value) {
    if (!arguments.length) {
      return margin;
    }
    margin = value;
    return chart;
  };
  chart.axispos = function(value) {
    if (!arguments.length) {
      return axispos;
    }
    axispos = value;
    return chart;
  };
  chart.titlepos = function(value) {
    if (!arguments.length) {
      return titlepos;
    }
    titlepos;
    return chart;
  };
  chart.ylim = function(value) {
    if (!arguments.length) {
      return ylim;
    }
    ylim = value;
    return chart;
  };
  chart.nyticks = function(value) {
    if (!arguments.length) {
      return nyticks;
    }
    nyticks = value;
    return chart;
  };
  chart.yticks = function(value) {
    if (!arguments.length) {
      return yticks;
    }
    yticks = value;
    return chart;
  };
  chart.tickwidth = function(value) {
    if (!arguments.length) {
      return tickwidth;
    }
    tickwidth = value;
    return chart;
  };
  chart.rectcolor = function(value) {
    if (!arguments.length) {
      return rectcolor;
    }
    rectcolor = value;
    return chart;
  };
  chart.linecolor = function(value) {
    if (!arguments.length) {
      return linecolor;
    }
    linecolor = value;
    return chart;
  };
  chart.linecolorhilit = function(value) {
    if (!arguments.length) {
      return linecolorhilit;
    }
    linecolorhilit = value;
    return chart;
  };
  chart.linewidth = function(value) {
    if (!arguments.length) {
      return linewidth;
    }
    linewidth = value;
    return chart;
  };
  chart.title = function(value) {
    if (!arguments.length) {
      return title;
    }
    title = value;
    return chart;
  };
  chart.xlab = function(value) {
    if (!arguments.length) {
      return xlab;
    }
    xlab = value;
    return chart;
  };
  chart.ylab = function(value) {
    if (!arguments.length) {
      return ylab;
    }
    ylab = value;
    return chart;
  };
  chart.rotate_ylab = function(value) {
    if (!arguments.length) {
      return rotate_ylab;
    }
    rotate_ylab = value;
    return chart;
  };
  chart.yscale = function() {
    return yscale;
  };
  chart.xscale = function() {
    return xscale;
  };
  chart.markerSelect = function() {
    return markerSelect;
  };
  return chart;
};
