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
            expect(allFeeds).toBeDefined(); // check allFeeds and make sure it's there
            expect(allFeeds.length).not.toBe(0); // make sure allFeeds has stuff in it.
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

         it('should make sure all feeds have urls defined ', function() {
           allFeeds.forEach(function(feed) {
             expect(feed.url).toBeDefined(); // does each feed object have a url
           });
         });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('should make sure all feeds have names defined ', function() {
           allFeeds.forEach(function(feed) {
             expect(feed.name).toBeDefined(); // does each feed object have a name
           });
         });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         it('should have the menu hidden by default', function() {
           expect( $( 'body' ).hasClass( 'menu-hidden' ) ).toBe(true); // checking to see if the menu-hidden class is initially on the body element
         });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it('on click, the class menu-hidden should be removed/added', function(){
              if($( 'body' ).hasClass( 'menu-hidden' )) { // is the menu-hidden class on the body element? (defualt condition)
                expect( $( 'menu-icon-link' ).click().hasClass( 'menu-hidden' ) ).not.toBe(true); // on click, defualt should change
              } else { // has the menu-hidden class been removed already?
                expect( $( 'menu-icon-link' ).click().hasClass( 'menu-hidden' ) ).toBe(true); // on click, replace the menu-hidden class
              }
          });
      });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         beforeEach(function(done) {
           //inital loadFeed called with same conditions as init()
           loadFeed(0, function() {
             done();
           });
         });

         it('should load feed items into the feed container', function(done) {
           expect($( '.feed' ).has( '.entry' ).length ? "yes" : "no").toBe("yes"); // checking if the entries have any length
           // utilized jQuery documentation for has() in above line
           done();
         });
       });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
         var initialId = 0
         var currentContent, newContent;

         beforeEach(function(done) {
           // loadFeed with initialId set to 0
           loadFeed(initialId, function(){
             currentContent = $('.header-title').text(); // check header title for curent content.
             done();
           });
           // now loadFeed again with new id:
           loadFeed(initialId + 1, function(){
             newContent = $('.header-title').text(); // check header title for curent content.
             done();
           });

         });

         it('as new feed is loaded, content should change', function(done) {
           expect(currentContent).not.toBe(newContent); // the two content varibles should have different header titles.
           done();
         });
   });
}());
