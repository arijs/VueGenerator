(function(vars) {
    'use strict';
    var Utils = vars.Utils;
    vars.compMap.root = {
        data: function() {
            return {
                timeout: {},
                offset: 0,
                portrait: false,
                index: 0,
                touched: false
            };
        },
        computed: {
            sections: function() {
                return this.$store.state.sections;
            }
        },
        methods: {
            onMouse: function(evt) {
                if (/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform))
                    return;
                var self = this,
                    state = self.$store.state;
                if (evt.type === 'mouseup' && state.scrolling) {
                    state.scrolling = false;
                    self.onScroll();
                }
            },
            onResize: function(evt) {
                var html = (document.documentElement || document.querySelector('html'));
                html.scrollTop = 0;
                this.portrait = window.innerWidth <= window.innerHeight;
                return this.$emit('resize', evt);
            },
            onTouch: function(evt) {
                var state = this.$store.state;
                switch (evt.type) {
                    case 'touchstart':
                        this.touched = false;
                    case 'touchmove':
                        state.scrolling = true;
                        break;
                    case 'touchend':
                        state.scrolling = false;
                        this.touched = true;
                        this.onScroll();
                        break;
                }
            },
            onScroll: function() {
                var self = this,
                    sb = self.$refs.scroll,
                    sH = sb.offsetHeight,
                    sT = sb.scrollTop,
                    state = self.$store.state,
                    fn = function() {
                        console.log(state.scrolling);
                        if (!state.scrolling) {
                            state.scrolling = true;
                            state.sectionIndex = Math.round(sb.scrollTop / sH);
                            self.offset = self.$store.state.sectionIndex * sb.offsetHeight;
                            sb.scrollTop = self.offset;
                        } else {
                            setTimeout(fn, 100);
                        }
                    };
                state.scrollTop = sT;
                if (state.scrolling && this.portrait && !this.touched)
                    return;
                clearTimeout(self.timeout.scroll);
                if (!state.scrolling || this.portrait) {
                    state.scrolling = false;
                    self.timeout.scroll = setTimeout(fn, 100);
                }
            },
            onWheel: function(evt) {
                if (/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform))
                    return;
                var self = this,
                    state = self.$store.state,
                    sb = self.$refs.scroll,
                    sH = sb.offsetHeight,
                    time = 750,
                    // delta = evt.delta || evt.wheelDelta || -evt.detail,
                    direction = (evt.detail < 0 || evt.wheelDelta > 0) ? 1 : -1,
                    sectionChange = direction > 0 ? -1 : +1,
                    nextSection;
                if (!state.scrolling) {
                    state.sectionIndex = Math.round(sb.scrollTop / sH);
                }
                nextSection = Math.max(0, Math.min(state.sections.length - 1,
                    state.sectionIndex + sectionChange));
                if (!state.sectionScroll)
                    state.scrolling = false;
                if (evt)
                    evt.preventDefault();
                if (state.scrolling || nextSection === state.sectionIndex)
                    return;
                clearTimeout(self.timeout.wheel);
                self.timeout.wheel = setTimeout(function() {
                    self.offset = sH * nextSection;
                    state.scrolling = true;
                    Utils.animate(sb.scrollTop, self.offset, time, Utils.easing.ease.cubic, Utils.easing.mod.out, function(val, pos) {
                        sb.scrollTop = Math.round(val);
                        state.sectionScroll = sectionChange * pos / time;
                        if (pos === time) {
                            state.scrolling = false;
                            state.sectionIndex = Math.round(sb.scrollTop / sH);
                            state.sectionScroll = 0;
                        }
                    });
                }, 100);
            }
        },
        created: function() {
            window.addEventListener('resize', this.onResize, false);
            window.addEventListener('orientationchange', this.onResize, false);
        },
        mounted: function() {
            this.$refs.scroll.addEventListener('DOMMouseScroll', this.onWheel, false);
            this.onResize();
        },
        beforeDestroy: function() {
            window.removeEventListener('resize', this.onResize, false);
            window.removeEventListener('orientationchange', this.onResize, false);
            this.$refs.scroll.removeEventListener('DOMMouseScroll', this.onWheel, false);
        }
    };
})(window.SHIFT);