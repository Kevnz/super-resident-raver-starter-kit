﻿/**
 *  @tween-lite.js
 *  @version: 1.00
 *  @author: Jesse Freeman
 *  @date: May 2012
 *  
 *  Part of the Super Resident Raver Starter Kit: 
 */
ig.module(
    'plugins.tween-lite'
)
    .requires(
    'plugins.ease-pack'
)
    .defines(function () {

        /*!
         * VERSION: beta 1.668
         * DATE: 2013-01-01
         * JavaScript
         * UPDATES AND DOCS AT: http://www.greensock.com
         *
         * Copyright (c) 2008-2013, GreenSock. All rights reserved.
         * This work is subject to the terms in http://www.greensock.com/terms_of_use.html or for 
         * Club GreenSock members, the software agreement that was issued with your membership.
         * 
         * @author: Jack Doyle, jack@greensock.com
         */
        (function (n) {
            var H = function (a) {
                a = a.split(".");
                var c = n, b;
                for (b = 0; b < a.length; b++) c[a[b]] = c = c[a[b]] || {};
                return c
            }, m = H("com.greensock"), q, k, d, C, I, x = {}, D = function (a, c, b, l) {
                this.sc = x[a] ? x[a].sc : [];
                x[a] = this;
                this.gsClass = null;
                this.def = b;
                var e = c || [], d = [];
                this.check = function (c) {
                    for (var f = e.length, h = 0, p; -1 < --f;) (p = x[e[f]] || new D(e[f])).gsClass ? d[f] = p.gsClass : (h++, c && p.sc.push(this));
                    if (0 === h && b) {
                        c = ("com.greensock." + a).split(".");
                        var f = c.pop(), k = H(c.join("."))[f] = this.gsClass = b.apply(b, d);
                        l && ((n.GreenSockGlobals ||
                            n)[f] = k, "function" === typeof define && define.amd ? define((n.GreenSockAMDPath ? n.GreenSockAMDPath + "/" : "") + a.split(".").join("/"), [], function () {
                                return k
                            }) : "undefined" !== typeof module && module.exports && (module.exports = k));
                        for (f = 0; f < this.sc.length; f++) this.sc[f].check(!1)
                    }
                };
                this.check(!0)
            }, s = m._class = function (a, c, b) {
                c = c || function () {
                };
                new D(a, [], function () {
                    return c
                }, b);
                return c
            };
            n._gsDefine = function (a, c, b, l) {
                return new D(a, c, b, l)
            };
            var J = [0, 0, 1, 1], E = [], u = s("easing.Ease", function (a, c, b, l) {
                this._func = a;
                this._type =
                    b || 0;
                this._power = l || 0;
                this._params = c ? J.concat(c) : J
            }, !0);
            d = u.prototype;
            d._calcEnd = !1;
            d.getRatio = function (a) {
                if (this._func) return this._params[0] = a, this._func.apply(null, this._params);
                var c = this._type, b = this._power, l = 1 === c ? 1 - a : 2 === c ? a : 0.5 > a ? 2 * a : 2 * (1 - a);
                1 === b ? l *= l : 2 === b ? l *= l * l : 3 === b ? l *= l * l * l : 4 === b && (l *= l * l * l * l);
                return 1 === c ? 1 - l : 2 === c ? l : 0.5 > a ? l / 2 : 1 - l / 2
            };
            q = ["Linear", "Quad", "Cubic", "Quart", "Quint"];
            for (k = q.length; -1 < --k;) d = s("easing." + q[k], null, !0), C = s("easing.Power" + k, null, !0), d.easeOut = C.easeOut = new u(null,
                null, 1, k), d.easeIn = C.easeIn = new u(null, null, 2, k), d.easeInOut = C.easeInOut = new u(null, null, 3, k);
            s("easing.Strong", m.easing.Power4, !0);
            m.easing.Linear.easeNone = m.easing.Linear.easeIn;
            var K = s("events.EventDispatcher", function (a) {
                this._listeners = {};
                this._eventTarget = a || this
            });
            d = K.prototype;
            d.addEventListener = function (a, c, b, l, e) {
                e = e || 0;
                var d = this._listeners[a], j = 0, f;
                null == d && (this._listeners[a] = d = []);
                for (f = d.length; -1 < --f;) a = d[f], a.c === c ? d.splice(f, 1) : 0 === j && a.pr < e && (j = f + 1);
                d.splice(j, 0, { c: c, s: b, up: l, pr: e })
            };
            d.removeEventListener = function (a, c) {
                var b = this._listeners[a], l;
                if (b) for (l = b.length; -1 < --l;) if (b[l].c === c) {
                    b.splice(l, 1);
                    break
                }
            };
            d.dispatchEvent = function (a) {
                var c = this._listeners[a];
                if (c) for (var b = c.length, l = this._eventTarget, d; -1 < --b;) d = c[b], d.up ? d.c.call(d.s || l, { type: a, target: l }) : d.c.call(d.s || l)
            };
            var z = n.requestAnimationFrame, F = n.cancelAnimationFrame, L = Date.now || function () {
                return (new Date).getTime()
            };
            q = ["ms", "moz", "webkit", "o"];
            for (k = q.length; -1 < --k && !z;) z = n[q[k] + "RequestAnimationFrame"], F = n[q[k] +
                "CancelAnimationFrame"] || n[q[k] + "CancelRequestAnimationFrame"];
            s("Ticker", function (a, c) {
                var b = this, l = L(), d = !1 !== c && z, g, j, f, h, p, k = function () {
                    null != f && (!d || !F ? n.clearTimeout(f) : F(f), f = null)
                }, m = function (a) {
                    b.time = (L() - l) / 1E3;
                    if (!g || b.time >= p || !0 === a) b.frame++, p = b.time > p ? b.time + h - (b.time - p) : b.time + h - 0.001, p < b.time + 0.001 && (p = b.time + 0.001), b.dispatchEvent("tick");
                    !0 !== a && (f = j(m))
                };
                K.call(b);
                this.time = this.frame = 0;
                this.tick = function () {
                    m(!0)
                };
                this.fps = function (a) {
                    if (!arguments.length) return g;
                    g = a;
                    h = 1 / (g ||
                        60);
                    p = this.time + h;
                    j = 0 === g ? function () {
                    } : !d || !z ? function (a) {
                        return n.setTimeout(a, 1E3 * (p - b.time) + 1 >> 0 || 1)
                    } : z;
                    k();
                    f = j(m)
                };
                this.useRAF = function (a) {
                    if (!arguments.length) return d;
                    k();
                    d = a;
                    b.fps(g)
                };
                b.fps(a);
                n.setTimeout(function () {
                    d && !f && b.useRAF(!1)
                }, 1E3)
            });
            d = m.Ticker.prototype = new m.events.EventDispatcher;
            d.constructor = m.Ticker;
            var r = s("core.Animation", function (a, c) {
                this.vars = c || {};
                this._duration = this._totalDuration = a || 0;
                this._delay = Number(this.vars.delay) || 0;
                this._timeScale = 1;
                this._active = !0 === this.vars.immediateRender;
                this.data = this.vars.data;
                this._reversed = !0 === this.vars.reversed;
                if (v) {
                    I || (t.tick(), I = !0);
                    var b = this.vars.useFrames ? y : v;
                    b.insert(this, b._time);
                    this.vars.paused && this.paused(!0)
                }
            }), t = r.ticker = new m.Ticker;
            d = r.prototype;
            d._dirty = d._gc = d._initted = d._paused = !1;
            d._totalTime = d._time = 0;
            d._rawPrevTime = -1;
            d._next = d._last = d._onUpdate = d._timeline = d.timeline = null;
            d._paused = !1;
            d.play = function (a, c) {
                arguments.length && this.seek(a, c);
                this.reversed(!1);
                return this.paused(!1)
            };
            d.pause = function (a, c) {
                arguments.length &&
                this.seek(a, c);
                return this.paused(!0)
            };
            d.resume = function (a, c) {
                arguments.length && this.seek(a, c);
                return this.paused(!1)
            };
            d.seek = function (a, c) {
                return this.totalTime(Number(a), !1 !== c)
            };
            d.restart = function (a, c) {
                this.reversed(!1);
                this.paused(!1);
                return this.totalTime(a ? -this._delay : 0, !1 !== c)
            };
            d.reverse = function (a, c) {
                arguments.length && this.seek(a || this.totalDuration(), c);
                this.reversed(!0);
                return this.paused(!1)
            };
            d.render = function () {
            };
            d.invalidate = function () {
                return this
            };
            d._enabled = function (a, c) {
                this._gc = !a;
                this._active = a && !this._paused && 0 < this._totalTime && this._totalTime < this._totalDuration;
                !0 !== c && (a && null == this.timeline ? this._timeline.insert(this, this._startTime - this._delay) : !a && null != this.timeline && this._timeline._remove(this, !0));
                return !1
            };
            d._kill = function () {
                return this._enabled(!1, !1)
            };
            d.kill = function (a, c) {
                this._kill(a, c);
                return this
            };
            d._uncache = function (a) {
                for (a = a ? this : this.timeline; a;) a._dirty = !0, a = a.timeline;
                return this
            };
            d.eventCallback = function (a, c, b, d) {
                if (null == a) return null;
                if ("on" ===
                    a.substr(0, 2)) {
                    if (1 === arguments.length) return this.vars[a];
                    if (null == c) delete this.vars[a]; else if (this.vars[a] = c, this.vars[a + "Params"] = b, this.vars[a + "Scope"] = d, b) for (var e = b.length; -1 < --e;) "{self}" === b[e] && (b = this.vars[a + "Params"] = b.concat(), b[e] = this);
                    "onUpdate" === a && (this._onUpdate = c)
                }
                return this
            };
            d.delay = function (a) {
                if (!arguments.length) return this._delay;
                this._timeline.smoothChildTiming && this.startTime(this._startTime + a - this._delay);
                this._delay = a;
                return this
            };
            d.duration = function (a) {
                if (!arguments.length) return this._dirty = !1, this._duration;
                this._duration = this._totalDuration = a;
                this._uncache(!0);
                this._timeline.smoothChildTiming && 0 < this._time && this._time < this._duration && 0 !== a && this.totalTime(this._totalTime * (a / this._duration), !0);
                return this
            };
            d.totalDuration = function (a) {
                this._dirty = !1;
                return !arguments.length ? this._totalDuration : this.duration(a)
            };
            d.time = function (a, c) {
                if (!arguments.length) return this._time;
                this._dirty && this.totalDuration();
                a > this._duration && (a = this._duration);
                return this.totalTime(a, c)
            };
            d.totalTime = function (a, c) {
                if (!arguments.length) return this._totalTime;
                if (this._timeline) {
                    0 > a && (a += this.totalDuration());
                    if (this._timeline.smoothChildTiming && (this._dirty && this.totalDuration(), a > this._totalDuration && (a = this._totalDuration), this._startTime = (this._paused ? this._pauseTime : this._timeline._time) - (!this._reversed ? a : this._totalDuration - a) / this._timeScale, this._timeline._dirty || this._uncache(!1), !this._timeline._active)) for (var b = this._timeline; b._timeline;) b.totalTime(b._totalTime, !0), b = b._timeline;
                    this._gc && this._enabled(!0,
                        !1);
                    this._totalTime !== a && this.render(a, c, !1)
                }
                return this
            };
            d.startTime = function (a) {
                if (!arguments.length) return this._startTime;
                a !== this._startTime && (this._startTime = a, this.timeline && this.timeline._sortChildren && this.timeline.insert(this, a - this._delay));
                return this
            };
            d.timeScale = function (a) {
                if (!arguments.length) return this._timeScale;
                a = a || 1E-6;
                if (this._timeline && this._timeline.smoothChildTiming) {
                    var c = this._pauseTime || 0 === this._pauseTime ? this._pauseTime : this._timeline._totalTime;
                    this._startTime = c - (c -
                        this._startTime) * this._timeScale / a
                }
                this._timeScale = a;
                return this._uncache(!1)
            };
            d.reversed = function (a) {
                if (!arguments.length) return this._reversed;
                a != this._reversed && (this._reversed = a, this.totalTime(this._totalTime, !0));
                return this
            };
            d.paused = function (a) {
                if (!arguments.length) return this._paused;
                a != this._paused && this._timeline && (!a && this._timeline.smoothChildTiming && (this._startTime += this._timeline.rawTime() - this._pauseTime, this._uncache(!1)), this._pauseTime = a ? this._timeline.rawTime() : null, this._paused =
                    a, this._active = !this._paused && 0 < this._totalTime && this._totalTime < this._totalDuration);
                this._gc && (a || this._enabled(!0, !1));
                return this
            };
            m = s("core.SimpleTimeline", function (a) {
                r.call(this, 0, a);
                this.autoRemoveChildren = this.smoothChildTiming = !0
            });
            d = m.prototype = new r;
            d.constructor = m;
            d.kill()._gc = !1;
            d._first = d._last = null;
            d._sortChildren = !1;
            d.insert = function (a, c) {
                a._startTime = Number(c || 0) + a._delay;
                a._paused && this !== a._timeline && (a._pauseTime = a._startTime + (this.rawTime() - a._startTime) / a._timeScale);
                a.timeline &&
                a.timeline._remove(a, !0);
                a.timeline = a._timeline = this;
                a._gc && a._enabled(!0, !0);
                var b = this._last;
                if (this._sortChildren) for (var d = a._startTime; b && b._startTime > d;) b = b._prev;
                b ? (a._next = b._next, b._next = a) : (a._next = this._first, this._first = a);
                a._next ? a._next._prev = a : this._last = a;
                a._prev = b;
                this._timeline && this._uncache(!0);
                return this
            };
            d._remove = function (a, c) {
                a.timeline === this && (c || a._enabled(!1, !0), a.timeline = null, a._prev ? a._prev._next = a._next : this._first === a && (this._first = a._next), a._next ? a._next._prev =
                    a._prev : this._last === a && (this._last = a._prev), this._timeline && this._uncache(!0));
                return this
            };
            d.render = function (a, c) {
                var b = this._first, d;
                for (this._totalTime = this._time = this._rawPrevTime = a; b;) {
                    d = b._next;
                    if (b._active || a >= b._startTime && !b._paused) b._reversed ? b.render((!b._dirty ? b._totalDuration : b.totalDuration()) - (a - b._startTime) * b._timeScale, c, !1) : b.render((a - b._startTime) * b._timeScale, c, !1);
                    b = d
                }
            };
            d.rawTime = function () {
                return this._totalTime
            };
            var h = s("TweenLite", function (a, c, b) {
                r.call(this, c, b);
                if (null ==
                    a) throw "Cannot tween an undefined reference.";
                this.target = a;
                this._overwrite = null == this.vars.overwrite ? M[h.defaultOverwrite] : "number" === typeof this.vars.overwrite ? this.vars.overwrite >> 0 : M[this.vars.overwrite];
                if ((a instanceof Array || a.jquery) && "object" === typeof a[0]) {
                    this._targets = a.slice(0);
                    this._propLookup = [];
                    this._siblings = [];
                    for (a = 0; a < this._targets.length; a++) b = this._targets[a], b.jquery ? (this._targets.splice(a--, 1), this._targets = this._targets.concat(b.constructor.makeArray(b))) : (this._siblings[a] =
                        A(b, this, !1), 1 === this._overwrite && 1 < this._siblings[a].length && G(b, this, null, 1, this._siblings[a]))
                } else this._propLookup = {}, this._siblings = A(a, this, !1), 1 === this._overwrite && 1 < this._siblings.length && G(a, this, null, 1, this._siblings);
                (this.vars.immediateRender || 0 === c && 0 === this._delay && !1 !== this.vars.immediateRender) && this.render(-this._delay, !1, !0)
            }, !0);
            d = h.prototype = new r;
            d.constructor = h;
            d.kill()._gc = !1;
            d.ratio = 0;
            d._firstPT = d._targets = d._overwrittenProps = null;
            d._notifyPluginsOfEnabled = !1;
            h.version = 1.668;
            h.defaultEase = d._ease = new u(null, null, 1, 1);
            h.defaultOverwrite = "auto";
            h.ticker = t;
            var N = h._plugins = {}, w = h._tweenLookup = {}, P = 0, Q = {
                ease: 1, delay: 1, overwrite: 1, onComplete: 1, onCompleteParams: 1, onCompleteScope: 1, useFrames: 1, runBackwards: 1, startAt: 1, onUpdate: 1, onUpdateParams: 1, onUpdateScope: 1, onStart: 1, onStartParams: 1, onStartScope: 1, onReverseComplete: 1, onReverseCompleteParams: 1, onReverseCompleteScope: 1, onRepeat: 1, onRepeatParams: 1, onRepeatScope: 1, easeParams: 1, yoyo: 1, orientToBezier: 1, immediateRender: 1, repeat: 1,
                repeatDelay: 1, data: 1, paused: 1, reversed: 1
            }, M = { none: 0, all: 1, auto: 2, concurrent: 3, allOnStart: 4, preexisting: 5, "true": 1, "false": 0 }, y = r._rootFramesTimeline = new m, v = r._rootTimeline = new m;
            v._startTime = t.time;
            y._startTime = t.frame;
            v._active = y._active = !0;
            r._updateRoot = function () {
                v.render((t.time - v._startTime) * v._timeScale, !1, !1);
                y.render((t.frame - y._startTime) * y._timeScale, !1, !1);
                if (!(t.frame % 120)) {
                    var a, c, b;
                    for (b in w) {
                        c = w[b].tweens;
                        for (a = c.length; -1 < --a;) c[a]._gc && c.splice(a, 1);
                        0 === c.length && delete w[b]
                    }
                }
            };
            t.addEventListener("tick", r._updateRoot);
            var A = function (a, c, b) {
                var d = a._gsTweenID, e;
                if (!w[d || (a._gsTweenID = d = "t" + P++)]) w[d] = { target: a, tweens: [] };
                if (c && (a = w[d].tweens, a[e = a.length] = c, b)) for (; -1 < --e;) a[e] === c && a.splice(e, 1);
                return w[d].tweens
            }, G = function (a, c, b, d, e) {
                var g, j, f;
                if (1 === d || 4 <= d) {
                    a = e.length;
                    for (g = 0; g < a; g++) if ((f = e[g]) !== c) f._gc || f._enabled(!1, !1) && (j = !0); else if (5 === d) break;
                    return j
                }
                var h = c._startTime + 1E-10, p = [], k = 0, m = 0 === c._duration, n;
                for (g = e.length; -1 < --g;) if (!((f = e[g]) === c || f._gc || f._paused)) f._timeline !==
                    c._timeline ? (n = n || O(c, 0, m), 0 === O(f, n, m) && (p[k++] = f)) : f._startTime <= h && f._startTime + f.totalDuration() / f._timeScale + 1E-10 > h && ((m || !f._initted) && 2E-10 >= h - f._startTime || (p[k++] = f));
                for (g = k; -1 < --g;) if (f = p[g], 2 === d && f._kill(b, a) && (j = !0), 2 !== d || !f._firstPT && f._initted) f._enabled(!1, !1) && (j = !0);
                return j
            }, O = function (a, c, b) {
                for (var d = a._timeline, e = d._timeScale, g = a._startTime; d._timeline;) {
                    g += d._startTime;
                    e *= d._timeScale;
                    if (d._paused) return -100;
                    d = d._timeline
                }
                g /= e;
                return g > c ? g - c : b && g === c || !a._initted && 2E-10 >
                    g - c ? 1E-10 : (g += a.totalDuration() / a._timeScale / e) > c ? 0 : g - c - 1E-10
            };
            d._init = function () {
                this.vars.startAt && (this.vars.startAt.overwrite = 0, this.vars.startAt.immediateRender = !0, h.to(this.target, 0, this.vars.startAt));
                var a, c;
                this._ease = this.vars.ease instanceof u ? this.vars.easeParams instanceof Array ? this.vars.ease.config.apply(this.vars.ease, this.vars.easeParams) : this.vars.ease : "function" === typeof this.vars.ease ? new u(this.vars.ease, this.vars.easeParams) : h.defaultEase;
                this._easeType = this._ease._type;
                this._easePower =
                    this._ease._power;
                this._firstPT = null;
                if (this._targets) for (a = this._targets.length; -1 < --a;) {
                    if (this._initProps(this._targets[a], this._propLookup[a] = {}, this._siblings[a], this._overwrittenProps ? this._overwrittenProps[a] : null)) c = !0
                } else c = this._initProps(this.target, this._propLookup, this._siblings, this._overwrittenProps);
                c && h._onPluginEvent("_onInitAllProps", this);
                this._overwrittenProps && null == this._firstPT && "function" !== typeof this.target && this._enabled(!1, !1);
                if (this.vars.runBackwards) for (a = this._firstPT; a;) a.s +=
                    a.c, a.c = -a.c, a = a._next;
                this._onUpdate = this.vars.onUpdate;
                this._initted = !0
            };
            d._initProps = function (a, c, b, d) {
                var e, g, j, f, h, k;
                if (null == a) return !1;
                for (e in this.vars) {
                    if (Q[e]) {
                        if ("onStartParams" === e || "onUpdateParams" === e || "onCompleteParams" === e || "onReverseCompleteParams" === e || "onRepeatParams" === e) if (h = this.vars[e]) for (g = h.length; -1 < --g;) "{self}" === h[g] && (h = this.vars[e] = h.concat(), h[g] = this)
                    } else if (N[e] && (f = new N[e])._onInitTween(a, this.vars[e], this)) {
                        this._firstPT = k = {
                            _next: this._firstPT, t: f, p: "setRatio",
                            s: 0, c: 1, f: !0, n: e, pg: !0, pr: f._priority
                        };
                        for (g = f._overwriteProps.length; -1 < --g;) c[f._overwriteProps[g]] = this._firstPT;
                        if (f._priority || f._onInitAllProps) j = !0;
                        if (f._onDisable || f._onEnable) this._notifyPluginsOfEnabled = !0
                    } else this._firstPT = c[e] = k = { _next: this._firstPT, t: a, p: e, f: "function" === typeof a[e], n: e, pg: !1, pr: 0 }, k.s = !k.f ? parseFloat(a[e]) : a[e.indexOf("set") || "function" !== typeof a["get" + e.substr(3)] ? e : "get" + e.substr(3)](), g = this.vars[e], k.c = "number" === typeof g ? g - k.s : "string" === typeof g && "=" === g.charAt(1) ?
                        parseInt(g.charAt(0) + "1", 10) * Number(g.substr(2)) : Number(g) || 0;
                    k && k._next && (k._next._prev = k)
                }
                return d && this._kill(d, a) ? this._initProps(a, c, b, d) : 1 < this._overwrite && this._firstPT && 1 < b.length && G(a, this, c, this._overwrite, b) ? (this._kill(c, a), this._initProps(a, c, b, d)) : j
            };
            d.render = function (a, c, b) {
                var d = this._time, e, g;
                if (a >= this._duration) {
                    if (this._totalTime = this._time = this._duration, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (e = !0, g = "onComplete"), 0 === this._duration) {
                        if (0 === a ||
                            0 > this._rawPrevTime) this._rawPrevTime !== a && (b = !0);
                        this._rawPrevTime = a
                    }
                } else if (0 >= a) {
                    this._totalTime = this._time = 0;
                    this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0;
                    if (0 !== d || 0 === this._duration && 0 < this._rawPrevTime) g = "onReverseComplete", e = this._reversed;
                    0 > a ? (this._active = !1, 0 === this._duration && (0 <= this._rawPrevTime && (b = !0), this._rawPrevTime = a)) : this._initted || (b = !0)
                } else if (this._totalTime = this._time = a, this._easeType) {
                    var j = a / this._duration, f = this._easeType, h = this._easePower;
                    if (1 === f || 3 === f &&
                        0.5 <= j) j = 1 - j;
                    3 === f && (j *= 2);
                    1 === h ? j *= j : 2 === h ? j *= j * j : 3 === h ? j *= j * j * j : 4 === h && (j *= j * j * j * j);
                    this.ratio = 1 === f ? 1 - j : 2 === f ? j : 0.5 > a / this._duration ? j / 2 : 1 - j / 2
                } else this.ratio = this._ease.getRatio(a / this._duration);
                if (this._time !== d || b) {
                    this._initted || (this._init(), !e && this._time && (this.ratio = this._ease.getRatio(this._time / this._duration)));
                    !this._active && !this._paused && (this._active = !0);
                    if (0 === d && this.vars.onStart && (0 !== this._time || 0 === this._duration)) c || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams ||
                        E);
                    for (a = this._firstPT; a;) {
                        if (a.f) a.t[a.p](a.c * this.ratio + a.s); else a.t[a.p] = a.c * this.ratio + a.s;
                        a = a._next
                    }
                    this._onUpdate && (c || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || E));
                    g && !this._gc && (e && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), c || this.vars[g] && this.vars[g].apply(this.vars[g + "Scope"] || this, this.vars[g + "Params"] || E))
                }
            };
            d._kill = function (a, c) {
                "all" === a && (a = null);
                if (null == a && (null == c || c === this.target)) return this._enabled(!1, !1);
                c =
                    c || this._targets || this.target;
                var b, d, e, g, h, f, k;
                if ((c instanceof Array || c.jquery) && "object" === typeof c[0]) for (b = c.length; -1 < --b;) this._kill(a, c[b]) && (h = !0); else {
                    if (this._targets) for (b = this._targets.length; -1 < --b;) {
                        if (c === this._targets[b]) {
                            g = this._propLookup[b] || {};
                            this._overwrittenProps = this._overwrittenProps || [];
                            d = this._overwrittenProps[b] = a ? this._overwrittenProps[b] || {} : "all";
                            break
                        }
                    } else {
                        if (c !== this.target) return !1;
                        g = this._propLookup;
                        d = this._overwrittenProps = a ? this._overwrittenProps || {} : "all"
                    }
                    if (g) for (e in f =
                        a || g, k = a !== d && "all" !== d && a !== g && (null == a || !0 !== a._tempKill), f) {
                        if (b = g[e]) {
                            b.pg && b.t._kill(f) && (h = !0);
                            if (!b.pg || 0 === b.t._overwriteProps.length) b._prev ? b._prev._next = b._next : b === this._firstPT && (this._firstPT = b._next), b._next && (b._next._prev = b._prev), b._next = b._prev = null;
                            delete g[e]
                        }
                        k && (d[e] = 1)
                    }
                }
                return h
            };
            d.invalidate = function () {
                this._notifyPluginsOfEnabled && h._onPluginEvent("_onDisable", this);
                this._onUpdate = this._overwrittenProps = this._firstPT = null;
                this._initted = this._active = this._notifyPluginsOfEnabled = !1;
                this._propLookup = this._targets ? {} : [];
                return this
            };
            d._enabled = function (a, c) {
                if (a && this._gc) if (this._targets) for (var b = this._targets.length; -1 < --b;) this._siblings[b] = A(this._targets[b], this, !0); else this._siblings = A(this.target, this, !0);
                r.prototype._enabled.call(this, a, c);
                return this._notifyPluginsOfEnabled && this._firstPT ? h._onPluginEvent(a ? "_onEnable" : "_onDisable", this) : !1
            };
            h.to = function (a, c, b) {
                return new h(a, c, b)
            };
            h.from = function (a, c, b) {
                b.runBackwards = !0;
                !1 !== b.immediateRender && (b.immediateRender = !0);
                return new h(a, c, b)
            };
            h.fromTo = function (a, c, b, d) {
                d.startAt = b;
                b.immediateRender && (d.immediateRender = !0);
                return new h(a, c, d)
            };
            h.delayedCall = function (a, c, b, d, e) {
                return new h(c, 0, { delay: a, onComplete: c, onCompleteParams: b, onCompleteScope: d, onReverseComplete: c, onReverseCompleteParams: b, onReverseCompleteScope: d, immediateRender: !1, useFrames: e, overwrite: 0 })
            };
            h.set = function (a, c) {
                return new h(a, 0, c)
            };
            h.killTweensOf = h.killDelayedCallsTo = function (a, c) {
                for (var b = h.getTweensOf(a), d = b.length; -1 < --d;) b[d]._kill(c,
                    a)
            };
            h.getTweensOf = function (a) {
                if (null != a) {
                    var c, b, d;
                    if ((a instanceof Array || a.jquery) && "object" === typeof a[0]) {
                        c = a.length;
                        for (b = []; -1 < --c;) b = b.concat(h.getTweensOf(a[c]));
                        for (c = b.length; -1 < --c;) {
                            d = b[c];
                            for (a = c; -1 < --a;) d === b[a] && b.splice(c, 1)
                        }
                    } else {
                        b = A(a).concat();
                        for (c = b.length; -1 < --c;) b[c]._gc && b.splice(c, 1)
                    }
                    return b
                }
            };
            var B = s("plugins.TweenPlugin", function (a, c) {
                this._overwriteProps = (a || "").split(",");
                this._propName = this._overwriteProps[0];
                this._priority = c || 0
            }, !0);
            d = B.prototype;
            B.version = 12;
            B.API =
                2;
            d._firstPT = null;
            d._addTween = function (a, c, b, d, e, g) {
                var h;
                if (null != d && (h = "number" === typeof d || "=" !== d.charAt(1) ? Number(d) - b : parseInt(d.charAt(0) + "1", 10) * Number(d.substr(2)))) this._firstPT = a = { _next: this._firstPT, t: a, p: c, s: b, c: h, f: "function" === typeof a[c], n: e || c, r: g }, a._next && (a._next._prev = a)
            };
            d.setRatio = function (a) {
                for (var c = this._firstPT, b; c;) {
                    b = c.c * a + c.s;
                    c.r && (b = b + (0 < b ? 0.5 : -0.5) >> 0);
                    if (c.f) c.t[c.p](b); else c.t[c.p] = b;
                    c = c._next
                }
            };
            d._kill = function (a) {
                if (null != a[this._propName]) this._overwriteProps =
                    []; else for (var c = this._overwriteProps.length; -1 < --c;) null != a[this._overwriteProps[c]] && this._overwriteProps.splice(c, 1);
                for (c = this._firstPT; c;) null != a[c.n] && (c._next && (c._next._prev = c._prev), c._prev ? (c._prev._next = c._next, c._prev = null) : this._firstPT === c && (this._firstPT = c._next)), c = c._next;
                return !1
            };
            d._roundProps = function (a, c) {
                for (var b = this._firstPT; b;) {
                    if (a[this._propName] || null != b.n && a[b.n.split(this._propName + "_").join("")]) b.r = c;
                    b = b._next
                }
            };
            h._onPluginEvent = function (a, c) {
                var b = c._firstPT, d;
                if ("_onInitAllProps" ===
                    a) {
                    for (var e, g, h, f; b;) {
                        f = b._next;
                        for (e = g; e && e.pr > b.pr;) e = e._next;
                        (b._prev = e ? e._prev : h) ? b._prev._next = b : g = b;
                        (b._next = e) ? e._prev = b : h = b;
                        b = f
                    }
                    b = c._firstPT = g
                }
                for (; b;) b.pg && "function" === typeof b.t[a] && b.t[a]() && (d = !0), b = b._next;
                return d
            };
            B.activate = function (a) {
                for (var c = a.length; -1 < --c;) a[c].API === B.API && (h._plugins[(new a[c])._propName] = a[c]);
                return !0
            };
            if (q = n._gsQueue) {
                for (k = 0; k < q.length; k++) q[k]();
                for (d in x) x[d].def || console.log("Warning: TweenLite encountered missing dependency: com.greensock." + d)
            }
        })(window);

    }
)