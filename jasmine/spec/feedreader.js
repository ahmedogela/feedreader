/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('each feed has a URL', function() {
            allFeeds.forEach(function(feed) {
                // match that name is defined
                expect(feed.url).toBeDefined();
                // match that name is truthy that means it's not empty
                expect(feed.url).toBeTruthy();
            });
        });

        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('each feed has a name', function() {
            allFeeds.forEach(function(feed) {
                // match that name is defined
                expect(feed.name).toBeDefined();
                // match that name length is greater than 0, that means it's not empty
                expect((feed.name).length).toBeGreaterThan(0);
            });
        });
    });


    /* Write a new test suite named "The menu" */
    describe('The menu', function() {
        /* Write a test that ensures the menu element is
        * hidden by default. You'll have to analyze the HTML and
        * the CSS to determine how we're performing the
        * hiding/showing of the menu element.
        */

        // declare body DOM
        var body = $('body');

        it('should be hidden by default', function() {
            // check that it's hidden by default
            expect(body.hasClass('menu-hidden')).toBeTruthy();
        });

        /* Write a test that ensures the menu changes
        * visibility when the menu icon is clicked. This test
        * should have two expectations: does the menu display when
        * clicked and does it hide when clicked again.
        */
        it('visibility should be toggled', function() {
            // select menu icon
            var menuIcon = $('.menu-icon-link');
            // trigger a click
            menuIcon.trigger('click');
            // check visibility after first click that it has no menu-hidden class
            expect(body.hasClass('menu-hidden')).toBeFalsy();
            // trigger a click
            menuIcon.trigger('click');
            // check visibility after second click that it has a menu-hidden class
            expect(body.hasClass('menu-hidden')).toBeTruthy();
        });
    });
        

    /* Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* Write a test that ensures when the loadFeed
        * function is called and completes its work, there is at least
        * a single .entry element within the .feed container.
        * Remember, loadFeed() is asynchronous so this test will require
        * the use of Jasmine's beforeEach and asynchronous done() function.
        */
        beforeEach(function(done) {
            loadFeed(0, done);
        });
        it('should load at least a single entry element', function(done) {
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
        });
    });
        

    /* Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* Write a test that ensures when a new feed is loaded
        * by the loadFeed function that the content actually changes.
        * Remember, loadFeed() is asynchronous.
        */
        var current,
            after;

        beforeEach(function(done) {
            loadFeed(0, function() {
                // save current feed
                current = $('.feed').html();
                loadFeed(1, function() {
                    // save the next feed to compare 
                    after = $('.feed').html();
                    done();
                });
            });
        });

        it('content changes', function(done) {
            expect(current != after).toBe(true);
            done();
        });
    });
        
}());
