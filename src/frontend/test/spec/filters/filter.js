'use strict';

describe('htmlToPlaintext filter', function() {

    var $filter;

    beforeEach(function () {
        module('frontendApp');

        inject(function (_$filter_) {
            $filter = _$filter_;
        });
    });

    it('returns plain text when given string with html tags', function() {
        var result;
        result = $filter('htmlToPlaintext')('<div>Hello World!</div>');
        expect(result).toEqual('Hello World!');
    });
});

describe('cut filter', function() {

    var $filter;

    beforeEach(function () {
        module('frontendApp');

        inject(function (_$filter_) {
            $filter = _$filter_;
        });
    });

    it('returns substring based on limit and wordwrap', function() {
        var result;
        result = $filter('cut')('Welcome to my app!!', true, 14);
        expect(result).toEqual('Welcome to my …');
    });
});

describe('unique filter', function() {

    var $filter;

    beforeEach(function () {
        module('frontendApp');

        inject(function (_$filter_) {
            $filter = _$filter_;
        });
    });

    it('removes duplicate records based on key provided', function() {
        var result;
        var testValues = [{ID: 1,  name: 'Josep',  class: 'A'},
            {ID: 2,  name: 'Carles', class: 'B'},
            {ID: 3,  name: 'Xavi',   class: 'A'},
            {ID: 4,  name: 'Pere',   class: 'D'},
            {ID: 5,  name: 'Adrià',  class: 'C'}];

        var endResult = [{ID: 1,  name: 'Josep',  class: 'A'},
            {ID: 2,  name: 'Carles', class: 'B'},
            {ID: 4,  name: 'Pere',   class: 'D'},
            {ID: 5,  name: 'Adrià',  class: 'C'}]

        result = $filter('unique')(testValues, 'class');
        expect(result).toEqual(endResult);
    });
});