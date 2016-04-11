// usage :
// $ node buildJSON [source CSV] [target JSON]

// source CSV  : path to CSV file to be parsed
var SOURCE_CSV  = process.argv[2];

// target JSON : path to write JSON file
var TARGET_JSON = process.argv[3];

var Baby = require("babyparse");
var fs = require("fs");
var locations = require("./public/data/locations.json");

var dataModel = buildDataModel(locations);

var data = Baby.parseFiles(SOURCE_CSV, {
  header: true,
  dynamicTyping: true,
  step: parseRow,
  complete: function() {
    writeFile(dataModel);
  }
});

function buildDataModel(locationData) {

  var locations  = Object.keys(locationData);
  var age_groups = [ "children", "adults" ];
  var sexes      = [ "both", "male", "female" ];
  var years      = [1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013];
  var metrics = [ "overweight", "obese" ];

  var categories = [locations, age_groups, sexes, years, metrics];

  // recursive function to build data structure
  function buildNode(curr, categories) {
    if (curr == categories.length) return null;
    var node = {};
    for (var key of categories[curr]) {
      node[key] = buildNode(curr + 1, categories);
    }
    return node;
  }

  return buildNode(0, categories);
}

function parseRow(row) {

  var data = row.data[0];
  var age_group;

  if (!dataModel[data.location]) return;

  if (data.age_group_id == 36) age_group = "children";
  else if (data.age_group_id == 38) age_group = "adults";
  // discard rows we don't need (age groups besides children, adults)
  else return;

  dataModel[data.location][age_group][data.sex][data.year][data.metric] = data.mean;
}

function writeFile(obj) {
  fs.writeFileSync(TARGET_JSON, JSON.stringify(obj));
}
