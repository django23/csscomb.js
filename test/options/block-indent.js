var assert = require('assert');

describe('options/block-indent:', function() {
    beforeEach(function() {
        this.filename = __filename;
    });

    it('Array value => should not change anything', function() {
        this.comb.configure({ 'block-indent': ['', ' '] });
        this.shouldBeEqual('test.css');
    });

    it('Invalid string value => should not change anything', function() {
        this.comb.configure({ 'block-indent': '  nani  ' });
        this.shouldBeEqual('test.css');
    });

    it('Float number value => should not change anything', function() {
        this.comb.configure({ 'block-indent': 3.5 });
        this.shouldBeEqual('test.css');
    });

    it('Integer value => should set proper space after combinator', function() {
        this.comb.configure({ 'block-indent': 0 });
        this.shouldBeEqual('test.css', 'test.expected.css');
    });

    it('Valid string value => should set proper space after combinator', function() {
        this.comb.configure({ 'block-indent': '    ' });
        this.shouldBeEqual('test.css', 'test-2.expected.css');
    });
    it('Should detect nothing with an empty block, test 1', function() {
        this.shouldDetect(
            ['block-indent'],
            'a{ }',
            {}
        );
    });
    it('Should detect nothing with an empty block, test 2', function() {
        this.shouldDetect(
            ['block-indent'],
            'a{}',
            {}
        );
    });
});