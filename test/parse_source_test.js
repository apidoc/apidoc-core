/**
 * Test: parseSource
 */
var deepEqual = require('deep-equal');
var apidoc = require("../lib/index");

function log() {
}

var logger = {
  debug: log,
  verbose: log,
  info: log,
  warn: log,
  error: log,
};

describe("parseSource", function () {
  var testCases = [
    {
      source:
        "/**" +
        "\n            * @api     {post}   /api/school/students/:studentId/cloth  " +
        "\n            * @apiName         createCloth  " +
        "\n            * @apiGroup        cloth  " +
        "\n            * @apiParam (body) {String}          [name]  " +
        "\n            * @apiSuccess      {Number}    code  200  " +
        "\n            * @apiSuccessExample {json} Success-Response:  " +
        "\n            * {  " +
        "\n            *      status: 200  " +
        "\n            * }  " +
        "\n*/  ",
      expected: {
        global: {},
        local: {
          type: "post",
          url: "/api/school/students/:studentId/cloth",
          title: "",
          name: "createCloth",
          group: "cloth",
          parameter: {
            fields: {
              body: [
                {
                  group: "body",
                  type: "String",
                  field: "name",
                  optional: true,
                  description: "",
                },
              ],
            },
          },
          success: {
            fields: {
              "Success 200": [
                {
                  group: "Success 200",
                  type: "Number",
                  optional: false,
                  field: "code",
                  description: "200",
                },
              ],
            },
            examples: [
              {
                title: "Success-Response:  ",
                content: "{  \n     status: 200  \n}",
                type: "json",
              },
            ],
          },
        },
        index: 1,
      },
    },
  ];
  it("case 1: should pass all test cases", function (done) {
    testCases.forEach(function (testCase) {
      apidoc.setLogger(logger);
      var parsed = apidoc.parseSource(Buffer.from(testCase.source));
      deepEqual(parsed, testCase.expected);
    });
    done();
  });
});
