(function() {
	'use strict';
	var vars = window._var$;
	var VComp = window._vcomp$;
	var Utils = vars.Utils;
	var applyMatrices = Utils.geometry.applyMatrices;
	function fracStr(n) {
		return Number(n).toFixed(3).replace(/0+$/,'');
	}
	VComp.compMap["gauge"] = function(callback, template, match) {
		comp.template = template;
		callback(null, comp);
	};
	var comp = {
		template: null,
		props: {
			gaugeX: {
				type: Number
			},
			gaugeY: {
				type: Number
			},
			gaugeR: {
				type: Number
			},
			gaugePos: {
				type: Number
			},
			gaugeBoost: {
				type: Number
			},
			barX: {
				type: Number
			},
			barY: {
				type: Number
			},
			barW: {
				type: Number
			},
			barH: {
				type: Number
			},
			webX: {
				type: Number
			},
			webY: {
				type: Number
			},
			webR: {
				type: Number
			},
			webDX: {
				type: Number
			},
			webDY: {
				type: Number
			},
			confX: {
				type: Number
			},
			confY: {
				type: Number
			},
			confDX: {
				type: Number
			},
			confDY: {
				type: Number
			},
			confR: {
				type: Number
			},
			confS: {
				type: Number
			},
			titleLines: {
				type: Array
			},
			titleX: {
				type: Number
			},
			titleY: {
				type: Number
			},
			titleStyle: {
				type: Object
			}
		},
		data: function() {
			function noop(){}
			return {
				w:0,h:0,
				w2:0,h2:0,
				gaugeCenterX:0,
				gaugeCenterY:0,
				rx:0,ry:0,
				rmx:null,rmy:null,
				mlist:null,
				rMax:0,
				rConfMax:0,
				rBarHeight:0,
				radiusWeb:0,
				radiusWebLegendFactor: 1.925,
				widthWebLegend: 60,
				barOpen: -1,
				barOpenFrom: -1,
				barHover: -1,
				barHoverFrom: -1,
				barGraphs: [
				{
					name: ['Apropriação','indevida'],
					max: 60,
					pos: 50,
					boostPos: 40,
					centerX: 0,
					centerY: 0,
					offsetX: 0,
					mlist: [],
					bgColor: [0,127,155],
					sIndex:-1,
					opacity: 1,
					stopAnimPos: noop,
					stopAnimBg: noop,
					stopAnimHover: noop,
					subs: [
					{
						name: ['Desvio'],
						max: 60,
						pos: 45,
						boostPos: 40,
						centerX: 0,
						centerY: 0,
						offsetX: 0,
						mlist: [],
						bgColor: [0,127,155],
						sIndex:-1,
						opacity: 0,
						stopAnimPos: noop,
						stopAnimBg: noop,
						stopAnimHover: noop
					}, {
						name: ['Manipulação', 'de despesas'],
						max: 60,
						pos: 55,
						boostPos: 40,
						centerX: 0,
						centerY: 0,
						offsetX: 0,
						mlist: [],
						bgColor: [0,127,155],
						sIndex:-1,
						opacity: 0,
						stopAnimPos: noop,
						stopAnimBg: noop,
						stopAnimHover: noop
					}, {
						name: ['Pagamentos', 'indevidos'],
						max: 60,
						pos: 30,
						boostPos: 20,
						centerX: 0,
						centerY: 0,
						offsetX: 0,
						mlist: [],
						bgColor: [0,127,155],
						sIndex:-1,
						opacity: 0,
						stopAnimPos: noop,
						stopAnimBg: noop,
						stopAnimHover: noop
					}
					]
				}, {
					name: ['Corrupção'],
					max: 60,
					pos: 30,
					boostPos: 22,
					centerX: 0,
					centerY: 0,
					offsetX: 0,
					mlist: [],
					bgColor: [0,127,155],
					sIndex:-1,
					opacity: 1,
					stopAnimPos: noop,
					stopAnimBg: noop,
					stopAnimHover: noop,
					subs: [
					{
						name: ['Conflito de', 'interesse'],
						max: 60,
						pos: 18,
						boostPos: 10,
						centerX: 0,
						centerY: 0,
						mlist: [],
						bgColor: [0,127,155],
						sIndex:-1,
						opacity: 0,
						stopAnimPos: noop,
						stopAnimBg: noop,
						stopAnimHover: noop
					}, {
						name: ['Suborno'],
						max: 60,
						pos: 42,
						boostPos: 34,
						centerX: 0,
						centerY: 0,
						offsetX: 0,
						mlist: [],
						bgColor: [0,127,155],
						sIndex:-1,
						opacity: 0,
						stopAnimPos: noop,
						stopAnimBg: noop,
						stopAnimHover: noop
					}, {
						name: ['Brindes e', 'presentes'],
						max: 60,
						pos: 32,
						boostPos: 22,
						centerX: 0,
						centerY: 0,
						offsetX: 0,
						mlist: [],
						bgColor: [0,127,155],
						sIndex:-1,
						opacity: 0,
						stopAnimPos: noop,
						stopAnimBg: noop,
						stopAnimHover: noop
					}
					]
				}, {
					name: ['Assédio'],
					max: 60,
					pos: 42,
					boostPos: 35,
					centerX: 0,
					centerY: 0,
					offsetX: 0,
					mlist: [],
					bgColor: [0,127,155],
					sIndex:-1,
					opacity: 1,
					stopAnimPos: noop,
					stopAnimBg: noop,
					stopAnimHover: noop,
					subs: [
					{
						name: ['Corporativismo'],
						max: 60,
						pos: 35,
						boostPos: 20,
						centerX: 0,
						centerY: 0,
						offsetX: 0,
						mlist: [],
						bgColor: [0,127,155],
						sIndex:-1,
						opacity: 0,
						stopAnimPos: noop,
						stopAnimBg: noop,
						stopAnimHover: noop
					}, {
						name: ['Moral'],
						max: 60,
						pos: 25,
						boostPos: 20,
						centerX: 0,
						centerY: 0,
						offsetX: 0,
						mlist: [],
						bgColor: [0,127,155],
						sIndex:-1,
						opacity: 0,
						stopAnimPos: noop,
						stopAnimBg: noop,
						stopAnimHover: noop
					}, {
						name: ['Sexual'],
						max: 60,
						pos: 35,
						boostPos: 20,
						centerX: 0,
						centerY: 0,
						offsetX: 0,
						mlist: [],
						bgColor: [0,127,155],
						sIndex:-1,
						opacity: 0,
						stopAnimPos: noop,
						stopAnimBg: noop,
						stopAnimHover: noop
					}
					]
				}, {
					name: ['Demonstrações','fraudulentas'],
					max: 60,
					pos: 50,
					boostPos: 35,
					centerX: 0,
					centerY: 0,
					offsetX: 0,
					mlist: [],
					bgColor: [0,127,155],
					sIndex:-1,
					opacity: 1,
					stopAnimPos: noop,
					stopAnimBg: noop,
					stopAnimHover: noop,
					subs: [
					{
						name: ['Segurança das','informações'],
						max: 60,
						pos: 50,
						boostPos: 44,
						centerX: 0,
						centerY: 0,
						offsetX: 0,
						mlist: [],
						bgColor: [0,127,155],
						sIndex:-1,
						opacity: 0,
						stopAnimPos: noop,
						stopAnimBg: noop,
						stopAnimHover: noop
					}, {
						name: ['Manipulação','de resultados'],
						max: 60,
						pos: 45,
						boostPos: 38,
						centerX: 0,
						centerY: 0,
						offsetX: 0,
						mlist: [],
						bgColor: [0,127,155],
						sIndex:-1,
						opacity: 0,
						stopAnimPos: noop,
						stopAnimBg: noop,
						stopAnimHover: noop
					}, {
						name: ['Manipulação','de inventário'],
						max: 60,
						pos: 48,
						boostPos: 42,
						centerX: 0,
						centerY: 0,
						offsetX: 0,
						mlist: [],
						bgColor: [0,127,155],
						sIndex:-1,
						opacity: 0,
						stopAnimPos: noop,
						stopAnimBg: noop,
						stopAnimHover: noop
					}
					]
				}
				],
				webGraphs: [{
					name: ['Por subtema'],
					max: 60,
					centerX: 0,
					centerY: 0,
					offsetX: 0,
					mlist: [],
					angleStart: 7/6,
					rInner: 0,
					rOuter: 0,
					opacity: 1,
					subs: [{
						name: ['Desvio'],
						pos: 50,
						boostPos: 55,
						percs: [
							[[5, 15, 30, 40, 55], [63,255,0]],
							[[5, 10, 20, 30, 35], [255,31,0]]
						]
					}, {
						name: ['Manipulação', 'de despesas'],
						pos: 40,
						boostPos: 50,
						percs: [
							[[10, 15, 25, 30, 45], [63,255,0]],
							[[10, 15, 20, 25, 35], [255,31,0]]
						]
					}, {
						name: ['Conflito de', 'interesse'],
						pos: 30,
						boostPos: 45,
						percs: [
							[[15, 25, 30, 40, 55], [63,255,0]],
							[[15, 20, 25, 30, 40], [255,31,0]]
						]
					}, {
						name: ['Suborno'],
						pos: 50,
						boostPos: 55,
						percs: [
							[[5, 25, 40, 50, 55], [63,255,0]],
							[[5, 10, 20, 25, 35], [255,31,0]]
						]
					}, {
						name: ['Brindes e', 'presentes'],
						pos: 40,
						boostPos: 50,
						percs: [
							[[10, 25, 35, 40, 45], [63,255,0]],
							[[10, 20, 25, 30, 40], [255,31,0]]
						]
					}, {
						name: ['Dissimulação'],
						pos: 30,
						boostPos: 45,
						percs: [
							[[15, 30, 40, 50, 55], [63,255,0]],
							[[15, 20, 25, 30, 35], [255,31,0]]
						]
					}, {
						name: ['Corporativismo'],
						pos: 30,
						boostPos: 45,
						percs: [
							[[5, 25, 40, 50, 55], [63,255,0]],
							[[5, 10, 20, 30, 35], [255,31,0]]
						]
					}, {
						name: ['Assédio', 'moral'],
						pos: 20,
						boostPos: 40,
						percs: [
							[[10, 25, 35, 40, 45], [63,255,0]],
							[[10, 15, 20, 25, 35], [255,31,0]]
						]
					}, {
						name: ['Assédio', 'sexual'],
						pos: 10,
						boostPos: 35,
						percs: [
							[[15, 30, 40, 50, 55], [63,255,0]],
							[[15, 20, 25, 30, 40], [255,31,0]]
						]
					}, {
						name: ['Segurança das', 'informações'],
						pos: 30,
						boostPos: 45,
						percs: [
							[[5, 15, 30, 40, 55], [63,255,0]],
							[[5, 10, 20, 25, 35], [255,31,0]]
						]
					}, {
						name: ['Manipulação', 'de resultados'],
						pos: 20,
						boostPos: 40,
						percs: [
							[[10, 15, 25, 30, 45], [63,255,0]],
							[[10, 20, 25, 30, 40], [255,31,0]]
						]
					}, {
						name: ['Manipulação', 'de inventário'],
						pos: 10,
						boostPos: 35,
						percs: [
							[[15, 25, 30, 40, 55], [63,255,0]],
							[[15, 20, 25, 30, 35], [255,31,0]]
						]
					}]
				}],
				angleStart:-1,
				angleLength:10/6,
				nCount:100,
				nPos:68,
				boostPos:75,
				boostAnim:1,
				segmentIndex:-1,
				nSegments: [
					{
						start: 0,
						color: [255,255,255],
						bgColor: [0,127,255],
						bgAlpha: 0.4
					},
					{
						start: 40,
						color: [255,31,0],
						bgColor: [255,31,0],
						bgAlpha: 0.65
					},
					{
						start: 60,
						color: [255,191,0],
						bgColor: [255,191,0],
						bgAlpha: 0.65
					},
					{
						start: 80,
						color: [63,207,0],
						bgColor: [63,207,0],
						bgAlpha: 0.7
					}
				],
				barSegments: [
					{
						name: 'Baixo',
						start: 0,
						color: [255,31,0],
						bgColor: [255,31,0],
						bgAlpha: 0.65
					},
					{
						name: 'Moderado',
						start: 20,
						color: [255,191,0],
						bgColor: [255,191,0],
						bgAlpha: 0.65
					},
					{
						name: 'Alto',
						start: 40,
						color: [63,207,0],
						bgColor: [63,207,0],
						bgAlpha: 0.7
					}
				],
				gaugeBgColor: [0,127,255,1],
				gaugeBgAlpha: 0.25,
				gaugeColorSpeedNormal: [255,207,79,1],
				gaugeColorSpeedBoost: [127,191,255,1],
				gaugeColorSpeedSum: [255,255,255,1],
				percGeral: [[43, 58, 68, 78, 92], [63,207,0], [0.925, 0.975, 1.025, 1.125, 1.25], ['Geral']],
				percFraude: [[44, 49, 55, 61, 66], [255,31,0], [1, 1.05, 1.1, 1.2, 1.325], ['Risco', 'Comportamental']],
				confiabilityAngleStart:0.375,//1.66,
				confiabilityAngleLength:0.25,//-0.32,
				confiabilityBgColor: null,
				confiabilityPercGeral: [[43, 58, 68, 78, 92], [63,207,0], [1, 1.05, 1.1, 1.2], ['Geral']],
				confiabilityPercFraude: [[43, 50, 56, 62, 72], [255,63,0], [1.1, 1.15, 1.2, 1.3], ['Risco', 'Comportamental']],
				cPos:82,
				cBoostPos: 42,
				needleCandidato: {
					name: ['Participante'],
					colors: {
						text: [255,191,63,1],
						stroke: [191,111,31,1],
						shadow: [255,159,63,1],
						gradient: [
							[0, [255,191,63,0.875]],
							[0.5, [223,159,31,0.75]],
							// [0.75, [191,127,15,0.5]],
							[1, [191,127,15,0.5]]
						]
					}
				},
				needleSolucao: {
					name: ['Potencial', 'com Soluções'],
					colors: {
						text: [63,191,255,1],
						stroke: [31,111,191,1],
						shadow: [63,159,255,1],
						gradient: [
							[0, [63,191,255,0.875]],
							[0.5, [31,159,223,0.75]],
							// [0.75, [15,127,191,0.5]],
							[1, [15,127,191,0.5]]
						]
					}
				},
				bgColor: [15,38,79,1],
				textColor: [218,165,32,1],
				ticksColor: [255,255,255,1],
				mousePressed: false,
				mouseX: 0,
				mouseY: 0,
				mousePower: 0,
				mouseInside: false,
				mouseStop: false,
				barScale: 1,
				webScale: 1,
				mMod: [],
				stopAnimationPos: function(){},
				stopAnimationBgColor: function(){},
				stopAnimationCPos: function(){},
				stopAnimationWeb: function(){},
				stopAnimationMouse: function(){}
			};
		},
		methods: {
			colorInterLinear: function(inter, c0, c1) {
				var inver = 1 - inter;
				return [
					c0[0]*inter + (c1 ? c1[0]*inver : 0),
					c0[1]*inter + (c1 ? c1[1]*inver : 0),
					c0[2]*inter + (c1 ? c1[2]*inver : 0)
				];
			},
			drawWebGraphAll: function() {
				Utils.forEach(this.webGraphs, this.drawWebGraph);
			},
			drawWebGraph: function(opt) {
				var c, cw = [255,255,255];
				this.drawWebBg(opt);
				this.drawWebArea(opt);
				this.drawWebTicks(opt);
				c = this.percGeral[1].slice(0,3).concat([0.625]);
				// this.drawWebPerc(opt, 0, 1, c);
				this.drawWebPerc(opt, 0, 2, c);
				// this.drawWebPerc(opt, 0, 3, c);
				c = this.percFraude[1];
				c = this.colorInterLinear(0.875, c, cw).concat([1]);
				// this.drawWebPerc(opt, 1, 1);
				this.drawWebPerc(opt, 1, 2, c);
				// this.drawWebPerc(opt, 1, 3);
				this.drawWebTitle(opt);
				this.drawWebLegend(opt);
			},
			drawWebBg: function(opt) {
				var ct = this.ct;
				var h2 = this.radiusWeb;
				var geom = Utils.geometry;
				var uc = Utils.canvas;
				var gcx = opt.centerX;
				var gcy = opt.centerY;
				var c;
				ct.save();
				uc.applyMatrixContext(ct, geom.translate(gcx, gcy));
				uc.applyMatrixContext(ct, this.getPlaneZ(-20, opt.mlist));
				c = this.getBarHoleStyle(60, true).value;
				c = this.colorInterLinear(0.5, c.color).join(',');
				ct.fillStyle = 'rgba('+c+',0.5)';
				ct.strokeStyle = 'rgba('+c+',1)';
				ct.beginPath();
				ct.arc(0, 0, h2, 0, 2*Math.PI, false);
				ct.fill();
				ct.stroke();
				c = this.getBarHoleStyle(40, true).value;
				c = this.colorInterLinear(0.5, c.color).join(',');
				ct.fillStyle = 'rgba('+c+',0.5)';
				ct.strokeStyle = 'rgba('+c+',1)';
				ct.beginPath();
				ct.arc(0, 0, h2*2/3, 0, 2*Math.PI, false);
				ct.fill();
				ct.stroke();
				c = this.getBarHoleStyle(20, true).value;
				c = this.colorInterLinear(0.5, c.color).join(',');
				ct.fillStyle = 'rgba('+c+',0.5)';
				ct.strokeStyle = 'rgba('+c+',1)';
				ct.beginPath();
				ct.arc(0, 0, h2/3, 0, 2*Math.PI, false);
				ct.fill();
				ct.stroke();
				ct.restore();
			},
			drawWebPerc: function(opt, ip, il, color) {
				var ct = this.ct;
				var h2 = this.radiusWeb;
				var as = opt.angleStart;
				var geom = Utils.geometry;
				var uc = Utils.canvas;
				var n = opt.max;
				var gcx = opt.centerX;
				var gcy = opt.centerY;
				var subs = opt.subs;
				var subCount = subs.length;
				var a1, m1, v, s, p, l;
				ct.save();
				uc.applyMatrixContext(ct, geom.translate(gcx, gcy));
				uc.applyMatrixContext(ct, this.getPlaneZ(-10, opt.mlist));
				a1 = as;
				m1 = geom.rotateZ(a1);
				s = subs[0];
				p = s.percs[ip];
				l = p[0][il];
				v = geom.applyMatrix(m1, [0, -h2 * l / n, 1]);
				ct.strokeStyle = 'rgba('+color.join(',')+')';//,0.875
				ct.lineWidth = 2;
				ct.beginPath();
				ct.moveTo(v[0], v[1]);
				for (var i = 1; i < subCount; i++) {
					a1 = i * 2 / subCount + as;
					m1 = geom.rotateZ(a1);
					s = subs[i];
					p = s.percs[ip];
					l = p[0][il];
					v = geom.applyMatrix(m1, [0, -h2 * l / n, 1]);
					ct.lineTo(v[0], v[1]);
				}
				ct.closePath();
				ct.stroke();
				ct.restore();
			},
			drawWebTicks: function(opt) {
				var ct = this.ct;
				var h2 = this.radiusWeb;
				var as = opt.angleStart;
				var geom = Utils.geometry;
				var uc = Utils.canvas;
				var n = opt.max;
				var gcx = opt.centerX;
				var gcy = opt.centerY;
				var subs = opt.subs;
				var subCount = subs.length;
				var a1, a2, m1, v, v0, v1, c, cw;
				// cw = [255,255,255];
				c = this.ticksColor.slice(0,3).join(',');
				ct.save();
				uc.applyMatrixContext(ct, geom.translate(gcx, gcy));
				uc.applyMatrixContext(ct, this.getPlaneZ(0, opt.mlist));
				ct.strokeStyle = 'rgba('+c+',0.5)';
				for (var i = 0; i < subCount; i++) {
					a1 = i * 2 / subCount + as;
					m1 = geom.rotateZ(a1);
					ct.save();
					for (var j = 5; j <= n; j += 5) {
						a2 = -h2 * j / n;
						v0 = j % 20 ? 2 : 4;
						v1 = j % 20 ? 1.5 : 2.5;
						// c = this.getBarHoleStyle(j, true).value;
						// c = this.colorInterLinear(0.75, c.color, cw);
						ct.beginPath();
						v = geom.applyMatrix(m1, [-v0, a2, 1]);
						ct.moveTo(v[0], v[1]);
						v = geom.applyMatrix(m1, [+v0, a2, 1]);
						ct.lineTo(v[0], v[1]);
						ct.lineWidth = v1;
						// ct.strokeStyle = 'rgba('+c.join(',')+',1)';
						ct.stroke();
					}
					ct.restore();
				}
				ct.restore();
			},
			drawWebArea: function(opt) {
				var ct = this.ct;
				var h2 = this.radiusWeb;
				var as = opt.angleStart;
				var geom = Utils.geometry;
				var uc = Utils.canvas;
				var n = opt.max;
				var gcx = opt.centerX;
				var gcy = opt.centerY;
				var subs = opt.subs;
				var subCount = subs.length;
				var a1, m1, v, s, c, c0;
				var pathCandidato = new Path2D();
				var pathSolucao = new Path2D();
				var pathBoost = new Path2D();
				ct.save();
				uc.applyMatrixContext(ct, geom.translate(gcx, gcy));
				uc.applyMatrixContext(ct, this.getPlaneZ(-10, opt.mlist));

				a1 = as;
				m1 = geom.rotateZ(a1);
				s = subs[0];
				v = geom.applyMatrix(m1, [0, -h2 * s.pos / n, 1]);
				ct.lineWidth = 2;
				pathCandidato.moveTo(v[0], v[1]);
				for (var i = 1; i < subCount; i++) {
					a1 = i * 2 / subCount + as;
					m1 = geom.rotateZ(a1);
					s = subs[i];
					v = geom.applyMatrix(m1, [0, -h2 * s.pos / n, 1]);
					pathCandidato.lineTo(v[0], v[1]);
				}
				pathCandidato.closePath();

				a1 = as;
				m1 = geom.rotateZ(a1);
				s = subs[0];
				v = geom.applyMatrix(m1, [0, -h2 * s.boostPos / n, 1]);
				pathSolucao.moveTo(v[0], v[1]);
				for (var i = 1; i < subCount; i++) {
					a1 = i * 2 / subCount + as;
					m1 = geom.rotateZ(a1);
					s = subs[i];
					v = geom.applyMatrix(m1, [0, -h2 * s.boostPos / n, 1]);
					pathSolucao.lineTo(v[0], v[1]);
				}
				pathSolucao.closePath();

				pathBoost.addPath(pathCandidato);
				pathBoost.addPath(pathSolucao);

				c = this.needleSolucao.colors.stroke;
				c = c.slice(0,3).concat([0.375]);
				c0 = this.needleSolucao.colors.text;
				c0 = c0.slice(0,3).concat([0.625]);
				ct.fillStyle = 'rgba('+c.join(',')+')';//'rgba(63,191,255,0.5)';
				ct.strokeStyle = 'rgba('+c0.join(',')+')';//'rgba(31,111,191,0.625)';

				ct.fill(pathBoost, 'evenodd');
				ct.stroke(pathSolucao);

				c = this.needleCandidato.colors.stroke;
				c = c.slice(0,3).concat([0.375]);
				c0 = this.needleCandidato.colors.text;
				c0 = c0.slice(0,3).concat([0.625]);
				ct.fillStyle = 'rgba('+c.join(',')+')';//'rgba(63,191,255,0.5)';
				ct.strokeStyle = 'rgba('+c0.join(',')+')';//'rgba(31,111,191,0.625)';

				ct.fill(pathCandidato, 'evenodd');
				ct.stroke(pathCandidato);

				ct.restore();
			},
			drawWebTitle: function(opt) {
				var ct = this.ct;
				var h2 = this.radiusWeb;
				var geom = Utils.geometry;
				var uc = Utils.canvas;
				var gcx = opt.centerX;
				var gcy = opt.centerY;
				var subs = opt.subs;
				var subCount = subs.length;
				var as = opt.angleStart;
				var cAlpha = this.textColor[3] || 1;
				var c = this.colorInterLinear(opt.opacity, this.textColor);
				var s, name, nl, lh, lt, a, m, v, v0, wMax;
				ct.save();
				uc.applyMatrixContext(ct, geom.translate(gcx, gcy));
				uc.applyMatrixContext(ct, this.getPlaneZ(0, opt.mlist));
				ct.fillStyle = 'rgba('+c.concat([cAlpha]).join(',')+')';
				ct.font = 'bold italic 14px "Arial", sans-serif';
				ct.textAlign = 'center';
				for (var i = 0; i < subCount; i++) {
					s = subs[i];
					name = s.name;
					nl = name.length;
					lh = 18;
					lt = Math.round((nl-1)*lh*-0.5);
					a = i * 2 / subCount + as;
					m = geom.rotateZ(a);
					v = geom.applyMatrix(m, [0.375, 0, 1]);
					wMax = 0;
					for (var j = 0; j < nl; j++) {
						v0 = ct.measureText(name[j]);
						wMax = Math.max(wMax, v0.width);
					}
					v0 = geom.applyMatrix(m, [0, h2*1.225, 1]);
					for (j = 0; j < nl; j++) {
						ct.fillText(name[j], -v[1] * wMax + v0[0], v0[1] + j * lh);
					}
					// v0 = geom.applyMatrix(geom.rotateZ(a), [0, 1, 1]);
				}
				ct.restore();
			},
			drawBarGraphAll: function() {
				var ibo = this.barOpen;
				var ibof = this.barOpenFrom;
				var iMainActive = ibo === -1 ? ibof : ibo;
				var bars = this.barGraphs;
				if (ibo === -1 || ibof === -1) {
					Utils.forEach(bars, this.drawBarGraph);
				} else {
					this.drawBarGraph(bars[ibo]);
				}
				if (iMainActive !== -1) {
					var ba = bars[iMainActive];
					var subs = ba.subs;
					if (subs && subs.length) {
						Utils.forEach(subs, this.drawBarGraph);
					}
				}
			},
			drawBarGraph: function(opt) {
				if (opt.opacity <= 0) return;
				this.drawBarBg(opt);
				this.drawBarBoost(opt);
				this.drawBarHoles(opt);
				this.drawBarSpeed(opt);
				this.drawBarTitle(opt);
			},
			drawBarBg: function(opt) {
				var ct = this.ct;
				var h2 = this.rBarHeight;
				var rSide = 60;
				var rVertMargin = 40;
				var rVertOut = h2+rVertMargin;
				var geom = Utils.geometry;
				var uc = Utils.canvas;
				var n = 60;
				var p = opt.pos;
				var gcx = opt.centerX;
				var gcy = opt.centerY;
				var cbg = this.bgColor.slice(0,3).join(',');
				var a1, a2, a4, s, sgr, sc, ss;
				ct.save();
				uc.applyMatrixContext(ct, geom.translate(gcx, gcy));
				uc.applyMatrixContext(ct, this.getPlaneZ(-30, opt.mlist));
				// s = this.getBarHoleStyle(p).value;
				sc = this.colorInterLinear(opt.opacity, opt.bgColor, this.bgColor);
				sc = sc.join(',');
				sgr = ct.createLinearGradient(-rSide, 0, rSide, 0);
				sgr.addColorStop(0, 'rgba('+sc+',0)');
				sgr.addColorStop(0.25, 'rgba('+sc+',0.25)');
				sgr.addColorStop(0.5, 'rgba('+sc+',0.375)');
				sgr.addColorStop(0.75, 'rgba('+sc+',0.25)');
				sgr.addColorStop(1, 'rgba('+sc+',0)');
				ct.fillStyle = sgr;
				ct.beginPath();
				ct.rect(-rSide, -rVertOut, 2*rSide, 2*rVertOut);
				ct.fill();
				sgr = ct.createLinearGradient(0, -rVertOut, 0, rVertOut);
				ss = rVertMargin/(2*rVertOut);
				sgr.addColorStop(0, 'rgba('+cbg+',1)');
				sgr.addColorStop(ss, 'rgba('+cbg+',0.625)');
				sgr.addColorStop(2*ss, 'rgba('+cbg+',0)');
				sgr.addColorStop(1-(2*ss), 'rgba('+cbg+',0)');
				sgr.addColorStop(1-ss, 'rgba('+cbg+',0.625)');
				sgr.addColorStop(1, 'rgba('+cbg+',1)');
				ct.fillStyle = sgr;
				ct.beginPath();
				ct.rect(-rSide, -rVertOut, 2*rSide, 2*rVertOut);
				ct.fill();
				ct.restore();
			},
			drawBarBoost: function(opt) {
				var p = opt.pos;
				var bp = opt.boostPos;
				if (bp == null || isNaN(bp) || p <= bp) return;
				var minp = Math.min(p, bp);
				var maxp = Math.max(p, bp);
				var ct = this.ct;
				var h2 = this.rBarHeight;
				var rSide = 65;
				var n = 60;
				var geom = Utils.geometry;
				var uc = Utils.canvas;
				var spy = geom.domain(0, n, minp, h2, -2*h2);
				var sby = geom.domain(0, n, maxp, h2, -2*h2);
				var gcx = opt.centerX;
				var gcy = opt.centerY;
				var mgc = geom.translate(gcx, gcy);
				var c, c0, gr;
				ct.save();
				uc.applyMatrixContext(ct, mgc);
				uc.applyMatrixContext(ct, this.getPlaneZ(0, opt.mlist));
				ct.lineWidth = 4;

				gr = ct.createLinearGradient(0, sby, 0, spy);
				c = this.needleSolucao.colors.shadow;
				c = this.colorInterLinear(opt.opacity, c, this.bgColor);
				c0 = c.slice(0,3).concat([0.5]);
				gr.addColorStop(0, 'rgba('+c0.join(',')+')');
				c0 = c.slice(0,3).concat([0.25]);
				gr.addColorStop(1, 'rgba('+c0.join(',')+')');
				ct.beginPath();
				ct.rect(-rSide, sby, 2*rSide, spy-sby);
				ct.fillStyle = gr;
				ct.fill();

				c = this.needleCandidato.colors.text;
				c = this.colorInterLinear(opt.opacity, c, this.bgColor);
				c0 = c.slice(0,3).concat([0.625]);
				ct.strokeStyle = 'rgba('+c0.join(',')+')';
				ct.beginPath();
				ct.moveTo(-rSide, spy);
				ct.lineTo(rSide, spy);
				ct.stroke();

				c = this.needleSolucao.colors.text;
				c = this.colorInterLinear(opt.opacity, c, this.bgColor);
				c0 = c.slice(0,3).concat([0.625]);
				ct.strokeStyle = 'rgba('+c0.join(',')+')';
				ct.beginPath();
				ct.moveTo(-rSide, sby);
				ct.lineTo(rSide, sby);
				ct.stroke();

				ct.restore();
			},
			drawBarHoles: function(opt) {
				var ct = this.ct;
				var h2 = this.rBarHeight;
				var rSide = 25;
				var geom = Utils.geometry;
				var uc = Utils.canvas;
				var n = 60;
				var p = opt.pos;
				var f = 5;
				var gcx = opt.centerX;
				var gcy = opt.centerY;
				var a1, a2, a4, s, sgr, sc, sc0, sc1;
				ct.save();
				uc.applyMatrixContext(ct, geom.translate(gcx, gcy));
				uc.applyMatrixContext(ct, this.getPlaneZ(-20, opt.mlist));
				sc = this.colorInterLinear(opt.opacity, [255,255,255], this.bgColor);
				ct.strokeStyle = 'rgba('+sc.join(',')+',0.15)';
				// ct.fillStyle = 'rgba(255,255,255,0.075)';
				for (var i = 0; i < n; i += f) {
					a1 = geom.domain(0, n, i+0.25, h2, -2*h2);
					a2 = geom.domain(0, n, i+2.5, h2, -2*h2);
					a4 = geom.domain(0, n, i+4.75, h2, -2*h2);
					ct.beginPath();
					ct.moveTo(0, a1);
					ct.bezierCurveTo(rSide, a1, rSide, a1, rSide, a2);
					ct.bezierCurveTo(rSide, a4, rSide, a4, 0, a4);
					ct.bezierCurveTo(-rSide, a4, -rSide, a4, -rSide, a2);
					ct.bezierCurveTo(-rSide, a1, -rSide, a1, 0, a1);
					ct.closePath();
					s = this.getBarHoleStyle(i).value;
					if (i >= p) {
						sc = this.colorInterLinear(opt.opacity, s.color, this.bgColor);
						sc = this.colorInterLinear(0.125, sc, this.bgColor).join(',');
						ct.shadowBlur = 0;
						ct.shadowColor = 'rgba(0,0,0,0)';
						ct.shadowOffsetX = 0;
						ct.shadowOffsetY = 0;
						ct.fillStyle = 'rgba('+sc+',1)';
					} else {//} if ((i+f) <= p) {
						sc = this.colorInterLinear(opt.opacity, s.color, this.bgColor);
						sc0 = this.colorInterLinear(0.75, sc, this.bgColor).join(',');
						sc1 = sc.join(',');
						sc = this.colorInterLinear(0.5, sc, this.bgColor).join(',');
						sgr = ct.createLinearGradient(-rSide, a2, rSide, a2);
						sgr.addColorStop(0, 'rgba('+sc+',1)');
						sgr.addColorStop(0.125, 'rgba('+sc0+',1)');
						sgr.addColorStop(0.5, 'rgba('+sc1+',1)');
						sgr.addColorStop(0.875, 'rgba('+sc0+',1)');
						sgr.addColorStop(1, 'rgba('+sc+',1)');
						ct.shadowBlur = 10;
						ct.shadowColor = 'rgba('+sc1+',1)';
						ct.shadowOffsetX = 0;
						ct.shadowOffsetY = 0;
						ct.fillStyle = sgr;
					}
					// ct.strokeStyle = s.fillOut;
					ct.fill();
					ct.stroke();
				}
				ct.restore();
			},
			drawBarSpeed: function(opt) {
				var ct = this.ct;
				var h2 = this.rBarHeight;
				var rSide = 55;
				var n = 60;
				var p = opt.pos;
				var geom = Utils.geometry;
				var uc = Utils.canvas;
				var sy = geom.domain(0, n, p, h2, -2*h2);
				var gcx = opt.centerX;
				var gcy = opt.centerY;
				var cbg = this.bgColor.slice(0,3).join(',');
				var mgc = geom.translate(gcx, gcy);
				var s = this.getBarHoleStyle(p).value;
				var sc = this.colorInterLinear(opt.opacity, s.color, this.bgColor);
				var a1, a2, a4;
				ct.save();
				uc.applyMatrixContext(ct, mgc);
				uc.applyMatrixContext(ct, this.getPlaneZ(0, opt.mlist));
				var gr = ct.createRadialGradient(0,sy+rSide*0.5,0,0,sy,rSide);
				// var grc = sc.join(',');
				var grc0 = this.colorInterLinear(0.5, sc, this.bgColor);
				// var grc1 = this.colorInterLinear(0.25, sc);
				gr.addColorStop(0, 'rgba('+grc0.join(',')+',1)');
				gr.addColorStop(1, 'rgba('+cbg+',1)');
				a1 = sy-12;
				a2 = sy;
				a4 = sy+12;
				ct.beginPath();
				ct.moveTo(0, a1);
				ct.bezierCurveTo(rSide, a1, rSide, a1, rSide, a2);
				ct.bezierCurveTo(rSide, a4, rSide, a4, 0, a4);
				ct.bezierCurveTo(-rSide, a4, -rSide, a4, -rSide, a2);
				ct.bezierCurveTo(-rSide, a1, -rSide, a1, 0, a1);
				ct.closePath();
				// ct.beginPath();
				// ct.arc(0, sy, rSide, 0, 2*Math.PI, false);
				ct.fillStyle = gr;
				ct.strokeStyle = 'rgba('+grc0.join(',')+',1)';
				ct.lineWidth = 3;
				ct.fill();
				ct.stroke();
				ct.restore();
				ct.save();
				uc.applyMatrixContext(ct, mgc);
				uc.applyMatrixContext(ct, this.getPlaneZ(+10, opt.mlist));
				ct.font = 'bold italic 18px "Arial Black", sans-serif';
				// grc0 = this.colorInterLinear(opt.opacity, [255,255,255], this.bgColor);
				grc0 = this.colorInterLinear(0.5, grc0, this.ticksColor);
				grc0 = this.colorInterLinear(opt.opacity, grc0, this.bgColor);
				ct.fillStyle = 'rgba('+grc0.join(',')+',1)';
				ct.textAlign = 'center';
				// ct.shadowBlur = 5;
				// ct.shadowColor = 'rgba(255,255,255,0.5)';
				// ct.shadowOffsetX = 3;
				// ct.shadowOffsetY = 3;
				ct.fillText(s.name, 0, sy+6);
				ct.restore();
			},
			drawBarTitle: function(opt) {
				var ct = this.ct;
				var h2 = this.rBarHeight;
				var geom = Utils.geometry;
				var uc = Utils.canvas;
				var name = opt.name;
				var nl = name.length;
				var lh = 20;
				var lt = Math.round((nl-1)*lh*-0.5) - h2 - 30;
				var gcx = opt.centerX;
				var gcy = opt.centerY;
				var cAlpha = this.textColor[3] || 1;
				var c = this.colorInterLinear(opt.opacity, this.textColor, this.bgColor);
				ct.save();
				uc.applyMatrixContext(ct, geom.translate(gcx, gcy));
				uc.applyMatrixContext(ct, this.getPlaneZ(0, opt.mlist));
				ct.fillStyle = 'rgba('+c.concat([cAlpha]).join(',')+')';
				ct.font = 'bold italic 16px "Arial Black", sans-serif';
				ct.textAlign = 'center';
				Utils.forEach(name, function(l, i) {
					ct.fillText(l, 0, lt + i * lh);
				});
				ct.restore();
			},
			drawIndiceTitle: function() {
				var ct = this.ct;
				var geom = Utils.geometry;
				var uc = Utils.canvas;
				ct.save();
				uc.applyMatrixContext(ct, geom.translate(this.w*0.5/this.barScale, ((this.h/this.barScale*0.5)-this.rBarHeight-40)));
				ct.fillStyle = '#ffffff';
				ct.font = 'bold italic 20px "Arial Black", sans-serif';
				ct.textAlign = 'center';
				ct.fillText('Índice de resiliência de integridade'.toUpperCase(), 0, 0);
				ct.restore();
			},
			getConfiabilityMatrix: function(r, a) {
				var geom = Utils.geometry;
				var m = geom.rotateZ(a);
				var v0 = geom.applyMatrix(m, [0, r, 1]);
				var m0t = geom.translate(v0[0]-r, v0[1]);
				var m0r = geom.rotateZ(-0.5);
				var m0 = geom.multiplyMatrix(m0t, m0r);
				m0[0] = m[4];
				return m0;
			},
			drawConfiabilityHolesStraight: function() {
				var ct = this.ct;
				var h2 = this.rConfMax;
				var rOuter2 = 2*h2;
				var rOuter = -1.925*h2;
				var rMidOuter = -1.75*h2;
				var rMidInner = -1.7*h2;
				var rInner = -1.55*h2;
				var rCenter = -1.725*h2;
				var cas = this.confiabilityAngleStart;
				var cal = this.confiabilityAngleLength;
				var geom = Utils.geometry;
				var uc = Utils.canvas;
				var n = 100;
				var p = this.cPos;
				var f = 10;
				var s, slast, sgr, sc;
				var v, v0, v1;
				var a1, a2, a2a, a3, a4;
				var m1, m2, m2a, m2b, m3, m4;
				ct.save();
				uc.applyMatrixContext(ct, this.getPlaneZ(-20));
				ct.strokeStyle = 'rgba(255,255,255,0.15)';
				ct.fillStyle = 'rgba(255,255,255,0.075)';
				for (var i = 0; i < n; i += f) {
					a1 = geom.domain(0, n, i+1, cas, cal);
					a2 = geom.domain(0, n, i+4, cas, cal);
					a2a = geom.domain(0, n, i+5, cas, cal);
					a3 = geom.domain(0, n, i+6, cas, cal);
					a4 = geom.domain(0, n, i+9, cas, cal);
					m1 = this.getConfiabilityMatrix(rOuter2, a1);
					m2 = this.getConfiabilityMatrix(rOuter2, a2);
					m2a = this.getConfiabilityMatrix(rOuter2, a2a);
					m3 = this.getConfiabilityMatrix(rOuter2, a3);
					m4 = this.getConfiabilityMatrix(rOuter2, a4);
					ct.beginPath();
					v = geom.applyMatrix(m1, [0, -rMidOuter, 1]);
					ct.moveTo(v[0], v[1]);
					v0 = geom.applyMatrix(m1, [0, -rOuter, 1]);
					v = geom.applyMatrix(m2, [0, -rOuter, 1]);
					ct.bezierCurveTo(v0[0], v0[1], v0[0], v0[1], v[0], v[1]);
					// ct.lineTo(v[0], v[1]);
					v = geom.applyMatrix(m3, [0, -rOuter, 1]);
					ct.lineTo(v[0], v[1]);
					v0 = geom.applyMatrix(m4, [0, -rOuter, 1]);
					v = geom.applyMatrix(m4, [0, -rMidOuter, 1]);
					ct.bezierCurveTo(v0[0], v0[1], v0[0], v0[1], v[0], v[1]);
					// ct.lineTo(v[0], v[1]);
					v = geom.applyMatrix(m4, [0, -rMidInner, 1]);
					ct.lineTo(v[0], v[1]);
					v0 = geom.applyMatrix(m4, [0, -rInner, 1]);
					v = geom.applyMatrix(m3, [0, -rInner, 1]);
					ct.bezierCurveTo(v0[0], v0[1], v0[0], v0[1], v[0], v[1]);
					// ct.lineTo(v[0], v[1]);
					v = geom.applyMatrix(m2, [0, -rInner, 1]);
					ct.lineTo(v[0], v[1]);
					v0 = geom.applyMatrix(m1, [0, -rInner, 1]);
					v = geom.applyMatrix(m1, [0, -rMidInner, 1]);
					ct.bezierCurveTo(v0[0], v0[1], v0[0], v0[1], v[0], v[1]);
					ct.closePath();
					s = this.getHoleStyle(i).value;
					if (s !== slast) {
						slast = s;
					}
					// sgr = ct.createRadialGradient(0, 0, rInner, 0, 0, rOuter);
					v1 = geom.applyMatrix(m2a, [0, -rCenter, 1]);
					m2b = geom.multiplyMatrix(
						geom.translate(v1[0], v1[1]),
						geom.rotateZ(a2a)
					);
					v0 = geom.applyMatrix(m2b, [0, rCenter-rInner, 1]);
					v = geom.applyMatrix(m2b, [0, rCenter-rOuter, 1]);
					sgr = ct.createLinearGradient(v0[0], v0[1], v[0], v[1]);
					sc = s.color.join(',');
					if (i >= p) {
						sgr.addColorStop(0, 'rgba('+sc+',0)');
						sgr.addColorStop(1, 'rgba('+sc+',0.15)');
						ct.shadowBlur = 0;
						ct.shadowColor = 'rgba(0,0,0,0)';
						ct.shadowOffsetX = 0;
						ct.shadowOffsetY = 0;
					} else {//} if ((i+f) <= p) {
						sgr.addColorStop(0, 'rgba('+sc+',0)');
						sgr.addColorStop(0.75, 'rgba('+sc+',0.25)');
						sgr.addColorStop(1, 'rgba('+sc+',0.5)');
						ct.shadowBlur = 5;
						ct.shadowColor = 'rgba('+sc+',1)';
						ct.shadowOffsetX = 0;
						ct.shadowOffsetY = 0;
					}
					ct.strokeStyle = s.fillOut;
					ct.fillStyle = sgr;
					ct.fill();
					ct.stroke();
				}
				ct.restore();
			},
			drawConfiabilityHoles: function() {
				var ct = this.ct;
				var h2 = this.rConfMax;
				var h2s = this.confS;
				var h2l = h2-h2s;
				var rOuter = 0.925*h2l+h2s;
				var rMidOuter = 0.7*h2l+h2s;
				var rMidInner = 0.7*h2l+h2s;
				var rInner = 0.55*h2l+h2s;
				var cas = this.confiabilityAngleStart-1;
				var cal = this.confiabilityAngleLength;
				var geom = Utils.geometry;
				var uc = Utils.canvas;
				var n = 100;
				var p = this.cPos;
				var f = 10;
				var s, slast, sgr, sc;
				var v, v0;
				var a1, a2, a3, a4;
				var m1, m2, m3, m4;
				ct.save();
				uc.applyMatrixContext(ct, this.getPlaneZ(-20));
				ct.strokeStyle = 'rgba(255,255,255,0.15)';
				ct.fillStyle = 'rgba(255,255,255,0.075)';
				for (var i = 0; i < n; i += f) {
					a1 = geom.domain(0, n, i+1, cas, cal);
					a2 = geom.domain(0, n, i+4, cas, cal);
					a3 = geom.domain(0, n, i+6, cas, cal);
					a4 = geom.domain(0, n, i+9, cas, cal);
					m1 = geom.rotateZ(a1);
					m2 = geom.rotateZ(a2);
					m3 = geom.rotateZ(a3);
					m4 = geom.rotateZ(a4);
					ct.beginPath();
					v = geom.applyMatrix(m1, [0, -rMidOuter, 1]);
					ct.moveTo(v[0], v[1]);
					v0 = geom.applyMatrix(m1, [0, -rOuter, 1]);
					v = geom.applyMatrix(m2, [0, -rOuter, 1]);
					ct.bezierCurveTo(v0[0], v0[1], v0[0], v0[1], v[0], v[1]);
					// ct.lineTo(v[0], v[1]);
					v = geom.applyMatrix(m3, [0, -rOuter, 1]);
					ct.lineTo(v[0], v[1]);
					v0 = geom.applyMatrix(m4, [0, -rOuter, 1]);
					v = geom.applyMatrix(m4, [0, -rMidOuter, 1]);
					ct.bezierCurveTo(v0[0], v0[1], v0[0], v0[1], v[0], v[1]);
					// ct.lineTo(v[0], v[1]);
					v = geom.applyMatrix(m4, [0, -rMidInner, 1]);
					ct.lineTo(v[0], v[1]);
					v0 = geom.applyMatrix(m4, [0, -rInner, 1]);
					v = geom.applyMatrix(m3, [0, -rInner, 1]);
					ct.bezierCurveTo(v0[0], v0[1], v0[0], v0[1], v[0], v[1]);
					// ct.lineTo(v[0], v[1]);
					v = geom.applyMatrix(m2, [0, -rInner, 1]);
					ct.lineTo(v[0], v[1]);
					v0 = geom.applyMatrix(m1, [0, -rInner, 1]);
					v = geom.applyMatrix(m1, [0, -rMidInner, 1]);
					ct.bezierCurveTo(v0[0], v0[1], v0[0], v0[1], v[0], v[1]);
					ct.closePath();
					s = this.getHoleStyle(i).value;
					if (s !== slast) {
						slast = s;
					}
					sgr = ct.createRadialGradient(0, 0, rInner, 0, 0, rOuter);
					sc = s.color.join(',');
					if (i >= p) {
						sgr.addColorStop(0, 'rgba('+sc+',0)');
						sgr.addColorStop(1, 'rgba('+sc+',0.15)');
						ct.shadowBlur = 0;
						ct.shadowColor = 'rgba(0,0,0,0)';
						ct.shadowOffsetX = 0;
						ct.shadowOffsetY = 0;
					} else {//} if ((i+f) <= p) {
						sgr.addColorStop(0, 'rgba('+sc+',0)');
						sgr.addColorStop(0.75, 'rgba('+sc+',0.25)');
						sgr.addColorStop(1, 'rgba('+sc+',0.5)');
						ct.shadowBlur = 5;
						ct.shadowColor = 'rgba('+sc+',1)';
						ct.shadowOffsetX = 0;
						ct.shadowOffsetY = 0;
					}
					ct.strokeStyle = s.fillOut;
					ct.fillStyle = sgr;
					ct.fill();
					ct.stroke();
				}
				ct.restore();
			},
			drawConfiabilityNeedle: function() {
				var ct = this.ct;
				var h2 = this.rConfMax;
				var h2s = this.confS;
				var h2l = h2-h2s;
				var rOuter = 0.975*h2l+h2s;
				var rMid = 0.8*h2l+h2s;
				var rInner = 0.5*h2l+h2s;
				var np = this.cPos;
				var bp = this.cBoostPos;
				var p = Math.min(np, bp);
				var geom = Utils.geometry;
				var uc = Utils.canvas;
				var cas = this.confiabilityAngleStart-1;
				var cal = this.confiabilityAngleLength;
				var angle = geom.domain(0, 100, p, cas, cal);
				var m = geom.rotateZ(angle);
				var v;
				ct.save();
				uc.applyMatrixContext(ct, this.getPlaneZ(+20));
				// uc.applyMatrixContext(ct, m);
				ct.lineWidth = 1.25;
				ct.strokeStyle = 'rgba(191,111,31,1)';
				var gr = ct.createLinearGradient(0, -rOuter, 0, -rInner);
				gr.addColorStop(0, 'rgba(191,127,15,0.5)');
				gr.addColorStop(0.5, 'rgba(191,127,15,0.5)');
				gr.addColorStop(0.75, 'rgba(223,159,31,0.75)');
				gr.addColorStop(1, 'rgba(255,191,63,0.875)');
				// gr = 'rgba(191,111,31,0.5)';
				ct.fillStyle = gr;
				ct.beginPath();
				v = geom.applyMatrix(m, [-3, -rInner, 0]);
				ct.moveTo(v[0], v[1]);
				v = geom.applyMatrix(m, [-2.5, -rMid, 0]);
				ct.lineTo(v[0], v[1]);
				v = geom.applyMatrix(m, [-1.25, -rOuter, 0]);
				ct.lineTo(v[0], v[1]);
				v = geom.applyMatrix(m, [1.25, -rOuter, 0]);
				ct.lineTo(v[0], v[1]);
				v = geom.applyMatrix(m, [2.5, -rMid, 0]);
				ct.lineTo(v[0], v[1]);
				v = geom.applyMatrix(m, [3, -rInner, 0]);
				ct.lineTo(v[0], v[1]);
				ct.shadowBlur = 8;
				ct.shadowColor = 'rgba(255,159,63,1)';
				ct.shadowOffsetX = 0;
				ct.shadowOffsetY = 1;
				ct.fill();
				ct.stroke();
				ct.restore();
			},
			drawConfiabilityBoostNeedle: function() {
				var np = this.cPos;
				var bp = this.cBoostPos;
				var p = Math.max(np, bp);
				var fp = Math.min(np, bp);
				var ct = this.ct;
				var h2 = this.rConfMax;
				var h2s = this.confS;
				var h2l = h2-h2s;
				var rOuter = 0.975*h2l+h2s;
				var rMid = 0.8*h2l+h2s;
				var rInner = 0.5*h2l+h2s;
				var cas = this.confiabilityAngleStart-1;
				var cal = this.confiabilityAngleLength;
				var geom = Utils.geometry;
				var uc = Utils.canvas;
				var angle = geom.domain(0, 100, p, cas, cal);
				var angleNatural = geom.domain(0, 100, fp, cas, cal);
				var angleDiff = angle - angleNatural;
				var m = geom.rotateZ(angle);
				var v, m0, v0;
				ct.save();
				uc.applyMatrixContext(ct, this.getPlaneZ(+20));
				// uc.applyMatrixContext(ct, m);
				ct.lineWidth = 1.25;
				ct.strokeStyle = 'rgba(31,111,191,1)';
				var gr = ct.createLinearGradient(0, -rOuter, 0, -rInner);
				gr.addColorStop(0, 'rgba(15,127,191,0.5)');
				gr.addColorStop(0.5, 'rgba(15,127,191,0.5)');
				gr.addColorStop(0.75, 'rgba(31,159,223,0.75)');
				gr.addColorStop(1, 'rgba(63,191,255,0.875)');
				// gr = 'rgba(191,111,31,0.5)';
				ct.fillStyle = gr;
				ct.beginPath();
				v = geom.applyMatrix(m, [-3, -rInner, 1]);
				ct.moveTo(v[0], v[1]);
				v = geom.applyMatrix(m, [-2.5, -rMid, 1]);
				ct.lineTo(v[0], v[1]);
				v = geom.applyMatrix(m, [-1.25, -rOuter, 1]);
				ct.lineTo(v[0], v[1]);
				v = geom.applyMatrix(m, [1.25, -rOuter, 1]);
				ct.lineTo(v[0], v[1]);
				v = geom.applyMatrix(m, [2.5, -rMid, 1]);
				ct.lineTo(v[0], v[1]);
				v = geom.applyMatrix(m, [3, -rInner, 1]);
				ct.lineTo(v[0], v[1]);
				ct.shadowBlur = 8;
				ct.shadowColor = 'rgba(63,159,255,1)';
				ct.shadowOffsetX = 0;
				ct.shadowOffsetY = 1;
				ct.fill();
				ct.stroke();
				ct.restore();
			},
			drawConfiabilityBoostTrack: function() {
				var np = this.cPos;
				var bp = this.cBoostPos;
				var p = Math.max(np, bp);
				var fp = Math.min(np, bp);
				var ct = this.ct;
				var h2 = this.rConfMax;
				var h2s = this.confS;
				var h2l = h2-h2s;
				var rOuter = 0.975*h2l+h2s;
				var rInner = 0.5*h2l+h2s;
				var cas = this.confiabilityAngleStart-1;
				var cal = this.confiabilityAngleLength;
				var geom = Utils.geometry;
				var uc = Utils.canvas;
				var angle = geom.domain(0, 100, p, cas, cal);
				var angleNatural = geom.domain(0, 100, fp, cas, cal);
				var angleDiff = angle - angleNatural;
				var m = geom.rotateZ(angle);
				var v, m0, v0;
				var i = 0, ic = 1, ia0;//, ia = 0;
				// var isc = ['#3f7fff', '#ff7f3f'];
				v = geom.applyMatrix(m, [0, -rInner, 1]);
				ia0 = angleDiff*(i+1)/ic;
				m0 = geom.rotateZ(angle - ia0);
				v0 = geom.applyMatrix(m0, [0, -rInner, 1]);
				var gr = ct.createLinearGradient(v[0], v[1], v0[0], v0[1]);
				gr.addColorStop(0, 'rgba(63,127,255,0.5)');
				gr.addColorStop(1, 'rgba(63,127,255,0.25)');
				ct.save();
				uc.applyMatrixContext(ct, this.getPlaneZ(+20));
				ct.fillStyle = gr;
				var af = (angle - ia0 - 0.5);
				var at = (angle - 0.5);
				ct.beginPath();
				ct.arc(0, 0, rOuter, af * Math.PI, at * Math.PI, false);
				ct.arc(0, 0, rInner, at * Math.PI, af * Math.PI, true);
				ct.fill();
				// ct.strokeStyle = isc[i%2];
				// ct.beginPath();
				// ct.moveTo(0, 0);
				// ct.lineTo(v[0], v[1]);
				// ct.lineTo(v0[0], v0[1]);
				// ct.closePath();
				// ct.stroke();
				ct.restore();
			},
			drawConfiabilityTicks: function() {
				var ct = this.ct;
				// var w = this.w;
				// var h = this.h;
				// var w2 = this.w2;
				var h2 = this.rConfMax;
				var h2s = this.confS;
				var h2l = h2-h2s;
				var as = this.confiabilityAngleStart;
				var al = this.confiabilityAngleLength;
				var rOuter2 = 1*h2l+h2s;
				var rInner2 = 0.975*h2l+h2s;
				var rOuter = 0.95*h2l+h2s;
				var rInner = 0.925*h2l+h2s;
				var rText = 0.8*h2l+h2s;
				var n = 40;
				var geom = Utils.geometry;
				var uc = Utils.canvas;
				var c = this.ticksColor.slice(0,3).join(',');
				ct.save();
				uc.applyMatrixContext(ct, this.getPlaneZ(0));
				ct.strokeStyle = 'rgba('+c+',1)';
				ct.fillStyle = 'rgba('+c+',1)';
				ct.font = 'bold italic 14px "Arial Black", sans-serif';
				ct.textAlign = 'center';
				for (var i = 0; i <= n; i++) {
					var b = i % 4 == 0;
					var b2 = i % 4 == 2;
					var ai = geom.domain(0, n, i, as, al);
					// var m0 = this.getConfiabilityMatrix(rOuter2, ai);
					var m0 = geom.rotateZ(ai);
					var v1a = [0, rOuter2, 1];
					var v2a = [0, b ? rInner : b2 ? rOuter : rInner2, 1];
					// var v3a = geom.applyMatrix(geom.translate(-20, 0), v2a);
					var v1 = geom.applyMatrix(m0, v1a);
					var v2 = geom.applyMatrix(m0, v2a);
					// var v3 = geom.applyMatrix(m0, v3a);
					ct.beginPath();
					ct.moveTo(v1[0], v1[1]);
					ct.lineTo(v2[0], v2[1]);
					// ct.lineTo(v3[0], v3[1]);
					ct.lineWidth = b ? 2 : 1.25;
					ct.stroke();
					if (b) {
						v2 = geom.applyMatrix(m0, [0, rText, 1]);
						v2 = geom.addVector(v2, [-2, 5, 0]);
						ct.fillText(Number(i/4).toFixed(0), v2[0], v2[1]);
					}
				}
				ct.restore();
			},
			drawConfiabilityPerc: function(perc, z) {
				function aPos(a, v) {
					a = geom.domain(0, 100, a, as, al);
					return geom.applyMatrix(geom.rotateZ(a), v);
				}
				function drawLine(i) {
					ct.beginPath();
					v = aPos(perc[i], [0, -rOuter, 0]);
					ct.moveTo(v[0], v[1]);
					v = aPos(perc[i], [0, -rInner, 0]);
					ct.lineTo(v[0], v[1]);
					ct.stroke();
				}
				function drawArc(i1, i2, rOuter, rInner) {
					i1 = geom.domain(0, 100, perc[i1], as-0.5, al);
					i2 = geom.domain(0, 100, perc[i2], as-0.5, al);
					ct.beginPath();
					ct.arc(0, 0, rOuter, i1*Math.PI, i2*Math.PI, al < 0);
					if (rInner) {
						ct.arc(0, 0, rInner, i2*Math.PI, i1*Math.PI, al >= 0);
						ct.closePath();
						ct.fill();
					}
					ct.stroke();
				}
				function drawTriangle(a, x, y1, y2) {
					var pt = aPos(perc[a], [0, y1, 0]);
					var pl = aPos(perc[a], [-x, y2, 0]);
					var pr = aPos(perc[a], [+x, y2, 0]);
					ct.beginPath();
					ct.moveTo(pt[0], pt[1]);
					ct.lineTo(pl[0], pl[1]);
					ct.lineTo(pr[0], pr[1]);
					ct.closePath();
					ct.fill();
					ct.stroke();
				}
				var geom = Utils.geometry;
				var uc = Utils.canvas;
				var ct = this.ct;
				var h2 = this.rConfMax;
				var h2s = this.confS;
				var h2l = h2-h2s;
				var as = this.confiabilityAngleStart+1;
				var al = this.confiabilityAngleLength;
				var color = perc[1];
				var r = perc[2];
				var rInner = r[0]*h2l+h2s;
				var rInner2 = r[1]*h2l+h2s;
				var rOuter = r[2]*h2l+h2s;
				var rOuter2 = r[3]*h2l+h2s;
				perc = perc[0];
				var pc = perc.length;
				var v;
				ct.save();
				uc.applyMatrixContext(ct, this.getPlaneZ(z));
				ct.strokeStyle = 'rgba('+color.join(',')+',0.5)';
				ct.fillStyle = 'rgba('+color.join(',')+',0.25)';
				ct.lineWidth = 4;
				drawLine(0);
				drawLine(4);
				drawArc(0, 1, rInner2);
				drawArc(1, 3, rOuter, rInner);
				drawArc(3, 4, rInner2);
				drawTriangle(2, 10, -rOuter, -rOuter2);
				ct.lineWidth = 8;
				drawLine(2);
				ct.restore();
			},
			drawPerc: function(perc, z) {
				function aPos(a, v) {
					a = geom.domain(0, 100, a, as, al);
					return geom.applyMatrix(geom.rotateZ(a), v);
				}
				function drawLine(i) {
					ct.beginPath();
					v = aPos(perc[i], [0, -rOuter, 0]);
					ct.moveTo(v[0], v[1]);
					v = aPos(perc[i], [0, -rInner, 0]);
					ct.lineTo(v[0], v[1]);
					ct.stroke();
				}
				function drawArc(i1, i2, rOuter, rInner) {
					i1 = geom.domain(0, 100, perc[i1], as-0.5, al);
					i2 = geom.domain(0, 100, perc[i2], as-0.5, al);
					ct.beginPath();
					ct.arc(0, 0, rOuter, i1*Math.PI, i2*Math.PI, false);
					if (rInner) {
						ct.arc(0, 0, rInner, i2*Math.PI, i1*Math.PI, true);
						ct.closePath();
						ct.fill();
					}
					ct.stroke();
				}
				function drawTriangle(a, x, y1, y2) {
					var pt = aPos(perc[a], [0, y1, 0]);
					var pl = aPos(perc[a], [-x, y2, 0]);
					var pr = aPos(perc[a], [+x, y2, 0]);
					ct.beginPath();
					ct.moveTo(pt[0], pt[1]);
					ct.lineTo(pl[0], pl[1]);
					ct.lineTo(pr[0], pr[1]);
					ct.closePath();
					ct.fill();
					ct.stroke();
				}
				var geom = Utils.geometry;
				var uc = Utils.canvas;
				var ct = this.ct;
				var h2 = this.rMax;
				var as = this.angleStart;
				var al = this.angleLength;
				var color = perc[1];
				var r = perc[2];
				var rInner = r[0]*h2;
				var rInner2 = r[1]*h2;
				var rOuter = r[2]*h2;
				var rOuter2 = r[3]*h2;
				var percFull = perc;
				perc = perc[0];
				var pc = perc.length;
				var v;
				ct.save();
				uc.applyMatrixContext(ct, this.getPlaneZ(z));
				ct.strokeStyle = 'rgba('+color.join(',')+',0.5)';
				ct.fillStyle = 'rgba('+color.join(',')+',0.25)';
				ct.lineWidth = 4;
				drawLine(0);
				drawLine(4);
				drawArc(0, 1, rInner2);
				drawArc(1, 3, rOuter, rInner);
				drawArc(3, 4, rInner2);
				drawTriangle(2, 10, -rOuter, -rOuter2);
				ct.lineWidth = 8;
				drawLine(2);
				ct.restore();
				// this.drawGaugePercLegend(percFull, z);
			},
			drawGaugePercLegend: function(perc, z) {
				function aPos(a) {
					a = geom.domain(0, 100, a, as, al);
					return geom.rotateZ(a);
					// geom.applyMatrix(, v);
				}
				var ct = this.ct;
				var h2 = this.rMax;
				var as = this.angleStart;
				var al = this.angleLength;
				var geom = Utils.geometry;
				var uc = Utils.canvas;
				var color = perc[1];
				var r = perc[2];
				var name = perc[3];
				var rLegend = r[4]*h2;
				perc = perc[0];
				var c = this.colorInterLinear(0.75, color, [255,255,255]);
				var nl, lh, lt, a, m, v, v0, wMax;
				ct.save();
				uc.applyMatrixContext(ct, this.getPlaneZ(z));
				ct.fillStyle = 'rgba('+c.join(',')+',1)';
				ct.font = 'bold italic 14px "Arial", sans-serif';
				ct.textAlign = 'center';
				// for (var i = 0; i < subCount; i++) {
					// s = subs[i];
					nl = name.length;
					lh = 16;
					lt = Math.round((nl-1)*lh*-0.5);
					// a = i * 2 / subCount + as;
					m = aPos(perc[2]);
					v = geom.applyMatrix(m, [0.375, 0, 1]);
					wMax = 0;
					for (var j = 0; j < nl; j++) {
						v0 = ct.measureText(name[j]);
						wMax = Math.max(wMax, v0.width);
					}
					v0 = geom.applyMatrix(m, [0, -rLegend, 1]);
					for (j = 0; j < nl; j++) {
						ct.fillText(name[j], v[1] * wMax + v0[0], v0[1] + j * lh + lt);
					}
					// v0 = geom.applyMatrix(geom.rotateZ(a), [0, 1, 1]);
				// }
				ct.restore();
			},
			drawLineLegend: function(left, top, width, lh, text, cstroke, ctext) {
				var ct = this.ct;
				ct.strokeStyle = 'rgba('+cstroke.join(',')+')';//,0.625
				ct.beginPath();
				ct.moveTo(left, top);
				ct.lineTo(left+width, top);
				ct.stroke();
				ct.fillStyle = 'rgba('+ctext.join(',')+')';//,1
				this.drawTextLines(text, left + width * 0.5, top+20, 0.5, lh);
			},
			drawLineLegendPerc: function(left, top, width, lh, perc) {
				var c = perc[1];
				var text = perc[3];
				var c0 = c.slice(0, 3).concat([0.625]);
				var c1 = this.colorInterLinear(0.75, c, [255,255,255]).concat([1]);

				this.drawLineLegend(left, top, width, lh, text, c0, c1);
			},
			drawLineLegendNeedle: function(left, top, width, lh, needle) {
				var c = needle.colors.text;
				var text = needle.name;
				var c0 = c.slice(0, 3).concat([0.75]);
				var c1 =  c.slice(0, 3).concat([1]);

				this.drawLineLegend(left, top, width, lh, text, c0, c1);
			},
			drawNeedleLegend: function(left, top, width, lh, needle) {
				var geom = Utils.geometry;
				var colors = needle.colors;
				var ct = this.ct;
				this.drawCustomNeedle({
					mlist: [
						geom.translate(left, top),
						geom.rotateZ(0.5)
					],
					sidePath: [
						[-3, 0],
						[-2, -width*0.75],
						[-0.75, -width]
					],
					start: [0, 0],
					end: [0, -width],
					lineWidth: 1.25
				}, colors);

				ct.fillStyle = 'rgba('+colors.text.join(',')+')';
				this.drawTextLines(needle.name, left + width * 0.5, top+20, 0.5, lh);
			},
			drawGaugeLegend: function() {
				var h2 = this.rMax;
				var rOuter = 1.25*h2;
				var width = 60;
				var left = 0 - width - rOuter;
				var lh = 15;
				var ct = this.ct;
				var uc = Utils.canvas;
				var top;
				ct.save();
				uc.applyMatrixContext(ct, this.getPlaneZ(-20));
				ct.font = 'bold italic 12px "Arial", sans-serif';
				ct.textAlign = 'center';
				ct.lineWidth = 4;

				top = -100;
				this.drawLineLegendPerc(left, top, width, lh, this.percGeral);

				top = -40;
				this.drawLineLegendPerc(left, top, width, lh, this.percFraude);

				top = 20;
				this.drawNeedleLegend(left, top, width, lh, this.needleCandidato);

				top = 80;
				this.drawNeedleLegend(left, top, width, lh, this.needleSolucao);

				ct.restore();
			},
			drawWebLegend: function(opt) {
				// var h2 = opt.rOuter;
				var h2 = this.radiusWeb;
				var rOuter = this.radiusWebLegendFactor*h2;
				var gcx = opt.centerX;
				var gcy = opt.centerY;
				var width = this.widthWebLegend;//60;
				var left = 0 - width - rOuter;
				var lh = 15;
				var ct = this.ct;
				var uc = Utils.canvas;
				var geom = Utils.geometry;
				var top;
				ct.save();
				uc.applyMatrixContext(ct, geom.translate(gcx, gcy));
				uc.applyMatrixContext(ct, this.getPlaneZ(-20, opt.mlist));
				ct.font = 'bold italic 12px "Arial", sans-serif';
				ct.textAlign = 'center';
				ct.lineWidth = 4;

				top = -100;
				this.drawLineLegendPerc(left, top, width, lh, this.percGeral);

				top = -40;
				this.drawLineLegendPerc(left, top, width, lh, this.percFraude);

				top = 20;
				this.drawLineLegendNeedle(left, top, width, lh, this.needleCandidato);

				top = 80;
				this.drawLineLegendNeedle(left, top, width, lh, this.needleSolucao);

				ct.restore();
			},
			drawConfLegend: function() {
				var h2 = this.rConfMax;
				var h2s = this.confS;
				var h2l = h2-h2s;
				var as = this.confiabilityAngleStart;
				var al = this.confiabilityAngleLength;
				var rOuter = 1.4375*h2l+h2s;//375 + 0625 = 4375
				var width = 60;
				var left = 0 - width - rOuter;
				var lh = 15;
				var ct = this.ct;
				var uc = Utils.canvas;
				var top;
				ct.save();
				uc.applyMatrixContext(ct, this.getPlaneZ(-20));
				ct.font = 'bold italic 12px "Arial", sans-serif';
				ct.textAlign = 'center';
				ct.lineWidth = 4;

				top = -100;
				this.drawLineLegendPerc(left, top, width, lh, this.confiabilityPercGeral);

				top = -40;
				this.drawLineLegendPerc(left, top, width, lh, this.confiabilityPercFraude);

				top = 20;
				this.drawNeedleLegend(left, top, width, lh, this.needleCandidato);

				top = 80;
				this.drawNeedleLegend(left, top, width, lh, this.needleSolucao);

				ct.restore();
			},
			drawTitle: function() {
				function fnStyleDef() {
					return {
						fontFamily: '"Arial Black", Arial, sans-serif',
						fontStyle: 'bold italic',
						fontSize: 24,
						// fill: 'rgba(255,255,255,1)',
						fill: 'rgba('+vm.textColor.join(',')+')',
						lineHeight: 32,
						align: 'center',
						anchorVertical: 0.5
					};
				}
				function addFont(v) {
					v && font.push(v);
				}
				var vm = this;
				var style = this.titleStyle;
				style = style ? Utils.extend(fnStyleDef(), style) : fnStyleDef();
				var ct = this.ct;
				var font = [];
				addFont(style.fontStyle);
				addFont(Number(style.fontSize).toFixed(0)+'px');
				addFont(style.fontFamily);
				ct.save();
				ct.fillStyle = style.fill;
				ct.font = font.join(' ');
				ct.textAlign = style.align;
				this.drawTextLines(
					this.titleLines,
					this.titleX * this.w,
					this.titleY * this.h,
					style.anchorVertical,
					style.lineHeight
				);
				ct.restore();
			},
			drawTextLines: function(text, x, y, ay, lh) {
				var ct = this.ct;
				var tc = text.length;
				var tt = (1 - tc) * ay;
				for (var i = 0; i < text.length; i++) {
					ct.fillText(text[i], x, y + tt + i * lh);
				}
			},
			drawRotate: function() {
				var ct = this.ct;
				var geom = Utils.geometry;
				var uc = Utils.canvas;
				var mlist = this.mlist;
				var z1 = -20, z1b = -100;
				var z2 = 20, z2b = 100;
				var l = [
					[-100, -100, [1, 0, 0], [0, 1, 0]],
					[100, -100, [0, 1, 0], [-1, 0, 0]],
					[100, 100, [-1, 0, 0], [0, -1, 0]],
					[-100, 100, [0, -1, 0], [1, 0, 0]]
				];
				ct.save();
				ct.strokeStyle = 'rgba(255,255,255,0.125)';
				ct.lineWidth = 5;
				Utils.forEach(l, function(l) {
					var po, px, py, m, p;
					ct.save();
					po = [l[0], l[1], 0];
					px = [0, 0, 1];
					py = [0, 1, 0];
					m = geom.getPlane([po, px, py], mlist);
					// uc.applyMatrixContext(ct, );
					ct.beginPath();
					p = geom.applyMatrix(m, [z1b, 0, 1]);
					ct.moveTo(p[0], p[1]);
					p = geom.applyMatrix(m, [z2b, 0, 1]);
					ct.lineTo(p[0], p[1]);
					ct.strokeStyle = 'rgba(127,127,255,0.25)';
					ct.stroke();
					ct.restore();
					//
					ct.save();
					po = [l[0], l[1], z1b];
					px = l[2];
					py = l[3];
					uc.applyMatrixContext(ct, geom.getPlane([po, px, py], mlist));
					ct.beginPath();
					ct.moveTo(z2, 0);
					ct.lineTo(-z2, 0);
					ct.strokeStyle = 'rgba(255,0,0,0.25)';
					ct.stroke();
					ct.beginPath();
					ct.moveTo(-z2, 0);
					ct.lineTo(0, -z2);
					ct.strokeStyle = 'rgba(0,0,255,0.25)';
					ct.stroke();
					ct.beginPath();
					ct.moveTo(0, -z2);
					ct.lineTo(0, z2);
					ct.strokeStyle = 'rgba(0,255,0,0.25)';
					ct.stroke();
					ct.restore();
				});
				ct.restore();
			},
			fnGetStyle: function(p, list, onlyGt) {
				var i = -1, s;
				for (i = list.length-1; i >= 0; i--) {
					s = list[i];
					if (p > s.start || ((!onlyGt || !p) && p == s.start)) break;
				}
				return {
					index: i,
					value: s
				};
			},
			getBarHoleStyle: function(p, onlyGt) {
				return this.fnGetStyle(p, this.barSegments, onlyGt);
			},
			getHoleStyle: function(p, onlyGt) {
				return this.fnGetStyle(p, this.nSegments, onlyGt);
			},
			drawHoles: function() {
				var ct = this.ct;
				var h2 = this.rMax;
				var rOuter = 0.9*h2;
				var rMidOuter = 0.75*h2;
				var rMidInner = 0.7*h2;
				var rInner = 0.55*h2;
				var as = this.angleStart;
				var al = this.angleLength;
				var geom = Utils.geometry;
				var uc = Utils.canvas;
				var n = 100;
				var p = Math.max(this.boostPos, this.nPos);
				var f = 5;
				var s, slast, sgr, sc;
				var v, v0;
				var a1, a2, a3, a4;
				var m1, m2, m3, m4;
				ct.save();
				uc.applyMatrixContext(ct, this.getPlaneZ(-20));
				ct.strokeStyle = 'rgba(255,255,255,0.15)';
				ct.fillStyle = 'rgba(255,255,255,0.075)';
				for (var i = 0; i < n; i += f) {
					a1 = geom.domain(0, n, i+0.5, as, al);
					a2 = geom.domain(0, n, i+2, as, al);
					a3 = geom.domain(0, n, i+3, as, al);
					a4 = geom.domain(0, n, i+4.5, as, al);
					m1 = geom.rotateZ(a1);
					m2 = geom.rotateZ(a2);
					m3 = geom.rotateZ(a3);
					m4 = geom.rotateZ(a4);
					ct.beginPath();
					v = geom.applyMatrix(m1, [0, -rMidOuter, 1]);
					ct.moveTo(v[0], v[1]);
					v0 = geom.applyMatrix(m1, [0, -rOuter, 1]);
					v = geom.applyMatrix(m2, [0, -rOuter, 1]);
					ct.bezierCurveTo(v0[0], v0[1], v0[0], v0[1], v[0], v[1]);
					// ct.lineTo(v[0], v[1]);
					v = geom.applyMatrix(m3, [0, -rOuter, 1]);
					ct.lineTo(v[0], v[1]);
					v0 = geom.applyMatrix(m4, [0, -rOuter, 1]);
					v = geom.applyMatrix(m4, [0, -rMidOuter, 1]);
					ct.bezierCurveTo(v0[0], v0[1], v0[0], v0[1], v[0], v[1]);
					// ct.lineTo(v[0], v[1]);
					v = geom.applyMatrix(m4, [0, -rMidInner, 1]);
					ct.lineTo(v[0], v[1]);
					v0 = geom.applyMatrix(m4, [0, -rInner, 1]);
					v = geom.applyMatrix(m3, [0, -rInner, 1]);
					ct.bezierCurveTo(v0[0], v0[1], v0[0], v0[1], v[0], v[1]);
					// ct.lineTo(v[0], v[1]);
					v = geom.applyMatrix(m2, [0, -rInner, 1]);
					ct.lineTo(v[0], v[1]);
					v0 = geom.applyMatrix(m1, [0, -rInner, 1]);
					v = geom.applyMatrix(m1, [0, -rMidInner, 1]);
					ct.bezierCurveTo(v0[0], v0[1], v0[0], v0[1], v[0], v[1]);
					ct.closePath();
					s = this.getHoleStyle(i).value;
					if (s !== slast) {
						slast = s;
					}
					sgr = ct.createRadialGradient(0, 0, rInner, 0, 0, rOuter);
					sc = s.color.join(',');
					if (i >= p) {
						sgr.addColorStop(0, 'rgba('+sc+',0)');
						sgr.addColorStop(1, 'rgba('+sc+',0.15)');
						ct.shadowBlur = 0;
						ct.shadowColor = 'rgba(0,0,0,0)';
						ct.shadowOffsetX = 0;
						ct.shadowOffsetY = 0;
					} else {//} if ((i+f) <= p) {
						sgr.addColorStop(0, 'rgba('+sc+',0)');
						sgr.addColorStop(0.75, 'rgba('+sc+',0.25)');
						sgr.addColorStop(1, 'rgba('+sc+',0.5)');
						ct.shadowBlur = 5;
						ct.shadowColor = 'rgba('+sc+',1)';
						ct.shadowOffsetX = 0;
						ct.shadowOffsetY = 0;
					}
					ct.strokeStyle = s.fillOut;
					ct.fillStyle = sgr;
					ct.fill();
					ct.stroke();
				}
				ct.restore();
			},
			drawCustomNeedle: function(opt, colors) {
				var ct = this.ct;
				var side = opt.sidePath;
				// var rOuter = opt.rOuter;
				// var rMid = opt.rMid;
				// var rInner = opt.rInner;
				// var geom = Utils.geometry;
				var uc = Utils.canvas;
				var v, v0, i, grsi, grs = colors.gradient;
				ct.save();
				Utils.forEach(opt.mlist, function(m) {
					uc.applyMatrixContext(ct, m);
				});
				ct.lineWidth = opt.lineWidth || 1.25;
				ct.strokeStyle = 'rgba('+colors.stroke.join(',')+')';
				v = opt.start;//[0, -rOuter, 1];
				v0 = opt.end;//[0, -rInner, 1];
				var gr = ct.createLinearGradient(v[0], v[1], v0[0], v0[1]);
				for (var i = 0; i < grs.length; i++) {
					grsi = grs[i];
					gr.addColorStop(grsi[0], 'rgba('+grsi[1].join(',')+')');
				}
				ct.fillStyle = gr;
				ct.beginPath();
				v = side[0];
				ct.moveTo(v[0], v[1]);
				for (i = 1; i < side.length; i++) {
					v = side[i];
					ct.lineTo(v[0], v[1]);
				}
				for (i = side.length - 1; i >= 0; i--) {
					v = side[i];
					ct.lineTo(-v[0], v[1]);
				}
				// ct.moveTo(-3, -rInner);
				// ct.lineTo(-2.5, -rMid);
				// ct.lineTo(-0.75, -rOuter);
				// ct.lineTo(0.75, -rOuter);
				// ct.lineTo(2.5, -rMid);
				// ct.lineTo(3, -rInner);
				ct.shadowBlur = 8;
				ct.shadowColor = 'rgba('+colors.shadow.join(',')+')';//'rgba(255,159,63,1)';
				ct.shadowOffsetX = 0;
				ct.shadowOffsetY = 1;
				ct.fill();
				ct.stroke();
				ct.restore();
			},
			drawNeedle: function() {
				var np = this.nPos;
				var bp = this.boostPos;
				var p = Math.min(np, bp);
				var ct = this.ct;
				var h2 = this.rMax;
				var rOuter = 0.925*h2;
				var rMid = 0.775*h2;
				var rInner = 0.5*h2;
				var as = this.angleStart;
				var al = this.angleLength;
				var geom = Utils.geometry;
				var uc = Utils.canvas;
				var angle = geom.domain(0, 100, p, as, al);
				var m = geom.rotateZ(angle);
				var v;
				ct.save();
				uc.applyMatrixContext(ct, this.getPlaneZ(+20));
				// uc.applyMatrixContext(ct, m);
				ct.lineWidth = 1.25;
				ct.strokeStyle = 'rgba(191,111,31,1)';
				var gr = ct.createLinearGradient(0, -rOuter, 0, -rInner);
				gr.addColorStop(0, 'rgba(191,127,15,0.5)');
				gr.addColorStop(0.5, 'rgba(191,127,15,0.5)');
				gr.addColorStop(0.75, 'rgba(223,159,31,0.75)');
				gr.addColorStop(1, 'rgba(255,191,63,0.875)');
				// gr = 'rgba(191,111,31,0.5)';
				ct.fillStyle = gr;
				ct.beginPath();
				v = geom.applyMatrix(m, [-3, 0, 0]);
				ct.moveTo(v[0], v[1]);
				v = geom.applyMatrix(m, [-2.5, -rMid, 0]);
				ct.lineTo(v[0], v[1]);
				v = geom.applyMatrix(m, [-1.25, -rOuter, 0]);
				ct.lineTo(v[0], v[1]);
				v = geom.applyMatrix(m, [1.25, -rOuter, 0]);
				ct.lineTo(v[0], v[1]);
				v = geom.applyMatrix(m, [2.5, -rMid, 0]);
				ct.lineTo(v[0], v[1]);
				v = geom.applyMatrix(m, [3, 0, 0]);
				ct.lineTo(v[0], v[1]);
				ct.shadowBlur = 8;
				ct.shadowColor = 'rgba(255,159,63,1)';
				ct.shadowOffsetX = 0;
				ct.shadowOffsetY = 1;
				ct.fill();
				ct.stroke();
				ct.restore();
			},
			drawBoostNeedle: function() {
				var np = this.nPos;
				var bp = this.boostPos;
				var p = Math.max(np, bp);
				var fp = Math.min(np, bp);
				var ct = this.ct;
				var h2 = this.rMax;
				var rOuter = 0.925*h2;
				var rMid = 0.775*h2;
				var rInner = 0.5*h2;
				var as = this.angleStart;
				var al = this.angleLength;
				var geom = Utils.geometry;
				var uc = Utils.canvas;
				var angle = geom.domain(0, 100, p, as, al);
				var angleNatural = geom.domain(0, 100, fp, as, al);
				var angleDiff = angle - angleNatural;
				var m = geom.rotateZ(angle);
				var v, m0, v0;
				ct.save();
				uc.applyMatrixContext(ct, this.getPlaneZ(+20));
				// uc.applyMatrixContext(ct, m);
				ct.lineWidth = 1.25;
				ct.strokeStyle = 'rgba(31,111,191,1)';
				var gr = ct.createLinearGradient(0, -rOuter, 0, -rInner);
				gr.addColorStop(0, 'rgba(15,127,191,0.5)');
				gr.addColorStop(0.5, 'rgba(15,127,191,0.5)');
				gr.addColorStop(0.75, 'rgba(31,159,223,0.75)');
				gr.addColorStop(1, 'rgba(63,191,255,0.875)');
				// gr = 'rgba(191,111,31,0.5)';
				ct.fillStyle = gr;
				ct.beginPath();
				v = geom.applyMatrix(m, [-3, 0, 0]);
				ct.moveTo(v[0], v[1]);
				v = geom.applyMatrix(m, [-2.5, -rMid, 0]);
				ct.lineTo(v[0], v[1]);
				v = geom.applyMatrix(m, [-1.25, -rOuter, 0]);
				ct.lineTo(v[0], v[1]);
				v = geom.applyMatrix(m, [1.25, -rOuter, 0]);
				ct.lineTo(v[0], v[1]);
				v = geom.applyMatrix(m, [2.5, -rMid, 0]);
				ct.lineTo(v[0], v[1]);
				v = geom.applyMatrix(m, [3, 0, 0]);
				ct.lineTo(v[0], v[1]);
				ct.shadowBlur = 8;
				ct.shadowColor = 'rgba(63,159,255,1)';
				ct.shadowOffsetX = 0;
				ct.shadowOffsetY = 1;
				ct.fill();
				ct.stroke();
				ct.restore();
			},
			drawBoostTrack: function() {
				var np = this.nPos;
				var bp = this.boostPos;
				var p = Math.max(np, bp);
				var fp = Math.min(np, bp);
				var ct = this.ct;
				var h2 = this.rMax;
				var rOuter = 0.925*h2;
				var rInner = 0.5*h2;
				var as = this.angleStart;
				var al = this.angleLength;
				var geom = Utils.geometry;
				var uc = Utils.canvas;
				var angle = geom.domain(0, 100, p, as, al);
				var angleNatural = geom.domain(0, 100, fp, as, al);
				var angleDiff = angle - angleNatural;
				var m = geom.rotateZ(angle);
				var v, m0, v0;
				var i = 0, ic = 1, ia0;//, ia = 0;
				// var isc = ['#3f7fff', '#ff7f3f'];
				v = geom.applyMatrix(m, [0, -rInner, 0]);
				ia0 = angleDiff*(i+1)/ic;
				m0 = geom.rotateZ(angle - ia0);
				v0 = geom.applyMatrix(m0, [0, -rInner, 0]);
				var gr = ct.createLinearGradient(v[0], v[1], v0[0], v0[1]);
				gr.addColorStop(0, 'rgba(63,127,255,0.5)');
				gr.addColorStop(1, 'rgba(63,127,255,0.25)');
				ct.save();
				uc.applyMatrixContext(ct, this.getPlaneZ(+20));
				ct.fillStyle = gr;
				var af = (angle - ia0 - 0.5);
				var at = (angle - 0.5);
				ct.beginPath();
				ct.arc(0, 0, rOuter, af * Math.PI, at * Math.PI, false);
				ct.arc(0, 0, rInner, at * Math.PI, af * Math.PI, true);
				ct.fill();
				// ct.strokeStyle = isc[i%2];
				// ct.beginPath();
				// ct.moveTo(0, 0);
				// ct.lineTo(v[0], v[1]);
				// ct.lineTo(v0[0], v0[1]);
				// ct.closePath();
				// ct.stroke();
				ct.restore();
			},
			drawBg: function() {
				var uc = Utils.canvas;
				var ct = this.ct;
				var h2 = this.rMax;
				var rOuter = 1.125*h2;
				var rInner = 0.5*h2;
				var as = this.angleStart*Math.PI;
				var al = 2*Math.PI+as;
				var pi2 = 2*Math.PI;
				var cbg = (this.bgColor).slice(0,3).join(',');
				var color = (this.gaugeBgColor).slice(0,3).join(',');
				var alpha = ','+fracStr(this.gaugeBgAlpha);
				var gr = ct.createRadialGradient(0, 0, 0, 0, 0, rOuter);
				gr.addColorStop(0, 'rgba('+color+alpha+')');
				gr.addColorStop(0.85, 'rgba('+color+',0)');
				gr.addColorStop(0.925, 'rgba('+color+alpha+')');
				gr.addColorStop(1, 'rgba('+color+',0)');
				ct.save();
				uc.applyMatrixContext(ct, this.getPlaneZ(-40));
				ct.fillStyle = gr;
				ct.beginPath();
				ct.arc(0, 0, rOuter, as, al, false);
				// ct.arc(0, 0, rInner, al, as, true);
				ct.closePath();
				ct.fill();
				gr = ct.createRadialGradient(0, rInner, 0, 0, rInner, rInner + rOuter);
				gr.addColorStop(0, 'rgba('+cbg+',0)');
				gr.addColorStop(1, 'rgba('+cbg+',1)');
				ct.fillStyle = gr;
				ct.beginPath();
				ct.arc(0, 0, rOuter, 0, pi2, false);
				ct.fill();
				// ct.stroke();
				ct.restore();
			},
			drawTicks: function() {
				var ct = this.ct;
				// var w = this.w;
				// var h = this.h;
				// var w2 = this.w2;
				var h2 = this.rMax;
				var as = this.angleStart;
				var al = this.angleLength;
				var n = 100;
				var geom = Utils.geometry;
				var uc = Utils.canvas;
				var c = this.ticksColor.slice(0,3).join(',');
				ct.save();
				uc.applyMatrixContext(ct, this.getPlaneZ(0));
				ct.strokeStyle = 'rgba('+c+',1)';
				ct.fillStyle = 'rgba('+c+',1)';
				ct.font = 'bold italic 20px "Arial Black", sans-serif';
				ct.textAlign = 'center';
				for (var i = 0; i <= n; i++) {
					var b = i % 10 == 0;
					var b2 = i % 10 == 5;
					var m = geom.rotateZ(geom.domain(0, n, i, as, al));
					var v1 = geom.applyMatrix(m, [0, -0.95*h2, 1]);
					var v2 = geom.applyMatrix(m, [0, (b ? -0.85 : b2 ? -0.875 : -0.925)*h2, 1]);
					ct.beginPath();
					ct.moveTo(v1[0], v1[1]);
					ct.lineTo(v2[0], v2[1]);
					ct.lineWidth = b ? 3 : 1.25;
					ct.stroke();
					if (b) {
						v2 = geom.applyMatrix(m, [0, -0.725*h2, 1]);
						v2 = geom.addVector(v2, [-2, 5, 0]);
						ct.fillText(Number(i/10).toFixed(0), v2[0], v2[1]);
					}
				}
				ct.restore();
			},
			drawSpeed: function() {
				var ct = this.ct;
				var h2 = this.rMax;
				var rInner = 0.4*h2;
				var np = this.nPos;
				var bp = this.boostPos;
				var p = Math.max(np, bp);
				var fp = Math.min(np, bp);
				var uc = Utils.canvas;
				var cbg = this.bgColor.slice(0,3);
				var cNormal = this.gaugeColorSpeedNormal.slice(0,3);
				var cBoost = this.gaugeColorSpeedBoost.slice(0,3);
				var cSum = this.gaugeColorSpeedSum.slice(0,3);
				ct.save();
				uc.applyMatrixContext(ct, this.getPlaneZ(+20));
				ct.beginPath();
				ct.arc(0, 0, rInner, 0, 2*Math.PI, false);
				ct.fillStyle = 'rgba('+cbg.join(',')+',1)';
				ct.fill();
				ct.restore();
				ct.save();
				uc.applyMatrixContext(ct, this.getPlaneZ(+50));
				ct.font = 'bold italic 72px "Arial Black", sans-serif';
				ct.fillStyle = 'rgba('+cNormal.join(',')+',1)';//p > fp ? 'rgba('+cBoost.join(',')+',1)' : 
				ct.textAlign = 'center';
				ct.shadowBlur = 5;
				ct.shadowColor = 'rgba('+cNormal.join(',')+',0.5)';//p > fp ? 'rgba('+cBoost.join(',')+',0.5)' : 
				ct.shadowOffsetX = 3;
				ct.shadowOffsetY = 3;
				ct.fillText(Number(fp).toFixed(), -12, h2*0.15);
				if (p > fp) {
					ct.font = 'bold italic 18px "Arial Black", sans-serif';
					ct.fillStyle = 'rgba('+cBoost.join(',')+',1)';
					ct.textAlign = 'right';
					ct.shadowColor = 'rgba('+cBoost.join(',')+',0.5)';
					ct.fillText('+'+Number(p - fp).toFixed(), -14, h2*0.3);
					ct.font = 'bold italic 28px "Arial Black", sans-serif';
					ct.fillStyle = 'rgba('+cSum.join(',')+',1)';
					ct.textAlign = 'left';
					ct.shadowColor = 'rgba('+cSum.join(',')+',0.5)';
					ct.fillText(Number(p).toFixed(), -12, h2*0.35);
				}
				ct.restore();
			},
			draw: function() {
				var ct = this.ct;
				var w = this.w;
				var h = this.h;
				var w2 = w*0.5;
				var h2 = h*0.5;
				var bs = this.barScale;
				var ws = this.webScale;
				ct.save();
				ct.fillStyle = 'rgba('+this.bgColor.slice(0,4).join(',')+')';//'#000000';
				ct.strokeStyle = '#ffffff';
				ct.fillRect(0, 0, w, h);
				if (null != this.barH) {
					ct.save();
					ct.translate(w2, h2);
					ct.scale(bs, bs);
					ct.translate(-w2/bs, -h2/bs);
					this.drawBarGraphAll();
					//this.drawIndiceTitle();
					ct.restore();
				}
				if (null != this.webR) {
					ct.save();
					ct.translate(w2, h2);
					ct.scale(ws, ws);
					ct.translate(-w2/ws, -h2/ws);
					this.drawWebGraphAll();
					ct.restore();
				}
				ct.restore();
				if (null != this.gaugeR) {
					ct.save();
					ct.translate(w*this.gaugeX, h*this.gaugeY);
					this.drawBg();
					this.drawHoles();
					this.drawTicks();
					this.drawBoostTrack();
					this.drawBoostNeedle();
					this.drawNeedle();
					this.drawSpeed();
					// this.drawRotate();
					this.drawPerc(this.percGeral, +10);
					this.drawPerc(this.percFraude, +30);
					this.drawGaugeLegend();
					ct.restore();
				}
				if (null != this.confX && null != this.confY) {
					ct.save();
					ct.transform(1, 0, 0, 1, w*this.confX+(this.confDX||0), h*this.confY+(this.confDY||0));
					this.drawConfiabilityHoles();
					this.drawConfiabilityTicks();
					this.drawConfiabilityBoostTrack();
					this.drawConfiabilityBoostNeedle();
					this.drawConfiabilityNeedle();
					this.drawConfiabilityPerc(this.confiabilityPercGeral, +10);
					this.drawConfiabilityPerc(this.confiabilityPercFraude, +30);
					this.drawConfLegend();
					ct.restore();
				}
				if (null != this.titleLines) {
					this.drawTitle();
				}
			},
			getPlaneZ: function(z, mlist) {
				var p = [
					[1, 0, 0],
					[0, 1, 0],
					[0, 0, z]
				];
				return Utils.geometry.getPlane(p, mlist || this.mlist);
			},
			listenMouseDown: function() {
				var cv = this.$refs.canvas;
				cv.addEventListener('mousedown', this.onMouseDown, false);
			},
			forgetMouseDown: function() {
				var cv = this.$refs.canvas;
				cv.removeEventListener('mousedown', this.onMouseDown, false);
			},
			listenMouseMove: function() {
				var cv = this.$refs.canvas;
				cv.addEventListener('mousemove', this.onMouseMove, false);
			},
			forgetMouseMove: function() {
				var cv = this.$refs.canvas;
				cv.removeEventListener('mousemove', this.onMouseMove, false);
			},
			listenMouseLeave: function() {
				var cv = this.$refs.canvas;
				cv.addEventListener('mouseleave', this.onMouseLeave, false);
			},
			forgetMouseLeave: function() {
				var cv = this.$refs.canvas;
				cv.removeEventListener('mouseleave', this.onMouseLeave, false);
			},
			onMouseDown: function() {
				// var ms = this.mouseStop = !this.mouseStop;
				// if (ms) {
				// 	this.stopAnimationCPos();
				// 	this.stopAnimationPos();
				// } else {
				// 	this.startAnimationCPos();
				// 	this.startAnimationPos();
				// }
				var cv = this.$refs.canvas;
				this.mousePressed = true;
				// cv.addEventListener('mouseup', this.onMouseUp, false);
				// this.listenMouseMove();
				var bars = this.barGraphs;
				var ibo = this.barOpen;
				var ibh = this.barHover;
				var bo, bos;
				if (ibo === this.barOpenFrom && ibh !== -1) {
					if (ibo === -1) {
						bo = bars[ibh];
						bos = bo.subs;
						if (bos && bos.length) {
							this.barOpenFrom = ibo;
							this.barOpen = ibh;
							this.startAnimationBarOpen();
							Utils.forEach(bos, this.startAnimationBarPos);
						} else {
							this.openBarDetails(bo);
						}
					} else {
						bo = bars[ibo];
						bos = bo.subs;
						if (ibh === 0) {
							this.barOpenFrom = ibo;
							this.barOpen = -1;
							this.startAnimationBarOpen();
						} else {
							this.openBarDetails(bos[ibh-1]);
						}
					}
				}
			},
			openBarDetails: function(bar){
				// console.log('openBarDetails', bar);
				this.$emit('clickRelatorioSubtema', bar);
			},
			onMouseUp: function() {
				var cv = this.$refs.canvas;
				this.mousePressed = false;
				cv.removeEventListener('mouseup', this.onMouseUp, false);
				this.forgetMouseMove();
				this.draw();
			},
			onMouseMove: function(ev) {
				var cv = this.$refs.canvas;
				var rect = cv.getBoundingClientRect();
				var x = this.mouseX = ev.clientX - rect.left;
				var y = this.mouseY = ev.clientY - rect.top;
				this.rx = x - this.gaugeCenterX;
				this.ry = y - this.gaugeCenterY;
				this.updateMouseRotation();
				this.updateBarHover();
				this.draw();
			},
			onMouseEnter: function() {
				this.mouseInside = false;//true; desativar a rotação no mouse
				this.stopAnimationMouse();
				this.startAnimationMouse();
			},
			onMouseLeave: function() {
				this.mouseInside = false;
				this.stopAnimationMouse();
				this.startAnimationMouse();
			},
			getMouseRotation: function(cx, cy, fx, fy) {
				var geom = Utils.geometry;
				return [
					geom.rotateY((cx*this.mousePower)/(fx*this.w)),
					geom.rotateX((-cy*this.mousePower)/(fy*this.h))
				];
			},
			updateMouseRotation: function() {
				var vm = this;
				this.mlist = this.getMouseRotation(this.rx, this.ry, 4, 4);
				var mx = this.mouseX;
				var my = this.mouseY;
				Utils.forEach(this.barGraphs, updateRotationBar);
				Utils.forEach(this.webGraphs, updateRotationWeb);
				function updateRotationBar(bar) {
					var x = mx - bar.centerX;
					var y = my - bar.centerY;
					bar.mlist = vm.getMouseRotation(x, y, 4, 4);
					var subs = bar.subs;
					if (subs && subs.length) {
						Utils.forEach(subs, updateRotationBar);
					}
				}
				function updateRotationWeb(web) {
					var x = mx - web.centerX;
					var y = my - web.centerY;
					web.mlist = vm.getMouseRotation(x, y, 4, 4);
				}
			},
			updateBarHover: function() {
				var ibo = this.barOpen;
				if (ibo !== this.barOpenFrom) return;
				var ct = this.ct;
				var h2 = this.rBarHeight;
				var rSide = 75;
				var rVertMargin = 40;
				var rVertOut = h2+rVertMargin;
				var x = this.mouseX;
				var y = this.mouseY;
				var bars = this.barGraphs;
				var bo = ibo === -1 ? null : bars[ibo];
				var bos = bo && bo.subs;
				bars = bo ? [bo].concat(bos || []) : bars;
				var barHoverIndex = -1;
				Utils.forEach(bars, function(bar, i) {
					if (bar.opacity <= 0) return;
					var bcx = bar.centerX;
					var bcy = bar.centerY;
					if (
						bcx-rSide < x && x < bcx+rSide &&
						bcy-rVertOut < y && y < bcy+rVertOut
					) {
						barHoverIndex = i;
						return this._break;
					}
				});
				if (barHoverIndex !== this.barHover) {
					this.barHoverFrom = this.barHover;
					this.barHover = barHoverIndex;
					Utils.forEach(bars, this.stopAnimationBarHover);
					Utils.forEach(bars, this.startAnimationBarHover);
				}
			},
			initBarBgColor: function(opt) {
				var s = this.getBarHoleStyle(opt.pos).value;
				s && (opt.bgColor = s.bgColor);
				var subs = opt.subs;
				if (subs && subs.length) {
					Utils.forEach(subs, this.initBarBgColor);
				}
			},
			initBarAllOffsetX: function() {
				var bars = this.barGraphs;
				var barCount = bars.length;
				var barWidth = this.barW;//150;
				var bHalfMain = (barCount - 1) * 0.5;
				Utils.forEach(bars, function(bar, i) {
					bar.offsetX = -bHalfMain * barWidth;
					var subs = bar.subs;
					var subCount = subs && subs.length;
					if (subCount) {
						Utils.forEach(subs, function(s) {
							s.offsetX = (1-bHalfMain) * barWidth;
						});
					}
				});
			},
			repositionBars: function() {
				var vm = this;
				var w2 = this.w2;
				var h2 = this.h2;
				var bs = this.barScale;
				var bars = this.barGraphs;
				// var barCount = bars.length;
				var barWidth = this.barW;
				// var barLeft = (barCount - 1) * barWidth * -0.5 + w2;
				Utils.forEach(bars, function(bar, i) {
					// var barX = barLeft + bar.offsetX;
					bar.centerX = (vm.barX * vm.w / bs) + barWidth * i + bar.offsetX;
					bar.centerY = vm.barY * vm.h / bs;//230
					var subs = bar.subs;
					var subCount = subs && subs.length;
					if (subCount) {
						// var subLeft = subCount * barWidth * -0.5 + w2;
						Utils.forEach(subs, function(s, i) {
							s.centerX = (vm.barX * vm.w / bs) + barWidth * i + s.offsetX;
							s.centerY = vm.barY * vm.h / bs;//230
							// s.opacity = 0;
						});
					}
				});
			},
			repositionWebs: function() {
				var vm = this;
				var dx = this.webDX;
				var dy = this.webDY;
				var ws = this.webScale;
				var webs = this.webGraphs;
				var webCount = webs.length;
				var left = (1 - webCount) * dx;
				var top = (1 - webCount) * dy;
				Utils.forEach(webs, function(web, i) {
					web.centerX = (vm.webX * vm.w / ws) + i * dx + left;
					web.centerY = (vm.webY * vm.h / ws) + i * dy + top;//5*h2-10;
				});
			},
			resize: function() {
				var cv = this.$refs.canvas;
				var w = this.w = cv.width = cv.offsetWidth;
				var h = this.h = cv.height = cv.offsetHeight;
				var w2 = this.w2 = Math.round(w*.5);
				var h2 = this.h2 = Math.round(h/6);

				this.gaugeCenterX = this.gaugeX*w;
				this.gaugeCenterY = this.gaugeY*h;
				this.rMax = Math.max(0, this.gaugeR);//140
				this.rConfMax = Math.max(0, this.confR);//140
				this.rBarHeight = Math.max(0, this.barH*0.5);//110
				this.radiusWeb = Math.max(0, this.webR);//130
				this.barScale = Math.min(1,w/(this.barGraphs.length*150));
				this.webScale = Math.min(1,w/(this.radiusWebLegendFactor*this.radiusWeb*2+this.widthWebLegend+30));
				this.repositionBars();
				this.repositionWebs();
				this.updateMouseRotation();
				this.draw();
			},
			startAnimationPos: function() {
				var vm = this;
				var ease = Utils.easing.easeQuad;
				var mod = Utils.easing.modInOut;
				var time = Math.round(Math.random() * 80) * 100 + 2000;
				var from = this.nPos;
				var to = from == 0 ? 100 : 0;
				this.boostPos = from == 100 ? Math.round(Math.random() * 70 + 25) : this.boostPos;
				var stop = false;
				vm.stopAnimationPos();
				vm.stopAnimationPos = function() { stop = true; };
				Utils.animate(from, to, time, ease, mod, function(val, pos) {
					if (stop) return true;
					// vm.nPos = val;
					vm.startAnimationBgColor();
					vm.draw();
					if (pos >= time) vm.startAnimationPos();
				});
			},
			startAnimationBgColor: function() {
				var so = this.getHoleStyle(Math.max(this.boostPos, this.nPos));
				var s = so.value;
				var si = this.segmentIndex;
				if (!s || (so.index >= 0 && si === so.index)) return;
				var vm = this;
				var ease = Utils.easing.easeLinear;
				var mod = Utils.easing.modIn;
				var time = 500;
				var from = 0;
				var to = 1;
				var fromColor = this.gaugeBgColor;
				var fromAlpha = this.gaugeBgAlpha;
				var deltaAlpha = s.bgAlpha - fromAlpha;
				var stop = false;
				this.segmentIndex = so.index;
				vm.stopAnimationBgColor();
				vm.stopAnimationBgColor = function() { stop = true; };
				Utils.animate(from, to, time, ease, mod, function(val, pos) {
					if (stop) return true;
					vm.bgColor = vm.colorInterLinear(val, s.bgColor, fromColor);
					// vm.bgColor[0] = val*deltaColor[0]+fromColor[0];
					// vm.bgColor[1] = val*deltaColor[1]+fromColor[1];
					// vm.bgColor[2] = val*deltaColor[2]+fromColor[2];
					vm.bgAlpha = val*deltaAlpha+fromAlpha;
					// vm.draw();
				});
			},
			startAnimationCPos: function() {
				var vm = this;
				var ease = Utils.easing.easeQuad;
				var mod = Utils.easing.modInOut;
				var time = Math.round(Math.random() * 80) * 100 + 2000;
				var from = this.cPos;
				var to = from == 0 ? 100 : 0;
				this.cBoostPos = from == 100 ? Math.round(Math.random() * 70 + 25) : this.cBoostPos;
				var stop = false;
				vm.stopAnimationCPos();
				vm.stopAnimationCPos = function() { stop = true; };
				Utils.animate(from, to, time, ease, mod, function(val, pos) {
					if (stop) return true;
					vm.cPos = val;
					// vm.draw();
					if (null == vm.gaugeR) {
						vm.draw();
					}
					if (pos >= time) vm.startAnimationCPos();
				});
			},
			startAnimationBarPos: function(opt) {
				var vm = this;
				var ease = Utils.easing.easeQuad;
				var mod = Utils.easing.modInOut;
				var time = Math.round(Math.random() * 80) * 100 + 4000;
				var from = opt.pos;
				var to = from == 0 ? 60 : 0;
				opt.boostPos = from == opt.max ? Math.round(Math.random() * 40 + 15) : opt.boostPos;
				var stop = false;
				opt.stopAnimPos();
				opt.stopAnimPos = function() { stop = true; };
				Utils.animate(from, to, time, ease, mod, function(val, pos) {
					if (stop) return true;
					// opt.pos = val;
					vm.startAnimationBarBgColor(opt);
					// vm.draw();
					if (null == vm.gaugeR) {
						vm.draw();
					}
					if (pos >= time) vm.startAnimationBarPos(opt);
				});
			},
			stopAnimationBarPos: function(opt) {
				opt.stopAnimPos();
			},
			startAnimationBarBgColor: function(opt) {
				var so = this.getBarHoleStyle(opt.pos);
				var s = so.value;
				var si = opt.sIndex;
				if (!s || (so.index >= 0 && si === so.index)) return;
				var vm = this;
				var ease = Utils.easing.easeLinear;
				var mod = Utils.easing.modIn;
				var time = 500;
				var from = 0;
				var to = 1;
				var fromColor = opt.bgColor;
				var stop = false;
				opt.sIndex = so.index;
				opt.stopAnimBg();
				opt.stopAnimBg = function() { stop = true; };
				Utils.animate(from, to, time, ease, mod, function(val, pos) {
					if (stop) return true;
					// console.log('bar animBg', val, pos, s.bgColor.join(','), fromColor.join(','), opt.name.join(' '));
					opt.bgColor = vm.colorInterLinear(val, s.bgColor, fromColor);
				});
			},
			startAnimationBarHover: function(opt) {
				var bhi = this.barHover;
				var ibo = this.barOpen;
				var bars = this.barGraphs;
				var bo = ibo === -1 ? null : bars[ibo];
				var bos = bo && bo.subs;
				bars = bo ? [bo].concat(bos || []) : bars;
				var bh = bhi == -1 ? null : bars[bhi];
				var ease = Utils.easing.easeQuad;
				var mod = Utils.easing.modOut;
				var time = 500;
				var from = opt.opacity;
				var to = bh ? bh === opt ? 1 : 0.25 : 1;
				var stop = false;
				opt.stopAnimHover();
				opt.stopAnimHover = function() { stop = true; };
				Utils.animate(from, to, time, ease, mod, function(val, pos) {
					if (stop) return true;
					opt.opacity = val;
				});
			},
			stopAnimationBarHover: function(opt) {
				opt.stopAnimHover();
			},
			startAnimationBarOpen: function() {
				var ibo = this.barOpen;
				var ibof = this.barOpenFrom;
				if (ibo === ibof) return;
				var vm = this;
				var w2 = this.w2;
				var bWidth = 150;
				var bars = this.barGraphs;
				var barsc = bars.length;
				var iMainActive = ibo === -1 ? ibof : ibo;
				var bo = bars[iMainActive];
				var bos = bo.subs;
				var bosc = bos.length;
				var bHalfMain = (barsc - 1) * 0.5;
				var bHalfSub = bosc * 0.5;
				var bMainClosed = /*iMainActive*/ - bHalfMain;
				var bMainOpened = -iMainActive - bHalfSub;
				var bSubClosed = -(bHalfSub - 1);
				var bSubOpened = (1 - bHalfSub);
				var bMainFrom, bMainTo, bSubFrom, bSubTo;
				if (ibo === -1) {
					bMainFrom = bMainOpened;
					bMainTo = bMainClosed;
					bSubFrom = bSubOpened;
					bSubTo = bSubClosed;
				} else {
					bMainFrom = bMainClosed;
					bMainTo = bMainOpened;
					bSubFrom = bSubClosed;
					bSubTo = bSubOpened;
				}
				var timeMain = Math.max(2.5, Math.abs(bMainTo - bMainFrom) + 1) * 200;
				var timeSub = Math.max(2.5, Math.abs(bSubTo - bSubFrom) + 1) * 200;
				var timeClose, timeOpen, barsClose, barsOpen;
				var closeFrom, closeTo, openFrom, openTo;
				if (ibo === -1) {
					timeClose = timeSub;
					timeOpen = timeMain;
					barsClose = bos;
					barsOpen = bars;
					closeFrom = bSubFrom;
					closeTo = bSubTo;
					openFrom = bMainFrom;
					openTo = bMainTo;
				} else {
					timeClose = timeMain;
					timeOpen = timeSub;
					barsClose = bars;
					barsOpen = bos;
					closeFrom = bMainFrom;
					closeTo = bMainTo;
					openFrom = bSubFrom;
					openTo = bSubTo;
				}
				var closeDelta = closeTo - closeFrom;
				var openDelta = openTo - openFrom;
				var time = timeMain + timeSub;
				var ease = Utils.easing.easeQuad;
				var mod = Utils.easing.modOut;
				var interMod = Utils.easing.interMod;
				Utils.animate(0, time, time, null, null, function(val, pos) {
					var count;
					var closePos = Math.min(timeClose, pos);
					count = barsClose.length;
					var cx = [], ox = [];
					Utils.forEach(barsClose, function(b, i) {
						var val = interMod(closePos, closeFrom, closeTo, timeClose, ease, mod);
						var bx = b.offsetX = val * bWidth;
						cx[i] = bx;
						if (ibo !== i) {
							b.opacity = interMod(closePos, 0.25, 0, timeClose, ease, mod);
							// (1 - closePos / timeClose) * 0.5;
						}
					});
					var openPos = Math.min(timeOpen, Math.max(0, pos - timeClose));
					count = barsOpen.length;
					Utils.forEach(barsOpen, function(b, i) {
						var val = interMod(openPos, openFrom, openTo, timeOpen, ease, mod);
						var bx = b.offsetX = val * bWidth;
						ox[i] = bx;
						if (ibo !== -1 || iMainActive !== i) {
							b.opacity = interMod(openPos, 0, 1, timeOpen, ease, mod);
						}
						// openPos / timeOpen;
					});
					vm.repositionBars();
					console.log('animOpen', {
						closeFrom: closeFrom,
						closeDelta: closeDelta,
						closeTo: closeTo,
						closePos: closePos,
						closeOffsetX: cx,
						closeTime: timeClose,
						openOffsetX: ox,
						openFrom: openFrom,
						openDelta: openDelta,
						openTo: openTo,
						openPos: openPos,
						openTime: timeOpen,
						mainClosed: bMainClosed,
						mainOpened: bMainOpened,
						subClosed: bSubClosed,
						subOpened: bSubOpened,
						mainFrom: bMainFrom,
						mainTo: bMainTo,
						subFrom: bSubFrom,
						subTo: bSubTo,
						mainActive: iMainActive,
						halfMain: bHalfMain,
						halfSub: bHalfSub
					});
					if (time <= pos) {
						vm.barOpenFrom = ibo;
						vm.resize();
						if (ibo === -1) {
							Utils.forEach(bos, vm.stopAnimationBarPos);
						}
					}
				});
			},
			startAnimationMouse: function() {
				var vm = this;
				var ease = Utils.easing.easeQuad;
				var mod = Utils.easing.modOut;
				var time = this.mouseInside ? 2000 : 3000;
				var from = this.mousePower;
				var to = this.mouseInside ? 1 : 0;
				var stop = false;
				vm.stopAnimationMouse();
				vm.stopAnimationMouse = function() { stop = true; };
				Utils.animate(from, to, time, ease, mod, function(val, pos) {
					if (stop) return true;
					vm.mousePower = val;
					vm.updateMouseRotation();
				});
			},
			startAnimationWeb: function() {
				var vm = this;
				var stop = false;
				var inc = 1/4096;
				vm.stopAnimationWeb();
				vm.stopAnimationWeb = function() { stop = true; };
				return void frame();
				function frame() {
					if (stop) return true;
					Utils.forEach(vm.webGraphs, function(web) {
						var as = web.angleStart;
						web.angleStart = (as + inc) % 2;
					});
					if (null == vm.gaugeR) {
						vm.draw();
					}
					window.requestAnimationFrame(frame);
				}
			}
		},
		mounted: function() {
			var cv = this.$refs.canvas;
			this.ct = cv.getContext('2d');
			window.addEventListener('resize', this.resize, false);
			// this.listenMouseMove();
			this.initBarAllOffsetX();
			this.resize();
			if (null != this.barH) {
				Utils.forEach(this.barGraphs, this.initBarBgColor);
				Utils.forEach(this.barGraphs, this.startAnimationBarPos);
			}
			if (null != this.gaugeR) {
				// this.startAnimationPos();
			}
			if (null != this.confX && null != this.confY) {
				// this.startAnimationCPos();
			}
			if (null != this.webR) {
				// this.startAnimationWeb();
			}
			setTimeout(this.resize, 50);
		},
		beforeDestroy: function() {
			window.removeEventListener('resize', this.resize, false);
			// this.forgetMouseMove();
			Utils.forEach(this.barGraphs, this.stopAnimationBarPos);
			this.stopAnimationPos();
			this.stopAnimationBgColor();
			this.stopAnimationCPos();
			this.stopAnimationWeb();
			this.stopAnimationMouse();
		}
		/*
		props: {
			propA: {
				type: String
			}
		},
		data: function() {
			return {};
		},
		computed: {},
		methods: {},
		created: function() {},
		mounted: function() {},
		beforeDestroy: function() {}
		*/
	};
})();
