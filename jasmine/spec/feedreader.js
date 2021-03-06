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

    /* done: Write a test that loops through each feed
     * in the allFeeds object and ensures it has a URL defined
     * and that the URL is not empty.
     */

    it('should make sure all feeds have urls defined & non-empty', function() {
      allFeeds.forEach(function(feed) {
        expect(feed.url).toBeDefined(); // does each feed object have a url
        expect(feed.url.length).toBeGreaterThan(0); // check length of entry for url
      });
    });

    /* done: Write a test that loops through each feed
     * in the allFeeds object and ensures it has a name defined
     * and that the name is not empty.
     */
    it('should make sure all feeds have names defined & non-empty', function() {
      allFeeds.forEach(function(feed) {
        expect(feed.name).toBeDefined(); // does each feed object have a name
        expect(feed.name.length).toBeGreaterThan(0); // check length of entry for url
      });
    });
  });

  /* done: Write a new test suite named "The menu" */
  describe('The menu', function() {

    /* done: Write a test that ensures the menu element is
     * hidden by default. You'll have to analyze the HTML and
     * the CSS to determine how we're performing the
     * hiding/showing of the menu element.
     */
    it('should have the menu hidden by default', function() {
      expect($('body').hasClass('menu-hidden')).toBe(true); // checking to see if the menu-hidden class is initially on the body element
    });

    /* done: Write a test that ensures the menu changes
     * visibility when the menu icon is clicked. This test
     * should have two expectations: does the menu display when
     * clicked and does it hide when clicked again.
     */
    it('on click, the class menu-hidden should be removed/added', function() {
      $('.menu-icon-link').click(); // assume a click occurs
      expect($('body').hasClass('menu-hidden')).not.toBe(true); // menu-hidden should be removed
      $('.menu-icon-link').click(); // assume ANOTHER click occurs
      expect($('body').hasClass('menu-hidden')).toBe(true); // menu-hidden should be toggled again
    });
  });

  /* done: Write a new test suite named "Initial Entries" */
  describe('Initial Entries', function() {

    /* done: Write a test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     * Remember, loadFeed() is asynchronous so this test will require
     * the use of Jasmine's beforeEach and asynchronous done() function.
     */
    beforeEach(function(done) {
      //inital loadFeed called with same conditions as init()
      loadFeed(0, done);
    });

    it('should load feed items into the feed container', function() {
      //  expect($( '.feed' ).has( '.entry' ).length ? "yes" : "no").toBe("yes"); // checking if the entries have any length
      expect($('.feed .entry').length).toBeGreaterThan(0); // easier implementation than above.
      console.log($('.feed .entry').length); // prints/tracks the actual entries this time :)
    });
  });

  /* done: Write a new test suite named "New Feed Selection" */
  describe('New Feed Selection', function() {

    /* done: Write a test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     * Remember, loadFeed() is asynchronous.
     */
    var initialId = 0;
    var currentContent, newContent;

    beforeEach(function(done) {
      // loadFeed with initialId set to 0
      loadFeed(initialId, function() {
        currentContent = $('.feed').text(); // check header title for curent content.
        //  console.log($('.feed').text()); // should print feed for Udacity Blog * and it does
        // now loadFeed again with new id:
        loadFeed(initialId + 1, function() {
          newContent = $('.feed').text(); // check header title for curent content.
          //  console.log($('.feed').text()); // should print feed for CSS tricks * and it does
          done();
        });
      });
    });

    it('as new feed is loaded, content should change', function() {
      expect(currentContent).not.toBe(newContent); // the two content varibles should have different header titles.
    });
  });
}());
