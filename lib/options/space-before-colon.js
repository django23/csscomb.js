module.exports = {
    name: 'space-before-colon',

    accepts: {
        number: true,
        string: /^[ \t\n]*$/
    },

    /**
     * Processes tree node.
     * @param {String} nodeType
     * @param {node} node
     */
    process: function(nodeType, node) {
        var value = this.getValue('space-before-colon');

        if (nodeType !== 'property') return;

        if (node[node.length - 1][0] === 's') node.pop();
        if (value !== '') node.push(['s', value]);
    },

    detect: function(nodeType, node) {
        if (nodeType !== 'property') return;

        if (node[node.length - 1][0] === 's') {
            return node[node.length - 1][1];
        } else {
            return '';
        }
    }
};
