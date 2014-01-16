module.exports = {
    name: 'space-before-closing-brace',

    accepts: {
        number: true,
        string: /^[ \t\n]*$/
    },

    /**
     * Processes tree node.
     * @param {String} nodeType
     * @param {node} node
     * @param {Number} level
     */
    process: function(nodeType, node, level) {
        var value = this.getValue('space-before-closing-brace');
        var findLastNode = function(node) {
            var lastNode = node[node.length - 1];
            if (typeof lastNode !== 'object' || lastNode[0] === 'block') return null;
            if (lastNode[0] === 's') return lastNode;
            return findLastNode(lastNode);
        };

        if (nodeType !== 'block' && nodeType !== 'atrulers') return;

        // If found block node stop at the next one for space check
        // For the pre-block node, find its last (the deepest) child
        var spaceNode = findLastNode(node);

        if (value.indexOf('\n') > -1) {
            var blockIndent = this.getValue('block-indent');
            // TODO: Check that it works for '' block indent value <tg>
            if (blockIndent) value += new Array(level + 1).join(blockIndent);
        }

        // If it's spaces, modify this node
        // If it's something different from spaces, add a space node to the end

        if (spaceNode) {
            spaceNode[1] = value;
        } else if (value !== '') {
            node.push(['s', value]);
        }
    }
};

