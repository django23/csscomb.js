module.exports = (function() {
    function findLastNode(node) {
        var lastNode = node[node.length - 1];
        if (typeof lastNode !== 'object') return null;
        if (lastNode[0] === 's') return lastNode;
        return findLastNode(lastNode);
    }

    return {
        name: 'space-before-opening-brace',

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
            var value = this.getValue('space-before-opening-brace');

            // Loop through node from the end to the beginning
            for (var i = node.length; i--;) {
                // If found block node stop at the next one for space check
                if (node[i][0] !== 'block' && node[i][0] !== 'atrulers') continue;
                // For the pre-block node, find its last (the deepest) child
                var spaceNode = findLastNode(node[i - 1]);
                // If it's spaces, modify this node
                // If it's something different from spaces, add a space node to the end
                if (spaceNode) {
                    spaceNode[1] = value;
                } else if (value !== '') {
                    node[i - 1].push(['s', value]);
                }
            }
        },

        detect: function(nodeType, node) {
            var variants = [];

            // Loop through node from the end to the beginning
            for (var i = node.length; i--;) {
                // If found block node stop at the next one for space check
                if (node[i][0] !== 'block' && node[i][0] !== 'atrulers') continue;
                // For the pre-block node, find its last (the deepest) child
                var spaceNode = findLastNode(node[i - 1]);
                // If it's spaces, modify this node
                // If it's something different from spaces, add a space node to the end
                if (spaceNode) {
                    variants.push(spaceNode[1]);
                } else {
                    variants.push('');
                }
            }
            return variants;
        }
    };
})();
