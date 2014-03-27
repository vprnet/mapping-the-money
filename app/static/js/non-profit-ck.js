d3 = function() {
  var d3 = {
    version: "3.1.5"
  };
  if (!Date.now) Date.now = function() {
    return +new Date();
  };
  var d3_document = document, d3_window = window;
  try {
    d3_document.createElement("div").style.setProperty("opacity", 0, "");
  } catch (error) {
    var d3_style_prototype = d3_window.CSSStyleDeclaration.prototype, d3_style_setProperty = d3_style_prototype.setProperty;
    d3_style_prototype.setProperty = function(name, value, priority) {
      d3_style_setProperty.call(this, name, value + "", priority);
    };
  }
  d3.ascending = function(a, b) {
    return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
  };
  d3.descending = function(a, b) {
    return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
  };
  d3.min = function(array, f) {
    var i = -1, n = array.length, a, b;
    if (arguments.length === 1) {
      while (++i < n && ((a = array[i]) == null || a != a)) a = undefined;
      while (++i < n) if ((b = array[i]) != null && a > b) a = b;
    } else {
      while (++i < n && ((a = f.call(array, array[i], i)) == null || a != a)) a = undefined;
      while (++i < n) if ((b = f.call(array, array[i], i)) != null && a > b) a = b;
    }
    return a;
  };
  d3.max = function(array, f) {
    var i = -1, n = array.length, a, b;
    if (arguments.length === 1) {
      while (++i < n && ((a = array[i]) == null || a != a)) a = undefined;
      while (++i < n) if ((b = array[i]) != null && b > a) a = b;
    } else {
      while (++i < n && ((a = f.call(array, array[i], i)) == null || a != a)) a = undefined;
      while (++i < n) if ((b = f.call(array, array[i], i)) != null && b > a) a = b;
    }
    return a;
  };
  d3.extent = function(array, f) {
    var i = -1, n = array.length, a, b, c;
    if (arguments.length === 1) {
      while (++i < n && ((a = c = array[i]) == null || a != a)) a = c = undefined;
      while (++i < n) if ((b = array[i]) != null) {
        if (a > b) a = b;
        if (c < b) c = b;
      }
    } else {
      while (++i < n && ((a = c = f.call(array, array[i], i)) == null || a != a)) a = undefined;
      while (++i < n) if ((b = f.call(array, array[i], i)) != null) {
        if (a > b) a = b;
        if (c < b) c = b;
      }
    }
    return [ a, c ];
  };
  d3.sum = function(array, f) {
    var s = 0, n = array.length, a, i = -1;
    if (arguments.length === 1) {
      while (++i < n) if (!isNaN(a = +array[i])) s += a;
    } else {
      while (++i < n) if (!isNaN(a = +f.call(array, array[i], i))) s += a;
    }
    return s;
  };
  function d3_number(x) {
    return x != null && !isNaN(x);
  }
  d3.mean = function(array, f) {
    var n = array.length, a, m = 0, i = -1, j = 0;
    if (arguments.length === 1) {
      while (++i < n) if (d3_number(a = array[i])) m += (a - m) / ++j;
    } else {
      while (++i < n) if (d3_number(a = f.call(array, array[i], i))) m += (a - m) / ++j;
    }
    return j ? m : undefined;
  };
  d3.quantile = function(values, p) {
    var H = (values.length - 1) * p + 1, h = Math.floor(H), v = +values[h - 1], e = H - h;
    return e ? v + e * (values[h] - v) : v;
  };
  d3.median = function(array, f) {
    if (arguments.length > 1) array = array.map(f);
    array = array.filter(d3_number);
    return array.length ? d3.quantile(array.sort(d3.ascending), .5) : undefined;
  };
  d3.bisector = function(f) {
    return {
      left: function(a, x, lo, hi) {
        if (arguments.length < 3) lo = 0;
        if (arguments.length < 4) hi = a.length;
        while (lo < hi) {
          var mid = lo + hi >>> 1;
          if (f.call(a, a[mid], mid) < x) lo = mid + 1; else hi = mid;
        }
        return lo;
      },
      right: function(a, x, lo, hi) {
        if (arguments.length < 3) lo = 0;
        if (arguments.length < 4) hi = a.length;
        while (lo < hi) {
          var mid = lo + hi >>> 1;
          if (x < f.call(a, a[mid], mid)) hi = mid; else lo = mid + 1;
        }
        return lo;
      }
    };
  };
  var d3_bisector = d3.bisector(function(d) {
    return d;
  });
  d3.bisectLeft = d3_bisector.left;
  d3.bisect = d3.bisectRight = d3_bisector.right;
  d3.shuffle = function(array) {
    var m = array.length, t, i;
    while (m) {
      i = Math.random() * m-- | 0;
      t = array[m], array[m] = array[i], array[i] = t;
    }
    return array;
  };
  d3.permute = function(array, indexes) {
    var permutes = [], i = -1, n = indexes.length;
    while (++i < n) permutes[i] = array[indexes[i]];
    return permutes;
  };
  d3.zip = function() {
    if (!(n = arguments.length)) return [];
    for (var i = -1, m = d3.min(arguments, d3_zipLength), zips = new Array(m); ++i < m; ) {
      for (var j = -1, n, zip = zips[i] = new Array(n); ++j < n; ) {
        zip[j] = arguments[j][i];
      }
    }
    return zips;
  };
  function d3_zipLength(d) {
    return d.length;
  }
  d3.transpose = function(matrix) {
    return d3.zip.apply(d3, matrix);
  };
  d3.keys = function(map) {
    var keys = [];
    for (var key in map) keys.push(key);
    return keys;
  };
  d3.values = function(map) {
    var values = [];
    for (var key in map) values.push(map[key]);
    return values;
  };
  d3.entries = function(map) {
    var entries = [];
    for (var key in map) entries.push({
      key: key,
      value: map[key]
    });
    return entries;
  };
  d3.merge = function(arrays) {
    return Array.prototype.concat.apply([], arrays);
  };
  d3.range = function(start, stop, step) {
    if (arguments.length < 3) {
      step = 1;
      if (arguments.length < 2) {
        stop = start;
        start = 0;
      }
    }
    if ((stop - start) / step === Infinity) throw new Error("infinite range");
    var range = [], k = d3_range_integerScale(Math.abs(step)), i = -1, j;
    start *= k, stop *= k, step *= k;
    if (step < 0) while ((j = start + step * ++i) > stop) range.push(j / k); else while ((j = start + step * ++i) < stop) range.push(j / k);
    return range;
  };
  function d3_range_integerScale(x) {
    var k = 1;
    while (x * k % 1) k *= 10;
    return k;
  }
  function d3_class(ctor, properties) {
    try {
      for (var key in properties) {
        Object.defineProperty(ctor.prototype, key, {
          value: properties[key],
          enumerable: false
        });
      }
    } catch (e) {
      ctor.prototype = properties;
    }
  }
  d3.map = function(object) {
    var map = new d3_Map();
    for (var key in object) map.set(key, object[key]);
    return map;
  };
  function d3_Map() {}
  d3_class(d3_Map, {
    has: function(key) {
      return d3_map_prefix + key in this;
    },
    get: function(key) {
      return this[d3_map_prefix + key];
    },
    set: function(key, value) {
      return this[d3_map_prefix + key] = value;
    },
    remove: function(key) {
      key = d3_map_prefix + key;
      return key in this && delete this[key];
    },
    keys: function() {
      var keys = [];
      this.forEach(function(key) {
        keys.push(key);
      });
      return keys;
    },
    values: function() {
      var values = [];
      this.forEach(function(key, value) {
        values.push(value);
      });
      return values;
    },
    entries: function() {
      var entries = [];
      this.forEach(function(key, value) {
        entries.push({
          key: key,
          value: value
        });
      });
      return entries;
    },
    forEach: function(f) {
      for (var key in this) {
        if (key.charCodeAt(0) === d3_map_prefixCode) {
          f.call(this, key.substring(1), this[key]);
        }
      }
    }
  });
  var d3_map_prefix = "\0", d3_map_prefixCode = d3_map_prefix.charCodeAt(0);
  d3.nest = function() {
    var nest = {}, keys = [], sortKeys = [], sortValues, rollup;
    function map(mapType, array, depth) {
      if (depth >= keys.length) return rollup ? rollup.call(nest, array) : sortValues ? array.sort(sortValues) : array;
      var i = -1, n = array.length, key = keys[depth++], keyValue, object, setter, valuesByKey = new d3_Map(), values;
      while (++i < n) {
        if (values = valuesByKey.get(keyValue = key(object = array[i]))) {
          values.push(object);
        } else {
          valuesByKey.set(keyValue, [ object ]);
        }
      }
      if (mapType) {
        object = mapType();
        setter = function(keyValue, values) {
          object.set(keyValue, map(mapType, values, depth));
        };
      } else {
        object = {};
        setter = function(keyValue, values) {
          object[keyValue] = map(mapType, values, depth);
        };
      }
      valuesByKey.forEach(setter);
      return object;
    }
    function entries(map, depth) {
      if (depth >= keys.length) return map;
      var array = [], sortKey = sortKeys[depth++];
      map.forEach(function(key, keyMap) {
        array.push({
          key: key,
          values: entries(keyMap, depth)
        });
      });
      return sortKey ? array.sort(function(a, b) {
        return sortKey(a.key, b.key);
      }) : array;
    }
    nest.map = function(array, mapType) {
      return map(mapType, array, 0);
    };
    nest.entries = function(array) {
      return entries(map(d3.map, array, 0), 0);
    };
    nest.key = function(d) {
      keys.push(d);
      return nest;
    };
    nest.sortKeys = function(order) {
      sortKeys[keys.length - 1] = order;
      return nest;
    };
    nest.sortValues = function(order) {
      sortValues = order;
      return nest;
    };
    nest.rollup = function(f) {
      rollup = f;
      return nest;
    };
    return nest;
  };
  d3.set = function(array) {
    var set = new d3_Set();
    if (array) for (var i = 0; i < array.length; i++) set.add(array[i]);
    return set;
  };
  function d3_Set() {}
  d3_class(d3_Set, {
    has: function(value) {
      return d3_map_prefix + value in this;
    },
    add: function(value) {
      this[d3_map_prefix + value] = true;
      return value;
    },
    remove: function(value) {
      value = d3_map_prefix + value;
      return value in this && delete this[value];
    },
    values: function() {
      var values = [];
      this.forEach(function(value) {
        values.push(value);
      });
      return values;
    },
    forEach: function(f) {
      for (var value in this) {
        if (value.charCodeAt(0) === d3_map_prefixCode) {
          f.call(this, value.substring(1));
        }
      }
    }
  });
  d3.behavior = {};
  d3.rebind = function(target, source) {
    var i = 1, n = arguments.length, method;
    while (++i < n) target[method = arguments[i]] = d3_rebind(target, source, source[method]);
    return target;
  };
  function d3_rebind(target, source, method) {
    return function() {
      var value = method.apply(source, arguments);
      return value === source ? target : value;
    };
  }
  d3.dispatch = function() {
    var dispatch = new d3_dispatch(), i = -1, n = arguments.length;
    while (++i < n) dispatch[arguments[i]] = d3_dispatch_event(dispatch);
    return dispatch;
  };
  function d3_dispatch() {}
  d3_dispatch.prototype.on = function(type, listener) {
    var i = type.indexOf("."), name = "";
    if (i >= 0) {
      name = type.substring(i + 1);
      type = type.substring(0, i);
    }
    if (type) return arguments.length < 2 ? this[type].on(name) : this[type].on(name, listener);
    if (arguments.length === 2) {
      if (listener == null) for (type in this) {
        if (this.hasOwnProperty(type)) this[type].on(name, null);
      }
      return this;
    }
  };
  function d3_dispatch_event(dispatch) {
    var listeners = [], listenerByName = new d3_Map();
    function event() {
      var z = listeners, i = -1, n = z.length, l;
      while (++i < n) if (l = z[i].on) l.apply(this, arguments);
      return dispatch;
    }
    event.on = function(name, listener) {
      var l = listenerByName.get(name), i;
      if (arguments.length < 2) return l && l.on;
      if (l) {
        l.on = null;
        listeners = listeners.slice(0, i = listeners.indexOf(l)).concat(listeners.slice(i + 1));
        listenerByName.remove(name);
      }
      if (listener) listeners.push(listenerByName.set(name, {
        on: listener
      }));
      return dispatch;
    };
    return event;
  }
  d3.event = null;
  function d3_eventCancel() {
    d3.event.stopPropagation();
    d3.event.preventDefault();
  }
  function d3_eventSource() {
    var e = d3.event, s;
    while (s = e.sourceEvent) e = s;
    return e;
  }
  function d3_eventSuppress(target, type) {
    function off() {
      target.on(type, null);
    }
    target.on(type, function() {
      d3_eventCancel();
      off();
    }, true);
    setTimeout(off, 0);
  }
  function d3_eventDispatch(target) {
    var dispatch = new d3_dispatch(), i = 0, n = arguments.length;
    while (++i < n) dispatch[arguments[i]] = d3_dispatch_event(dispatch);
    dispatch.of = function(thiz, argumentz) {
      return function(e1) {
        try {
          var e0 = e1.sourceEvent = d3.event;
          e1.target = target;
          d3.event = e1;
          dispatch[e1.type].apply(thiz, argumentz);
        } finally {
          d3.event = e0;
        }
      };
    };
    return dispatch;
  }
  d3.mouse = function(container) {
    return d3_mousePoint(container, d3_eventSource());
  };
  var d3_mouse_bug44083 = /WebKit/.test(d3_window.navigator.userAgent) ? -1 : 0;
  function d3_mousePoint(container, e) {
    var svg = container.ownerSVGElement || container;
    if (svg.createSVGPoint) {
      var point = svg.createSVGPoint();
      if (d3_mouse_bug44083 < 0 && (d3_window.scrollX || d3_window.scrollY)) {
        svg = d3.select(d3_document.body).append("svg").style("position", "absolute").style("top", 0).style("left", 0);
        var ctm = svg[0][0].getScreenCTM();
        d3_mouse_bug44083 = !(ctm.f || ctm.e);
        svg.remove();
      }
      if (d3_mouse_bug44083) {
        point.x = e.pageX;
        point.y = e.pageY;
      } else {
        point.x = e.clientX;
        point.y = e.clientY;
      }
      point = point.matrixTransform(container.getScreenCTM().inverse());
      return [ point.x, point.y ];
    }
    var rect = container.getBoundingClientRect();
    return [ e.clientX - rect.left - container.clientLeft, e.clientY - rect.top - container.clientTop ];
  }
  var d3_array = d3_arraySlice;
  function d3_arrayCopy(pseudoarray) {
    var i = -1, n = pseudoarray.length, array = [];
    while (++i < n) array.push(pseudoarray[i]);
    return array;
  }
  function d3_arraySlice(pseudoarray) {
    return Array.prototype.slice.call(pseudoarray);
  }
  try {
    d3_array(d3_document.documentElement.childNodes)[0].nodeType;
  } catch (e) {
    d3_array = d3_arrayCopy;
  }
  var d3_arraySubclass = [].__proto__ ? function(array, prototype) {
    array.__proto__ = prototype;
  } : function(array, prototype) {
    for (var property in prototype) array[property] = prototype[property];
  };
  d3.touches = function(container, touches) {
    if (arguments.length < 2) touches = d3_eventSource().touches;
    return touches ? d3_array(touches).map(function(touch) {
      var point = d3_mousePoint(container, touch);
      point.identifier = touch.identifier;
      return point;
    }) : [];
  };
  d3.behavior.drag = function() {
    var event = d3_eventDispatch(drag, "drag", "dragstart", "dragend"), origin = null;
    function drag() {
      this.on("mousedown.drag", mousedown).on("touchstart.drag", mousedown);
    }
    function mousedown() {
      var target = this, event_ = event.of(target, arguments), eventTarget = d3.event.target, touchId = d3.event.touches ? d3.event.changedTouches[0].identifier : null, offset, origin_ = point(), moved = 0;
      var w = d3.select(d3_window).on(touchId != null ? "touchmove.drag-" + touchId : "mousemove.drag", dragmove).on(touchId != null ? "touchend.drag-" + touchId : "mouseup.drag", dragend, true);
      if (origin) {
        offset = origin.apply(target, arguments);
        offset = [ offset.x - origin_[0], offset.y - origin_[1] ];
      } else {
        offset = [ 0, 0 ];
      }
      if (touchId == null) d3_eventCancel();
      event_({
        type: "dragstart"
      });
      function point() {
        var p = target.parentNode;
        return touchId != null ? d3.touches(p).filter(function(p) {
          return p.identifier === touchId;
        })[0] : d3.mouse(p);
      }
      function dragmove() {
        if (!target.parentNode) return dragend();
        var p = point(), dx = p[0] - origin_[0], dy = p[1] - origin_[1];
        moved |= dx | dy;
        origin_ = p;
        d3_eventCancel();
        event_({
          type: "drag",
          x: p[0] + offset[0],
          y: p[1] + offset[1],
          dx: dx,
          dy: dy
        });
      }
      function dragend() {
        event_({
          type: "dragend"
        });
        if (moved) {
          d3_eventCancel();
          if (d3.event.target === eventTarget) d3_eventSuppress(w, "click");
        }
        w.on(touchId != null ? "touchmove.drag-" + touchId : "mousemove.drag", null).on(touchId != null ? "touchend.drag-" + touchId : "mouseup.drag", null);
      }
    }
    drag.origin = function(x) {
      if (!arguments.length) return origin;
      origin = x;
      return drag;
    };
    return d3.rebind(drag, event, "on");
  };
  function d3_selection(groups) {
    d3_arraySubclass(groups, d3_selectionPrototype);
    return groups;
  }
  var d3_select = function(s, n) {
    return n.querySelector(s);
  }, d3_selectAll = function(s, n) {
    return n.querySelectorAll(s);
  }, d3_selectRoot = d3_document.documentElement, d3_selectMatcher = d3_selectRoot.matchesSelector || d3_selectRoot.webkitMatchesSelector || d3_selectRoot.mozMatchesSelector || d3_selectRoot.msMatchesSelector || d3_selectRoot.oMatchesSelector, d3_selectMatches = function(n, s) {
    return d3_selectMatcher.call(n, s);
  };
  if (typeof Sizzle === "function") {
    d3_select = function(s, n) {
      return Sizzle(s, n)[0] || null;
    };
    d3_selectAll = function(s, n) {
      return Sizzle.uniqueSort(Sizzle(s, n));
    };
    d3_selectMatches = Sizzle.matchesSelector;
  }
  var d3_selectionPrototype = [];
  d3.selection = function() {
    return d3_selectionRoot;
  };
  d3.selection.prototype = d3_selectionPrototype;
  d3_selectionPrototype.select = function(selector) {
    var subgroups = [], subgroup, subnode, group, node;
    if (typeof selector !== "function") selector = d3_selection_selector(selector);
    for (var j = -1, m = this.length; ++j < m; ) {
      subgroups.push(subgroup = []);
      subgroup.parentNode = (group = this[j]).parentNode;
      for (var i = -1, n = group.length; ++i < n; ) {
        if (node = group[i]) {
          subgroup.push(subnode = selector.call(node, node.__data__, i));
          if (subnode && "__data__" in node) subnode.__data__ = node.__data__;
        } else {
          subgroup.push(null);
        }
      }
    }
    return d3_selection(subgroups);
  };
  function d3_selection_selector(selector) {
    return function() {
      return d3_select(selector, this);
    };
  }
  d3_selectionPrototype.selectAll = function(selector) {
    var subgroups = [], subgroup, node;
    if (typeof selector !== "function") selector = d3_selection_selectorAll(selector);
    for (var j = -1, m = this.length; ++j < m; ) {
      for (var group = this[j], i = -1, n = group.length; ++i < n; ) {
        if (node = group[i]) {
          subgroups.push(subgroup = d3_array(selector.call(node, node.__data__, i)));
          subgroup.parentNode = node;
        }
      }
    }
    return d3_selection(subgroups);
  };
  function d3_selection_selectorAll(selector) {
    return function() {
      return d3_selectAll(selector, this);
    };
  }
  var d3_nsPrefix = {
    svg: "http://www.w3.org/2000/svg",
    xhtml: "http://www.w3.org/1999/xhtml",
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/"
  };
  d3.ns = {
    prefix: d3_nsPrefix,
    qualify: function(name) {
      var i = name.indexOf(":"), prefix = name;
      if (i >= 0) {
        prefix = name.substring(0, i);
        name = name.substring(i + 1);
      }
      return d3_nsPrefix.hasOwnProperty(prefix) ? {
        space: d3_nsPrefix[prefix],
        local: name
      } : name;
    }
  };
  d3_selectionPrototype.attr = function(name, value) {
    if (arguments.length < 2) {
      if (typeof name === "string") {
        var node = this.node();
        name = d3.ns.qualify(name);
        return name.local ? node.getAttributeNS(name.space, name.local) : node.getAttribute(name);
      }
      for (value in name) this.each(d3_selection_attr(value, name[value]));
      return this;
    }
    return this.each(d3_selection_attr(name, value));
  };
  function d3_selection_attr(name, value) {
    name = d3.ns.qualify(name);
    function attrNull() {
      this.removeAttribute(name);
    }
    function attrNullNS() {
      this.removeAttributeNS(name.space, name.local);
    }
    function attrConstant() {
      this.setAttribute(name, value);
    }
    function attrConstantNS() {
      this.setAttributeNS(name.space, name.local, value);
    }
    function attrFunction() {
      var x = value.apply(this, arguments);
      if (x == null) this.removeAttribute(name); else this.setAttribute(name, x);
    }
    function attrFunctionNS() {
      var x = value.apply(this, arguments);
      if (x == null) this.removeAttributeNS(name.space, name.local); else this.setAttributeNS(name.space, name.local, x);
    }
    return value == null ? name.local ? attrNullNS : attrNull : typeof value === "function" ? name.local ? attrFunctionNS : attrFunction : name.local ? attrConstantNS : attrConstant;
  }
  function d3_collapse(s) {
    return s.trim().replace(/\s+/g, " ");
  }
  d3.requote = function(s) {
    return s.replace(d3_requote_re, "\\$&");
  };
  var d3_requote_re = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;
  d3_selectionPrototype.classed = function(name, value) {
    if (arguments.length < 2) {
      if (typeof name === "string") {
        var node = this.node(), n = (name = name.trim().split(/^|\s+/g)).length, i = -1;
        if (value = node.classList) {
          while (++i < n) if (!value.contains(name[i])) return false;
        } else {
          value = node.getAttribute("class");
          while (++i < n) if (!d3_selection_classedRe(name[i]).test(value)) return false;
        }
        return true;
      }
      for (value in name) this.each(d3_selection_classed(value, name[value]));
      return this;
    }
    return this.each(d3_selection_classed(name, value));
  };
  function d3_selection_classedRe(name) {
    return new RegExp("(?:^|\\s+)" + d3.requote(name) + "(?:\\s+|$)", "g");
  }
  function d3_selection_classed(name, value) {
    name = name.trim().split(/\s+/).map(d3_selection_classedName);
    var n = name.length;
    function classedConstant() {
      var i = -1;
      while (++i < n) name[i](this, value);
    }
    function classedFunction() {
      var i = -1, x = value.apply(this, arguments);
      while (++i < n) name[i](this, x);
    }
    return typeof value === "function" ? classedFunction : classedConstant;
  }
  function d3_selection_classedName(name) {
    var re = d3_selection_classedRe(name);
    return function(node, value) {
      if (c = node.classList) return value ? c.add(name) : c.remove(name);
      var c = node.getAttribute("class") || "";
      if (value) {
        re.lastIndex = 0;
        if (!re.test(c)) node.setAttribute("class", d3_collapse(c + " " + name));
      } else {
        node.setAttribute("class", d3_collapse(c.replace(re, " ")));
      }
    };
  }
  d3_selectionPrototype.style = function(name, value, priority) {
    var n = arguments.length;
    if (n < 3) {
      if (typeof name !== "string") {
        if (n < 2) value = "";
        for (priority in name) this.each(d3_selection_style(priority, name[priority], value));
        return this;
      }
      if (n < 2) return d3_window.getComputedStyle(this.node(), null).getPropertyValue(name);
      priority = "";
    }
    return this.each(d3_selection_style(name, value, priority));
  };
  function d3_selection_style(name, value, priority) {
    function styleNull() {
      this.style.removeProperty(name);
    }
    function styleConstant() {
      this.style.setProperty(name, value, priority);
    }
    function styleFunction() {
      var x = value.apply(this, arguments);
      if (x == null) this.style.removeProperty(name); else this.style.setProperty(name, x, priority);
    }
    return value == null ? styleNull : typeof value === "function" ? styleFunction : styleConstant;
  }
  d3_selectionPrototype.property = function(name, value) {
    if (arguments.length < 2) {
      if (typeof name === "string") return this.node()[name];
      for (value in name) this.each(d3_selection_property(value, name[value]));
      return this;
    }
    return this.each(d3_selection_property(name, value));
  };
  function d3_selection_property(name, value) {
    function propertyNull() {
      delete this[name];
    }
    function propertyConstant() {
      this[name] = value;
    }
    function propertyFunction() {
      var x = value.apply(this, arguments);
      if (x == null) delete this[name]; else this[name] = x;
    }
    return value == null ? propertyNull : typeof value === "function" ? propertyFunction : propertyConstant;
  }
  d3_selectionPrototype.text = function(value) {
    return arguments.length ? this.each(typeof value === "function" ? function() {
      var v = value.apply(this, arguments);
      this.textContent = v == null ? "" : v;
    } : value == null ? function() {
      this.textContent = "";
    } : function() {
      this.textContent = value;
    }) : this.node().textContent;
  };
  d3_selectionPrototype.html = function(value) {
    return arguments.length ? this.each(typeof value === "function" ? function() {
      var v = value.apply(this, arguments);
      this.innerHTML = v == null ? "" : v;
    } : value == null ? function() {
      this.innerHTML = "";
    } : function() {
      this.innerHTML = value;
    }) : this.node().innerHTML;
  };
  d3_selectionPrototype.append = function(name) {
    name = d3.ns.qualify(name);
    function append() {
      return this.appendChild(d3_document.createElementNS(this.namespaceURI, name));
    }
    function appendNS() {
      return this.appendChild(d3_document.createElementNS(name.space, name.local));
    }
    return this.select(name.local ? appendNS : append);
  };
  d3_selectionPrototype.insert = function(name, before) {
    name = d3.ns.qualify(name);
    if (typeof before !== "function") before = d3_selection_selector(before);
    function insert(d, i) {
      return this.insertBefore(d3_document.createElementNS(this.namespaceURI, name), before.call(this, d, i));
    }
    function insertNS(d, i) {
      return this.insertBefore(d3_document.createElementNS(name.space, name.local), before.call(this, d, i));
    }
    return this.select(name.local ? insertNS : insert);
  };
  d3_selectionPrototype.remove = function() {
    return this.each(function() {
      var parent = this.parentNode;
      if (parent) parent.removeChild(this);
    });
  };
  d3_selectionPrototype.data = function(value, key) {
    var i = -1, n = this.length, group, node;
    if (!arguments.length) {
      value = new Array(n = (group = this[0]).length);
      while (++i < n) {
        if (node = group[i]) {
          value[i] = node.__data__;
        }
      }
      return value;
    }
    function bind(group, groupData) {
      var i, n = group.length, m = groupData.length, n0 = Math.min(n, m), updateNodes = new Array(m), enterNodes = new Array(m), exitNodes = new Array(n), node, nodeData;
      if (key) {
        var nodeByKeyValue = new d3_Map(), dataByKeyValue = new d3_Map(), keyValues = [], keyValue;
        for (i = -1; ++i < n; ) {
          keyValue = key.call(node = group[i], node.__data__, i);
          if (nodeByKeyValue.has(keyValue)) {
            exitNodes[i] = node;
          } else {
            nodeByKeyValue.set(keyValue, node);
          }
          keyValues.push(keyValue);
        }
        for (i = -1; ++i < m; ) {
          keyValue = key.call(groupData, nodeData = groupData[i], i);
          if (node = nodeByKeyValue.get(keyValue)) {
            updateNodes[i] = node;
            node.__data__ = nodeData;
          } else if (!dataByKeyValue.has(keyValue)) {
            enterNodes[i] = d3_selection_dataNode(nodeData);
          }
          dataByKeyValue.set(keyValue, nodeData);
          nodeByKeyValue.remove(keyValue);
        }
        for (i = -1; ++i < n; ) {
          if (nodeByKeyValue.has(keyValues[i])) {
            exitNodes[i] = group[i];
          }
        }
      } else {
        for (i = -1; ++i < n0; ) {
          node = group[i];
          nodeData = groupData[i];
          if (node) {
            node.__data__ = nodeData;
            updateNodes[i] = node;
          } else {
            enterNodes[i] = d3_selection_dataNode(nodeData);
          }
        }
        for (;i < m; ++i) {
          enterNodes[i] = d3_selection_dataNode(groupData[i]);
        }
        for (;i < n; ++i) {
          exitNodes[i] = group[i];
        }
      }
      enterNodes.update = updateNodes;
      enterNodes.parentNode = updateNodes.parentNode = exitNodes.parentNode = group.parentNode;
      enter.push(enterNodes);
      update.push(updateNodes);
      exit.push(exitNodes);
    }
    var enter = d3_selection_enter([]), update = d3_selection([]), exit = d3_selection([]);
    if (typeof value === "function") {
      while (++i < n) {
        bind(group = this[i], value.call(group, group.parentNode.__data__, i));
      }
    } else {
      while (++i < n) {
        bind(group = this[i], value);
      }
    }
    update.enter = function() {
      return enter;
    };
    update.exit = function() {
      return exit;
    };
    return update;
  };
  function d3_selection_dataNode(data) {
    return {
      __data__: data
    };
  }
  d3_selectionPrototype.datum = function(value) {
    return arguments.length ? this.property("__data__", value) : this.property("__data__");
  };
  d3_selectionPrototype.filter = function(filter) {
    var subgroups = [], subgroup, group, node;
    if (typeof filter !== "function") filter = d3_selection_filter(filter);
    for (var j = 0, m = this.length; j < m; j++) {
      subgroups.push(subgroup = []);
      subgroup.parentNode = (group = this[j]).parentNode;
      for (var i = 0, n = group.length; i < n; i++) {
        if ((node = group[i]) && filter.call(node, node.__data__, i)) {
          subgroup.push(node);
        }
      }
    }
    return d3_selection(subgroups);
  };
  function d3_selection_filter(selector) {
    return function() {
      return d3_selectMatches(this, selector);
    };
  }
  d3_selectionPrototype.order = function() {
    for (var j = -1, m = this.length; ++j < m; ) {
      for (var group = this[j], i = group.length - 1, next = group[i], node; --i >= 0; ) {
        if (node = group[i]) {
          if (next && next !== node.nextSibling) next.parentNode.insertBefore(node, next);
          next = node;
        }
      }
    }
    return this;
  };
  d3_selectionPrototype.sort = function(comparator) {
    comparator = d3_selection_sortComparator.apply(this, arguments);
    for (var j = -1, m = this.length; ++j < m; ) this[j].sort(comparator);
    return this.order();
  };
  function d3_selection_sortComparator(comparator) {
    if (!arguments.length) comparator = d3.ascending;
    return function(a, b) {
      return !a - !b || comparator(a.__data__, b.__data__);
    };
  }
  function d3_noop() {}
  d3_selectionPrototype.on = function(type, listener, capture) {
    var n = arguments.length;
    if (n < 3) {
      if (typeof type !== "string") {
        if (n < 2) listener = false;
        for (capture in type) this.each(d3_selection_on(capture, type[capture], listener));
        return this;
      }
      if (n < 2) return (n = this.node()["__on" + type]) && n._;
      capture = false;
    }
    return this.each(d3_selection_on(type, listener, capture));
  };
  function d3_selection_on(type, listener, capture) {
    var name = "__on" + type, i = type.indexOf("."), wrap = d3_selection_onListener;
    if (i > 0) type = type.substring(0, i);
    var filter = d3_selection_onFilters.get(type);
    if (filter) type = filter, wrap = d3_selection_onFilter;
    function onRemove() {
      var l = this[name];
      if (l) {
        this.removeEventListener(type, l, l.$);
        delete this[name];
      }
    }
    function onAdd() {
      var l = wrap(listener, d3_array(arguments));
      onRemove.call(this);
      this.addEventListener(type, this[name] = l, l.$ = capture);
      l._ = listener;
    }
    function removeAll() {
      var re = new RegExp("^__on([^.]+)" + d3.requote(type) + "$"), match;
      for (var name in this) {
        if (match = name.match(re)) {
          var l = this[name];
          this.removeEventListener(match[1], l, l.$);
          delete this[name];
        }
      }
    }
    return i ? listener ? onAdd : onRemove : listener ? d3_noop : removeAll;
  }
  var d3_selection_onFilters = d3.map({
    mouseenter: "mouseover",
    mouseleave: "mouseout"
  });
  d3_selection_onFilters.forEach(function(k) {
    if ("on" + k in d3_document) d3_selection_onFilters.remove(k);
  });
  function d3_selection_onListener(listener, argumentz) {
    return function(e) {
      var o = d3.event;
      d3.event = e;
      argumentz[0] = this.__data__;
      try {
        listener.apply(this, argumentz);
      } finally {
        d3.event = o;
      }
    };
  }
  function d3_selection_onFilter(listener, argumentz) {
    var l = d3_selection_onListener(listener, argumentz);
    return function(e) {
      var target = this, related = e.relatedTarget;
      if (!related || related !== target && !(related.compareDocumentPosition(target) & 8)) {
        l.call(target, e);
      }
    };
  }
  d3_selectionPrototype.each = function(callback) {
    return d3_selection_each(this, function(node, i, j) {
      callback.call(node, node.__data__, i, j);
    });
  };
  function d3_selection_each(groups, callback) {
    for (var j = 0, m = groups.length; j < m; j++) {
      for (var group = groups[j], i = 0, n = group.length, node; i < n; i++) {
        if (node = group[i]) callback(node, i, j);
      }
    }
    return groups;
  }
  d3_selectionPrototype.call = function(callback) {
    var args = d3_array(arguments);
    callback.apply(args[0] = this, args);
    return this;
  };
  d3_selectionPrototype.empty = function() {
    return !this.node();
  };
  d3_selectionPrototype.node = function() {
    for (var j = 0, m = this.length; j < m; j++) {
      for (var group = this[j], i = 0, n = group.length; i < n; i++) {
        var node = group[i];
        if (node) return node;
      }
    }
    return null;
  };
  function d3_selection_enter(selection) {
    d3_arraySubclass(selection, d3_selection_enterPrototype);
    return selection;
  }
  var d3_selection_enterPrototype = [];
  d3.selection.enter = d3_selection_enter;
  d3.selection.enter.prototype = d3_selection_enterPrototype;
  d3_selection_enterPrototype.append = d3_selectionPrototype.append;
  d3_selection_enterPrototype.insert = d3_selectionPrototype.insert;
  d3_selection_enterPrototype.empty = d3_selectionPrototype.empty;
  d3_selection_enterPrototype.node = d3_selectionPrototype.node;
  d3_selection_enterPrototype.select = function(selector) {
    var subgroups = [], subgroup, subnode, upgroup, group, node;
    for (var j = -1, m = this.length; ++j < m; ) {
      upgroup = (group = this[j]).update;
      subgroups.push(subgroup = []);
      subgroup.parentNode = group.parentNode;
      for (var i = -1, n = group.length; ++i < n; ) {
        if (node = group[i]) {
          subgroup.push(upgroup[i] = subnode = selector.call(group.parentNode, node.__data__, i));
          subnode.__data__ = node.__data__;
        } else {
          subgroup.push(null);
        }
      }
    }
    return d3_selection(subgroups);
  };
  d3_selectionPrototype.transition = function() {
    var id = d3_transitionInheritId || ++d3_transitionId, subgroups = [], subgroup, node, transition = Object.create(d3_transitionInherit);
    transition.time = Date.now();
    for (var j = -1, m = this.length; ++j < m; ) {
      subgroups.push(subgroup = []);
      for (var group = this[j], i = -1, n = group.length; ++i < n; ) {
        if (node = group[i]) d3_transitionNode(node, i, id, transition);
        subgroup.push(node);
      }
    }
    return d3_transition(subgroups, id);
  };
  var d3_selectionRoot = d3_selection([ [ d3_document ] ]);
  d3_selectionRoot[0].parentNode = d3_selectRoot;
  d3.select = function(selector) {
    return typeof selector === "string" ? d3_selectionRoot.select(selector) : d3_selection([ [ selector ] ]);
  };
  d3.selectAll = function(selector) {
    return typeof selector === "string" ? d3_selectionRoot.selectAll(selector) : d3_selection([ d3_array(selector) ]);
  };
  d3.behavior.zoom = function() {
    var translate = [ 0, 0 ], translate0, scale = 1, scale0, scaleExtent = d3_behavior_zoomInfinity, event = d3_eventDispatch(zoom, "zoom"), x0, x1, y0, y1, touchtime;
    function zoom() {
      this.on("mousedown.zoom", mousedown).on("mousemove.zoom", mousemove).on(d3_behavior_zoomWheel + ".zoom", mousewheel).on("dblclick.zoom", dblclick).on("touchstart.zoom", touchstart).on("touchmove.zoom", touchmove).on("touchend.zoom", touchstart);
    }
    zoom.translate = function(x) {
      if (!arguments.length) return translate;
      translate = x.map(Number);
      rescale();
      return zoom;
    };
    zoom.scale = function(x) {
      if (!arguments.length) return scale;
      scale = +x;
      rescale();
      return zoom;
    };
    zoom.scaleExtent = function(x) {
      if (!arguments.length) return scaleExtent;
      scaleExtent = x == null ? d3_behavior_zoomInfinity : x.map(Number);
      return zoom;
    };
    zoom.x = function(z) {
      if (!arguments.length) return x1;
      x1 = z;
      x0 = z.copy();
      translate = [ 0, 0 ];
      scale = 1;
      return zoom;
    };
    zoom.y = function(z) {
      if (!arguments.length) return y1;
      y1 = z;
      y0 = z.copy();
      translate = [ 0, 0 ];
      scale = 1;
      return zoom;
    };
    function location(p) {
      return [ (p[0] - translate[0]) / scale, (p[1] - translate[1]) / scale ];
    }
    function point(l) {
      return [ l[0] * scale + translate[0], l[1] * scale + translate[1] ];
    }
    function scaleTo(s) {
      scale = Math.max(scaleExtent[0], Math.min(scaleExtent[1], s));
    }
    function translateTo(p, l) {
      l = point(l);
      translate[0] += p[0] - l[0];
      translate[1] += p[1] - l[1];
    }
    function rescale() {
      if (x1) x1.domain(x0.range().map(function(x) {
        return (x - translate[0]) / scale;
      }).map(x0.invert));
      if (y1) y1.domain(y0.range().map(function(y) {
        return (y - translate[1]) / scale;
      }).map(y0.invert));
    }
    function dispatch(event) {
      rescale();
      d3.event.preventDefault();
      event({
        type: "zoom",
        scale: scale,
        translate: translate
      });
    }
    function mousedown() {
      var target = this, event_ = event.of(target, arguments), eventTarget = d3.event.target, moved = 0, w = d3.select(d3_window).on("mousemove.zoom", mousemove).on("mouseup.zoom", mouseup), l = location(d3.mouse(target));
      d3_window.focus();
      d3_eventCancel();
      function mousemove() {
        moved = 1;
        translateTo(d3.mouse(target), l);
        dispatch(event_);
      }
      function mouseup() {
        if (moved) d3_eventCancel();
        w.on("mousemove.zoom", null).on("mouseup.zoom", null);
        if (moved && d3.event.target === eventTarget) d3_eventSuppress(w, "click.zoom");
      }
    }
    function mousewheel() {
      if (!translate0) translate0 = location(d3.mouse(this));
      scaleTo(Math.pow(2, d3_behavior_zoomDelta() * .002) * scale);
      translateTo(d3.mouse(this), translate0);
      dispatch(event.of(this, arguments));
    }
    function mousemove() {
      translate0 = null;
    }
    function dblclick() {
      var p = d3.mouse(this), l = location(p), k = Math.log(scale) / Math.LN2;
      scaleTo(Math.pow(2, d3.event.shiftKey ? Math.ceil(k) - 1 : Math.floor(k) + 1));
      translateTo(p, l);
      dispatch(event.of(this, arguments));
    }
    function touchstart() {
      var touches = d3.touches(this), now = Date.now();
      scale0 = scale;
      translate0 = {};
      touches.forEach(function(t) {
        translate0[t.identifier] = location(t);
      });
      d3_eventCancel();
      if (touches.length === 1) {
        if (now - touchtime < 500) {
          var p = touches[0], l = location(touches[0]);
          scaleTo(scale * 2);
          translateTo(p, l);
          dispatch(event.of(this, arguments));
        }
        touchtime = now;
      }
    }
    function touchmove() {
      var touches = d3.touches(this), p0 = touches[0], l0 = translate0[p0.identifier];
      if (p1 = touches[1]) {
        var p1, l1 = translate0[p1.identifier];
        p0 = [ (p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2 ];
        l0 = [ (l0[0] + l1[0]) / 2, (l0[1] + l1[1]) / 2 ];
        scaleTo(d3.event.scale * scale0);
      }
      translateTo(p0, l0);
      touchtime = null;
      dispatch(event.of(this, arguments));
    }
    return d3.rebind(zoom, event, "on");
  };
  var d3_behavior_zoomInfinity = [ 0, Infinity ];
  var d3_behavior_zoomDelta, d3_behavior_zoomWheel = "onwheel" in d3_document ? (d3_behavior_zoomDelta = function() {
    return -d3.event.deltaY * (d3.event.deltaMode ? 120 : 1);
  }, "wheel") : "onmousewheel" in d3_document ? (d3_behavior_zoomDelta = function() {
    return d3.event.wheelDelta;
  }, "mousewheel") : (d3_behavior_zoomDelta = function() {
    return -d3.event.detail;
  }, "MozMousePixelScroll");
  function d3_Color() {}
  d3_Color.prototype.toString = function() {
    return this.rgb() + "";
  };
  d3.hsl = function(h, s, l) {
    return arguments.length === 1 ? h instanceof d3_Hsl ? d3_hsl(h.h, h.s, h.l) : d3_rgb_parse("" + h, d3_rgb_hsl, d3_hsl) : d3_hsl(+h, +s, +l);
  };
  function d3_hsl(h, s, l) {
    return new d3_Hsl(h, s, l);
  }
  function d3_Hsl(h, s, l) {
    this.h = h;
    this.s = s;
    this.l = l;
  }
  var d3_hslPrototype = d3_Hsl.prototype = new d3_Color();
  d3_hslPrototype.brighter = function(k) {
    k = Math.pow(.7, arguments.length ? k : 1);
    return d3_hsl(this.h, this.s, this.l / k);
  };
  d3_hslPrototype.darker = function(k) {
    k = Math.pow(.7, arguments.length ? k : 1);
    return d3_hsl(this.h, this.s, k * this.l);
  };
  d3_hslPrototype.rgb = function() {
    return d3_hsl_rgb(this.h, this.s, this.l);
  };
  function d3_hsl_rgb(h, s, l) {
    var m1, m2;
    h = h % 360;
    if (h < 0) h += 360;
    s = s < 0 ? 0 : s > 1 ? 1 : s;
    l = l < 0 ? 0 : l > 1 ? 1 : l;
    m2 = l <= .5 ? l * (1 + s) : l + s - l * s;
    m1 = 2 * l - m2;
    function v(h) {
      if (h > 360) h -= 360; else if (h < 0) h += 360;
      if (h < 60) return m1 + (m2 - m1) * h / 60;
      if (h < 180) return m2;
      if (h < 240) return m1 + (m2 - m1) * (240 - h) / 60;
      return m1;
    }
    function vv(h) {
      return Math.round(v(h) * 255);
    }
    return d3_rgb(vv(h + 120), vv(h), vv(h - 120));
  }
  var π = Math.PI, ε = 1e-6, d3_radians = π / 180, d3_degrees = 180 / π;
  function d3_sgn(x) {
    return x > 0 ? 1 : x < 0 ? -1 : 0;
  }
  function d3_acos(x) {
    return Math.acos(Math.max(-1, Math.min(1, x)));
  }
  function d3_asin(x) {
    return x > 1 ? π / 2 : x < -1 ? -π / 2 : Math.asin(x);
  }
  function d3_sinh(x) {
    return (Math.exp(x) - Math.exp(-x)) / 2;
  }
  function d3_cosh(x) {
    return (Math.exp(x) + Math.exp(-x)) / 2;
  }
  function d3_haversin(x) {
    return (x = Math.sin(x / 2)) * x;
  }
  d3.hcl = function(h, c, l) {
    return arguments.length === 1 ? h instanceof d3_Hcl ? d3_hcl(h.h, h.c, h.l) : h instanceof d3_Lab ? d3_lab_hcl(h.l, h.a, h.b) : d3_lab_hcl((h = d3_rgb_lab((h = d3.rgb(h)).r, h.g, h.b)).l, h.a, h.b) : d3_hcl(+h, +c, +l);
  };
  function d3_hcl(h, c, l) {
    return new d3_Hcl(h, c, l);
  }
  function d3_Hcl(h, c, l) {
    this.h = h;
    this.c = c;
    this.l = l;
  }
  var d3_hclPrototype = d3_Hcl.prototype = new d3_Color();
  d3_hclPrototype.brighter = function(k) {
    return d3_hcl(this.h, this.c, Math.min(100, this.l + d3_lab_K * (arguments.length ? k : 1)));
  };
  d3_hclPrototype.darker = function(k) {
    return d3_hcl(this.h, this.c, Math.max(0, this.l - d3_lab_K * (arguments.length ? k : 1)));
  };
  d3_hclPrototype.rgb = function() {
    return d3_hcl_lab(this.h, this.c, this.l).rgb();
  };
  function d3_hcl_lab(h, c, l) {
    return d3_lab(l, Math.cos(h *= d3_radians) * c, Math.sin(h) * c);
  }
  d3.lab = function(l, a, b) {
    return arguments.length === 1 ? l instanceof d3_Lab ? d3_lab(l.l, l.a, l.b) : l instanceof d3_Hcl ? d3_hcl_lab(l.l, l.c, l.h) : d3_rgb_lab((l = d3.rgb(l)).r, l.g, l.b) : d3_lab(+l, +a, +b);
  };
  function d3_lab(l, a, b) {
    return new d3_Lab(l, a, b);
  }
  function d3_Lab(l, a, b) {
    this.l = l;
    this.a = a;
    this.b = b;
  }
  var d3_lab_K = 18;
  var d3_lab_X = .95047, d3_lab_Y = 1, d3_lab_Z = 1.08883;
  var d3_labPrototype = d3_Lab.prototype = new d3_Color();
  d3_labPrototype.brighter = function(k) {
    return d3_lab(Math.min(100, this.l + d3_lab_K * (arguments.length ? k : 1)), this.a, this.b);
  };
  d3_labPrototype.darker = function(k) {
    return d3_lab(Math.max(0, this.l - d3_lab_K * (arguments.length ? k : 1)), this.a, this.b);
  };
  d3_labPrototype.rgb = function() {
    return d3_lab_rgb(this.l, this.a, this.b);
  };
  function d3_lab_rgb(l, a, b) {
    var y = (l + 16) / 116, x = y + a / 500, z = y - b / 200;
    x = d3_lab_xyz(x) * d3_lab_X;
    y = d3_lab_xyz(y) * d3_lab_Y;
    z = d3_lab_xyz(z) * d3_lab_Z;
    return d3_rgb(d3_xyz_rgb(3.2404542 * x - 1.5371385 * y - .4985314 * z), d3_xyz_rgb(-.969266 * x + 1.8760108 * y + .041556 * z), d3_xyz_rgb(.0556434 * x - .2040259 * y + 1.0572252 * z));
  }
  function d3_lab_hcl(l, a, b) {
    return d3_hcl(Math.atan2(b, a) * d3_degrees, Math.sqrt(a * a + b * b), l);
  }
  function d3_lab_xyz(x) {
    return x > .206893034 ? x * x * x : (x - 4 / 29) / 7.787037;
  }
  function d3_xyz_lab(x) {
    return x > .008856 ? Math.pow(x, 1 / 3) : 7.787037 * x + 4 / 29;
  }
  function d3_xyz_rgb(r) {
    return Math.round(255 * (r <= .00304 ? 12.92 * r : 1.055 * Math.pow(r, 1 / 2.4) - .055));
  }
  d3.rgb = function(r, g, b) {
    return arguments.length === 1 ? r instanceof d3_Rgb ? d3_rgb(r.r, r.g, r.b) : d3_rgb_parse("" + r, d3_rgb, d3_hsl_rgb) : d3_rgb(~~r, ~~g, ~~b);
  };
  function d3_rgb(r, g, b) {
    return new d3_Rgb(r, g, b);
  }
  function d3_Rgb(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }
  var d3_rgbPrototype = d3_Rgb.prototype = new d3_Color();
  d3_rgbPrototype.brighter = function(k) {
    k = Math.pow(.7, arguments.length ? k : 1);
    var r = this.r, g = this.g, b = this.b, i = 30;
    if (!r && !g && !b) return d3_rgb(i, i, i);
    if (r && r < i) r = i;
    if (g && g < i) g = i;
    if (b && b < i) b = i;
    return d3_rgb(Math.min(255, Math.floor(r / k)), Math.min(255, Math.floor(g / k)), Math.min(255, Math.floor(b / k)));
  };
  d3_rgbPrototype.darker = function(k) {
    k = Math.pow(.7, arguments.length ? k : 1);
    return d3_rgb(Math.floor(k * this.r), Math.floor(k * this.g), Math.floor(k * this.b));
  };
  d3_rgbPrototype.hsl = function() {
    return d3_rgb_hsl(this.r, this.g, this.b);
  };
  d3_rgbPrototype.toString = function() {
    return "#" + d3_rgb_hex(this.r) + d3_rgb_hex(this.g) + d3_rgb_hex(this.b);
  };
  function d3_rgb_hex(v) {
    return v < 16 ? "0" + Math.max(0, v).toString(16) : Math.min(255, v).toString(16);
  }
  function d3_rgb_parse(format, rgb, hsl) {
    var r = 0, g = 0, b = 0, m1, m2, name;
    m1 = /([a-z]+)\((.*)\)/i.exec(format);
    if (m1) {
      m2 = m1[2].split(",");
      switch (m1[1]) {
       case "hsl":
        {
          return hsl(parseFloat(m2[0]), parseFloat(m2[1]) / 100, parseFloat(m2[2]) / 100);
        }

       case "rgb":
        {
          return rgb(d3_rgb_parseNumber(m2[0]), d3_rgb_parseNumber(m2[1]), d3_rgb_parseNumber(m2[2]));
        }
      }
    }
    if (name = d3_rgb_names.get(format)) return rgb(name.r, name.g, name.b);
    if (format != null && format.charAt(0) === "#") {
      if (format.length === 4) {
        r = format.charAt(1);
        r += r;
        g = format.charAt(2);
        g += g;
        b = format.charAt(3);
        b += b;
      } else if (format.length === 7) {
        r = format.substring(1, 3);
        g = format.substring(3, 5);
        b = format.substring(5, 7);
      }
      r = parseInt(r, 16);
      g = parseInt(g, 16);
      b = parseInt(b, 16);
    }
    return rgb(r, g, b);
  }
  function d3_rgb_hsl(r, g, b) {
    var min = Math.min(r /= 255, g /= 255, b /= 255), max = Math.max(r, g, b), d = max - min, h, s, l = (max + min) / 2;
    if (d) {
      s = l < .5 ? d / (max + min) : d / (2 - max - min);
      if (r == max) h = (g - b) / d + (g < b ? 6 : 0); else if (g == max) h = (b - r) / d + 2; else h = (r - g) / d + 4;
      h *= 60;
    } else {
      s = h = 0;
    }
    return d3_hsl(h, s, l);
  }
  function d3_rgb_lab(r, g, b) {
    r = d3_rgb_xyz(r);
    g = d3_rgb_xyz(g);
    b = d3_rgb_xyz(b);
    var x = d3_xyz_lab((.4124564 * r + .3575761 * g + .1804375 * b) / d3_lab_X), y = d3_xyz_lab((.2126729 * r + .7151522 * g + .072175 * b) / d3_lab_Y), z = d3_xyz_lab((.0193339 * r + .119192 * g + .9503041 * b) / d3_lab_Z);
    return d3_lab(116 * y - 16, 500 * (x - y), 200 * (y - z));
  }
  function d3_rgb_xyz(r) {
    return (r /= 255) <= .04045 ? r / 12.92 : Math.pow((r + .055) / 1.055, 2.4);
  }
  function d3_rgb_parseNumber(c) {
    var f = parseFloat(c);
    return c.charAt(c.length - 1) === "%" ? Math.round(f * 2.55) : f;
  }
  var d3_rgb_names = d3.map({
    aliceblue: "#f0f8ff",
    antiquewhite: "#faebd7",
    aqua: "#00ffff",
    aquamarine: "#7fffd4",
    azure: "#f0ffff",
    beige: "#f5f5dc",
    bisque: "#ffe4c4",
    black: "#000000",
    blanchedalmond: "#ffebcd",
    blue: "#0000ff",
    blueviolet: "#8a2be2",
    brown: "#a52a2a",
    burlywood: "#deb887",
    cadetblue: "#5f9ea0",
    chartreuse: "#7fff00",
    chocolate: "#d2691e",
    coral: "#ff7f50",
    cornflowerblue: "#6495ed",
    cornsilk: "#fff8dc",
    crimson: "#dc143c",
    cyan: "#00ffff",
    darkblue: "#00008b",
    darkcyan: "#008b8b",
    darkgoldenrod: "#b8860b",
    darkgray: "#a9a9a9",
    darkgreen: "#006400",
    darkgrey: "#a9a9a9",
    darkkhaki: "#bdb76b",
    darkmagenta: "#8b008b",
    darkolivegreen: "#556b2f",
    darkorange: "#ff8c00",
    darkorchid: "#9932cc",
    darkred: "#8b0000",
    darksalmon: "#e9967a",
    darkseagreen: "#8fbc8f",
    darkslateblue: "#483d8b",
    darkslategray: "#2f4f4f",
    darkslategrey: "#2f4f4f",
    darkturquoise: "#00ced1",
    darkviolet: "#9400d3",
    deeppink: "#ff1493",
    deepskyblue: "#00bfff",
    dimgray: "#696969",
    dimgrey: "#696969",
    dodgerblue: "#1e90ff",
    firebrick: "#b22222",
    floralwhite: "#fffaf0",
    forestgreen: "#228b22",
    fuchsia: "#ff00ff",
    gainsboro: "#dcdcdc",
    ghostwhite: "#f8f8ff",
    gold: "#ffd700",
    goldenrod: "#daa520",
    gray: "#808080",
    green: "#008000",
    greenyellow: "#adff2f",
    grey: "#808080",
    honeydew: "#f0fff0",
    hotpink: "#ff69b4",
    indianred: "#cd5c5c",
    indigo: "#4b0082",
    ivory: "#fffff0",
    khaki: "#f0e68c",
    lavender: "#e6e6fa",
    lavenderblush: "#fff0f5",
    lawngreen: "#7cfc00",
    lemonchiffon: "#fffacd",
    lightblue: "#add8e6",
    lightcoral: "#f08080",
    lightcyan: "#e0ffff",
    lightgoldenrodyellow: "#fafad2",
    lightgray: "#d3d3d3",
    lightgreen: "#90ee90",
    lightgrey: "#d3d3d3",
    lightpink: "#ffb6c1",
    lightsalmon: "#ffa07a",
    lightseagreen: "#20b2aa",
    lightskyblue: "#87cefa",
    lightslategray: "#778899",
    lightslategrey: "#778899",
    lightsteelblue: "#b0c4de",
    lightyellow: "#ffffe0",
    lime: "#00ff00",
    limegreen: "#32cd32",
    linen: "#faf0e6",
    magenta: "#ff00ff",
    maroon: "#800000",
    mediumaquamarine: "#66cdaa",
    mediumblue: "#0000cd",
    mediumorchid: "#ba55d3",
    mediumpurple: "#9370db",
    mediumseagreen: "#3cb371",
    mediumslateblue: "#7b68ee",
    mediumspringgreen: "#00fa9a",
    mediumturquoise: "#48d1cc",
    mediumvioletred: "#c71585",
    midnightblue: "#191970",
    mintcream: "#f5fffa",
    mistyrose: "#ffe4e1",
    moccasin: "#ffe4b5",
    navajowhite: "#ffdead",
    navy: "#000080",
    oldlace: "#fdf5e6",
    olive: "#808000",
    olivedrab: "#6b8e23",
    orange: "#ffa500",
    orangered: "#ff4500",
    orchid: "#da70d6",
    palegoldenrod: "#eee8aa",
    palegreen: "#98fb98",
    paleturquoise: "#afeeee",
    palevioletred: "#db7093",
    papayawhip: "#ffefd5",
    peachpuff: "#ffdab9",
    peru: "#cd853f",
    pink: "#ffc0cb",
    plum: "#dda0dd",
    powderblue: "#b0e0e6",
    purple: "#800080",
    red: "#ff0000",
    rosybrown: "#bc8f8f",
    royalblue: "#4169e1",
    saddlebrown: "#8b4513",
    salmon: "#fa8072",
    sandybrown: "#f4a460",
    seagreen: "#2e8b57",
    seashell: "#fff5ee",
    sienna: "#a0522d",
    silver: "#c0c0c0",
    skyblue: "#87ceeb",
    slateblue: "#6a5acd",
    slategray: "#708090",
    slategrey: "#708090",
    snow: "#fffafa",
    springgreen: "#00ff7f",
    steelblue: "#4682b4",
    tan: "#d2b48c",
    teal: "#008080",
    thistle: "#d8bfd8",
    tomato: "#ff6347",
    turquoise: "#40e0d0",
    violet: "#ee82ee",
    wheat: "#f5deb3",
    white: "#ffffff",
    whitesmoke: "#f5f5f5",
    yellow: "#ffff00",
    yellowgreen: "#9acd32"
  });
  d3_rgb_names.forEach(function(key, value) {
    d3_rgb_names.set(key, d3_rgb_parse(value, d3_rgb, d3_hsl_rgb));
  });
  function d3_functor(v) {
    return typeof v === "function" ? v : function() {
      return v;
    };
  }
  d3.functor = d3_functor;
  function d3_identity(d) {
    return d;
  }
  d3.xhr = function(url, mimeType, callback) {
    var xhr = {}, dispatch = d3.dispatch("progress", "load", "error"), headers = {}, response = d3_identity, request = new (d3_window.XDomainRequest && /^(http(s)?:)?\/\//.test(url) ? XDomainRequest : XMLHttpRequest)();
    "onload" in request ? request.onload = request.onerror = respond : request.onreadystatechange = function() {
      request.readyState > 3 && respond();
    };
    function respond() {
      var s = request.status;
      !s && request.responseText || s >= 200 && s < 300 || s === 304 ? dispatch.load.call(xhr, response.call(xhr, request)) : dispatch.error.call(xhr, request);
    }
    request.onprogress = function(event) {
      var o = d3.event;
      d3.event = event;
      try {
        dispatch.progress.call(xhr, request);
      } finally {
        d3.event = o;
      }
    };
    xhr.header = function(name, value) {
      name = (name + "").toLowerCase();
      if (arguments.length < 2) return headers[name];
      if (value == null) delete headers[name]; else headers[name] = value + "";
      return xhr;
    };
    xhr.mimeType = function(value) {
      if (!arguments.length) return mimeType;
      mimeType = value == null ? null : value + "";
      return xhr;
    };
    xhr.response = function(value) {
      response = value;
      return xhr;
    };
    [ "get", "post" ].forEach(function(method) {
      xhr[method] = function() {
        return xhr.send.apply(xhr, [ method ].concat(d3_array(arguments)));
      };
    });
    xhr.send = function(method, data, callback) {
      if (arguments.length === 2 && typeof data === "function") callback = data, data = null;
      request.open(method, url, true);
      if (mimeType != null && !("accept" in headers)) headers["accept"] = mimeType + ",*/*";
      if (request.setRequestHeader) for (var name in headers) request.setRequestHeader(name, headers[name]);
      if (mimeType != null && request.overrideMimeType) request.overrideMimeType(mimeType);
      if (callback != null) xhr.on("error", callback).on("load", function(request) {
        callback(null, request);
      });
      request.send(data == null ? null : data);
      return xhr;
    };
    xhr.abort = function() {
      request.abort();
      return xhr;
    };
    d3.rebind(xhr, dispatch, "on");
    if (arguments.length === 2 && typeof mimeType === "function") callback = mimeType, 
    mimeType = null;
    return callback == null ? xhr : xhr.get(d3_xhr_fixCallback(callback));
  };
  function d3_xhr_fixCallback(callback) {
    return callback.length === 1 ? function(error, request) {
      callback(error == null ? request : null);
    } : callback;
  }
  function d3_dsv(delimiter, mimeType) {
    var reFormat = new RegExp('["' + delimiter + "\n]"), delimiterCode = delimiter.charCodeAt(0);
    function dsv(url, row, callback) {
      if (arguments.length < 3) callback = row, row = null;
      var xhr = d3.xhr(url, mimeType, callback);
      xhr.row = function(_) {
        return arguments.length ? xhr.response((row = _) == null ? response : typedResponse(_)) : row;
      };
      return xhr.row(row);
    }
    function response(request) {
      return dsv.parse(request.responseText);
    }
    function typedResponse(f) {
      return function(request) {
        return dsv.parse(request.responseText, f);
      };
    }
    dsv.parse = function(text, f) {
      var o;
      return dsv.parseRows(text, function(row, i) {
        if (o) return o(row, i - 1);
        var a = new Function("d", "return {" + row.map(function(name, i) {
          return JSON.stringify(name) + ": d[" + i + "]";
        }).join(",") + "}");
        o = f ? function(row, i) {
          return f(a(row), i);
        } : a;
      });
    };
    dsv.parseRows = function(text, f) {
      var EOL = {}, EOF = {}, rows = [], N = text.length, I = 0, n = 0, t, eol;
      function token() {
        if (I >= N) return EOF;
        if (eol) return eol = false, EOL;
        var j = I;
        if (text.charCodeAt(j) === 34) {
          var i = j;
          while (i++ < N) {
            if (text.charCodeAt(i) === 34) {
              if (text.charCodeAt(i + 1) !== 34) break;
              ++i;
            }
          }
          I = i + 2;
          var c = text.charCodeAt(i + 1);
          if (c === 13) {
            eol = true;
            if (text.charCodeAt(i + 2) === 10) ++I;
          } else if (c === 10) {
            eol = true;
          }
          return text.substring(j + 1, i).replace(/""/g, '"');
        }
        while (I < N) {
          var c = text.charCodeAt(I++), k = 1;
          if (c === 10) eol = true; else if (c === 13) {
            eol = true;
            if (text.charCodeAt(I) === 10) ++I, ++k;
          } else if (c !== delimiterCode) continue;
          return text.substring(j, I - k);
        }
        return text.substring(j);
      }
      while ((t = token()) !== EOF) {
        var a = [];
        while (t !== EOL && t !== EOF) {
          a.push(t);
          t = token();
        }
        if (f && !(a = f(a, n++))) continue;
        rows.push(a);
      }
      return rows;
    };
    dsv.format = function(rows) {
      if (Array.isArray(rows[0])) return dsv.formatRows(rows);
      var fieldSet = new d3_Set(), fields = [];
      rows.forEach(function(row) {
        for (var field in row) {
          if (!fieldSet.has(field)) {
            fields.push(fieldSet.add(field));
          }
        }
      });
      return [ fields.map(formatValue).join(delimiter) ].concat(rows.map(function(row) {
        return fields.map(function(field) {
          return formatValue(row[field]);
        }).join(delimiter);
      })).join("\n");
    };
    dsv.formatRows = function(rows) {
      return rows.map(formatRow).join("\n");
    };
    function formatRow(row) {
      return row.map(formatValue).join(delimiter);
    }
    function formatValue(text) {
      return reFormat.test(text) ? '"' + text.replace(/\"/g, '""') + '"' : text;
    }
    return dsv;
  }
  d3.csv = d3_dsv(",", "text/csv");
  d3.tsv = d3_dsv("	", "text/tab-separated-values");
  var d3_timer_id = 0, d3_timer_byId = {}, d3_timer_queue = null, d3_timer_interval, d3_timer_timeout;
  d3.timer = function(callback, delay, then) {
    if (arguments.length < 3) {
      if (arguments.length < 2) delay = 0; else if (!isFinite(delay)) return;
      then = Date.now();
    }
    var timer = d3_timer_byId[callback.id];
    if (timer && timer.callback === callback) {
      timer.then = then;
      timer.delay = delay;
    } else d3_timer_byId[callback.id = ++d3_timer_id] = d3_timer_queue = {
      callback: callback,
      then: then,
      delay: delay,
      next: d3_timer_queue
    };
    if (!d3_timer_interval) {
      d3_timer_timeout = clearTimeout(d3_timer_timeout);
      d3_timer_interval = 1;
      d3_timer_frame(d3_timer_step);
    }
  };
  function d3_timer_step() {
    var elapsed, now = Date.now(), t1 = d3_timer_queue;
    while (t1) {
      elapsed = now - t1.then;
      if (elapsed >= t1.delay) t1.flush = t1.callback(elapsed);
      t1 = t1.next;
    }
    var delay = d3_timer_flush() - now;
    if (delay > 24) {
      if (isFinite(delay)) {
        clearTimeout(d3_timer_timeout);
        d3_timer_timeout = setTimeout(d3_timer_step, delay);
      }
      d3_timer_interval = 0;
    } else {
      d3_timer_interval = 1;
      d3_timer_frame(d3_timer_step);
    }
  }
  d3.timer.flush = function() {
    var elapsed, now = Date.now(), t1 = d3_timer_queue;
    while (t1) {
      elapsed = now - t1.then;
      if (!t1.delay) t1.flush = t1.callback(elapsed);
      t1 = t1.next;
    }
    d3_timer_flush();
  };
  function d3_timer_flush() {
    var t0 = null, t1 = d3_timer_queue, then = Infinity;
    while (t1) {
      if (t1.flush) {
        delete d3_timer_byId[t1.callback.id];
        t1 = t0 ? t0.next = t1.next : d3_timer_queue = t1.next;
      } else {
        then = Math.min(then, t1.then + t1.delay);
        t1 = (t0 = t1).next;
      }
    }
    return then;
  }
  var d3_timer_frame = d3_window.requestAnimationFrame || d3_window.webkitRequestAnimationFrame || d3_window.mozRequestAnimationFrame || d3_window.oRequestAnimationFrame || d3_window.msRequestAnimationFrame || function(callback) {
    setTimeout(callback, 17);
  };
  var d3_format_decimalPoint = ".", d3_format_thousandsSeparator = ",", d3_format_grouping = [ 3, 3 ];
  var d3_formatPrefixes = [ "y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y" ].map(d3_formatPrefix);
  d3.formatPrefix = function(value, precision) {
    var i = 0;
    if (value) {
      if (value < 0) value *= -1;
      if (precision) value = d3.round(value, d3_format_precision(value, precision));
      i = 1 + Math.floor(1e-12 + Math.log(value) / Math.LN10);
      i = Math.max(-24, Math.min(24, Math.floor((i <= 0 ? i + 1 : i - 1) / 3) * 3));
    }
    return d3_formatPrefixes[8 + i / 3];
  };
  function d3_formatPrefix(d, i) {
    var k = Math.pow(10, Math.abs(8 - i) * 3);
    return {
      scale: i > 8 ? function(d) {
        return d / k;
      } : function(d) {
        return d * k;
      },
      symbol: d
    };
  }
  d3.round = function(x, n) {
    return n ? Math.round(x * (n = Math.pow(10, n))) / n : Math.round(x);
  };
  d3.format = function(specifier) {
    var match = d3_format_re.exec(specifier), fill = match[1] || " ", align = match[2] || ">", sign = match[3] || "", basePrefix = match[4] || "", zfill = match[5], width = +match[6], comma = match[7], precision = match[8], type = match[9], scale = 1, suffix = "", integer = false;
    if (precision) precision = +precision.substring(1);
    if (zfill || fill === "0" && align === "=") {
      zfill = fill = "0";
      align = "=";
      if (comma) width -= Math.floor((width - 1) / 4);
    }
    switch (type) {
     case "n":
      comma = true;
      type = "g";
      break;

     case "%":
      scale = 100;
      suffix = "%";
      type = "f";
      break;

     case "p":
      scale = 100;
      suffix = "%";
      type = "r";
      break;

     case "b":
     case "o":
     case "x":
     case "X":
      if (basePrefix) basePrefix = "0" + type.toLowerCase();

     case "c":
     case "d":
      integer = true;
      precision = 0;
      break;

     case "s":
      scale = -1;
      type = "r";
      break;
    }
    if (basePrefix === "#") basePrefix = "";
    if (type == "r" && !precision) type = "g";
    if (precision != null) {
      if (type == "g") precision = Math.max(1, Math.min(21, precision)); else if (type == "e" || type == "f") precision = Math.max(0, Math.min(20, precision));
    }
    type = d3_format_types.get(type) || d3_format_typeDefault;
    var zcomma = zfill && comma;
    return function(value) {
      if (integer && value % 1) return "";
      var negative = value < 0 || value === 0 && 1 / value < 0 ? (value = -value, "-") : sign;
      if (scale < 0) {
        var prefix = d3.formatPrefix(value, precision);
        value = prefix.scale(value);
        suffix = prefix.symbol;
      } else {
        value *= scale;
      }
      value = type(value, precision);
      if (!zfill && comma) value = d3_format_group(value);
      var length = basePrefix.length + value.length + (zcomma ? 0 : negative.length), padding = length < width ? new Array(length = width - length + 1).join(fill) : "";
      if (zcomma) value = d3_format_group(padding + value);
      if (d3_format_decimalPoint) value.replace(".", d3_format_decimalPoint);
      negative += basePrefix;
      return (align === "<" ? negative + value + padding : align === ">" ? padding + negative + value : align === "^" ? padding.substring(0, length >>= 1) + negative + value + padding.substring(length) : negative + (zcomma ? value : padding + value)) + suffix;
    };
  };
  var d3_format_re = /(?:([^{])?([<>=^]))?([+\- ])?(#)?(0)?(\d+)?(,)?(\.-?\d+)?([a-z%])?/i;
  var d3_format_types = d3.map({
    b: function(x) {
      return x.toString(2);
    },
    c: function(x) {
      return String.fromCharCode(x);
    },
    o: function(x) {
      return x.toString(8);
    },
    x: function(x) {
      return x.toString(16);
    },
    X: function(x) {
      return x.toString(16).toUpperCase();
    },
    g: function(x, p) {
      return x.toPrecision(p);
    },
    e: function(x, p) {
      return x.toExponential(p);
    },
    f: function(x, p) {
      return x.toFixed(p);
    },
    r: function(x, p) {
      return (x = d3.round(x, d3_format_precision(x, p))).toFixed(Math.max(0, Math.min(20, d3_format_precision(x * (1 + 1e-15), p))));
    }
  });
  function d3_format_precision(x, p) {
    return p - (x ? Math.ceil(Math.log(x) / Math.LN10) : 1);
  }
  function d3_format_typeDefault(x) {
    return x + "";
  }
  var d3_format_group = d3_identity;
  if (d3_format_grouping) {
    var d3_format_groupingLength = d3_format_grouping.length;
    d3_format_group = function(value) {
      var i = value.lastIndexOf("."), f = i >= 0 ? "." + value.substring(i + 1) : (i = value.length, 
      ""), t = [], j = 0, g = d3_format_grouping[0];
      while (i > 0 && g > 0) {
        t.push(value.substring(i -= g, i + g));
        g = d3_format_grouping[j = (j + 1) % d3_format_groupingLength];
      }
      return t.reverse().join(d3_format_thousandsSeparator || "") + f;
    };
  }
  d3.geo = {};
  d3.geo.stream = function(object, listener) {
    if (object && d3_geo_streamObjectType.hasOwnProperty(object.type)) {
      d3_geo_streamObjectType[object.type](object, listener);
    } else {
      d3_geo_streamGeometry(object, listener);
    }
  };
  function d3_geo_streamGeometry(geometry, listener) {
    if (geometry && d3_geo_streamGeometryType.hasOwnProperty(geometry.type)) {
      d3_geo_streamGeometryType[geometry.type](geometry, listener);
    }
  }
  var d3_geo_streamObjectType = {
    Feature: function(feature, listener) {
      d3_geo_streamGeometry(feature.geometry, listener);
    },
    FeatureCollection: function(object, listener) {
      var features = object.features, i = -1, n = features.length;
      while (++i < n) d3_geo_streamGeometry(features[i].geometry, listener);
    }
  };
  var d3_geo_streamGeometryType = {
    Sphere: function(object, listener) {
      listener.sphere();
    },
    Point: function(object, listener) {
      var coordinate = object.coordinates;
      listener.point(coordinate[0], coordinate[1]);
    },
    MultiPoint: function(object, listener) {
      var coordinates = object.coordinates, i = -1, n = coordinates.length, coordinate;
      while (++i < n) coordinate = coordinates[i], listener.point(coordinate[0], coordinate[1]);
    },
    LineString: function(object, listener) {
      d3_geo_streamLine(object.coordinates, listener, 0);
    },
    MultiLineString: function(object, listener) {
      var coordinates = object.coordinates, i = -1, n = coordinates.length;
      while (++i < n) d3_geo_streamLine(coordinates[i], listener, 0);
    },
    Polygon: function(object, listener) {
      d3_geo_streamPolygon(object.coordinates, listener);
    },
    MultiPolygon: function(object, listener) {
      var coordinates = object.coordinates, i = -1, n = coordinates.length;
      while (++i < n) d3_geo_streamPolygon(coordinates[i], listener);
    },
    GeometryCollection: function(object, listener) {
      var geometries = object.geometries, i = -1, n = geometries.length;
      while (++i < n) d3_geo_streamGeometry(geometries[i], listener);
    }
  };
  function d3_geo_streamLine(coordinates, listener, closed) {
    var i = -1, n = coordinates.length - closed, coordinate;
    listener.lineStart();
    while (++i < n) coordinate = coordinates[i], listener.point(coordinate[0], coordinate[1]);
    listener.lineEnd();
  }
  function d3_geo_streamPolygon(coordinates, listener) {
    var i = -1, n = coordinates.length;
    listener.polygonStart();
    while (++i < n) d3_geo_streamLine(coordinates[i], listener, 1);
    listener.polygonEnd();
  }
  d3.geo.area = function(object) {
    d3_geo_areaSum = 0;
    d3.geo.stream(object, d3_geo_area);
    return d3_geo_areaSum;
  };
  var d3_geo_areaSum, d3_geo_areaRingU, d3_geo_areaRingV;
  var d3_geo_area = {
    sphere: function() {
      d3_geo_areaSum += 4 * π;
    },
    point: d3_noop,
    lineStart: d3_noop,
    lineEnd: d3_noop,
    polygonStart: function() {
      d3_geo_areaRingU = 1, d3_geo_areaRingV = 0;
      d3_geo_area.lineStart = d3_geo_areaRingStart;
    },
    polygonEnd: function() {
      var area = 2 * Math.atan2(d3_geo_areaRingV, d3_geo_areaRingU);
      d3_geo_areaSum += area < 0 ? 4 * π + area : area;
      d3_geo_area.lineStart = d3_geo_area.lineEnd = d3_geo_area.point = d3_noop;
    }
  };
  function d3_geo_areaRingStart() {
    var λ00, φ00, λ0, cosφ0, sinφ0;
    d3_geo_area.point = function(λ, φ) {
      d3_geo_area.point = nextPoint;
      λ0 = (λ00 = λ) * d3_radians, cosφ0 = Math.cos(φ = (φ00 = φ) * d3_radians / 2 + π / 4), 
      sinφ0 = Math.sin(φ);
    };
    function nextPoint(λ, φ) {
      λ *= d3_radians;
      φ = φ * d3_radians / 2 + π / 4;
      var dλ = λ - λ0, cosφ = Math.cos(φ), sinφ = Math.sin(φ), k = sinφ0 * sinφ, u0 = d3_geo_areaRingU, v0 = d3_geo_areaRingV, u = cosφ0 * cosφ + k * Math.cos(dλ), v = k * Math.sin(dλ);
      d3_geo_areaRingU = u0 * u - v0 * v;
      d3_geo_areaRingV = v0 * u + u0 * v;
      λ0 = λ, cosφ0 = cosφ, sinφ0 = sinφ;
    }
    d3_geo_area.lineEnd = function() {
      nextPoint(λ00, φ00);
    };
  }
  d3.geo.bounds = d3_geo_bounds(d3_identity);
  function d3_geo_bounds(projectStream) {
    var x0, y0, x1, y1;
    var bound = {
      point: boundPoint,
      lineStart: d3_noop,
      lineEnd: d3_noop,
      polygonStart: function() {
        bound.lineEnd = boundPolygonLineEnd;
      },
      polygonEnd: function() {
        bound.point = boundPoint;
      }
    };
    function boundPoint(x, y) {
      if (x < x0) x0 = x;
      if (x > x1) x1 = x;
      if (y < y0) y0 = y;
      if (y > y1) y1 = y;
    }
    function boundPolygonLineEnd() {
      bound.point = bound.lineEnd = d3_noop;
    }
    return function(feature) {
      y1 = x1 = -(x0 = y0 = Infinity);
      d3.geo.stream(feature, projectStream(bound));
      return [ [ x0, y0 ], [ x1, y1 ] ];
    };
  }
  d3.geo.centroid = function(object) {
    d3_geo_centroidDimension = d3_geo_centroidW = d3_geo_centroidX = d3_geo_centroidY = d3_geo_centroidZ = 0;
    d3.geo.stream(object, d3_geo_centroid);
    var m;
    if (d3_geo_centroidW && Math.abs(m = Math.sqrt(d3_geo_centroidX * d3_geo_centroidX + d3_geo_centroidY * d3_geo_centroidY + d3_geo_centroidZ * d3_geo_centroidZ)) > ε) {
      return [ Math.atan2(d3_geo_centroidY, d3_geo_centroidX) * d3_degrees, Math.asin(Math.max(-1, Math.min(1, d3_geo_centroidZ / m))) * d3_degrees ];
    }
  };
  var d3_geo_centroidDimension, d3_geo_centroidW, d3_geo_centroidX, d3_geo_centroidY, d3_geo_centroidZ;
  var d3_geo_centroid = {
    sphere: function() {
      if (d3_geo_centroidDimension < 2) {
        d3_geo_centroidDimension = 2;
        d3_geo_centroidW = d3_geo_centroidX = d3_geo_centroidY = d3_geo_centroidZ = 0;
      }
    },
    point: d3_geo_centroidPoint,
    lineStart: d3_geo_centroidLineStart,
    lineEnd: d3_geo_centroidLineEnd,
    polygonStart: function() {
      if (d3_geo_centroidDimension < 2) {
        d3_geo_centroidDimension = 2;
        d3_geo_centroidW = d3_geo_centroidX = d3_geo_centroidY = d3_geo_centroidZ = 0;
      }
      d3_geo_centroid.lineStart = d3_geo_centroidRingStart;
    },
    polygonEnd: function() {
      d3_geo_centroid.lineStart = d3_geo_centroidLineStart;
    }
  };
  function d3_geo_centroidPoint(λ, φ) {
    if (d3_geo_centroidDimension) return;
    ++d3_geo_centroidW;
    λ *= d3_radians;
    var cosφ = Math.cos(φ *= d3_radians);
    d3_geo_centroidX += (cosφ * Math.cos(λ) - d3_geo_centroidX) / d3_geo_centroidW;
    d3_geo_centroidY += (cosφ * Math.sin(λ) - d3_geo_centroidY) / d3_geo_centroidW;
    d3_geo_centroidZ += (Math.sin(φ) - d3_geo_centroidZ) / d3_geo_centroidW;
  }
  function d3_geo_centroidRingStart() {
    var λ00, φ00;
    d3_geo_centroidDimension = 1;
    d3_geo_centroidLineStart();
    d3_geo_centroidDimension = 2;
    var linePoint = d3_geo_centroid.point;
    d3_geo_centroid.point = function(λ, φ) {
      linePoint(λ00 = λ, φ00 = φ);
    };
    d3_geo_centroid.lineEnd = function() {
      d3_geo_centroid.point(λ00, φ00);
      d3_geo_centroidLineEnd();
      d3_geo_centroid.lineEnd = d3_geo_centroidLineEnd;
    };
  }
  function d3_geo_centroidLineStart() {
    var x0, y0, z0;
    if (d3_geo_centroidDimension > 1) return;
    if (d3_geo_centroidDimension < 1) {
      d3_geo_centroidDimension = 1;
      d3_geo_centroidW = d3_geo_centroidX = d3_geo_centroidY = d3_geo_centroidZ = 0;
    }
    d3_geo_centroid.point = function(λ, φ) {
      λ *= d3_radians;
      var cosφ = Math.cos(φ *= d3_radians);
      x0 = cosφ * Math.cos(λ);
      y0 = cosφ * Math.sin(λ);
      z0 = Math.sin(φ);
      d3_geo_centroid.point = nextPoint;
    };
    function nextPoint(λ, φ) {
      λ *= d3_radians;
      var cosφ = Math.cos(φ *= d3_radians), x = cosφ * Math.cos(λ), y = cosφ * Math.sin(λ), z = Math.sin(φ), w = Math.atan2(Math.sqrt((w = y0 * z - z0 * y) * w + (w = z0 * x - x0 * z) * w + (w = x0 * y - y0 * x) * w), x0 * x + y0 * y + z0 * z);
      d3_geo_centroidW += w;
      d3_geo_centroidX += w * (x0 + (x0 = x));
      d3_geo_centroidY += w * (y0 + (y0 = y));
      d3_geo_centroidZ += w * (z0 + (z0 = z));
    }
  }
  function d3_geo_centroidLineEnd() {
    d3_geo_centroid.point = d3_geo_centroidPoint;
  }
  function d3_geo_cartesian(spherical) {
    var λ = spherical[0], φ = spherical[1], cosφ = Math.cos(φ);
    return [ cosφ * Math.cos(λ), cosφ * Math.sin(λ), Math.sin(φ) ];
  }
  function d3_geo_cartesianDot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  }
  function d3_geo_cartesianCross(a, b) {
    return [ a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0] ];
  }
  function d3_geo_cartesianAdd(a, b) {
    a[0] += b[0];
    a[1] += b[1];
    a[2] += b[2];
  }
  function d3_geo_cartesianScale(vector, k) {
    return [ vector[0] * k, vector[1] * k, vector[2] * k ];
  }
  function d3_geo_cartesianNormalize(d) {
    var l = Math.sqrt(d[0] * d[0] + d[1] * d[1] + d[2] * d[2]);
    d[0] /= l;
    d[1] /= l;
    d[2] /= l;
  }
  function d3_true() {
    return true;
  }
  function d3_geo_spherical(cartesian) {
    return [ Math.atan2(cartesian[1], cartesian[0]), Math.asin(Math.max(-1, Math.min(1, cartesian[2]))) ];
  }
  function d3_geo_sphericalEqual(a, b) {
    return Math.abs(a[0] - b[0]) < ε && Math.abs(a[1] - b[1]) < ε;
  }
  function d3_geo_clipPolygon(segments, compare, inside, interpolate, listener) {
    var subject = [], clip = [];
    segments.forEach(function(segment) {
      if ((n = segment.length - 1) <= 0) return;
      var n, p0 = segment[0], p1 = segment[n];
      if (d3_geo_sphericalEqual(p0, p1)) {
        listener.lineStart();
        for (var i = 0; i < n; ++i) listener.point((p0 = segment[i])[0], p0[1]);
        listener.lineEnd();
        return;
      }
      var a = {
        point: p0,
        points: segment,
        other: null,
        visited: false,
        entry: true,
        subject: true
      }, b = {
        point: p0,
        points: [ p0 ],
        other: a,
        visited: false,
        entry: false,
        subject: false
      };
      a.other = b;
      subject.push(a);
      clip.push(b);
      a = {
        point: p1,
        points: [ p1 ],
        other: null,
        visited: false,
        entry: false,
        subject: true
      };
      b = {
        point: p1,
        points: [ p1 ],
        other: a,
        visited: false,
        entry: true,
        subject: false
      };
      a.other = b;
      subject.push(a);
      clip.push(b);
    });
    clip.sort(compare);
    d3_geo_clipPolygonLinkCircular(subject);
    d3_geo_clipPolygonLinkCircular(clip);
    if (!subject.length) return;
    if (inside) for (var i = 1, e = !inside(clip[0].point), n = clip.length; i < n; ++i) {
      clip[i].entry = e = !e;
    }
    var start = subject[0], current, points, point;
    while (1) {
      current = start;
      while (current.visited) if ((current = current.next) === start) return;
      points = current.points;
      listener.lineStart();
      do {
        current.visited = current.other.visited = true;
        if (current.entry) {
          if (current.subject) {
            for (var i = 0; i < points.length; i++) listener.point((point = points[i])[0], point[1]);
          } else {
            interpolate(current.point, current.next.point, 1, listener);
          }
          current = current.next;
        } else {
          if (current.subject) {
            points = current.prev.points;
            for (var i = points.length; --i >= 0; ) listener.point((point = points[i])[0], point[1]);
          } else {
            interpolate(current.point, current.prev.point, -1, listener);
          }
          current = current.prev;
        }
        current = current.other;
        points = current.points;
      } while (!current.visited);
      listener.lineEnd();
    }
  }
  function d3_geo_clipPolygonLinkCircular(array) {
    if (!(n = array.length)) return;
    var n, i = 0, a = array[0], b;
    while (++i < n) {
      a.next = b = array[i];
      b.prev = a;
      a = b;
    }
    a.next = b = array[0];
    b.prev = a;
  }
  function d3_geo_clip(pointVisible, clipLine, interpolate) {
    return function(listener) {
      var line = clipLine(listener);
      var clip = {
        point: point,
        lineStart: lineStart,
        lineEnd: lineEnd,
        polygonStart: function() {
          clip.point = pointRing;
          clip.lineStart = ringStart;
          clip.lineEnd = ringEnd;
          invisible = false;
          invisibleArea = visibleArea = 0;
          segments = [];
          listener.polygonStart();
        },
        polygonEnd: function() {
          clip.point = point;
          clip.lineStart = lineStart;
          clip.lineEnd = lineEnd;
          segments = d3.merge(segments);
          if (segments.length) {
            d3_geo_clipPolygon(segments, d3_geo_clipSort, null, interpolate, listener);
          } else if (visibleArea < -ε || invisible && invisibleArea < -ε) {
            listener.lineStart();
            interpolate(null, null, 1, listener);
            listener.lineEnd();
          }
          listener.polygonEnd();
          segments = null;
        },
        sphere: function() {
          listener.polygonStart();
          listener.lineStart();
          interpolate(null, null, 1, listener);
          listener.lineEnd();
          listener.polygonEnd();
        }
      };
      function point(λ, φ) {
        if (pointVisible(λ, φ)) listener.point(λ, φ);
      }
      function pointLine(λ, φ) {
        line.point(λ, φ);
      }
      function lineStart() {
        clip.point = pointLine;
        line.lineStart();
      }
      function lineEnd() {
        clip.point = point;
        line.lineEnd();
      }
      var segments, visibleArea, invisibleArea, invisible;
      var buffer = d3_geo_clipBufferListener(), ringListener = clipLine(buffer), ring;
      function pointRing(λ, φ) {
        ringListener.point(λ, φ);
        ring.push([ λ, φ ]);
      }
      function ringStart() {
        ringListener.lineStart();
        ring = [];
      }
      function ringEnd() {
        pointRing(ring[0][0], ring[0][1]);
        ringListener.lineEnd();
        var clean = ringListener.clean(), ringSegments = buffer.buffer(), segment, n = ringSegments.length;
        if (!n) {
          invisible = true;
          invisibleArea += d3_geo_clipAreaRing(ring, -1);
          ring = null;
          return;
        }
        ring = null;
        if (clean & 1) {
          segment = ringSegments[0];
          visibleArea += d3_geo_clipAreaRing(segment, 1);
          var n = segment.length - 1, i = -1, point;
          listener.lineStart();
          while (++i < n) listener.point((point = segment[i])[0], point[1]);
          listener.lineEnd();
          return;
        }
        if (n > 1 && clean & 2) ringSegments.push(ringSegments.pop().concat(ringSegments.shift()));
        segments.push(ringSegments.filter(d3_geo_clipSegmentLength1));
      }
      return clip;
    };
  }
  function d3_geo_clipSegmentLength1(segment) {
    return segment.length > 1;
  }
  function d3_geo_clipBufferListener() {
    var lines = [], line;
    return {
      lineStart: function() {
        lines.push(line = []);
      },
      point: function(λ, φ) {
        line.push([ λ, φ ]);
      },
      lineEnd: d3_noop,
      buffer: function() {
        var buffer = lines;
        lines = [];
        line = null;
        return buffer;
      },
      rejoin: function() {
        if (lines.length > 1) lines.push(lines.pop().concat(lines.shift()));
      }
    };
  }
  function d3_geo_clipAreaRing(ring, invisible) {
    if (!(n = ring.length)) return 0;
    var n, i = 0, area = 0, p = ring[0], λ = p[0], φ = p[1], cosφ = Math.cos(φ), x0 = Math.atan2(invisible * Math.sin(λ) * cosφ, Math.sin(φ)), y0 = 1 - invisible * Math.cos(λ) * cosφ, x1 = x0, x, y;
    while (++i < n) {
      p = ring[i];
      cosφ = Math.cos(φ = p[1]);
      x = Math.atan2(invisible * Math.sin(λ = p[0]) * cosφ, Math.sin(φ));
      y = 1 - invisible * Math.cos(λ) * cosφ;
      if (Math.abs(y0 - 2) < ε && Math.abs(y - 2) < ε) continue;
      if (Math.abs(y) < ε || Math.abs(y0) < ε) {} else if (Math.abs(Math.abs(x - x0) - π) < ε) {
        if (y + y0 > 2) area += 4 * (x - x0);
      } else if (Math.abs(y0 - 2) < ε) area += 4 * (x - x1); else area += ((3 * π + x - x0) % (2 * π) - π) * (y0 + y);
      x1 = x0, x0 = x, y0 = y;
    }
    return area;
  }
  function d3_geo_clipSort(a, b) {
    return ((a = a.point)[0] < 0 ? a[1] - π / 2 - ε : π / 2 - a[1]) - ((b = b.point)[0] < 0 ? b[1] - π / 2 - ε : π / 2 - b[1]);
  }
  var d3_geo_clipAntimeridian = d3_geo_clip(d3_true, d3_geo_clipAntimeridianLine, d3_geo_clipAntimeridianInterpolate);
  function d3_geo_clipAntimeridianLine(listener) {
    var λ0 = NaN, φ0 = NaN, sλ0 = NaN, clean;
    return {
      lineStart: function() {
        listener.lineStart();
        clean = 1;
      },
      point: function(λ1, φ1) {
        var sλ1 = λ1 > 0 ? π : -π, dλ = Math.abs(λ1 - λ0);
        if (Math.abs(dλ - π) < ε) {
          listener.point(λ0, φ0 = (φ0 + φ1) / 2 > 0 ? π / 2 : -π / 2);
          listener.point(sλ0, φ0);
          listener.lineEnd();
          listener.lineStart();
          listener.point(sλ1, φ0);
          listener.point(λ1, φ0);
          clean = 0;
        } else if (sλ0 !== sλ1 && dλ >= π) {
          if (Math.abs(λ0 - sλ0) < ε) λ0 -= sλ0 * ε;
          if (Math.abs(λ1 - sλ1) < ε) λ1 -= sλ1 * ε;
          φ0 = d3_geo_clipAntimeridianIntersect(λ0, φ0, λ1, φ1);
          listener.point(sλ0, φ0);
          listener.lineEnd();
          listener.lineStart();
          listener.point(sλ1, φ0);
          clean = 0;
        }
        listener.point(λ0 = λ1, φ0 = φ1);
        sλ0 = sλ1;
      },
      lineEnd: function() {
        listener.lineEnd();
        λ0 = φ0 = NaN;
      },
      clean: function() {
        return 2 - clean;
      }
    };
  }
  function d3_geo_clipAntimeridianIntersect(λ0, φ0, λ1, φ1) {
    var cosφ0, cosφ1, sinλ0_λ1 = Math.sin(λ0 - λ1);
    return Math.abs(sinλ0_λ1) > ε ? Math.atan((Math.sin(φ0) * (cosφ1 = Math.cos(φ1)) * Math.sin(λ1) - Math.sin(φ1) * (cosφ0 = Math.cos(φ0)) * Math.sin(λ0)) / (cosφ0 * cosφ1 * sinλ0_λ1)) : (φ0 + φ1) / 2;
  }
  function d3_geo_clipAntimeridianInterpolate(from, to, direction, listener) {
    var φ;
    if (from == null) {
      φ = direction * π / 2;
      listener.point(-π, φ);
      listener.point(0, φ);
      listener.point(π, φ);
      listener.point(π, 0);
      listener.point(π, -φ);
      listener.point(0, -φ);
      listener.point(-π, -φ);
      listener.point(-π, 0);
      listener.point(-π, φ);
    } else if (Math.abs(from[0] - to[0]) > ε) {
      var s = (from[0] < to[0] ? 1 : -1) * π;
      φ = direction * s / 2;
      listener.point(-s, φ);
      listener.point(0, φ);
      listener.point(s, φ);
    } else {
      listener.point(to[0], to[1]);
    }
  }
  function d3_geo_clipCircle(radius) {
    var cr = Math.cos(radius), smallRadius = cr > 0, notHemisphere = Math.abs(cr) > ε, interpolate = d3_geo_circleInterpolate(radius, 6 * d3_radians);
    return d3_geo_clip(visible, clipLine, interpolate);
    function visible(λ, φ) {
      return Math.cos(λ) * Math.cos(φ) > cr;
    }
    function clipLine(listener) {
      var point0, c0, v0, v00, clean;
      return {
        lineStart: function() {
          v00 = v0 = false;
          clean = 1;
        },
        point: function(λ, φ) {
          var point1 = [ λ, φ ], point2, v = visible(λ, φ), c = smallRadius ? v ? 0 : code(λ, φ) : v ? code(λ + (λ < 0 ? π : -π), φ) : 0;
          if (!point0 && (v00 = v0 = v)) listener.lineStart();
          if (v !== v0) {
            point2 = intersect(point0, point1);
            if (d3_geo_sphericalEqual(point0, point2) || d3_geo_sphericalEqual(point1, point2)) {
              point1[0] += ε;
              point1[1] += ε;
              v = visible(point1[0], point1[1]);
            }
          }
          if (v !== v0) {
            clean = 0;
            if (v) {
              listener.lineStart();
              point2 = intersect(point1, point0);
              listener.point(point2[0], point2[1]);
            } else {
              point2 = intersect(point0, point1);
              listener.point(point2[0], point2[1]);
              listener.lineEnd();
            }
            point0 = point2;
          } else if (notHemisphere && point0 && smallRadius ^ v) {
            var t;
            if (!(c & c0) && (t = intersect(point1, point0, true))) {
              clean = 0;
              if (smallRadius) {
                listener.lineStart();
                listener.point(t[0][0], t[0][1]);
                listener.point(t[1][0], t[1][1]);
                listener.lineEnd();
              } else {
                listener.point(t[1][0], t[1][1]);
                listener.lineEnd();
                listener.lineStart();
                listener.point(t[0][0], t[0][1]);
              }
            }
          }
          if (v && (!point0 || !d3_geo_sphericalEqual(point0, point1))) {
            listener.point(point1[0], point1[1]);
          }
          point0 = point1, v0 = v, c0 = c;
        },
        lineEnd: function() {
          if (v0) listener.lineEnd();
          point0 = null;
        },
        clean: function() {
          return clean | (v00 && v0) << 1;
        }
      };
    }
    function intersect(a, b, two) {
      var pa = d3_geo_cartesian(a), pb = d3_geo_cartesian(b);
      var n1 = [ 1, 0, 0 ], n2 = d3_geo_cartesianCross(pa, pb), n2n2 = d3_geo_cartesianDot(n2, n2), n1n2 = n2[0], determinant = n2n2 - n1n2 * n1n2;
      if (!determinant) return !two && a;
      var c1 = cr * n2n2 / determinant, c2 = -cr * n1n2 / determinant, n1xn2 = d3_geo_cartesianCross(n1, n2), A = d3_geo_cartesianScale(n1, c1), B = d3_geo_cartesianScale(n2, c2);
      d3_geo_cartesianAdd(A, B);
      var u = n1xn2, w = d3_geo_cartesianDot(A, u), uu = d3_geo_cartesianDot(u, u), t2 = w * w - uu * (d3_geo_cartesianDot(A, A) - 1);
      if (t2 < 0) return;
      var t = Math.sqrt(t2), q = d3_geo_cartesianScale(u, (-w - t) / uu);
      d3_geo_cartesianAdd(q, A);
      q = d3_geo_spherical(q);
      if (!two) return q;
      var λ0 = a[0], λ1 = b[0], φ0 = a[1], φ1 = b[1], z;
      if (λ1 < λ0) z = λ0, λ0 = λ1, λ1 = z;
      var δλ = λ1 - λ0, polar = Math.abs(δλ - π) < ε, meridian = polar || δλ < ε;
      if (!polar && φ1 < φ0) z = φ0, φ0 = φ1, φ1 = z;
      if (meridian ? polar ? φ0 + φ1 > 0 ^ q[1] < (Math.abs(q[0] - λ0) < ε ? φ0 : φ1) : φ0 <= q[1] && q[1] <= φ1 : δλ > π ^ (λ0 <= q[0] && q[0] <= λ1)) {
        var q1 = d3_geo_cartesianScale(u, (-w + t) / uu);
        d3_geo_cartesianAdd(q1, A);
        return [ q, d3_geo_spherical(q1) ];
      }
    }
    function code(λ, φ) {
      var r = smallRadius ? radius : π - radius, code = 0;
      if (λ < -r) code |= 1; else if (λ > r) code |= 2;
      if (φ < -r) code |= 4; else if (φ > r) code |= 8;
      return code;
    }
  }
  var d3_geo_clipViewMAX = 1e9;
  function d3_geo_clipView(x0, y0, x1, y1) {
    return function(listener) {
      var listener_ = listener, bufferListener = d3_geo_clipBufferListener(), segments, polygon, ring;
      var clip = {
        point: point,
        lineStart: lineStart,
        lineEnd: lineEnd,
        polygonStart: function() {
          listener = bufferListener;
          segments = [];
          polygon = [];
        },
        polygonEnd: function() {
          listener = listener_;
          if ((segments = d3.merge(segments)).length) {
            listener.polygonStart();
            d3_geo_clipPolygon(segments, compare, inside, interpolate, listener);
            listener.polygonEnd();
          } else if (insidePolygon([ x0, y0 ])) {
            listener.polygonStart(), listener.lineStart();
            interpolate(null, null, 1, listener);
            listener.lineEnd(), listener.polygonEnd();
          }
          segments = polygon = ring = null;
        }
      };
      function inside(point) {
        var a = corner(point, -1), i = insidePolygon([ a === 0 || a === 3 ? x0 : x1, a > 1 ? y1 : y0 ]);
        return i;
      }
      function insidePolygon(p) {
        var wn = 0, n = polygon.length, y = p[1];
        for (var i = 0; i < n; ++i) {
          for (var j = 1, v = polygon[i], m = v.length, a = v[0]; j < m; ++j) {
            b = v[j];
            if (a[1] <= y) {
              if (b[1] > y && isLeft(a, b, p) > 0) ++wn;
            } else {
              if (b[1] <= y && isLeft(a, b, p) < 0) --wn;
            }
            a = b;
          }
        }
        return wn !== 0;
      }
      function isLeft(a, b, c) {
        return (b[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (b[1] - a[1]);
      }
      function interpolate(from, to, direction, listener) {
        var a = 0, a1 = 0;
        if (from == null || (a = corner(from, direction)) !== (a1 = corner(to, direction)) || comparePoints(from, to) < 0 ^ direction > 0) {
          do {
            listener.point(a === 0 || a === 3 ? x0 : x1, a > 1 ? y1 : y0);
          } while ((a = (a + direction + 4) % 4) !== a1);
        } else {
          listener.point(to[0], to[1]);
        }
      }
      function visible(x, y) {
        return x0 <= x && x <= x1 && y0 <= y && y <= y1;
      }
      function point(x, y) {
        if (visible(x, y)) listener.point(x, y);
      }
      var x__, y__, v__, x_, y_, v_, first;
      function lineStart() {
        clip.point = linePoint;
        if (polygon) polygon.push(ring = []);
        first = true;
        v_ = false;
        x_ = y_ = NaN;
      }
      function lineEnd() {
        if (segments) {
          linePoint(x__, y__);
          if (v__ && v_) bufferListener.rejoin();
          segments.push(bufferListener.buffer());
        }
        clip.point = point;
        if (v_) listener.lineEnd();
      }
      function linePoint(x, y) {
        x = Math.max(-d3_geo_clipViewMAX, Math.min(d3_geo_clipViewMAX, x));
        y = Math.max(-d3_geo_clipViewMAX, Math.min(d3_geo_clipViewMAX, y));
        var v = visible(x, y);
        if (polygon) ring.push([ x, y ]);
        if (first) {
          x__ = x, y__ = y, v__ = v;
          first = false;
          if (v) {
            listener.lineStart();
            listener.point(x, y);
          }
        } else {
          if (v && v_) listener.point(x, y); else {
            var a = [ x_, y_ ], b = [ x, y ];
            if (clipLine(a, b)) {
              if (!v_) {
                listener.lineStart();
                listener.point(a[0], a[1]);
              }
              listener.point(b[0], b[1]);
              if (!v) listener.lineEnd();
            } else {
              listener.lineStart();
              listener.point(x, y);
            }
          }
        }
        x_ = x, y_ = y, v_ = v;
      }
      return clip;
    };
    function corner(p, direction) {
      return Math.abs(p[0] - x0) < ε ? direction > 0 ? 0 : 3 : Math.abs(p[0] - x1) < ε ? direction > 0 ? 2 : 1 : Math.abs(p[1] - y0) < ε ? direction > 0 ? 1 : 0 : direction > 0 ? 3 : 2;
    }
    function compare(a, b) {
      return comparePoints(a.point, b.point);
    }
    function comparePoints(a, b) {
      var ca = corner(a, 1), cb = corner(b, 1);
      return ca !== cb ? ca - cb : ca === 0 ? b[1] - a[1] : ca === 1 ? a[0] - b[0] : ca === 2 ? a[1] - b[1] : b[0] - a[0];
    }
    function clipLine(a, b) {
      var dx = b[0] - a[0], dy = b[1] - a[1], t = [ 0, 1 ];
      if (Math.abs(dx) < ε && Math.abs(dy) < ε) return x0 <= a[0] && a[0] <= x1 && y0 <= a[1] && a[1] <= y1;
      if (d3_geo_clipViewT(x0 - a[0], dx, t) && d3_geo_clipViewT(a[0] - x1, -dx, t) && d3_geo_clipViewT(y0 - a[1], dy, t) && d3_geo_clipViewT(a[1] - y1, -dy, t)) {
        if (t[1] < 1) {
          b[0] = a[0] + t[1] * dx;
          b[1] = a[1] + t[1] * dy;
        }
        if (t[0] > 0) {
          a[0] += t[0] * dx;
          a[1] += t[0] * dy;
        }
        return true;
      }
      return false;
    }
  }
  function d3_geo_clipViewT(num, denominator, t) {
    if (Math.abs(denominator) < ε) return num <= 0;
    var u = num / denominator;
    if (denominator > 0) {
      if (u > t[1]) return false;
      if (u > t[0]) t[0] = u;
    } else {
      if (u < t[0]) return false;
      if (u < t[1]) t[1] = u;
    }
    return true;
  }
  function d3_geo_compose(a, b) {
    function compose(x, y) {
      return x = a(x, y), b(x[0], x[1]);
    }
    if (a.invert && b.invert) compose.invert = function(x, y) {
      return x = b.invert(x, y), x && a.invert(x[0], x[1]);
    };
    return compose;
  }
  function d3_geo_resample(project) {
    var δ2 = .5, maxDepth = 16;
    function resample(stream) {
      var λ0, x0, y0, a0, b0, c0;
      var resample = {
        point: point,
        lineStart: lineStart,
        lineEnd: lineEnd,
        polygonStart: function() {
          stream.polygonStart();
          resample.lineStart = polygonLineStart;
        },
        polygonEnd: function() {
          stream.polygonEnd();
          resample.lineStart = lineStart;
        }
      };
      function point(x, y) {
        x = project(x, y);
        stream.point(x[0], x[1]);
      }
      function lineStart() {
        x0 = NaN;
        resample.point = linePoint;
        stream.lineStart();
      }
      function linePoint(λ, φ) {
        var c = d3_geo_cartesian([ λ, φ ]), p = project(λ, φ);
        resampleLineTo(x0, y0, λ0, a0, b0, c0, x0 = p[0], y0 = p[1], λ0 = λ, a0 = c[0], b0 = c[1], c0 = c[2], maxDepth, stream);
        stream.point(x0, y0);
      }
      function lineEnd() {
        resample.point = point;
        stream.lineEnd();
      }
      function polygonLineStart() {
        var λ00, φ00, x00, y00, a00, b00, c00;
        lineStart();
        resample.point = function(λ, φ) {
          linePoint(λ00 = λ, φ00 = φ), x00 = x0, y00 = y0, a00 = a0, b00 = b0, c00 = c0;
          resample.point = linePoint;
        };
        resample.lineEnd = function() {
          resampleLineTo(x0, y0, λ0, a0, b0, c0, x00, y00, λ00, a00, b00, c00, maxDepth, stream);
          resample.lineEnd = lineEnd;
          lineEnd();
        };
      }
      return resample;
    }
    function resampleLineTo(x0, y0, λ0, a0, b0, c0, x1, y1, λ1, a1, b1, c1, depth, stream) {
      var dx = x1 - x0, dy = y1 - y0, d2 = dx * dx + dy * dy;
      if (d2 > 4 * δ2 && depth--) {
        var a = a0 + a1, b = b0 + b1, c = c0 + c1, m = Math.sqrt(a * a + b * b + c * c), φ2 = Math.asin(c /= m), λ2 = Math.abs(Math.abs(c) - 1) < ε ? (λ0 + λ1) / 2 : Math.atan2(b, a), p = project(λ2, φ2), x2 = p[0], y2 = p[1], dx2 = x2 - x0, dy2 = y2 - y0, dz = dy * dx2 - dx * dy2;
        if (dz * dz / d2 > δ2 || Math.abs((dx * dx2 + dy * dy2) / d2 - .5) > .3) {
          resampleLineTo(x0, y0, λ0, a0, b0, c0, x2, y2, λ2, a /= m, b /= m, c, depth, stream);
          stream.point(x2, y2);
          resampleLineTo(x2, y2, λ2, a, b, c, x1, y1, λ1, a1, b1, c1, depth, stream);
        }
      }
    }
    resample.precision = function(_) {
      if (!arguments.length) return Math.sqrt(δ2);
      maxDepth = (δ2 = _ * _) > 0 && 16;
      return resample;
    };
    return resample;
  }
  d3.geo.projection = d3_geo_projection;
  d3.geo.projectionMutator = d3_geo_projectionMutator;
  function d3_geo_projection(project) {
    return d3_geo_projectionMutator(function() {
      return project;
    })();
  }
  function d3_geo_projectionMutator(projectAt) {
    var project, rotate, projectRotate, projectResample = d3_geo_resample(function(x, y) {
      x = project(x, y);
      return [ x[0] * k + δx, δy - x[1] * k ];
    }), k = 150, x = 480, y = 250, λ = 0, φ = 0, δλ = 0, δφ = 0, δγ = 0, δx, δy, preclip = d3_geo_clipAntimeridian, postclip = d3_identity, clipAngle = null, clipExtent = null;
    function projection(point) {
      point = projectRotate(point[0] * d3_radians, point[1] * d3_radians);
      return [ point[0] * k + δx, δy - point[1] * k ];
    }
    function invert(point) {
      point = projectRotate.invert((point[0] - δx) / k, (δy - point[1]) / k);
      return point && [ point[0] * d3_degrees, point[1] * d3_degrees ];
    }
    projection.stream = function(stream) {
      return d3_geo_projectionRadiansRotate(rotate, preclip(projectResample(postclip(stream))));
    };
    projection.clipAngle = function(_) {
      if (!arguments.length) return clipAngle;
      preclip = _ == null ? (clipAngle = _, d3_geo_clipAntimeridian) : d3_geo_clipCircle((clipAngle = +_) * d3_radians);
      return projection;
    };
    projection.clipExtent = function(_) {
      if (!arguments.length) return clipExtent;
      clipExtent = _;
      postclip = _ == null ? d3_identity : d3_geo_clipView(_[0][0], _[0][1], _[1][0], _[1][1]);
      return projection;
    };
    projection.scale = function(_) {
      if (!arguments.length) return k;
      k = +_;
      return reset();
    };
    projection.translate = function(_) {
      if (!arguments.length) return [ x, y ];
      x = +_[0];
      y = +_[1];
      return reset();
    };
    projection.center = function(_) {
      if (!arguments.length) return [ λ * d3_degrees, φ * d3_degrees ];
      λ = _[0] % 360 * d3_radians;
      φ = _[1] % 360 * d3_radians;
      return reset();
    };
    projection.rotate = function(_) {
      if (!arguments.length) return [ δλ * d3_degrees, δφ * d3_degrees, δγ * d3_degrees ];
      δλ = _[0] % 360 * d3_radians;
      δφ = _[1] % 360 * d3_radians;
      δγ = _.length > 2 ? _[2] % 360 * d3_radians : 0;
      return reset();
    };
    d3.rebind(projection, projectResample, "precision");
    function reset() {
      projectRotate = d3_geo_compose(rotate = d3_geo_rotation(δλ, δφ, δγ), project);
      var center = project(λ, φ);
      δx = x - center[0] * k;
      δy = y + center[1] * k;
      return projection;
    }
    return function() {
      project = projectAt.apply(this, arguments);
      projection.invert = project.invert && invert;
      return reset();
    };
  }
  function d3_geo_projectionRadiansRotate(rotate, stream) {
    return {
      point: function(x, y) {
        y = rotate(x * d3_radians, y * d3_radians), x = y[0];
        stream.point(x > π ? x - 2 * π : x < -π ? x + 2 * π : x, y[1]);
      },
      sphere: function() {
        stream.sphere();
      },
      lineStart: function() {
        stream.lineStart();
      },
      lineEnd: function() {
        stream.lineEnd();
      },
      polygonStart: function() {
        stream.polygonStart();
      },
      polygonEnd: function() {
        stream.polygonEnd();
      }
    };
  }
  function d3_geo_equirectangular(λ, φ) {
    return [ λ, φ ];
  }
  (d3.geo.equirectangular = function() {
    return d3_geo_projection(d3_geo_equirectangular);
  }).raw = d3_geo_equirectangular.invert = d3_geo_equirectangular;
  d3.geo.rotation = function(rotate) {
    rotate = d3_geo_rotation(rotate[0] % 360 * d3_radians, rotate[1] * d3_radians, rotate.length > 2 ? rotate[2] * d3_radians : 0);
    function forward(coordinates) {
      coordinates = rotate(coordinates[0] * d3_radians, coordinates[1] * d3_radians);
      return coordinates[0] *= d3_degrees, coordinates[1] *= d3_degrees, coordinates;
    }
    forward.invert = function(coordinates) {
      coordinates = rotate.invert(coordinates[0] * d3_radians, coordinates[1] * d3_radians);
      return coordinates[0] *= d3_degrees, coordinates[1] *= d3_degrees, coordinates;
    };
    return forward;
  };
  function d3_geo_rotation(δλ, δφ, δγ) {
    return δλ ? δφ || δγ ? d3_geo_compose(d3_geo_rotationλ(δλ), d3_geo_rotationφγ(δφ, δγ)) : d3_geo_rotationλ(δλ) : δφ || δγ ? d3_geo_rotationφγ(δφ, δγ) : d3_geo_equirectangular;
  }
  function d3_geo_forwardRotationλ(δλ) {
    return function(λ, φ) {
      return λ += δλ, [ λ > π ? λ - 2 * π : λ < -π ? λ + 2 * π : λ, φ ];
    };
  }
  function d3_geo_rotationλ(δλ) {
    var rotation = d3_geo_forwardRotationλ(δλ);
    rotation.invert = d3_geo_forwardRotationλ(-δλ);
    return rotation;
  }
  function d3_geo_rotationφγ(δφ, δγ) {
    var cosδφ = Math.cos(δφ), sinδφ = Math.sin(δφ), cosδγ = Math.cos(δγ), sinδγ = Math.sin(δγ);
    function rotation(λ, φ) {
      var cosφ = Math.cos(φ), x = Math.cos(λ) * cosφ, y = Math.sin(λ) * cosφ, z = Math.sin(φ), k = z * cosδφ + x * sinδφ;
      return [ Math.atan2(y * cosδγ - k * sinδγ, x * cosδφ - z * sinδφ), Math.asin(Math.max(-1, Math.min(1, k * cosδγ + y * sinδγ))) ];
    }
    rotation.invert = function(λ, φ) {
      var cosφ = Math.cos(φ), x = Math.cos(λ) * cosφ, y = Math.sin(λ) * cosφ, z = Math.sin(φ), k = z * cosδγ - y * sinδγ;
      return [ Math.atan2(y * cosδγ + z * sinδγ, x * cosδφ + k * sinδφ), Math.asin(Math.max(-1, Math.min(1, k * cosδφ - x * sinδφ))) ];
    };
    return rotation;
  }
  d3.geo.circle = function() {
    var origin = [ 0, 0 ], angle, precision = 6, interpolate;
    function circle() {
      var center = typeof origin === "function" ? origin.apply(this, arguments) : origin, rotate = d3_geo_rotation(-center[0] * d3_radians, -center[1] * d3_radians, 0).invert, ring = [];
      interpolate(null, null, 1, {
        point: function(x, y) {
          ring.push(x = rotate(x, y));
          x[0] *= d3_degrees, x[1] *= d3_degrees;
        }
      });
      return {
        type: "Polygon",
        coordinates: [ ring ]
      };
    }
    circle.origin = function(x) {
      if (!arguments.length) return origin;
      origin = x;
      return circle;
    };
    circle.angle = function(x) {
      if (!arguments.length) return angle;
      interpolate = d3_geo_circleInterpolate((angle = +x) * d3_radians, precision * d3_radians);
      return circle;
    };
    circle.precision = function(_) {
      if (!arguments.length) return precision;
      interpolate = d3_geo_circleInterpolate(angle * d3_radians, (precision = +_) * d3_radians);
      return circle;
    };
    return circle.angle(90);
  };
  function d3_geo_circleInterpolate(radius, precision) {
    var cr = Math.cos(radius), sr = Math.sin(radius);
    return function(from, to, direction, listener) {
      if (from != null) {
        from = d3_geo_circleAngle(cr, from);
        to = d3_geo_circleAngle(cr, to);
        if (direction > 0 ? from < to : from > to) from += direction * 2 * π;
      } else {
        from = radius + direction * 2 * π;
        to = radius;
      }
      var point;
      for (var step = direction * precision, t = from; direction > 0 ? t > to : t < to; t -= step) {
        listener.point((point = d3_geo_spherical([ cr, -sr * Math.cos(t), -sr * Math.sin(t) ]))[0], point[1]);
      }
    };
  }
  function d3_geo_circleAngle(cr, point) {
    var a = d3_geo_cartesian(point);
    a[0] -= cr;
    d3_geo_cartesianNormalize(a);
    var angle = d3_acos(-a[1]);
    return ((-a[2] < 0 ? -angle : angle) + 2 * Math.PI - ε) % (2 * Math.PI);
  }
  d3.geo.distance = function(a, b) {
    var Δλ = (b[0] - a[0]) * d3_radians, φ0 = a[1] * d3_radians, φ1 = b[1] * d3_radians, sinΔλ = Math.sin(Δλ), cosΔλ = Math.cos(Δλ), sinφ0 = Math.sin(φ0), cosφ0 = Math.cos(φ0), sinφ1 = Math.sin(φ1), cosφ1 = Math.cos(φ1), t;
    return Math.atan2(Math.sqrt((t = cosφ1 * sinΔλ) * t + (t = cosφ0 * sinφ1 - sinφ0 * cosφ1 * cosΔλ) * t), sinφ0 * sinφ1 + cosφ0 * cosφ1 * cosΔλ);
  };
  d3.geo.graticule = function() {
    var x1, x0, X1, X0, y1, y0, Y1, Y0, dx = 10, dy = dx, DX = 90, DY = 360, x, y, X, Y, precision = 2.5;
    function graticule() {
      return {
        type: "MultiLineString",
        coordinates: lines()
      };
    }
    function lines() {
      return d3.range(Math.ceil(X0 / DX) * DX, X1, DX).map(X).concat(d3.range(Math.ceil(Y0 / DY) * DY, Y1, DY).map(Y)).concat(d3.range(Math.ceil(x0 / dx) * dx, x1, dx).filter(function(x) {
        return Math.abs(x % DX) > ε;
      }).map(x)).concat(d3.range(Math.ceil(y0 / dy) * dy, y1, dy).filter(function(y) {
        return Math.abs(y % DY) > ε;
      }).map(y));
    }
    graticule.lines = function() {
      return lines().map(function(coordinates) {
        return {
          type: "LineString",
          coordinates: coordinates
        };
      });
    };
    graticule.outline = function() {
      return {
        type: "Polygon",
        coordinates: [ X(X0).concat(Y(Y1).slice(1), X(X1).reverse().slice(1), Y(Y0).reverse().slice(1)) ]
      };
    };
    graticule.extent = function(_) {
      if (!arguments.length) return graticule.minorExtent();
      return graticule.majorExtent(_).minorExtent(_);
    };
    graticule.majorExtent = function(_) {
      if (!arguments.length) return [ [ X0, Y0 ], [ X1, Y1 ] ];
      X0 = +_[0][0], X1 = +_[1][0];
      Y0 = +_[0][1], Y1 = +_[1][1];
      if (X0 > X1) _ = X0, X0 = X1, X1 = _;
      if (Y0 > Y1) _ = Y0, Y0 = Y1, Y1 = _;
      return graticule.precision(precision);
    };
    graticule.minorExtent = function(_) {
      if (!arguments.length) return [ [ x0, y0 ], [ x1, y1 ] ];
      x0 = +_[0][0], x1 = +_[1][0];
      y0 = +_[0][1], y1 = +_[1][1];
      if (x0 > x1) _ = x0, x0 = x1, x1 = _;
      if (y0 > y1) _ = y0, y0 = y1, y1 = _;
      return graticule.precision(precision);
    };
    graticule.step = function(_) {
      if (!arguments.length) return graticule.minorStep();
      return graticule.majorStep(_).minorStep(_);
    };
    graticule.majorStep = function(_) {
      if (!arguments.length) return [ DX, DY ];
      DX = +_[0], DY = +_[1];
      return graticule;
    };
    graticule.minorStep = function(_) {
      if (!arguments.length) return [ dx, dy ];
      dx = +_[0], dy = +_[1];
      return graticule;
    };
    graticule.precision = function(_) {
      if (!arguments.length) return precision;
      precision = +_;
      x = d3_geo_graticuleX(y0, y1, 90);
      y = d3_geo_graticuleY(x0, x1, precision);
      X = d3_geo_graticuleX(Y0, Y1, 90);
      Y = d3_geo_graticuleY(X0, X1, precision);
      return graticule;
    };
    return graticule.majorExtent([ [ -180, -90 + ε ], [ 180, 90 - ε ] ]).minorExtent([ [ -180, -80 - ε ], [ 180, 80 + ε ] ]);
  };
  function d3_geo_graticuleX(y0, y1, dy) {
    var y = d3.range(y0, y1 - ε, dy).concat(y1);
    return function(x) {
      return y.map(function(y) {
        return [ x, y ];
      });
    };
  }
  function d3_geo_graticuleY(x0, x1, dx) {
    var x = d3.range(x0, x1 - ε, dx).concat(x1);
    return function(y) {
      return x.map(function(x) {
        return [ x, y ];
      });
    };
  }
  function d3_source(d) {
    return d.source;
  }
  function d3_target(d) {
    return d.target;
  }
  d3.geo.greatArc = function() {
    var source = d3_source, source_, target = d3_target, target_;
    function greatArc() {
      return {
        type: "LineString",
        coordinates: [ source_ || source.apply(this, arguments), target_ || target.apply(this, arguments) ]
      };
    }
    greatArc.distance = function() {
      return d3.geo.distance(source_ || source.apply(this, arguments), target_ || target.apply(this, arguments));
    };
    greatArc.source = function(_) {
      if (!arguments.length) return source;
      source = _, source_ = typeof _ === "function" ? null : _;
      return greatArc;
    };
    greatArc.target = function(_) {
      if (!arguments.length) return target;
      target = _, target_ = typeof _ === "function" ? null : _;
      return greatArc;
    };
    greatArc.precision = function() {
      return arguments.length ? greatArc : 0;
    };
    return greatArc;
  };
  d3.geo.interpolate = function(source, target) {
    return d3_geo_interpolate(source[0] * d3_radians, source[1] * d3_radians, target[0] * d3_radians, target[1] * d3_radians);
  };
  function d3_geo_interpolate(x0, y0, x1, y1) {
    var cy0 = Math.cos(y0), sy0 = Math.sin(y0), cy1 = Math.cos(y1), sy1 = Math.sin(y1), kx0 = cy0 * Math.cos(x0), ky0 = cy0 * Math.sin(x0), kx1 = cy1 * Math.cos(x1), ky1 = cy1 * Math.sin(x1), d = 2 * Math.asin(Math.sqrt(d3_haversin(y1 - y0) + cy0 * cy1 * d3_haversin(x1 - x0))), k = 1 / Math.sin(d);
    var interpolate = d ? function(t) {
      var B = Math.sin(t *= d) * k, A = Math.sin(d - t) * k, x = A * kx0 + B * kx1, y = A * ky0 + B * ky1, z = A * sy0 + B * sy1;
      return [ Math.atan2(y, x) * d3_degrees, Math.atan2(z, Math.sqrt(x * x + y * y)) * d3_degrees ];
    } : function() {
      return [ x0 * d3_degrees, y0 * d3_degrees ];
    };
    interpolate.distance = d;
    return interpolate;
  }
  d3.geo.length = function(object) {
    d3_geo_lengthSum = 0;
    d3.geo.stream(object, d3_geo_length);
    return d3_geo_lengthSum;
  };
  var d3_geo_lengthSum;
  var d3_geo_length = {
    sphere: d3_noop,
    point: d3_noop,
    lineStart: d3_geo_lengthLineStart,
    lineEnd: d3_noop,
    polygonStart: d3_noop,
    polygonEnd: d3_noop
  };
  function d3_geo_lengthLineStart() {
    var λ0, sinφ0, cosφ0;
    d3_geo_length.point = function(λ, φ) {
      λ0 = λ * d3_radians, sinφ0 = Math.sin(φ *= d3_radians), cosφ0 = Math.cos(φ);
      d3_geo_length.point = nextPoint;
    };
    d3_geo_length.lineEnd = function() {
      d3_geo_length.point = d3_geo_length.lineEnd = d3_noop;
    };
    function nextPoint(λ, φ) {
      var sinφ = Math.sin(φ *= d3_radians), cosφ = Math.cos(φ), t = Math.abs((λ *= d3_radians) - λ0), cosΔλ = Math.cos(t);
      d3_geo_lengthSum += Math.atan2(Math.sqrt((t = cosφ * Math.sin(t)) * t + (t = cosφ0 * sinφ - sinφ0 * cosφ * cosΔλ) * t), sinφ0 * sinφ + cosφ0 * cosφ * cosΔλ);
      λ0 = λ, sinφ0 = sinφ, cosφ0 = cosφ;
    }
  }
  function d3_geo_conic(projectAt) {
    var φ0 = 0, φ1 = π / 3, m = d3_geo_projectionMutator(projectAt), p = m(φ0, φ1);
    p.parallels = function(_) {
      if (!arguments.length) return [ φ0 / π * 180, φ1 / π * 180 ];
      return m(φ0 = _[0] * π / 180, φ1 = _[1] * π / 180);
    };
    return p;
  }
  function d3_geo_conicEqualArea(φ0, φ1) {
    var sinφ0 = Math.sin(φ0), n = (sinφ0 + Math.sin(φ1)) / 2, C = 1 + sinφ0 * (2 * n - sinφ0), ρ0 = Math.sqrt(C) / n;
    function forward(λ, φ) {
      var ρ = Math.sqrt(C - 2 * n * Math.sin(φ)) / n;
      return [ ρ * Math.sin(λ *= n), ρ0 - ρ * Math.cos(λ) ];
    }
    forward.invert = function(x, y) {
      var ρ0_y = ρ0 - y;
      return [ Math.atan2(x, ρ0_y) / n, Math.asin((C - (x * x + ρ0_y * ρ0_y) * n * n) / (2 * n)) ];
    };
    return forward;
  }
  (d3.geo.conicEqualArea = function() {
    return d3_geo_conic(d3_geo_conicEqualArea);
  }).raw = d3_geo_conicEqualArea;
  d3.geo.albersUsa = function() {
    var lower48 = d3.geo.conicEqualArea().rotate([ 98, 0 ]).center([ 0, 38 ]).parallels([ 29.5, 45.5 ]);
    var alaska = d3.geo.conicEqualArea().rotate([ 160, 0 ]).center([ 0, 60 ]).parallels([ 55, 65 ]);
    var hawaii = d3.geo.conicEqualArea().rotate([ 160, 0 ]).center([ 0, 20 ]).parallels([ 8, 18 ]);
    var puertoRico = d3.geo.conicEqualArea().rotate([ 60, 0 ]).center([ 0, 10 ]).parallels([ 8, 18 ]);
    var alaskaInvert, hawaiiInvert, puertoRicoInvert;
    function albersUsa(coordinates) {
      return projection(coordinates)(coordinates);
    }
    function projection(point) {
      var lon = point[0], lat = point[1];
      return lat > 50 ? alaska : lon < -140 ? hawaii : lat < 21 ? puertoRico : lower48;
    }
    albersUsa.invert = function(coordinates) {
      return alaskaInvert(coordinates) || hawaiiInvert(coordinates) || puertoRicoInvert(coordinates) || lower48.invert(coordinates);
    };
    albersUsa.scale = function(x) {
      if (!arguments.length) return lower48.scale();
      lower48.scale(x);
      alaska.scale(x * .6);
      hawaii.scale(x);
      puertoRico.scale(x * 1.5);
      return albersUsa.translate(lower48.translate());
    };
    albersUsa.translate = function(x) {
      if (!arguments.length) return lower48.translate();
      var dz = lower48.scale(), dx = x[0], dy = x[1];
      lower48.translate(x);
      alaska.translate([ dx - .4 * dz, dy + .17 * dz ]);
      hawaii.translate([ dx - .19 * dz, dy + .2 * dz ]);
      puertoRico.translate([ dx + .58 * dz, dy + .43 * dz ]);
      alaskaInvert = d3_geo_albersUsaInvert(alaska, [ [ -180, 50 ], [ -130, 72 ] ]);
      hawaiiInvert = d3_geo_albersUsaInvert(hawaii, [ [ -164, 18 ], [ -154, 24 ] ]);
      puertoRicoInvert = d3_geo_albersUsaInvert(puertoRico, [ [ -67.5, 17.5 ], [ -65, 19 ] ]);
      return albersUsa;
    };
    return albersUsa.scale(1e3);
  };
  function d3_geo_albersUsaInvert(projection, extent) {
    var a = projection(extent[0]), b = projection([ .5 * (extent[0][0] + extent[1][0]), extent[0][1] ]), c = projection([ extent[1][0], extent[0][1] ]), d = projection(extent[1]);
    var dya = b[1] - a[1], dxa = b[0] - a[0], dyb = c[1] - b[1], dxb = c[0] - b[0];
    var ma = dya / dxa, mb = dyb / dxb;
    var cx = .5 * (ma * mb * (a[1] - c[1]) + mb * (a[0] + b[0]) - ma * (b[0] + c[0])) / (mb - ma), cy = (.5 * (a[0] + b[0]) - cx) / ma + .5 * (a[1] + b[1]);
    var dx0 = d[0] - cx, dy0 = d[1] - cy, dx1 = a[0] - cx, dy1 = a[1] - cy, r0 = dx0 * dx0 + dy0 * dy0, r1 = dx1 * dx1 + dy1 * dy1;
    var a0 = Math.atan2(dy0, dx0), a1 = Math.atan2(dy1, dx1);
    return function(coordinates) {
      var dx = coordinates[0] - cx, dy = coordinates[1] - cy, r = dx * dx + dy * dy, a = Math.atan2(dy, dx);
      if (r0 < r && r < r1 && a0 < a && a < a1) return projection.invert(coordinates);
    };
  }
  var d3_geo_pathAreaSum, d3_geo_pathAreaPolygon, d3_geo_pathArea = {
    point: d3_noop,
    lineStart: d3_noop,
    lineEnd: d3_noop,
    polygonStart: function() {
      d3_geo_pathAreaPolygon = 0;
      d3_geo_pathArea.lineStart = d3_geo_pathAreaRingStart;
    },
    polygonEnd: function() {
      d3_geo_pathArea.lineStart = d3_geo_pathArea.lineEnd = d3_geo_pathArea.point = d3_noop;
      d3_geo_pathAreaSum += Math.abs(d3_geo_pathAreaPolygon / 2);
    }
  };
  function d3_geo_pathAreaRingStart() {
    var x00, y00, x0, y0;
    d3_geo_pathArea.point = function(x, y) {
      d3_geo_pathArea.point = nextPoint;
      x00 = x0 = x, y00 = y0 = y;
    };
    function nextPoint(x, y) {
      d3_geo_pathAreaPolygon += y0 * x - x0 * y;
      x0 = x, y0 = y;
    }
    d3_geo_pathArea.lineEnd = function() {
      nextPoint(x00, y00);
    };
  }
  function d3_geo_pathBuffer() {
    var pointCircle = d3_geo_pathCircle(4.5), buffer = [];
    var stream = {
      point: point,
      lineStart: function() {
        stream.point = pointLineStart;
      },
      lineEnd: lineEnd,
      polygonStart: function() {
        stream.lineEnd = lineEndPolygon;
      },
      polygonEnd: function() {
        stream.lineEnd = lineEnd;
        stream.point = point;
      },
      pointRadius: function(_) {
        pointCircle = d3_geo_pathCircle(_);
        return stream;
      },
      result: function() {
        if (buffer.length) {
          var result = buffer.join("");
          buffer = [];
          return result;
        }
      }
    };
    function point(x, y) {
      buffer.push("M", x, ",", y, pointCircle);
    }
    function pointLineStart(x, y) {
      buffer.push("M", x, ",", y);
      stream.point = pointLine;
    }
    function pointLine(x, y) {
      buffer.push("L", x, ",", y);
    }
    function lineEnd() {
      stream.point = point;
    }
    function lineEndPolygon() {
      buffer.push("Z");
    }
    return stream;
  }
  var d3_geo_pathCentroid = {
    point: d3_geo_pathCentroidPoint,
    lineStart: d3_geo_pathCentroidLineStart,
    lineEnd: d3_geo_pathCentroidLineEnd,
    polygonStart: function() {
      d3_geo_pathCentroid.lineStart = d3_geo_pathCentroidRingStart;
    },
    polygonEnd: function() {
      d3_geo_pathCentroid.point = d3_geo_pathCentroidPoint;
      d3_geo_pathCentroid.lineStart = d3_geo_pathCentroidLineStart;
      d3_geo_pathCentroid.lineEnd = d3_geo_pathCentroidLineEnd;
    }
  };
  function d3_geo_pathCentroidPoint(x, y) {
    if (d3_geo_centroidDimension) return;
    d3_geo_centroidX += x;
    d3_geo_centroidY += y;
    ++d3_geo_centroidZ;
  }
  function d3_geo_pathCentroidLineStart() {
    var x0, y0;
    if (d3_geo_centroidDimension !== 1) {
      if (d3_geo_centroidDimension < 1) {
        d3_geo_centroidDimension = 1;
        d3_geo_centroidX = d3_geo_centroidY = d3_geo_centroidZ = 0;
      } else return;
    }
    d3_geo_pathCentroid.point = function(x, y) {
      d3_geo_pathCentroid.point = nextPoint;
      x0 = x, y0 = y;
    };
    function nextPoint(x, y) {
      var dx = x - x0, dy = y - y0, z = Math.sqrt(dx * dx + dy * dy);
      d3_geo_centroidX += z * (x0 + x) / 2;
      d3_geo_centroidY += z * (y0 + y) / 2;
      d3_geo_centroidZ += z;
      x0 = x, y0 = y;
    }
  }
  function d3_geo_pathCentroidLineEnd() {
    d3_geo_pathCentroid.point = d3_geo_pathCentroidPoint;
  }
  function d3_geo_pathCentroidRingStart() {
    var x00, y00, x0, y0;
    if (d3_geo_centroidDimension < 2) {
      d3_geo_centroidDimension = 2;
      d3_geo_centroidX = d3_geo_centroidY = d3_geo_centroidZ = 0;
    }
    d3_geo_pathCentroid.point = function(x, y) {
      d3_geo_pathCentroid.point = nextPoint;
      x00 = x0 = x, y00 = y0 = y;
    };
    function nextPoint(x, y) {
      var z = y0 * x - x0 * y;
      d3_geo_centroidX += z * (x0 + x);
      d3_geo_centroidY += z * (y0 + y);
      d3_geo_centroidZ += z * 3;
      x0 = x, y0 = y;
    }
    d3_geo_pathCentroid.lineEnd = function() {
      nextPoint(x00, y00);
    };
  }
  function d3_geo_pathContext(context) {
    var pointRadius = 4.5;
    var stream = {
      point: point,
      lineStart: function() {
        stream.point = pointLineStart;
      },
      lineEnd: lineEnd,
      polygonStart: function() {
        stream.lineEnd = lineEndPolygon;
      },
      polygonEnd: function() {
        stream.lineEnd = lineEnd;
        stream.point = point;
      },
      pointRadius: function(_) {
        pointRadius = _;
        return stream;
      },
      result: d3_noop
    };
    function point(x, y) {
      context.moveTo(x, y);
      context.arc(x, y, pointRadius, 0, 2 * π);
    }
    function pointLineStart(x, y) {
      context.moveTo(x, y);
      stream.point = pointLine;
    }
    function pointLine(x, y) {
      context.lineTo(x, y);
    }
    function lineEnd() {
      stream.point = point;
    }
    function lineEndPolygon() {
      context.closePath();
    }
    return stream;
  }
  d3.geo.path = function() {
    var pointRadius = 4.5, projection, context, projectStream, contextStream;
    function path(object) {
      if (object) d3.geo.stream(object, projectStream(contextStream.pointRadius(typeof pointRadius === "function" ? +pointRadius.apply(this, arguments) : pointRadius)));
      return contextStream.result();
    }
    path.area = function(object) {
      d3_geo_pathAreaSum = 0;
      d3.geo.stream(object, projectStream(d3_geo_pathArea));
      return d3_geo_pathAreaSum;
    };
    path.centroid = function(object) {
      d3_geo_centroidDimension = d3_geo_centroidX = d3_geo_centroidY = d3_geo_centroidZ = 0;
      d3.geo.stream(object, projectStream(d3_geo_pathCentroid));
      return d3_geo_centroidZ ? [ d3_geo_centroidX / d3_geo_centroidZ, d3_geo_centroidY / d3_geo_centroidZ ] : undefined;
    };
    path.bounds = function(object) {
      return d3_geo_bounds(projectStream)(object);
    };
    path.projection = function(_) {
      if (!arguments.length) return projection;
      projectStream = (projection = _) ? _.stream || d3_geo_pathProjectStream(_) : d3_identity;
      return path;
    };
    path.context = function(_) {
      if (!arguments.length) return context;
      contextStream = (context = _) == null ? new d3_geo_pathBuffer() : new d3_geo_pathContext(_);
      return path;
    };
    path.pointRadius = function(_) {
      if (!arguments.length) return pointRadius;
      pointRadius = typeof _ === "function" ? _ : +_;
      return path;
    };
    return path.projection(d3.geo.albersUsa()).context(null);
  };
  function d3_geo_pathCircle(radius) {
    return "m0," + radius + "a" + radius + "," + radius + " 0 1,1 0," + -2 * radius + "a" + radius + "," + radius + " 0 1,1 0," + +2 * radius + "z";
  }
  function d3_geo_pathProjectStream(project) {
    var resample = d3_geo_resample(function(λ, φ) {
      return project([ λ * d3_degrees, φ * d3_degrees ]);
    });
    return function(stream) {
      stream = resample(stream);
      return {
        point: function(λ, φ) {
          stream.point(λ * d3_radians, φ * d3_radians);
        },
        sphere: function() {
          stream.sphere();
        },
        lineStart: function() {
          stream.lineStart();
        },
        lineEnd: function() {
          stream.lineEnd();
        },
        polygonStart: function() {
          stream.polygonStart();
        },
        polygonEnd: function() {
          stream.polygonEnd();
        }
      };
    };
  }
  d3.geo.albers = function() {
    return d3.geo.conicEqualArea().parallels([ 29.5, 45.5 ]).rotate([ 98, 0 ]).center([ 0, 38 ]).scale(1e3);
  };
  function d3_geo_azimuthal(scale, angle) {
    function azimuthal(λ, φ) {
      var cosλ = Math.cos(λ), cosφ = Math.cos(φ), k = scale(cosλ * cosφ);
      return [ k * cosφ * Math.sin(λ), k * Math.sin(φ) ];
    }
    azimuthal.invert = function(x, y) {
      var ρ = Math.sqrt(x * x + y * y), c = angle(ρ), sinc = Math.sin(c), cosc = Math.cos(c);
      return [ Math.atan2(x * sinc, ρ * cosc), Math.asin(ρ && y * sinc / ρ) ];
    };
    return azimuthal;
  }
  var d3_geo_azimuthalEqualArea = d3_geo_azimuthal(function(cosλcosφ) {
    return Math.sqrt(2 / (1 + cosλcosφ));
  }, function(ρ) {
    return 2 * Math.asin(ρ / 2);
  });
  (d3.geo.azimuthalEqualArea = function() {
    return d3_geo_projection(d3_geo_azimuthalEqualArea);
  }).raw = d3_geo_azimuthalEqualArea;
  var d3_geo_azimuthalEquidistant = d3_geo_azimuthal(function(cosλcosφ) {
    var c = Math.acos(cosλcosφ);
    return c && c / Math.sin(c);
  }, d3_identity);
  (d3.geo.azimuthalEquidistant = function() {
    return d3_geo_projection(d3_geo_azimuthalEquidistant);
  }).raw = d3_geo_azimuthalEquidistant;
  function d3_geo_conicConformal(φ0, φ1) {
    var cosφ0 = Math.cos(φ0), t = function(φ) {
      return Math.tan(π / 4 + φ / 2);
    }, n = φ0 === φ1 ? Math.sin(φ0) : Math.log(cosφ0 / Math.cos(φ1)) / Math.log(t(φ1) / t(φ0)), F = cosφ0 * Math.pow(t(φ0), n) / n;
    if (!n) return d3_geo_mercator;
    function forward(λ, φ) {
      var ρ = Math.abs(Math.abs(φ) - π / 2) < ε ? 0 : F / Math.pow(t(φ), n);
      return [ ρ * Math.sin(n * λ), F - ρ * Math.cos(n * λ) ];
    }
    forward.invert = function(x, y) {
      var ρ0_y = F - y, ρ = d3_sgn(n) * Math.sqrt(x * x + ρ0_y * ρ0_y);
      return [ Math.atan2(x, ρ0_y) / n, 2 * Math.atan(Math.pow(F / ρ, 1 / n)) - π / 2 ];
    };
    return forward;
  }
  (d3.geo.conicConformal = function() {
    return d3_geo_conic(d3_geo_conicConformal);
  }).raw = d3_geo_conicConformal;
  function d3_geo_conicEquidistant(φ0, φ1) {
    var cosφ0 = Math.cos(φ0), n = φ0 === φ1 ? Math.sin(φ0) : (cosφ0 - Math.cos(φ1)) / (φ1 - φ0), G = cosφ0 / n + φ0;
    if (Math.abs(n) < ε) return d3_geo_equirectangular;
    function forward(λ, φ) {
      var ρ = G - φ;
      return [ ρ * Math.sin(n * λ), G - ρ * Math.cos(n * λ) ];
    }
    forward.invert = function(x, y) {
      var ρ0_y = G - y;
      return [ Math.atan2(x, ρ0_y) / n, G - d3_sgn(n) * Math.sqrt(x * x + ρ0_y * ρ0_y) ];
    };
    return forward;
  }
  (d3.geo.conicEquidistant = function() {
    return d3_geo_conic(d3_geo_conicEquidistant);
  }).raw = d3_geo_conicEquidistant;
  var d3_geo_gnomonic = d3_geo_azimuthal(function(cosλcosφ) {
    return 1 / cosλcosφ;
  }, Math.atan);
  (d3.geo.gnomonic = function() {
    return d3_geo_projection(d3_geo_gnomonic);
  }).raw = d3_geo_gnomonic;
  function d3_geo_mercator(λ, φ) {
    return [ λ, Math.log(Math.tan(π / 4 + φ / 2)) ];
  }
  d3_geo_mercator.invert = function(x, y) {
    return [ x, 2 * Math.atan(Math.exp(y)) - π / 2 ];
  };
  function d3_geo_mercatorProjection(project) {
    var m = d3_geo_projection(project), scale = m.scale, translate = m.translate, clipExtent = m.clipExtent, clipAuto;
    m.scale = function() {
      var v = scale.apply(m, arguments);
      return v === m ? clipAuto ? m.clipExtent(null) : m : v;
    };
    m.translate = function() {
      var v = translate.apply(m, arguments);
      return v === m ? clipAuto ? m.clipExtent(null) : m : v;
    };
    m.clipExtent = function(_) {
      var v = clipExtent.apply(m, arguments);
      if (v === m) {
        if (clipAuto = _ == null) {
          var k = π * scale(), t = translate();
          clipExtent([ [ t[0] - k, t[1] - k ], [ t[0] + k, t[1] + k ] ]);
        }
      } else if (clipAuto) {
        v = null;
      }
      return v;
    };
    return m.clipExtent(null);
  }
  (d3.geo.mercator = function() {
    return d3_geo_mercatorProjection(d3_geo_mercator);
  }).raw = d3_geo_mercator;
  var d3_geo_orthographic = d3_geo_azimuthal(function() {
    return 1;
  }, Math.asin);
  (d3.geo.orthographic = function() {
    return d3_geo_projection(d3_geo_orthographic);
  }).raw = d3_geo_orthographic;
  var d3_geo_stereographic = d3_geo_azimuthal(function(cosλcosφ) {
    return 1 / (1 + cosλcosφ);
  }, function(ρ) {
    return 2 * Math.atan(ρ);
  });
  (d3.geo.stereographic = function() {
    return d3_geo_projection(d3_geo_stereographic);
  }).raw = d3_geo_stereographic;
  function d3_geo_transverseMercator(λ, φ) {
    var B = Math.cos(φ) * Math.sin(λ);
    return [ Math.log((1 + B) / (1 - B)) / 2, Math.atan2(Math.tan(φ), Math.cos(λ)) ];
  }
  d3_geo_transverseMercator.invert = function(x, y) {
    return [ Math.atan2(d3_sinh(x), Math.cos(y)), d3_asin(Math.sin(y) / d3_cosh(x)) ];
  };
  (d3.geo.transverseMercator = function() {
    return d3_geo_mercatorProjection(d3_geo_transverseMercator);
  }).raw = d3_geo_transverseMercator;
  d3.geom = {};
  d3.svg = {};
  function d3_svg_line(projection) {
    var x = d3_svg_lineX, y = d3_svg_lineY, defined = d3_true, interpolate = d3_svg_lineLinear, interpolateKey = interpolate.key, tension = .7;
    function line(data) {
      var segments = [], points = [], i = -1, n = data.length, d, fx = d3_functor(x), fy = d3_functor(y);
      function segment() {
        segments.push("M", interpolate(projection(points), tension));
      }
      while (++i < n) {
        if (defined.call(this, d = data[i], i)) {
          points.push([ +fx.call(this, d, i), +fy.call(this, d, i) ]);
        } else if (points.length) {
          segment();
          points = [];
        }
      }
      if (points.length) segment();
      return segments.length ? segments.join("") : null;
    }
    line.x = function(_) {
      if (!arguments.length) return x;
      x = _;
      return line;
    };
    line.y = function(_) {
      if (!arguments.length) return y;
      y = _;
      return line;
    };
    line.defined = function(_) {
      if (!arguments.length) return defined;
      defined = _;
      return line;
    };
    line.interpolate = function(_) {
      if (!arguments.length) return interpolateKey;
      if (typeof _ === "function") interpolateKey = interpolate = _; else interpolateKey = (interpolate = d3_svg_lineInterpolators.get(_) || d3_svg_lineLinear).key;
      return line;
    };
    line.tension = function(_) {
      if (!arguments.length) return tension;
      tension = _;
      return line;
    };
    return line;
  }
  d3.svg.line = function() {
    return d3_svg_line(d3_identity);
  };
  function d3_svg_lineX(d) {
    return d[0];
  }
  function d3_svg_lineY(d) {
    return d[1];
  }
  var d3_svg_lineInterpolators = d3.map({
    linear: d3_svg_lineLinear,
    "linear-closed": d3_svg_lineLinearClosed,
    "step-before": d3_svg_lineStepBefore,
    "step-after": d3_svg_lineStepAfter,
    basis: d3_svg_lineBasis,
    "basis-open": d3_svg_lineBasisOpen,
    "basis-closed": d3_svg_lineBasisClosed,
    bundle: d3_svg_lineBundle,
    cardinal: d3_svg_lineCardinal,
    "cardinal-open": d3_svg_lineCardinalOpen,
    "cardinal-closed": d3_svg_lineCardinalClosed,
    monotone: d3_svg_lineMonotone
  });
  d3_svg_lineInterpolators.forEach(function(key, value) {
    value.key = key;
    value.closed = /-closed$/.test(key);
  });
  function d3_svg_lineLinear(points) {
    return points.join("L");
  }
  function d3_svg_lineLinearClosed(points) {
    return d3_svg_lineLinear(points) + "Z";
  }
  function d3_svg_lineStepBefore(points) {
    var i = 0, n = points.length, p = points[0], path = [ p[0], ",", p[1] ];
    while (++i < n) path.push("V", (p = points[i])[1], "H", p[0]);
    return path.join("");
  }
  function d3_svg_lineStepAfter(points) {
    var i = 0, n = points.length, p = points[0], path = [ p[0], ",", p[1] ];
    while (++i < n) path.push("H", (p = points[i])[0], "V", p[1]);
    return path.join("");
  }
  function d3_svg_lineCardinalOpen(points, tension) {
    return points.length < 4 ? d3_svg_lineLinear(points) : points[1] + d3_svg_lineHermite(points.slice(1, points.length - 1), d3_svg_lineCardinalTangents(points, tension));
  }
  function d3_svg_lineCardinalClosed(points, tension) {
    return points.length < 3 ? d3_svg_lineLinear(points) : points[0] + d3_svg_lineHermite((points.push(points[0]), 
    points), d3_svg_lineCardinalTangents([ points[points.length - 2] ].concat(points, [ points[1] ]), tension));
  }
  function d3_svg_lineCardinal(points, tension) {
    return points.length < 3 ? d3_svg_lineLinear(points) : points[0] + d3_svg_lineHermite(points, d3_svg_lineCardinalTangents(points, tension));
  }
  function d3_svg_lineHermite(points, tangents) {
    if (tangents.length < 1 || points.length != tangents.length && points.length != tangents.length + 2) {
      return d3_svg_lineLinear(points);
    }
    var quad = points.length != tangents.length, path = "", p0 = points[0], p = points[1], t0 = tangents[0], t = t0, pi = 1;
    if (quad) {
      path += "Q" + (p[0] - t0[0] * 2 / 3) + "," + (p[1] - t0[1] * 2 / 3) + "," + p[0] + "," + p[1];
      p0 = points[1];
      pi = 2;
    }
    if (tangents.length > 1) {
      t = tangents[1];
      p = points[pi];
      pi++;
      path += "C" + (p0[0] + t0[0]) + "," + (p0[1] + t0[1]) + "," + (p[0] - t[0]) + "," + (p[1] - t[1]) + "," + p[0] + "," + p[1];
      for (var i = 2; i < tangents.length; i++, pi++) {
        p = points[pi];
        t = tangents[i];
        path += "S" + (p[0] - t[0]) + "," + (p[1] - t[1]) + "," + p[0] + "," + p[1];
      }
    }
    if (quad) {
      var lp = points[pi];
      path += "Q" + (p[0] + t[0] * 2 / 3) + "," + (p[1] + t[1] * 2 / 3) + "," + lp[0] + "," + lp[1];
    }
    return path;
  }
  function d3_svg_lineCardinalTangents(points, tension) {
    var tangents = [], a = (1 - tension) / 2, p0, p1 = points[0], p2 = points[1], i = 1, n = points.length;
    while (++i < n) {
      p0 = p1;
      p1 = p2;
      p2 = points[i];
      tangents.push([ a * (p2[0] - p0[0]), a * (p2[1] - p0[1]) ]);
    }
    return tangents;
  }
  function d3_svg_lineBasis(points) {
    if (points.length < 3) return d3_svg_lineLinear(points);
    var i = 1, n = points.length, pi = points[0], x0 = pi[0], y0 = pi[1], px = [ x0, x0, x0, (pi = points[1])[0] ], py = [ y0, y0, y0, pi[1] ], path = [ x0, ",", y0 ];
    d3_svg_lineBasisBezier(path, px, py);
    while (++i < n) {
      pi = points[i];
      px.shift();
      px.push(pi[0]);
      py.shift();
      py.push(pi[1]);
      d3_svg_lineBasisBezier(path, px, py);
    }
    i = -1;
    while (++i < 2) {
      px.shift();
      px.push(pi[0]);
      py.shift();
      py.push(pi[1]);
      d3_svg_lineBasisBezier(path, px, py);
    }
    return path.join("");
  }
  function d3_svg_lineBasisOpen(points) {
    if (points.length < 4) return d3_svg_lineLinear(points);
    var path = [], i = -1, n = points.length, pi, px = [ 0 ], py = [ 0 ];
    while (++i < 3) {
      pi = points[i];
      px.push(pi[0]);
      py.push(pi[1]);
    }
    path.push(d3_svg_lineDot4(d3_svg_lineBasisBezier3, px) + "," + d3_svg_lineDot4(d3_svg_lineBasisBezier3, py));
    --i;
    while (++i < n) {
      pi = points[i];
      px.shift();
      px.push(pi[0]);
      py.shift();
      py.push(pi[1]);
      d3_svg_lineBasisBezier(path, px, py);
    }
    return path.join("");
  }
  function d3_svg_lineBasisClosed(points) {
    var path, i = -1, n = points.length, m = n + 4, pi, px = [], py = [];
    while (++i < 4) {
      pi = points[i % n];
      px.push(pi[0]);
      py.push(pi[1]);
    }
    path = [ d3_svg_lineDot4(d3_svg_lineBasisBezier3, px), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier3, py) ];
    --i;
    while (++i < m) {
      pi = points[i % n];
      px.shift();
      px.push(pi[0]);
      py.shift();
      py.push(pi[1]);
      d3_svg_lineBasisBezier(path, px, py);
    }
    return path.join("");
  }
  function d3_svg_lineBundle(points, tension) {
    var n = points.length - 1;
    if (n) {
      var x0 = points[0][0], y0 = points[0][1], dx = points[n][0] - x0, dy = points[n][1] - y0, i = -1, p, t;
      while (++i <= n) {
        p = points[i];
        t = i / n;
        p[0] = tension * p[0] + (1 - tension) * (x0 + t * dx);
        p[1] = tension * p[1] + (1 - tension) * (y0 + t * dy);
      }
    }
    return d3_svg_lineBasis(points);
  }
  function d3_svg_lineDot4(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
  }
  var d3_svg_lineBasisBezier1 = [ 0, 2 / 3, 1 / 3, 0 ], d3_svg_lineBasisBezier2 = [ 0, 1 / 3, 2 / 3, 0 ], d3_svg_lineBasisBezier3 = [ 0, 1 / 6, 2 / 3, 1 / 6 ];
  function d3_svg_lineBasisBezier(path, x, y) {
    path.push("C", d3_svg_lineDot4(d3_svg_lineBasisBezier1, x), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier1, y), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier2, x), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier2, y), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier3, x), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier3, y));
  }
  function d3_svg_lineSlope(p0, p1) {
    return (p1[1] - p0[1]) / (p1[0] - p0[0]);
  }
  function d3_svg_lineFiniteDifferences(points) {
    var i = 0, j = points.length - 1, m = [], p0 = points[0], p1 = points[1], d = m[0] = d3_svg_lineSlope(p0, p1);
    while (++i < j) {
      m[i] = (d + (d = d3_svg_lineSlope(p0 = p1, p1 = points[i + 1]))) / 2;
    }
    m[i] = d;
    return m;
  }
  function d3_svg_lineMonotoneTangents(points) {
    var tangents = [], d, a, b, s, m = d3_svg_lineFiniteDifferences(points), i = -1, j = points.length - 1;
    while (++i < j) {
      d = d3_svg_lineSlope(points[i], points[i + 1]);
      if (Math.abs(d) < 1e-6) {
        m[i] = m[i + 1] = 0;
      } else {
        a = m[i] / d;
        b = m[i + 1] / d;
        s = a * a + b * b;
        if (s > 9) {
          s = d * 3 / Math.sqrt(s);
          m[i] = s * a;
          m[i + 1] = s * b;
        }
      }
    }
    i = -1;
    while (++i <= j) {
      s = (points[Math.min(j, i + 1)][0] - points[Math.max(0, i - 1)][0]) / (6 * (1 + m[i] * m[i]));
      tangents.push([ s || 0, m[i] * s || 0 ]);
    }
    return tangents;
  }
  function d3_svg_lineMonotone(points) {
    return points.length < 3 ? d3_svg_lineLinear(points) : points[0] + d3_svg_lineHermite(points, d3_svg_lineMonotoneTangents(points));
  }
  d3.geom.hull = function(vertices) {
    var x = d3_svg_lineX, y = d3_svg_lineY;
    if (arguments.length) return hull(vertices);
    function hull(data) {
      if (data.length < 3) return [];
      var fx = d3_functor(x), fy = d3_functor(y), n = data.length, vertices, plen = n - 1, points = [], stack = [], d, i, j, h = 0, x1, y1, x2, y2, u, v, a, sp;
      if (fx === d3_svg_lineX && y === d3_svg_lineY) vertices = data; else for (i = 0, 
      vertices = []; i < n; ++i) {
        vertices.push([ +fx.call(this, d = data[i], i), +fy.call(this, d, i) ]);
      }
      for (i = 1; i < n; ++i) {
        if (vertices[i][1] < vertices[h][1]) {
          h = i;
        } else if (vertices[i][1] == vertices[h][1]) {
          h = vertices[i][0] < vertices[h][0] ? i : h;
        }
      }
      for (i = 0; i < n; ++i) {
        if (i === h) continue;
        y1 = vertices[i][1] - vertices[h][1];
        x1 = vertices[i][0] - vertices[h][0];
        points.push({
          angle: Math.atan2(y1, x1),
          index: i
        });
      }
      points.sort(function(a, b) {
        return a.angle - b.angle;
      });
      a = points[0].angle;
      v = points[0].index;
      u = 0;
      for (i = 1; i < plen; ++i) {
        j = points[i].index;
        if (a == points[i].angle) {
          x1 = vertices[v][0] - vertices[h][0];
          y1 = vertices[v][1] - vertices[h][1];
          x2 = vertices[j][0] - vertices[h][0];
          y2 = vertices[j][1] - vertices[h][1];
          if (x1 * x1 + y1 * y1 >= x2 * x2 + y2 * y2) {
            points[i].index = -1;
          } else {
            points[u].index = -1;
            a = points[i].angle;
            u = i;
            v = j;
          }
        } else {
          a = points[i].angle;
          u = i;
          v = j;
        }
      }
      stack.push(h);
      for (i = 0, j = 0; i < 2; ++j) {
        if (points[j].index !== -1) {
          stack.push(points[j].index);
          i++;
        }
      }
      sp = stack.length;
      for (;j < plen; ++j) {
        if (points[j].index === -1) continue;
        while (!d3_geom_hullCCW(stack[sp - 2], stack[sp - 1], points[j].index, vertices)) {
          --sp;
        }
        stack[sp++] = points[j].index;
      }
      var poly = [];
      for (i = 0; i < sp; ++i) {
        poly.push(data[stack[i]]);
      }
      return poly;
    }
    hull.x = function(_) {
      return arguments.length ? (x = _, hull) : x;
    };
    hull.y = function(_) {
      return arguments.length ? (y = _, hull) : y;
    };
    return hull;
  };
  function d3_geom_hullCCW(i1, i2, i3, v) {
    var t, a, b, c, d, e, f;
    t = v[i1];
    a = t[0];
    b = t[1];
    t = v[i2];
    c = t[0];
    d = t[1];
    t = v[i3];
    e = t[0];
    f = t[1];
    return (f - b) * (c - a) - (d - b) * (e - a) > 0;
  }
  d3.geom.polygon = function(coordinates) {
    coordinates.area = function() {
      var i = 0, n = coordinates.length, area = coordinates[n - 1][1] * coordinates[0][0] - coordinates[n - 1][0] * coordinates[0][1];
      while (++i < n) {
        area += coordinates[i - 1][1] * coordinates[i][0] - coordinates[i - 1][0] * coordinates[i][1];
      }
      return area * .5;
    };
    coordinates.centroid = function(k) {
      var i = -1, n = coordinates.length, x = 0, y = 0, a, b = coordinates[n - 1], c;
      if (!arguments.length) k = -1 / (6 * coordinates.area());
      while (++i < n) {
        a = b;
        b = coordinates[i];
        c = a[0] * b[1] - b[0] * a[1];
        x += (a[0] + b[0]) * c;
        y += (a[1] + b[1]) * c;
      }
      return [ x * k, y * k ];
    };
    coordinates.clip = function(subject) {
      var input, i = -1, n = coordinates.length, j, m, a = coordinates[n - 1], b, c, d;
      while (++i < n) {
        input = subject.slice();
        subject.length = 0;
        b = coordinates[i];
        c = input[(m = input.length) - 1];
        j = -1;
        while (++j < m) {
          d = input[j];
          if (d3_geom_polygonInside(d, a, b)) {
            if (!d3_geom_polygonInside(c, a, b)) {
              subject.push(d3_geom_polygonIntersect(c, d, a, b));
            }
            subject.push(d);
          } else if (d3_geom_polygonInside(c, a, b)) {
            subject.push(d3_geom_polygonIntersect(c, d, a, b));
          }
          c = d;
        }
        a = b;
      }
      return subject;
    };
    return coordinates;
  };
  function d3_geom_polygonInside(p, a, b) {
    return (b[0] - a[0]) * (p[1] - a[1]) < (b[1] - a[1]) * (p[0] - a[0]);
  }
  function d3_geom_polygonIntersect(c, d, a, b) {
    var x1 = c[0], x3 = a[0], x21 = d[0] - x1, x43 = b[0] - x3, y1 = c[1], y3 = a[1], y21 = d[1] - y1, y43 = b[1] - y3, ua = (x43 * (y1 - y3) - y43 * (x1 - x3)) / (y43 * x21 - x43 * y21);
    return [ x1 + ua * x21, y1 + ua * y21 ];
  }
  d3.geom.delaunay = function(vertices) {
    var edges = vertices.map(function() {
      return [];
    }), triangles = [];
    d3_geom_voronoiTessellate(vertices, function(e) {
      edges[e.region.l.index].push(vertices[e.region.r.index]);
    });
    edges.forEach(function(edge, i) {
      var v = vertices[i], cx = v[0], cy = v[1];
      edge.forEach(function(v) {
        v.angle = Math.atan2(v[0] - cx, v[1] - cy);
      });
      edge.sort(function(a, b) {
        return a.angle - b.angle;
      });
      for (var j = 0, m = edge.length - 1; j < m; j++) {
        triangles.push([ v, edge[j], edge[j + 1] ]);
      }
    });
    return triangles;
  };
  d3.geom.voronoi = function(points) {
    var size = null, x = d3_svg_lineX, y = d3_svg_lineY, clip;
    if (arguments.length) return voronoi(points);
    function voronoi(data) {
      var points, polygons = data.map(function() {
        return [];
      }), fx = d3_functor(x), fy = d3_functor(y), d, i, n = data.length, Z = 1e6;
      if (fx === d3_svg_lineX && fy === d3_svg_lineY) points = data; else for (points = [], 
      i = 0; i < n; ++i) {
        points.push([ +fx.call(this, d = data[i], i), +fy.call(this, d, i) ]);
      }
      d3_geom_voronoiTessellate(points, function(e) {
        var s1, s2, x1, x2, y1, y2;
        if (e.a === 1 && e.b >= 0) {
          s1 = e.ep.r;
          s2 = e.ep.l;
        } else {
          s1 = e.ep.l;
          s2 = e.ep.r;
        }
        if (e.a === 1) {
          y1 = s1 ? s1.y : -Z;
          x1 = e.c - e.b * y1;
          y2 = s2 ? s2.y : Z;
          x2 = e.c - e.b * y2;
        } else {
          x1 = s1 ? s1.x : -Z;
          y1 = e.c - e.a * x1;
          x2 = s2 ? s2.x : Z;
          y2 = e.c - e.a * x2;
        }
        var v1 = [ x1, y1 ], v2 = [ x2, y2 ];
        polygons[e.region.l.index].push(v1, v2);
        polygons[e.region.r.index].push(v1, v2);
      });
      polygons = polygons.map(function(polygon, i) {
        var cx = points[i][0], cy = points[i][1], angle = polygon.map(function(v) {
          return Math.atan2(v[0] - cx, v[1] - cy);
        }), order = d3.range(polygon.length).sort(function(a, b) {
          return angle[a] - angle[b];
        });
        return order.filter(function(d, i) {
          return !i || angle[d] - angle[order[i - 1]] > ε;
        }).map(function(d) {
          return polygon[d];
        });
      });
      polygons.forEach(function(polygon, i) {
        var n = polygon.length;
        if (!n) return polygon.push([ -Z, -Z ], [ -Z, Z ], [ Z, Z ], [ Z, -Z ]);
        if (n > 2) return;
        var p0 = points[i], p1 = polygon[0], p2 = polygon[1], x0 = p0[0], y0 = p0[1], x1 = p1[0], y1 = p1[1], x2 = p2[0], y2 = p2[1], dx = Math.abs(x2 - x1), dy = y2 - y1;
        if (Math.abs(dy) < ε) {
          var y = y0 < y1 ? -Z : Z;
          polygon.push([ -Z, y ], [ Z, y ]);
        } else if (dx < ε) {
          var x = x0 < x1 ? -Z : Z;
          polygon.push([ x, -Z ], [ x, Z ]);
        } else {
          var y = (x2 - x1) * (y1 - y0) < (x1 - x0) * (y2 - y1) ? Z : -Z, z = Math.abs(dy) - dx;
          if (Math.abs(z) < ε) {
            polygon.push([ dy < 0 ? y : -y, y ]);
          } else {
            if (z > 0) y *= -1;
            polygon.push([ -Z, y ], [ Z, y ]);
          }
        }
      });
      if (clip) for (i = 0; i < n; ++i) clip(polygons[i]);
      for (i = 0; i < n; ++i) polygons[i].point = data[i];
      return polygons;
    }
    voronoi.x = function(_) {
      return arguments.length ? (x = _, voronoi) : x;
    };
    voronoi.y = function(_) {
      return arguments.length ? (y = _, voronoi) : y;
    };
    voronoi.size = function(_) {
      if (!arguments.length) return size;
      if (_ == null) {
        clip = null;
      } else {
        size = [ +_[0], +_[1] ];
        clip = d3.geom.polygon([ [ 0, 0 ], [ 0, size[1] ], size, [ size[0], 0 ] ]).clip;
      }
      return voronoi;
    };
    voronoi.links = function(data) {
      var points, graph = data.map(function() {
        return [];
      }), links = [], fx = d3_functor(x), fy = d3_functor(y), d, i, n = data.length;
      if (fx === d3_svg_lineX && fy === d3_svg_lineY) points = data; else for (i = 0; i < n; ++i) {
        points.push([ +fx.call(this, d = data[i], i), +fy.call(this, d, i) ]);
      }
      d3_geom_voronoiTessellate(points, function(e) {
        var l = e.region.l.index, r = e.region.r.index;
        if (graph[l][r]) return;
        graph[l][r] = graph[r][l] = true;
        links.push({
          source: data[l],
          target: data[r]
        });
      });
      return links;
    };
    voronoi.triangles = function(data) {
      if (x === d3_svg_lineX && y === d3_svg_lineY) return d3.geom.delaunay(data);
      var points, point, fx = d3_functor(x), fy = d3_functor(y), d, i, n;
      for (i = 0, points = [], n = data.length; i < n; ++i) {
        point = [ +fx.call(this, d = data[i], i), +fy.call(this, d, i) ];
        point.data = d;
        points.push(point);
      }
      return d3.geom.delaunay(points).map(function(triangle) {
        return triangle.map(function(point) {
          return point.data;
        });
      });
    };
    return voronoi;
  };
  var d3_geom_voronoiOpposite = {
    l: "r",
    r: "l"
  };
  function d3_geom_voronoiTessellate(points, callback) {
    var Sites = {
      list: points.map(function(v, i) {
        return {
          index: i,
          x: v[0],
          y: v[1]
        };
      }).sort(function(a, b) {
        return a.y < b.y ? -1 : a.y > b.y ? 1 : a.x < b.x ? -1 : a.x > b.x ? 1 : 0;
      }),
      bottomSite: null
    };
    var EdgeList = {
      list: [],
      leftEnd: null,
      rightEnd: null,
      init: function() {
        EdgeList.leftEnd = EdgeList.createHalfEdge(null, "l");
        EdgeList.rightEnd = EdgeList.createHalfEdge(null, "l");
        EdgeList.leftEnd.r = EdgeList.rightEnd;
        EdgeList.rightEnd.l = EdgeList.leftEnd;
        EdgeList.list.unshift(EdgeList.leftEnd, EdgeList.rightEnd);
      },
      createHalfEdge: function(edge, side) {
        return {
          edge: edge,
          side: side,
          vertex: null,
          l: null,
          r: null
        };
      },
      insert: function(lb, he) {
        he.l = lb;
        he.r = lb.r;
        lb.r.l = he;
        lb.r = he;
      },
      leftBound: function(p) {
        var he = EdgeList.leftEnd;
        do {
          he = he.r;
        } while (he != EdgeList.rightEnd && Geom.rightOf(he, p));
        he = he.l;
        return he;
      },
      del: function(he) {
        he.l.r = he.r;
        he.r.l = he.l;
        he.edge = null;
      },
      right: function(he) {
        return he.r;
      },
      left: function(he) {
        return he.l;
      },
      leftRegion: function(he) {
        return he.edge == null ? Sites.bottomSite : he.edge.region[he.side];
      },
      rightRegion: function(he) {
        return he.edge == null ? Sites.bottomSite : he.edge.region[d3_geom_voronoiOpposite[he.side]];
      }
    };
    var Geom = {
      bisect: function(s1, s2) {
        var newEdge = {
          region: {
            l: s1,
            r: s2
          },
          ep: {
            l: null,
            r: null
          }
        };
        var dx = s2.x - s1.x, dy = s2.y - s1.y, adx = dx > 0 ? dx : -dx, ady = dy > 0 ? dy : -dy;
        newEdge.c = s1.x * dx + s1.y * dy + (dx * dx + dy * dy) * .5;
        if (adx > ady) {
          newEdge.a = 1;
          newEdge.b = dy / dx;
          newEdge.c /= dx;
        } else {
          newEdge.b = 1;
          newEdge.a = dx / dy;
          newEdge.c /= dy;
        }
        return newEdge;
      },
      intersect: function(el1, el2) {
        var e1 = el1.edge, e2 = el2.edge;
        if (!e1 || !e2 || e1.region.r == e2.region.r) {
          return null;
        }
        var d = e1.a * e2.b - e1.b * e2.a;
        if (Math.abs(d) < 1e-10) {
          return null;
        }
        var xint = (e1.c * e2.b - e2.c * e1.b) / d, yint = (e2.c * e1.a - e1.c * e2.a) / d, e1r = e1.region.r, e2r = e2.region.r, el, e;
        if (e1r.y < e2r.y || e1r.y == e2r.y && e1r.x < e2r.x) {
          el = el1;
          e = e1;
        } else {
          el = el2;
          e = e2;
        }
        var rightOfSite = xint >= e.region.r.x;
        if (rightOfSite && el.side === "l" || !rightOfSite && el.side === "r") {
          return null;
        }
        return {
          x: xint,
          y: yint
        };
      },
      rightOf: function(he, p) {
        var e = he.edge, topsite = e.region.r, rightOfSite = p.x > topsite.x;
        if (rightOfSite && he.side === "l") {
          return 1;
        }
        if (!rightOfSite && he.side === "r") {
          return 0;
        }
        if (e.a === 1) {
          var dyp = p.y - topsite.y, dxp = p.x - topsite.x, fast = 0, above = 0;
          if (!rightOfSite && e.b < 0 || rightOfSite && e.b >= 0) {
            above = fast = dyp >= e.b * dxp;
          } else {
            above = p.x + p.y * e.b > e.c;
            if (e.b < 0) {
              above = !above;
            }
            if (!above) {
              fast = 1;
            }
          }
          if (!fast) {
            var dxs = topsite.x - e.region.l.x;
            above = e.b * (dxp * dxp - dyp * dyp) < dxs * dyp * (1 + 2 * dxp / dxs + e.b * e.b);
            if (e.b < 0) {
              above = !above;
            }
          }
        } else {
          var yl = e.c - e.a * p.x, t1 = p.y - yl, t2 = p.x - topsite.x, t3 = yl - topsite.y;
          above = t1 * t1 > t2 * t2 + t3 * t3;
        }
        return he.side === "l" ? above : !above;
      },
      endPoint: function(edge, side, site) {
        edge.ep[side] = site;
        if (!edge.ep[d3_geom_voronoiOpposite[side]]) return;
        callback(edge);
      },
      distance: function(s, t) {
        var dx = s.x - t.x, dy = s.y - t.y;
        return Math.sqrt(dx * dx + dy * dy);
      }
    };
    var EventQueue = {
      list: [],
      insert: function(he, site, offset) {
        he.vertex = site;
        he.ystar = site.y + offset;
        for (var i = 0, list = EventQueue.list, l = list.length; i < l; i++) {
          var next = list[i];
          if (he.ystar > next.ystar || he.ystar == next.ystar && site.x > next.vertex.x) {
            continue;
          } else {
            break;
          }
        }
        list.splice(i, 0, he);
      },
      del: function(he) {
        for (var i = 0, ls = EventQueue.list, l = ls.length; i < l && ls[i] != he; ++i) {}
        ls.splice(i, 1);
      },
      empty: function() {
        return EventQueue.list.length === 0;
      },
      nextEvent: function(he) {
        for (var i = 0, ls = EventQueue.list, l = ls.length; i < l; ++i) {
          if (ls[i] == he) return ls[i + 1];
        }
        return null;
      },
      min: function() {
        var elem = EventQueue.list[0];
        return {
          x: elem.vertex.x,
          y: elem.ystar
        };
      },
      extractMin: function() {
        return EventQueue.list.shift();
      }
    };
    EdgeList.init();
    Sites.bottomSite = Sites.list.shift();
    var newSite = Sites.list.shift(), newIntStar;
    var lbnd, rbnd, llbnd, rrbnd, bisector;
    var bot, top, temp, p, v;
    var e, pm;
    while (true) {
      if (!EventQueue.empty()) {
        newIntStar = EventQueue.min();
      }
      if (newSite && (EventQueue.empty() || newSite.y < newIntStar.y || newSite.y == newIntStar.y && newSite.x < newIntStar.x)) {
        lbnd = EdgeList.leftBound(newSite);
        rbnd = EdgeList.right(lbnd);
        bot = EdgeList.rightRegion(lbnd);
        e = Geom.bisect(bot, newSite);
        bisector = EdgeList.createHalfEdge(e, "l");
        EdgeList.insert(lbnd, bisector);
        p = Geom.intersect(lbnd, bisector);
        if (p) {
          EventQueue.del(lbnd);
          EventQueue.insert(lbnd, p, Geom.distance(p, newSite));
        }
        lbnd = bisector;
        bisector = EdgeList.createHalfEdge(e, "r");
        EdgeList.insert(lbnd, bisector);
        p = Geom.intersect(bisector, rbnd);
        if (p) {
          EventQueue.insert(bisector, p, Geom.distance(p, newSite));
        }
        newSite = Sites.list.shift();
      } else if (!EventQueue.empty()) {
        lbnd = EventQueue.extractMin();
        llbnd = EdgeList.left(lbnd);
        rbnd = EdgeList.right(lbnd);
        rrbnd = EdgeList.right(rbnd);
        bot = EdgeList.leftRegion(lbnd);
        top = EdgeList.rightRegion(rbnd);
        v = lbnd.vertex;
        Geom.endPoint(lbnd.edge, lbnd.side, v);
        Geom.endPoint(rbnd.edge, rbnd.side, v);
        EdgeList.del(lbnd);
        EventQueue.del(rbnd);
        EdgeList.del(rbnd);
        pm = "l";
        if (bot.y > top.y) {
          temp = bot;
          bot = top;
          top = temp;
          pm = "r";
        }
        e = Geom.bisect(bot, top);
        bisector = EdgeList.createHalfEdge(e, pm);
        EdgeList.insert(llbnd, bisector);
        Geom.endPoint(e, d3_geom_voronoiOpposite[pm], v);
        p = Geom.intersect(llbnd, bisector);
        if (p) {
          EventQueue.del(llbnd);
          EventQueue.insert(llbnd, p, Geom.distance(p, bot));
        }
        p = Geom.intersect(bisector, rrbnd);
        if (p) {
          EventQueue.insert(bisector, p, Geom.distance(p, bot));
        }
      } else {
        break;
      }
    }
    for (lbnd = EdgeList.right(EdgeList.leftEnd); lbnd != EdgeList.rightEnd; lbnd = EdgeList.right(lbnd)) {
      callback(lbnd.edge);
    }
  }
  d3.geom.quadtree = function(points, x1, y1, x2, y2) {
    var x = d3_svg_lineX, y = d3_svg_lineY, compat;
    if (compat = arguments.length) {
      x = d3_geom_quadtreeCompatX;
      y = d3_geom_quadtreeCompatY;
      if (compat === 3) {
        y2 = y1;
        x2 = x1;
        y1 = x1 = 0;
      }
      return quadtree(points);
    }
    function quadtree(data) {
      var d, fx = d3_functor(x), fy = d3_functor(y), xs, ys, i, n, x1_, y1_, x2_, y2_;
      if (x1 != null) {
        x1_ = x1, y1_ = y1, x2_ = x2, y2_ = y2;
      } else {
        x2_ = y2_ = -(x1_ = y1_ = Infinity);
        xs = [], ys = [];
        n = data.length;
        if (compat) for (i = 0; i < n; ++i) {
          d = data[i];
          if (d.x < x1_) x1_ = d.x;
          if (d.y < y1_) y1_ = d.y;
          if (d.x > x2_) x2_ = d.x;
          if (d.y > y2_) y2_ = d.y;
          xs.push(d.x);
          ys.push(d.y);
        } else for (i = 0; i < n; ++i) {
          var x_ = +fx(d = data[i], i), y_ = +fy(d, i);
          if (x_ < x1_) x1_ = x_;
          if (y_ < y1_) y1_ = y_;
          if (x_ > x2_) x2_ = x_;
          if (y_ > y2_) y2_ = y_;
          xs.push(x_);
          ys.push(y_);
        }
      }
      var dx = x2_ - x1_, dy = y2_ - y1_;
      if (dx > dy) y2_ = y1_ + dx; else x2_ = x1_ + dy;
      function insert(n, d, x, y, x1, y1, x2, y2) {
        if (isNaN(x) || isNaN(y)) return;
        if (n.leaf) {
          var nx = n.x, ny = n.y;
          if (nx != null) {
            if (Math.abs(nx - x) + Math.abs(ny - y) < .01) {
              insertChild(n, d, x, y, x1, y1, x2, y2);
            } else {
              var nPoint = n.point;
              n.x = n.y = n.point = null;
              insertChild(n, nPoint, nx, ny, x1, y1, x2, y2);
              insertChild(n, d, x, y, x1, y1, x2, y2);
            }
          } else {
            n.x = x, n.y = y, n.point = d;
          }
        } else {
          insertChild(n, d, x, y, x1, y1, x2, y2);
        }
      }
      function insertChild(n, d, x, y, x1, y1, x2, y2) {
        var sx = (x1 + x2) * .5, sy = (y1 + y2) * .5, right = x >= sx, bottom = y >= sy, i = (bottom << 1) + right;
        n.leaf = false;
        n = n.nodes[i] || (n.nodes[i] = d3_geom_quadtreeNode());
        if (right) x1 = sx; else x2 = sx;
        if (bottom) y1 = sy; else y2 = sy;
        insert(n, d, x, y, x1, y1, x2, y2);
      }
      var root = d3_geom_quadtreeNode();
      root.add = function(d) {
        insert(root, d, +fx(d, ++i), +fy(d, i), x1_, y1_, x2_, y2_);
      };
      root.visit = function(f) {
        d3_geom_quadtreeVisit(f, root, x1_, y1_, x2_, y2_);
      };
      i = -1;
      if (x1 == null) {
        while (++i < n) {
          insert(root, data[i], xs[i], ys[i], x1_, y1_, x2_, y2_);
        }
        --i;
      } else data.forEach(root.add);
      xs = ys = data = d = null;
      return root;
    }
    quadtree.x = function(_) {
      return arguments.length ? (x = _, quadtree) : x;
    };
    quadtree.y = function(_) {
      return arguments.length ? (y = _, quadtree) : y;
    };
    quadtree.size = function(_) {
      if (!arguments.length) return x1 == null ? null : [ x2, y2 ];
      if (_ == null) {
        x1 = y1 = x2 = y2 = null;
      } else {
        x1 = y1 = 0;
        x2 = +_[0], y2 = +_[1];
      }
      return quadtree;
    };
    return quadtree;
  };
  function d3_geom_quadtreeCompatX(d) {
    return d.x;
  }
  function d3_geom_quadtreeCompatY(d) {
    return d.y;
  }
  function d3_geom_quadtreeNode() {
    return {
      leaf: true,
      nodes: [],
      point: null,
      x: null,
      y: null
    };
  }
  function d3_geom_quadtreeVisit(f, node, x1, y1, x2, y2) {
    if (!f(node, x1, y1, x2, y2)) {
      var sx = (x1 + x2) * .5, sy = (y1 + y2) * .5, children = node.nodes;
      if (children[0]) d3_geom_quadtreeVisit(f, children[0], x1, y1, sx, sy);
      if (children[1]) d3_geom_quadtreeVisit(f, children[1], sx, y1, x2, sy);
      if (children[2]) d3_geom_quadtreeVisit(f, children[2], x1, sy, sx, y2);
      if (children[3]) d3_geom_quadtreeVisit(f, children[3], sx, sy, x2, y2);
    }
  }
  d3.interpolateRgb = d3_interpolateRgb;
  function d3_interpolateRgb(a, b) {
    a = d3.rgb(a);
    b = d3.rgb(b);
    var ar = a.r, ag = a.g, ab = a.b, br = b.r - ar, bg = b.g - ag, bb = b.b - ab;
    return function(t) {
      return "#" + d3_rgb_hex(Math.round(ar + br * t)) + d3_rgb_hex(Math.round(ag + bg * t)) + d3_rgb_hex(Math.round(ab + bb * t));
    };
  }
  d3.transform = function(string) {
    var g = d3_document.createElementNS(d3.ns.prefix.svg, "g");
    return (d3.transform = function(string) {
      g.setAttribute("transform", string);
      var t = g.transform.baseVal.consolidate();
      return new d3_transform(t ? t.matrix : d3_transformIdentity);
    })(string);
  };
  function d3_transform(m) {
    var r0 = [ m.a, m.b ], r1 = [ m.c, m.d ], kx = d3_transformNormalize(r0), kz = d3_transformDot(r0, r1), ky = d3_transformNormalize(d3_transformCombine(r1, r0, -kz)) || 0;
    if (r0[0] * r1[1] < r1[0] * r0[1]) {
      r0[0] *= -1;
      r0[1] *= -1;
      kx *= -1;
      kz *= -1;
    }
    this.rotate = (kx ? Math.atan2(r0[1], r0[0]) : Math.atan2(-r1[0], r1[1])) * d3_degrees;
    this.translate = [ m.e, m.f ];
    this.scale = [ kx, ky ];
    this.skew = ky ? Math.atan2(kz, ky) * d3_degrees : 0;
  }
  d3_transform.prototype.toString = function() {
    return "translate(" + this.translate + ")rotate(" + this.rotate + ")skewX(" + this.skew + ")scale(" + this.scale + ")";
  };
  function d3_transformDot(a, b) {
    return a[0] * b[0] + a[1] * b[1];
  }
  function d3_transformNormalize(a) {
    var k = Math.sqrt(d3_transformDot(a, a));
    if (k) {
      a[0] /= k;
      a[1] /= k;
    }
    return k;
  }
  function d3_transformCombine(a, b, k) {
    a[0] += k * b[0];
    a[1] += k * b[1];
    return a;
  }
  var d3_transformIdentity = {
    a: 1,
    b: 0,
    c: 0,
    d: 1,
    e: 0,
    f: 0
  };
  d3.interpolateNumber = d3_interpolateNumber;
  function d3_interpolateNumber(a, b) {
    b -= a = +a;
    return function(t) {
      return a + b * t;
    };
  }
  d3.interpolateTransform = d3_interpolateTransform;
  function d3_interpolateTransform(a, b) {
    var s = [], q = [], n, A = d3.transform(a), B = d3.transform(b), ta = A.translate, tb = B.translate, ra = A.rotate, rb = B.rotate, wa = A.skew, wb = B.skew, ka = A.scale, kb = B.scale;
    if (ta[0] != tb[0] || ta[1] != tb[1]) {
      s.push("translate(", null, ",", null, ")");
      q.push({
        i: 1,
        x: d3_interpolateNumber(ta[0], tb[0])
      }, {
        i: 3,
        x: d3_interpolateNumber(ta[1], tb[1])
      });
    } else if (tb[0] || tb[1]) {
      s.push("translate(" + tb + ")");
    } else {
      s.push("");
    }
    if (ra != rb) {
      if (ra - rb > 180) rb += 360; else if (rb - ra > 180) ra += 360;
      q.push({
        i: s.push(s.pop() + "rotate(", null, ")") - 2,
        x: d3_interpolateNumber(ra, rb)
      });
    } else if (rb) {
      s.push(s.pop() + "rotate(" + rb + ")");
    }
    if (wa != wb) {
      q.push({
        i: s.push(s.pop() + "skewX(", null, ")") - 2,
        x: d3_interpolateNumber(wa, wb)
      });
    } else if (wb) {
      s.push(s.pop() + "skewX(" + wb + ")");
    }
    if (ka[0] != kb[0] || ka[1] != kb[1]) {
      n = s.push(s.pop() + "scale(", null, ",", null, ")");
      q.push({
        i: n - 4,
        x: d3_interpolateNumber(ka[0], kb[0])
      }, {
        i: n - 2,
        x: d3_interpolateNumber(ka[1], kb[1])
      });
    } else if (kb[0] != 1 || kb[1] != 1) {
      s.push(s.pop() + "scale(" + kb + ")");
    }
    n = q.length;
    return function(t) {
      var i = -1, o;
      while (++i < n) s[(o = q[i]).i] = o.x(t);
      return s.join("");
    };
  }
  d3.interpolateObject = d3_interpolateObject;
  function d3_interpolateObject(a, b) {
    var i = {}, c = {}, k;
    for (k in a) {
      if (k in b) {
        i[k] = d3_interpolateByName(k)(a[k], b[k]);
      } else {
        c[k] = a[k];
      }
    }
    for (k in b) {
      if (!(k in a)) {
        c[k] = b[k];
      }
    }
    return function(t) {
      for (k in i) c[k] = i[k](t);
      return c;
    };
  }
  d3.interpolateString = d3_interpolateString;
  function d3_interpolateString(a, b) {
    var m, i, j, s0 = 0, s1 = 0, s = [], q = [], n, o;
    a = a + "", b = b + "";
    d3_interpolate_number.lastIndex = 0;
    for (i = 0; m = d3_interpolate_number.exec(b); ++i) {
      if (m.index) s.push(b.substring(s0, s1 = m.index));
      q.push({
        i: s.length,
        x: m[0]
      });
      s.push(null);
      s0 = d3_interpolate_number.lastIndex;
    }
    if (s0 < b.length) s.push(b.substring(s0));
    for (i = 0, n = q.length; (m = d3_interpolate_number.exec(a)) && i < n; ++i) {
      o = q[i];
      if (o.x == m[0]) {
        if (o.i) {
          if (s[o.i + 1] == null) {
            s[o.i - 1] += o.x;
            s.splice(o.i, 1);
            for (j = i + 1; j < n; ++j) q[j].i--;
          } else {
            s[o.i - 1] += o.x + s[o.i + 1];
            s.splice(o.i, 2);
            for (j = i + 1; j < n; ++j) q[j].i -= 2;
          }
        } else {
          if (s[o.i + 1] == null) {
            s[o.i] = o.x;
          } else {
            s[o.i] = o.x + s[o.i + 1];
            s.splice(o.i + 1, 1);
            for (j = i + 1; j < n; ++j) q[j].i--;
          }
        }
        q.splice(i, 1);
        n--;
        i--;
      } else {
        o.x = d3_interpolateNumber(parseFloat(m[0]), parseFloat(o.x));
      }
    }
    while (i < n) {
      o = q.pop();
      if (s[o.i + 1] == null) {
        s[o.i] = o.x;
      } else {
        s[o.i] = o.x + s[o.i + 1];
        s.splice(o.i + 1, 1);
      }
      n--;
    }
    if (s.length === 1) {
      return s[0] == null ? q[0].x : function() {
        return b;
      };
    }
    return function(t) {
      for (i = 0; i < n; ++i) s[(o = q[i]).i] = o.x(t);
      return s.join("");
    };
  }
  var d3_interpolate_number = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
  d3.interpolate = d3_interpolate;
  function d3_interpolate(a, b) {
    var i = d3.interpolators.length, f;
    while (--i >= 0 && !(f = d3.interpolators[i](a, b))) ;
    return f;
  }
  function d3_interpolateByName(name) {
    return name == "transform" ? d3_interpolateTransform : d3_interpolate;
  }
  d3.interpolators = [ function(a, b) {
    var t = typeof b;
    return (t === "string" || t !== typeof a ? d3_rgb_names.has(b) || /^(#|rgb\(|hsl\()/.test(b) ? d3_interpolateRgb : d3_interpolateString : b instanceof d3_Color ? d3_interpolateRgb : t === "object" ? Array.isArray(b) ? d3_interpolateArray : d3_interpolateObject : d3_interpolateNumber)(a, b);
  } ];
  d3.interpolateArray = d3_interpolateArray;
  function d3_interpolateArray(a, b) {
    var x = [], c = [], na = a.length, nb = b.length, n0 = Math.min(a.length, b.length), i;
    for (i = 0; i < n0; ++i) x.push(d3_interpolate(a[i], b[i]));
    for (;i < na; ++i) c[i] = a[i];
    for (;i < nb; ++i) c[i] = b[i];
    return function(t) {
      for (i = 0; i < n0; ++i) c[i] = x[i](t);
      return c;
    };
  }
  var d3_ease_default = function() {
    return d3_identity;
  };
  var d3_ease = d3.map({
    linear: d3_ease_default,
    poly: d3_ease_poly,
    quad: function() {
      return d3_ease_quad;
    },
    cubic: function() {
      return d3_ease_cubic;
    },
    sin: function() {
      return d3_ease_sin;
    },
    exp: function() {
      return d3_ease_exp;
    },
    circle: function() {
      return d3_ease_circle;
    },
    elastic: d3_ease_elastic,
    back: d3_ease_back,
    bounce: function() {
      return d3_ease_bounce;
    }
  });
  var d3_ease_mode = d3.map({
    "in": d3_identity,
    out: d3_ease_reverse,
    "in-out": d3_ease_reflect,
    "out-in": function(f) {
      return d3_ease_reflect(d3_ease_reverse(f));
    }
  });
  d3.ease = function(name) {
    var i = name.indexOf("-"), t = i >= 0 ? name.substring(0, i) : name, m = i >= 0 ? name.substring(i + 1) : "in";
    t = d3_ease.get(t) || d3_ease_default;
    m = d3_ease_mode.get(m) || d3_identity;
    return d3_ease_clamp(m(t.apply(null, Array.prototype.slice.call(arguments, 1))));
  };
  function d3_ease_clamp(f) {
    return function(t) {
      return t <= 0 ? 0 : t >= 1 ? 1 : f(t);
    };
  }
  function d3_ease_reverse(f) {
    return function(t) {
      return 1 - f(1 - t);
    };
  }
  function d3_ease_reflect(f) {
    return function(t) {
      return .5 * (t < .5 ? f(2 * t) : 2 - f(2 - 2 * t));
    };
  }
  function d3_ease_quad(t) {
    return t * t;
  }
  function d3_ease_cubic(t) {
    return t * t * t;
  }
  function d3_ease_cubicInOut(t) {
    if (t <= 0) return 0;
    if (t >= 1) return 1;
    var t2 = t * t, t3 = t2 * t;
    return 4 * (t < .5 ? t3 : 3 * (t - t2) + t3 - .75);
  }
  function d3_ease_poly(e) {
    return function(t) {
      return Math.pow(t, e);
    };
  }
  function d3_ease_sin(t) {
    return 1 - Math.cos(t * π / 2);
  }
  function d3_ease_exp(t) {
    return Math.pow(2, 10 * (t - 1));
  }
  function d3_ease_circle(t) {
    return 1 - Math.sqrt(1 - t * t);
  }
  function d3_ease_elastic(a, p) {
    var s;
    if (arguments.length < 2) p = .45;
    if (arguments.length) s = p / (2 * π) * Math.asin(1 / a); else a = 1, s = p / 4;
    return function(t) {
      return 1 + a * Math.pow(2, 10 * -t) * Math.sin((t - s) * 2 * π / p);
    };
  }
  function d3_ease_back(s) {
    if (!s) s = 1.70158;
    return function(t) {
      return t * t * ((s + 1) * t - s);
    };
  }
  function d3_ease_bounce(t) {
    return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375;
  }
  d3.interpolateHcl = d3_interpolateHcl;
  function d3_interpolateHcl(a, b) {
    a = d3.hcl(a);
    b = d3.hcl(b);
    var ah = a.h, ac = a.c, al = a.l, bh = b.h - ah, bc = b.c - ac, bl = b.l - al;
    if (bh > 180) bh -= 360; else if (bh < -180) bh += 360;
    return function(t) {
      return d3_hcl_lab(ah + bh * t, ac + bc * t, al + bl * t) + "";
    };
  }
  d3.interpolateHsl = d3_interpolateHsl;
  function d3_interpolateHsl(a, b) {
    a = d3.hsl(a);
    b = d3.hsl(b);
    var h0 = a.h, s0 = a.s, l0 = a.l, h1 = b.h - h0, s1 = b.s - s0, l1 = b.l - l0;
    if (h1 > 180) h1 -= 360; else if (h1 < -180) h1 += 360;
    return function(t) {
      return d3_hsl_rgb(h0 + h1 * t, s0 + s1 * t, l0 + l1 * t) + "";
    };
  }
  d3.interpolateLab = d3_interpolateLab;
  function d3_interpolateLab(a, b) {
    a = d3.lab(a);
    b = d3.lab(b);
    var al = a.l, aa = a.a, ab = a.b, bl = b.l - al, ba = b.a - aa, bb = b.b - ab;
    return function(t) {
      return d3_lab_rgb(al + bl * t, aa + ba * t, ab + bb * t) + "";
    };
  }
  d3.interpolateRound = d3_interpolateRound;
  function d3_interpolateRound(a, b) {
    b -= a;
    return function(t) {
      return Math.round(a + b * t);
    };
  }
  function d3_uninterpolateNumber(a, b) {
    b = b - (a = +a) ? 1 / (b - a) : 0;
    return function(x) {
      return (x - a) * b;
    };
  }
  function d3_uninterpolateClamp(a, b) {
    b = b - (a = +a) ? 1 / (b - a) : 0;
    return function(x) {
      return Math.max(0, Math.min(1, (x - a) * b));
    };
  }
  d3.layout = {};
  d3.layout.bundle = function() {
    return function(links) {
      var paths = [], i = -1, n = links.length;
      while (++i < n) paths.push(d3_layout_bundlePath(links[i]));
      return paths;
    };
  };
  function d3_layout_bundlePath(link) {
    var start = link.source, end = link.target, lca = d3_layout_bundleLeastCommonAncestor(start, end), points = [ start ];
    while (start !== lca) {
      start = start.parent;
      points.push(start);
    }
    var k = points.length;
    while (end !== lca) {
      points.splice(k, 0, end);
      end = end.parent;
    }
    return points;
  }
  function d3_layout_bundleAncestors(node) {
    var ancestors = [], parent = node.parent;
    while (parent != null) {
      ancestors.push(node);
      node = parent;
      parent = parent.parent;
    }
    ancestors.push(node);
    return ancestors;
  }
  function d3_layout_bundleLeastCommonAncestor(a, b) {
    if (a === b) return a;
    var aNodes = d3_layout_bundleAncestors(a), bNodes = d3_layout_bundleAncestors(b), aNode = aNodes.pop(), bNode = bNodes.pop(), sharedNode = null;
    while (aNode === bNode) {
      sharedNode = aNode;
      aNode = aNodes.pop();
      bNode = bNodes.pop();
    }
    return sharedNode;
  }
  d3.layout.chord = function() {
    var chord = {}, chords, groups, matrix, n, padding = 0, sortGroups, sortSubgroups, sortChords;
    function relayout() {
      var subgroups = {}, groupSums = [], groupIndex = d3.range(n), subgroupIndex = [], k, x, x0, i, j;
      chords = [];
      groups = [];
      k = 0, i = -1;
      while (++i < n) {
        x = 0, j = -1;
        while (++j < n) {
          x += matrix[i][j];
        }
        groupSums.push(x);
        subgroupIndex.push(d3.range(n));
        k += x;
      }
      if (sortGroups) {
        groupIndex.sort(function(a, b) {
          return sortGroups(groupSums[a], groupSums[b]);
        });
      }
      if (sortSubgroups) {
        subgroupIndex.forEach(function(d, i) {
          d.sort(function(a, b) {
            return sortSubgroups(matrix[i][a], matrix[i][b]);
          });
        });
      }
      k = (2 * π - padding * n) / k;
      x = 0, i = -1;
      while (++i < n) {
        x0 = x, j = -1;
        while (++j < n) {
          var di = groupIndex[i], dj = subgroupIndex[di][j], v = matrix[di][dj], a0 = x, a1 = x += v * k;
          subgroups[di + "-" + dj] = {
            index: di,
            subindex: dj,
            startAngle: a0,
            endAngle: a1,
            value: v
          };
        }
        groups[di] = {
          index: di,
          startAngle: x0,
          endAngle: x,
          value: (x - x0) / k
        };
        x += padding;
      }
      i = -1;
      while (++i < n) {
        j = i - 1;
        while (++j < n) {
          var source = subgroups[i + "-" + j], target = subgroups[j + "-" + i];
          if (source.value || target.value) {
            chords.push(source.value < target.value ? {
              source: target,
              target: source
            } : {
              source: source,
              target: target
            });
          }
        }
      }
      if (sortChords) resort();
    }
    function resort() {
      chords.sort(function(a, b) {
        return sortChords((a.source.value + a.target.value) / 2, (b.source.value + b.target.value) / 2);
      });
    }
    chord.matrix = function(x) {
      if (!arguments.length) return matrix;
      n = (matrix = x) && matrix.length;
      chords = groups = null;
      return chord;
    };
    chord.padding = function(x) {
      if (!arguments.length) return padding;
      padding = x;
      chords = groups = null;
      return chord;
    };
    chord.sortGroups = function(x) {
      if (!arguments.length) return sortGroups;
      sortGroups = x;
      chords = groups = null;
      return chord;
    };
    chord.sortSubgroups = function(x) {
      if (!arguments.length) return sortSubgroups;
      sortSubgroups = x;
      chords = null;
      return chord;
    };
    chord.sortChords = function(x) {
      if (!arguments.length) return sortChords;
      sortChords = x;
      if (chords) resort();
      return chord;
    };
    chord.chords = function() {
      if (!chords) relayout();
      return chords;
    };
    chord.groups = function() {
      if (!groups) relayout();
      return groups;
    };
    return chord;
  };
  d3.layout.force = function() {
    var force = {}, event = d3.dispatch("start", "tick", "end"), size = [ 1, 1 ], drag, alpha, friction = .9, linkDistance = d3_layout_forceLinkDistance, linkStrength = d3_layout_forceLinkStrength, charge = -30, gravity = .1, theta = .8, nodes = [], links = [], distances, strengths, charges;
    function repulse(node) {
      return function(quad, x1, _, x2) {
        if (quad.point !== node) {
          var dx = quad.cx - node.x, dy = quad.cy - node.y, dn = 1 / Math.sqrt(dx * dx + dy * dy);
          if ((x2 - x1) * dn < theta) {
            var k = quad.charge * dn * dn;
            node.px -= dx * k;
            node.py -= dy * k;
            return true;
          }
          if (quad.point && isFinite(dn)) {
            var k = quad.pointCharge * dn * dn;
            node.px -= dx * k;
            node.py -= dy * k;
          }
        }
        return !quad.charge;
      };
    }
    force.tick = function() {
      if ((alpha *= .99) < .005) {
        event.end({
          type: "end",
          alpha: alpha = 0
        });
        return true;
      }
      var n = nodes.length, m = links.length, q, i, o, s, t, l, k, x, y;
      for (i = 0; i < m; ++i) {
        o = links[i];
        s = o.source;
        t = o.target;
        x = t.x - s.x;
        y = t.y - s.y;
        if (l = x * x + y * y) {
          l = alpha * strengths[i] * ((l = Math.sqrt(l)) - distances[i]) / l;
          x *= l;
          y *= l;
          t.x -= x * (k = s.weight / (t.weight + s.weight));
          t.y -= y * k;
          s.x += x * (k = 1 - k);
          s.y += y * k;
        }
      }
      if (k = alpha * gravity) {
        x = size[0] / 2;
        y = size[1] / 2;
        i = -1;
        if (k) while (++i < n) {
          o = nodes[i];
          o.x += (x - o.x) * k;
          o.y += (y - o.y) * k;
        }
      }
      if (charge) {
        d3_layout_forceAccumulate(q = d3.geom.quadtree(nodes), alpha, charges);
        i = -1;
        while (++i < n) {
          if (!(o = nodes[i]).fixed) {
            q.visit(repulse(o));
          }
        }
      }
      i = -1;
      while (++i < n) {
        o = nodes[i];
        if (o.fixed) {
          o.x = o.px;
          o.y = o.py;
        } else {
          o.x -= (o.px - (o.px = o.x)) * friction;
          o.y -= (o.py - (o.py = o.y)) * friction;
        }
      }
      event.tick({
        type: "tick",
        alpha: alpha
      });
    };
    force.nodes = function(x) {
      if (!arguments.length) return nodes;
      nodes = x;
      return force;
    };
    force.links = function(x) {
      if (!arguments.length) return links;
      links = x;
      return force;
    };
    force.size = function(x) {
      if (!arguments.length) return size;
      size = x;
      return force;
    };
    force.linkDistance = function(x) {
      if (!arguments.length) return linkDistance;
      linkDistance = typeof x === "function" ? x : +x;
      return force;
    };
    force.distance = force.linkDistance;
    force.linkStrength = function(x) {
      if (!arguments.length) return linkStrength;
      linkStrength = typeof x === "function" ? x : +x;
      return force;
    };
    force.friction = function(x) {
      if (!arguments.length) return friction;
      friction = +x;
      return force;
    };
    force.charge = function(x) {
      if (!arguments.length) return charge;
      charge = typeof x === "function" ? x : +x;
      return force;
    };
    force.gravity = function(x) {
      if (!arguments.length) return gravity;
      gravity = +x;
      return force;
    };
    force.theta = function(x) {
      if (!arguments.length) return theta;
      theta = +x;
      return force;
    };
    force.alpha = function(x) {
      if (!arguments.length) return alpha;
      x = +x;
      if (alpha) {
        if (x > 0) alpha = x; else alpha = 0;
      } else if (x > 0) {
        event.start({
          type: "start",
          alpha: alpha = x
        });
        d3.timer(force.tick);
      }
      return force;
    };
    force.start = function() {
      var i, j, n = nodes.length, m = links.length, w = size[0], h = size[1], neighbors, o;
      for (i = 0; i < n; ++i) {
        (o = nodes[i]).index = i;
        o.weight = 0;
      }
      for (i = 0; i < m; ++i) {
        o = links[i];
        if (typeof o.source == "number") o.source = nodes[o.source];
        if (typeof o.target == "number") o.target = nodes[o.target];
        ++o.source.weight;
        ++o.target.weight;
      }
      for (i = 0; i < n; ++i) {
        o = nodes[i];
        if (isNaN(o.x)) o.x = position("x", w);
        if (isNaN(o.y)) o.y = position("y", h);
        if (isNaN(o.px)) o.px = o.x;
        if (isNaN(o.py)) o.py = o.y;
      }
      distances = [];
      if (typeof linkDistance === "function") for (i = 0; i < m; ++i) distances[i] = +linkDistance.call(this, links[i], i); else for (i = 0; i < m; ++i) distances[i] = linkDistance;
      strengths = [];
      if (typeof linkStrength === "function") for (i = 0; i < m; ++i) strengths[i] = +linkStrength.call(this, links[i], i); else for (i = 0; i < m; ++i) strengths[i] = linkStrength;
      charges = [];
      if (typeof charge === "function") for (i = 0; i < n; ++i) charges[i] = +charge.call(this, nodes[i], i); else for (i = 0; i < n; ++i) charges[i] = charge;
      function position(dimension, size) {
        var neighbors = neighbor(i), j = -1, m = neighbors.length, x;
        while (++j < m) if (!isNaN(x = neighbors[j][dimension])) return x;
        return Math.random() * size;
      }
      function neighbor() {
        if (!neighbors) {
          neighbors = [];
          for (j = 0; j < n; ++j) {
            neighbors[j] = [];
          }
          for (j = 0; j < m; ++j) {
            var o = links[j];
            neighbors[o.source.index].push(o.target);
            neighbors[o.target.index].push(o.source);
          }
        }
        return neighbors[i];
      }
      return force.resume();
    };
    force.resume = function() {
      return force.alpha(.1);
    };
    force.stop = function() {
      return force.alpha(0);
    };
    force.drag = function() {
      if (!drag) drag = d3.behavior.drag().origin(d3_identity).on("dragstart.force", d3_layout_forceDragstart).on("drag.force", dragmove).on("dragend.force", d3_layout_forceDragend);
      if (!arguments.length) return drag;
      this.on("mouseover.force", d3_layout_forceMouseover).on("mouseout.force", d3_layout_forceMouseout).call(drag);
    };
    function dragmove(d) {
      d.px = d3.event.x, d.py = d3.event.y;
      force.resume();
    }
    return d3.rebind(force, event, "on");
  };
  function d3_layout_forceDragstart(d) {
    d.fixed |= 2;
  }
  function d3_layout_forceDragend(d) {
    d.fixed &= ~6;
  }
  function d3_layout_forceMouseover(d) {
    d.fixed |= 4;
    d.px = d.x, d.py = d.y;
  }
  function d3_layout_forceMouseout(d) {
    d.fixed &= ~4;
  }
  function d3_layout_forceAccumulate(quad, alpha, charges) {
    var cx = 0, cy = 0;
    quad.charge = 0;
    if (!quad.leaf) {
      var nodes = quad.nodes, n = nodes.length, i = -1, c;
      while (++i < n) {
        c = nodes[i];
        if (c == null) continue;
        d3_layout_forceAccumulate(c, alpha, charges);
        quad.charge += c.charge;
        cx += c.charge * c.cx;
        cy += c.charge * c.cy;
      }
    }
    if (quad.point) {
      if (!quad.leaf) {
        quad.point.x += Math.random() - .5;
        quad.point.y += Math.random() - .5;
      }
      var k = alpha * charges[quad.point.index];
      quad.charge += quad.pointCharge = k;
      cx += k * quad.point.x;
      cy += k * quad.point.y;
    }
    quad.cx = cx / quad.charge;
    quad.cy = cy / quad.charge;
  }
  var d3_layout_forceLinkDistance = 20, d3_layout_forceLinkStrength = 1;
  d3.layout.hierarchy = function() {
    var sort = d3_layout_hierarchySort, children = d3_layout_hierarchyChildren, value = d3_layout_hierarchyValue;
    function recurse(node, depth, nodes) {
      var childs = children.call(hierarchy, node, depth);
      node.depth = depth;
      nodes.push(node);
      if (childs && (n = childs.length)) {
        var i = -1, n, c = node.children = [], v = 0, j = depth + 1, d;
        while (++i < n) {
          d = recurse(childs[i], j, nodes);
          d.parent = node;
          c.push(d);
          v += d.value;
        }
        if (sort) c.sort(sort);
        if (value) node.value = v;
      } else if (value) {
        node.value = +value.call(hierarchy, node, depth) || 0;
      }
      return node;
    }
    function revalue(node, depth) {
      var children = node.children, v = 0;
      if (children && (n = children.length)) {
        var i = -1, n, j = depth + 1;
        while (++i < n) v += revalue(children[i], j);
      } else if (value) {
        v = +value.call(hierarchy, node, depth) || 0;
      }
      if (value) node.value = v;
      return v;
    }
    function hierarchy(d) {
      var nodes = [];
      recurse(d, 0, nodes);
      return nodes;
    }
    hierarchy.sort = function(x) {
      if (!arguments.length) return sort;
      sort = x;
      return hierarchy;
    };
    hierarchy.children = function(x) {
      if (!arguments.length) return children;
      children = x;
      return hierarchy;
    };
    hierarchy.value = function(x) {
      if (!arguments.length) return value;
      value = x;
      return hierarchy;
    };
    hierarchy.revalue = function(root) {
      revalue(root, 0);
      return root;
    };
    return hierarchy;
  };
  function d3_layout_hierarchyRebind(object, hierarchy) {
    d3.rebind(object, hierarchy, "sort", "children", "value");
    object.nodes = object;
    object.links = d3_layout_hierarchyLinks;
    return object;
  }
  function d3_layout_hierarchyChildren(d) {
    return d.children;
  }
  function d3_layout_hierarchyValue(d) {
    return d.value;
  }
  function d3_layout_hierarchySort(a, b) {
    return b.value - a.value;
  }
  function d3_layout_hierarchyLinks(nodes) {
    return d3.merge(nodes.map(function(parent) {
      return (parent.children || []).map(function(child) {
        return {
          source: parent,
          target: child
        };
      });
    }));
  }
  d3.layout.partition = function() {
    var hierarchy = d3.layout.hierarchy(), size = [ 1, 1 ];
    function position(node, x, dx, dy) {
      var children = node.children;
      node.x = x;
      node.y = node.depth * dy;
      node.dx = dx;
      node.dy = dy;
      if (children && (n = children.length)) {
        var i = -1, n, c, d;
        dx = node.value ? dx / node.value : 0;
        while (++i < n) {
          position(c = children[i], x, d = c.value * dx, dy);
          x += d;
        }
      }
    }
    function depth(node) {
      var children = node.children, d = 0;
      if (children && (n = children.length)) {
        var i = -1, n;
        while (++i < n) d = Math.max(d, depth(children[i]));
      }
      return 1 + d;
    }
    function partition(d, i) {
      var nodes = hierarchy.call(this, d, i);
      position(nodes[0], 0, size[0], size[1] / depth(nodes[0]));
      return nodes;
    }
    partition.size = function(x) {
      if (!arguments.length) return size;
      size = x;
      return partition;
    };
    return d3_layout_hierarchyRebind(partition, hierarchy);
  };
  d3.layout.pie = function() {
    var value = Number, sort = d3_layout_pieSortByValue, startAngle = 0, endAngle = 2 * π;
    function pie(data) {
      var values = data.map(function(d, i) {
        return +value.call(pie, d, i);
      });
      var a = +(typeof startAngle === "function" ? startAngle.apply(this, arguments) : startAngle);
      var k = ((typeof endAngle === "function" ? endAngle.apply(this, arguments) : endAngle) - a) / d3.sum(values);
      var index = d3.range(data.length);
      if (sort != null) index.sort(sort === d3_layout_pieSortByValue ? function(i, j) {
        return values[j] - values[i];
      } : function(i, j) {
        return sort(data[i], data[j]);
      });
      var arcs = [];
      index.forEach(function(i) {
        var d;
        arcs[i] = {
          data: data[i],
          value: d = values[i],
          startAngle: a,
          endAngle: a += d * k
        };
      });
      return arcs;
    }
    pie.value = function(x) {
      if (!arguments.length) return value;
      value = x;
      return pie;
    };
    pie.sort = function(x) {
      if (!arguments.length) return sort;
      sort = x;
      return pie;
    };
    pie.startAngle = function(x) {
      if (!arguments.length) return startAngle;
      startAngle = x;
      return pie;
    };
    pie.endAngle = function(x) {
      if (!arguments.length) return endAngle;
      endAngle = x;
      return pie;
    };
    return pie;
  };
  var d3_layout_pieSortByValue = {};
  d3.layout.stack = function() {
    var values = d3_identity, order = d3_layout_stackOrderDefault, offset = d3_layout_stackOffsetZero, out = d3_layout_stackOut, x = d3_layout_stackX, y = d3_layout_stackY;
    function stack(data, index) {
      var series = data.map(function(d, i) {
        return values.call(stack, d, i);
      });
      var points = series.map(function(d) {
        return d.map(function(v, i) {
          return [ x.call(stack, v, i), y.call(stack, v, i) ];
        });
      });
      var orders = order.call(stack, points, index);
      series = d3.permute(series, orders);
      points = d3.permute(points, orders);
      var offsets = offset.call(stack, points, index);
      var n = series.length, m = series[0].length, i, j, o;
      for (j = 0; j < m; ++j) {
        out.call(stack, series[0][j], o = offsets[j], points[0][j][1]);
        for (i = 1; i < n; ++i) {
          out.call(stack, series[i][j], o += points[i - 1][j][1], points[i][j][1]);
        }
      }
      return data;
    }
    stack.values = function(x) {
      if (!arguments.length) return values;
      values = x;
      return stack;
    };
    stack.order = function(x) {
      if (!arguments.length) return order;
      order = typeof x === "function" ? x : d3_layout_stackOrders.get(x) || d3_layout_stackOrderDefault;
      return stack;
    };
    stack.offset = function(x) {
      if (!arguments.length) return offset;
      offset = typeof x === "function" ? x : d3_layout_stackOffsets.get(x) || d3_layout_stackOffsetZero;
      return stack;
    };
    stack.x = function(z) {
      if (!arguments.length) return x;
      x = z;
      return stack;
    };
    stack.y = function(z) {
      if (!arguments.length) return y;
      y = z;
      return stack;
    };
    stack.out = function(z) {
      if (!arguments.length) return out;
      out = z;
      return stack;
    };
    return stack;
  };
  function d3_layout_stackX(d) {
    return d.x;
  }
  function d3_layout_stackY(d) {
    return d.y;
  }
  function d3_layout_stackOut(d, y0, y) {
    d.y0 = y0;
    d.y = y;
  }
  var d3_layout_stackOrders = d3.map({
    "inside-out": function(data) {
      var n = data.length, i, j, max = data.map(d3_layout_stackMaxIndex), sums = data.map(d3_layout_stackReduceSum), index = d3.range(n).sort(function(a, b) {
        return max[a] - max[b];
      }), top = 0, bottom = 0, tops = [], bottoms = [];
      for (i = 0; i < n; ++i) {
        j = index[i];
        if (top < bottom) {
          top += sums[j];
          tops.push(j);
        } else {
          bottom += sums[j];
          bottoms.push(j);
        }
      }
      return bottoms.reverse().concat(tops);
    },
    reverse: function(data) {
      return d3.range(data.length).reverse();
    },
    "default": d3_layout_stackOrderDefault
  });
  var d3_layout_stackOffsets = d3.map({
    silhouette: function(data) {
      var n = data.length, m = data[0].length, sums = [], max = 0, i, j, o, y0 = [];
      for (j = 0; j < m; ++j) {
        for (i = 0, o = 0; i < n; i++) o += data[i][j][1];
        if (o > max) max = o;
        sums.push(o);
      }
      for (j = 0; j < m; ++j) {
        y0[j] = (max - sums[j]) / 2;
      }
      return y0;
    },
    wiggle: function(data) {
      var n = data.length, x = data[0], m = x.length, i, j, k, s1, s2, s3, dx, o, o0, y0 = [];
      y0[0] = o = o0 = 0;
      for (j = 1; j < m; ++j) {
        for (i = 0, s1 = 0; i < n; ++i) s1 += data[i][j][1];
        for (i = 0, s2 = 0, dx = x[j][0] - x[j - 1][0]; i < n; ++i) {
          for (k = 0, s3 = (data[i][j][1] - data[i][j - 1][1]) / (2 * dx); k < i; ++k) {
            s3 += (data[k][j][1] - data[k][j - 1][1]) / dx;
          }
          s2 += s3 * data[i][j][1];
        }
        y0[j] = o -= s1 ? s2 / s1 * dx : 0;
        if (o < o0) o0 = o;
      }
      for (j = 0; j < m; ++j) y0[j] -= o0;
      return y0;
    },
    expand: function(data) {
      var n = data.length, m = data[0].length, k = 1 / n, i, j, o, y0 = [];
      for (j = 0; j < m; ++j) {
        for (i = 0, o = 0; i < n; i++) o += data[i][j][1];
        if (o) for (i = 0; i < n; i++) data[i][j][1] /= o; else for (i = 0; i < n; i++) data[i][j][1] = k;
      }
      for (j = 0; j < m; ++j) y0[j] = 0;
      return y0;
    },
    zero: d3_layout_stackOffsetZero
  });
  function d3_layout_stackOrderDefault(data) {
    return d3.range(data.length);
  }
  function d3_layout_stackOffsetZero(data) {
    var j = -1, m = data[0].length, y0 = [];
    while (++j < m) y0[j] = 0;
    return y0;
  }
  function d3_layout_stackMaxIndex(array) {
    var i = 1, j = 0, v = array[0][1], k, n = array.length;
    for (;i < n; ++i) {
      if ((k = array[i][1]) > v) {
        j = i;
        v = k;
      }
    }
    return j;
  }
  function d3_layout_stackReduceSum(d) {
    return d.reduce(d3_layout_stackSum, 0);
  }
  function d3_layout_stackSum(p, d) {
    return p + d[1];
  }
  d3.layout.histogram = function() {
    var frequency = true, valuer = Number, ranger = d3_layout_histogramRange, binner = d3_layout_histogramBinSturges;
    function histogram(data, i) {
      var bins = [], values = data.map(valuer, this), range = ranger.call(this, values, i), thresholds = binner.call(this, range, values, i), bin, i = -1, n = values.length, m = thresholds.length - 1, k = frequency ? 1 : 1 / n, x;
      while (++i < m) {
        bin = bins[i] = [];
        bin.dx = thresholds[i + 1] - (bin.x = thresholds[i]);
        bin.y = 0;
      }
      if (m > 0) {
        i = -1;
        while (++i < n) {
          x = values[i];
          if (x >= range[0] && x <= range[1]) {
            bin = bins[d3.bisect(thresholds, x, 1, m) - 1];
            bin.y += k;
            bin.push(data[i]);
          }
        }
      }
      return bins;
    }
    histogram.value = function(x) {
      if (!arguments.length) return valuer;
      valuer = x;
      return histogram;
    };
    histogram.range = function(x) {
      if (!arguments.length) return ranger;
      ranger = d3_functor(x);
      return histogram;
    };
    histogram.bins = function(x) {
      if (!arguments.length) return binner;
      binner = typeof x === "number" ? function(range) {
        return d3_layout_histogramBinFixed(range, x);
      } : d3_functor(x);
      return histogram;
    };
    histogram.frequency = function(x) {
      if (!arguments.length) return frequency;
      frequency = !!x;
      return histogram;
    };
    return histogram;
  };
  function d3_layout_histogramBinSturges(range, values) {
    return d3_layout_histogramBinFixed(range, Math.ceil(Math.log(values.length) / Math.LN2 + 1));
  }
  function d3_layout_histogramBinFixed(range, n) {
    var x = -1, b = +range[0], m = (range[1] - b) / n, f = [];
    while (++x <= n) f[x] = m * x + b;
    return f;
  }
  function d3_layout_histogramRange(values) {
    return [ d3.min(values), d3.max(values) ];
  }
  d3.layout.tree = function() {
    var hierarchy = d3.layout.hierarchy().sort(null).value(null), separation = d3_layout_treeSeparation, size = [ 1, 1 ];
    function tree(d, i) {
      var nodes = hierarchy.call(this, d, i), root = nodes[0];
      function firstWalk(node, previousSibling) {
        var children = node.children, layout = node._tree;
        if (children && (n = children.length)) {
          var n, firstChild = children[0], previousChild, ancestor = firstChild, child, i = -1;
          while (++i < n) {
            child = children[i];
            firstWalk(child, previousChild);
            ancestor = apportion(child, previousChild, ancestor);
            previousChild = child;
          }
          d3_layout_treeShift(node);
          var midpoint = .5 * (firstChild._tree.prelim + child._tree.prelim);
          if (previousSibling) {
            layout.prelim = previousSibling._tree.prelim + separation(node, previousSibling);
            layout.mod = layout.prelim - midpoint;
          } else {
            layout.prelim = midpoint;
          }
        } else {
          if (previousSibling) {
            layout.prelim = previousSibling._tree.prelim + separation(node, previousSibling);
          }
        }
      }
      function secondWalk(node, x) {
        node.x = node._tree.prelim + x;
        var children = node.children;
        if (children && (n = children.length)) {
          var i = -1, n;
          x += node._tree.mod;
          while (++i < n) {
            secondWalk(children[i], x);
          }
        }
      }
      function apportion(node, previousSibling, ancestor) {
        if (previousSibling) {
          var vip = node, vop = node, vim = previousSibling, vom = node.parent.children[0], sip = vip._tree.mod, sop = vop._tree.mod, sim = vim._tree.mod, som = vom._tree.mod, shift;
          while (vim = d3_layout_treeRight(vim), vip = d3_layout_treeLeft(vip), vim && vip) {
            vom = d3_layout_treeLeft(vom);
            vop = d3_layout_treeRight(vop);
            vop._tree.ancestor = node;
            shift = vim._tree.prelim + sim - vip._tree.prelim - sip + separation(vim, vip);
            if (shift > 0) {
              d3_layout_treeMove(d3_layout_treeAncestor(vim, node, ancestor), node, shift);
              sip += shift;
              sop += shift;
            }
            sim += vim._tree.mod;
            sip += vip._tree.mod;
            som += vom._tree.mod;
            sop += vop._tree.mod;
          }
          if (vim && !d3_layout_treeRight(vop)) {
            vop._tree.thread = vim;
            vop._tree.mod += sim - sop;
          }
          if (vip && !d3_layout_treeLeft(vom)) {
            vom._tree.thread = vip;
            vom._tree.mod += sip - som;
            ancestor = node;
          }
        }
        return ancestor;
      }
      d3_layout_treeVisitAfter(root, function(node, previousSibling) {
        node._tree = {
          ancestor: node,
          prelim: 0,
          mod: 0,
          change: 0,
          shift: 0,
          number: previousSibling ? previousSibling._tree.number + 1 : 0
        };
      });
      firstWalk(root);
      secondWalk(root, -root._tree.prelim);
      var left = d3_layout_treeSearch(root, d3_layout_treeLeftmost), right = d3_layout_treeSearch(root, d3_layout_treeRightmost), deep = d3_layout_treeSearch(root, d3_layout_treeDeepest), x0 = left.x - separation(left, right) / 2, x1 = right.x + separation(right, left) / 2, y1 = deep.depth || 1;
      d3_layout_treeVisitAfter(root, function(node) {
        node.x = (node.x - x0) / (x1 - x0) * size[0];
        node.y = node.depth / y1 * size[1];
        delete node._tree;
      });
      return nodes;
    }
    tree.separation = function(x) {
      if (!arguments.length) return separation;
      separation = x;
      return tree;
    };
    tree.size = function(x) {
      if (!arguments.length) return size;
      size = x;
      return tree;
    };
    return d3_layout_hierarchyRebind(tree, hierarchy);
  };
  function d3_layout_treeSeparation(a, b) {
    return a.parent == b.parent ? 1 : 2;
  }
  function d3_layout_treeLeft(node) {
    var children = node.children;
    return children && children.length ? children[0] : node._tree.thread;
  }
  function d3_layout_treeRight(node) {
    var children = node.children, n;
    return children && (n = children.length) ? children[n - 1] : node._tree.thread;
  }
  function d3_layout_treeSearch(node, compare) {
    var children = node.children;
    if (children && (n = children.length)) {
      var child, n, i = -1;
      while (++i < n) {
        if (compare(child = d3_layout_treeSearch(children[i], compare), node) > 0) {
          node = child;
        }
      }
    }
    return node;
  }
  function d3_layout_treeRightmost(a, b) {
    return a.x - b.x;
  }
  function d3_layout_treeLeftmost(a, b) {
    return b.x - a.x;
  }
  function d3_layout_treeDeepest(a, b) {
    return a.depth - b.depth;
  }
  function d3_layout_treeVisitAfter(node, callback) {
    function visit(node, previousSibling) {
      var children = node.children;
      if (children && (n = children.length)) {
        var child, previousChild = null, i = -1, n;
        while (++i < n) {
          child = children[i];
          visit(child, previousChild);
          previousChild = child;
        }
      }
      callback(node, previousSibling);
    }
    visit(node, null);
  }
  function d3_layout_treeShift(node) {
    var shift = 0, change = 0, children = node.children, i = children.length, child;
    while (--i >= 0) {
      child = children[i]._tree;
      child.prelim += shift;
      child.mod += shift;
      shift += child.shift + (change += child.change);
    }
  }
  function d3_layout_treeMove(ancestor, node, shift) {
    ancestor = ancestor._tree;
    node = node._tree;
    var change = shift / (node.number - ancestor.number);
    ancestor.change += change;
    node.change -= change;
    node.shift += shift;
    node.prelim += shift;
    node.mod += shift;
  }
  function d3_layout_treeAncestor(vim, node, ancestor) {
    return vim._tree.ancestor.parent == node.parent ? vim._tree.ancestor : ancestor;
  }
  d3.layout.pack = function() {
    var hierarchy = d3.layout.hierarchy().sort(d3_layout_packSort), padding = 0, size = [ 1, 1 ];
    function pack(d, i) {
      var nodes = hierarchy.call(this, d, i), root = nodes[0];
      root.x = 0;
      root.y = 0;
      d3_layout_treeVisitAfter(root, function(d) {
        d.r = Math.sqrt(d.value);
      });
      d3_layout_treeVisitAfter(root, d3_layout_packSiblings);
      var w = size[0], h = size[1], k = Math.max(2 * root.r / w, 2 * root.r / h);
      if (padding > 0) {
        var dr = padding * k / 2;
        d3_layout_treeVisitAfter(root, function(d) {
          d.r += dr;
        });
        d3_layout_treeVisitAfter(root, d3_layout_packSiblings);
        d3_layout_treeVisitAfter(root, function(d) {
          d.r -= dr;
        });
        k = Math.max(2 * root.r / w, 2 * root.r / h);
      }
      d3_layout_packTransform(root, w / 2, h / 2, 1 / k);
      return nodes;
    }
    pack.size = function(x) {
      if (!arguments.length) return size;
      size = x;
      return pack;
    };
    pack.padding = function(_) {
      if (!arguments.length) return padding;
      padding = +_;
      return pack;
    };
    return d3_layout_hierarchyRebind(pack, hierarchy);
  };
  function d3_layout_packSort(a, b) {
    return a.value - b.value;
  }
  function d3_layout_packInsert(a, b) {
    var c = a._pack_next;
    a._pack_next = b;
    b._pack_prev = a;
    b._pack_next = c;
    c._pack_prev = b;
  }
  function d3_layout_packSplice(a, b) {
    a._pack_next = b;
    b._pack_prev = a;
  }
  function d3_layout_packIntersects(a, b) {
    var dx = b.x - a.x, dy = b.y - a.y, dr = a.r + b.r;
    return dr * dr - dx * dx - dy * dy > .001;
  }
  function d3_layout_packSiblings(node) {
    if (!(nodes = node.children) || !(n = nodes.length)) return;
    var nodes, xMin = Infinity, xMax = -Infinity, yMin = Infinity, yMax = -Infinity, a, b, c, i, j, k, n;
    function bound(node) {
      xMin = Math.min(node.x - node.r, xMin);
      xMax = Math.max(node.x + node.r, xMax);
      yMin = Math.min(node.y - node.r, yMin);
      yMax = Math.max(node.y + node.r, yMax);
    }
    nodes.forEach(d3_layout_packLink);
    a = nodes[0];
    a.x = -a.r;
    a.y = 0;
    bound(a);
    if (n > 1) {
      b = nodes[1];
      b.x = b.r;
      b.y = 0;
      bound(b);
      if (n > 2) {
        c = nodes[2];
        d3_layout_packPlace(a, b, c);
        bound(c);
        d3_layout_packInsert(a, c);
        a._pack_prev = c;
        d3_layout_packInsert(c, b);
        b = a._pack_next;
        for (i = 3; i < n; i++) {
          d3_layout_packPlace(a, b, c = nodes[i]);
          var isect = 0, s1 = 1, s2 = 1;
          for (j = b._pack_next; j !== b; j = j._pack_next, s1++) {
            if (d3_layout_packIntersects(j, c)) {
              isect = 1;
              break;
            }
          }
          if (isect == 1) {
            for (k = a._pack_prev; k !== j._pack_prev; k = k._pack_prev, s2++) {
              if (d3_layout_packIntersects(k, c)) {
                break;
              }
            }
          }
          if (isect) {
            if (s1 < s2 || s1 == s2 && b.r < a.r) d3_layout_packSplice(a, b = j); else d3_layout_packSplice(a = k, b);
            i--;
          } else {
            d3_layout_packInsert(a, c);
            b = c;
            bound(c);
          }
        }
      }
    }
    var cx = (xMin + xMax) / 2, cy = (yMin + yMax) / 2, cr = 0;
    for (i = 0; i < n; i++) {
      c = nodes[i];
      c.x -= cx;
      c.y -= cy;
      cr = Math.max(cr, c.r + Math.sqrt(c.x * c.x + c.y * c.y));
    }
    node.r = cr;
    nodes.forEach(d3_layout_packUnlink);
  }
  function d3_layout_packLink(node) {
    node._pack_next = node._pack_prev = node;
  }
  function d3_layout_packUnlink(node) {
    delete node._pack_next;
    delete node._pack_prev;
  }
  function d3_layout_packTransform(node, x, y, k) {
    var children = node.children;
    node.x = x += k * node.x;
    node.y = y += k * node.y;
    node.r *= k;
    if (children) {
      var i = -1, n = children.length;
      while (++i < n) d3_layout_packTransform(children[i], x, y, k);
    }
  }
  function d3_layout_packPlace(a, b, c) {
    var db = a.r + c.r, dx = b.x - a.x, dy = b.y - a.y;
    if (db && (dx || dy)) {
      var da = b.r + c.r, dc = dx * dx + dy * dy;
      da *= da;
      db *= db;
      var x = .5 + (db - da) / (2 * dc), y = Math.sqrt(Math.max(0, 2 * da * (db + dc) - (db -= dc) * db - da * da)) / (2 * dc);
      c.x = a.x + x * dx + y * dy;
      c.y = a.y + x * dy - y * dx;
    } else {
      c.x = a.x + db;
      c.y = a.y;
    }
  }
  d3.layout.cluster = function() {
    var hierarchy = d3.layout.hierarchy().sort(null).value(null), separation = d3_layout_treeSeparation, size = [ 1, 1 ];
    function cluster(d, i) {
      var nodes = hierarchy.call(this, d, i), root = nodes[0], previousNode, x = 0;
      d3_layout_treeVisitAfter(root, function(node) {
        var children = node.children;
        if (children && children.length) {
          node.x = d3_layout_clusterX(children);
          node.y = d3_layout_clusterY(children);
        } else {
          node.x = previousNode ? x += separation(node, previousNode) : 0;
          node.y = 0;
          previousNode = node;
        }
      });
      var left = d3_layout_clusterLeft(root), right = d3_layout_clusterRight(root), x0 = left.x - separation(left, right) / 2, x1 = right.x + separation(right, left) / 2;
      d3_layout_treeVisitAfter(root, function(node) {
        node.x = (node.x - x0) / (x1 - x0) * size[0];
        node.y = (1 - (root.y ? node.y / root.y : 1)) * size[1];
      });
      return nodes;
    }
    cluster.separation = function(x) {
      if (!arguments.length) return separation;
      separation = x;
      return cluster;
    };
    cluster.size = function(x) {
      if (!arguments.length) return size;
      size = x;
      return cluster;
    };
    return d3_layout_hierarchyRebind(cluster, hierarchy);
  };
  function d3_layout_clusterY(children) {
    return 1 + d3.max(children, function(child) {
      return child.y;
    });
  }
  function d3_layout_clusterX(children) {
    return children.reduce(function(x, child) {
      return x + child.x;
    }, 0) / children.length;
  }
  function d3_layout_clusterLeft(node) {
    var children = node.children;
    return children && children.length ? d3_layout_clusterLeft(children[0]) : node;
  }
  function d3_layout_clusterRight(node) {
    var children = node.children, n;
    return children && (n = children.length) ? d3_layout_clusterRight(children[n - 1]) : node;
  }
  d3.layout.treemap = function() {
    var hierarchy = d3.layout.hierarchy(), round = Math.round, size = [ 1, 1 ], padding = null, pad = d3_layout_treemapPadNull, sticky = false, stickies, mode = "squarify", ratio = .5 * (1 + Math.sqrt(5));
    function scale(children, k) {
      var i = -1, n = children.length, child, area;
      while (++i < n) {
        area = (child = children[i]).value * (k < 0 ? 0 : k);
        child.area = isNaN(area) || area <= 0 ? 0 : area;
      }
    }
    function squarify(node) {
      var children = node.children;
      if (children && children.length) {
        var rect = pad(node), row = [], remaining = children.slice(), child, best = Infinity, score, u = mode === "slice" ? rect.dx : mode === "dice" ? rect.dy : mode === "slice-dice" ? node.depth & 1 ? rect.dy : rect.dx : Math.min(rect.dx, rect.dy), n;
        scale(remaining, rect.dx * rect.dy / node.value);
        row.area = 0;
        while ((n = remaining.length) > 0) {
          row.push(child = remaining[n - 1]);
          row.area += child.area;
          if (mode !== "squarify" || (score = worst(row, u)) <= best) {
            remaining.pop();
            best = score;
          } else {
            row.area -= row.pop().area;
            position(row, u, rect, false);
            u = Math.min(rect.dx, rect.dy);
            row.length = row.area = 0;
            best = Infinity;
          }
        }
        if (row.length) {
          position(row, u, rect, true);
          row.length = row.area = 0;
        }
        children.forEach(squarify);
      }
    }
    function stickify(node) {
      var children = node.children;
      if (children && children.length) {
        var rect = pad(node), remaining = children.slice(), child, row = [];
        scale(remaining, rect.dx * rect.dy / node.value);
        row.area = 0;
        while (child = remaining.pop()) {
          row.push(child);
          row.area += child.area;
          if (child.z != null) {
            position(row, child.z ? rect.dx : rect.dy, rect, !remaining.length);
            row.length = row.area = 0;
          }
        }
        children.forEach(stickify);
      }
    }
    function worst(row, u) {
      var s = row.area, r, rmax = 0, rmin = Infinity, i = -1, n = row.length;
      while (++i < n) {
        if (!(r = row[i].area)) continue;
        if (r < rmin) rmin = r;
        if (r > rmax) rmax = r;
      }
      s *= s;
      u *= u;
      return s ? Math.max(u * rmax * ratio / s, s / (u * rmin * ratio)) : Infinity;
    }
    function position(row, u, rect, flush) {
      var i = -1, n = row.length, x = rect.x, y = rect.y, v = u ? round(row.area / u) : 0, o;
      if (u == rect.dx) {
        if (flush || v > rect.dy) v = rect.dy;
        while (++i < n) {
          o = row[i];
          o.x = x;
          o.y = y;
          o.dy = v;
          x += o.dx = Math.min(rect.x + rect.dx - x, v ? round(o.area / v) : 0);
        }
        o.z = true;
        o.dx += rect.x + rect.dx - x;
        rect.y += v;
        rect.dy -= v;
      } else {
        if (flush || v > rect.dx) v = rect.dx;
        while (++i < n) {
          o = row[i];
          o.x = x;
          o.y = y;
          o.dx = v;
          y += o.dy = Math.min(rect.y + rect.dy - y, v ? round(o.area / v) : 0);
        }
        o.z = false;
        o.dy += rect.y + rect.dy - y;
        rect.x += v;
        rect.dx -= v;
      }
    }
    function treemap(d) {
      var nodes = stickies || hierarchy(d), root = nodes[0];
      root.x = 0;
      root.y = 0;
      root.dx = size[0];
      root.dy = size[1];
      if (stickies) hierarchy.revalue(root);
      scale([ root ], root.dx * root.dy / root.value);
      (stickies ? stickify : squarify)(root);
      if (sticky) stickies = nodes;
      return nodes;
    }
    treemap.size = function(x) {
      if (!arguments.length) return size;
      size = x;
      return treemap;
    };
    treemap.padding = function(x) {
      if (!arguments.length) return padding;
      function padFunction(node) {
        var p = x.call(treemap, node, node.depth);
        return p == null ? d3_layout_treemapPadNull(node) : d3_layout_treemapPad(node, typeof p === "number" ? [ p, p, p, p ] : p);
      }
      function padConstant(node) {
        return d3_layout_treemapPad(node, x);
      }
      var type;
      pad = (padding = x) == null ? d3_layout_treemapPadNull : (type = typeof x) === "function" ? padFunction : type === "number" ? (x = [ x, x, x, x ], 
      padConstant) : padConstant;
      return treemap;
    };
    treemap.round = function(x) {
      if (!arguments.length) return round != Number;
      round = x ? Math.round : Number;
      return treemap;
    };
    treemap.sticky = function(x) {
      if (!arguments.length) return sticky;
      sticky = x;
      stickies = null;
      return treemap;
    };
    treemap.ratio = function(x) {
      if (!arguments.length) return ratio;
      ratio = x;
      return treemap;
    };
    treemap.mode = function(x) {
      if (!arguments.length) return mode;
      mode = x + "";
      return treemap;
    };
    return d3_layout_hierarchyRebind(treemap, hierarchy);
  };
  function d3_layout_treemapPadNull(node) {
    return {
      x: node.x,
      y: node.y,
      dx: node.dx,
      dy: node.dy
    };
  }
  function d3_layout_treemapPad(node, padding) {
    var x = node.x + padding[3], y = node.y + padding[0], dx = node.dx - padding[1] - padding[3], dy = node.dy - padding[0] - padding[2];
    if (dx < 0) {
      x += dx / 2;
      dx = 0;
    }
    if (dy < 0) {
      y += dy / 2;
      dy = 0;
    }
    return {
      x: x,
      y: y,
      dx: dx,
      dy: dy
    };
  }
  d3.random = {
    normal: function(µ, σ) {
      var n = arguments.length;
      if (n < 2) σ = 1;
      if (n < 1) µ = 0;
      return function() {
        var x, y, r;
        do {
          x = Math.random() * 2 - 1;
          y = Math.random() * 2 - 1;
          r = x * x + y * y;
        } while (!r || r > 1);
        return µ + σ * x * Math.sqrt(-2 * Math.log(r) / r);
      };
    },
    logNormal: function() {
      var random = d3.random.normal.apply(d3, arguments);
      return function() {
        return Math.exp(random());
      };
    },
    irwinHall: function(m) {
      return function() {
        for (var s = 0, j = 0; j < m; j++) s += Math.random();
        return s / m;
      };
    }
  };
  d3.scale = {};
  function d3_scaleExtent(domain) {
    var start = domain[0], stop = domain[domain.length - 1];
    return start < stop ? [ start, stop ] : [ stop, start ];
  }
  function d3_scaleRange(scale) {
    return scale.rangeExtent ? scale.rangeExtent() : d3_scaleExtent(scale.range());
  }
  function d3_scale_bilinear(domain, range, uninterpolate, interpolate) {
    var u = uninterpolate(domain[0], domain[1]), i = interpolate(range[0], range[1]);
    return function(x) {
      return i(u(x));
    };
  }
  function d3_scale_nice(domain, nice) {
    var i0 = 0, i1 = domain.length - 1, x0 = domain[i0], x1 = domain[i1], dx;
    if (x1 < x0) {
      dx = i0, i0 = i1, i1 = dx;
      dx = x0, x0 = x1, x1 = dx;
    }
    if (nice = nice(x1 - x0)) {
      domain[i0] = nice.floor(x0);
      domain[i1] = nice.ceil(x1);
    }
    return domain;
  }
  function d3_scale_polylinear(domain, range, uninterpolate, interpolate) {
    var u = [], i = [], j = 0, k = Math.min(domain.length, range.length) - 1;
    if (domain[k] < domain[0]) {
      domain = domain.slice().reverse();
      range = range.slice().reverse();
    }
    while (++j <= k) {
      u.push(uninterpolate(domain[j - 1], domain[j]));
      i.push(interpolate(range[j - 1], range[j]));
    }
    return function(x) {
      var j = d3.bisect(domain, x, 1, k) - 1;
      return i[j](u[j](x));
    };
  }
  d3.scale.linear = function() {
    return d3_scale_linear([ 0, 1 ], [ 0, 1 ], d3_interpolate, false);
  };
  function d3_scale_linear(domain, range, interpolate, clamp) {
    var output, input;
    function rescale() {
      var linear = Math.min(domain.length, range.length) > 2 ? d3_scale_polylinear : d3_scale_bilinear, uninterpolate = clamp ? d3_uninterpolateClamp : d3_uninterpolateNumber;
      output = linear(domain, range, uninterpolate, interpolate);
      input = linear(range, domain, uninterpolate, d3_interpolate);
      return scale;
    }
    function scale(x) {
      return output(x);
    }
    scale.invert = function(y) {
      return input(y);
    };
    scale.domain = function(x) {
      if (!arguments.length) return domain;
      domain = x.map(Number);
      return rescale();
    };
    scale.range = function(x) {
      if (!arguments.length) return range;
      range = x;
      return rescale();
    };
    scale.rangeRound = function(x) {
      return scale.range(x).interpolate(d3_interpolateRound);
    };
    scale.clamp = function(x) {
      if (!arguments.length) return clamp;
      clamp = x;
      return rescale();
    };
    scale.interpolate = function(x) {
      if (!arguments.length) return interpolate;
      interpolate = x;
      return rescale();
    };
    scale.ticks = function(m) {
      return d3_scale_linearTicks(domain, m);
    };
    scale.tickFormat = function(m, format) {
      return d3_scale_linearTickFormat(domain, m, format);
    };
    scale.nice = function() {
      d3_scale_nice(domain, d3_scale_linearNice);
      return rescale();
    };
    scale.copy = function() {
      return d3_scale_linear(domain, range, interpolate, clamp);
    };
    return rescale();
  }
  function d3_scale_linearRebind(scale, linear) {
    return d3.rebind(scale, linear, "range", "rangeRound", "interpolate", "clamp");
  }
  function d3_scale_linearNice(dx) {
    dx = Math.pow(10, Math.round(Math.log(dx) / Math.LN10) - 1);
    return dx && {
      floor: function(x) {
        return Math.floor(x / dx) * dx;
      },
      ceil: function(x) {
        return Math.ceil(x / dx) * dx;
      }
    };
  }
  function d3_scale_linearTickRange(domain, m) {
    var extent = d3_scaleExtent(domain), span = extent[1] - extent[0], step = Math.pow(10, Math.floor(Math.log(span / m) / Math.LN10)), err = m / span * step;
    if (err <= .15) step *= 10; else if (err <= .35) step *= 5; else if (err <= .75) step *= 2;
    extent[0] = Math.ceil(extent[0] / step) * step;
    extent[1] = Math.floor(extent[1] / step) * step + step * .5;
    extent[2] = step;
    return extent;
  }
  function d3_scale_linearTicks(domain, m) {
    return d3.range.apply(d3, d3_scale_linearTickRange(domain, m));
  }
  function d3_scale_linearTickFormat(domain, m, format) {
    var precision = -Math.floor(Math.log(d3_scale_linearTickRange(domain, m)[2]) / Math.LN10 + .01);
    return d3.format(format ? format.replace(d3_format_re, function(a, b, c, d, e, f, g, h, i, j) {
      return [ b, c, d, e, f, g, h, i || "." + (precision - (j === "%") * 2), j ].join("");
    }) : ",." + precision + "f");
  }
  d3.scale.log = function() {
    return d3_scale_log(d3.scale.linear().domain([ 0, Math.LN10 ]), 10, d3_scale_logp, d3_scale_powp);
  };
  function d3_scale_log(linear, base, log, pow) {
    function scale(x) {
      return linear(log(x));
    }
    scale.invert = function(x) {
      return pow(linear.invert(x));
    };
    scale.domain = function(x) {
      if (!arguments.length) return linear.domain().map(pow);
      if (x[0] < 0) log = d3_scale_logn, pow = d3_scale_pown; else log = d3_scale_logp, 
      pow = d3_scale_powp;
      linear.domain(x.map(log));
      return scale;
    };
    scale.base = function(_) {
      if (!arguments.length) return base;
      base = +_;
      return scale;
    };
    scale.nice = function() {
      linear.domain(d3_scale_nice(linear.domain(), d3_scale_logNice(base)));
      return scale;
    };
    scale.ticks = function() {
      var extent = d3_scaleExtent(linear.domain()), ticks = [];
      if (extent.every(isFinite)) {
        var b = Math.log(base), i = Math.floor(extent[0] / b), j = Math.ceil(extent[1] / b), u = pow(extent[0]), v = pow(extent[1]), n = base % 1 ? 2 : base;
        if (log === d3_scale_logn) {
          ticks.push(-Math.pow(base, -i));
          for (;i++ < j; ) for (var k = n - 1; k > 0; k--) ticks.push(-Math.pow(base, -i) * k);
        } else {
          for (;i < j; i++) for (var k = 1; k < n; k++) ticks.push(Math.pow(base, i) * k);
          ticks.push(Math.pow(base, i));
        }
        for (i = 0; ticks[i] < u; i++) {}
        for (j = ticks.length; ticks[j - 1] > v; j--) {}
        ticks = ticks.slice(i, j);
      }
      return ticks;
    };
    scale.tickFormat = function(n, format) {
      if (arguments.length < 2) format = d3_scale_logFormat;
      if (!arguments.length) return format;
      var b = Math.log(base), k = Math.max(.1, n / scale.ticks().length), f = log === d3_scale_logn ? (e = -1e-12, 
      Math.floor) : (e = 1e-12, Math.ceil), e;
      return function(d) {
        return d / pow(b * f(log(d) / b + e)) <= k ? format(d) : "";
      };
    };
    scale.copy = function() {
      return d3_scale_log(linear.copy(), base, log, pow);
    };
    return d3_scale_linearRebind(scale, linear);
  }
  var d3_scale_logFormat = d3.format(".0e");
  function d3_scale_logp(x) {
    return Math.log(x < 0 ? 0 : x);
  }
  function d3_scale_powp(x) {
    return Math.exp(x);
  }
  function d3_scale_logn(x) {
    return -Math.log(x > 0 ? 0 : -x);
  }
  function d3_scale_pown(x) {
    return -Math.exp(-x);
  }
  function d3_scale_logNice(base) {
    base = Math.log(base);
    var nice = {
      floor: function(x) {
        return Math.floor(x / base) * base;
      },
      ceil: function(x) {
        return Math.ceil(x / base) * base;
      }
    };
    return function() {
      return nice;
    };
  }
  d3.scale.pow = function() {
    return d3_scale_pow(d3.scale.linear(), 1);
  };
  function d3_scale_pow(linear, exponent) {
    var powp = d3_scale_powPow(exponent), powb = d3_scale_powPow(1 / exponent);
    function scale(x) {
      return linear(powp(x));
    }
    scale.invert = function(x) {
      return powb(linear.invert(x));
    };
    scale.domain = function(x) {
      if (!arguments.length) return linear.domain().map(powb);
      linear.domain(x.map(powp));
      return scale;
    };
    scale.ticks = function(m) {
      return d3_scale_linearTicks(scale.domain(), m);
    };
    scale.tickFormat = function(m, format) {
      return d3_scale_linearTickFormat(scale.domain(), m, format);
    };
    scale.nice = function() {
      return scale.domain(d3_scale_nice(scale.domain(), d3_scale_linearNice));
    };
    scale.exponent = function(x) {
      if (!arguments.length) return exponent;
      var domain = scale.domain();
      powp = d3_scale_powPow(exponent = x);
      powb = d3_scale_powPow(1 / exponent);
      return scale.domain(domain);
    };
    scale.copy = function() {
      return d3_scale_pow(linear.copy(), exponent);
    };
    return d3_scale_linearRebind(scale, linear);
  }
  function d3_scale_powPow(e) {
    return function(x) {
      return x < 0 ? -Math.pow(-x, e) : Math.pow(x, e);
    };
  }
  d3.scale.sqrt = function() {
    return d3.scale.pow().exponent(.5);
  };
  d3.scale.ordinal = function() {
    return d3_scale_ordinal([], {
      t: "range",
      a: [ [] ]
    });
  };
  function d3_scale_ordinal(domain, ranger) {
    var index, range, rangeBand;
    function scale(x) {
      return range[((index.get(x) || index.set(x, domain.push(x))) - 1) % range.length];
    }
    function steps(start, step) {
      return d3.range(domain.length).map(function(i) {
        return start + step * i;
      });
    }
    scale.domain = function(x) {
      if (!arguments.length) return domain;
      domain = [];
      index = new d3_Map();
      var i = -1, n = x.length, xi;
      while (++i < n) if (!index.has(xi = x[i])) index.set(xi, domain.push(xi));
      return scale[ranger.t].apply(scale, ranger.a);
    };
    scale.range = function(x) {
      if (!arguments.length) return range;
      range = x;
      rangeBand = 0;
      ranger = {
        t: "range",
        a: arguments
      };
      return scale;
    };
    scale.rangePoints = function(x, padding) {
      if (arguments.length < 2) padding = 0;
      var start = x[0], stop = x[1], step = (stop - start) / (Math.max(1, domain.length - 1) + padding);
      range = steps(domain.length < 2 ? (start + stop) / 2 : start + step * padding / 2, step);
      rangeBand = 0;
      ranger = {
        t: "rangePoints",
        a: arguments
      };
      return scale;
    };
    scale.rangeBands = function(x, padding, outerPadding) {
      if (arguments.length < 2) padding = 0;
      if (arguments.length < 3) outerPadding = padding;
      var reverse = x[1] < x[0], start = x[reverse - 0], stop = x[1 - reverse], step = (stop - start) / (domain.length - padding + 2 * outerPadding);
      range = steps(start + step * outerPadding, step);
      if (reverse) range.reverse();
      rangeBand = step * (1 - padding);
      ranger = {
        t: "rangeBands",
        a: arguments
      };
      return scale;
    };
    scale.rangeRoundBands = function(x, padding, outerPadding) {
      if (arguments.length < 2) padding = 0;
      if (arguments.length < 3) outerPadding = padding;
      var reverse = x[1] < x[0], start = x[reverse - 0], stop = x[1 - reverse], step = Math.floor((stop - start) / (domain.length - padding + 2 * outerPadding)), error = stop - start - (domain.length - padding) * step;
      range = steps(start + Math.round(error / 2), step);
      if (reverse) range.reverse();
      rangeBand = Math.round(step * (1 - padding));
      ranger = {
        t: "rangeRoundBands",
        a: arguments
      };
      return scale;
    };
    scale.rangeBand = function() {
      return rangeBand;
    };
    scale.rangeExtent = function() {
      return d3_scaleExtent(ranger.a[0]);
    };
    scale.copy = function() {
      return d3_scale_ordinal(domain, ranger);
    };
    return scale.domain(domain);
  }
  d3.scale.category10 = function() {
    return d3.scale.ordinal().range(d3_category10);
  };
  d3.scale.category20 = function() {
    return d3.scale.ordinal().range(d3_category20);
  };
  d3.scale.category20b = function() {
    return d3.scale.ordinal().range(d3_category20b);
  };
  d3.scale.category20c = function() {
    return d3.scale.ordinal().range(d3_category20c);
  };
  var d3_category10 = [ "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf" ];
  var d3_category20 = [ "#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f", "#c7c7c7", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5" ];
  var d3_category20b = [ "#393b79", "#5254a3", "#6b6ecf", "#9c9ede", "#637939", "#8ca252", "#b5cf6b", "#cedb9c", "#8c6d31", "#bd9e39", "#e7ba52", "#e7cb94", "#843c39", "#ad494a", "#d6616b", "#e7969c", "#7b4173", "#a55194", "#ce6dbd", "#de9ed6" ];
  var d3_category20c = [ "#3182bd", "#6baed6", "#9ecae1", "#c6dbef", "#e6550d", "#fd8d3c", "#fdae6b", "#fdd0a2", "#31a354", "#74c476", "#a1d99b", "#c7e9c0", "#756bb1", "#9e9ac8", "#bcbddc", "#dadaeb", "#636363", "#969696", "#bdbdbd", "#d9d9d9" ];
  d3.scale.quantile = function() {
    return d3_scale_quantile([], []);
  };
  function d3_scale_quantile(domain, range) {
    var thresholds;
    function rescale() {
      var k = 0, q = range.length;
      thresholds = [];
      while (++k < q) thresholds[k - 1] = d3.quantile(domain, k / q);
      return scale;
    }
    function scale(x) {
      if (isNaN(x = +x)) return NaN;
      return range[d3.bisect(thresholds, x)];
    }
    scale.domain = function(x) {
      if (!arguments.length) return domain;
      domain = x.filter(function(d) {
        return !isNaN(d);
      }).sort(d3.ascending);
      return rescale();
    };
    scale.range = function(x) {
      if (!arguments.length) return range;
      range = x;
      return rescale();
    };
    scale.quantiles = function() {
      return thresholds;
    };
    scale.copy = function() {
      return d3_scale_quantile(domain, range);
    };
    return rescale();
  }
  d3.scale.quantize = function() {
    return d3_scale_quantize(0, 1, [ 0, 1 ]);
  };
  function d3_scale_quantize(x0, x1, range) {
    var kx, i;
    function scale(x) {
      return range[Math.max(0, Math.min(i, Math.floor(kx * (x - x0))))];
    }
    function rescale() {
      kx = range.length / (x1 - x0);
      i = range.length - 1;
      return scale;
    }
    scale.domain = function(x) {
      if (!arguments.length) return [ x0, x1 ];
      x0 = +x[0];
      x1 = +x[x.length - 1];
      return rescale();
    };
    scale.range = function(x) {
      if (!arguments.length) return range;
      range = x;
      return rescale();
    };
    scale.copy = function() {
      return d3_scale_quantize(x0, x1, range);
    };
    return rescale();
  }
  d3.scale.threshold = function() {
    return d3_scale_threshold([ .5 ], [ 0, 1 ]);
  };
  function d3_scale_threshold(domain, range) {
    function scale(x) {
      return range[d3.bisect(domain, x)];
    }
    scale.domain = function(_) {
      if (!arguments.length) return domain;
      domain = _;
      return scale;
    };
    scale.range = function(_) {
      if (!arguments.length) return range;
      range = _;
      return scale;
    };
    scale.copy = function() {
      return d3_scale_threshold(domain, range);
    };
    return scale;
  }
  d3.scale.identity = function() {
    return d3_scale_identity([ 0, 1 ]);
  };
  function d3_scale_identity(domain) {
    function identity(x) {
      return +x;
    }
    identity.invert = identity;
    identity.domain = identity.range = function(x) {
      if (!arguments.length) return domain;
      domain = x.map(identity);
      return identity;
    };
    identity.ticks = function(m) {
      return d3_scale_linearTicks(domain, m);
    };
    identity.tickFormat = function(m, format) {
      return d3_scale_linearTickFormat(domain, m, format);
    };
    identity.copy = function() {
      return d3_scale_identity(domain);
    };
    return identity;
  }
  d3.svg.arc = function() {
    var innerRadius = d3_svg_arcInnerRadius, outerRadius = d3_svg_arcOuterRadius, startAngle = d3_svg_arcStartAngle, endAngle = d3_svg_arcEndAngle;
    function arc() {
      var r0 = innerRadius.apply(this, arguments), r1 = outerRadius.apply(this, arguments), a0 = startAngle.apply(this, arguments) + d3_svg_arcOffset, a1 = endAngle.apply(this, arguments) + d3_svg_arcOffset, da = (a1 < a0 && (da = a0, 
      a0 = a1, a1 = da), a1 - a0), df = da < π ? "0" : "1", c0 = Math.cos(a0), s0 = Math.sin(a0), c1 = Math.cos(a1), s1 = Math.sin(a1);
      return da >= d3_svg_arcMax ? r0 ? "M0," + r1 + "A" + r1 + "," + r1 + " 0 1,1 0," + -r1 + "A" + r1 + "," + r1 + " 0 1,1 0," + r1 + "M0," + r0 + "A" + r0 + "," + r0 + " 0 1,0 0," + -r0 + "A" + r0 + "," + r0 + " 0 1,0 0," + r0 + "Z" : "M0," + r1 + "A" + r1 + "," + r1 + " 0 1,1 0," + -r1 + "A" + r1 + "," + r1 + " 0 1,1 0," + r1 + "Z" : r0 ? "M" + r1 * c0 + "," + r1 * s0 + "A" + r1 + "," + r1 + " 0 " + df + ",1 " + r1 * c1 + "," + r1 * s1 + "L" + r0 * c1 + "," + r0 * s1 + "A" + r0 + "," + r0 + " 0 " + df + ",0 " + r0 * c0 + "," + r0 * s0 + "Z" : "M" + r1 * c0 + "," + r1 * s0 + "A" + r1 + "," + r1 + " 0 " + df + ",1 " + r1 * c1 + "," + r1 * s1 + "L0,0" + "Z";
    }
    arc.innerRadius = function(v) {
      if (!arguments.length) return innerRadius;
      innerRadius = d3_functor(v);
      return arc;
    };
    arc.outerRadius = function(v) {
      if (!arguments.length) return outerRadius;
      outerRadius = d3_functor(v);
      return arc;
    };
    arc.startAngle = function(v) {
      if (!arguments.length) return startAngle;
      startAngle = d3_functor(v);
      return arc;
    };
    arc.endAngle = function(v) {
      if (!arguments.length) return endAngle;
      endAngle = d3_functor(v);
      return arc;
    };
    arc.centroid = function() {
      var r = (innerRadius.apply(this, arguments) + outerRadius.apply(this, arguments)) / 2, a = (startAngle.apply(this, arguments) + endAngle.apply(this, arguments)) / 2 + d3_svg_arcOffset;
      return [ Math.cos(a) * r, Math.sin(a) * r ];
    };
    return arc;
  };
  var d3_svg_arcOffset = -π / 2, d3_svg_arcMax = 2 * π - 1e-6;
  function d3_svg_arcInnerRadius(d) {
    return d.innerRadius;
  }
  function d3_svg_arcOuterRadius(d) {
    return d.outerRadius;
  }
  function d3_svg_arcStartAngle(d) {
    return d.startAngle;
  }
  function d3_svg_arcEndAngle(d) {
    return d.endAngle;
  }
  d3.svg.line.radial = function() {
    var line = d3_svg_line(d3_svg_lineRadial);
    line.radius = line.x, delete line.x;
    line.angle = line.y, delete line.y;
    return line;
  };
  function d3_svg_lineRadial(points) {
    var point, i = -1, n = points.length, r, a;
    while (++i < n) {
      point = points[i];
      r = point[0];
      a = point[1] + d3_svg_arcOffset;
      point[0] = r * Math.cos(a);
      point[1] = r * Math.sin(a);
    }
    return points;
  }
  function d3_svg_area(projection) {
    var x0 = d3_svg_lineX, x1 = d3_svg_lineX, y0 = 0, y1 = d3_svg_lineY, defined = d3_true, interpolate = d3_svg_lineLinear, interpolateKey = interpolate.key, interpolateReverse = interpolate, L = "L", tension = .7;
    function area(data) {
      var segments = [], points0 = [], points1 = [], i = -1, n = data.length, d, fx0 = d3_functor(x0), fy0 = d3_functor(y0), fx1 = x0 === x1 ? function() {
        return x;
      } : d3_functor(x1), fy1 = y0 === y1 ? function() {
        return y;
      } : d3_functor(y1), x, y;
      function segment() {
        segments.push("M", interpolate(projection(points1), tension), L, interpolateReverse(projection(points0.reverse()), tension), "Z");
      }
      while (++i < n) {
        if (defined.call(this, d = data[i], i)) {
          points0.push([ x = +fx0.call(this, d, i), y = +fy0.call(this, d, i) ]);
          points1.push([ +fx1.call(this, d, i), +fy1.call(this, d, i) ]);
        } else if (points0.length) {
          segment();
          points0 = [];
          points1 = [];
        }
      }
      if (points0.length) segment();
      return segments.length ? segments.join("") : null;
    }
    area.x = function(_) {
      if (!arguments.length) return x1;
      x0 = x1 = _;
      return area;
    };
    area.x0 = function(_) {
      if (!arguments.length) return x0;
      x0 = _;
      return area;
    };
    area.x1 = function(_) {
      if (!arguments.length) return x1;
      x1 = _;
      return area;
    };
    area.y = function(_) {
      if (!arguments.length) return y1;
      y0 = y1 = _;
      return area;
    };
    area.y0 = function(_) {
      if (!arguments.length) return y0;
      y0 = _;
      return area;
    };
    area.y1 = function(_) {
      if (!arguments.length) return y1;
      y1 = _;
      return area;
    };
    area.defined = function(_) {
      if (!arguments.length) return defined;
      defined = _;
      return area;
    };
    area.interpolate = function(_) {
      if (!arguments.length) return interpolateKey;
      if (typeof _ === "function") interpolateKey = interpolate = _; else interpolateKey = (interpolate = d3_svg_lineInterpolators.get(_) || d3_svg_lineLinear).key;
      interpolateReverse = interpolate.reverse || interpolate;
      L = interpolate.closed ? "M" : "L";
      return area;
    };
    area.tension = function(_) {
      if (!arguments.length) return tension;
      tension = _;
      return area;
    };
    return area;
  }
  d3_svg_lineStepBefore.reverse = d3_svg_lineStepAfter;
  d3_svg_lineStepAfter.reverse = d3_svg_lineStepBefore;
  d3.svg.area = function() {
    return d3_svg_area(d3_identity);
  };
  d3.svg.area.radial = function() {
    var area = d3_svg_area(d3_svg_lineRadial);
    area.radius = area.x, delete area.x;
    area.innerRadius = area.x0, delete area.x0;
    area.outerRadius = area.x1, delete area.x1;
    area.angle = area.y, delete area.y;
    area.startAngle = area.y0, delete area.y0;
    area.endAngle = area.y1, delete area.y1;
    return area;
  };
  d3.svg.chord = function() {
    var source = d3_source, target = d3_target, radius = d3_svg_chordRadius, startAngle = d3_svg_arcStartAngle, endAngle = d3_svg_arcEndAngle;
    function chord(d, i) {
      var s = subgroup(this, source, d, i), t = subgroup(this, target, d, i);
      return "M" + s.p0 + arc(s.r, s.p1, s.a1 - s.a0) + (equals(s, t) ? curve(s.r, s.p1, s.r, s.p0) : curve(s.r, s.p1, t.r, t.p0) + arc(t.r, t.p1, t.a1 - t.a0) + curve(t.r, t.p1, s.r, s.p0)) + "Z";
    }
    function subgroup(self, f, d, i) {
      var subgroup = f.call(self, d, i), r = radius.call(self, subgroup, i), a0 = startAngle.call(self, subgroup, i) + d3_svg_arcOffset, a1 = endAngle.call(self, subgroup, i) + d3_svg_arcOffset;
      return {
        r: r,
        a0: a0,
        a1: a1,
        p0: [ r * Math.cos(a0), r * Math.sin(a0) ],
        p1: [ r * Math.cos(a1), r * Math.sin(a1) ]
      };
    }
    function equals(a, b) {
      return a.a0 == b.a0 && a.a1 == b.a1;
    }
    function arc(r, p, a) {
      return "A" + r + "," + r + " 0 " + +(a > π) + ",1 " + p;
    }
    function curve(r0, p0, r1, p1) {
      return "Q 0,0 " + p1;
    }
    chord.radius = function(v) {
      if (!arguments.length) return radius;
      radius = d3_functor(v);
      return chord;
    };
    chord.source = function(v) {
      if (!arguments.length) return source;
      source = d3_functor(v);
      return chord;
    };
    chord.target = function(v) {
      if (!arguments.length) return target;
      target = d3_functor(v);
      return chord;
    };
    chord.startAngle = function(v) {
      if (!arguments.length) return startAngle;
      startAngle = d3_functor(v);
      return chord;
    };
    chord.endAngle = function(v) {
      if (!arguments.length) return endAngle;
      endAngle = d3_functor(v);
      return chord;
    };
    return chord;
  };
  function d3_svg_chordRadius(d) {
    return d.radius;
  }
  d3.svg.diagonal = function() {
    var source = d3_source, target = d3_target, projection = d3_svg_diagonalProjection;
    function diagonal(d, i) {
      var p0 = source.call(this, d, i), p3 = target.call(this, d, i), m = (p0.y + p3.y) / 2, p = [ p0, {
        x: p0.x,
        y: m
      }, {
        x: p3.x,
        y: m
      }, p3 ];
      p = p.map(projection);
      return "M" + p[0] + "C" + p[1] + " " + p[2] + " " + p[3];
    }
    diagonal.source = function(x) {
      if (!arguments.length) return source;
      source = d3_functor(x);
      return diagonal;
    };
    diagonal.target = function(x) {
      if (!arguments.length) return target;
      target = d3_functor(x);
      return diagonal;
    };
    diagonal.projection = function(x) {
      if (!arguments.length) return projection;
      projection = x;
      return diagonal;
    };
    return diagonal;
  };
  function d3_svg_diagonalProjection(d) {
    return [ d.x, d.y ];
  }
  d3.svg.diagonal.radial = function() {
    var diagonal = d3.svg.diagonal(), projection = d3_svg_diagonalProjection, projection_ = diagonal.projection;
    diagonal.projection = function(x) {
      return arguments.length ? projection_(d3_svg_diagonalRadialProjection(projection = x)) : projection;
    };
    return diagonal;
  };
  function d3_svg_diagonalRadialProjection(projection) {
    return function() {
      var d = projection.apply(this, arguments), r = d[0], a = d[1] + d3_svg_arcOffset;
      return [ r * Math.cos(a), r * Math.sin(a) ];
    };
  }
  d3.svg.symbol = function() {
    var type = d3_svg_symbolType, size = d3_svg_symbolSize;
    function symbol(d, i) {
      return (d3_svg_symbols.get(type.call(this, d, i)) || d3_svg_symbolCircle)(size.call(this, d, i));
    }
    symbol.type = function(x) {
      if (!arguments.length) return type;
      type = d3_functor(x);
      return symbol;
    };
    symbol.size = function(x) {
      if (!arguments.length) return size;
      size = d3_functor(x);
      return symbol;
    };
    return symbol;
  };
  function d3_svg_symbolSize() {
    return 64;
  }
  function d3_svg_symbolType() {
    return "circle";
  }
  function d3_svg_symbolCircle(size) {
    var r = Math.sqrt(size / π);
    return "M0," + r + "A" + r + "," + r + " 0 1,1 0," + -r + "A" + r + "," + r + " 0 1,1 0," + r + "Z";
  }
  var d3_svg_symbols = d3.map({
    circle: d3_svg_symbolCircle,
    cross: function(size) {
      var r = Math.sqrt(size / 5) / 2;
      return "M" + -3 * r + "," + -r + "H" + -r + "V" + -3 * r + "H" + r + "V" + -r + "H" + 3 * r + "V" + r + "H" + r + "V" + 3 * r + "H" + -r + "V" + r + "H" + -3 * r + "Z";
    },
    diamond: function(size) {
      var ry = Math.sqrt(size / (2 * d3_svg_symbolTan30)), rx = ry * d3_svg_symbolTan30;
      return "M0," + -ry + "L" + rx + ",0" + " 0," + ry + " " + -rx + ",0" + "Z";
    },
    square: function(size) {
      var r = Math.sqrt(size) / 2;
      return "M" + -r + "," + -r + "L" + r + "," + -r + " " + r + "," + r + " " + -r + "," + r + "Z";
    },
    "triangle-down": function(size) {
      var rx = Math.sqrt(size / d3_svg_symbolSqrt3), ry = rx * d3_svg_symbolSqrt3 / 2;
      return "M0," + ry + "L" + rx + "," + -ry + " " + -rx + "," + -ry + "Z";
    },
    "triangle-up": function(size) {
      var rx = Math.sqrt(size / d3_svg_symbolSqrt3), ry = rx * d3_svg_symbolSqrt3 / 2;
      return "M0," + -ry + "L" + rx + "," + ry + " " + -rx + "," + ry + "Z";
    }
  });
  d3.svg.symbolTypes = d3_svg_symbols.keys();
  var d3_svg_symbolSqrt3 = Math.sqrt(3), d3_svg_symbolTan30 = Math.tan(30 * d3_radians);
  function d3_transition(groups, id) {
    d3_arraySubclass(groups, d3_transitionPrototype);
    groups.id = id;
    return groups;
  }
  var d3_transitionPrototype = [], d3_transitionId = 0, d3_transitionInheritId, d3_transitionInherit = {
    ease: d3_ease_cubicInOut,
    delay: 0,
    duration: 250
  };
  d3_transitionPrototype.call = d3_selectionPrototype.call;
  d3_transitionPrototype.empty = d3_selectionPrototype.empty;
  d3_transitionPrototype.node = d3_selectionPrototype.node;
  d3.transition = function(selection) {
    return arguments.length ? d3_transitionInheritId ? selection.transition() : selection : d3_selectionRoot.transition();
  };
  d3.transition.prototype = d3_transitionPrototype;
  d3_transitionPrototype.select = function(selector) {
    var id = this.id, subgroups = [], subgroup, subnode, node;
    if (typeof selector !== "function") selector = d3_selection_selector(selector);
    for (var j = -1, m = this.length; ++j < m; ) {
      subgroups.push(subgroup = []);
      for (var group = this[j], i = -1, n = group.length; ++i < n; ) {
        if ((node = group[i]) && (subnode = selector.call(node, node.__data__, i))) {
          if ("__data__" in node) subnode.__data__ = node.__data__;
          d3_transitionNode(subnode, i, id, node.__transition__[id]);
          subgroup.push(subnode);
        } else {
          subgroup.push(null);
        }
      }
    }
    return d3_transition(subgroups, id);
  };
  d3_transitionPrototype.selectAll = function(selector) {
    var id = this.id, subgroups = [], subgroup, subnodes, node, subnode, transition;
    if (typeof selector !== "function") selector = d3_selection_selectorAll(selector);
    for (var j = -1, m = this.length; ++j < m; ) {
      for (var group = this[j], i = -1, n = group.length; ++i < n; ) {
        if (node = group[i]) {
          transition = node.__transition__[id];
          subnodes = selector.call(node, node.__data__, i);
          subgroups.push(subgroup = []);
          for (var k = -1, o = subnodes.length; ++k < o; ) {
            d3_transitionNode(subnode = subnodes[k], k, id, transition);
            subgroup.push(subnode);
          }
        }
      }
    }
    return d3_transition(subgroups, id);
  };
  d3_transitionPrototype.filter = function(filter) {
    var subgroups = [], subgroup, group, node;
    if (typeof filter !== "function") filter = d3_selection_filter(filter);
    for (var j = 0, m = this.length; j < m; j++) {
      subgroups.push(subgroup = []);
      for (var group = this[j], i = 0, n = group.length; i < n; i++) {
        if ((node = group[i]) && filter.call(node, node.__data__, i)) {
          subgroup.push(node);
        }
      }
    }
    return d3_transition(subgroups, this.id, this.time).ease(this.ease());
  };
  d3_transitionPrototype.tween = function(name, tween) {
    var id = this.id;
    if (arguments.length < 2) return this.node().__transition__[id].tween.get(name);
    return d3_selection_each(this, tween == null ? function(node) {
      node.__transition__[id].tween.remove(name);
    } : function(node) {
      node.__transition__[id].tween.set(name, tween);
    });
  };
  function d3_transition_tween(groups, name, value, tween) {
    var id = groups.id;
    return d3_selection_each(groups, typeof value === "function" ? function(node, i, j) {
      node.__transition__[id].tween.set(name, tween(value.call(node, node.__data__, i, j)));
    } : (value = tween(value), function(node) {
      node.__transition__[id].tween.set(name, value);
    }));
  }
  d3_transitionPrototype.attr = function(nameNS, value) {
    if (arguments.length < 2) {
      for (value in nameNS) this.attr(value, nameNS[value]);
      return this;
    }
    var interpolate = d3_interpolateByName(nameNS), name = d3.ns.qualify(nameNS);
    function attrNull() {
      this.removeAttribute(name);
    }
    function attrNullNS() {
      this.removeAttributeNS(name.space, name.local);
    }
    return d3_transition_tween(this, "attr." + nameNS, value, function(b) {
      function attrString() {
        var a = this.getAttribute(name), i;
        return a !== b && (i = interpolate(a, b), function(t) {
          this.setAttribute(name, i(t));
        });
      }
      function attrStringNS() {
        var a = this.getAttributeNS(name.space, name.local), i;
        return a !== b && (i = interpolate(a, b), function(t) {
          this.setAttributeNS(name.space, name.local, i(t));
        });
      }
      return b == null ? name.local ? attrNullNS : attrNull : (b += "", name.local ? attrStringNS : attrString);
    });
  };
  d3_transitionPrototype.attrTween = function(nameNS, tween) {
    var name = d3.ns.qualify(nameNS);
    function attrTween(d, i) {
      var f = tween.call(this, d, i, this.getAttribute(name));
      return f && function(t) {
        this.setAttribute(name, f(t));
      };
    }
    function attrTweenNS(d, i) {
      var f = tween.call(this, d, i, this.getAttributeNS(name.space, name.local));
      return f && function(t) {
        this.setAttributeNS(name.space, name.local, f(t));
      };
    }
    return this.tween("attr." + nameNS, name.local ? attrTweenNS : attrTween);
  };
  d3_transitionPrototype.style = function(name, value, priority) {
    var n = arguments.length;
    if (n < 3) {
      if (typeof name !== "string") {
        if (n < 2) value = "";
        for (priority in name) this.style(priority, name[priority], value);
        return this;
      }
      priority = "";
    }
    var interpolate = d3_interpolateByName(name);
    function styleNull() {
      this.style.removeProperty(name);
    }
    return d3_transition_tween(this, "style." + name, value, function(b) {
      function styleString() {
        var a = d3_window.getComputedStyle(this, null).getPropertyValue(name), i;
        return a !== b && (i = interpolate(a, b), function(t) {
          this.style.setProperty(name, i(t), priority);
        });
      }
      return b == null ? styleNull : (b += "", styleString);
    });
  };
  d3_transitionPrototype.styleTween = function(name, tween, priority) {
    if (arguments.length < 3) priority = "";
    return this.tween("style." + name, function(d, i) {
      var f = tween.call(this, d, i, d3_window.getComputedStyle(this, null).getPropertyValue(name));
      return f && function(t) {
        this.style.setProperty(name, f(t), priority);
      };
    });
  };
  d3_transitionPrototype.text = function(value) {
    return d3_transition_tween(this, "text", value, d3_transition_text);
  };
  function d3_transition_text(b) {
    if (b == null) b = "";
    return function() {
      this.textContent = b;
    };
  }
  d3_transitionPrototype.remove = function() {
    return this.each("end.transition", function() {
      var p;
      if (!this.__transition__ && (p = this.parentNode)) p.removeChild(this);
    });
  };
  d3_transitionPrototype.ease = function(value) {
    var id = this.id;
    if (arguments.length < 1) return this.node().__transition__[id].ease;
    if (typeof value !== "function") value = d3.ease.apply(d3, arguments);
    return d3_selection_each(this, function(node) {
      node.__transition__[id].ease = value;
    });
  };
  d3_transitionPrototype.delay = function(value) {
    var id = this.id;
    return d3_selection_each(this, typeof value === "function" ? function(node, i, j) {
      node.__transition__[id].delay = value.call(node, node.__data__, i, j) | 0;
    } : (value |= 0, function(node) {
      node.__transition__[id].delay = value;
    }));
  };
  d3_transitionPrototype.duration = function(value) {
    var id = this.id;
    return d3_selection_each(this, typeof value === "function" ? function(node, i, j) {
      node.__transition__[id].duration = Math.max(1, value.call(node, node.__data__, i, j) | 0);
    } : (value = Math.max(1, value | 0), function(node) {
      node.__transition__[id].duration = value;
    }));
  };
  d3_transitionPrototype.each = function(type, listener) {
    var id = this.id;
    if (arguments.length < 2) {
      var inherit = d3_transitionInherit, inheritId = d3_transitionInheritId;
      d3_transitionInheritId = id;
      d3_selection_each(this, function(node, i, j) {
        d3_transitionInherit = node.__transition__[id];
        type.call(node, node.__data__, i, j);
      });
      d3_transitionInherit = inherit;
      d3_transitionInheritId = inheritId;
    } else {
      d3_selection_each(this, function(node) {
        node.__transition__[id].event.on(type, listener);
      });
    }
    return this;
  };
  d3_transitionPrototype.transition = function() {
    var id0 = this.id, id1 = ++d3_transitionId, subgroups = [], subgroup, group, node, transition;
    for (var j = 0, m = this.length; j < m; j++) {
      subgroups.push(subgroup = []);
      for (var group = this[j], i = 0, n = group.length; i < n; i++) {
        if (node = group[i]) {
          transition = Object.create(node.__transition__[id0]);
          transition.delay += transition.duration;
          d3_transitionNode(node, i, id1, transition);
        }
        subgroup.push(node);
      }
    }
    return d3_transition(subgroups, id1);
  };
  function d3_transitionNode(node, i, id, inherit) {
    var lock = node.__transition__ || (node.__transition__ = {
      active: 0,
      count: 0
    }), transition = lock[id];
    if (!transition) {
      var time = inherit.time;
      transition = lock[id] = {
        tween: new d3_Map(),
        event: d3.dispatch("start", "end"),
        time: time,
        ease: inherit.ease,
        delay: inherit.delay,
        duration: inherit.duration
      };
      ++lock.count;
      d3.timer(function(elapsed) {
        var d = node.__data__, ease = transition.ease, event = transition.event, delay = transition.delay, duration = transition.duration, tweened = [];
        return delay <= elapsed ? start(elapsed) : d3.timer(start, delay, time), 1;
        function start(elapsed) {
          if (lock.active > id) return stop();
          lock.active = id;
          event.start.call(node, d, i);
          transition.tween.forEach(function(key, value) {
            if (value = value.call(node, d, i)) {
              tweened.push(value);
            }
          });
          if (!tick(elapsed)) d3.timer(tick, 0, time);
          return 1;
        }
        function tick(elapsed) {
          if (lock.active !== id) return stop();
          var t = (elapsed - delay) / duration, e = ease(t), n = tweened.length;
          while (n > 0) {
            tweened[--n].call(node, e);
          }
          if (t >= 1) {
            stop();
            event.end.call(node, d, i);
            return 1;
          }
        }
        function stop() {
          if (--lock.count) delete lock[id]; else delete node.__transition__;
          return 1;
        }
      }, 0, time);
      return transition;
    }
  }
  d3.svg.axis = function() {
    var scale = d3.scale.linear(), orient = d3_svg_axisDefaultOrient, tickMajorSize = 6, tickMinorSize = 6, tickEndSize = 6, tickPadding = 3, tickArguments_ = [ 10 ], tickValues = null, tickFormat_, tickSubdivide = 0;
    function axis(g) {
      g.each(function() {
        var g = d3.select(this);
        var ticks = tickValues == null ? scale.ticks ? scale.ticks.apply(scale, tickArguments_) : scale.domain() : tickValues, tickFormat = tickFormat_ == null ? scale.tickFormat ? scale.tickFormat.apply(scale, tickArguments_) : String : tickFormat_;
        var subticks = d3_svg_axisSubdivide(scale, ticks, tickSubdivide), subtick = g.selectAll(".tick.minor").data(subticks, String), subtickEnter = subtick.enter().insert("line", ".tick").attr("class", "tick minor").style("opacity", 1e-6), subtickExit = d3.transition(subtick.exit()).style("opacity", 1e-6).remove(), subtickUpdate = d3.transition(subtick).style("opacity", 1);
        var tick = g.selectAll(".tick.major").data(ticks, String), tickEnter = tick.enter().insert("g", "path").attr("class", "tick major").style("opacity", 1e-6), tickExit = d3.transition(tick.exit()).style("opacity", 1e-6).remove(), tickUpdate = d3.transition(tick).style("opacity", 1), tickTransform;
        var range = d3_scaleRange(scale), path = g.selectAll(".domain").data([ 0 ]), pathUpdate = (path.enter().append("path").attr("class", "domain"), 
        d3.transition(path));
        var scale1 = scale.copy(), scale0 = this.__chart__ || scale1;
        this.__chart__ = scale1;
        tickEnter.append("line");
        tickEnter.append("text");
        var lineEnter = tickEnter.select("line"), lineUpdate = tickUpdate.select("line"), text = tick.select("text").text(tickFormat), textEnter = tickEnter.select("text"), textUpdate = tickUpdate.select("text");
        switch (orient) {
         case "bottom":
          {
            tickTransform = d3_svg_axisX;
            subtickEnter.attr("y2", tickMinorSize);
            subtickUpdate.attr("x2", 0).attr("y2", tickMinorSize);
            lineEnter.attr("y2", tickMajorSize);
            textEnter.attr("y", Math.max(tickMajorSize, 0) + tickPadding);
            lineUpdate.attr("x2", 0).attr("y2", tickMajorSize);
            textUpdate.attr("x", 0).attr("y", Math.max(tickMajorSize, 0) + tickPadding);
            text.attr("dy", ".71em").style("text-anchor", "middle");
            pathUpdate.attr("d", "M" + range[0] + "," + tickEndSize + "V0H" + range[1] + "V" + tickEndSize);
            break;
          }

         case "top":
          {
            tickTransform = d3_svg_axisX;
            subtickEnter.attr("y2", -tickMinorSize);
            subtickUpdate.attr("x2", 0).attr("y2", -tickMinorSize);
            lineEnter.attr("y2", -tickMajorSize);
            textEnter.attr("y", -(Math.max(tickMajorSize, 0) + tickPadding));
            lineUpdate.attr("x2", 0).attr("y2", -tickMajorSize);
            textUpdate.attr("x", 0).attr("y", -(Math.max(tickMajorSize, 0) + tickPadding));
            text.attr("dy", "0em").style("text-anchor", "middle");
            pathUpdate.attr("d", "M" + range[0] + "," + -tickEndSize + "V0H" + range[1] + "V" + -tickEndSize);
            break;
          }

         case "left":
          {
            tickTransform = d3_svg_axisY;
            subtickEnter.attr("x2", -tickMinorSize);
            subtickUpdate.attr("x2", -tickMinorSize).attr("y2", 0);
            lineEnter.attr("x2", -tickMajorSize);
            textEnter.attr("x", -(Math.max(tickMajorSize, 0) + tickPadding));
            lineUpdate.attr("x2", -tickMajorSize).attr("y2", 0);
            textUpdate.attr("x", -(Math.max(tickMajorSize, 0) + tickPadding)).attr("y", 0);
            text.attr("dy", ".32em").style("text-anchor", "end");
            pathUpdate.attr("d", "M" + -tickEndSize + "," + range[0] + "H0V" + range[1] + "H" + -tickEndSize);
            break;
          }

         case "right":
          {
            tickTransform = d3_svg_axisY;
            subtickEnter.attr("x2", tickMinorSize);
            subtickUpdate.attr("x2", tickMinorSize).attr("y2", 0);
            lineEnter.attr("x2", tickMajorSize);
            textEnter.attr("x", Math.max(tickMajorSize, 0) + tickPadding);
            lineUpdate.attr("x2", tickMajorSize).attr("y2", 0);
            textUpdate.attr("x", Math.max(tickMajorSize, 0) + tickPadding).attr("y", 0);
            text.attr("dy", ".32em").style("text-anchor", "start");
            pathUpdate.attr("d", "M" + tickEndSize + "," + range[0] + "H0V" + range[1] + "H" + tickEndSize);
            break;
          }
        }
        if (scale.ticks) {
          tickEnter.call(tickTransform, scale0);
          tickUpdate.call(tickTransform, scale1);
          tickExit.call(tickTransform, scale1);
          subtickEnter.call(tickTransform, scale0);
          subtickUpdate.call(tickTransform, scale1);
          subtickExit.call(tickTransform, scale1);
        } else {
          var dx = scale1.rangeBand() / 2, x = function(d) {
            return scale1(d) + dx;
          };
          tickEnter.call(tickTransform, x);
          tickUpdate.call(tickTransform, x);
        }
      });
    }
    axis.scale = function(x) {
      if (!arguments.length) return scale;
      scale = x;
      return axis;
    };
    axis.orient = function(x) {
      if (!arguments.length) return orient;
      orient = x in d3_svg_axisOrients ? x + "" : d3_svg_axisDefaultOrient;
      return axis;
    };
    axis.ticks = function() {
      if (!arguments.length) return tickArguments_;
      tickArguments_ = arguments;
      return axis;
    };
    axis.tickValues = function(x) {
      if (!arguments.length) return tickValues;
      tickValues = x;
      return axis;
    };
    axis.tickFormat = function(x) {
      if (!arguments.length) return tickFormat_;
      tickFormat_ = x;
      return axis;
    };
    axis.tickSize = function(x, y) {
      if (!arguments.length) return tickMajorSize;
      var n = arguments.length - 1;
      tickMajorSize = +x;
      tickMinorSize = n > 1 ? +y : tickMajorSize;
      tickEndSize = n > 0 ? +arguments[n] : tickMajorSize;
      return axis;
    };
    axis.tickPadding = function(x) {
      if (!arguments.length) return tickPadding;
      tickPadding = +x;
      return axis;
    };
    axis.tickSubdivide = function(x) {
      if (!arguments.length) return tickSubdivide;
      tickSubdivide = +x;
      return axis;
    };
    return axis;
  };
  var d3_svg_axisDefaultOrient = "bottom", d3_svg_axisOrients = {
    top: 1,
    right: 1,
    bottom: 1,
    left: 1
  };
  function d3_svg_axisX(selection, x) {
    selection.attr("transform", function(d) {
      return "translate(" + x(d) + ",0)";
    });
  }
  function d3_svg_axisY(selection, y) {
    selection.attr("transform", function(d) {
      return "translate(0," + y(d) + ")";
    });
  }
  function d3_svg_axisSubdivide(scale, ticks, m) {
    subticks = [];
    if (m && ticks.length > 1) {
      var extent = d3_scaleExtent(scale.domain()), subticks, i = -1, n = ticks.length, d = (ticks[1] - ticks[0]) / ++m, j, v;
      while (++i < n) {
        for (j = m; --j > 0; ) {
          if ((v = +ticks[i] - j * d) >= extent[0]) {
            subticks.push(v);
          }
        }
      }
      for (--i, j = 0; ++j < m && (v = +ticks[i] + j * d) < extent[1]; ) {
        subticks.push(v);
      }
    }
    return subticks;
  }
  d3.svg.brush = function() {
    var event = d3_eventDispatch(brush, "brushstart", "brush", "brushend"), x = null, y = null, resizes = d3_svg_brushResizes[0], extent = [ [ 0, 0 ], [ 0, 0 ] ], extentDomain;
    function brush(g) {
      g.each(function() {
        var g = d3.select(this), bg = g.selectAll(".background").data([ 0 ]), fg = g.selectAll(".extent").data([ 0 ]), tz = g.selectAll(".resize").data(resizes, String), e;
        g.style("pointer-events", "all").on("mousedown.brush", brushstart).on("touchstart.brush", brushstart);
        bg.enter().append("rect").attr("class", "background").style("visibility", "hidden").style("cursor", "crosshair");
        fg.enter().append("rect").attr("class", "extent").style("cursor", "move");
        tz.enter().append("g").attr("class", function(d) {
          return "resize " + d;
        }).style("cursor", function(d) {
          return d3_svg_brushCursor[d];
        }).append("rect").attr("x", function(d) {
          return /[ew]$/.test(d) ? -3 : null;
        }).attr("y", function(d) {
          return /^[ns]/.test(d) ? -3 : null;
        }).attr("width", 6).attr("height", 6).style("visibility", "hidden");
        tz.style("display", brush.empty() ? "none" : null);
        tz.exit().remove();
        if (x) {
          e = d3_scaleRange(x);
          bg.attr("x", e[0]).attr("width", e[1] - e[0]);
          redrawX(g);
        }
        if (y) {
          e = d3_scaleRange(y);
          bg.attr("y", e[0]).attr("height", e[1] - e[0]);
          redrawY(g);
        }
        redraw(g);
      });
    }
    function redraw(g) {
      g.selectAll(".resize").attr("transform", function(d) {
        return "translate(" + extent[+/e$/.test(d)][0] + "," + extent[+/^s/.test(d)][1] + ")";
      });
    }
    function redrawX(g) {
      g.select(".extent").attr("x", extent[0][0]);
      g.selectAll(".extent,.n>rect,.s>rect").attr("width", extent[1][0] - extent[0][0]);
    }
    function redrawY(g) {
      g.select(".extent").attr("y", extent[0][1]);
      g.selectAll(".extent,.e>rect,.w>rect").attr("height", extent[1][1] - extent[0][1]);
    }
    function brushstart() {
      var target = this, eventTarget = d3.select(d3.event.target), event_ = event.of(target, arguments), g = d3.select(target), resizing = eventTarget.datum(), resizingX = !/^(n|s)$/.test(resizing) && x, resizingY = !/^(e|w)$/.test(resizing) && y, dragging = eventTarget.classed("extent"), center, origin = mouse(), offset;
      var w = d3.select(d3_window).on("mousemove.brush", brushmove).on("mouseup.brush", brushend).on("touchmove.brush", brushmove).on("touchend.brush", brushend).on("keydown.brush", keydown).on("keyup.brush", keyup);
      if (dragging) {
        origin[0] = extent[0][0] - origin[0];
        origin[1] = extent[0][1] - origin[1];
      } else if (resizing) {
        var ex = +/w$/.test(resizing), ey = +/^n/.test(resizing);
        offset = [ extent[1 - ex][0] - origin[0], extent[1 - ey][1] - origin[1] ];
        origin[0] = extent[ex][0];
        origin[1] = extent[ey][1];
      } else if (d3.event.altKey) center = origin.slice();
      g.style("pointer-events", "none").selectAll(".resize").style("display", null);
      d3.select("body").style("cursor", eventTarget.style("cursor"));
      event_({
        type: "brushstart"
      });
      brushmove();
      d3_eventCancel();
      function mouse() {
        var touches = d3.event.changedTouches;
        return touches ? d3.touches(target, touches)[0] : d3.mouse(target);
      }
      function keydown() {
        if (d3.event.keyCode == 32) {
          if (!dragging) {
            center = null;
            origin[0] -= extent[1][0];
            origin[1] -= extent[1][1];
            dragging = 2;
          }
          d3_eventCancel();
        }
      }
      function keyup() {
        if (d3.event.keyCode == 32 && dragging == 2) {
          origin[0] += extent[1][0];
          origin[1] += extent[1][1];
          dragging = 0;
          d3_eventCancel();
        }
      }
      function brushmove() {
        var point = mouse(), moved = false;
        if (offset) {
          point[0] += offset[0];
          point[1] += offset[1];
        }
        if (!dragging) {
          if (d3.event.altKey) {
            if (!center) center = [ (extent[0][0] + extent[1][0]) / 2, (extent[0][1] + extent[1][1]) / 2 ];
            origin[0] = extent[+(point[0] < center[0])][0];
            origin[1] = extent[+(point[1] < center[1])][1];
          } else center = null;
        }
        if (resizingX && move1(point, x, 0)) {
          redrawX(g);
          moved = true;
        }
        if (resizingY && move1(point, y, 1)) {
          redrawY(g);
          moved = true;
        }
        if (moved) {
          redraw(g);
          event_({
            type: "brush",
            mode: dragging ? "move" : "resize"
          });
        }
      }
      function move1(point, scale, i) {
        var range = d3_scaleRange(scale), r0 = range[0], r1 = range[1], position = origin[i], size = extent[1][i] - extent[0][i], min, max;
        if (dragging) {
          r0 -= position;
          r1 -= size + position;
        }
        min = Math.max(r0, Math.min(r1, point[i]));
        if (dragging) {
          max = (min += position) + size;
        } else {
          if (center) position = Math.max(r0, Math.min(r1, 2 * center[i] - min));
          if (position < min) {
            max = min;
            min = position;
          } else {
            max = position;
          }
        }
        if (extent[0][i] !== min || extent[1][i] !== max) {
          extentDomain = null;
          extent[0][i] = min;
          extent[1][i] = max;
          return true;
        }
      }
      function brushend() {
        brushmove();
        g.style("pointer-events", "all").selectAll(".resize").style("display", brush.empty() ? "none" : null);
        d3.select("body").style("cursor", null);
        w.on("mousemove.brush", null).on("mouseup.brush", null).on("touchmove.brush", null).on("touchend.brush", null).on("keydown.brush", null).on("keyup.brush", null);
        event_({
          type: "brushend"
        });
        d3_eventCancel();
      }
    }
    brush.x = function(z) {
      if (!arguments.length) return x;
      x = z;
      resizes = d3_svg_brushResizes[!x << 1 | !y];
      return brush;
    };
    brush.y = function(z) {
      if (!arguments.length) return y;
      y = z;
      resizes = d3_svg_brushResizes[!x << 1 | !y];
      return brush;
    };
    brush.extent = function(z) {
      var x0, x1, y0, y1, t;
      if (!arguments.length) {
        z = extentDomain || extent;
        if (x) {
          x0 = z[0][0], x1 = z[1][0];
          if (!extentDomain) {
            x0 = extent[0][0], x1 = extent[1][0];
            if (x.invert) x0 = x.invert(x0), x1 = x.invert(x1);
            if (x1 < x0) t = x0, x0 = x1, x1 = t;
          }
        }
        if (y) {
          y0 = z[0][1], y1 = z[1][1];
          if (!extentDomain) {
            y0 = extent[0][1], y1 = extent[1][1];
            if (y.invert) y0 = y.invert(y0), y1 = y.invert(y1);
            if (y1 < y0) t = y0, y0 = y1, y1 = t;
          }
        }
        return x && y ? [ [ x0, y0 ], [ x1, y1 ] ] : x ? [ x0, x1 ] : y && [ y0, y1 ];
      }
      extentDomain = [ [ 0, 0 ], [ 0, 0 ] ];
      if (x) {
        x0 = z[0], x1 = z[1];
        if (y) x0 = x0[0], x1 = x1[0];
        extentDomain[0][0] = x0, extentDomain[1][0] = x1;
        if (x.invert) x0 = x(x0), x1 = x(x1);
        if (x1 < x0) t = x0, x0 = x1, x1 = t;
        extent[0][0] = x0 | 0, extent[1][0] = x1 | 0;
      }
      if (y) {
        y0 = z[0], y1 = z[1];
        if (x) y0 = y0[1], y1 = y1[1];
        extentDomain[0][1] = y0, extentDomain[1][1] = y1;
        if (y.invert) y0 = y(y0), y1 = y(y1);
        if (y1 < y0) t = y0, y0 = y1, y1 = t;
        extent[0][1] = y0 | 0, extent[1][1] = y1 | 0;
      }
      return brush;
    };
    brush.clear = function() {
      extentDomain = null;
      extent[0][0] = extent[0][1] = extent[1][0] = extent[1][1] = 0;
      return brush;
    };
    brush.empty = function() {
      return x && extent[0][0] === extent[1][0] || y && extent[0][1] === extent[1][1];
    };
    return d3.rebind(brush, event, "on");
  };
  var d3_svg_brushCursor = {
    n: "ns-resize",
    e: "ew-resize",
    s: "ns-resize",
    w: "ew-resize",
    nw: "nwse-resize",
    ne: "nesw-resize",
    se: "nwse-resize",
    sw: "nesw-resize"
  };
  var d3_svg_brushResizes = [ [ "n", "e", "s", "w", "nw", "ne", "se", "sw" ], [ "e", "w" ], [ "n", "s" ], [] ];
  d3.time = {};
  var d3_time = Date, d3_time_daySymbols = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
  function d3_time_utc() {
    this._ = new Date(arguments.length > 1 ? Date.UTC.apply(this, arguments) : arguments[0]);
  }
  d3_time_utc.prototype = {
    getDate: function() {
      return this._.getUTCDate();
    },
    getDay: function() {
      return this._.getUTCDay();
    },
    getFullYear: function() {
      return this._.getUTCFullYear();
    },
    getHours: function() {
      return this._.getUTCHours();
    },
    getMilliseconds: function() {
      return this._.getUTCMilliseconds();
    },
    getMinutes: function() {
      return this._.getUTCMinutes();
    },
    getMonth: function() {
      return this._.getUTCMonth();
    },
    getSeconds: function() {
      return this._.getUTCSeconds();
    },
    getTime: function() {
      return this._.getTime();
    },
    getTimezoneOffset: function() {
      return 0;
    },
    valueOf: function() {
      return this._.valueOf();
    },
    setDate: function() {
      d3_time_prototype.setUTCDate.apply(this._, arguments);
    },
    setDay: function() {
      d3_time_prototype.setUTCDay.apply(this._, arguments);
    },
    setFullYear: function() {
      d3_time_prototype.setUTCFullYear.apply(this._, arguments);
    },
    setHours: function() {
      d3_time_prototype.setUTCHours.apply(this._, arguments);
    },
    setMilliseconds: function() {
      d3_time_prototype.setUTCMilliseconds.apply(this._, arguments);
    },
    setMinutes: function() {
      d3_time_prototype.setUTCMinutes.apply(this._, arguments);
    },
    setMonth: function() {
      d3_time_prototype.setUTCMonth.apply(this._, arguments);
    },
    setSeconds: function() {
      d3_time_prototype.setUTCSeconds.apply(this._, arguments);
    },
    setTime: function() {
      d3_time_prototype.setTime.apply(this._, arguments);
    }
  };
  var d3_time_prototype = Date.prototype;
  var d3_time_formatDateTime = "%a %b %e %X %Y", d3_time_formatDate = "%m/%d/%Y", d3_time_formatTime = "%H:%M:%S";
  var d3_time_days = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ], d3_time_dayAbbreviations = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ], d3_time_months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ], d3_time_monthAbbreviations = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
  function d3_time_interval(local, step, number) {
    function round(date) {
      var d0 = local(date), d1 = offset(d0, 1);
      return date - d0 < d1 - date ? d0 : d1;
    }
    function ceil(date) {
      step(date = local(new d3_time(date - 1)), 1);
      return date;
    }
    function offset(date, k) {
      step(date = new d3_time(+date), k);
      return date;
    }
    function range(t0, t1, dt) {
      var time = ceil(t0), times = [];
      if (dt > 1) {
        while (time < t1) {
          if (!(number(time) % dt)) times.push(new Date(+time));
          step(time, 1);
        }
      } else {
        while (time < t1) times.push(new Date(+time)), step(time, 1);
      }
      return times;
    }
    function range_utc(t0, t1, dt) {
      try {
        d3_time = d3_time_utc;
        var utc = new d3_time_utc();
        utc._ = t0;
        return range(utc, t1, dt);
      } finally {
        d3_time = Date;
      }
    }
    local.floor = local;
    local.round = round;
    local.ceil = ceil;
    local.offset = offset;
    local.range = range;
    var utc = local.utc = d3_time_interval_utc(local);
    utc.floor = utc;
    utc.round = d3_time_interval_utc(round);
    utc.ceil = d3_time_interval_utc(ceil);
    utc.offset = d3_time_interval_utc(offset);
    utc.range = range_utc;
    return local;
  }
  function d3_time_interval_utc(method) {
    return function(date, k) {
      try {
        d3_time = d3_time_utc;
        var utc = new d3_time_utc();
        utc._ = date;
        return method(utc, k)._;
      } finally {
        d3_time = Date;
      }
    };
  }
  d3.time.year = d3_time_interval(function(date) {
    date = d3.time.day(date);
    date.setMonth(0, 1);
    return date;
  }, function(date, offset) {
    date.setFullYear(date.getFullYear() + offset);
  }, function(date) {
    return date.getFullYear();
  });
  d3.time.years = d3.time.year.range;
  d3.time.years.utc = d3.time.year.utc.range;
  d3.time.day = d3_time_interval(function(date) {
    var day = new d3_time(1970, 0);
    day.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
    return day;
  }, function(date, offset) {
    date.setDate(date.getDate() + offset);
  }, function(date) {
    return date.getDate() - 1;
  });
  d3.time.days = d3.time.day.range;
  d3.time.days.utc = d3.time.day.utc.range;
  d3.time.dayOfYear = function(date) {
    var year = d3.time.year(date);
    return Math.floor((date - year - (date.getTimezoneOffset() - year.getTimezoneOffset()) * 6e4) / 864e5);
  };
  d3_time_daySymbols.forEach(function(day, i) {
    day = day.toLowerCase();
    i = 7 - i;
    var interval = d3.time[day] = d3_time_interval(function(date) {
      (date = d3.time.day(date)).setDate(date.getDate() - (date.getDay() + i) % 7);
      return date;
    }, function(date, offset) {
      date.setDate(date.getDate() + Math.floor(offset) * 7);
    }, function(date) {
      var day = d3.time.year(date).getDay();
      return Math.floor((d3.time.dayOfYear(date) + (day + i) % 7) / 7) - (day !== i);
    });
    d3.time[day + "s"] = interval.range;
    d3.time[day + "s"].utc = interval.utc.range;
    d3.time[day + "OfYear"] = function(date) {
      var day = d3.time.year(date).getDay();
      return Math.floor((d3.time.dayOfYear(date) + (day + i) % 7) / 7);
    };
  });
  d3.time.week = d3.time.sunday;
  d3.time.weeks = d3.time.sunday.range;
  d3.time.weeks.utc = d3.time.sunday.utc.range;
  d3.time.weekOfYear = d3.time.sundayOfYear;
  d3.time.format = function(template) {
    var n = template.length;
    function format(date) {
      var string = [], i = -1, j = 0, c, p, f;
      while (++i < n) {
        if (template.charCodeAt(i) === 37) {
          string.push(template.substring(j, i));
          if ((p = d3_time_formatPads[c = template.charAt(++i)]) != null) c = template.charAt(++i);
          if (f = d3_time_formats[c]) c = f(date, p == null ? c === "e" ? " " : "0" : p);
          string.push(c);
          j = i + 1;
        }
      }
      string.push(template.substring(j, i));
      return string.join("");
    }
    format.parse = function(string) {
      var d = {
        y: 1900,
        m: 0,
        d: 1,
        H: 0,
        M: 0,
        S: 0,
        L: 0
      }, i = d3_time_parse(d, template, string, 0);
      if (i != string.length) return null;
      if ("p" in d) d.H = d.H % 12 + d.p * 12;
      var date = new d3_time();
      date.setFullYear(d.y, d.m, d.d);
      date.setHours(d.H, d.M, d.S, d.L);
      return date;
    };
    format.toString = function() {
      return template;
    };
    return format;
  };
  function d3_time_parse(date, template, string, j) {
    var c, p, i = 0, n = template.length, m = string.length;
    while (i < n) {
      if (j >= m) return -1;
      c = template.charCodeAt(i++);
      if (c === 37) {
        p = d3_time_parsers[template.charAt(i++)];
        if (!p || (j = p(date, string, j)) < 0) return -1;
      } else if (c != string.charCodeAt(j++)) {
        return -1;
      }
    }
    return j;
  }
  function d3_time_formatRe(names) {
    return new RegExp("^(?:" + names.map(d3.requote).join("|") + ")", "i");
  }
  function d3_time_formatLookup(names) {
    var map = new d3_Map(), i = -1, n = names.length;
    while (++i < n) map.set(names[i].toLowerCase(), i);
    return map;
  }
  function d3_time_formatPad(value, fill, width) {
    value += "";
    var length = value.length;
    return length < width ? new Array(width - length + 1).join(fill) + value : value;
  }
  var d3_time_dayRe = d3_time_formatRe(d3_time_days), d3_time_dayAbbrevRe = d3_time_formatRe(d3_time_dayAbbreviations), d3_time_monthRe = d3_time_formatRe(d3_time_months), d3_time_monthLookup = d3_time_formatLookup(d3_time_months), d3_time_monthAbbrevRe = d3_time_formatRe(d3_time_monthAbbreviations), d3_time_monthAbbrevLookup = d3_time_formatLookup(d3_time_monthAbbreviations);
  var d3_time_formatPads = {
    "-": "",
    _: " ",
    "0": "0"
  };
  var d3_time_formats = {
    a: function(d) {
      return d3_time_dayAbbreviations[d.getDay()];
    },
    A: function(d) {
      return d3_time_days[d.getDay()];
    },
    b: function(d) {
      return d3_time_monthAbbreviations[d.getMonth()];
    },
    B: function(d) {
      return d3_time_months[d.getMonth()];
    },
    c: d3.time.format(d3_time_formatDateTime),
    d: function(d, p) {
      return d3_time_formatPad(d.getDate(), p, 2);
    },
    e: function(d, p) {
      return d3_time_formatPad(d.getDate(), p, 2);
    },
    H: function(d, p) {
      return d3_time_formatPad(d.getHours(), p, 2);
    },
    I: function(d, p) {
      return d3_time_formatPad(d.getHours() % 12 || 12, p, 2);
    },
    j: function(d, p) {
      return d3_time_formatPad(1 + d3.time.dayOfYear(d), p, 3);
    },
    L: function(d, p) {
      return d3_time_formatPad(d.getMilliseconds(), p, 3);
    },
    m: function(d, p) {
      return d3_time_formatPad(d.getMonth() + 1, p, 2);
    },
    M: function(d, p) {
      return d3_time_formatPad(d.getMinutes(), p, 2);
    },
    p: function(d) {
      return d.getHours() >= 12 ? "PM" : "AM";
    },
    S: function(d, p) {
      return d3_time_formatPad(d.getSeconds(), p, 2);
    },
    U: function(d, p) {
      return d3_time_formatPad(d3.time.sundayOfYear(d), p, 2);
    },
    w: function(d) {
      return d.getDay();
    },
    W: function(d, p) {
      return d3_time_formatPad(d3.time.mondayOfYear(d), p, 2);
    },
    x: d3.time.format(d3_time_formatDate),
    X: d3.time.format(d3_time_formatTime),
    y: function(d, p) {
      return d3_time_formatPad(d.getFullYear() % 100, p, 2);
    },
    Y: function(d, p) {
      return d3_time_formatPad(d.getFullYear() % 1e4, p, 4);
    },
    Z: d3_time_zone,
    "%": function() {
      return "%";
    }
  };
  var d3_time_parsers = {
    a: d3_time_parseWeekdayAbbrev,
    A: d3_time_parseWeekday,
    b: d3_time_parseMonthAbbrev,
    B: d3_time_parseMonth,
    c: d3_time_parseLocaleFull,
    d: d3_time_parseDay,
    e: d3_time_parseDay,
    H: d3_time_parseHour24,
    I: d3_time_parseHour24,
    L: d3_time_parseMilliseconds,
    m: d3_time_parseMonthNumber,
    M: d3_time_parseMinutes,
    p: d3_time_parseAmPm,
    S: d3_time_parseSeconds,
    x: d3_time_parseLocaleDate,
    X: d3_time_parseLocaleTime,
    y: d3_time_parseYear,
    Y: d3_time_parseFullYear
  };
  function d3_time_parseWeekdayAbbrev(date, string, i) {
    d3_time_dayAbbrevRe.lastIndex = 0;
    var n = d3_time_dayAbbrevRe.exec(string.substring(i));
    return n ? i += n[0].length : -1;
  }
  function d3_time_parseWeekday(date, string, i) {
    d3_time_dayRe.lastIndex = 0;
    var n = d3_time_dayRe.exec(string.substring(i));
    return n ? i += n[0].length : -1;
  }
  function d3_time_parseMonthAbbrev(date, string, i) {
    d3_time_monthAbbrevRe.lastIndex = 0;
    var n = d3_time_monthAbbrevRe.exec(string.substring(i));
    return n ? (date.m = d3_time_monthAbbrevLookup.get(n[0].toLowerCase()), i += n[0].length) : -1;
  }
  function d3_time_parseMonth(date, string, i) {
    d3_time_monthRe.lastIndex = 0;
    var n = d3_time_monthRe.exec(string.substring(i));
    return n ? (date.m = d3_time_monthLookup.get(n[0].toLowerCase()), i += n[0].length) : -1;
  }
  function d3_time_parseLocaleFull(date, string, i) {
    return d3_time_parse(date, d3_time_formats.c.toString(), string, i);
  }
  function d3_time_parseLocaleDate(date, string, i) {
    return d3_time_parse(date, d3_time_formats.x.toString(), string, i);
  }
  function d3_time_parseLocaleTime(date, string, i) {
    return d3_time_parse(date, d3_time_formats.X.toString(), string, i);
  }
  function d3_time_parseFullYear(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.substring(i, i + 4));
    return n ? (date.y = +n[0], i += n[0].length) : -1;
  }
  function d3_time_parseYear(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.substring(i, i + 2));
    return n ? (date.y = d3_time_expandYear(+n[0]), i += n[0].length) : -1;
  }
  function d3_time_expandYear(d) {
    return d + (d > 68 ? 1900 : 2e3);
  }
  function d3_time_parseMonthNumber(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.substring(i, i + 2));
    return n ? (date.m = n[0] - 1, i += n[0].length) : -1;
  }
  function d3_time_parseDay(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.substring(i, i + 2));
    return n ? (date.d = +n[0], i += n[0].length) : -1;
  }
  function d3_time_parseHour24(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.substring(i, i + 2));
    return n ? (date.H = +n[0], i += n[0].length) : -1;
  }
  function d3_time_parseMinutes(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.substring(i, i + 2));
    return n ? (date.M = +n[0], i += n[0].length) : -1;
  }
  function d3_time_parseSeconds(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.substring(i, i + 2));
    return n ? (date.S = +n[0], i += n[0].length) : -1;
  }
  function d3_time_parseMilliseconds(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.substring(i, i + 3));
    return n ? (date.L = +n[0], i += n[0].length) : -1;
  }
  var d3_time_numberRe = /^\s*\d+/;
  function d3_time_parseAmPm(date, string, i) {
    var n = d3_time_amPmLookup.get(string.substring(i, i += 2).toLowerCase());
    return n == null ? -1 : (date.p = n, i);
  }
  var d3_time_amPmLookup = d3.map({
    am: 0,
    pm: 1
  });
  function d3_time_zone(d) {
    var z = d.getTimezoneOffset(), zs = z > 0 ? "-" : "+", zh = ~~(Math.abs(z) / 60), zm = Math.abs(z) % 60;
    return zs + d3_time_formatPad(zh, "0", 2) + d3_time_formatPad(zm, "0", 2);
  }
  d3.time.format.utc = function(template) {
    var local = d3.time.format(template);
    function format(date) {
      try {
        d3_time = d3_time_utc;
        var utc = new d3_time();
        utc._ = date;
        return local(utc);
      } finally {
        d3_time = Date;
      }
    }
    format.parse = function(string) {
      try {
        d3_time = d3_time_utc;
        var date = local.parse(string);
        return date && date._;
      } finally {
        d3_time = Date;
      }
    };
    format.toString = local.toString;
    return format;
  };
  var d3_time_formatIso = d3.time.format.utc("%Y-%m-%dT%H:%M:%S.%LZ");
  d3.time.format.iso = Date.prototype.toISOString && +new Date("2000-01-01T00:00:00.000Z") ? d3_time_formatIsoNative : d3_time_formatIso;
  function d3_time_formatIsoNative(date) {
    return date.toISOString();
  }
  d3_time_formatIsoNative.parse = function(string) {
    var date = new Date(string);
    return isNaN(date) ? null : date;
  };
  d3_time_formatIsoNative.toString = d3_time_formatIso.toString;
  d3.time.second = d3_time_interval(function(date) {
    return new d3_time(Math.floor(date / 1e3) * 1e3);
  }, function(date, offset) {
    date.setTime(date.getTime() + Math.floor(offset) * 1e3);
  }, function(date) {
    return date.getSeconds();
  });
  d3.time.seconds = d3.time.second.range;
  d3.time.seconds.utc = d3.time.second.utc.range;
  d3.time.minute = d3_time_interval(function(date) {
    return new d3_time(Math.floor(date / 6e4) * 6e4);
  }, function(date, offset) {
    date.setTime(date.getTime() + Math.floor(offset) * 6e4);
  }, function(date) {
    return date.getMinutes();
  });
  d3.time.minutes = d3.time.minute.range;
  d3.time.minutes.utc = d3.time.minute.utc.range;
  d3.time.hour = d3_time_interval(function(date) {
    var timezone = date.getTimezoneOffset() / 60;
    return new d3_time((Math.floor(date / 36e5 - timezone) + timezone) * 36e5);
  }, function(date, offset) {
    date.setTime(date.getTime() + Math.floor(offset) * 36e5);
  }, function(date) {
    return date.getHours();
  });
  d3.time.hours = d3.time.hour.range;
  d3.time.hours.utc = d3.time.hour.utc.range;
  d3.time.month = d3_time_interval(function(date) {
    date = d3.time.day(date);
    date.setDate(1);
    return date;
  }, function(date, offset) {
    date.setMonth(date.getMonth() + offset);
  }, function(date) {
    return date.getMonth();
  });
  d3.time.months = d3.time.month.range;
  d3.time.months.utc = d3.time.month.utc.range;
  function d3_time_scale(linear, methods, format) {
    function scale(x) {
      return linear(x);
    }
    scale.invert = function(x) {
      return d3_time_scaleDate(linear.invert(x));
    };
    scale.domain = function(x) {
      if (!arguments.length) return linear.domain().map(d3_time_scaleDate);
      linear.domain(x);
      return scale;
    };
    scale.nice = function(m) {
      return scale.domain(d3_scale_nice(scale.domain(), function() {
        return m;
      }));
    };
    scale.ticks = function(m, k) {
      var extent = d3_time_scaleExtent(scale.domain());
      if (typeof m !== "function") {
        var span = extent[1] - extent[0], target = span / m, i = d3.bisect(d3_time_scaleSteps, target);
        if (i == d3_time_scaleSteps.length) return methods.year(extent, m);
        if (!i) return linear.ticks(m).map(d3_time_scaleDate);
        if (Math.log(target / d3_time_scaleSteps[i - 1]) < Math.log(d3_time_scaleSteps[i] / target)) --i;
        m = methods[i];
        k = m[1];
        m = m[0].range;
      }
      return m(extent[0], new Date(+extent[1] + 1), k);
    };
    scale.tickFormat = function() {
      return format;
    };
    scale.copy = function() {
      return d3_time_scale(linear.copy(), methods, format);
    };
    return d3.rebind(scale, linear, "range", "rangeRound", "interpolate", "clamp");
  }
  function d3_time_scaleExtent(domain) {
    var start = domain[0], stop = domain[domain.length - 1];
    return start < stop ? [ start, stop ] : [ stop, start ];
  }
  function d3_time_scaleDate(t) {
    return new Date(t);
  }
  function d3_time_scaleFormat(formats) {
    return function(date) {
      var i = formats.length - 1, f = formats[i];
      while (!f[1](date)) f = formats[--i];
      return f[0](date);
    };
  }
  function d3_time_scaleSetYear(y) {
    var d = new Date(y, 0, 1);
    d.setFullYear(y);
    return d;
  }
  function d3_time_scaleGetYear(d) {
    var y = d.getFullYear(), d0 = d3_time_scaleSetYear(y), d1 = d3_time_scaleSetYear(y + 1);
    return y + (d - d0) / (d1 - d0);
  }
  var d3_time_scaleSteps = [ 1e3, 5e3, 15e3, 3e4, 6e4, 3e5, 9e5, 18e5, 36e5, 108e5, 216e5, 432e5, 864e5, 1728e5, 6048e5, 2592e6, 7776e6, 31536e6 ];
  var d3_time_scaleLocalMethods = [ [ d3.time.second, 1 ], [ d3.time.second, 5 ], [ d3.time.second, 15 ], [ d3.time.second, 30 ], [ d3.time.minute, 1 ], [ d3.time.minute, 5 ], [ d3.time.minute, 15 ], [ d3.time.minute, 30 ], [ d3.time.hour, 1 ], [ d3.time.hour, 3 ], [ d3.time.hour, 6 ], [ d3.time.hour, 12 ], [ d3.time.day, 1 ], [ d3.time.day, 2 ], [ d3.time.week, 1 ], [ d3.time.month, 1 ], [ d3.time.month, 3 ], [ d3.time.year, 1 ] ];
  var d3_time_scaleLocalFormats = [ [ d3.time.format("%Y"), d3_true ], [ d3.time.format("%B"), function(d) {
    return d.getMonth();
  } ], [ d3.time.format("%b %d"), function(d) {
    return d.getDate() != 1;
  } ], [ d3.time.format("%a %d"), function(d) {
    return d.getDay() && d.getDate() != 1;
  } ], [ d3.time.format("%I %p"), function(d) {
    return d.getHours();
  } ], [ d3.time.format("%I:%M"), function(d) {
    return d.getMinutes();
  } ], [ d3.time.format(":%S"), function(d) {
    return d.getSeconds();
  } ], [ d3.time.format(".%L"), function(d) {
    return d.getMilliseconds();
  } ] ];
  var d3_time_scaleLinear = d3.scale.linear(), d3_time_scaleLocalFormat = d3_time_scaleFormat(d3_time_scaleLocalFormats);
  d3_time_scaleLocalMethods.year = function(extent, m) {
    return d3_time_scaleLinear.domain(extent.map(d3_time_scaleGetYear)).ticks(m).map(d3_time_scaleSetYear);
  };
  d3.time.scale = function() {
    return d3_time_scale(d3.scale.linear(), d3_time_scaleLocalMethods, d3_time_scaleLocalFormat);
  };
  var d3_time_scaleUTCMethods = d3_time_scaleLocalMethods.map(function(m) {
    return [ m[0].utc, m[1] ];
  });
  var d3_time_scaleUTCFormats = [ [ d3.time.format.utc("%Y"), d3_true ], [ d3.time.format.utc("%B"), function(d) {
    return d.getUTCMonth();
  } ], [ d3.time.format.utc("%b %d"), function(d) {
    return d.getUTCDate() != 1;
  } ], [ d3.time.format.utc("%a %d"), function(d) {
    return d.getUTCDay() && d.getUTCDate() != 1;
  } ], [ d3.time.format.utc("%I %p"), function(d) {
    return d.getUTCHours();
  } ], [ d3.time.format.utc("%I:%M"), function(d) {
    return d.getUTCMinutes();
  } ], [ d3.time.format.utc(":%S"), function(d) {
    return d.getUTCSeconds();
  } ], [ d3.time.format.utc(".%L"), function(d) {
    return d.getUTCMilliseconds();
  } ] ];
  var d3_time_scaleUTCFormat = d3_time_scaleFormat(d3_time_scaleUTCFormats);
  function d3_time_scaleUTCSetYear(y) {
    var d = new Date(Date.UTC(y, 0, 1));
    d.setUTCFullYear(y);
    return d;
  }
  function d3_time_scaleUTCGetYear(d) {
    var y = d.getUTCFullYear(), d0 = d3_time_scaleUTCSetYear(y), d1 = d3_time_scaleUTCSetYear(y + 1);
    return y + (d - d0) / (d1 - d0);
  }
  d3_time_scaleUTCMethods.year = function(extent, m) {
    return d3_time_scaleLinear.domain(extent.map(d3_time_scaleUTCGetYear)).ticks(m).map(d3_time_scaleUTCSetYear);
  };
  d3.time.scale.utc = function() {
    return d3_time_scale(d3.scale.linear(), d3_time_scaleUTCMethods, d3_time_scaleUTCFormat);
  };
  d3.text = function() {
    return d3.xhr.apply(d3, arguments).response(d3_text);
  };
  function d3_text(request) {
    return request.responseText;
  }
  d3.json = function(url, callback) {
    return d3.xhr(url, "application/json", callback).response(d3_json);
  };
  function d3_json(request) {
    return JSON.parse(request.responseText);
  }
  d3.html = function(url, callback) {
    return d3.xhr(url, "text/html", callback).response(d3_html);
  };
  function d3_html(request) {
    var range = d3_document.createRange();
    range.selectNode(d3_document.body);
    return range.createContextualFragment(request.responseText);
  }
  d3.xml = function() {
    return d3.xhr.apply(d3, arguments).response(d3_xml);
  };
  function d3_xml(request) {
    return request.responseXML;
  }
  return d3;
}();

/* **********************************************
     Begin d3.v3.min.js
********************************************** */

d3=function(){function n(n){return null!=n&&!isNaN(n)}function t(n){return n.length}function e(n){for(var t=1;n*t%1;)t*=10;return t}function r(n,t){try{for(var e in t)Object.defineProperty(n.prototype,e,{value:t[e],enumerable:!1})}catch(r){n.prototype=t}}function i(){}function u(){}function a(n,t,e){return function(){var r=e.apply(t,arguments);return r===t?n:r}}function o(){}function c(n){function t(){for(var t,r=e,i=-1,u=r.length;++i<u;)(t=r[i].on)&&t.apply(this,arguments);return n}var e=[],r=new i;return t.on=function(t,i){var u,a=r.get(t);return arguments.length<2?a&&a.on:(a&&(a.on=null,e=e.slice(0,u=e.indexOf(a)).concat(e.slice(u+1)),r.remove(t)),i&&e.push(r.set(t,{on:i})),n)},t}function l(){ua.event.stopPropagation(),ua.event.preventDefault()}function f(){for(var n,t=ua.event;n=t.sourceEvent;)t=n;return t}function s(n,t){function e(){n.on(t,null)}n.on(t,function(){l(),e()},!0),setTimeout(e,0)}function h(n){for(var t=new o,e=0,r=arguments.length;++e<r;)t[arguments[e]]=c(t);return t.of=function(e,r){return function(i){try{var u=i.sourceEvent=ua.event;i.target=n,ua.event=i,t[i.type].apply(e,r)}finally{ua.event=u}}},t}function g(n,t){var e=n.ownerSVGElement||n;if(e.createSVGPoint){var r=e.createSVGPoint();if(0>pa&&(oa.scrollX||oa.scrollY)){e=ua.select(aa.body).append("svg").style("position","absolute").style("top",0).style("left",0);var i=e[0][0].getScreenCTM();pa=!(i.f||i.e),e.remove()}return pa?(r.x=t.pageX,r.y=t.pageY):(r.x=t.clientX,r.y=t.clientY),r=r.matrixTransform(n.getScreenCTM().inverse()),[r.x,r.y]}var u=n.getBoundingClientRect();return[t.clientX-u.left-n.clientLeft,t.clientY-u.top-n.clientTop]}function p(n){for(var t=-1,e=n.length,r=[];++t<e;)r.push(n[t]);return r}function d(n){return Array.prototype.slice.call(n)}function m(n){return va(n,wa),n}function v(n){return function(){return ya(n,this)}}function y(n){return function(){return Ma(n,this)}}function M(n,t){function e(){this.removeAttribute(n)}function r(){this.removeAttributeNS(n.space,n.local)}function i(){this.setAttribute(n,t)}function u(){this.setAttributeNS(n.space,n.local,t)}function a(){var e=t.apply(this,arguments);null==e?this.removeAttribute(n):this.setAttribute(n,e)}function o(){var e=t.apply(this,arguments);null==e?this.removeAttributeNS(n.space,n.local):this.setAttributeNS(n.space,n.local,e)}return n=ua.ns.qualify(n),null==t?n.local?r:e:"function"==typeof t?n.local?o:a:n.local?u:i}function x(n){return n.trim().replace(/\s+/g," ")}function b(n){return RegExp("(?:^|\\s+)"+ua.requote(n)+"(?:\\s+|$)","g")}function _(n,t){function e(){for(var e=-1;++e<i;)n[e](this,t)}function r(){for(var e=-1,r=t.apply(this,arguments);++e<i;)n[e](this,r)}n=n.trim().split(/\s+/).map(w);var i=n.length;return"function"==typeof t?r:e}function w(n){var t=b(n);return function(e,r){if(i=e.classList)return r?i.add(n):i.remove(n);var i=e.getAttribute("class")||"";r?(t.lastIndex=0,t.test(i)||e.setAttribute("class",x(i+" "+n))):e.setAttribute("class",x(i.replace(t," ")))}}function S(n,t,e){function r(){this.style.removeProperty(n)}function i(){this.style.setProperty(n,t,e)}function u(){var r=t.apply(this,arguments);null==r?this.style.removeProperty(n):this.style.setProperty(n,r,e)}return null==t?r:"function"==typeof t?u:i}function E(n,t){function e(){delete this[n]}function r(){this[n]=t}function i(){var e=t.apply(this,arguments);null==e?delete this[n]:this[n]=e}return null==t?e:"function"==typeof t?i:r}function k(n){return{__data__:n}}function A(n){return function(){return _a(this,n)}}function N(n){return arguments.length||(n=ua.ascending),function(t,e){return!t-!e||n(t.__data__,e.__data__)}}function q(){}function T(n,t,e){function r(){var t=this[a];t&&(this.removeEventListener(n,t,t.$),delete this[a])}function i(){var i=c(t,da(arguments));r.call(this),this.addEventListener(n,this[a]=i,i.$=e),i._=t}function u(){var t,e=RegExp("^__on([^.]+)"+ua.requote(n)+"$");for(var r in this)if(t=r.match(e)){var i=this[r];this.removeEventListener(t[1],i,i.$),delete this[r]}}var a="__on"+n,o=n.indexOf("."),c=C;o>0&&(n=n.substring(0,o));var l=ka.get(n);return l&&(n=l,c=z),o?t?i:r:t?q:u}function C(n,t){return function(e){var r=ua.event;ua.event=e,t[0]=this.__data__;try{n.apply(this,t)}finally{ua.event=r}}}function z(n,t){var e=C(n,t);return function(n){var t=this,r=n.relatedTarget;r&&(r===t||r.compareDocumentPosition(t)&8)||e.call(t,n)}}function D(n,t){for(var e=0,r=n.length;r>e;e++)for(var i,u=n[e],a=0,o=u.length;o>a;a++)(i=u[a])&&t(i,a,e);return n}function j(n){return va(n,Aa),n}function L(){}function F(n,t,e){return new H(n,t,e)}function H(n,t,e){this.h=n,this.s=t,this.l=e}function P(n,t,e){function r(n){return n>360?n-=360:0>n&&(n+=360),60>n?u+(a-u)*n/60:180>n?a:240>n?u+(a-u)*(240-n)/60:u}function i(n){return Math.round(r(n)*255)}var u,a;return n=isNaN(n)?0:(n%=360)<0?n+360:n,t=isNaN(t)?0:0>t?0:t>1?1:t,e=0>e?0:e>1?1:e,a=.5>=e?e*(1+t):e+t-e*t,u=2*e-a,tt(i(n+120),i(n),i(n-120))}function R(n){return n>0?1:0>n?-1:0}function O(n){return Math.acos(Math.max(-1,Math.min(1,n)))}function Y(n){return n>1?Da/2:-1>n?-Da/2:Math.asin(n)}function U(n){return(Math.exp(n)-Math.exp(-n))/2}function I(n){return(Math.exp(n)+Math.exp(-n))/2}function V(n){return(n=Math.sin(n/2))*n}function X(n,t,e){return new Z(n,t,e)}function Z(n,t,e){this.h=n,this.c=t,this.l=e}function B(n,t,e){return isNaN(n)&&(n=0),isNaN(t)&&(t=0),$(e,Math.cos(n*=La)*t,Math.sin(n)*t)}function $(n,t,e){return new J(n,t,e)}function J(n,t,e){this.l=n,this.a=t,this.b=e}function G(n,t,e){var r=(n+16)/116,i=r+t/500,u=r-e/200;return i=W(i)*Ra,r=W(r)*Oa,u=W(u)*Ya,tt(nt(3.2404542*i-1.5371385*r-.4985314*u),nt(-.969266*i+1.8760108*r+.041556*u),nt(.0556434*i-.2040259*r+1.0572252*u))}function K(n,t,e){return n>0?X(Math.atan2(e,t)*Fa,Math.sqrt(t*t+e*e),n):X(0/0,0/0,n)}function W(n){return n>.206893034?n*n*n:(n-4/29)/7.787037}function Q(n){return n>.008856?Math.pow(n,1/3):7.787037*n+4/29}function nt(n){return Math.round(255*(.00304>=n?12.92*n:1.055*Math.pow(n,1/2.4)-.055))}function tt(n,t,e){return new et(n,t,e)}function et(n,t,e){this.r=n,this.g=t,this.b=e}function rt(n){return 16>n?"0"+Math.max(0,n).toString(16):Math.min(255,n).toString(16)}function it(n,t,e){var r,i,u,a=0,o=0,c=0;if(r=/([a-z]+)\((.*)\)/i.exec(n))switch(i=r[2].split(","),r[1]){case"hsl":return e(parseFloat(i[0]),parseFloat(i[1])/100,parseFloat(i[2])/100);case"rgb":return t(ct(i[0]),ct(i[1]),ct(i[2]))}return(u=Va.get(n))?t(u.r,u.g,u.b):(null!=n&&n.charAt(0)==="#"&&(n.length===4?(a=n.charAt(1),a+=a,o=n.charAt(2),o+=o,c=n.charAt(3),c+=c):n.length===7&&(a=n.substring(1,3),o=n.substring(3,5),c=n.substring(5,7)),a=parseInt(a,16),o=parseInt(o,16),c=parseInt(c,16)),t(a,o,c))}function ut(n,t,e){var r,i,u=Math.min(n/=255,t/=255,e/=255),a=Math.max(n,t,e),o=a-u,c=(a+u)/2;return o?(i=.5>c?o/(a+u):o/(2-a-u),r=n==a?(t-e)/o+(e>t?6:0):t==a?(e-n)/o+2:(n-t)/o+4,r*=60):(r=0/0,i=c>0&&1>c?0:r),F(r,i,c)}function at(n,t,e){n=ot(n),t=ot(t),e=ot(e);var r=Q((.4124564*n+.3575761*t+.1804375*e)/Ra),i=Q((.2126729*n+.7151522*t+.072175*e)/Oa),u=Q((.0193339*n+.119192*t+.9503041*e)/Ya);return $(116*i-16,500*(r-i),200*(i-u))}function ot(n){return(n/=255)<=.04045?n/12.92:Math.pow((n+.055)/1.055,2.4)}function ct(n){var t=parseFloat(n);return n.charAt(n.length-1)==="%"?Math.round(2.55*t):t}function lt(n){return"function"==typeof n?n:function(){return n}}function ft(n){return n}function st(n){return function(t,e,r){return arguments.length===2&&"function"==typeof e&&(r=e,e=null),ht(t,e,n,r)}}function ht(n,t,e,r){function i(){var n,t=c.status;if(!t&&c.responseText||t>=200&&300>t||304===t){try{n=e.call(u,c)}catch(r){return a.error.call(u,r),void 0}a.load.call(u,n)}else a.error.call(u,c)}var u={},a=ua.dispatch("progress","load","error"),o={},c=new(oa.XDomainRequest&&/^(http(s)?:)?\/\//.test(n)?XDomainRequest:XMLHttpRequest);return"onload"in c?c.onload=c.onerror=i:c.onreadystatechange=function(){c.readyState>3&&i()},c.onprogress=function(n){var t=ua.event;ua.event=n;try{a.progress.call(u,c)}finally{ua.event=t}},u.header=function(n,t){return n=(n+"").toLowerCase(),arguments.length<2?o[n]:(null==t?delete o[n]:o[n]=t+"",u)},u.mimeType=function(n){return arguments.length?(t=null==n?null:n+"",u):t},u.response=function(n){return e=n,u},["get","post"].forEach(function(n){u[n]=function(){return u.send.apply(u,[n].concat(da(arguments)))}}),u.send=function(e,r,i){if(arguments.length===2&&"function"==typeof r&&(i=r,r=null),c.open(e,n,!0),null==t||"accept"in o||(o.accept=t+",*/*"),c.setRequestHeader)for(var a in o)c.setRequestHeader(a,o[a]);return null!=t&&c.overrideMimeType&&c.overrideMimeType(t),null!=i&&u.on("error",i).on("load",function(n){i(null,n)}),c.send(null==r?null:r),u},u.abort=function(){return c.abort(),u},ua.rebind(u,a,"on"),null==r?u:u.get(gt(r))}function gt(n){return n.length===1?function(t,e){n(null==t?e:null)}:n}function pt(n,t){function e(n,e,u){arguments.length<3&&(u=e,e=null);var a=ua.xhr(n,t,u);return a.row=function(n){return arguments.length?a.response((e=n)==null?r:i(n)):e},a.row(e)}function r(n){return e.parse(n.responseText)}function i(n){return function(t){return e.parse(t.responseText,n)}}function a(t){return t.map(o).join(n)}function o(n){return c.test(n)?'"'+n.replace(/\"/g,'""')+'"':n}var c=RegExp('["'+n+"\n]"),l=n.charCodeAt(0);return e.parse=function(n,t){var r;return e.parseRows(n,function(n,e){if(r)return r(n,e-1);var i=Function("d","return {"+n.map(function(n,t){return JSON.stringify(n)+": d["+t+"]"}).join(",")+"}");r=t?function(n,e){return t(i(n),e)}:i})},e.parseRows=function(n,t){function e(){if(f>=c)return a;if(i)return i=!1,u;var t=f;if(n.charCodeAt(t)===34){for(var e=t;e++<c;)if(n.charCodeAt(e)===34){if(n.charCodeAt(e+1)!==34)break;++e}f=e+2;var r=n.charCodeAt(e+1);return 13===r?(i=!0,n.charCodeAt(e+2)===10&&++f):10===r&&(i=!0),n.substring(t+1,e).replace(/""/g,'"')}for(;c>f;){var r=n.charCodeAt(f++),o=1;if(10===r)i=!0;else if(13===r)i=!0,n.charCodeAt(f)===10&&(++f,++o);else if(r!==l)continue;return n.substring(t,f-o)}return n.substring(t)}for(var r,i,u={},a={},o=[],c=n.length,f=0,s=0;(r=e())!==a;){for(var h=[];r!==u&&r!==a;)h.push(r),r=e();(!t||(h=t(h,s++)))&&o.push(h)}return o},e.format=function(t){if(Array.isArray(t[0]))return e.formatRows(t);var r=new u,i=[];return t.forEach(function(n){for(var t in n)r.has(t)||i.push(r.add(t))}),[i.map(o).join(n)].concat(t.map(function(t){return i.map(function(n){return o(t[n])}).join(n)})).join("\n")},e.formatRows=function(n){return n.map(a).join("\n")},e}function dt(){var n=mt(),t=vt()-n;t>24?(isFinite(t)&&(clearTimeout($a),$a=setTimeout(dt,t)),Ba=0):(Ba=1,Ja(dt))}function mt(){for(var n=Date.now(),t=Xa;t;)n>=t.time&&(t.flush=t.callback(n-t.time)),t=t.next;return n}function vt(){for(var n,t=Xa,e=1/0;t;)t.flush?t=n?n.next=t.next:Xa=t.next:(t.time<e&&(e=t.time),t=(n=t).next);return Za=n,e}function yt(n,t){var e=Math.pow(10,Math.abs(8-t)*3);return{scale:t>8?function(n){return n/e}:function(n){return n*e},symbol:n}}function Mt(n,t){return t-(n?Math.ceil(Math.log(n)/Math.LN10):1)}function xt(n){return n+""}function bt(n,t){n&&uo.hasOwnProperty(n.type)&&uo[n.type](n,t)}function _t(n,t,e){var r,i=-1,u=n.length-e;for(t.lineStart();++i<u;)r=n[i],t.point(r[0],r[1]);t.lineEnd()}function wt(n,t){var e=-1,r=n.length;for(t.polygonStart();++e<r;)_t(n[e],t,1);t.polygonEnd()}function St(){function n(n,t){n*=La,t=t*La/2+Da/4;var e=n-r,a=Math.cos(t),o=Math.sin(t),c=u*o,l=i*a+c*Math.cos(e),f=c*Math.sin(e);oo+=Math.atan2(f,l),r=n,i=a,u=o}var t,e,r,i,u;co.point=function(a,o){co.point=n,r=(t=a)*La,i=Math.cos(o=(e=o)*La/2+Da/4),u=Math.sin(o)},co.lineEnd=function(){n(t,e)}}function Et(n){var t=n[0],e=n[1],r=Math.cos(e);return[r*Math.cos(t),r*Math.sin(t),Math.sin(e)]}function kt(n,t){return n[0]*t[0]+n[1]*t[1]+n[2]*t[2]}function At(n,t){return[n[1]*t[2]-n[2]*t[1],n[2]*t[0]-n[0]*t[2],n[0]*t[1]-n[1]*t[0]]}function Nt(n,t){n[0]+=t[0],n[1]+=t[1],n[2]+=t[2]}function qt(n,t){return[n[0]*t,n[1]*t,n[2]*t]}function Tt(n){var t=Math.sqrt(n[0]*n[0]+n[1]*n[1]+n[2]*n[2]);n[0]/=t,n[1]/=t,n[2]/=t}function Ct(n){return[Math.atan2(n[1],n[0]),Math.asin(Math.max(-1,Math.min(1,n[2])))]}function zt(n,t){return Math.abs(n[0]-t[0])<ja&&Math.abs(n[1]-t[1])<ja}function Dt(n,t){if(!lo){++fo,n*=La;var e=Math.cos(t*=La);so+=(e*Math.cos(n)-so)/fo,ho+=(e*Math.sin(n)-ho)/fo,go+=(Math.sin(t)-go)/fo}}function jt(){var n,t;lo=1,Lt(),lo=2;var e=po.point;po.point=function(r,i){e(n=r,t=i)},po.lineEnd=function(){po.point(n,t),Ft(),po.lineEnd=Ft}}function Lt(){function n(n,i){n*=La;var u=Math.cos(i*=La),a=u*Math.cos(n),o=u*Math.sin(n),c=Math.sin(i),l=Math.atan2(Math.sqrt((l=e*c-r*o)*l+(l=r*a-t*c)*l+(l=t*o-e*a)*l),t*a+e*o+r*c);fo+=l,so+=l*(t+(t=a)),ho+=l*(e+(e=o)),go+=l*(r+(r=c))}var t,e,r;lo>1||(1>lo&&(lo=1,fo=so=ho=go=0),po.point=function(i,u){i*=La;var a=Math.cos(u*=La);t=a*Math.cos(i),e=a*Math.sin(i),r=Math.sin(u),po.point=n})}function Ft(){po.point=Dt}function Ht(){return!0}function Pt(n,t,e,r,i){var u=[],a=[];if(n.forEach(function(n){if(!((t=n.length-1)<=0)){var t,e=n[0],r=n[t];if(zt(e,r)){i.lineStart();for(var o=0;t>o;++o)i.point((e=n[o])[0],e[1]);return i.lineEnd(),void 0}var c={point:e,points:n,other:null,visited:!1,entry:!0,subject:!0},l={point:e,points:[e],other:c,visited:!1,entry:!1,subject:!1};c.other=l,u.push(c),a.push(l),c={point:r,points:[r],other:null,visited:!1,entry:!1,subject:!0},l={point:r,points:[r],other:c,visited:!1,entry:!0,subject:!1},c.other=l,u.push(c),a.push(l)}}),a.sort(t),Rt(u),Rt(a),u.length){if(e)for(var o=1,c=!e(a[0].point),l=a.length;l>o;++o)a[o].entry=c=!c;for(var f,s,h,g=u[0];;){for(f=g;f.visited;)if((f=f.next)===g)return;s=f.points,i.lineStart();do{if(f.visited=f.other.visited=!0,f.entry){if(f.subject)for(var o=0;o<s.length;o++)i.point((h=s[o])[0],h[1]);else r(f.point,f.next.point,1,i);f=f.next}else{if(f.subject){s=f.prev.points;for(var o=s.length;--o>=0;)i.point((h=s[o])[0],h[1])}else r(f.point,f.prev.point,-1,i);f=f.prev}f=f.other,s=f.points}while(!f.visited);i.lineEnd()}}}function Rt(n){if(t=n.length){for(var t,e,r=0,i=n[0];++r<t;)i.next=e=n[r],e.prev=i,i=e;i.next=e=n[0],e.prev=i}}function Ot(n,t,e){return function(r){function i(t,e){n(t,e)&&r.point(t,e)}function u(n,t){m.point(n,t)}function a(){v.point=u,m.lineStart()}function o(){v.point=i,m.lineEnd()}function c(n,t){M.point(n,t),d.push([n,t])}function l(){M.lineStart(),d=[]}function f(){c(d[0][0],d[0][1]),M.lineEnd();var n,t=M.clean(),e=y.buffer(),i=e.length;if(!i)return p=!0,g+=It(d,-1),d=null,void 0;if(d=null,1&t){n=e[0],h+=It(n,1);var u,i=n.length-1,a=-1;for(r.lineStart();++a<i;)r.point((u=n[a])[0],u[1]);return r.lineEnd(),void 0}i>1&&2&t&&e.push(e.pop().concat(e.shift())),s.push(e.filter(Yt))}var s,h,g,p,d,m=t(r),v={point:i,lineStart:a,lineEnd:o,polygonStart:function(){v.point=c,v.lineStart=l,v.lineEnd=f,p=!1,g=h=0,s=[],r.polygonStart()},polygonEnd:function(){v.point=i,v.lineStart=a,v.lineEnd=o,s=ua.merge(s),s.length?Pt(s,Vt,null,e,r):(-ja>h||p&&-ja>g)&&(r.lineStart(),e(null,null,1,r),r.lineEnd()),r.polygonEnd(),s=null},sphere:function(){r.polygonStart(),r.lineStart(),e(null,null,1,r),r.lineEnd(),r.polygonEnd()}},y=Ut(),M=t(y);return v}}function Yt(n){return n.length>1}function Ut(){var n,t=[];return{lineStart:function(){t.push(n=[])},point:function(t,e){n.push([t,e])},lineEnd:q,buffer:function(){var e=t;return t=[],n=null,e},rejoin:function(){t.length>1&&t.push(t.pop().concat(t.shift()))}}}function It(n,t){if(!(e=n.length))return 0;for(var e,r,i,u=0,a=0,o=n[0],c=o[0],l=o[1],f=Math.cos(l),s=Math.atan2(t*Math.sin(c)*f,Math.sin(l)),h=1-t*Math.cos(c)*f,g=s;++u<e;)o=n[u],f=Math.cos(l=o[1]),r=Math.atan2(t*Math.sin(c=o[0])*f,Math.sin(l)),i=1-t*Math.cos(c)*f,Math.abs(h-2)<ja&&Math.abs(i-2)<ja||(Math.abs(i)<ja||Math.abs(h)<ja||(Math.abs(Math.abs(r-s)-Da)<ja?i+h>2&&(a+=4*(r-s)):a+=Math.abs(h-2)<ja?4*(r-g):((3*Da+r-s)%(2*Da)-Da)*(h+i)),g=s,s=r,h=i);return a}function Vt(n,t){return((n=n.point)[0]<0?n[1]-Da/2-ja:Da/2-n[1])-((t=t.point)[0]<0?t[1]-Da/2-ja:Da/2-t[1])}function Xt(n){var t,e=0/0,r=0/0,i=0/0;return{lineStart:function(){n.lineStart(),t=1},point:function(u,a){var o=u>0?Da:-Da,c=Math.abs(u-e);Math.abs(c-Da)<ja?(n.point(e,r=(r+a)/2>0?Da/2:-Da/2),n.point(i,r),n.lineEnd(),n.lineStart(),n.point(o,r),n.point(u,r),t=0):i!==o&&c>=Da&&(Math.abs(e-i)<ja&&(e-=i*ja),Math.abs(u-o)<ja&&(u-=o*ja),r=Zt(e,r,u,a),n.point(i,r),n.lineEnd(),n.lineStart(),n.point(o,r),t=0),n.point(e=u,r=a),i=o},lineEnd:function(){n.lineEnd(),e=r=0/0},clean:function(){return 2-t}}}function Zt(n,t,e,r){var i,u,a=Math.sin(n-e);return Math.abs(a)>ja?Math.atan((Math.sin(t)*(u=Math.cos(r))*Math.sin(e)-Math.sin(r)*(i=Math.cos(t))*Math.sin(n))/(i*u*a)):(t+r)/2}function Bt(n,t,e,r){var i;if(null==n)i=e*Da/2,r.point(-Da,i),r.point(0,i),r.point(Da,i),r.point(Da,0),r.point(Da,-i),r.point(0,-i),r.point(-Da,-i),r.point(-Da,0),r.point(-Da,i);else if(Math.abs(n[0]-t[0])>ja){var u=(n[0]<t[0]?1:-1)*Da;i=e*u/2,r.point(-u,i),r.point(0,i),r.point(u,i)}else r.point(t[0],t[1])}function $t(n){function t(n,t){return Math.cos(n)*Math.cos(t)>u}function e(n){var e,u,c,l,f;return{lineStart:function(){l=c=!1,f=1},point:function(s,h){var g,p=[s,h],d=t(s,h),m=a?d?0:i(s,h):d?i(s+(0>s?Da:-Da),h):0;if(!e&&(l=c=d)&&n.lineStart(),d!==c&&(g=r(e,p),(zt(e,g)||zt(p,g))&&(p[0]+=ja,p[1]+=ja,d=t(p[0],p[1]))),d!==c)f=0,d?(n.lineStart(),g=r(p,e),n.point(g[0],g[1])):(g=r(e,p),n.point(g[0],g[1]),n.lineEnd()),e=g;else if(o&&e&&a^d){var v;m&u||!(v=r(p,e,!0))||(f=0,a?(n.lineStart(),n.point(v[0][0],v[0][1]),n.point(v[1][0],v[1][1]),n.lineEnd()):(n.point(v[1][0],v[1][1]),n.lineEnd(),n.lineStart(),n.point(v[0][0],v[0][1])))}!d||e&&zt(e,p)||n.point(p[0],p[1]),e=p,c=d,u=m},lineEnd:function(){c&&n.lineEnd(),e=null},clean:function(){return f|(l&&c)<<1}}}function r(n,t,e){var r=Et(n),i=Et(t),a=[1,0,0],o=At(r,i),c=kt(o,o),l=o[0],f=c-l*l;if(!f)return!e&&n;var s=u*c/f,h=-u*l/f,g=At(a,o),p=qt(a,s),d=qt(o,h);Nt(p,d);var m=g,v=kt(p,m),y=kt(m,m),M=v*v-y*(kt(p,p)-1);if(!(0>M)){var x=Math.sqrt(M),b=qt(m,(-v-x)/y);if(Nt(b,p),b=Ct(b),!e)return b;var _,w=n[0],S=t[0],E=n[1],k=t[1];w>S&&(_=w,w=S,S=_);var A=S-w,N=Math.abs(A-Da)<ja,q=N||ja>A;if(!N&&E>k&&(_=E,E=k,k=_),q?N?E+k>0^b[1]<(Math.abs(b[0]-w)<ja?E:k):E<=b[1]&&b[1]<=k:A>Da^(w<=b[0]&&b[0]<=S)){var T=qt(m,(-v+x)/y);return Nt(T,p),[b,Ct(T)]}}}function i(t,e){var r=a?n:Da-n,i=0;return-r>t?i|=1:t>r&&(i|=2),-r>e?i|=4:e>r&&(i|=8),i}var u=Math.cos(n),a=u>0,o=Math.abs(u)>ja,c=oe(n,6*La);return Ot(t,e,c)}function Jt(n,t,e,r){function i(r,i){return Math.abs(r[0]-n)<ja?i>0?0:3:Math.abs(r[0]-e)<ja?i>0?2:1:Math.abs(r[1]-t)<ja?i>0?1:0:i>0?3:2}function u(n,t){return a(n.point,t.point)}function a(n,t){var e=i(n,1),r=i(t,1);return e!==r?e-r:0===e?t[1]-n[1]:1===e?n[0]-t[0]:2===e?n[1]-t[1]:t[0]-n[0]}function o(i,u){var a=u[0]-i[0],o=u[1]-i[1],c=[0,1];return Math.abs(a)<ja&&Math.abs(o)<ja?n<=i[0]&&i[0]<=e&&t<=i[1]&&i[1]<=r:Gt(n-i[0],a,c)&&Gt(i[0]-e,-a,c)&&Gt(t-i[1],o,c)&&Gt(i[1]-r,-o,c)?(c[1]<1&&(u[0]=i[0]+c[1]*a,u[1]=i[1]+c[1]*o),c[0]>0&&(i[0]+=c[0]*a,i[1]+=c[0]*o),!0):!1}return function(c){function l(u){var a=i(u,-1),o=f([0===a||3===a?n:e,a>1?r:t]);return o}function f(n){for(var t=0,e=M.length,r=n[1],i=0;e>i;++i)for(var u,a=1,o=M[i],c=o.length,l=o[0];c>a;++a)u=o[a],l[1]<=r?u[1]>r&&s(l,u,n)>0&&++t:u[1]<=r&&s(l,u,n)<0&&--t,l=u;return 0!==t}function s(n,t,e){return(t[0]-n[0])*(e[1]-n[1])-(e[0]-n[0])*(t[1]-n[1])}function h(u,o,c,l){var f=0,s=0;if(null==u||(f=i(u,c))!==(s=i(o,c))||a(u,o)<0^c>0){do l.point(0===f||3===f?n:e,f>1?r:t);while((f=(f+c+4)%4)!==s)}else l.point(o[0],o[1])}function g(i,u){return i>=n&&e>=i&&u>=t&&r>=u}function p(n,t){g(n,t)&&c.point(n,t)}function d(){T.point=v,M&&M.push(x=[]),A=!0,k=!1,S=E=0/0}function m(){y&&(v(b,_),w&&k&&q.rejoin(),y.push(q.buffer())),T.point=p,k&&c.lineEnd()}function v(n,t){n=Math.max(-vo,Math.min(vo,n)),t=Math.max(-vo,Math.min(vo,t));var e=g(n,t);if(M&&x.push([n,t]),A)b=n,_=t,w=e,A=!1,e&&(c.lineStart(),c.point(n,t));else if(e&&k)c.point(n,t);else{var r=[S,E],i=[n,t];o(r,i)?(k||(c.lineStart(),c.point(r[0],r[1])),c.point(i[0],i[1]),e||c.lineEnd()):e&&(c.lineStart(),c.point(n,t))}S=n,E=t,k=e}var y,M,x,b,_,w,S,E,k,A,N=c,q=Ut(),T={point:p,lineStart:d,lineEnd:m,polygonStart:function(){c=q,y=[],M=[]},polygonEnd:function(){c=N,(y=ua.merge(y)).length?(c.polygonStart(),Pt(y,u,l,h,c),c.polygonEnd()):f([n,t])&&(c.polygonStart(),c.lineStart(),h(null,null,1,c),c.lineEnd(),c.polygonEnd()),y=M=x=null}};return T}}function Gt(n,t,e){if(Math.abs(t)<ja)return 0>=n;var r=n/t;if(t>0){if(r>e[1])return!1;r>e[0]&&(e[0]=r)}else{if(r<e[0])return!1;r<e[1]&&(e[1]=r)}return!0}function Kt(n,t){function e(e,r){return e=n(e,r),t(e[0],e[1])}return n.invert&&t.invert&&(e.invert=function(e,r){return e=t.invert(e,r),e&&n.invert(e[0],e[1])}),e}function Wt(n){function t(t){function r(e,r){e=n(e,r),t.point(e[0],e[1])}function u(){f=0/0,d.point=a,t.lineStart()}function a(r,u){var a=Et([r,u]),o=n(r,u);e(f,s,l,h,g,p,f=o[0],s=o[1],l=r,h=a[0],g=a[1],p=a[2],i,t),t.point(f,s)}function o(){d.point=r,t.lineEnd()}function c(){var n,r,c,m,v,y,M;u(),d.point=function(t,e){a(n=t,r=e),c=f,m=s,v=h,y=g,M=p,d.point=a},d.lineEnd=function(){e(f,s,l,h,g,p,c,m,n,v,y,M,i,t),d.lineEnd=o,o()}}var l,f,s,h,g,p,d={point:r,lineStart:u,lineEnd:o,polygonStart:function(){t.polygonStart(),d.lineStart=c},polygonEnd:function(){t.polygonEnd(),d.lineStart=u}};return d}function e(t,i,u,a,o,c,l,f,s,h,g,p,d,m){var v=l-t,y=f-i,M=v*v+y*y;if(M>4*r&&d--){var x=a+h,b=o+g,_=c+p,w=Math.sqrt(x*x+b*b+_*_),S=Math.asin(_/=w),E=Math.abs(Math.abs(_)-1)<ja?(u+s)/2:Math.atan2(b,x),k=n(E,S),A=k[0],N=k[1],q=A-t,T=N-i,C=y*q-v*T;(C*C/M>r||Math.abs((v*q+y*T)/M-.5)>.3)&&(e(t,i,u,a,o,c,A,N,E,x/=w,b/=w,_,d,m),m.point(A,N),e(A,N,E,x,b,_,l,f,s,h,g,p,d,m))}}var r=.5,i=16;return t.precision=function(n){return arguments.length?(i=(r=n*n)>0&&16,t):Math.sqrt(r)},t}function Qt(n){return ne(function(){return n})()}function ne(n){function t(n){return n=a(n[0]*La,n[1]*La),[n[0]*f+o,c-n[1]*f]}function e(n){return n=a.invert((n[0]-o)/f,(c-n[1])/f),n&&[n[0]*Fa,n[1]*Fa]}function r(){a=Kt(u=re(d,m,v),i);var n=i(g,p);return o=s-n[0]*f,c=h+n[1]*f,t}var i,u,a,o,c,l=Wt(function(n,t){return n=i(n,t),[n[0]*f+o,c-n[1]*f]}),f=150,s=480,h=250,g=0,p=0,d=0,m=0,v=0,y=mo,M=ft,x=null,b=null;return t.stream=function(n){return te(u,y(l(M(n))))},t.clipAngle=function(n){return arguments.length?(y=null==n?(x=n,mo):$t((x=+n)*La),t):x},t.clipExtent=function(n){return arguments.length?(b=n,M=null==n?ft:Jt(n[0][0],n[0][1],n[1][0],n[1][1]),t):b},t.scale=function(n){return arguments.length?(f=+n,r()):f},t.translate=function(n){return arguments.length?(s=+n[0],h=+n[1],r()):[s,h]},t.center=function(n){return arguments.length?(g=n[0]%360*La,p=n[1]%360*La,r()):[g*Fa,p*Fa]},t.rotate=function(n){return arguments.length?(d=n[0]%360*La,m=n[1]%360*La,v=n.length>2?n[2]%360*La:0,r()):[d*Fa,m*Fa,v*Fa]},ua.rebind(t,l,"precision"),function(){return i=n.apply(this,arguments),t.invert=i.invert&&e,r()}}function te(n,t){return{point:function(e,r){r=n(e*La,r*La),e=r[0],t.point(e>Da?e-2*Da:-Da>e?e+2*Da:e,r[1])},sphere:function(){t.sphere()},lineStart:function(){t.lineStart()},lineEnd:function(){t.lineEnd()},polygonStart:function(){t.polygonStart()},polygonEnd:function(){t.polygonEnd()}}}function ee(n,t){return[n,t]}function re(n,t,e){return n?t||e?Kt(ue(n),ae(t,e)):ue(n):t||e?ae(t,e):ee}function ie(n){return function(t,e){return t+=n,[t>Da?t-2*Da:-Da>t?t+2*Da:t,e]}}function ue(n){var t=ie(n);return t.invert=ie(-n),t}function ae(n,t){function e(n,t){var e=Math.cos(t),o=Math.cos(n)*e,c=Math.sin(n)*e,l=Math.sin(t),f=l*r+o*i;return[Math.atan2(c*u-f*a,o*r-l*i),Math.asin(Math.max(-1,Math.min(1,f*u+c*a)))]}var r=Math.cos(n),i=Math.sin(n),u=Math.cos(t),a=Math.sin(t);return e.invert=function(n,t){var e=Math.cos(t),o=Math.cos(n)*e,c=Math.sin(n)*e,l=Math.sin(t),f=l*u-c*a;return[Math.atan2(c*u+l*a,o*r+f*i),Math.asin(Math.max(-1,Math.min(1,f*r-o*i)))]},e}function oe(n,t){var e=Math.cos(n),r=Math.sin(n);return function(i,u,a,o){null!=i?(i=ce(e,i),u=ce(e,u),(a>0?u>i:i>u)&&(i+=2*a*Da)):(i=n+2*a*Da,u=n);for(var c,l=a*t,f=i;a>0?f>u:u>f;f-=l)o.point((c=Ct([e,-r*Math.cos(f),-r*Math.sin(f)]))[0],c[1])}}function ce(n,t){var e=Et(t);e[0]-=n,Tt(e);var r=O(-e[1]);return((-e[2]<0?-r:r)+2*Math.PI-ja)%(2*Math.PI)}function le(n,t,e){var r=ua.range(n,t-ja,e).concat(t);return function(n){return r.map(function(t){return[n,t]})}}function fe(n,t,e){var r=ua.range(n,t-ja,e).concat(t);return function(n){return r.map(function(t){return[t,n]})}}function se(n){return n.source}function he(n){return n.target}function ge(n,t,e,r){var i=Math.cos(t),u=Math.sin(t),a=Math.cos(r),o=Math.sin(r),c=i*Math.cos(n),l=i*Math.sin(n),f=a*Math.cos(e),s=a*Math.sin(e),h=2*Math.asin(Math.sqrt(V(r-t)+i*a*V(e-n))),g=1/Math.sin(h),p=h?function(n){var t=Math.sin(n*=h)*g,e=Math.sin(h-n)*g,r=e*c+t*f,i=e*l+t*s,a=e*u+t*o;return[Math.atan2(i,r)*Fa,Math.atan2(a,Math.sqrt(r*r+i*i))*Fa]}:function(){return[n*Fa,t*Fa]};return p.distance=h,p}function pe(){function n(n,i){var u=Math.sin(i*=La),a=Math.cos(i),o=Math.abs((n*=La)-t),c=Math.cos(o);yo+=Math.atan2(Math.sqrt((o=a*Math.sin(o))*o+(o=r*u-e*a*c)*o),e*u+r*a*c),t=n,e=u,r=a}var t,e,r;Mo.point=function(i,u){t=i*La,e=Math.sin(u*=La),r=Math.cos(u),Mo.point=n},Mo.lineEnd=function(){Mo.point=Mo.lineEnd=q}}function de(n){var t=0,e=Da/3,r=ne(n),i=r(t,e);return i.parallels=function(n){return arguments.length?r(t=n[0]*Da/180,e=n[1]*Da/180):[180*(t/Da),180*(e/Da)]},i}function me(n,t){function e(n,t){var e=Math.sqrt(u-2*i*Math.sin(t))/i;return[e*Math.sin(n*=i),a-e*Math.cos(n)]}var r=Math.sin(n),i=(r+Math.sin(t))/2,u=1+r*(2*i-r),a=Math.sqrt(u)/i;return e.invert=function(n,t){var e=a-t;return[Math.atan2(n,e)/i,Y((u-(n*n+e*e)*i*i)/(2*i))]},e}function ve(){function n(n,t){bo+=i*n-r*t,r=n,i=t}var t,e,r,i;ko.point=function(u,a){ko.point=n,t=r=u,e=i=a},ko.lineEnd=function(){n(t,e)}}function ye(n,t){_o>n&&(_o=n),n>So&&(So=n),wo>t&&(wo=t),t>Eo&&(Eo=t)}function Me(){function n(n,t){a.push("M",n,",",t,u)}function t(n,t){a.push("M",n,",",t),o.point=e}function e(n,t){a.push("L",n,",",t)}function r(){o.point=n}function i(){a.push("Z")}var u=xe(4.5),a=[],o={point:n,lineStart:function(){o.point=t},lineEnd:r,polygonStart:function(){o.lineEnd=i},polygonEnd:function(){o.lineEnd=r,o.point=n},pointRadius:function(n){return u=xe(n),o},result:function(){if(a.length){var n=a.join("");return a=[],n}}};return o}function xe(n){return"m0,"+n+"a"+n+","+n+" 0 1,1 0,"+-2*n+"a"+n+","+n+" 0 1,1 0,"+2*n+"z"}function be(n,t){lo||(so+=n,ho+=t,++go)}function _e(){function n(n,r){var i=n-t,u=r-e,a=Math.sqrt(i*i+u*u);so+=a*(t+n)/2,ho+=a*(e+r)/2,go+=a,t=n,e=r}var t,e;if(1!==lo){if(!(1>lo))return;lo=1,so=ho=go=0}No.point=function(r,i){No.point=n,t=r,e=i}}function we(){No.point=be}function Se(){function n(n,t){var e=i*n-r*t;so+=e*(r+n),ho+=e*(i+t),go+=3*e,r=n,i=t}var t,e,r,i;2>lo&&(lo=2,so=ho=go=0),No.point=function(u,a){No.point=n,t=r=u,e=i=a},No.lineEnd=function(){n(t,e)}}function Ee(n){function t(t,e){n.moveTo(t,e),n.arc(t,e,a,0,2*Da)}function e(t,e){n.moveTo(t,e),o.point=r}function r(t,e){n.lineTo(t,e)}function i(){o.point=t}function u(){n.closePath()}var a=4.5,o={point:t,lineStart:function(){o.point=e},lineEnd:i,polygonStart:function(){o.lineEnd=u},polygonEnd:function(){o.lineEnd=i,o.point=t},pointRadius:function(n){return a=n,o},result:q};return o}function ke(n){var t=Wt(function(t,e){return n([t*Fa,e*Fa])});return function(n){return n=t(n),{point:function(t,e){n.point(t*La,e*La)},sphere:function(){n.sphere()},lineStart:function(){n.lineStart()},lineEnd:function(){n.lineEnd()},polygonStart:function(){n.polygonStart()},polygonEnd:function(){n.polygonEnd()}}}}function Ae(n,t){function e(t,e){var r=Math.cos(t),i=Math.cos(e),u=n(r*i);return[u*i*Math.sin(t),u*Math.sin(e)]}return e.invert=function(n,e){var r=Math.sqrt(n*n+e*e),i=t(r),u=Math.sin(i),a=Math.cos(i);return[Math.atan2(n*u,r*a),Math.asin(r&&e*u/r)]},e}function Ne(n,t){function e(n,t){var e=Math.abs(Math.abs(t)-Da/2)<ja?0:a/Math.pow(i(t),u);return[e*Math.sin(u*n),a-e*Math.cos(u*n)]}var r=Math.cos(n),i=function(n){return Math.tan(Da/4+n/2)},u=n===t?Math.sin(n):Math.log(r/Math.cos(t))/Math.log(i(t)/i(n)),a=r*Math.pow(i(n),u)/u;return u?(e.invert=function(n,t){var e=a-t,r=R(u)*Math.sqrt(n*n+e*e);return[Math.atan2(n,e)/u,2*Math.atan(Math.pow(a/r,1/u))-Da/2]},e):Te}function qe(n,t){function e(n,t){var e=u-t;return[e*Math.sin(i*n),u-e*Math.cos(i*n)]}var r=Math.cos(n),i=n===t?Math.sin(n):(r-Math.cos(t))/(t-n),u=r/i+n;return Math.abs(i)<ja?ee:(e.invert=function(n,t){var e=u-t;return[Math.atan2(n,e)/i,u-R(i)*Math.sqrt(n*n+e*e)]},e)}function Te(n,t){return[n,Math.log(Math.tan(Da/4+t/2))]}function Ce(n){var t,e=Qt(n),r=e.scale,i=e.translate,u=e.clipExtent;return e.scale=function(){var n=r.apply(e,arguments);return n===e?t?e.clipExtent(null):e:n},e.translate=function(){var n=i.apply(e,arguments);return n===e?t?e.clipExtent(null):e:n},e.clipExtent=function(n){var a=u.apply(e,arguments);if(a===e){if(t=null==n){var o=Da*r(),c=i();u([[c[0]-o,c[1]-o],[c[0]+o,c[1]+o]])}}else t&&(a=null);return a},e.clipExtent(null)}function ze(n,t){var e=Math.cos(t)*Math.sin(n);return[Math.log((1+e)/(1-e))/2,Math.atan2(Math.tan(t),Math.cos(n))]}function De(n){function t(t){function a(){l.push("M",u(n(f),o))}for(var c,l=[],f=[],s=-1,h=t.length,g=lt(e),p=lt(r);++s<h;)i.call(this,c=t[s],s)?f.push([+g.call(this,c,s),+p.call(this,c,s)]):f.length&&(a(),f=[]);return f.length&&a(),l.length?l.join(""):null}var e=je,r=Le,i=Ht,u=Fe,a=u.key,o=.7;return t.x=function(n){return arguments.length?(e=n,t):e},t.y=function(n){return arguments.length?(r=n,t):r},t.defined=function(n){return arguments.length?(i=n,t):i},t.interpolate=function(n){return arguments.length?(a="function"==typeof n?u=n:(u=jo.get(n)||Fe).key,t):a},t.tension=function(n){return arguments.length?(o=n,t):o},t}function je(n){return n[0]}function Le(n){return n[1]}function Fe(n){return n.join("L")}function He(n){return Fe(n)+"Z"}function Pe(n){for(var t=0,e=n.length,r=n[0],i=[r[0],",",r[1]];++t<e;)i.push("V",(r=n[t])[1],"H",r[0]);return i.join("")}function Re(n){for(var t=0,e=n.length,r=n[0],i=[r[0],",",r[1]];++t<e;)i.push("H",(r=n[t])[0],"V",r[1]);return i.join("")}function Oe(n,t){return n.length<4?Fe(n):n[1]+Ie(n.slice(1,n.length-1),Ve(n,t))}function Ye(n,t){return n.length<3?Fe(n):n[0]+Ie((n.push(n[0]),n),Ve([n[n.length-2]].concat(n,[n[1]]),t))}function Ue(n,t){return n.length<3?Fe(n):n[0]+Ie(n,Ve(n,t))}function Ie(n,t){if(t.length<1||n.length!=t.length&&n.length!=t.length+2)return Fe(n);var e=n.length!=t.length,r="",i=n[0],u=n[1],a=t[0],o=a,c=1;if(e&&(r+="Q"+(u[0]-a[0]*2/3)+","+(u[1]-a[1]*2/3)+","+u[0]+","+u[1],i=n[1],c=2),t.length>1){o=t[1],u=n[c],c++,r+="C"+(i[0]+a[0])+","+(i[1]+a[1])+","+(u[0]-o[0])+","+(u[1]-o[1])+","+u[0]+","+u[1];for(var l=2;l<t.length;l++,c++)u=n[c],o=t[l],r+="S"+(u[0]-o[0])+","+(u[1]-o[1])+","+u[0]+","+u[1]}if(e){var f=n[c];r+="Q"+(u[0]+o[0]*2/3)+","+(u[1]+o[1]*2/3)+","+f[0]+","+f[1]}return r}function Ve(n,t){for(var e,r=[],i=(1-t)/2,u=n[0],a=n[1],o=1,c=n.length;++o<c;)e=u,u=a,a=n[o],r.push([i*(a[0]-e[0]),i*(a[1]-e[1])]);return r}function Xe(n){if(n.length<3)return Fe(n);var t=1,e=n.length,r=n[0],i=r[0],u=r[1],a=[i,i,i,(r=n[1])[0]],o=[u,u,u,r[1]],c=[i,",",u];for(Ge(c,a,o);++t<e;)r=n[t],a.shift(),a.push(r[0]),o.shift(),o.push(r[1]),Ge(c,a,o);for(t=-1;++t<2;)a.shift(),a.push(r[0]),o.shift(),o.push(r[1]),Ge(c,a,o);return c.join("")}function Ze(n){if(n.length<4)return Fe(n);for(var t,e=[],r=-1,i=n.length,u=[0],a=[0];++r<3;)t=n[r],u.push(t[0]),a.push(t[1]);for(e.push(Je(Ho,u)+","+Je(Ho,a)),--r;++r<i;)t=n[r],u.shift(),u.push(t[0]),a.shift(),a.push(t[1]),Ge(e,u,a);return e.join("")}function Be(n){for(var t,e,r=-1,i=n.length,u=i+4,a=[],o=[];++r<4;)e=n[r%i],a.push(e[0]),o.push(e[1]);for(t=[Je(Ho,a),",",Je(Ho,o)],--r;++r<u;)e=n[r%i],a.shift(),a.push(e[0]),o.shift(),o.push(e[1]),Ge(t,a,o);return t.join("")}function $e(n,t){var e=n.length-1;if(e)for(var r,i,u=n[0][0],a=n[0][1],o=n[e][0]-u,c=n[e][1]-a,l=-1;++l<=e;)r=n[l],i=l/e,r[0]=t*r[0]+(1-t)*(u+i*o),r[1]=t*r[1]+(1-t)*(a+i*c);return Xe(n)}function Je(n,t){return n[0]*t[0]+n[1]*t[1]+n[2]*t[2]+n[3]*t[3]}function Ge(n,t,e){n.push("C",Je(Lo,t),",",Je(Lo,e),",",Je(Fo,t),",",Je(Fo,e),",",Je(Ho,t),",",Je(Ho,e))}function Ke(n,t){return(t[1]-n[1])/(t[0]-n[0])
}function We(n){for(var t=0,e=n.length-1,r=[],i=n[0],u=n[1],a=r[0]=Ke(i,u);++t<e;)r[t]=(a+(a=Ke(i=u,u=n[t+1])))/2;return r[t]=a,r}function Qe(n){for(var t,e,r,i,u=[],a=We(n),o=-1,c=n.length-1;++o<c;)t=Ke(n[o],n[o+1]),Math.abs(t)<1e-6?a[o]=a[o+1]=0:(e=a[o]/t,r=a[o+1]/t,i=e*e+r*r,i>9&&(i=3*t/Math.sqrt(i),a[o]=i*e,a[o+1]=i*r));for(o=-1;++o<=c;)i=(n[Math.min(c,o+1)][0]-n[Math.max(0,o-1)][0])/(6*(1+a[o]*a[o])),u.push([i||0,a[o]*i||0]);return u}function nr(n){return n.length<3?Fe(n):n[0]+Ie(n,Qe(n))}function tr(n,t,e,r){var i,u,a,o,c,l,f;return i=r[n],u=i[0],a=i[1],i=r[t],o=i[0],c=i[1],i=r[e],l=i[0],f=i[1],(f-a)*(o-u)-(c-a)*(l-u)>0}function er(n,t,e){return(e[0]-t[0])*(n[1]-t[1])<(e[1]-t[1])*(n[0]-t[0])}function rr(n,t,e,r){var i=n[0],u=e[0],a=t[0]-i,o=r[0]-u,c=n[1],l=e[1],f=t[1]-c,s=r[1]-l,h=(o*(c-l)-s*(i-u))/(s*a-o*f);return[i+h*a,c+h*f]}function ir(n,t){var e={list:n.map(function(n,t){return{index:t,x:n[0],y:n[1]}}).sort(function(n,t){return n.y<t.y?-1:n.y>t.y?1:n.x<t.x?-1:n.x>t.x?1:0}),bottomSite:null},r={list:[],leftEnd:null,rightEnd:null,init:function(){r.leftEnd=r.createHalfEdge(null,"l"),r.rightEnd=r.createHalfEdge(null,"l"),r.leftEnd.r=r.rightEnd,r.rightEnd.l=r.leftEnd,r.list.unshift(r.leftEnd,r.rightEnd)},createHalfEdge:function(n,t){return{edge:n,side:t,vertex:null,l:null,r:null}},insert:function(n,t){t.l=n,t.r=n.r,n.r.l=t,n.r=t},leftBound:function(n){var t=r.leftEnd;do t=t.r;while(t!=r.rightEnd&&i.rightOf(t,n));return t=t.l},del:function(n){n.l.r=n.r,n.r.l=n.l,n.edge=null},right:function(n){return n.r},left:function(n){return n.l},leftRegion:function(n){return n.edge==null?e.bottomSite:n.edge.region[n.side]},rightRegion:function(n){return n.edge==null?e.bottomSite:n.edge.region[Po[n.side]]}},i={bisect:function(n,t){var e={region:{l:n,r:t},ep:{l:null,r:null}},r=t.x-n.x,i=t.y-n.y,u=r>0?r:-r,a=i>0?i:-i;return e.c=n.x*r+n.y*i+.5*(r*r+i*i),u>a?(e.a=1,e.b=i/r,e.c/=r):(e.b=1,e.a=r/i,e.c/=i),e},intersect:function(n,t){var e=n.edge,r=t.edge;if(!e||!r||e.region.r==r.region.r)return null;var i=e.a*r.b-e.b*r.a;if(Math.abs(i)<1e-10)return null;var u,a,o=(e.c*r.b-r.c*e.b)/i,c=(r.c*e.a-e.c*r.a)/i,l=e.region.r,f=r.region.r;l.y<f.y||l.y==f.y&&l.x<f.x?(u=n,a=e):(u=t,a=r);var s=o>=a.region.r.x;return s&&u.side==="l"||!s&&u.side==="r"?null:{x:o,y:c}},rightOf:function(n,t){var e=n.edge,r=e.region.r,i=t.x>r.x;if(i&&n.side==="l")return 1;if(!i&&n.side==="r")return 0;if(e.a===1){var u=t.y-r.y,a=t.x-r.x,o=0,c=0;if(!i&&e.b<0||i&&e.b>=0?c=o=u>=e.b*a:(c=t.x+t.y*e.b>e.c,e.b<0&&(c=!c),c||(o=1)),!o){var l=r.x-e.region.l.x;c=e.b*(a*a-u*u)<l*u*(1+2*a/l+e.b*e.b),e.b<0&&(c=!c)}}else{var f=e.c-e.a*t.x,s=t.y-f,h=t.x-r.x,g=f-r.y;c=s*s>h*h+g*g}return n.side==="l"?c:!c},endPoint:function(n,e,r){n.ep[e]=r,n.ep[Po[e]]&&t(n)},distance:function(n,t){var e=n.x-t.x,r=n.y-t.y;return Math.sqrt(e*e+r*r)}},u={list:[],insert:function(n,t,e){n.vertex=t,n.ystar=t.y+e;for(var r=0,i=u.list,a=i.length;a>r;r++){var o=i[r];if(!(n.ystar>o.ystar||n.ystar==o.ystar&&t.x>o.vertex.x))break}i.splice(r,0,n)},del:function(n){for(var t=0,e=u.list,r=e.length;r>t&&e[t]!=n;++t);e.splice(t,1)},empty:function(){return u.list.length===0},nextEvent:function(n){for(var t=0,e=u.list,r=e.length;r>t;++t)if(e[t]==n)return e[t+1];return null},min:function(){var n=u.list[0];return{x:n.vertex.x,y:n.ystar}},extractMin:function(){return u.list.shift()}};r.init(),e.bottomSite=e.list.shift();for(var a,o,c,l,f,s,h,g,p,d,m,v,y,M=e.list.shift();;)if(u.empty()||(a=u.min()),M&&(u.empty()||M.y<a.y||M.y==a.y&&M.x<a.x))o=r.leftBound(M),c=r.right(o),h=r.rightRegion(o),v=i.bisect(h,M),s=r.createHalfEdge(v,"l"),r.insert(o,s),d=i.intersect(o,s),d&&(u.del(o),u.insert(o,d,i.distance(d,M))),o=s,s=r.createHalfEdge(v,"r"),r.insert(o,s),d=i.intersect(s,c),d&&u.insert(s,d,i.distance(d,M)),M=e.list.shift();else{if(u.empty())break;o=u.extractMin(),l=r.left(o),c=r.right(o),f=r.right(c),h=r.leftRegion(o),g=r.rightRegion(c),m=o.vertex,i.endPoint(o.edge,o.side,m),i.endPoint(c.edge,c.side,m),r.del(o),u.del(c),r.del(c),y="l",h.y>g.y&&(p=h,h=g,g=p,y="r"),v=i.bisect(h,g),s=r.createHalfEdge(v,y),r.insert(l,s),i.endPoint(v,Po[y],m),d=i.intersect(l,s),d&&(u.del(l),u.insert(l,d,i.distance(d,h))),d=i.intersect(s,f),d&&u.insert(s,d,i.distance(d,h))}for(o=r.right(r.leftEnd);o!=r.rightEnd;o=r.right(o))t(o.edge)}function ur(n){return n.x}function ar(n){return n.y}function or(){return{leaf:!0,nodes:[],point:null,x:null,y:null}}function cr(n,t,e,r,i,u){if(!n(t,e,r,i,u)){var a=.5*(e+i),o=.5*(r+u),c=t.nodes;c[0]&&cr(n,c[0],e,r,a,o),c[1]&&cr(n,c[1],a,r,i,o),c[2]&&cr(n,c[2],e,o,a,u),c[3]&&cr(n,c[3],a,o,i,u)}}function lr(n,t){n=ua.rgb(n),t=ua.rgb(t);var e=n.r,r=n.g,i=n.b,u=t.r-e,a=t.g-r,o=t.b-i;return function(n){return"#"+rt(Math.round(e+u*n))+rt(Math.round(r+a*n))+rt(Math.round(i+o*n))}}function fr(n){var t=[n.a,n.b],e=[n.c,n.d],r=hr(t),i=sr(t,e),u=hr(gr(e,t,-i))||0;t[0]*e[1]<e[0]*t[1]&&(t[0]*=-1,t[1]*=-1,r*=-1,i*=-1),this.rotate=(r?Math.atan2(t[1],t[0]):Math.atan2(-e[0],e[1]))*Fa,this.translate=[n.e,n.f],this.scale=[r,u],this.skew=u?Math.atan2(i,u)*Fa:0}function sr(n,t){return n[0]*t[0]+n[1]*t[1]}function hr(n){var t=Math.sqrt(sr(n,n));return t&&(n[0]/=t,n[1]/=t),t}function gr(n,t,e){return n[0]+=e*t[0],n[1]+=e*t[1],n}function pr(n,t){return t-=n=+n,function(e){return n+t*e}}function dr(n,t){var e,r=[],i=[],u=ua.transform(n),a=ua.transform(t),o=u.translate,c=a.translate,l=u.rotate,f=a.rotate,s=u.skew,h=a.skew,g=u.scale,p=a.scale;return o[0]!=c[0]||o[1]!=c[1]?(r.push("translate(",null,",",null,")"),i.push({i:1,x:pr(o[0],c[0])},{i:3,x:pr(o[1],c[1])})):c[0]||c[1]?r.push("translate("+c+")"):r.push(""),l!=f?(l-f>180?f+=360:f-l>180&&(l+=360),i.push({i:r.push(r.pop()+"rotate(",null,")")-2,x:pr(l,f)})):f&&r.push(r.pop()+"rotate("+f+")"),s!=h?i.push({i:r.push(r.pop()+"skewX(",null,")")-2,x:pr(s,h)}):h&&r.push(r.pop()+"skewX("+h+")"),g[0]!=p[0]||g[1]!=p[1]?(e=r.push(r.pop()+"scale(",null,",",null,")"),i.push({i:e-4,x:pr(g[0],p[0])},{i:e-2,x:pr(g[1],p[1])})):(p[0]!=1||p[1]!=1)&&r.push(r.pop()+"scale("+p+")"),e=i.length,function(n){for(var t,u=-1;++u<e;)r[(t=i[u]).i]=t.x(n);return r.join("")}}function mr(n,t){var e,r={},i={};for(e in n)e in t?r[e]=Mr(e)(n[e],t[e]):i[e]=n[e];for(e in t)e in n||(i[e]=t[e]);return function(n){for(e in r)i[e]=r[e](n);return i}}function vr(n,t){var e,r,i,u,a,o=0,c=0,l=[],f=[];for(n+="",t+="",Oo.lastIndex=0,r=0;e=Oo.exec(t);++r)e.index&&l.push(t.substring(o,c=e.index)),f.push({i:l.length,x:e[0]}),l.push(null),o=Oo.lastIndex;for(o<t.length&&l.push(t.substring(o)),r=0,u=f.length;(e=Oo.exec(n))&&u>r;++r)if(a=f[r],a.x==e[0]){if(a.i)if(l[a.i+1]==null)for(l[a.i-1]+=a.x,l.splice(a.i,1),i=r+1;u>i;++i)f[i].i--;else for(l[a.i-1]+=a.x+l[a.i+1],l.splice(a.i,2),i=r+1;u>i;++i)f[i].i-=2;else if(l[a.i+1]==null)l[a.i]=a.x;else for(l[a.i]=a.x+l[a.i+1],l.splice(a.i+1,1),i=r+1;u>i;++i)f[i].i--;f.splice(r,1),u--,r--}else a.x=pr(parseFloat(e[0]),parseFloat(a.x));for(;u>r;)a=f.pop(),l[a.i+1]==null?l[a.i]=a.x:(l[a.i]=a.x+l[a.i+1],l.splice(a.i+1,1)),u--;return l.length===1?l[0]==null?(a=f[0].x,function(n){return a(n)+""}):function(){return t}:function(n){for(r=0;u>r;++r)l[(a=f[r]).i]=a.x(n);return l.join("")}}function yr(n,t){for(var e,r=ua.interpolators.length;--r>=0&&!(e=ua.interpolators[r](n,t)););return e}function Mr(n){return"transform"==n?dr:yr}function xr(n,t){var e,r=[],i=[],u=n.length,a=t.length,o=Math.min(n.length,t.length);for(e=0;o>e;++e)r.push(yr(n[e],t[e]));for(;u>e;++e)i[e]=n[e];for(;a>e;++e)i[e]=t[e];return function(n){for(e=0;o>e;++e)i[e]=r[e](n);return i}}function br(n){return function(t){return 0>=t?0:t>=1?1:n(t)}}function _r(n){return function(t){return 1-n(1-t)}}function wr(n){return function(t){return.5*(.5>t?n(2*t):2-n(2-2*t))}}function Sr(n){return n*n}function Er(n){return n*n*n}function kr(n){if(0>=n)return 0;if(n>=1)return 1;var t=n*n,e=t*n;return 4*(.5>n?e:3*(n-t)+e-.75)}function Ar(n){return function(t){return Math.pow(t,n)}}function Nr(n){return 1-Math.cos(n*Da/2)}function qr(n){return Math.pow(2,10*(n-1))}function Tr(n){return 1-Math.sqrt(1-n*n)}function Cr(n,t){var e;return arguments.length<2&&(t=.45),arguments.length?e=t/(2*Da)*Math.asin(1/n):(n=1,e=t/4),function(r){return 1+n*Math.pow(2,10*-r)*Math.sin(2*(r-e)*Da/t)}}function zr(n){return n||(n=1.70158),function(t){return t*t*((n+1)*t-n)}}function Dr(n){return 1/2.75>n?7.5625*n*n:2/2.75>n?7.5625*(n-=1.5/2.75)*n+.75:2.5/2.75>n?7.5625*(n-=2.25/2.75)*n+.9375:7.5625*(n-=2.625/2.75)*n+.984375}function jr(n,t){n=ua.hcl(n),t=ua.hcl(t);var e=n.h,r=n.c,i=n.l,u=t.h-e,a=t.c-r,o=t.l-i;return isNaN(a)&&(a=0,r=isNaN(r)?t.c:r),isNaN(u)?(u=0,e=isNaN(e)?t.h:e):u>180?u-=360:-180>u&&(u+=360),function(n){return B(e+u*n,r+a*n,i+o*n)+""}}function Lr(n,t){n=ua.hsl(n),t=ua.hsl(t);var e=n.h,r=n.s,i=n.l,u=t.h-e,a=t.s-r,o=t.l-i;return isNaN(a)&&(a=0,r=isNaN(r)?t.s:r),isNaN(u)?(u=0,e=isNaN(e)?t.h:e):u>180?u-=360:-180>u&&(u+=360),function(n){return P(e+u*n,r+a*n,i+o*n)+""}}function Fr(n,t){n=ua.lab(n),t=ua.lab(t);var e=n.l,r=n.a,i=n.b,u=t.l-e,a=t.a-r,o=t.b-i;return function(n){return G(e+u*n,r+a*n,i+o*n)+""}}function Hr(n,t){return t-=n,function(e){return Math.round(n+t*e)}}function Pr(n,t){return t=t-(n=+n)?1/(t-n):0,function(e){return(e-n)*t}}function Rr(n,t){return t=t-(n=+n)?1/(t-n):0,function(e){return Math.max(0,Math.min(1,(e-n)*t))}}function Or(n){for(var t=n.source,e=n.target,r=Ur(t,e),i=[t];t!==r;)t=t.parent,i.push(t);for(var u=i.length;e!==r;)i.splice(u,0,e),e=e.parent;return i}function Yr(n){for(var t=[],e=n.parent;null!=e;)t.push(n),n=e,e=e.parent;return t.push(n),t}function Ur(n,t){if(n===t)return n;for(var e=Yr(n),r=Yr(t),i=e.pop(),u=r.pop(),a=null;i===u;)a=i,i=e.pop(),u=r.pop();return a}function Ir(n){n.fixed|=2}function Vr(n){n.fixed&=-7}function Xr(n){n.fixed|=4,n.px=n.x,n.py=n.y}function Zr(n){n.fixed&=-5}function Br(n,t,e){var r=0,i=0;if(n.charge=0,!n.leaf)for(var u,a=n.nodes,o=a.length,c=-1;++c<o;)u=a[c],null!=u&&(Br(u,t,e),n.charge+=u.charge,r+=u.charge*u.cx,i+=u.charge*u.cy);if(n.point){n.leaf||(n.point.x+=Math.random()-.5,n.point.y+=Math.random()-.5);var l=t*e[n.point.index];n.charge+=n.pointCharge=l,r+=l*n.point.x,i+=l*n.point.y}n.cx=r/n.charge,n.cy=i/n.charge}function $r(n,t){return ua.rebind(n,t,"sort","children","value"),n.nodes=n,n.links=Wr,n}function Jr(n){return n.children}function Gr(n){return n.value}function Kr(n,t){return t.value-n.value}function Wr(n){return ua.merge(n.map(function(n){return(n.children||[]).map(function(t){return{source:n,target:t}})}))}function Qr(n){return n.x}function ni(n){return n.y}function ti(n,t,e){n.y0=t,n.y=e}function ei(n){return ua.range(n.length)}function ri(n){for(var t=-1,e=n[0].length,r=[];++t<e;)r[t]=0;return r}function ii(n){for(var t,e=1,r=0,i=n[0][1],u=n.length;u>e;++e)(t=n[e][1])>i&&(r=e,i=t);return r}function ui(n){return n.reduce(ai,0)}function ai(n,t){return n+t[1]}function oi(n,t){return ci(n,Math.ceil(Math.log(t.length)/Math.LN2+1))}function ci(n,t){for(var e=-1,r=+n[0],i=(n[1]-r)/t,u=[];++e<=t;)u[e]=i*e+r;return u}function li(n){return[ua.min(n),ua.max(n)]}function fi(n,t){return n.parent==t.parent?1:2}function si(n){var t=n.children;return t&&t.length?t[0]:n._tree.thread}function hi(n){var t,e=n.children;return e&&(t=e.length)?e[t-1]:n._tree.thread}function gi(n,t){var e=n.children;if(e&&(i=e.length))for(var r,i,u=-1;++u<i;)t(r=gi(e[u],t),n)>0&&(n=r);return n}function pi(n,t){return n.x-t.x}function di(n,t){return t.x-n.x}function mi(n,t){return n.depth-t.depth}function vi(n,t){function e(n,r){var i=n.children;if(i&&(a=i.length))for(var u,a,o=null,c=-1;++c<a;)u=i[c],e(u,o),o=u;t(n,r)}e(n,null)}function yi(n){for(var t,e=0,r=0,i=n.children,u=i.length;--u>=0;)t=i[u]._tree,t.prelim+=e,t.mod+=e,e+=t.shift+(r+=t.change)}function Mi(n,t,e){n=n._tree,t=t._tree;var r=e/(t.number-n.number);n.change+=r,t.change-=r,t.shift+=e,t.prelim+=e,t.mod+=e}function xi(n,t,e){return n._tree.ancestor.parent==t.parent?n._tree.ancestor:e}function bi(n,t){return n.value-t.value}function _i(n,t){var e=n._pack_next;n._pack_next=t,t._pack_prev=n,t._pack_next=e,e._pack_prev=t}function wi(n,t){n._pack_next=t,t._pack_prev=n}function Si(n,t){var e=t.x-n.x,r=t.y-n.y,i=n.r+t.r;return i*i-e*e-r*r>.001}function Ei(n){function t(n){f=Math.min(n.x-n.r,f),s=Math.max(n.x+n.r,s),h=Math.min(n.y-n.r,h),g=Math.max(n.y+n.r,g)}if((e=n.children)&&(l=e.length)){var e,r,i,u,a,o,c,l,f=1/0,s=-1/0,h=1/0,g=-1/0;if(e.forEach(ki),r=e[0],r.x=-r.r,r.y=0,t(r),l>1&&(i=e[1],i.x=i.r,i.y=0,t(i),l>2))for(u=e[2],qi(r,i,u),t(u),_i(r,u),r._pack_prev=u,_i(u,i),i=r._pack_next,a=3;l>a;a++){qi(r,i,u=e[a]);var p=0,d=1,m=1;for(o=i._pack_next;o!==i;o=o._pack_next,d++)if(Si(o,u)){p=1;break}if(1==p)for(c=r._pack_prev;c!==o._pack_prev&&!Si(c,u);c=c._pack_prev,m++);p?(m>d||d==m&&i.r<r.r?wi(r,i=o):wi(r=c,i),a--):(_i(r,u),i=u,t(u))}var v=(f+s)/2,y=(h+g)/2,M=0;for(a=0;l>a;a++)u=e[a],u.x-=v,u.y-=y,M=Math.max(M,u.r+Math.sqrt(u.x*u.x+u.y*u.y));n.r=M,e.forEach(Ai)}}function ki(n){n._pack_next=n._pack_prev=n}function Ai(n){delete n._pack_next,delete n._pack_prev}function Ni(n,t,e,r){var i=n.children;if(n.x=t+=r*n.x,n.y=e+=r*n.y,n.r*=r,i)for(var u=-1,a=i.length;++u<a;)Ni(i[u],t,e,r)}function qi(n,t,e){var r=n.r+e.r,i=t.x-n.x,u=t.y-n.y;if(r&&(i||u)){var a=t.r+e.r,o=i*i+u*u;a*=a,r*=r;var c=.5+(r-a)/(2*o),l=Math.sqrt(Math.max(0,2*a*(r+o)-(r-=o)*r-a*a))/(2*o);e.x=n.x+c*i+l*u,e.y=n.y+c*u-l*i}else e.x=n.x+r,e.y=n.y}function Ti(n){return 1+ua.max(n,function(n){return n.y})}function Ci(n){return n.reduce(function(n,t){return n+t.x},0)/n.length}function zi(n){var t=n.children;return t&&t.length?zi(t[0]):n}function Di(n){var t,e=n.children;return e&&(t=e.length)?Di(e[t-1]):n}function ji(n){return{x:n.x,y:n.y,dx:n.dx,dy:n.dy}}function Li(n,t){var e=n.x+t[3],r=n.y+t[0],i=n.dx-t[1]-t[3],u=n.dy-t[0]-t[2];return 0>i&&(e+=i/2,i=0),0>u&&(r+=u/2,u=0),{x:e,y:r,dx:i,dy:u}}function Fi(n){var t=n[0],e=n[n.length-1];return e>t?[t,e]:[e,t]}function Hi(n){return n.rangeExtent?n.rangeExtent():Fi(n.range())}function Pi(n,t,e,r){var i=e(n[0],n[1]),u=r(t[0],t[1]);return function(n){return u(i(n))}}function Ri(n,t){var e,r=0,i=n.length-1,u=n[r],a=n[i];return u>a&&(e=r,r=i,i=e,e=u,u=a,a=e),(t=t(a-u))&&(n[r]=t.floor(u),n[i]=t.ceil(a)),n}function Oi(n,t,e,r){var i=[],u=[],a=0,o=Math.min(n.length,t.length)-1;for(n[o]<n[0]&&(n=n.slice().reverse(),t=t.slice().reverse());++a<=o;)i.push(e(n[a-1],n[a])),u.push(r(t[a-1],t[a]));return function(t){var e=ua.bisect(n,t,1,o)-1;return u[e](i[e](t))}}function Yi(n,t,e,r){function i(){var i=Math.min(n.length,t.length)>2?Oi:Pi,c=r?Rr:Pr;return a=i(n,t,c,e),o=i(t,n,c,yr),u}function u(n){return a(n)}var a,o;return u.invert=function(n){return o(n)},u.domain=function(t){return arguments.length?(n=t.map(Number),i()):n},u.range=function(n){return arguments.length?(t=n,i()):t},u.rangeRound=function(n){return u.range(n).interpolate(Hr)},u.clamp=function(n){return arguments.length?(r=n,i()):r},u.interpolate=function(n){return arguments.length?(e=n,i()):e},u.ticks=function(t){return Xi(n,t)},u.tickFormat=function(t,e){return Zi(n,t,e)},u.nice=function(){return Ri(n,Ii),i()},u.copy=function(){return Yi(n,t,e,r)},i()}function Ui(n,t){return ua.rebind(n,t,"range","rangeRound","interpolate","clamp")}function Ii(n){return n=Math.pow(10,Math.round(Math.log(n)/Math.LN10)-1),n&&{floor:function(t){return Math.floor(t/n)*n},ceil:function(t){return Math.ceil(t/n)*n}}}function Vi(n,t){var e=Fi(n),r=e[1]-e[0],i=Math.pow(10,Math.floor(Math.log(r/t)/Math.LN10)),u=t/r*i;return.15>=u?i*=10:.35>=u?i*=5:.75>=u&&(i*=2),e[0]=Math.ceil(e[0]/i)*i,e[1]=Math.floor(e[1]/i)*i+.5*i,e[2]=i,e}function Xi(n,t){return ua.range.apply(ua,Vi(n,t))}function Zi(n,t,e){var r=-Math.floor(Math.log(Vi(n,t)[2])/Math.LN10+.01);return ua.format(e?e.replace(no,function(n,t,e,i,u,a,o,c,l,f){return[t,e,i,u,a,o,c,l||"."+(r-2*("%"===f)),f].join("")}):",."+r+"f")}function Bi(n,t,e,r,i){function u(t){return n(e(t))}function a(){return e===$i?{floor:o,ceil:c}:{floor:function(n){return-c(-n)},ceil:function(n){return-o(-n)}}}function o(n){return Math.pow(t,Math.floor(Math.log(n)/Math.log(t)))}function c(n){return Math.pow(t,Math.ceil(Math.log(n)/Math.log(t)))}return u.invert=function(t){return r(n.invert(t))},u.domain=function(t){return arguments.length?(t[0]<0?(e=Gi,r=Ki):(e=$i,r=Ji),n.domain((i=t.map(Number)).map(e)),u):i},u.base=function(n){return arguments.length?(t=+n,u):t},u.nice=function(){return n.domain(Ri(i,a).map(e)),u},u.ticks=function(){var i=Fi(n.domain()),u=[];if(i.every(isFinite)){var a=Math.log(t),o=Math.floor(i[0]/a),c=Math.ceil(i[1]/a),l=r(i[0]),f=r(i[1]),s=t%1?2:t;if(e===Gi)for(u.push(-Math.pow(t,-o));o++<c;)for(var h=s-1;h>0;h--)u.push(-Math.pow(t,-o)*h);else{for(;c>o;o++)for(var h=1;s>h;h++)u.push(Math.pow(t,o)*h);u.push(Math.pow(t,o))}for(o=0;u[o]<l;o++);for(c=u.length;u[c-1]>f;c--);u=u.slice(o,c)}return u},u.tickFormat=function(n,i){if(arguments.length<2&&(i=Jo),!arguments.length)return i;var a,o=Math.log(t),c=Math.max(.1,n/u.ticks().length),l=e===Gi?(a=-1e-12,Math.floor):(a=1e-12,Math.ceil);return function(n){return n/r(o*l(e(n)/o+a))<=c?i(n):""}},u.copy=function(){return Bi(n.copy(),t,e,r,i)},Ui(u,n)}function $i(n){return Math.log(0>n?0:n)}function Ji(n){return Math.exp(n)}function Gi(n){return-Math.log(n>0?0:-n)}function Ki(n){return-Math.exp(-n)}function Wi(n,t,e){function r(t){return n(i(t))}var i=Qi(t),u=Qi(1/t);return r.invert=function(t){return u(n.invert(t))},r.domain=function(t){return arguments.length?(n.domain((e=t.map(Number)).map(i)),r):e},r.ticks=function(n){return Xi(e,n)},r.tickFormat=function(n,t){return Zi(e,n,t)},r.nice=function(){return r.domain(Ri(e,Ii))},r.exponent=function(a){return arguments.length?(i=Qi(t=a),u=Qi(1/t),n.domain(e.map(i)),r):t},r.copy=function(){return Wi(n.copy(),t,e)},Ui(r,n)}function Qi(n){return function(t){return 0>t?-Math.pow(-t,n):Math.pow(t,n)}}function nu(n,t){function e(t){return a[((u.get(t)||u.set(t,n.push(t)))-1)%a.length]}function r(t,e){return ua.range(n.length).map(function(n){return t+e*n})}var u,a,o;return e.domain=function(r){if(!arguments.length)return n;n=[],u=new i;for(var a,o=-1,c=r.length;++o<c;)u.has(a=r[o])||u.set(a,n.push(a));return e[t.t].apply(e,t.a)},e.range=function(n){return arguments.length?(a=n,o=0,t={t:"range",a:arguments},e):a},e.rangePoints=function(i,u){arguments.length<2&&(u=0);var c=i[0],l=i[1],f=(l-c)/(Math.max(1,n.length-1)+u);return a=r(n.length<2?(c+l)/2:c+f*u/2,f),o=0,t={t:"rangePoints",a:arguments},e},e.rangeBands=function(i,u,c){arguments.length<2&&(u=0),arguments.length<3&&(c=u);var l=i[1]<i[0],f=i[l-0],s=i[1-l],h=(s-f)/(n.length-u+2*c);return a=r(f+h*c,h),l&&a.reverse(),o=h*(1-u),t={t:"rangeBands",a:arguments},e},e.rangeRoundBands=function(i,u,c){arguments.length<2&&(u=0),arguments.length<3&&(c=u);var l=i[1]<i[0],f=i[l-0],s=i[1-l],h=Math.floor((s-f)/(n.length-u+2*c)),g=s-f-(n.length-u)*h;return a=r(f+Math.round(g/2),h),l&&a.reverse(),o=Math.round(h*(1-u)),t={t:"rangeRoundBands",a:arguments},e},e.rangeBand=function(){return o},e.rangeExtent=function(){return Fi(t.a[0])},e.copy=function(){return nu(n,t)},e.domain(n)}function tu(n,t){function e(){var e=0,u=t.length;for(i=[];++e<u;)i[e-1]=ua.quantile(n,e/u);return r}function r(n){return isNaN(n=+n)?0/0:t[ua.bisect(i,n)]}var i;return r.domain=function(t){return arguments.length?(n=t.filter(function(n){return!isNaN(n)}).sort(ua.ascending),e()):n},r.range=function(n){return arguments.length?(t=n,e()):t},r.quantiles=function(){return i},r.copy=function(){return tu(n,t)},e()}function eu(n,t,e){function r(t){return e[Math.max(0,Math.min(a,Math.floor(u*(t-n))))]}function i(){return u=e.length/(t-n),a=e.length-1,r}var u,a;return r.domain=function(e){return arguments.length?(n=+e[0],t=+e[e.length-1],i()):[n,t]},r.range=function(n){return arguments.length?(e=n,i()):e},r.copy=function(){return eu(n,t,e)},i()}function ru(n,t){function e(e){return t[ua.bisect(n,e)]}return e.domain=function(t){return arguments.length?(n=t,e):n},e.range=function(n){return arguments.length?(t=n,e):t},e.copy=function(){return ru(n,t)},e}function iu(n){function t(n){return+n}return t.invert=t,t.domain=t.range=function(e){return arguments.length?(n=e.map(t),t):n},t.ticks=function(t){return Xi(n,t)},t.tickFormat=function(t,e){return Zi(n,t,e)},t.copy=function(){return iu(n)},t}function uu(n){return n.innerRadius}function au(n){return n.outerRadius}function ou(n){return n.startAngle}function cu(n){return n.endAngle}function lu(n){for(var t,e,r,i=-1,u=n.length;++i<u;)t=n[i],e=t[0],r=t[1]+nc,t[0]=e*Math.cos(r),t[1]=e*Math.sin(r);return n}function fu(n){function t(t){function c(){d.push("M",o(n(v),s),f,l(n(m.reverse()),s),"Z")}for(var h,g,p,d=[],m=[],v=[],y=-1,M=t.length,x=lt(e),b=lt(i),_=e===r?function(){return g}:lt(r),w=i===u?function(){return p}:lt(u);++y<M;)a.call(this,h=t[y],y)?(m.push([g=+x.call(this,h,y),p=+b.call(this,h,y)]),v.push([+_.call(this,h,y),+w.call(this,h,y)])):m.length&&(c(),m=[],v=[]);return m.length&&c(),d.length?d.join(""):null}var e=je,r=je,i=0,u=Le,a=Ht,o=Fe,c=o.key,l=o,f="L",s=.7;return t.x=function(n){return arguments.length?(e=r=n,t):r},t.x0=function(n){return arguments.length?(e=n,t):e},t.x1=function(n){return arguments.length?(r=n,t):r},t.y=function(n){return arguments.length?(i=u=n,t):u},t.y0=function(n){return arguments.length?(i=n,t):i},t.y1=function(n){return arguments.length?(u=n,t):u},t.defined=function(n){return arguments.length?(a=n,t):a},t.interpolate=function(n){return arguments.length?(c="function"==typeof n?o=n:(o=jo.get(n)||Fe).key,l=o.reverse||o,f=o.closed?"M":"L",t):c},t.tension=function(n){return arguments.length?(s=n,t):s},t}function su(n){return n.radius}function hu(n){return[n.x,n.y]}function gu(n){return function(){var t=n.apply(this,arguments),e=t[0],r=t[1]+nc;return[e*Math.cos(r),e*Math.sin(r)]}}function pu(){return 64}function du(){return"circle"}function mu(n){var t=Math.sqrt(n/Da);return"M0,"+t+"A"+t+","+t+" 0 1,1 0,"+-t+"A"+t+","+t+" 0 1,1 0,"+t+"Z"}function vu(n,t){return va(n,ac),n.id=t,n}function yu(n,t,e,r){var i=n.id;return D(n,"function"==typeof e?function(n,u,a){n.__transition__[i].tween.set(t,r(e.call(n,n.__data__,u,a)))}:(e=r(e),function(n){n.__transition__[i].tween.set(t,e)}))}function Mu(n){return null==n&&(n=""),function(){this.textContent=n}}function xu(n,t,e,r){var u=n.__transition__||(n.__transition__={active:0,count:0}),a=u[e];if(!a){var o=r.time;return a=u[e]={tween:new i,event:ua.dispatch("start","end"),time:o,ease:r.ease,delay:r.delay,duration:r.duration},++u.count,ua.timer(function(r){function i(r){return u.active>e?l():(u.active=e,h.start.call(n,f,t),a.tween.forEach(function(e,r){(r=r.call(n,f,t))&&d.push(r)}),c(r)||ua.timer(c,0,o),1)}function c(r){if(u.active!==e)return l();for(var i=(r-g)/p,a=s(i),o=d.length;o>0;)d[--o].call(n,a);return i>=1?(l(),h.end.call(n,f,t),1):void 0}function l(){return--u.count?delete u[e]:delete n.__transition__,1}var f=n.__data__,s=a.ease,h=a.event,g=a.delay,p=a.duration,d=[];return r>=g?i(r):ua.timer(i,g,o),1},0,o),a}}function bu(n,t){n.attr("transform",function(n){return"translate("+t(n)+",0)"})}function _u(n,t){n.attr("transform",function(n){return"translate(0,"+t(n)+")"})}function wu(n,t,e){if(r=[],e&&t.length>1){for(var r,i,u,a=Fi(n.domain()),o=-1,c=t.length,l=(t[1]-t[0])/++e;++o<c;)for(i=e;--i>0;)(u=+t[o]-i*l)>=a[0]&&r.push(u);for(--o,i=0;++i<e&&(u=+t[o]+i*l)<a[1];)r.push(u)}return r}function Su(){this._=new Date(arguments.length>1?Date.UTC.apply(this,arguments):arguments[0])}function Eu(n,t,e){function r(t){var e=n(t),r=u(e,1);return r-t>t-e?e:r}function i(e){return t(e=n(new gc(e-1)),1),e}function u(n,e){return t(n=new gc(+n),e),n}function a(n,r,u){var a=i(n),o=[];if(u>1)for(;r>a;)e(a)%u||o.push(new Date(+a)),t(a,1);else for(;r>a;)o.push(new Date(+a)),t(a,1);return o}function o(n,t,e){try{gc=Su;var r=new Su;return r._=n,a(r,t,e)}finally{gc=Date}}n.floor=n,n.round=r,n.ceil=i,n.offset=u,n.range=a;var c=n.utc=ku(n);return c.floor=c,c.round=ku(r),c.ceil=ku(i),c.offset=ku(u),c.range=o,n}function ku(n){return function(t,e){try{gc=Su;var r=new Su;return r._=t,n(r,e)._}finally{gc=Date}}}function Au(n,t,e,r){for(var i,u,a=0,o=t.length,c=e.length;o>a;){if(r>=c)return-1;if(i=t.charCodeAt(a++),37===i){if(u=Cc[t.charAt(a++)],!u||(r=u(n,e,r))<0)return-1}else if(i!=e.charCodeAt(r++))return-1}return r}function Nu(n){return RegExp("^(?:"+n.map(ua.requote).join("|")+")","i")}function qu(n){for(var t=new i,e=-1,r=n.length;++e<r;)t.set(n[e].toLowerCase(),e);return t}function Tu(n,t,e){n+="";var r=n.length;return e>r?Array(e-r+1).join(t)+n:n}function Cu(n,t,e){Sc.lastIndex=0;var r=Sc.exec(t.substring(e));return r?e+=r[0].length:-1}function zu(n,t,e){wc.lastIndex=0;var r=wc.exec(t.substring(e));return r?e+=r[0].length:-1}function Du(n,t,e){Ac.lastIndex=0;var r=Ac.exec(t.substring(e));return r?(n.m=Nc.get(r[0].toLowerCase()),e+=r[0].length):-1}function ju(n,t,e){Ec.lastIndex=0;var r=Ec.exec(t.substring(e));return r?(n.m=kc.get(r[0].toLowerCase()),e+=r[0].length):-1}function Lu(n,t,e){return Au(n,""+Tc.c,t,e)}function Fu(n,t,e){return Au(n,""+Tc.x,t,e)}function Hu(n,t,e){return Au(n,""+Tc.X,t,e)}function Pu(n,t,e){zc.lastIndex=0;var r=zc.exec(t.substring(e,e+4));return r?(n.y=+r[0],e+=r[0].length):-1}function Ru(n,t,e){zc.lastIndex=0;var r=zc.exec(t.substring(e,e+2));return r?(n.y=Ou(+r[0]),e+=r[0].length):-1}function Ou(n){return n+(n>68?1900:2e3)}function Yu(n,t,e){zc.lastIndex=0;var r=zc.exec(t.substring(e,e+2));return r?(n.m=r[0]-1,e+=r[0].length):-1}function Uu(n,t,e){zc.lastIndex=0;var r=zc.exec(t.substring(e,e+2));return r?(n.d=+r[0],e+=r[0].length):-1}function Iu(n,t,e){zc.lastIndex=0;var r=zc.exec(t.substring(e,e+2));return r?(n.H=+r[0],e+=r[0].length):-1}function Vu(n,t,e){zc.lastIndex=0;var r=zc.exec(t.substring(e,e+2));return r?(n.M=+r[0],e+=r[0].length):-1}function Xu(n,t,e){zc.lastIndex=0;var r=zc.exec(t.substring(e,e+2));return r?(n.S=+r[0],e+=r[0].length):-1}function Zu(n,t,e){zc.lastIndex=0;var r=zc.exec(t.substring(e,e+3));return r?(n.L=+r[0],e+=r[0].length):-1}function Bu(n,t,e){var r=Dc.get(t.substring(e,e+=2).toLowerCase());return null==r?-1:(n.p=r,e)}function $u(n){var t=n.getTimezoneOffset(),e=t>0?"-":"+",r=~~(Math.abs(t)/60),i=Math.abs(t)%60;return e+Tu(r,"0",2)+Tu(i,"0",2)}function Ju(n){return n.toISOString()}function Gu(n,t,e){function r(t){return n(t)}return r.invert=function(t){return Ku(n.invert(t))},r.domain=function(t){return arguments.length?(n.domain(t),r):n.domain().map(Ku)},r.nice=function(n){return r.domain(Ri(r.domain(),function(){return n}))},r.ticks=function(e,i){var u=Fi(r.domain());if("function"!=typeof e){var a=u[1]-u[0],o=a/e,c=ua.bisect(Lc,o);if(c==Lc.length)return t.year(u,e);if(!c)return n.ticks(e).map(Ku);Math.log(o/Lc[c-1])<Math.log(Lc[c]/o)&&--c,e=t[c],i=e[1],e=e[0].range}return e(u[0],new Date(+u[1]+1),i)},r.tickFormat=function(){return e},r.copy=function(){return Gu(n.copy(),t,e)},Ui(r,n)}function Ku(n){return new Date(n)}function Wu(n){return function(t){for(var e=n.length-1,r=n[e];!r[1](t);)r=n[--e];return r[0](t)}}function Qu(n){var t=new Date(n,0,1);return t.setFullYear(n),t}function na(n){var t=n.getFullYear(),e=Qu(t),r=Qu(t+1);return t+(n-e)/(r-e)}function ta(n){var t=new Date(Date.UTC(n,0,1));return t.setUTCFullYear(n),t}function ea(n){var t=n.getUTCFullYear(),e=ta(t),r=ta(t+1);return t+(n-e)/(r-e)}function ra(n){return JSON.parse(n.responseText)}function ia(n){var t=aa.createRange();return t.selectNode(aa.body),t.createContextualFragment(n.responseText)}var ua={version:"3.1.10"};Date.now||(Date.now=function(){return+new Date});var aa=document,oa=window;try{aa.createElement("div").style.setProperty("opacity",0,"")}catch(ca){var la=oa.CSSStyleDeclaration.prototype,fa=la.setProperty;la.setProperty=function(n,t,e){fa.call(this,n,t+"",e)}}ua.ascending=function(n,t){return t>n?-1:n>t?1:n>=t?0:0/0},ua.descending=function(n,t){return n>t?-1:t>n?1:t>=n?0:0/0},ua.min=function(n,t){var e,r,i=-1,u=n.length;if(arguments.length===1){for(;++i<u&&((e=n[i])==null||e!=e);)e=void 0;for(;++i<u;)(r=n[i])!=null&&e>r&&(e=r)}else{for(;++i<u&&((e=t.call(n,n[i],i))==null||e!=e);)e=void 0;for(;++i<u;)(r=t.call(n,n[i],i))!=null&&e>r&&(e=r)}return e},ua.max=function(n,t){var e,r,i=-1,u=n.length;if(arguments.length===1){for(;++i<u&&((e=n[i])==null||e!=e);)e=void 0;for(;++i<u;)(r=n[i])!=null&&r>e&&(e=r)}else{for(;++i<u&&((e=t.call(n,n[i],i))==null||e!=e);)e=void 0;for(;++i<u;)(r=t.call(n,n[i],i))!=null&&r>e&&(e=r)}return e},ua.extent=function(n,t){var e,r,i,u=-1,a=n.length;if(arguments.length===1){for(;++u<a&&((e=i=n[u])==null||e!=e);)e=i=void 0;for(;++u<a;)(r=n[u])!=null&&(e>r&&(e=r),r>i&&(i=r))}else{for(;++u<a&&((e=i=t.call(n,n[u],u))==null||e!=e);)e=void 0;for(;++u<a;)(r=t.call(n,n[u],u))!=null&&(e>r&&(e=r),r>i&&(i=r))}return[e,i]},ua.sum=function(n,t){var e,r=0,i=n.length,u=-1;if(arguments.length===1)for(;++u<i;)isNaN(e=+n[u])||(r+=e);else for(;++u<i;)isNaN(e=+t.call(n,n[u],u))||(r+=e);return r},ua.mean=function(t,e){var r,i=t.length,u=0,a=-1,o=0;if(arguments.length===1)for(;++a<i;)n(r=t[a])&&(u+=(r-u)/++o);else for(;++a<i;)n(r=e.call(t,t[a],a))&&(u+=(r-u)/++o);return o?u:void 0},ua.quantile=function(n,t){var e=(n.length-1)*t+1,r=Math.floor(e),i=+n[r-1],u=e-r;return u?i+u*(n[r]-i):i},ua.median=function(t,e){return arguments.length>1&&(t=t.map(e)),t=t.filter(n),t.length?ua.quantile(t.sort(ua.ascending),.5):void 0},ua.bisector=function(n){return{left:function(t,e,r,i){for(arguments.length<3&&(r=0),arguments.length<4&&(i=t.length);i>r;){var u=r+i>>>1;n.call(t,t[u],u)<e?r=u+1:i=u}return r},right:function(t,e,r,i){for(arguments.length<3&&(r=0),arguments.length<4&&(i=t.length);i>r;){var u=r+i>>>1;e<n.call(t,t[u],u)?i=u:r=u+1}return r}}};var sa=ua.bisector(function(n){return n});ua.bisectLeft=sa.left,ua.bisect=ua.bisectRight=sa.right,ua.shuffle=function(n){for(var t,e,r=n.length;r;)e=Math.random()*r--|0,t=n[r],n[r]=n[e],n[e]=t;return n},ua.permute=function(n,t){for(var e=[],r=-1,i=t.length;++r<i;)e[r]=n[t[r]];return e},ua.zip=function(){if(!(i=arguments.length))return[];for(var n=-1,e=ua.min(arguments,t),r=Array(e);++n<e;)for(var i,u=-1,a=r[n]=Array(i);++u<i;)a[u]=arguments[u][n];return r},ua.transpose=function(n){return ua.zip.apply(ua,n)},ua.keys=function(n){var t=[];for(var e in n)t.push(e);return t},ua.values=function(n){var t=[];for(var e in n)t.push(n[e]);return t},ua.entries=function(n){var t=[];for(var e in n)t.push({key:e,value:n[e]});return t},ua.merge=function(n){return Array.prototype.concat.apply([],n)},ua.range=function(n,t,r){if(arguments.length<3&&(r=1,arguments.length<2&&(t=n,n=0)),1/0===(t-n)/r)throw Error("infinite range");var i,u=[],a=e(Math.abs(r)),o=-1;if(n*=a,t*=a,r*=a,0>r)for(;(i=n+r*++o)>t;)u.push(i/a);else for(;(i=n+r*++o)<t;)u.push(i/a);return u},ua.map=function(n){var t=new i;for(var e in n)t.set(e,n[e]);return t},r(i,{has:function(n){return ha+n in this},get:function(n){return this[ha+n]},set:function(n,t){return this[ha+n]=t},remove:function(n){return n=ha+n,n in this&&delete this[n]},keys:function(){var n=[];return this.forEach(function(t){n.push(t)}),n},values:function(){var n=[];return this.forEach(function(t,e){n.push(e)}),n},entries:function(){var n=[];return this.forEach(function(t,e){n.push({key:t,value:e})}),n},forEach:function(n){for(var t in this)t.charCodeAt(0)===ga&&n.call(this,t.substring(1),this[t])}});var ha="\0",ga=ha.charCodeAt(0);ua.nest=function(){function n(t,o,c){if(c>=a.length)return r?r.call(u,o):e?o.sort(e):o;for(var l,f,s,h,g=-1,p=o.length,d=a[c++],m=new i;++g<p;)(h=m.get(l=d(f=o[g])))?h.push(f):m.set(l,[f]);return t?(f=t(),s=function(e,r){f.set(e,n(t,r,c))}):(f={},s=function(e,r){f[e]=n(t,r,c)}),m.forEach(s),f}function t(n,e){if(e>=a.length)return n;var r=[],i=o[e++];return n.forEach(function(n,i){r.push({key:n,values:t(i,e)})}),i?r.sort(function(n,t){return i(n.key,t.key)}):r}var e,r,u={},a=[],o=[];return u.map=function(t,e){return n(e,t,0)},u.entries=function(e){return t(n(ua.map,e,0),0)},u.key=function(n){return a.push(n),u},u.sortKeys=function(n){return o[a.length-1]=n,u},u.sortValues=function(n){return e=n,u},u.rollup=function(n){return r=n,u},u},ua.set=function(n){var t=new u;if(n)for(var e=0;e<n.length;e++)t.add(n[e]);return t},r(u,{has:function(n){return ha+n in this
},add:function(n){return this[ha+n]=!0,n},remove:function(n){return n=ha+n,n in this&&delete this[n]},values:function(){var n=[];return this.forEach(function(t){n.push(t)}),n},forEach:function(n){for(var t in this)t.charCodeAt(0)===ga&&n.call(this,t.substring(1))}}),ua.behavior={},ua.rebind=function(n,t){for(var e,r=1,i=arguments.length;++r<i;)n[e=arguments[r]]=a(n,t,t[e]);return n},ua.dispatch=function(){for(var n=new o,t=-1,e=arguments.length;++t<e;)n[arguments[t]]=c(n);return n},o.prototype.on=function(n,t){var e=n.indexOf("."),r="";if(e>=0&&(r=n.substring(e+1),n=n.substring(0,e)),n)return arguments.length<2?this[n].on(r):this[n].on(r,t);if(arguments.length===2){if(null==t)for(n in this)this.hasOwnProperty(n)&&this[n].on(r,null);return this}},ua.event=null,ua.mouse=function(n){return g(n,f())};var pa=/WebKit/.test(oa.navigator.userAgent)?-1:0,da=d;try{da(aa.documentElement.childNodes)[0].nodeType}catch(ma){da=p}var va=[].__proto__?function(n,t){n.__proto__=t}:function(n,t){for(var e in t)n[e]=t[e]};ua.touches=function(n,t){return arguments.length<2&&(t=f().touches),t?da(t).map(function(t){var e=g(n,t);return e.identifier=t.identifier,e}):[]},ua.behavior.drag=function(){function n(){this.on("mousedown.drag",t).on("touchstart.drag",t)}function t(){function n(){var n=a.parentNode;return null!=f?ua.touches(n).filter(function(n){return n.identifier===f})[0]:ua.mouse(n)}function t(){if(!a.parentNode)return i();var t=n(),e=t[0]-h[0],r=t[1]-h[1];g|=e|r,h=t,l(),o({type:"drag",x:t[0]+u[0],y:t[1]+u[1],dx:e,dy:r})}function i(){o({type:"dragend"}),g&&(l(),ua.event.target===c&&s(p,"click")),p.on(null!=f?"touchmove.drag-"+f:"mousemove.drag",null).on(null!=f?"touchend.drag-"+f:"mouseup.drag",null)}var u,a=this,o=e.of(a,arguments),c=ua.event.target,f=ua.event.touches?ua.event.changedTouches[0].identifier:null,h=n(),g=0,p=ua.select(oa).on(null!=f?"touchmove.drag-"+f:"mousemove.drag",t).on(null!=f?"touchend.drag-"+f:"mouseup.drag",i,!0);r?(u=r.apply(a,arguments),u=[u.x-h[0],u.y-h[1]]):u=[0,0],null==f&&l(),o({type:"dragstart"})}var e=h(n,"drag","dragstart","dragend"),r=null;return n.origin=function(t){return arguments.length?(r=t,n):r},ua.rebind(n,e,"on")};var ya=function(n,t){return t.querySelector(n)},Ma=function(n,t){return t.querySelectorAll(n)},xa=aa.documentElement,ba=xa.matchesSelector||xa.webkitMatchesSelector||xa.mozMatchesSelector||xa.msMatchesSelector||xa.oMatchesSelector,_a=function(n,t){return ba.call(n,t)};"function"==typeof Sizzle&&(ya=function(n,t){return Sizzle(n,t)[0]||null},Ma=function(n,t){return Sizzle.uniqueSort(Sizzle(n,t))},_a=Sizzle.matchesSelector),ua.selection=function(){return Na};var wa=ua.selection.prototype=[];wa.select=function(n){var t,e,r,i,u=[];"function"!=typeof n&&(n=v(n));for(var a=-1,o=this.length;++a<o;){u.push(t=[]),t.parentNode=(r=this[a]).parentNode;for(var c=-1,l=r.length;++c<l;)(i=r[c])?(t.push(e=n.call(i,i.__data__,c)),e&&"__data__"in i&&(e.__data__=i.__data__)):t.push(null)}return m(u)},wa.selectAll=function(n){var t,e,r=[];"function"!=typeof n&&(n=y(n));for(var i=-1,u=this.length;++i<u;)for(var a=this[i],o=-1,c=a.length;++o<c;)(e=a[o])&&(r.push(t=da(n.call(e,e.__data__,o))),t.parentNode=e);return m(r)};var Sa={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};ua.ns={prefix:Sa,qualify:function(n){var t=n.indexOf(":"),e=n;return t>=0&&(e=n.substring(0,t),n=n.substring(t+1)),Sa.hasOwnProperty(e)?{space:Sa[e],local:n}:n}},wa.attr=function(n,t){if(arguments.length<2){if("string"==typeof n){var e=this.node();return n=ua.ns.qualify(n),n.local?e.getAttributeNS(n.space,n.local):e.getAttribute(n)}for(t in n)this.each(M(t,n[t]));return this}return this.each(M(n,t))},ua.requote=function(n){return n.replace(Ea,"\\$&")};var Ea=/[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;wa.classed=function(n,t){if(arguments.length<2){if("string"==typeof n){var e=this.node(),r=(n=n.trim().split(/^|\s+/g)).length,i=-1;if(t=e.classList){for(;++i<r;)if(!t.contains(n[i]))return!1}else for(t=e.getAttribute("class");++i<r;)if(!b(n[i]).test(t))return!1;return!0}for(t in n)this.each(_(t,n[t]));return this}return this.each(_(n,t))},wa.style=function(n,t,e){var r=arguments.length;if(3>r){if("string"!=typeof n){2>r&&(t="");for(e in n)this.each(S(e,n[e],t));return this}if(2>r)return oa.getComputedStyle(this.node(),null).getPropertyValue(n);e=""}return this.each(S(n,t,e))},wa.property=function(n,t){if(arguments.length<2){if("string"==typeof n)return this.node()[n];for(t in n)this.each(E(t,n[t]));return this}return this.each(E(n,t))},wa.text=function(n){return arguments.length?this.each("function"==typeof n?function(){var t=n.apply(this,arguments);this.textContent=null==t?"":t}:null==n?function(){this.textContent=""}:function(){this.textContent=n}):this.node().textContent},wa.html=function(n){return arguments.length?this.each("function"==typeof n?function(){var t=n.apply(this,arguments);this.innerHTML=null==t?"":t}:null==n?function(){this.innerHTML=""}:function(){this.innerHTML=n}):this.node().innerHTML},wa.append=function(n){function t(){return this.appendChild(aa.createElementNS(this.namespaceURI,n))}function e(){return this.appendChild(aa.createElementNS(n.space,n.local))}return n=ua.ns.qualify(n),this.select(n.local?e:t)},wa.insert=function(n,t){function e(e,r){return this.insertBefore(aa.createElementNS(this.namespaceURI,n),t.call(this,e,r))}function r(e,r){return this.insertBefore(aa.createElementNS(n.space,n.local),t.call(this,e,r))}return n=ua.ns.qualify(n),"function"!=typeof t&&(t=v(t)),this.select(n.local?r:e)},wa.remove=function(){return this.each(function(){var n=this.parentNode;n&&n.removeChild(this)})},wa.data=function(n,t){function e(n,e){var r,u,a,o=n.length,s=e.length,h=Math.min(o,s),g=Array(s),p=Array(s),d=Array(o);if(t){var m,v=new i,y=new i,M=[];for(r=-1;++r<o;)m=t.call(u=n[r],u.__data__,r),v.has(m)?d[r]=u:v.set(m,u),M.push(m);for(r=-1;++r<s;)m=t.call(e,a=e[r],r),(u=v.get(m))?(g[r]=u,u.__data__=a):y.has(m)||(p[r]=k(a)),y.set(m,a),v.remove(m);for(r=-1;++r<o;)v.has(M[r])&&(d[r]=n[r])}else{for(r=-1;++r<h;)u=n[r],a=e[r],u?(u.__data__=a,g[r]=u):p[r]=k(a);for(;s>r;++r)p[r]=k(e[r]);for(;o>r;++r)d[r]=n[r]}p.update=g,p.parentNode=g.parentNode=d.parentNode=n.parentNode,c.push(p),l.push(g),f.push(d)}var r,u,a=-1,o=this.length;if(!arguments.length){for(n=Array(o=(r=this[0]).length);++a<o;)(u=r[a])&&(n[a]=u.__data__);return n}var c=j([]),l=m([]),f=m([]);if("function"==typeof n)for(;++a<o;)e(r=this[a],n.call(r,r.parentNode.__data__,a));else for(;++a<o;)e(r=this[a],n);return l.enter=function(){return c},l.exit=function(){return f},l},wa.datum=function(n){return arguments.length?this.property("__data__",n):this.property("__data__")},wa.filter=function(n){var t,e,r,i=[];"function"!=typeof n&&(n=A(n));for(var u=0,a=this.length;a>u;u++){i.push(t=[]),t.parentNode=(e=this[u]).parentNode;for(var o=0,c=e.length;c>o;o++)(r=e[o])&&n.call(r,r.__data__,o)&&t.push(r)}return m(i)},wa.order=function(){for(var n=-1,t=this.length;++n<t;)for(var e,r=this[n],i=r.length-1,u=r[i];--i>=0;)(e=r[i])&&(u&&u!==e.nextSibling&&u.parentNode.insertBefore(e,u),u=e);return this},wa.sort=function(n){n=N.apply(this,arguments);for(var t=-1,e=this.length;++t<e;)this[t].sort(n);return this.order()},wa.on=function(n,t,e){var r=arguments.length;if(3>r){if("string"!=typeof n){2>r&&(t=!1);for(e in n)this.each(T(e,n[e],t));return this}if(2>r)return(r=this.node()["__on"+n])&&r._;e=!1}return this.each(T(n,t,e))};var ka=ua.map({mouseenter:"mouseover",mouseleave:"mouseout"});ka.forEach(function(n){"on"+n in aa&&ka.remove(n)}),wa.each=function(n){return D(this,function(t,e,r){n.call(t,t.__data__,e,r)})},wa.call=function(n){var t=da(arguments);return n.apply(t[0]=this,t),this},wa.empty=function(){return!this.node()},wa.node=function(){for(var n=0,t=this.length;t>n;n++)for(var e=this[n],r=0,i=e.length;i>r;r++){var u=e[r];if(u)return u}return null};var Aa=[];ua.selection.enter=j,ua.selection.enter.prototype=Aa,Aa.append=wa.append,Aa.insert=wa.insert,Aa.empty=wa.empty,Aa.node=wa.node,Aa.select=function(n){for(var t,e,r,i,u,a=[],o=-1,c=this.length;++o<c;){r=(i=this[o]).update,a.push(t=[]),t.parentNode=i.parentNode;for(var l=-1,f=i.length;++l<f;)(u=i[l])?(t.push(r[l]=e=n.call(i.parentNode,u.__data__,l)),e.__data__=u.__data__):t.push(null)}return m(a)},wa.transition=function(){var n,t,e=rc||++oc,r=[],i=Object.create(cc);i.time=Date.now();for(var u=-1,a=this.length;++u<a;){r.push(n=[]);for(var o=this[u],c=-1,l=o.length;++c<l;)(t=o[c])&&xu(t,c,e,i),n.push(t)}return vu(r,e)},ua.select=function(n){var t=["string"==typeof n?ya(n,aa):n];return t.parentNode=xa,m([t])},ua.selectAll=function(n){var t=da("string"==typeof n?Ma(n,aa):n);return t.parentNode=xa,m([t])};var Na=ua.select(xa);ua.behavior.zoom=function(){function n(){this.on("mousedown.zoom",o).on("mousemove.zoom",f).on(Ca+".zoom",c).on("dblclick.zoom",g).on("touchstart.zoom",p).on("touchmove.zoom",d).on("touchend.zoom",p)}function t(n){return[(n[0]-w[0])/S,(n[1]-w[1])/S]}function e(n){return[n[0]*S+w[0],n[1]*S+w[1]]}function r(n){S=Math.max(E[0],Math.min(E[1],n))}function i(n,t){t=e(t),w[0]+=n[0]-t[0],w[1]+=n[1]-t[1]}function u(){M&&M.domain(y.range().map(function(n){return(n-w[0])/S}).map(y.invert)),b&&b.domain(x.range().map(function(n){return(n-w[1])/S}).map(x.invert))}function a(n){u(),ua.event.preventDefault(),n({type:"zoom",scale:S,translate:w})}function o(){function n(){c=1,i(ua.mouse(r),h),a(u)}function e(){c&&l(),f.on("mousemove.zoom",null).on("mouseup.zoom",null),c&&ua.event.target===o&&s(f,"click.zoom")}var r=this,u=k.of(r,arguments),o=ua.event.target,c=0,f=ua.select(oa).on("mousemove.zoom",n).on("mouseup.zoom",e),h=t(ua.mouse(r));oa.focus(),l()}function c(){m||(m=t(ua.mouse(this))),r(Math.pow(2,qa()*.002)*S),i(ua.mouse(this),m),a(k.of(this,arguments))}function f(){m=null}function g(){var n=ua.mouse(this),e=t(n),u=Math.log(S)/Math.LN2;r(Math.pow(2,ua.event.shiftKey?Math.ceil(u)-1:Math.floor(u)+1)),i(n,e),a(k.of(this,arguments))}function p(){var n=ua.touches(this),e=Date.now();if(v=S,m={},n.forEach(function(n){m[n.identifier]=t(n)}),l(),n.length===1){if(500>e-_){var u=n[0],o=t(n[0]);r(2*S),i(u,o),a(k.of(this,arguments))}_=e}}function d(){var n=ua.touches(this),t=n[0],e=m[t.identifier];if(u=n[1]){var u,o=m[u.identifier];t=[(t[0]+u[0])/2,(t[1]+u[1])/2],e=[(e[0]+o[0])/2,(e[1]+o[1])/2],r(ua.event.scale*v)}i(t,e),_=null,a(k.of(this,arguments))}var m,v,y,M,x,b,_,w=[0,0],S=1,E=Ta,k=h(n,"zoom");return n.translate=function(t){return arguments.length?(w=t.map(Number),u(),n):w},n.scale=function(t){return arguments.length?(S=+t,u(),n):S},n.scaleExtent=function(t){return arguments.length?(E=null==t?Ta:t.map(Number),n):E},n.x=function(t){return arguments.length?(M=t,y=t.copy(),w=[0,0],S=1,n):M},n.y=function(t){return arguments.length?(b=t,x=t.copy(),w=[0,0],S=1,n):b},ua.rebind(n,k,"on")};var qa,Ta=[0,1/0],Ca="onwheel"in aa?(qa=function(){return-ua.event.deltaY*(ua.event.deltaMode?120:1)},"wheel"):"onmousewheel"in aa?(qa=function(){return ua.event.wheelDelta},"mousewheel"):(qa=function(){return-ua.event.detail},"MozMousePixelScroll");L.prototype.toString=function(){return this.rgb()+""},ua.hsl=function(n,t,e){return arguments.length===1?n instanceof H?F(n.h,n.s,n.l):it(""+n,ut,F):F(+n,+t,+e)};var za=H.prototype=new L;za.brighter=function(n){return n=Math.pow(.7,arguments.length?n:1),F(this.h,this.s,this.l/n)},za.darker=function(n){return n=Math.pow(.7,arguments.length?n:1),F(this.h,this.s,n*this.l)},za.rgb=function(){return P(this.h,this.s,this.l)};var Da=Math.PI,ja=1e-6,La=Da/180,Fa=180/Da;ua.hcl=function(n,t,e){return arguments.length===1?n instanceof Z?X(n.h,n.c,n.l):n instanceof J?K(n.l,n.a,n.b):K((n=at((n=ua.rgb(n)).r,n.g,n.b)).l,n.a,n.b):X(+n,+t,+e)};var Ha=Z.prototype=new L;Ha.brighter=function(n){return X(this.h,this.c,Math.min(100,this.l+Pa*(arguments.length?n:1)))},Ha.darker=function(n){return X(this.h,this.c,Math.max(0,this.l-Pa*(arguments.length?n:1)))},Ha.rgb=function(){return B(this.h,this.c,this.l).rgb()},ua.lab=function(n,t,e){return arguments.length===1?n instanceof J?$(n.l,n.a,n.b):n instanceof Z?B(n.l,n.c,n.h):at((n=ua.rgb(n)).r,n.g,n.b):$(+n,+t,+e)};var Pa=18,Ra=.95047,Oa=1,Ya=1.08883,Ua=J.prototype=new L;Ua.brighter=function(n){return $(Math.min(100,this.l+Pa*(arguments.length?n:1)),this.a,this.b)},Ua.darker=function(n){return $(Math.max(0,this.l-Pa*(arguments.length?n:1)),this.a,this.b)},Ua.rgb=function(){return G(this.l,this.a,this.b)},ua.rgb=function(n,t,e){return arguments.length===1?n instanceof et?tt(n.r,n.g,n.b):it(""+n,tt,P):tt(~~n,~~t,~~e)};var Ia=et.prototype=new L;Ia.brighter=function(n){n=Math.pow(.7,arguments.length?n:1);var t=this.r,e=this.g,r=this.b,i=30;return t||e||r?(t&&i>t&&(t=i),e&&i>e&&(e=i),r&&i>r&&(r=i),tt(Math.min(255,Math.floor(t/n)),Math.min(255,Math.floor(e/n)),Math.min(255,Math.floor(r/n)))):tt(i,i,i)},Ia.darker=function(n){return n=Math.pow(.7,arguments.length?n:1),tt(Math.floor(n*this.r),Math.floor(n*this.g),Math.floor(n*this.b))},Ia.hsl=function(){return ut(this.r,this.g,this.b)},Ia.toString=function(){return"#"+rt(this.r)+rt(this.g)+rt(this.b)};var Va=ua.map({aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",gold:"#ffd700",goldenrod:"#daa520",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavender:"#e6e6fa",lavenderblush:"#fff0f5",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"});Va.forEach(function(n,t){Va.set(n,it(t,tt,P))}),ua.functor=lt,ua.xhr=st(ft),ua.csv=pt(",","text/csv"),ua.tsv=pt("	","text/tab-separated-values");var Xa,Za,Ba,$a;ua.timer=function(n,t,e){if(arguments.length<3){if(arguments.length<2)t=0;else if(!isFinite(t))return;e=Date.now()}var r=e+t,i={callback:n,time:r,next:null};Za?Za.next=i:Xa=i,Za=i,Ba||($a=clearTimeout($a),Ba=1,Ja(dt))},ua.timer.flush=function(){mt(),vt()};var Ja=oa.requestAnimationFrame||oa.webkitRequestAnimationFrame||oa.mozRequestAnimationFrame||oa.oRequestAnimationFrame||oa.msRequestAnimationFrame||function(n){setTimeout(n,17)},Ga=".",Ka=",",Wa=[3,3],Qa=["y","z","a","f","p","n","Âµ","m","","k","M","G","T","P","E","Z","Y"].map(yt);ua.formatPrefix=function(n,t){var e=0;return n&&(0>n&&(n*=-1),t&&(n=ua.round(n,Mt(n,t))),e=1+Math.floor(1e-12+Math.log(n)/Math.LN10),e=Math.max(-24,Math.min(24,Math.floor((0>=e?e+1:e-1)/3)*3))),Qa[8+e/3]},ua.round=function(n,t){return t?Math.round(n*(t=Math.pow(10,t)))/t:Math.round(n)},ua.format=function(n){var t=no.exec(n),e=t[1]||" ",r=t[2]||">",i=t[3]||"",u=t[4]||"",a=t[5],o=+t[6],c=t[7],l=t[8],f=t[9],s=1,h="",g=!1;switch(l&&(l=+l.substring(1)),(a||"0"===e&&"="===r)&&(a=e="0",r="=",c&&(o-=Math.floor((o-1)/4))),f){case"n":c=!0,f="g";break;case"%":s=100,h="%",f="f";break;case"p":s=100,h="%",f="r";break;case"b":case"o":case"x":case"X":u&&(u="0"+f.toLowerCase());case"c":case"d":g=!0,l=0;break;case"s":s=-1,f="r"}"#"===u&&(u=""),"r"!=f||l||(f="g"),null!=l&&("g"==f?l=Math.max(1,Math.min(21,l)):("e"==f||"f"==f)&&(l=Math.max(0,Math.min(20,l)))),f=to.get(f)||xt;var p=a&&c;return function(n){if(g&&n%1)return"";var t=0>n||0===n&&0>1/n?(n=-n,"-"):i;if(0>s){var d=ua.formatPrefix(n,l);n=d.scale(n),h=d.symbol}else n*=s;n=f(n,l),!a&&c&&(n=eo(n));var m=u.length+n.length+(p?0:t.length),v=o>m?Array(m=o-m+1).join(e):"";return p&&(n=eo(v+n)),Ga&&n.replace(".",Ga),t+=u,("<"===r?t+n+v:">"===r?v+t+n:"^"===r?v.substring(0,m>>=1)+t+n+v.substring(m):t+(p?n:v+n))+h}};var no=/(?:([^{])?([<>=^]))?([+\- ])?(#)?(0)?(\d+)?(,)?(\.-?\d+)?([a-z%])?/i,to=ua.map({b:function(n){return n.toString(2)},c:function(n){return String.fromCharCode(n)},o:function(n){return n.toString(8)},x:function(n){return n.toString(16)},X:function(n){return n.toString(16).toUpperCase()},g:function(n,t){return n.toPrecision(t)},e:function(n,t){return n.toExponential(t)},f:function(n,t){return n.toFixed(t)},r:function(n,t){return(n=ua.round(n,Mt(n,t))).toFixed(Math.max(0,Math.min(20,Mt(n*(1+1e-15),t))))}}),eo=ft;if(Wa){var ro=Wa.length;eo=function(n){for(var t=n.lastIndexOf("."),e=t>=0?"."+n.substring(t+1):(t=n.length,""),r=[],i=0,u=Wa[0];t>0&&u>0;)r.push(n.substring(t-=u,t+u)),u=Wa[i=(i+1)%ro];return r.reverse().join(Ka||"")+e}}ua.geo={},ua.geo.stream=function(n,t){n&&io.hasOwnProperty(n.type)?io[n.type](n,t):bt(n,t)};var io={Feature:function(n,t){bt(n.geometry,t)},FeatureCollection:function(n,t){for(var e=n.features,r=-1,i=e.length;++r<i;)bt(e[r].geometry,t)}},uo={Sphere:function(n,t){t.sphere()},Point:function(n,t){var e=n.coordinates;t.point(e[0],e[1])},MultiPoint:function(n,t){for(var e,r=n.coordinates,i=-1,u=r.length;++i<u;)e=r[i],t.point(e[0],e[1])},LineString:function(n,t){_t(n.coordinates,t,0)},MultiLineString:function(n,t){for(var e=n.coordinates,r=-1,i=e.length;++r<i;)_t(e[r],t,0)},Polygon:function(n,t){wt(n.coordinates,t)},MultiPolygon:function(n,t){for(var e=n.coordinates,r=-1,i=e.length;++r<i;)wt(e[r],t)},GeometryCollection:function(n,t){for(var e=n.geometries,r=-1,i=e.length;++r<i;)bt(e[r],t)}};ua.geo.area=function(n){return ao=0,ua.geo.stream(n,co),ao};var ao,oo,co={sphere:function(){ao+=4*Da},point:q,lineStart:q,lineEnd:q,polygonStart:function(){oo=0,co.lineStart=St},polygonEnd:function(){var n=2*oo;ao+=0>n?4*Da+n:n,co.lineStart=co.lineEnd=co.point=q}};ua.geo.bounds=function(){function n(n,t){M.push(x=[f=n,h=n]),s>t&&(s=t),t>g&&(g=t)}function t(t,e){var r=Et([t*La,e*La]);if(v){var i=At(v,r),u=[i[1],-i[0],0],a=At(u,i);Tt(a),a=Ct(a);var c=t-p,l=c>0?1:-1,d=a[0]*Fa*l,m=Math.abs(c)>180;if(m^(d>l*p&&l*t>d)){var y=a[1]*Fa;y>g&&(g=y)}else if(d=(d+360)%360-180,m^(d>l*p&&l*t>d)){var y=-a[1]*Fa;s>y&&(s=y)}else s>e&&(s=e),e>g&&(g=e);m?p>t?o(f,t)>o(f,h)&&(h=t):o(t,h)>o(f,h)&&(f=t):h>=f?(f>t&&(f=t),t>h&&(h=t)):t>p?o(f,t)>o(f,h)&&(h=t):o(t,h)>o(f,h)&&(f=t)}else n(t,e);v=r,p=t}function e(){b.point=t}function r(){x[0]=f,x[1]=h,b.point=n,v=null}function i(n,e){if(v){var r=n-p;y+=Math.abs(r)>180?r+(r>0?360:-360):r}else d=n,m=e;co.point(n,e),t(n,e)}function u(){co.lineStart()}function a(){i(d,m),co.lineEnd(),Math.abs(y)>ja&&(f=-(h=180)),x[0]=f,x[1]=h,v=null}function o(n,t){return(t-=n)<0?t+360:t}function c(n,t){return n[0]-t[0]}function l(n,t){return t[0]<=t[1]?t[0]<=n&&n<=t[1]:n<t[0]||t[1]<n}var f,s,h,g,p,d,m,v,y,M,x,b={point:n,lineStart:e,lineEnd:r,polygonStart:function(){b.point=i,b.lineStart=u,b.lineEnd=a,y=0,co.polygonStart()},polygonEnd:function(){co.polygonEnd(),b.point=n,b.lineStart=e,b.lineEnd=r,0>oo?(f=-(h=180),s=-(g=90)):y>ja?g=90:-ja>y&&(s=-90),x[0]=f,x[1]=h}};return function(n){g=h=-(f=s=1/0),M=[],ua.geo.stream(n,b),M.sort(c);for(var t,e=1,r=M.length,i=M[0],u=[i];r>e;++e)t=M[e],l(t[0],i)||l(t[1],i)?(o(i[0],t[1])>o(i[0],i[1])&&(i[1]=t[1]),o(t[0],i[1])>o(i[0],i[1])&&(i[0]=t[0])):u.push(i=t);for(var a,t,p=-1/0,r=u.length-1,e=0,i=u[r];r>=e;i=t,++e)t=u[e],(a=o(i[1],t[0]))>p&&(p=a,f=t[0],h=i[1]);return M=x=null,[[f,s],[h,g]]}}(),ua.geo.centroid=function(n){lo=fo=so=ho=go=0,ua.geo.stream(n,po);var t;return fo&&Math.abs(t=Math.sqrt(so*so+ho*ho+go*go))>ja?[Math.atan2(ho,so)*Fa,Math.asin(Math.max(-1,Math.min(1,go/t)))*Fa]:void 0};var lo,fo,so,ho,go,po={sphere:function(){2>lo&&(lo=2,fo=so=ho=go=0)},point:Dt,lineStart:Lt,lineEnd:Ft,polygonStart:function(){2>lo&&(lo=2,fo=so=ho=go=0),po.lineStart=jt},polygonEnd:function(){po.lineStart=Lt}},mo=Ot(Ht,Xt,Bt),vo=1e9;ua.geo.projection=Qt,ua.geo.projectionMutator=ne,(ua.geo.equirectangular=function(){return Qt(ee)}).raw=ee.invert=ee,ua.geo.rotation=function(n){function t(t){return t=n(t[0]*La,t[1]*La),t[0]*=Fa,t[1]*=Fa,t}return n=re(n[0]%360*La,n[1]*La,n.length>2?n[2]*La:0),t.invert=function(t){return t=n.invert(t[0]*La,t[1]*La),t[0]*=Fa,t[1]*=Fa,t},t},ua.geo.circle=function(){function n(){var n="function"==typeof r?r.apply(this,arguments):r,t=re(-n[0]*La,-n[1]*La,0).invert,i=[];return e(null,null,1,{point:function(n,e){i.push(n=t(n,e)),n[0]*=Fa,n[1]*=Fa}}),{type:"Polygon",coordinates:[i]}}var t,e,r=[0,0],i=6;return n.origin=function(t){return arguments.length?(r=t,n):r},n.angle=function(r){return arguments.length?(e=oe((t=+r)*La,i*La),n):t},n.precision=function(r){return arguments.length?(e=oe(t*La,(i=+r)*La),n):i},n.angle(90)},ua.geo.distance=function(n,t){var e,r=(t[0]-n[0])*La,i=n[1]*La,u=t[1]*La,a=Math.sin(r),o=Math.cos(r),c=Math.sin(i),l=Math.cos(i),f=Math.sin(u),s=Math.cos(u);return Math.atan2(Math.sqrt((e=s*a)*e+(e=l*f-c*s*o)*e),c*f+l*s*o)},ua.geo.graticule=function(){function n(){return{type:"MultiLineString",coordinates:t()}}function t(){return ua.range(Math.ceil(u/m)*m,i,m).map(h).concat(ua.range(Math.ceil(l/v)*v,c,v).map(g)).concat(ua.range(Math.ceil(r/p)*p,e,p).filter(function(n){return Math.abs(n%m)>ja}).map(f)).concat(ua.range(Math.ceil(o/d)*d,a,d).filter(function(n){return Math.abs(n%v)>ja}).map(s))}var e,r,i,u,a,o,c,l,f,s,h,g,p=10,d=p,m=90,v=360,y=2.5;return n.lines=function(){return t().map(function(n){return{type:"LineString",coordinates:n}})},n.outline=function(){return{type:"Polygon",coordinates:[h(u).concat(g(c).slice(1),h(i).reverse().slice(1),g(l).reverse().slice(1))]}},n.extent=function(t){return arguments.length?n.majorExtent(t).minorExtent(t):n.minorExtent()},n.majorExtent=function(t){return arguments.length?(u=+t[0][0],i=+t[1][0],l=+t[0][1],c=+t[1][1],u>i&&(t=u,u=i,i=t),l>c&&(t=l,l=c,c=t),n.precision(y)):[[u,l],[i,c]]},n.minorExtent=function(t){return arguments.length?(r=+t[0][0],e=+t[1][0],o=+t[0][1],a=+t[1][1],r>e&&(t=r,r=e,e=t),o>a&&(t=o,o=a,a=t),n.precision(y)):[[r,o],[e,a]]},n.step=function(t){return arguments.length?n.majorStep(t).minorStep(t):n.minorStep()},n.majorStep=function(t){return arguments.length?(m=+t[0],v=+t[1],n):[m,v]},n.minorStep=function(t){return arguments.length?(p=+t[0],d=+t[1],n):[p,d]},n.precision=function(t){return arguments.length?(y=+t,f=le(o,a,90),s=fe(r,e,y),h=le(l,c,90),g=fe(u,i,y),n):y},n.majorExtent([[-180,-90+ja],[180,90-ja]]).minorExtent([[-180,-80-ja],[180,80+ja]])},ua.geo.greatArc=function(){function n(){return{type:"LineString",coordinates:[t||r.apply(this,arguments),e||i.apply(this,arguments)]}}var t,e,r=se,i=he;return n.distance=function(){return ua.geo.distance(t||r.apply(this,arguments),e||i.apply(this,arguments))},n.source=function(e){return arguments.length?(r=e,t="function"==typeof e?null:e,n):r},n.target=function(t){return arguments.length?(i=t,e="function"==typeof t?null:t,n):i},n.precision=function(){return arguments.length?n:0},n},ua.geo.interpolate=function(n,t){return ge(n[0]*La,n[1]*La,t[0]*La,t[1]*La)},ua.geo.length=function(n){return yo=0,ua.geo.stream(n,Mo),yo};var yo,Mo={sphere:q,point:q,lineStart:pe,lineEnd:q,polygonStart:q,polygonEnd:q};(ua.geo.conicEqualArea=function(){return de(me)}).raw=me,ua.geo.albers=function(){return ua.geo.conicEqualArea().rotate([96,0]).center([-.6,38.7]).parallels([29.5,45.5]).scale(1070)},ua.geo.albersUsa=function(){function n(n){var u=n[0],a=n[1];return t=null,e(u,a),t||(r(u,a),t)||i(u,a),t}var t,e,r,i,u=ua.geo.albers(),a=ua.geo.conicEqualArea().rotate([154,0]).center([-2,58.5]).parallels([55,65]),o=ua.geo.conicEqualArea().rotate([157,0]).center([-3,19.9]).parallels([8,18]),c={point:function(n,e){t=[n,e]}};return n.invert=function(n){var t=u.scale(),e=u.translate(),r=(n[0]-e[0])/t,i=(n[1]-e[1])/t;return(i>=.12&&.234>i&&r>=-.425&&-.214>r?a:i>=.166&&.234>i&&r>=-.214&&-.115>r?o:u).invert(n)},n.stream=function(n){var t=u.stream(n),e=a.stream(n),r=o.stream(n);return{point:function(n,i){t.point(n,i),e.point(n,i),r.point(n,i)},sphere:function(){t.sphere(),e.sphere(),r.sphere()},lineStart:function(){t.lineStart(),e.lineStart(),r.lineStart()},lineEnd:function(){t.lineEnd(),e.lineEnd(),r.lineEnd()},polygonStart:function(){t.polygonStart(),e.polygonStart(),r.polygonStart()},polygonEnd:function(){t.polygonEnd(),e.polygonEnd(),r.polygonEnd()}}},n.precision=function(t){return arguments.length?(u.precision(t),a.precision(t),o.precision(t),n):u.precision()},n.scale=function(t){return arguments.length?(u.scale(t),a.scale(.35*t),o.scale(t),n.translate(u.translate())):u.scale()},n.translate=function(t){if(!arguments.length)return u.translate();var l=u.scale(),f=+t[0],s=+t[1];return e=u.translate(t).clipExtent([[f-.455*l,s-.238*l],[f+.455*l,s+.238*l]]).stream(c).point,r=a.translate([f-.307*l,s+.201*l]).clipExtent([[f-.425*l+ja,s+.12*l+ja],[f-.214*l-ja,s+.234*l-ja]]).stream(c).point,i=o.translate([f-.205*l,s+.212*l]).clipExtent([[f-.214*l+ja,s+.166*l+ja],[f-.115*l-ja,s+.234*l-ja]]).stream(c).point,n},n.scale(1070)};var xo,bo,_o,wo,So,Eo,ko={point:q,lineStart:q,lineEnd:q,polygonStart:function(){bo=0,ko.lineStart=ve},polygonEnd:function(){ko.lineStart=ko.lineEnd=ko.point=q,xo+=Math.abs(bo/2)}},Ao={point:ye,lineStart:q,lineEnd:q,polygonStart:q,polygonEnd:q},No={point:be,lineStart:_e,lineEnd:we,polygonStart:function(){No.lineStart=Se},polygonEnd:function(){No.point=be,No.lineStart=_e,No.lineEnd=we}};ua.geo.path=function(){function n(n){return n&&ua.geo.stream(n,r(i.pointRadius("function"==typeof u?+u.apply(this,arguments):u))),i.result()}var t,e,r,i,u=4.5;return n.area=function(n){return xo=0,ua.geo.stream(n,r(ko)),xo},n.centroid=function(n){return lo=so=ho=go=0,ua.geo.stream(n,r(No)),go?[so/go,ho/go]:void 0},n.bounds=function(n){return So=Eo=-(_o=wo=1/0),ua.geo.stream(n,r(Ao)),[[_o,wo],[So,Eo]]},n.projection=function(e){return arguments.length?(r=(t=e)?e.stream||ke(e):ft,n):t},n.context=function(t){return arguments.length?(i=(e=t)==null?new Me:new Ee(t),n):e},n.pointRadius=function(t){return arguments.length?(u="function"==typeof t?t:+t,n):u},n.projection(ua.geo.albersUsa()).context(null)};var qo=Ae(function(n){return Math.sqrt(2/(1+n))},function(n){return 2*Math.asin(n/2)});(ua.geo.azimuthalEqualArea=function(){return Qt(qo)}).raw=qo;var To=Ae(function(n){var t=Math.acos(n);return t&&t/Math.sin(t)},ft);(ua.geo.azimuthalEquidistant=function(){return Qt(To)}).raw=To,(ua.geo.conicConformal=function(){return de(Ne)}).raw=Ne,(ua.geo.conicEquidistant=function(){return de(qe)}).raw=qe;var Co=Ae(function(n){return 1/n},Math.atan);(ua.geo.gnomonic=function(){return Qt(Co)}).raw=Co,Te.invert=function(n,t){return[n,2*Math.atan(Math.exp(t))-Da/2]},(ua.geo.mercator=function(){return Ce(Te)}).raw=Te;var zo=Ae(function(){return 1},Math.asin);(ua.geo.orthographic=function(){return Qt(zo)}).raw=zo;var Do=Ae(function(n){return 1/(1+n)},function(n){return 2*Math.atan(n)});(ua.geo.stereographic=function(){return Qt(Do)}).raw=Do,ze.invert=function(n,t){return[Math.atan2(U(n),Math.cos(t)),Y(Math.sin(t)/I(n))]},(ua.geo.transverseMercator=function(){return Ce(ze)}).raw=ze,ua.geom={},ua.svg={},ua.svg.line=function(){return De(ft)};var jo=ua.map({linear:Fe,"linear-closed":He,"step-before":Pe,"step-after":Re,basis:Xe,"basis-open":Ze,"basis-closed":Be,bundle:$e,cardinal:Ue,"cardinal-open":Oe,"cardinal-closed":Ye,monotone:nr});jo.forEach(function(n,t){t.key=n,t.closed=/-closed$/.test(n)});var Lo=[0,2/3,1/3,0],Fo=[0,1/3,2/3,0],Ho=[0,1/6,2/3,1/6];ua.geom.hull=function(n){function t(n){if(n.length<3)return[];var t,i,u,a,o,c,l,f,s,h,g,p,d=lt(e),m=lt(r),v=n.length,y=v-1,M=[],x=[],b=0;if(d===je&&r===Le)t=n;else for(u=0,t=[];v>u;++u)t.push([+d.call(this,i=n[u],u),+m.call(this,i,u)]);for(u=1;v>u;++u)(t[u][1]<t[b][1]||t[u][1]==t[b][1]&&t[u][0]<t[b][0])&&(b=u);for(u=0;v>u;++u)u!==b&&(c=t[u][1]-t[b][1],o=t[u][0]-t[b][0],M.push({angle:Math.atan2(c,o),index:u}));for(M.sort(function(n,t){return n.angle-t.angle}),g=M[0].angle,h=M[0].index,s=0,u=1;y>u;++u){if(a=M[u].index,g==M[u].angle){if(o=t[h][0]-t[b][0],c=t[h][1]-t[b][1],l=t[a][0]-t[b][0],f=t[a][1]-t[b][1],o*o+c*c>=l*l+f*f){M[u].index=-1;continue}M[s].index=-1}g=M[u].angle,s=u,h=a}for(x.push(b),u=0,a=0;2>u;++a)M[a].index>-1&&(x.push(M[a].index),u++);for(p=x.length;y>a;++a)if(!(M[a].index<0)){for(;!tr(x[p-2],x[p-1],M[a].index,t);)--p;x[p++]=M[a].index}var _=[];for(u=p-1;u>=0;--u)_.push(n[x[u]]);return _}var e=je,r=Le;return arguments.length?t(n):(t.x=function(n){return arguments.length?(e=n,t):e},t.y=function(n){return arguments.length?(r=n,t):r},t)},ua.geom.polygon=function(n){return n.area=function(){for(var t=0,e=n.length,r=n[e-1][1]*n[0][0]-n[e-1][0]*n[0][1];++t<e;)r+=n[t-1][1]*n[t][0]-n[t-1][0]*n[t][1];return.5*r},n.centroid=function(t){var e,r,i=-1,u=n.length,a=0,o=0,c=n[u-1];for(arguments.length||(t=-1/(6*n.area()));++i<u;)e=c,c=n[i],r=e[0]*c[1]-c[0]*e[1],a+=(e[0]+c[0])*r,o+=(e[1]+c[1])*r;return[a*t,o*t]},n.clip=function(t){for(var e,r,i,u,a,o,c=-1,l=n.length,f=n[l-1];++c<l;){for(e=t.slice(),t.length=0,u=n[c],a=e[(i=e.length)-1],r=-1;++r<i;)o=e[r],er(o,f,u)?(er(a,f,u)||t.push(rr(a,o,f,u)),t.push(o)):er(a,f,u)&&t.push(rr(a,o,f,u)),a=o;f=u}return t},n},ua.geom.delaunay=function(n){var t=n.map(function(){return[]}),e=[];return ir(n,function(e){t[e.region.l.index].push(n[e.region.r.index])}),t.forEach(function(t,r){var i=n[r],u=i[0],a=i[1];t.forEach(function(n){n.angle=Math.atan2(n[0]-u,n[1]-a)}),t.sort(function(n,t){return n.angle-t.angle});for(var o=0,c=t.length-1;c>o;o++)e.push([i,t[o],t[o+1]])}),e},ua.geom.voronoi=function(n){function t(n){var t,r,a,o=n.map(function(){return[]}),c=lt(i),l=lt(u),f=n.length,s=1e6;if(c===je&&l===Le)t=n;else for(t=[],a=0;f>a;++a)t.push([+c.call(this,r=n[a],a),+l.call(this,r,a)]);if(ir(t,function(n){var t,e,r,i,u,a;n.a===1&&n.b>=0?(t=n.ep.r,e=n.ep.l):(t=n.ep.l,e=n.ep.r),n.a===1?(u=t?t.y:-s,r=n.c-n.b*u,a=e?e.y:s,i=n.c-n.b*a):(r=t?t.x:-s,u=n.c-n.a*r,i=e?e.x:s,a=n.c-n.a*i);var c=[r,u],l=[i,a];o[n.region.l.index].push(c,l),o[n.region.r.index].push(c,l)}),o=o.map(function(n,e){var r=t[e][0],i=t[e][1],u=n.map(function(n){return Math.atan2(n[0]-r,n[1]-i)
}),a=ua.range(n.length).sort(function(n,t){return u[n]-u[t]});return a.filter(function(n,t){return!t||u[n]-u[a[t-1]]>ja}).map(function(t){return n[t]})}),o.forEach(function(n,e){var r=n.length;if(!r)return n.push([-s,-s],[-s,s],[s,s],[s,-s]);if(!(r>2)){var i=t[e],u=n[0],a=n[1],o=i[0],c=i[1],l=u[0],f=u[1],h=a[0],g=a[1],p=Math.abs(h-l),d=g-f;if(Math.abs(d)<ja){var m=f>c?-s:s;n.push([-s,m],[s,m])}else if(ja>p){var v=l>o?-s:s;n.push([v,-s],[v,s])}else{var m=(l-o)*(g-f)>(h-l)*(f-c)?s:-s,y=Math.abs(d)-p;Math.abs(y)<ja?n.push([0>d?m:-m,m]):(y>0&&(m*=-1),n.push([-s,m],[s,m]))}}}),e)for(a=0;f>a;++a)e(o[a]);for(a=0;f>a;++a)o[a].point=n[a];return o}var e,r=null,i=je,u=Le;return arguments.length?t(n):(t.x=function(n){return arguments.length?(i=n,t):i},t.y=function(n){return arguments.length?(u=n,t):u},t.size=function(n){return arguments.length?(null==n?e=null:(r=[+n[0],+n[1]],e=ua.geom.polygon([[0,0],[0,r[1]],r,[r[0],0]]).clip),t):r},t.links=function(n){var t,e,r,a=n.map(function(){return[]}),o=[],c=lt(i),l=lt(u),f=n.length;if(c===je&&l===Le)t=n;else for(r=0;f>r;++r)t.push([+c.call(this,e=n[r],r),+l.call(this,e,r)]);return ir(t,function(t){var e=t.region.l.index,r=t.region.r.index;a[e][r]||(a[e][r]=a[r][e]=!0,o.push({source:n[e],target:n[r]}))}),o},t.triangles=function(n){if(i===je&&u===Le)return ua.geom.delaunay(n);var t,e,r,a,o,c=lt(i),l=lt(u);for(a=0,t=[],o=n.length;o>a;++a)e=[+c.call(this,r=n[a],a),+l.call(this,r,a)],e.data=r,t.push(e);return ua.geom.delaunay(t).map(function(n){return n.map(function(n){return n.data})})},t)};var Po={l:"r",r:"l"};ua.geom.quadtree=function(n,t,e,r,i){function u(n){function u(n,t,e,r,i,u,a,o){if(!isNaN(e)&&!isNaN(r))if(n.leaf){var c=n.x,f=n.y;if(null!=c)if(Math.abs(c-e)+Math.abs(f-r)<.01)l(n,t,e,r,i,u,a,o);else{var s=n.point;n.x=n.y=n.point=null,l(n,s,c,f,i,u,a,o),l(n,t,e,r,i,u,a,o)}else n.x=e,n.y=r,n.point=t}else l(n,t,e,r,i,u,a,o)}function l(n,t,e,r,i,a,o,c){var l=.5*(i+o),f=.5*(a+c),s=e>=l,h=r>=f,g=(h<<1)+s;n.leaf=!1,n=n.nodes[g]||(n.nodes[g]=or()),s?i=l:o=l,h?a=f:c=f,u(n,t,e,r,i,a,o,c)}var f,s,h,g,p,d,m,v,y,M=lt(o),x=lt(c);if(null!=t)d=t,m=e,v=r,y=i;else if(v=y=-(d=m=1/0),s=[],h=[],p=n.length,a)for(g=0;p>g;++g)f=n[g],f.x<d&&(d=f.x),f.y<m&&(m=f.y),f.x>v&&(v=f.x),f.y>y&&(y=f.y),s.push(f.x),h.push(f.y);else for(g=0;p>g;++g){var b=+M(f=n[g],g),_=+x(f,g);d>b&&(d=b),m>_&&(m=_),b>v&&(v=b),_>y&&(y=_),s.push(b),h.push(_)}var w=v-d,S=y-m;w>S?y=m+w:v=d+S;var E=or();if(E.add=function(n){u(E,n,+M(n,++g),+x(n,g),d,m,v,y)},E.visit=function(n){cr(n,E,d,m,v,y)},g=-1,null==t){for(;++g<p;)u(E,n[g],s[g],h[g],d,m,v,y);--g}else n.forEach(E.add);return s=h=n=f=null,E}var a,o=je,c=Le;return(a=arguments.length)?(o=ur,c=ar,3===a&&(i=e,r=t,e=t=0),u(n)):(u.x=function(n){return arguments.length?(o=n,u):o},u.y=function(n){return arguments.length?(c=n,u):c},u.size=function(n){return arguments.length?(null==n?t=e=r=i=null:(t=e=0,r=+n[0],i=+n[1]),u):null==t?null:[r,i]},u)},ua.interpolateRgb=lr,ua.transform=function(n){var t=aa.createElementNS(ua.ns.prefix.svg,"g");return(ua.transform=function(n){if(null!=n){t.setAttribute("transform",n);var e=t.transform.baseVal.consolidate()}return new fr(e?e.matrix:Ro)})(n)},fr.prototype.toString=function(){return"translate("+this.translate+")rotate("+this.rotate+")skewX("+this.skew+")scale("+this.scale+")"};var Ro={a:1,b:0,c:0,d:1,e:0,f:0};ua.interpolateNumber=pr,ua.interpolateTransform=dr,ua.interpolateObject=mr,ua.interpolateString=vr;var Oo=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;ua.interpolate=yr,ua.interpolators=[function(n,t){var e=typeof t;return("string"===e?Va.has(t)||/^(#|rgb\(|hsl\()/.test(t)?lr:vr:t instanceof L?lr:"object"===e?Array.isArray(t)?xr:mr:pr)(n,t)}],ua.interpolateArray=xr;var Yo=function(){return ft},Uo=ua.map({linear:Yo,poly:Ar,quad:function(){return Sr},cubic:function(){return Er},sin:function(){return Nr},exp:function(){return qr},circle:function(){return Tr},elastic:Cr,back:zr,bounce:function(){return Dr}}),Io=ua.map({"in":ft,out:_r,"in-out":wr,"out-in":function(n){return wr(_r(n))}});ua.ease=function(n){var t=n.indexOf("-"),e=t>=0?n.substring(0,t):n,r=t>=0?n.substring(t+1):"in";return e=Uo.get(e)||Yo,r=Io.get(r)||ft,br(r(e.apply(null,Array.prototype.slice.call(arguments,1))))},ua.interpolateHcl=jr,ua.interpolateHsl=Lr,ua.interpolateLab=Fr,ua.interpolateRound=Hr,ua.layout={},ua.layout.bundle=function(){return function(n){for(var t=[],e=-1,r=n.length;++e<r;)t.push(Or(n[e]));return t}},ua.layout.chord=function(){function n(){var n,l,s,h,g,p={},d=[],m=ua.range(u),v=[];for(e=[],r=[],n=0,h=-1;++h<u;){for(l=0,g=-1;++g<u;)l+=i[h][g];d.push(l),v.push(ua.range(u)),n+=l}for(a&&m.sort(function(n,t){return a(d[n],d[t])}),o&&v.forEach(function(n,t){n.sort(function(n,e){return o(i[t][n],i[t][e])})}),n=(2*Da-f*u)/n,l=0,h=-1;++h<u;){for(s=l,g=-1;++g<u;){var y=m[h],M=v[y][g],x=i[y][M],b=l,_=l+=x*n;p[y+"-"+M]={index:y,subindex:M,startAngle:b,endAngle:_,value:x}}r[y]={index:y,startAngle:s,endAngle:l,value:(l-s)/n},l+=f}for(h=-1;++h<u;)for(g=h-1;++g<u;){var w=p[h+"-"+g],S=p[g+"-"+h];(w.value||S.value)&&e.push(w.value<S.value?{source:S,target:w}:{source:w,target:S})}c&&t()}function t(){e.sort(function(n,t){return c((n.source.value+n.target.value)/2,(t.source.value+t.target.value)/2)})}var e,r,i,u,a,o,c,l={},f=0;return l.matrix=function(n){return arguments.length?(u=(i=n)&&i.length,e=r=null,l):i},l.padding=function(n){return arguments.length?(f=n,e=r=null,l):f},l.sortGroups=function(n){return arguments.length?(a=n,e=r=null,l):a},l.sortSubgroups=function(n){return arguments.length?(o=n,e=null,l):o},l.sortChords=function(n){return arguments.length?(c=n,e&&t(),l):c},l.chords=function(){return e||n(),e},l.groups=function(){return r||n(),r},l},ua.layout.force=function(){function n(n){return function(t,e,r,i){if(t.point!==n){var u=t.cx-n.x,a=t.cy-n.y,o=1/Math.sqrt(u*u+a*a);if(d>(i-e)*o){var c=t.charge*o*o;return n.px-=u*c,n.py-=a*c,!0}if(t.point&&isFinite(o)){var c=t.pointCharge*o*o;n.px-=u*c,n.py-=a*c}}return!t.charge}}function t(n){n.px=ua.event.x,n.py=ua.event.y,o.resume()}var e,r,i,u,a,o={},c=ua.dispatch("start","tick","end"),l=[1,1],f=.9,s=Vo,h=Xo,g=-30,p=.1,d=.8,m=[],v=[];return o.tick=function(){if((r*=.99)<.005)return c.end({type:"end",alpha:r=0}),!0;var t,e,o,s,h,d,y,M,x,b=m.length,_=v.length;for(e=0;_>e;++e)o=v[e],s=o.source,h=o.target,M=h.x-s.x,x=h.y-s.y,(d=M*M+x*x)&&(d=r*u[e]*((d=Math.sqrt(d))-i[e])/d,M*=d,x*=d,h.x-=M*(y=s.weight/(h.weight+s.weight)),h.y-=x*y,s.x+=M*(y=1-y),s.y+=x*y);if((y=r*p)&&(M=l[0]/2,x=l[1]/2,e=-1,y))for(;++e<b;)o=m[e],o.x+=(M-o.x)*y,o.y+=(x-o.y)*y;if(g)for(Br(t=ua.geom.quadtree(m),r,a),e=-1;++e<b;)(o=m[e]).fixed||t.visit(n(o));for(e=-1;++e<b;)o=m[e],o.fixed?(o.x=o.px,o.y=o.py):(o.x-=(o.px-(o.px=o.x))*f,o.y-=(o.py-(o.py=o.y))*f);c.tick({type:"tick",alpha:r})},o.nodes=function(n){return arguments.length?(m=n,o):m},o.links=function(n){return arguments.length?(v=n,o):v},o.size=function(n){return arguments.length?(l=n,o):l},o.linkDistance=function(n){return arguments.length?(s="function"==typeof n?n:+n,o):s},o.distance=o.linkDistance,o.linkStrength=function(n){return arguments.length?(h="function"==typeof n?n:+n,o):h},o.friction=function(n){return arguments.length?(f=+n,o):f},o.charge=function(n){return arguments.length?(g="function"==typeof n?n:+n,o):g},o.gravity=function(n){return arguments.length?(p=+n,o):p},o.theta=function(n){return arguments.length?(d=+n,o):d},o.alpha=function(n){return arguments.length?(n=+n,r?r=n>0?n:0:n>0&&(c.start({type:"start",alpha:r=n}),ua.timer(o.tick)),o):r},o.start=function(){function n(n,r){for(var i,u=t(e),a=-1,o=u.length;++a<o;)if(!isNaN(i=u[a][n]))return i;return Math.random()*r}function t(){if(!c){for(c=[],r=0;p>r;++r)c[r]=[];for(r=0;d>r;++r){var n=v[r];c[n.source.index].push(n.target),c[n.target.index].push(n.source)}}return c[e]}var e,r,c,f,p=m.length,d=v.length,y=l[0],M=l[1];for(e=0;p>e;++e)(f=m[e]).index=e,f.weight=0;for(e=0;d>e;++e)f=v[e],typeof f.source=="number"&&(f.source=m[f.source]),typeof f.target=="number"&&(f.target=m[f.target]),++f.source.weight,++f.target.weight;for(e=0;p>e;++e)f=m[e],isNaN(f.x)&&(f.x=n("x",y)),isNaN(f.y)&&(f.y=n("y",M)),isNaN(f.px)&&(f.px=f.x),isNaN(f.py)&&(f.py=f.y);if(i=[],"function"==typeof s)for(e=0;d>e;++e)i[e]=+s.call(this,v[e],e);else for(e=0;d>e;++e)i[e]=s;if(u=[],"function"==typeof h)for(e=0;d>e;++e)u[e]=+h.call(this,v[e],e);else for(e=0;d>e;++e)u[e]=h;if(a=[],"function"==typeof g)for(e=0;p>e;++e)a[e]=+g.call(this,m[e],e);else for(e=0;p>e;++e)a[e]=g;return o.resume()},o.resume=function(){return o.alpha(.1)},o.stop=function(){return o.alpha(0)},o.drag=function(){return e||(e=ua.behavior.drag().origin(ft).on("dragstart.force",Ir).on("drag.force",t).on("dragend.force",Vr)),arguments.length?(this.on("mouseover.force",Xr).on("mouseout.force",Zr).call(e),void 0):e},ua.rebind(o,c,"on")};var Vo=20,Xo=1;ua.layout.hierarchy=function(){function n(t,a,o){var c=i.call(e,t,a);if(t.depth=a,o.push(t),c&&(l=c.length)){for(var l,f,s=-1,h=t.children=[],g=0,p=a+1;++s<l;)f=n(c[s],p,o),f.parent=t,h.push(f),g+=f.value;r&&h.sort(r),u&&(t.value=g)}else u&&(t.value=+u.call(e,t,a)||0);return t}function t(n,r){var i=n.children,a=0;if(i&&(o=i.length))for(var o,c=-1,l=r+1;++c<o;)a+=t(i[c],l);else u&&(a=+u.call(e,n,r)||0);return u&&(n.value=a),a}function e(t){var e=[];return n(t,0,e),e}var r=Kr,i=Jr,u=Gr;return e.sort=function(n){return arguments.length?(r=n,e):r},e.children=function(n){return arguments.length?(i=n,e):i},e.value=function(n){return arguments.length?(u=n,e):u},e.revalue=function(n){return t(n,0),n},e},ua.layout.partition=function(){function n(t,e,r,i){var u=t.children;if(t.x=e,t.y=t.depth*i,t.dx=r,t.dy=i,u&&(a=u.length)){var a,o,c,l=-1;for(r=t.value?r/t.value:0;++l<a;)n(o=u[l],e,c=o.value*r,i),e+=c}}function t(n){var e=n.children,r=0;if(e&&(i=e.length))for(var i,u=-1;++u<i;)r=Math.max(r,t(e[u]));return 1+r}function e(e,u){var a=r.call(this,e,u);return n(a[0],0,i[0],i[1]/t(a[0])),a}var r=ua.layout.hierarchy(),i=[1,1];return e.size=function(n){return arguments.length?(i=n,e):i},$r(e,r)},ua.layout.pie=function(){function n(u){var a=u.map(function(e,r){return+t.call(n,e,r)}),o=+("function"==typeof r?r.apply(this,arguments):r),c=(("function"==typeof i?i.apply(this,arguments):i)-o)/ua.sum(a),l=ua.range(u.length);null!=e&&l.sort(e===Zo?function(n,t){return a[t]-a[n]}:function(n,t){return e(u[n],u[t])});var f=[];return l.forEach(function(n){var t;f[n]={data:u[n],value:t=a[n],startAngle:o,endAngle:o+=t*c}}),f}var t=Number,e=Zo,r=0,i=2*Da;return n.value=function(e){return arguments.length?(t=e,n):t},n.sort=function(t){return arguments.length?(e=t,n):e},n.startAngle=function(t){return arguments.length?(r=t,n):r},n.endAngle=function(t){return arguments.length?(i=t,n):i},n};var Zo={};ua.layout.stack=function(){function n(o,c){var l=o.map(function(e,r){return t.call(n,e,r)}),f=l.map(function(t){return t.map(function(t,e){return[u.call(n,t,e),a.call(n,t,e)]})}),s=e.call(n,f,c);l=ua.permute(l,s),f=ua.permute(f,s);var h,g,p,d=r.call(n,f,c),m=l.length,v=l[0].length;for(g=0;v>g;++g)for(i.call(n,l[0][g],p=d[g],f[0][g][1]),h=1;m>h;++h)i.call(n,l[h][g],p+=f[h-1][g][1],f[h][g][1]);return o}var t=ft,e=ei,r=ri,i=ti,u=Qr,a=ni;return n.values=function(e){return arguments.length?(t=e,n):t},n.order=function(t){return arguments.length?(e="function"==typeof t?t:Bo.get(t)||ei,n):e},n.offset=function(t){return arguments.length?(r="function"==typeof t?t:$o.get(t)||ri,n):r},n.x=function(t){return arguments.length?(u=t,n):u},n.y=function(t){return arguments.length?(a=t,n):a},n.out=function(t){return arguments.length?(i=t,n):i},n};var Bo=ua.map({"inside-out":function(n){var t,e,r=n.length,i=n.map(ii),u=n.map(ui),a=ua.range(r).sort(function(n,t){return i[n]-i[t]}),o=0,c=0,l=[],f=[];for(t=0;r>t;++t)e=a[t],c>o?(o+=u[e],l.push(e)):(c+=u[e],f.push(e));return f.reverse().concat(l)},reverse:function(n){return ua.range(n.length).reverse()},"default":ei}),$o=ua.map({silhouette:function(n){var t,e,r,i=n.length,u=n[0].length,a=[],o=0,c=[];for(e=0;u>e;++e){for(t=0,r=0;i>t;t++)r+=n[t][e][1];r>o&&(o=r),a.push(r)}for(e=0;u>e;++e)c[e]=(o-a[e])/2;return c},wiggle:function(n){var t,e,r,i,u,a,o,c,l,f=n.length,s=n[0],h=s.length,g=[];for(g[0]=c=l=0,e=1;h>e;++e){for(t=0,i=0;f>t;++t)i+=n[t][e][1];for(t=0,u=0,o=s[e][0]-s[e-1][0];f>t;++t){for(r=0,a=(n[t][e][1]-n[t][e-1][1])/(2*o);t>r;++r)a+=(n[r][e][1]-n[r][e-1][1])/o;u+=a*n[t][e][1]}g[e]=c-=i?u/i*o:0,l>c&&(l=c)}for(e=0;h>e;++e)g[e]-=l;return g},expand:function(n){var t,e,r,i=n.length,u=n[0].length,a=1/i,o=[];for(e=0;u>e;++e){for(t=0,r=0;i>t;t++)r+=n[t][e][1];if(r)for(t=0;i>t;t++)n[t][e][1]/=r;else for(t=0;i>t;t++)n[t][e][1]=a}for(e=0;u>e;++e)o[e]=0;return o},zero:ri});ua.layout.histogram=function(){function n(n,u){for(var a,o,c=[],l=n.map(e,this),f=r.call(this,l,u),s=i.call(this,f,l,u),u=-1,h=l.length,g=s.length-1,p=t?1:1/h;++u<g;)a=c[u]=[],a.dx=s[u+1]-(a.x=s[u]),a.y=0;if(g>0)for(u=-1;++u<h;)o=l[u],o>=f[0]&&o<=f[1]&&(a=c[ua.bisect(s,o,1,g)-1],a.y+=p,a.push(n[u]));return c}var t=!0,e=Number,r=li,i=oi;return n.value=function(t){return arguments.length?(e=t,n):e},n.range=function(t){return arguments.length?(r=lt(t),n):r},n.bins=function(t){return arguments.length?(i="number"==typeof t?function(n){return ci(n,t)}:lt(t),n):i},n.frequency=function(e){return arguments.length?(t=!!e,n):t},n},ua.layout.tree=function(){function n(n,i){function u(n,t){var r=n.children,i=n._tree;if(r&&(a=r.length)){for(var a,c,l,f=r[0],s=f,h=-1;++h<a;)l=r[h],u(l,c),s=o(l,c,s),c=l;yi(n);var g=.5*(f._tree.prelim+l._tree.prelim);t?(i.prelim=t._tree.prelim+e(n,t),i.mod=i.prelim-g):i.prelim=g}else t&&(i.prelim=t._tree.prelim+e(n,t))}function a(n,t){n.x=n._tree.prelim+t;var e=n.children;if(e&&(r=e.length)){var r,i=-1;for(t+=n._tree.mod;++i<r;)a(e[i],t)}}function o(n,t,r){if(t){for(var i,u=n,a=n,o=t,c=n.parent.children[0],l=u._tree.mod,f=a._tree.mod,s=o._tree.mod,h=c._tree.mod;o=hi(o),u=si(u),o&&u;)c=si(c),a=hi(a),a._tree.ancestor=n,i=o._tree.prelim+s-u._tree.prelim-l+e(o,u),i>0&&(Mi(xi(o,n,r),n,i),l+=i,f+=i),s+=o._tree.mod,l+=u._tree.mod,h+=c._tree.mod,f+=a._tree.mod;o&&!hi(a)&&(a._tree.thread=o,a._tree.mod+=s-f),u&&!si(c)&&(c._tree.thread=u,c._tree.mod+=l-h,r=n)}return r}var c=t.call(this,n,i),l=c[0];vi(l,function(n,t){n._tree={ancestor:n,prelim:0,mod:0,change:0,shift:0,number:t?t._tree.number+1:0}}),u(l),a(l,-l._tree.prelim);var f=gi(l,di),s=gi(l,pi),h=gi(l,mi),g=f.x-e(f,s)/2,p=s.x+e(s,f)/2,d=h.depth||1;return vi(l,function(n){n.x=(n.x-g)/(p-g)*r[0],n.y=n.depth/d*r[1],delete n._tree}),c}var t=ua.layout.hierarchy().sort(null).value(null),e=fi,r=[1,1];return n.separation=function(t){return arguments.length?(e=t,n):e},n.size=function(t){return arguments.length?(r=t,n):r},$r(n,t)},ua.layout.pack=function(){function n(n,i){var u=t.call(this,n,i),a=u[0];a.x=0,a.y=0,vi(a,function(n){n.r=Math.sqrt(n.value)}),vi(a,Ei);var o=r[0],c=r[1],l=Math.max(2*a.r/o,2*a.r/c);if(e>0){var f=e*l/2;vi(a,function(n){n.r+=f}),vi(a,Ei),vi(a,function(n){n.r-=f}),l=Math.max(2*a.r/o,2*a.r/c)}return Ni(a,o/2,c/2,1/l),u}var t=ua.layout.hierarchy().sort(bi),e=0,r=[1,1];return n.size=function(t){return arguments.length?(r=t,n):r},n.padding=function(t){return arguments.length?(e=+t,n):e},$r(n,t)},ua.layout.cluster=function(){function n(n,i){var u,a=t.call(this,n,i),o=a[0],c=0;vi(o,function(n){var t=n.children;t&&t.length?(n.x=Ci(t),n.y=Ti(t)):(n.x=u?c+=e(n,u):0,n.y=0,u=n)});var l=zi(o),f=Di(o),s=l.x-e(l,f)/2,h=f.x+e(f,l)/2;return vi(o,function(n){n.x=(n.x-s)/(h-s)*r[0],n.y=(1-(o.y?n.y/o.y:1))*r[1]}),a}var t=ua.layout.hierarchy().sort(null).value(null),e=fi,r=[1,1];return n.separation=function(t){return arguments.length?(e=t,n):e},n.size=function(t){return arguments.length?(r=t,n):r},$r(n,t)},ua.layout.treemap=function(){function n(n,t){for(var e,r,i=-1,u=n.length;++i<u;)r=(e=n[i]).value*(0>t?0:t),e.area=isNaN(r)||0>=r?0:r}function t(e){var u=e.children;if(u&&u.length){var a,o,c,l=s(e),f=[],h=u.slice(),p=1/0,d="slice"===g?l.dx:"dice"===g?l.dy:"slice-dice"===g?e.depth&1?l.dy:l.dx:Math.min(l.dx,l.dy);for(n(h,l.dx*l.dy/e.value),f.area=0;(c=h.length)>0;)f.push(a=h[c-1]),f.area+=a.area,"squarify"!==g||(o=r(f,d))<=p?(h.pop(),p=o):(f.area-=f.pop().area,i(f,d,l,!1),d=Math.min(l.dx,l.dy),f.length=f.area=0,p=1/0);f.length&&(i(f,d,l,!0),f.length=f.area=0),u.forEach(t)}}function e(t){var r=t.children;if(r&&r.length){var u,a=s(t),o=r.slice(),c=[];for(n(o,a.dx*a.dy/t.value),c.area=0;u=o.pop();)c.push(u),c.area+=u.area,u.z!=null&&(i(c,u.z?a.dx:a.dy,a,!o.length),c.length=c.area=0);r.forEach(e)}}function r(n,t){for(var e,r=n.area,i=0,u=1/0,a=-1,o=n.length;++a<o;)(e=n[a].area)&&(u>e&&(u=e),e>i&&(i=e));return r*=r,t*=t,r?Math.max(t*i*p/r,r/(t*u*p)):1/0}function i(n,t,e,r){var i,u=-1,a=n.length,o=e.x,l=e.y,f=t?c(n.area/t):0;if(t==e.dx){for((r||f>e.dy)&&(f=e.dy);++u<a;)i=n[u],i.x=o,i.y=l,i.dy=f,o+=i.dx=Math.min(e.x+e.dx-o,f?c(i.area/f):0);i.z=!0,i.dx+=e.x+e.dx-o,e.y+=f,e.dy-=f}else{for((r||f>e.dx)&&(f=e.dx);++u<a;)i=n[u],i.x=o,i.y=l,i.dx=f,l+=i.dy=Math.min(e.y+e.dy-l,f?c(i.area/f):0);i.z=!1,i.dy+=e.y+e.dy-l,e.x+=f,e.dx-=f}}function u(r){var i=a||o(r),u=i[0];return u.x=0,u.y=0,u.dx=l[0],u.dy=l[1],a&&o.revalue(u),n([u],u.dx*u.dy/u.value),(a?e:t)(u),h&&(a=i),i}var a,o=ua.layout.hierarchy(),c=Math.round,l=[1,1],f=null,s=ji,h=!1,g="squarify",p=.5*(1+Math.sqrt(5));return u.size=function(n){return arguments.length?(l=n,u):l},u.padding=function(n){function t(t){var e=n.call(u,t,t.depth);return null==e?ji(t):Li(t,"number"==typeof e?[e,e,e,e]:e)}function e(t){return Li(t,n)}if(!arguments.length)return f;var r;return s=(f=n)==null?ji:(r=typeof n)=="function"?t:"number"===r?(n=[n,n,n,n],e):e,u},u.round=function(n){return arguments.length?(c=n?Math.round:Number,u):c!=Number},u.sticky=function(n){return arguments.length?(h=n,a=null,u):h},u.ratio=function(n){return arguments.length?(p=n,u):p},u.mode=function(n){return arguments.length?(g=n+"",u):g},$r(u,o)},ua.random={normal:function(n,t){var e=arguments.length;return 2>e&&(t=1),1>e&&(n=0),function(){var e,r,i;do e=Math.random()*2-1,r=Math.random()*2-1,i=e*e+r*r;while(!i||i>1);return n+t*e*Math.sqrt(-2*Math.log(i)/i)}},logNormal:function(){var n=ua.random.normal.apply(ua,arguments);return function(){return Math.exp(n())}},irwinHall:function(n){return function(){for(var t=0,e=0;n>e;e++)t+=Math.random();return t/n}}},ua.scale={},ua.scale.linear=function(){return Yi([0,1],[0,1],yr,!1)},ua.scale.log=function(){return Bi(ua.scale.linear().domain([0,Math.LN10]),10,$i,Ji,[1,10])};var Jo=ua.format(".0e");ua.scale.pow=function(){return Wi(ua.scale.linear(),1,[0,1])},ua.scale.sqrt=function(){return ua.scale.pow().exponent(.5)},ua.scale.ordinal=function(){return nu([],{t:"range",a:[[]]})},ua.scale.category10=function(){return ua.scale.ordinal().range(Go)},ua.scale.category20=function(){return ua.scale.ordinal().range(Ko)},ua.scale.category20b=function(){return ua.scale.ordinal().range(Wo)},ua.scale.category20c=function(){return ua.scale.ordinal().range(Qo)};var Go=["#1f77b4","#ff7f0e","#2ca02c","#d62728","#9467bd","#8c564b","#e377c2","#7f7f7f","#bcbd22","#17becf"],Ko=["#1f77b4","#aec7e8","#ff7f0e","#ffbb78","#2ca02c","#98df8a","#d62728","#ff9896","#9467bd","#c5b0d5","#8c564b","#c49c94","#e377c2","#f7b6d2","#7f7f7f","#c7c7c7","#bcbd22","#dbdb8d","#17becf","#9edae5"],Wo=["#393b79","#5254a3","#6b6ecf","#9c9ede","#637939","#8ca252","#b5cf6b","#cedb9c","#8c6d31","#bd9e39","#e7ba52","#e7cb94","#843c39","#ad494a","#d6616b","#e7969c","#7b4173","#a55194","#ce6dbd","#de9ed6"],Qo=["#3182bd","#6baed6","#9ecae1","#c6dbef","#e6550d","#fd8d3c","#fdae6b","#fdd0a2","#31a354","#74c476","#a1d99b","#c7e9c0","#756bb1","#9e9ac8","#bcbddc","#dadaeb","#636363","#969696","#bdbdbd","#d9d9d9"];ua.scale.quantile=function(){return tu([],[])},ua.scale.quantize=function(){return eu(0,1,[0,1])},ua.scale.threshold=function(){return ru([.5],[0,1])},ua.scale.identity=function(){return iu([0,1])},ua.svg.arc=function(){function n(){var n=t.apply(this,arguments),u=e.apply(this,arguments),a=r.apply(this,arguments)+nc,o=i.apply(this,arguments)+nc,c=(a>o&&(c=a,a=o,o=c),o-a),l=Da>c?"0":"1",f=Math.cos(a),s=Math.sin(a),h=Math.cos(o),g=Math.sin(o);return c>=tc?n?"M0,"+u+"A"+u+","+u+" 0 1,1 0,"+-u+"A"+u+","+u+" 0 1,1 0,"+u+"M0,"+n+"A"+n+","+n+" 0 1,0 0,"+-n+"A"+n+","+n+" 0 1,0 0,"+n+"Z":"M0,"+u+"A"+u+","+u+" 0 1,1 0,"+-u+"A"+u+","+u+" 0 1,1 0,"+u+"Z":n?"M"+u*f+","+u*s+"A"+u+","+u+" 0 "+l+",1 "+u*h+","+u*g+"L"+n*h+","+n*g+"A"+n+","+n+" 0 "+l+",0 "+n*f+","+n*s+"Z":"M"+u*f+","+u*s+"A"+u+","+u+" 0 "+l+",1 "+u*h+","+u*g+"L0,0"+"Z"}var t=uu,e=au,r=ou,i=cu;return n.innerRadius=function(e){return arguments.length?(t=lt(e),n):t},n.outerRadius=function(t){return arguments.length?(e=lt(t),n):e},n.startAngle=function(t){return arguments.length?(r=lt(t),n):r},n.endAngle=function(t){return arguments.length?(i=lt(t),n):i},n.centroid=function(){var n=(t.apply(this,arguments)+e.apply(this,arguments))/2,u=(r.apply(this,arguments)+i.apply(this,arguments))/2+nc;return[Math.cos(u)*n,Math.sin(u)*n]},n};var nc=-Da/2,tc=2*Da-1e-6;ua.svg.line.radial=function(){var n=De(lu);return n.radius=n.x,delete n.x,n.angle=n.y,delete n.y,n},Pe.reverse=Re,Re.reverse=Pe,ua.svg.area=function(){return fu(ft)},ua.svg.area.radial=function(){var n=fu(lu);return n.radius=n.x,delete n.x,n.innerRadius=n.x0,delete n.x0,n.outerRadius=n.x1,delete n.x1,n.angle=n.y,delete n.y,n.startAngle=n.y0,delete n.y0,n.endAngle=n.y1,delete n.y1,n},ua.svg.chord=function(){function n(n,o){var c=t(this,u,n,o),l=t(this,a,n,o);return"M"+c.p0+r(c.r,c.p1,c.a1-c.a0)+(e(c,l)?i(c.r,c.p1,c.r,c.p0):i(c.r,c.p1,l.r,l.p0)+r(l.r,l.p1,l.a1-l.a0)+i(l.r,l.p1,c.r,c.p0))+"Z"}function t(n,t,e,r){var i=t.call(n,e,r),u=o.call(n,i,r),a=c.call(n,i,r)+nc,f=l.call(n,i,r)+nc;return{r:u,a0:a,a1:f,p0:[u*Math.cos(a),u*Math.sin(a)],p1:[u*Math.cos(f),u*Math.sin(f)]}}function e(n,t){return n.a0==t.a0&&n.a1==t.a1}function r(n,t,e){return"A"+n+","+n+" 0 "+ +(e>Da)+",1 "+t}function i(n,t,e,r){return"Q 0,0 "+r}var u=se,a=he,o=su,c=ou,l=cu;return n.radius=function(t){return arguments.length?(o=lt(t),n):o},n.source=function(t){return arguments.length?(u=lt(t),n):u},n.target=function(t){return arguments.length?(a=lt(t),n):a},n.startAngle=function(t){return arguments.length?(c=lt(t),n):c},n.endAngle=function(t){return arguments.length?(l=lt(t),n):l},n},ua.svg.diagonal=function(){function n(n,i){var u=t.call(this,n,i),a=e.call(this,n,i),o=(u.y+a.y)/2,c=[u,{x:u.x,y:o},{x:a.x,y:o},a];return c=c.map(r),"M"+c[0]+"C"+c[1]+" "+c[2]+" "+c[3]}var t=se,e=he,r=hu;return n.source=function(e){return arguments.length?(t=lt(e),n):t},n.target=function(t){return arguments.length?(e=lt(t),n):e},n.projection=function(t){return arguments.length?(r=t,n):r},n},ua.svg.diagonal.radial=function(){var n=ua.svg.diagonal(),t=hu,e=n.projection;return n.projection=function(n){return arguments.length?e(gu(t=n)):t},n},ua.svg.symbol=function(){function n(n,r){return(ec.get(t.call(this,n,r))||mu)(e.call(this,n,r))}var t=du,e=pu;return n.type=function(e){return arguments.length?(t=lt(e),n):t},n.size=function(t){return arguments.length?(e=lt(t),n):e},n};var ec=ua.map({circle:mu,cross:function(n){var t=Math.sqrt(n/5)/2;return"M"+-3*t+","+-t+"H"+-t+"V"+-3*t+"H"+t+"V"+-t+"H"+3*t+"V"+t+"H"+t+"V"+3*t+"H"+-t+"V"+t+"H"+-3*t+"Z"},diamond:function(n){var t=Math.sqrt(n/(2*uc)),e=t*uc;return"M0,"+-t+"L"+e+",0"+" 0,"+t+" "+-e+",0"+"Z"},square:function(n){var t=Math.sqrt(n)/2;return"M"+-t+","+-t+"L"+t+","+-t+" "+t+","+t+" "+-t+","+t+"Z"},"triangle-down":function(n){var t=Math.sqrt(n/ic),e=t*ic/2;return"M0,"+e+"L"+t+","+-e+" "+-t+","+-e+"Z"},"triangle-up":function(n){var t=Math.sqrt(n/ic),e=t*ic/2;return"M0,"+-e+"L"+t+","+e+" "+-t+","+e+"Z"}});ua.svg.symbolTypes=ec.keys();var rc,ic=Math.sqrt(3),uc=Math.tan(30*La),ac=[],oc=0,cc={ease:kr,delay:0,duration:250};ac.call=wa.call,ac.empty=wa.empty,ac.node=wa.node,ua.transition=function(n){return arguments.length?rc?n.transition():n:Na.transition()},ua.transition.prototype=ac,ac.select=function(n){var t,e,r,i=this.id,u=[];"function"!=typeof n&&(n=v(n));for(var a=-1,o=this.length;++a<o;){u.push(t=[]);for(var c=this[a],l=-1,f=c.length;++l<f;)(r=c[l])&&(e=n.call(r,r.__data__,l))?("__data__"in r&&(e.__data__=r.__data__),xu(e,l,i,r.__transition__[i]),t.push(e)):t.push(null)}return vu(u,i)},ac.selectAll=function(n){var t,e,r,i,u,a=this.id,o=[];"function"!=typeof n&&(n=y(n));for(var c=-1,l=this.length;++c<l;)for(var f=this[c],s=-1,h=f.length;++s<h;)if(r=f[s]){u=r.__transition__[a],e=n.call(r,r.__data__,s),o.push(t=[]);for(var g=-1,p=e.length;++g<p;)xu(i=e[g],g,a,u),t.push(i)}return vu(o,a)},ac.filter=function(n){var t,e,r,i=[];"function"!=typeof n&&(n=A(n));for(var u=0,a=this.length;a>u;u++){i.push(t=[]);for(var e=this[u],o=0,c=e.length;c>o;o++)(r=e[o])&&n.call(r,r.__data__,o)&&t.push(r)}return vu(i,this.id,this.time).ease(this.ease())},ac.tween=function(n,t){var e=this.id;return arguments.length<2?this.node().__transition__[e].tween.get(n):D(this,null==t?function(t){t.__transition__[e].tween.remove(n)}:function(r){r.__transition__[e].tween.set(n,t)})},ac.attr=function(n,t){function e(){this.removeAttribute(o)}function r(){this.removeAttributeNS(o.space,o.local)}function i(n){return null==n?e:(n+="",function(){var t,e=this.getAttribute(o);return e!==n&&(t=a(e,n),function(n){this.setAttribute(o,t(n))})})}function u(n){return null==n?r:(n+="",function(){var t,e=this.getAttributeNS(o.space,o.local);return e!==n&&(t=a(e,n),function(n){this.setAttributeNS(o.space,o.local,t(n))})})}if(arguments.length<2){for(t in n)this.attr(t,n[t]);return this}var a=Mr(n),o=ua.ns.qualify(n);return yu(this,"attr."+n,t,o.local?u:i)},ac.attrTween=function(n,t){function e(n,e){var r=t.call(this,n,e,this.getAttribute(i));return r&&function(n){this.setAttribute(i,r(n))}}function r(n,e){var r=t.call(this,n,e,this.getAttributeNS(i.space,i.local));return r&&function(n){this.setAttributeNS(i.space,i.local,r(n))}}var i=ua.ns.qualify(n);return this.tween("attr."+n,i.local?r:e)},ac.style=function(n,t,e){function r(){this.style.removeProperty(n)}function i(t){return null==t?r:(t+="",function(){var r,i=oa.getComputedStyle(this,null).getPropertyValue(n);return i!==t&&(r=a(i,t),function(t){this.style.setProperty(n,r(t),e)})})}var u=arguments.length;if(3>u){if("string"!=typeof n){2>u&&(t="");for(e in n)this.style(e,n[e],t);return this}e=""}var a=Mr(n);return yu(this,"style."+n,t,i)},ac.styleTween=function(n,t,e){function r(r,i){var u=t.call(this,r,i,oa.getComputedStyle(this,null).getPropertyValue(n));return u&&function(t){this.style.setProperty(n,u(t),e)}}return arguments.length<3&&(e=""),this.tween("style."+n,r)},ac.text=function(n){return yu(this,"text",n,Mu)},ac.remove=function(){return this.each("end.transition",function(){var n;!this.__transition__&&(n=this.parentNode)&&n.removeChild(this)})},ac.ease=function(n){var t=this.id;return arguments.length<1?this.node().__transition__[t].ease:("function"!=typeof n&&(n=ua.ease.apply(ua,arguments)),D(this,function(e){e.__transition__[t].ease=n}))},ac.delay=function(n){var t=this.id;return D(this,"function"==typeof n?function(e,r,i){e.__transition__[t].delay=n.call(e,e.__data__,r,i)|0}:(n|=0,function(e){e.__transition__[t].delay=n}))},ac.duration=function(n){var t=this.id;return D(this,"function"==typeof n?function(e,r,i){e.__transition__[t].duration=Math.max(1,n.call(e,e.__data__,r,i)|0)}:(n=Math.max(1,0|n),function(e){e.__transition__[t].duration=n}))},ac.each=function(n,t){var e=this.id;if(arguments.length<2){var r=cc,i=rc;rc=e,D(this,function(t,r,i){cc=t.__transition__[e],n.call(t,t.__data__,r,i)}),cc=r,rc=i}else D(this,function(r){r.__transition__[e].event.on(n,t)});return this},ac.transition=function(){for(var n,t,e,r,i=this.id,u=++oc,a=[],o=0,c=this.length;c>o;o++){a.push(n=[]);for(var t=this[o],l=0,f=t.length;f>l;l++)(e=t[l])&&(r=Object.create(e.__transition__[i]),r.delay+=r.duration,xu(e,l,u,r)),n.push(e)}return vu(a,u)},ua.svg.axis=function(){function n(n){n.each(function(){var n,s=ua.select(this),h=null==l?e.ticks?e.ticks.apply(e,c):e.domain():l,g=null==t?e.tickFormat?e.tickFormat.apply(e,c):String:t,p=wu(e,h,f),d=s.selectAll(".tick.minor").data(p,String),m=d.enter().insert("line",".tick").attr("class","tick minor").style("opacity",1e-6),v=ua.transition(d.exit()).style("opacity",1e-6).remove(),y=ua.transition(d).style("opacity",1),M=s.selectAll(".tick.major").data(h,String),x=M.enter().insert("g","path").attr("class","tick major").style("opacity",1e-6),b=ua.transition(M.exit()).style("opacity",1e-6).remove(),_=ua.transition(M).style("opacity",1),w=Hi(e),S=s.selectAll(".domain").data([0]),E=(S.enter().append("path").attr("class","domain"),ua.transition(S)),k=e.copy(),A=this.__chart__||k;this.__chart__=k,x.append("line"),x.append("text");var N=x.select("line"),q=_.select("line"),T=M.select("text").text(g),C=x.select("text"),z=_.select("text");switch(r){case"bottom":n=bu,m.attr("y2",u),y.attr("x2",0).attr("y2",u),N.attr("y2",i),C.attr("y",Math.max(i,0)+o),q.attr("x2",0).attr("y2",i),z.attr("x",0).attr("y",Math.max(i,0)+o),T.attr("dy",".71em").style("text-anchor","middle"),E.attr("d","M"+w[0]+","+a+"V0H"+w[1]+"V"+a);break;case"top":n=bu,m.attr("y2",-u),y.attr("x2",0).attr("y2",-u),N.attr("y2",-i),C.attr("y",-(Math.max(i,0)+o)),q.attr("x2",0).attr("y2",-i),z.attr("x",0).attr("y",-(Math.max(i,0)+o)),T.attr("dy","0em").style("text-anchor","middle"),E.attr("d","M"+w[0]+","+-a+"V0H"+w[1]+"V"+-a);break;case"left":n=_u,m.attr("x2",-u),y.attr("x2",-u).attr("y2",0),N.attr("x2",-i),C.attr("x",-(Math.max(i,0)+o)),q.attr("x2",-i).attr("y2",0),z.attr("x",-(Math.max(i,0)+o)).attr("y",0),T.attr("dy",".32em").style("text-anchor","end"),E.attr("d","M"+-a+","+w[0]+"H0V"+w[1]+"H"+-a);break;case"right":n=_u,m.attr("x2",u),y.attr("x2",u).attr("y2",0),N.attr("x2",i),C.attr("x",Math.max(i,0)+o),q.attr("x2",i).attr("y2",0),z.attr("x",Math.max(i,0)+o).attr("y",0),T.attr("dy",".32em").style("text-anchor","start"),E.attr("d","M"+a+","+w[0]+"H0V"+w[1]+"H"+a)}if(e.ticks)x.call(n,A),_.call(n,k),b.call(n,k),m.call(n,A),y.call(n,k),v.call(n,k);else{var D=k.rangeBand()/2,j=function(n){return k(n)+D};x.call(n,j),_.call(n,j)}})}var t,e=ua.scale.linear(),r=lc,i=6,u=6,a=6,o=3,c=[10],l=null,f=0;return n.scale=function(t){return arguments.length?(e=t,n):e},n.orient=function(t){return arguments.length?(r=t in fc?t+"":lc,n):r},n.ticks=function(){return arguments.length?(c=arguments,n):c},n.tickValues=function(t){return arguments.length?(l=t,n):l},n.tickFormat=function(e){return arguments.length?(t=e,n):t},n.tickSize=function(t,e){if(!arguments.length)return i;var r=arguments.length-1;return i=+t,u=r>1?+e:i,a=r>0?+arguments[r]:i,n},n.tickPadding=function(t){return arguments.length?(o=+t,n):o},n.tickSubdivide=function(t){return arguments.length?(f=+t,n):f},n};var lc="bottom",fc={top:1,right:1,bottom:1,left:1};ua.svg.brush=function(){function n(u){u.each(function(){var u,a=ua.select(this),l=a.selectAll(".background").data([0]),s=a.selectAll(".extent").data([0]),h=a.selectAll(".resize").data(f,String);a.style("pointer-events","all").on("mousedown.brush",i).on("touchstart.brush",i),l.enter().append("rect").attr("class","background").style("visibility","hidden").style("cursor","crosshair"),s.enter().append("rect").attr("class","extent").style("cursor","move"),h.enter().append("g").attr("class",function(n){return"resize "+n}).style("cursor",function(n){return sc[n]}).append("rect").attr("x",function(n){return/[ew]$/.test(n)?-3:null}).attr("y",function(n){return/^[ns]/.test(n)?-3:null}).attr("width",6).attr("height",6).style("visibility","hidden"),h.style("display",n.empty()?"none":null),h.exit().remove(),o&&(u=Hi(o),l.attr("x",u[0]).attr("width",u[1]-u[0]),e(a)),c&&(u=Hi(c),l.attr("y",u[0]).attr("height",u[1]-u[0]),r(a)),t(a)})}function t(n){n.selectAll(".resize").attr("transform",function(n){return"translate("+s[+/e$/.test(n)][0]+","+s[+/^s/.test(n)][1]+")"})}function e(n){n.select(".extent").attr("x",s[0][0]),n.selectAll(".extent,.n>rect,.s>rect").attr("width",s[1][0]-s[0][0])}function r(n){n.select(".extent").attr("y",s[0][1]),n.selectAll(".extent,.e>rect,.w>rect").attr("height",s[1][1]-s[0][1])}function i(){function i(){var n=ua.event.changedTouches;
return n?ua.touches(y,n)[0]:ua.mouse(y)}function f(){ua.event.keyCode==32&&(E||(m=null,k[0]-=s[1][0],k[1]-=s[1][1],E=2),l())}function h(){ua.event.keyCode==32&&2==E&&(k[0]+=s[1][0],k[1]+=s[1][1],E=0,l())}function g(){var n=i(),u=!1;v&&(n[0]+=v[0],n[1]+=v[1]),E||(ua.event.altKey?(m||(m=[(s[0][0]+s[1][0])/2,(s[0][1]+s[1][1])/2]),k[0]=s[+(n[0]<m[0])][0],k[1]=s[+(n[1]<m[1])][1]):m=null),w&&p(n,o,0)&&(e(b),u=!0),S&&p(n,c,1)&&(r(b),u=!0),u&&(t(b),x({type:"brush",mode:E?"move":"resize"}))}function p(n,t,e){var r,i,a=Hi(t),o=a[0],c=a[1],l=k[e],f=s[1][e]-s[0][e];return E&&(o-=l,c-=f+l),r=Math.max(o,Math.min(c,n[e])),E?i=(r+=l)+f:(m&&(l=Math.max(o,Math.min(c,2*m[e]-r))),r>l?(i=r,r=l):i=l),s[0][e]!==r||s[1][e]!==i?(u=null,s[0][e]=r,s[1][e]=i,!0):void 0}function d(){g(),b.style("pointer-events","all").selectAll(".resize").style("display",n.empty()?"none":null),ua.select("body").style("cursor",null),A.on("mousemove.brush",null).on("mouseup.brush",null).on("touchmove.brush",null).on("touchend.brush",null).on("keydown.brush",null).on("keyup.brush",null),x({type:"brushend"}),l()}var m,v,y=this,M=ua.select(ua.event.target),x=a.of(y,arguments),b=ua.select(y),_=M.datum(),w=!/^(n|s)$/.test(_)&&o,S=!/^(e|w)$/.test(_)&&c,E=M.classed("extent"),k=i(),A=ua.select(oa).on("mousemove.brush",g).on("mouseup.brush",d).on("touchmove.brush",g).on("touchend.brush",d).on("keydown.brush",f).on("keyup.brush",h);if(E)k[0]=s[0][0]-k[0],k[1]=s[0][1]-k[1];else if(_){var N=+/w$/.test(_),q=+/^n/.test(_);v=[s[1-N][0]-k[0],s[1-q][1]-k[1]],k[0]=s[N][0],k[1]=s[q][1]}else ua.event.altKey&&(m=k.slice());b.style("pointer-events","none").selectAll(".resize").style("display",null),ua.select("body").style("cursor",M.style("cursor")),x({type:"brushstart"}),g(),l()}var u,a=h(n,"brushstart","brush","brushend"),o=null,c=null,f=hc[0],s=[[0,0],[0,0]];return n.x=function(t){return arguments.length?(o=t,f=hc[!o<<1|!c],n):o},n.y=function(t){return arguments.length?(c=t,f=hc[!o<<1|!c],n):c},n.extent=function(t){var e,r,i,a,l;return arguments.length?(u=[[0,0],[0,0]],o&&(e=t[0],r=t[1],c&&(e=e[0],r=r[0]),u[0][0]=e,u[1][0]=r,o.invert&&(e=o(e),r=o(r)),e>r&&(l=e,e=r,r=l),s[0][0]=0|e,s[1][0]=0|r),c&&(i=t[0],a=t[1],o&&(i=i[1],a=a[1]),u[0][1]=i,u[1][1]=a,c.invert&&(i=c(i),a=c(a)),i>a&&(l=i,i=a,a=l),s[0][1]=0|i,s[1][1]=0|a),n):(t=u||s,o&&(e=t[0][0],r=t[1][0],u||(e=s[0][0],r=s[1][0],o.invert&&(e=o.invert(e),r=o.invert(r)),e>r&&(l=e,e=r,r=l))),c&&(i=t[0][1],a=t[1][1],u||(i=s[0][1],a=s[1][1],c.invert&&(i=c.invert(i),a=c.invert(a)),i>a&&(l=i,i=a,a=l))),o&&c?[[e,i],[r,a]]:o?[e,r]:c&&[i,a])},n.clear=function(){return u=null,s[0][0]=s[0][1]=s[1][0]=s[1][1]=0,n},n.empty=function(){return o&&s[0][0]===s[1][0]||c&&s[0][1]===s[1][1]},ua.rebind(n,a,"on")};var sc={n:"ns-resize",e:"ew-resize",s:"ns-resize",w:"ew-resize",nw:"nwse-resize",ne:"nesw-resize",se:"nwse-resize",sw:"nesw-resize"},hc=[["n","e","s","w","nw","ne","se","sw"],["e","w"],["n","s"],[]];ua.time={};var gc=Date,pc=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];Su.prototype={getDate:function(){return this._.getUTCDate()},getDay:function(){return this._.getUTCDay()},getFullYear:function(){return this._.getUTCFullYear()},getHours:function(){return this._.getUTCHours()},getMilliseconds:function(){return this._.getUTCMilliseconds()},getMinutes:function(){return this._.getUTCMinutes()},getMonth:function(){return this._.getUTCMonth()},getSeconds:function(){return this._.getUTCSeconds()},getTime:function(){return this._.getTime()},getTimezoneOffset:function(){return 0},valueOf:function(){return this._.valueOf()},setDate:function(){dc.setUTCDate.apply(this._,arguments)},setDay:function(){dc.setUTCDay.apply(this._,arguments)},setFullYear:function(){dc.setUTCFullYear.apply(this._,arguments)},setHours:function(){dc.setUTCHours.apply(this._,arguments)},setMilliseconds:function(){dc.setUTCMilliseconds.apply(this._,arguments)},setMinutes:function(){dc.setUTCMinutes.apply(this._,arguments)},setMonth:function(){dc.setUTCMonth.apply(this._,arguments)},setSeconds:function(){dc.setUTCSeconds.apply(this._,arguments)},setTime:function(){dc.setTime.apply(this._,arguments)}};var dc=Date.prototype,mc="%a %b %e %X %Y",vc="%m/%d/%Y",yc="%H:%M:%S",Mc=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],xc=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],bc=["January","February","March","April","May","June","July","August","September","October","November","December"],_c=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];ua.time.year=Eu(function(n){return n=ua.time.day(n),n.setMonth(0,1),n},function(n,t){n.setFullYear(n.getFullYear()+t)},function(n){return n.getFullYear()}),ua.time.years=ua.time.year.range,ua.time.years.utc=ua.time.year.utc.range,ua.time.day=Eu(function(n){var t=new gc(1970,0);return t.setFullYear(n.getFullYear(),n.getMonth(),n.getDate()),t},function(n,t){n.setDate(n.getDate()+t)},function(n){return n.getDate()-1}),ua.time.days=ua.time.day.range,ua.time.days.utc=ua.time.day.utc.range,ua.time.dayOfYear=function(n){var t=ua.time.year(n);return Math.floor((n-t-(n.getTimezoneOffset()-t.getTimezoneOffset())*6e4)/864e5)},pc.forEach(function(n,t){n=n.toLowerCase(),t=7-t;var e=ua.time[n]=Eu(function(n){return(n=ua.time.day(n)).setDate(n.getDate()-(n.getDay()+t)%7),n},function(n,t){n.setDate(n.getDate()+Math.floor(t)*7)},function(n){var e=ua.time.year(n).getDay();return Math.floor((ua.time.dayOfYear(n)+(e+t)%7)/7)-(e!==t)});ua.time[n+"s"]=e.range,ua.time[n+"s"].utc=e.utc.range,ua.time[n+"OfYear"]=function(n){var e=ua.time.year(n).getDay();return Math.floor((ua.time.dayOfYear(n)+(e+t)%7)/7)}}),ua.time.week=ua.time.sunday,ua.time.weeks=ua.time.sunday.range,ua.time.weeks.utc=ua.time.sunday.utc.range,ua.time.weekOfYear=ua.time.sundayOfYear,ua.time.format=function(n){function t(t){for(var r,i,u,a=[],o=-1,c=0;++o<e;)n.charCodeAt(o)===37&&(a.push(n.substring(c,o)),(i=qc[r=n.charAt(++o)])!=null&&(r=n.charAt(++o)),(u=Tc[r])&&(r=u(t,null==i?"e"===r?" ":"0":i)),a.push(r),c=o+1);return a.push(n.substring(c,o)),a.join("")}var e=n.length;return t.parse=function(t){var e={y:1900,m:0,d:1,H:0,M:0,S:0,L:0},r=Au(e,n,t,0);if(r!=t.length)return null;"p"in e&&(e.H=e.H%12+e.p*12);var i=new gc;return i.setFullYear(e.y,e.m,e.d),i.setHours(e.H,e.M,e.S,e.L),i},t.toString=function(){return n},t};var wc=Nu(Mc),Sc=Nu(xc),Ec=Nu(bc),kc=qu(bc),Ac=Nu(_c),Nc=qu(_c),qc={"-":"",_:" ",0:"0"},Tc={a:function(n){return xc[n.getDay()]},A:function(n){return Mc[n.getDay()]},b:function(n){return _c[n.getMonth()]},B:function(n){return bc[n.getMonth()]},c:ua.time.format(mc),d:function(n,t){return Tu(n.getDate(),t,2)},e:function(n,t){return Tu(n.getDate(),t,2)},H:function(n,t){return Tu(n.getHours(),t,2)},I:function(n,t){return Tu(n.getHours()%12||12,t,2)},j:function(n,t){return Tu(1+ua.time.dayOfYear(n),t,3)},L:function(n,t){return Tu(n.getMilliseconds(),t,3)},m:function(n,t){return Tu(n.getMonth()+1,t,2)},M:function(n,t){return Tu(n.getMinutes(),t,2)},p:function(n){return n.getHours()>=12?"PM":"AM"},S:function(n,t){return Tu(n.getSeconds(),t,2)},U:function(n,t){return Tu(ua.time.sundayOfYear(n),t,2)},w:function(n){return n.getDay()},W:function(n,t){return Tu(ua.time.mondayOfYear(n),t,2)},x:ua.time.format(vc),X:ua.time.format(yc),y:function(n,t){return Tu(n.getFullYear()%100,t,2)},Y:function(n,t){return Tu(n.getFullYear()%1e4,t,4)},Z:$u,"%":function(){return"%"}},Cc={a:Cu,A:zu,b:Du,B:ju,c:Lu,d:Uu,e:Uu,H:Iu,I:Iu,L:Zu,m:Yu,M:Vu,p:Bu,S:Xu,x:Fu,X:Hu,y:Ru,Y:Pu},zc=/^\s*\d+/,Dc=ua.map({am:0,pm:1});ua.time.format.utc=function(n){function t(n){try{gc=Su;var t=new gc;return t._=n,e(t)}finally{gc=Date}}var e=ua.time.format(n);return t.parse=function(n){try{gc=Su;var t=e.parse(n);return t&&t._}finally{gc=Date}},t.toString=e.toString,t};var jc=ua.time.format.utc("%Y-%m-%dT%H:%M:%S.%LZ");ua.time.format.iso=Date.prototype.toISOString&&+new Date("2000-01-01T00:00:00.000Z")?Ju:jc,Ju.parse=function(n){var t=new Date(n);return isNaN(t)?null:t},Ju.toString=jc.toString,ua.time.second=Eu(function(n){return new gc(Math.floor(n/1e3)*1e3)},function(n,t){n.setTime(n.getTime()+Math.floor(t)*1e3)},function(n){return n.getSeconds()}),ua.time.seconds=ua.time.second.range,ua.time.seconds.utc=ua.time.second.utc.range,ua.time.minute=Eu(function(n){return new gc(Math.floor(n/6e4)*6e4)},function(n,t){n.setTime(n.getTime()+Math.floor(t)*6e4)},function(n){return n.getMinutes()}),ua.time.minutes=ua.time.minute.range,ua.time.minutes.utc=ua.time.minute.utc.range,ua.time.hour=Eu(function(n){var t=n.getTimezoneOffset()/60;return new gc((Math.floor(n/36e5-t)+t)*36e5)},function(n,t){n.setTime(n.getTime()+Math.floor(t)*36e5)},function(n){return n.getHours()}),ua.time.hours=ua.time.hour.range,ua.time.hours.utc=ua.time.hour.utc.range,ua.time.month=Eu(function(n){return n=ua.time.day(n),n.setDate(1),n},function(n,t){n.setMonth(n.getMonth()+t)},function(n){return n.getMonth()}),ua.time.months=ua.time.month.range,ua.time.months.utc=ua.time.month.utc.range;var Lc=[1e3,5e3,15e3,3e4,6e4,3e5,9e5,18e5,36e5,108e5,216e5,432e5,864e5,1728e5,6048e5,2592e6,7776e6,31536e6],Fc=[[ua.time.second,1],[ua.time.second,5],[ua.time.second,15],[ua.time.second,30],[ua.time.minute,1],[ua.time.minute,5],[ua.time.minute,15],[ua.time.minute,30],[ua.time.hour,1],[ua.time.hour,3],[ua.time.hour,6],[ua.time.hour,12],[ua.time.day,1],[ua.time.day,2],[ua.time.week,1],[ua.time.month,1],[ua.time.month,3],[ua.time.year,1]],Hc=[[ua.time.format("%Y"),Ht],[ua.time.format("%B"),function(n){return n.getMonth()}],[ua.time.format("%b %d"),function(n){return n.getDate()!=1}],[ua.time.format("%a %d"),function(n){return n.getDay()&&n.getDate()!=1}],[ua.time.format("%I %p"),function(n){return n.getHours()}],[ua.time.format("%I:%M"),function(n){return n.getMinutes()}],[ua.time.format(":%S"),function(n){return n.getSeconds()}],[ua.time.format(".%L"),function(n){return n.getMilliseconds()}]],Pc=ua.scale.linear(),Rc=Wu(Hc);Fc.year=function(n,t){return Pc.domain(n.map(na)).ticks(t).map(Qu)},ua.time.scale=function(){return Gu(ua.scale.linear(),Fc,Rc)};var Oc=Fc.map(function(n){return[n[0].utc,n[1]]}),Yc=[[ua.time.format.utc("%Y"),Ht],[ua.time.format.utc("%B"),function(n){return n.getUTCMonth()}],[ua.time.format.utc("%b %d"),function(n){return n.getUTCDate()!=1}],[ua.time.format.utc("%a %d"),function(n){return n.getUTCDay()&&n.getUTCDate()!=1}],[ua.time.format.utc("%I %p"),function(n){return n.getUTCHours()}],[ua.time.format.utc("%I:%M"),function(n){return n.getUTCMinutes()}],[ua.time.format.utc(":%S"),function(n){return n.getUTCSeconds()}],[ua.time.format.utc(".%L"),function(n){return n.getUTCMilliseconds()}]],Uc=Wu(Yc);return Oc.year=function(n,t){return Pc.domain(n.map(ea)).ticks(t).map(ta)},ua.time.scale.utc=function(){return Gu(ua.scale.linear(),Oc,Uc)},ua.text=st(function(n){return n.responseText}),ua.json=function(n,t){return ht(n,"application/json",ra,t)},ua.html=function(n,t){return ht(n,"text/html",ia,t)},ua.xml=st(function(n){return n.responseXML}),ua}();


/* **********************************************
     Begin queue.v1.min.js
********************************************** */

(function(){function n(n){function t(){for(;f=a<c.length&&n>p;){var u=a++,t=c[u],r=l.call(t,1);r.push(e(u)),++p,t[0].apply(null,r)}}function e(n){return function(u,l){--p,null==d&&(null!=u?(d=u,a=s=0/0,r()):(c[n]=l,--s?f||t():r()))}}function r(){null!=d?v(d):i?v(d,c):v.apply(null,[d].concat(c))}var o,f,i,c=[],a=0,p=0,s=0,d=null,v=u;return n||(n=1/0),o={defer:function(){return d||(c.push(arguments),++s,t()),o},await:function(n){return v=n,i=!1,s||r(),o},awaitAll:function(n){return v=n,i=!0,s||r(),o}}}function u(){}"undefined"==typeof module?self.queue=n:module.exports=n,n.version="1.0.4";var l=[].slice})();


/* **********************************************
     Begin topojson.v1.min.js
********************************************** */

topojson=function(){function t(t,e){function n(e){var n=t.arcs[e],r=n[0],o=[0,0];return n.forEach(function(t){o[0]+=t[0],o[1]+=t[1]}),[r,o]}var r={},o={},a={};e.forEach(function(t){var e=n(t);(r[e[0]]||(r[e[0]]=[])).push(t),(r[e[1]]||(r[e[1]]=[])).push(~t)}),e.forEach(function(t){var e,r,i=n(t),u=i[0],c=i[1];if(e=a[u])if(delete a[e.end],e.push(t),e.end=c,r=o[c]){delete o[r.start];var s=r===e?e:e.concat(r);o[s.start=e.start]=a[s.end=r.end]=s}else if(r=a[c]){delete o[r.start],delete a[r.end];var s=e.concat(r.map(function(t){return~t}).reverse());o[s.start=e.start]=a[s.end=r.start]=s}else o[e.start]=a[e.end]=e;else if(e=o[c])if(delete o[e.start],e.unshift(t),e.start=u,r=a[u]){delete a[r.end];var f=r===e?e:r.concat(e);o[f.start=r.start]=a[f.end=e.end]=f}else if(r=o[u]){delete o[r.start],delete a[r.end];var f=r.map(function(t){return~t}).reverse().concat(e);o[f.start=r.end]=a[f.end=e.end]=f}else o[e.start]=a[e.end]=e;else if(e=o[u])if(delete o[e.start],e.unshift(~t),e.start=c,r=a[c]){delete a[r.end];var f=r===e?e:r.concat(e);o[f.start=r.start]=a[f.end=e.end]=f}else if(r=o[c]){delete o[r.start],delete a[r.end];var f=r.map(function(t){return~t}).reverse().concat(e);o[f.start=r.end]=a[f.end=e.end]=f}else o[e.start]=a[e.end]=e;else if(e=a[c])if(delete a[e.end],e.push(~t),e.end=u,r=a[u]){delete o[r.start];var s=r===e?e:e.concat(r);o[s.start=e.start]=a[s.end=r.end]=s}else if(r=o[u]){delete o[r.start],delete a[r.end];var s=e.concat(r.map(function(t){return~t}).reverse());o[s.start=e.start]=a[s.end=r.start]=s}else o[e.start]=a[e.end]=e;else e=[t],o[e.start=u]=a[e.end=c]=e});var i=[];for(var u in a)i.push(a[u]);return i}function e(e,n,r){function a(t){0>t&&(t=~t),(l[t]||(l[t]=[])).push(f)}function i(t){t.forEach(a)}function u(t){t.forEach(i)}function c(t){t.type==="GeometryCollection"?t.geometries.forEach(c):t.type in d&&(f=t,d[t.type](t.arcs))}var s=[];if(arguments.length>1){var f,l=[],d={LineString:i,MultiLineString:u,Polygon:u,MultiPolygon:function(t){t.forEach(u)}};c(n),l.forEach(arguments.length<3?function(t,e){s.push(e)}:function(t,e){r(t[0],t[t.length-1])&&s.push(e)})}else for(var p=0,h=e.arcs.length;h>p;++p)s.push(p);return o(e,{type:"MultiLineString",arcs:t(e,s)})}function n(t,e){return e.type==="GeometryCollection"?{type:"FeatureCollection",features:e.geometries.map(function(e){return r(t,e)})}:r(t,e)}function r(t,e){var n={type:"Feature",id:e.id,properties:e.properties||{},geometry:o(t,e)};return e.id==null&&delete n.id,n}function o(t,e){function n(t,e){e.length&&e.pop();for(var n,r=h[0>t?~t:t],o=0,i=r.length,u=0,c=0;i>o;++o)e.push([(u+=(n=r[o])[0])*f+d,(c+=n[1])*l+p]);0>t&&a(e,i)}function r(t){return[t[0]*f+d,t[1]*l+p]}function o(t){for(var e=[],r=0,o=t.length;o>r;++r)n(t[r],e);return e.length<2&&e.push(e[0]),e}function i(t){for(var e=o(t);e.length<4;)e.push(e[0]);return e}function u(t){return t.map(i)}function c(t){var e=t.type;return"GeometryCollection"===e?{type:e,geometries:t.geometries.map(c)}:e in v?{type:e,coordinates:v[e](t)}:null}var s=t.transform,f=s.scale[0],l=s.scale[1],d=s.translate[0],p=s.translate[1],h=t.arcs,v={Point:function(t){return r(t.coordinates)},MultiPoint:function(t){return t.coordinates.map(r)},LineString:function(t){return o(t.arcs)},MultiLineString:function(t){return t.arcs.map(o)},Polygon:function(t){return u(t.arcs)},MultiPolygon:function(t){return t.arcs.map(u)}};return c(e)}function a(t,e){for(var n,r=t.length,o=r-e;o<--r;)n=t[o],t[o++]=t[r],t[r]=n}function i(t,e){for(var n=0,r=t.length;r>n;){var o=n+r>>>1;t[o]<e?n=o+1:r=o}return n}function u(t){function e(t,e){t.forEach(function(t){0>t&&(t=~t);var n=o[t]||(o[t]=[]);n[e]||(n.forEach(function(t){var n,r;r=i(n=a[e],t),n[r]!==t&&n.splice(r,0,t),r=i(n=a[t],e),n[r]!==e&&n.splice(r,0,e)}),n[e]=e)})}function n(t,n){t.forEach(function(t){e(t,n)})}function r(t,e){t.type==="GeometryCollection"?t.geometries.forEach(function(t){r(t,e)}):t.type in u&&u[t.type](t.arcs,e)}var o=[],a=t.map(function(){return[]}),u={LineString:e,MultiLineString:n,Polygon:n,MultiPolygon:function(t,e){t.forEach(function(t){n(t,e)})}};return t.forEach(r),a}return{version:"1.1.2",mesh:e,feature:n,neighbors:u}}();

/* **********************************************
     Begin non-profit.js
********************************************** */

//@codekit-prepend "d3.v3.min.js"
//@codekit-prepend "queue.v1.min.js"
//@codekit-prepend "topojson.v1.min.js"

$('#myTab a').click(function (e) {
    e.preventDefault();
    $(this).tab('show');
});

if ($(window).width() < 768) {
    var scale = [9000],
        translate = [150, 160],
        symbolRange = [0, 40],
        legendRange = [0, 230],
        fhaKey = "(240, 135)",
        rKey = "(270, 105)",
        xLegend = 210,
        yLegend = 350,
        width = 350,
        height = 450,
        symbolText = 55,
        xCircle = 60,
        yCircle = 410,
        circleRadius = 45;
} else {
    var scale = [12000],
        translate = [175, 190],
        symbolRange = [0, 50],
        legendRange = [0, 325],
        fhaKey = "(320, 135)",
        rKey = "(320, 165)",
        height = 600,
        xLegend = 260,
        yLegend = 435,
        symbolText = 65,
        xCircle = 80,
        yCircle = 520,
        circleRadius = 60;
}

if (Modernizr.touch) {
        touchClick="mouseover";
    } else {
        touchClick="click";
    }

var width = width;

var radius = d3.scale.sqrt()
    .domain([0, 1.3e6])
    .range([0, circleRadius]);

var townInfo = d3.select("div#vcf-town-info");
var mainInfo = d3.select("div#vcf-info-main");
var countyInfo = d3.select("div#vcf-county-info");
var resetData = d3.selectAll("p.vcf-reset");

resetData.on(touchClick, function() {
    resetData.style("display", "none");
    townInfo.style("display", "none");
    countyInfo.style("display", "none");
    mainInfo.style("display", "block");

});

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

// Define scale to sort data values into color buckets
var color = d3.scale.threshold()
    .domain([1000, 5000, 7500, 10000, 20000, 30000, 50000, 75000, 100000])
    .range(["#fff7ec","#fee8c8","#fdd49e","#fdbb84","#fc8d59","#ef6548","#d7301f","#b30000","#7f0000"]);

// Legend Stuff

var y = d3.scale.sqrt()
    .domain([0, 100000])
    .range([0,325]);

var yAxis = d3.svg.axis()
    .scale(y)
    .tickValues(color.domain())
    .orient("right");

var countyDict = {
    1: ['Addision', 33817],
    3: ['Bennington', 47826],
    5: ['Caledonia', 48022],
    7: ['Chittenden', 61113],
    9: ['Essex', 4275],
    11: ['Franklin', 20560],
    13: ['Grand Isle', 0],
    15: ['Lamoille', 27790],
    17: ['Orange', 120189],
    19: ['Orleans', 25075],
    21: ['Rutland', 252309],
    23: ['Washington', 1207202],
    25: ['Windham', 419385],
    27: ['Windsor', 1066595]
};

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
    .defer(d3.json, "data/non-profit/big-np.json")
    .defer(d3.csv, "data/non-profit/vpr-irene-20130823-npMap.csv")
    .defer(d3.csv, "data/non-profit/vpr-vcf-20130703-org.csv")
    .await(ready);

function ready(error, vt, centroid, data, vcfData) {
    var townArray = [];
    var jsonArray = [];

    for (i = 0; i < data.length; i++) {
        var dataTown = data[i].town;
        var dataRotary = parseFloat(data[i].rotary);
        var dataEfficiency = parseFloat(data[i].efficiency);
        var dataFlood = parseFloat(data[i].flood);
        var dataPreservation = parseFloat(data[i].preservation);
        townArray.push(data[i].town.toUpperCase());

        for (j = 0; j < vt.objects.vt_towns.geometries.length; j++) {
            var jsonTown = vt.objects.vt_towns.geometries[j].properties.town;
            jsonArray.push(jsonTown);

            if (dataTown.toUpperCase() == jsonTown) {
                vt.objects.vt_towns.geometries[j].properties.rotary = dataRotary;
                vt.objects.vt_towns.geometries[j].properties.efficiency = dataEfficiency;
                vt.objects.vt_towns.geometries[j].properties.flood = dataFlood;
                vt.objects.vt_towns.geometries[j].properties.preservation = dataPreservation;
                break;
            }
        }
    }

    for (i = 1; i < 28; i +=2) {
        var vdrf = countyDict[i];

        for (j = 0; j < vt.objects.vt_towns.geometries.length; j++) {
            var jsonCounty = vt.objects.vt_towns.geometries[j].properties.county;
            if (i == jsonCounty) {
                vt.objects.vt_towns.geometries[j].properties.vdrf = vdrf[1];
            }
        }
    }

    var vermont = topojson.feature(vt, vt.objects.vt_towns);


    var g = svg.append("g")
        .attr("class", "key")
        .attr("transform", ("translate" + rKey))
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

    var towns;
    var org;
    function newMap() {
        var id;

        svg.append("path")
            .datum(vermont)
            .attr("d", path)
            .style("stroke", "#999")
            .style("stroke-width", "2px");


        towns = svg.selectAll("path.subunit")
            .data(topojson.feature(vt, vt.objects.vt_towns).features);

        towns.enter().append("path")
            .attr("class", "subunit")
            .attr("d", path)
            .style("stroke", "#ccc")
            .style("stroke-width", "1px")
            .style("fill", "#ddd");

        svg.append("path")
            .datum(topojson.feature(vt, vt.objects.lake))
            .attr("d", path)
            .style("stroke", "#6ba3eb")
            .style("stroke-width", "1px")
            .style("fill", "#b6d2f5");
    }

    newMap();
    symbolMap('vdrf');
    var organization = 'vdrf';

    function symbolMap(organization) {
        d3.selectAll("path.subunit")
            .style("fill", "#ddd")
            .on("mouseout", "")
            .on("mouseover", "");
        
        d3.selectAll("g")
            .style("display", "none");

        d3.selectAll(".symbol")
            .remove();

        var circleLegend = [
            {radius: radius(1.2e6), cx: xLegend, cy: yLegend},
            {radius: radius(2e5), cx: (xLegend + 32), cy: (yLegend - 90)},
            {radius: radius(5e4), cx: (xLegend + 43), cy: (yLegend - 135)},
            {radius: radius(1e4), cx: (xLegend + 50), cy: (yLegend - 165)}];

        var circleAmount = [
            {text: "$1,200,000", x: (xLegend + symbolText), y: (circleLegend[0].cy + 5)},
            {text: "$200,000", x: (xLegend + symbolText), y: (circleLegend[1].cy + 5)},
            {text: "$50,000", x: (xLegend + symbolText), y: (circleLegend[2].cy + 5)},
            {text: "$10,000", x: (xLegend + symbolText), y: (circleLegend[3].cy + 5)}];

        svg.selectAll("circle.guide")
            .data(circleLegend)
            .enter().append("circle")
                .attr("class", "guide symbol-remove")
                .attr("cx", function (d) { return d.cx; })
                .attr("cy", function (d) { return d.cy; })
                .attr("r", function (d) { return d.radius; });

        svg.selectAll("text.legend")
            .data(circleAmount)
            .enter().append("text")
                .attr("class", "legend symbol-remove")
                .attr("x", function (d) { return d.x; })
                .attr("y", function (d) { return d.y; })
                .text(function (d) { return d.text; });

        svg.selectAll(".symbol")
            .data(centroid.features.sort(function(a,b) {
                if (organization === 'vcf') {
                    return b.properties.vcf - a.properties.vcf;
                } else {
                    return b.properties.vdrf - a.properties.vdrf;
                }
            }))
            .enter().append("path")
                .attr("class", function(d) {
                    return ("symbol " + d.properties.unit);
                })
                .attr("d", path.pointRadius(function(d) {
                    if (organization === 'vcf') {
                        return radius(d.properties.vcf);
                    } else {
                        return radius(d.properties.vdrf);
                    }
                }))
                .style("fill", function(d) {
                    if (d.properties.unit === 'town') {
                        return "#e77565";
                    } else {
                        return "steelblue";
                    }
                });

        if (organization === 'vcf') {
            resetData.style("display", "none");
            townInfo.style("display", "none");
            countyInfo.style("display", "none");
            mainInfo.style("display", "block");

            svg.selectAll(".symbol")
                .on(touchClick, function(d) {
                    resetData.style("display", "block");

                if (d.properties.unit === 'town') {
                    var tableTotal = 0;
                    var tableArray = [];
                    var rowCount = 0;

                    for (var i=0; i < vcfData.length; i++) {
                        if (d.properties.name === vcfData[i].city) {
                            tableArray.push([
                                vcfData[i].organization,
                                toUSD(vcfData[i].amount)
                            ]);
                            tableTotal += parseFloat(vcfData[i].amount);
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
                    d3.select("#vcf-table").style("display", "table");

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
                        .text(toUSD(d.properties.vcf));
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
                    .text(d.properties.name + " - " + toUSD(d.properties.vcf));
            })
            .on("mouseout", function(d) {
                d3.select("#tooltip").remove();

                d3.select(this)
                    .style("stroke", "#fff")
                    .style("stroke-width", "1px")
                    .style("fill-opacity", ".8");
            });


            svg.append("circle")
                .attr("class", "vcf-guide symbol-remove")
                .attr("cx", xCircle)
                .attr("cy", yCircle)
                .attr("r", "8")
                .style("fill", "steelblue")
                .on("mouseover", function(d) {
                    svg.selectAll(".town")
                        .style("display", "none");
                })
                .on("mouseout", function(d) {
                    svg.selectAll(".town")
                        .style("display", "block");
                });

            svg.append("text")
                .attr("class", "vcf-legend symbol-remove")
                .attr("x", xCircle + 15)
                .attr("y", yCircle + 4)
                .style("font-size", "12px")
                .text("Farmers");

            svg.append("circle")
                .attr("class", "vcf-guide symbol-remove")
                .attr("cx", xCircle + 80)
                .attr("cy", yCircle)
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
                .attr("class", "vcf-legend symbol-remove")
                .attr("x", xCircle + 95)
                .attr("y", yCircle + 4)
                .style("font-size", "12px")
                .text("Organizations");

            svg.append("text")
                .attr("class", "hover-text symbol-remove")
                .attr("x", xCircle - 3)
                .attr("y", yCircle + 30)
                .style("font-size", "11px")
                .style("color", "#777777")
                .text("Hover over circle to see category");

        } else {

            d3.selectAll("text.vcf-legend")
                .remove();

            d3.selectAll("circle.vcf-guide")
                .remove();

            d3.selectAll("text.hover-text")
                .remove();

            svg.selectAll(".symbol")
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
                        .text(d.properties.name + " - " + toUSD(d.properties.vdrf));
                })
                .on("mouseout", function(d) {
                    d3.select("#tooltip").remove();

                    d3.select(this)
                        .style("stroke", "#fff")
                        .style("stroke-width", "1px")
                        .style("fill-opacity", ".8");
                });
        }

        d3.select("div.np-map").selectAll("div.map-explanation")
            .style("display", "none");

        var id = ("div#" + organization + "-additional");

        d3.select("div.np-map").select(id)
            .style("display", "block");
    }

    function newMapOrg(organization) {
        d3.selectAll("path.subunit")
            .style("fill", function(d) {
                if (organization == 'rotary') {
                    org = d.properties.rotary;
                } else if (organization == 'efficiency') {
                    org = d.properties.efficiency;
                } else if (organization == 'flood') {
                    org = d.properties.flood;
                } else if (organization == 'preservation') {
                    org = d.properties.preservation;
                } else if (organization == 'vdrf') {
                    org = d.properties.vdrf;
                }

                if (org) {
                    return color(org);
                } else {
                    return "#ddd";
                }
            });

        d3.selectAll("path.symbol")
            .remove();

        d3.selectAll(".symbol-remove")
            .remove();

        d3.selectAll("g")
            .style("display", "block");

        d3.select("div.np-map").selectAll("div.map-explanation")
            .style("display", "none");


        var id = ("div#" + organization + "-additional");

        d3.select("div.np-map").select(id)
            .style("display", "block");

        towns.on("mouseover", function(d) {
            var xPosition = d3.mouse(this)[0];
            var yPosition = d3.mouse(this)[1] - 20;

            if (organization == 'rotary') {
                org = d.properties.rotary;
            } else if (organization == 'efficiency') {
                org = d.properties.efficiency;
            } else if (organization == 'flood') {
                org = d.properties.flood;
            } else if (organization == 'preservation') {
                org = d.properties.preservation;
            } else if (organization == 'vdrf') {
                org = d.properties.vdrf;
            }

            svg.append("text")
                .attr("id", "tooltip")
                .attr("x", function(d) {
                    if (xPosition < 100) {
                        return xPosition + 60;
                    } else {
                        return xPosition;
                    }})
                .attr("y", function(d) {
                    if (yPosition < 100) {
                        return yPosition + 50;
                    } else {
                        return yPosition;
                    }})
                .attr("text-anchor", "middle")
                .attr("font-family", "sans-serif")
                .attr("font-size", "11px")
                .attr("font-weight", "bold")
                .attr("fill", "black")
                .text(function() {
                    if (organization == 'vdrf' || organization === 'vcf') {
                        return (countyDict[d.properties.county][0] + ' County - ' + toUSD(org));
                    } else {
                        return (d.properties.town + ' - ' + toUSD(org));
                    }
                });


            d3.select(this)
                .style("fill", "#509e2f");
                })
                .on("mouseout", function(d) {
                    d3.select("#tooltip").remove();

                    d3.select(this)
                    .transition()
                    .duration(250)
                    .style("fill", function(d) {
                        if (organization == 'rotary') {
                            org = d.properties.rotary;
                        } else if (organization == 'efficiency') {
                            org = d.properties.efficiency;
                        } else if (organization == 'flood') {
                            org = d.properties.flood;
                        } else if (organization == 'preservation') {
                            org = d.properties.preservation;
                        } else {
                            org = 0;
                        }

                        if (org) {
                            return color(org);
                        } else {
                            return "#ddd";
                        }
                    });
                });

    }

    d3.selectAll("ul.nav-tabs li")
        .on("click", function (d) {
            organization = d3.select(this).attr("id").toLowerCase();
            if (organization === 'vcf' || organization === 'vdrf') {
                symbolMap(organization);
            } else {
                newMapOrg(organization);
            }
        });

}


