var levelsFilter = require('levels-filter');

var svgLevelsFactory = (function(){

	var svgNS = "http://www.w3.org/2000/svg";
	var id = 0;

	function createFEFilter(type) {
		var feFunc = document.createElementNS(svgNS, type);
		feFunc.setAttribute('type','table');
		feFunc.setAttribute('tableValues','1.0 0.0');
		return feFunc;
	}

	var filterProto = {
		_init: _init,
		_createFilter: _createFilter,
		compose: compose,
		setLevelValues: setLevelValues
	}

	Object.defineProperty(filterProto, 'gamma', {
		get: function() { return this._filterLevels.gamma; },
  		set: function(newValue) { this._filterLevels.gamma = newValue; }
	})

	Object.defineProperty(filterProto, 'inputBlack', {
		get: function() { return this._filterLevels.inputBlack; },
  		set: function(newValue) { this._filterLevels.inputBlack = newValue; }
	})

	Object.defineProperty(filterProto, 'inputWhite', {
		get: function() { return this._filterLevels.inputWhite; },
  		set: function(newValue) { this._filterLevels.inputWhite = newValue; }
	})

	Object.defineProperty(filterProto, 'outputBlack', {
		get: function() { return this._filterLevels.outputBlack; },
  		set: function(newValue) { this._filterLevels.outputBlack = newValue; }
	})

	Object.defineProperty(filterProto, 'outputWhite', {
		get: function() { return this._filterLevels.outputWhite; },
  		set: function(newValue) { this._filterLevels.outputWhite = newValue; }
	})

	Object.defineProperty(filterProto, 'values', {
		get: function() { return this._filterLevels.getLevelValues(); }
	})

	Object.defineProperty(filterProto, 'filter', {
		get: function() { if(!this._filter){this._createFilter()} return this._filter; },
  		set: function(newValue) { this._filter = newValue; }
	})

	function _createFilter(){
		var filter = document.createElementNS(svgNS, 'filter');
		filter.setAttribute('id',this.id);
		filter.setAttribute('x','0');
		filter.setAttribute('y','0');
		filter.setAttribute('width','100%');
		filter.setAttribute('height','100%');
		this._filter = filter;
	}

	function _init(color) {
		var feFunc;
		if(color === 'red' || color === 'r'){
			feFunc = createFEFilter('feFuncR');
			this._feComponentTransfer.appendChild(feFunc);
			this._children.push(feFunc);
		} else if(color === 'green' || color === 'g'){
			feFunc = createFEFilter('feFuncG');
			this._feComponentTransfer.appendChild(feFunc);
			this._children.push(feFunc);
		} else if(color === 'blue' || color === 'b'){
			feFunc = createFEFilter('feFuncB');
			this._feComponentTransfer.appendChild(feFunc);
			this._children.push(feFunc);
		}  else if(color === 'alpha' || color === 'a'){
			feFunc = createFEFilter('feFuncA');
			this._feComponentTransfer.appendChild(feFunc);
			this._children.push(feFunc);
		} else if(color === 'rgb'){
			feFunc = createFEFilter('feFuncR');
			this._feComponentTransfer.appendChild(feFunc);
			this._children.push(feFunc);
			feFunc = createFEFilter('feFuncG');
			this._feComponentTransfer.appendChild(feFunc);
			this._children.push(feFunc);
			feFunc = createFEFilter('feFuncB');
			this._feComponentTransfer.appendChild(feFunc);
			this._children.push(feFunc);
		}
		this._feComponentTransfer.setAttribute('color-interpolation-filters','sRGB');
	}

	function compose() {
		if(!this._filter){
			this.createFilter();
		}
		this._filter.appendChild(this._feComponentTransfer);
		var tableValues = this._filterLevels.getTableValues();
		var i, len = tableValues.length;
		for(i = 0; i < len; i += 1) {
			tableValues[i] = tableValues[i].toFixed(8);
		}
		var tableValuesString = tableValues.join(' ')
		len = this._children.length;
		for(i = 0; i < len; i += 1) {
			this._children[i].setAttribute('tableValues', tableValuesString);
		}
		return this._filter;
	}

	function setLevelValues(values) {
		this._filterLevels.setLevelValues(values);
	}

	return function(color){
		var filterLevels = levelsFilter();
		var filterInstance = Object.create(filterProto, {
			id: {
				value: 'levels_filter_' + ++id
			},
			_filterLevels: {
				value: filterLevels
			},
			_children: {
				value: []
			},
			_feComponentTransfer: {
				value: document.createElementNS(svgNS, 'feComponentTransfer')
			}
		});
		filterInstance._init(color);
		return filterInstance;
	}
}())

if (typeof module !== 'undefined' && 'exports' in module) {
	module.exports = svgLevelsFactory;
}