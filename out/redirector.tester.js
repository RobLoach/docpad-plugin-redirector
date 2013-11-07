// Generated by CoffeeScript 1.6.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  module.exports = function(testers) {
    var MyTester, expect, request, _ref;
    expect = require('chai').expect;
    request = require('request');
    return MyTester = (function(_super) {
      __extends(MyTester, _super);

      function MyTester() {
        _ref = MyTester.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      MyTester.prototype.testGenerate = testers.RendererTester.prototype.testGenerate;

      MyTester.prototype.testServer = function(next) {
        var tester;
        tester = this;
        MyTester.__super__.testServer.apply(this, arguments);
        return this.suite('redirector', function(suite, test) {
          var baseUrl, http, isStatic, outExpectedPath, siteb, sitebPort, sitebUrl;
          http = require('http');
          sitebPort = 12345;
          siteb = http.createServer(function(req, res) {
            res.writeHead(200, {
              'Content-Type': 'text/plain'
            });
            return res.end(req.url);
          });
          siteb.listen(sitebPort);
          sitebUrl = "http://localhost:" + sitebPort;
          baseUrl = "http://localhost:" + tester.docpad.config.port;
          outExpectedPath = tester.config.outExpectedPath;
          isStatic = tester.docpad.config.env === 'static';
          test('test setup: siteb server should respond with path', function(done) {
            var expectedStr, fileUrl;
            fileUrl = "" + sitebUrl + "/test-path";
            expectedStr = '/test-path';
            return request(fileUrl, function(err, response, actual) {
              var actualStr;
              if (err) {
                return done(err);
              }
              actualStr = actual.toString();
              expect(actualStr).to.equal(expectedStr);
              return done();
            });
          });
          test('server should serve URLs ending in .html', function(done) {
            var expectedStr, fileUrl;
            fileUrl = "" + baseUrl + "/offsite.html";
            expectedStr = '/html-result';
            return request(fileUrl, function(err, response, actual) {
              var actualStr;
              if (err) {
                return done(err);
              }
              actualStr = actual.toString();
              expect(actualStr).to.equal(expectedStr);
              return done();
            });
          });
          test('server should serve URLs without extensions', function(done) {
            var expectedStr, fileUrl;
            fileUrl = "" + baseUrl + "/offsite-directory";
            expectedStr = '/directory-result';
            return request(fileUrl, function(err, response, actual) {
              var actualStr;
              if (err) {
                return done(err);
              }
              actualStr = actual.toString();
              expect(actualStr).to.equal(expectedStr);
              return done();
            });
          });
          return test('wrapping up', function(done) {
            return siteb.close(done);
          });
        });
      };

      return MyTester;

    })(testers.ServerTester);
  };

}).call(this);
