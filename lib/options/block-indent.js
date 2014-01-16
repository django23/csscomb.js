module.exports = {
    name: 'block-indent',

    accepts: {
        number: true,
        string: /^[ \t]*$/
    },

    /**
     * Processes tree node.
     * @param {String} nodeType
     * @param {node} node
     */
    process: function process(nodeType, node, level) {
        if (nodeType === 'stylesheet') {
            for (var i = node.length; i--;) {
                if (node[i][0] !== 's') continue;
                var space = node[i][1].replace(/\n[ \t]+/gm, '\n');
                if (space === '') {
                    node.splice(i, 1);
                } else {
                    node[i][1] = space;
                }
            }
            return;
        }

        if (level === 0 || nodeType !== 's') return;

        var space2 = node[0].replace(/[ \t]/gm, '');
        if (space2 === '') return;
        space2 += new Array(level + 1).join(this.getValue('block-indent'));
        node[0] = space2;
    },

    /**
     * Detects the value of an option at the tree node.
     *
     * @param {String} nodeType
     * @param {node} node
     */
    detect: function(nodeType, node, level) {
        var result = null;
        if (nodeType === 'atrulers' || nodeType === 'block') {
            if (node.length && node[node.length - 1][0] === 's' && level > 0) {
                result = node[node.length - 1][1].replace(/\s*\n/g, '');

                if (this._prev !== undefined && this._prev[0] < level) {
                    result = result.replace(result.replace(this._prev[1], ''), '');
                }
                if (this._prev === undefined || this._prev[0] !== level) {
                    this._prev = [level, result];
                }
            }
        }

        if (result !== null) {
            return result;
        }
    }

};
