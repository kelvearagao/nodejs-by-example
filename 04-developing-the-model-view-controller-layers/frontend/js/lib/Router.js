/**
 * Router
 *
 */

module.exports = function() {
	return {
		// Array de rotas e suas respectivas ações
		routes : [],

		// Adiciona a rota e sua respectiva ação
		add: function(path, handler) {
			if(typeof path === 'function') {
				handler = path;
				path =  '';
			}

			this.routes.push({
				path: path,
				handler: handler
			});

			return this;
		},

		// Verifica se a rota combina
		check: function(f, params) {
			var fragment, vars;

			if(typeof f !== 'undefined') {
				fragment = f.replace(/^\//, ''));
			} else {
				fragment = this.getFragment();
			}

			// Passa por cada rota
			for(var i=0; i<this.routes.length; i++) {
				var match, path = this.routes[i].path;

				// separa o path e as variáveis
				path = path.replace(/^\//, '');
				vars = path.replace(/:[^\s/]+/g);

				// Verifica se a rota existe
				var r = new RegExp('^' + path.replace(/:[^\s/]+g, '([\\w-]+)'));
				match = fragment.match(r);

				if(match) {
					match.shift();
					var matchObj = {};

					if(vars) {
						for(var j=0; j<vars.length; j++) {
							var v = vars[j];
							matchObj[v.substr(1, v.length)] = match[j];
						}
					}

					this.routes[i].handler.apply({}, (params || []).concat([matchObj]));

					return this;
				}
			}

			return false;
		},

		getFragment: function() {
			var fragment = '';
			
			fragment = this.clearSlashes(decodeURI(window.location.pathname + location.search));
			fragment = fragment.replace(/\?(.*)$/, '');
			fragment = this.root !== '/' ? fragment.replace(this.root, '') : fragment;

			return this.clearSlashes(fragment);
		},

		clearSlashes: function(path) {
			return path.toString().replace(/\/$/, '').replace(/^\//, '');
		},

		listen: function() {
			var self = this;
			var current = self.getFragment();
			
			var fn = function() {
				if(current !== self.getFragment()) {
					current = self.getFragment();
					self.check(current);
				}
			}

			clearInterval(this.interval);

			this.interval = setInterval(fn, 50);

			return this;
		},

		navigate: function(path) {
			path = path ? path :  '';

			// http://diveintohtml5.info/history.html
			history.pushState(null, null, this.root + this.clearSlashes(path));
			
			return this;
		}
	}
}